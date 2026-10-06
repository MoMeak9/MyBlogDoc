import { gunzipSync } from "node:zlib";
import { decode } from "cbor-x";

const VERSION = "1.5.2";
const HEADER = Buffer.from("pagefind_dcd");
const SEARCHABLE_META = new Set(["id", "title"]);

function requireFormat(condition, path, reason) {
  if (!condition)
    throw new Error(
      `Unsupported Pagefind ${VERSION} data in ${path}: ${reason}`,
    );
}

function decodeTable(file) {
  let decompressed;
  try {
    decompressed = gunzipSync(file.content);
  } catch (error) {
    throw new Error(`Invalid Pagefind gzip data in ${file.path}`, {
      cause: error,
    });
  }
  requireFormat(
    decompressed.length > HEADER.length &&
      decompressed.subarray(0, HEADER.length).equals(HEADER),
    file.path,
    "invalid pagefind_dcd header",
  );
  try {
    return decode(decompressed.subarray(HEADER.length));
  } catch (error) {
    throw new Error(`Invalid Pagefind CBOR data in ${file.path}`, {
      cause: error,
    });
  }
}

function searchablePostings(postings, metaFields, path) {
  requireFormat(
    Array.isArray(postings),
    path,
    "page postings must be an array",
  );
  let searchable = false;
  for (const page of postings) {
    requireFormat(
      Array.isArray(page) &&
        page.length === 3 &&
        Number.isSafeInteger(page[0]) &&
        page[0] >= 0 &&
        Array.isArray(page[1]) &&
        Array.isArray(page[2]),
      path,
      "invalid page posting tuple",
    );
    for (const location of page[1]) {
      requireFormat(
        Number.isSafeInteger(location),
        path,
        "invalid body location delta",
      );
      if (location >= 0) searchable = true;
    }
    let field = 0;
    for (const location of page[2]) {
      requireFormat(
        Number.isSafeInteger(location),
        path,
        "invalid metadata location delta",
      );
      if (location < 0) {
        field = -location - 1;
        requireFormat(
          field < metaFields.length,
          path,
          "metadata field switch is out of range",
        );
      } else {
        requireFormat(
          field < metaFields.length,
          path,
          "metadata location has no field",
        );
        if (SEARCHABLE_META.has(metaFields[field])) searchable = true;
      }
    }
  }
  return searchable;
}

/** Retain exact engine keys occurring in body/title/id; never publish transport-only metadata. */
export function buildSearchDictionary(files) {
  requireFormat(
    Array.isArray(files),
    "getFiles()",
    "expected an array of generated files",
  );
  const paths = new Set();
  for (const file of files) {
    requireFormat(
      file &&
        typeof file.path === "string" &&
        file.content instanceof Uint8Array,
      "getFiles()",
      "invalid generated file",
    );
    requireFormat(!paths.has(file.path), file.path, "duplicate generated path");
    paths.add(file.path);
  }
  const entryFile = files.find((file) => file.path === "pagefind-entry.json");
  requireFormat(
    entryFile,
    "pagefind-entry.json",
    "missing pinned version manifest",
  );
  let entry;
  try {
    entry = JSON.parse(Buffer.from(entryFile.content).toString("utf8"));
  } catch (error) {
    throw new Error("Invalid Pagefind version manifest", { cause: error });
  }
  requireFormat(
    entry?.version === VERSION,
    entryFile.path,
    `expected version ${VERSION}`,
  );
  requireFormat(
    entry.languages &&
      typeof entry.languages === "object" &&
      !Array.isArray(entry.languages),
    entryFile.path,
    "missing language manifests",
  );

  const generated = new Map(files.map((file) => [file.path, file]));
  const indexes = new Map();
  for (const language of Object.values(entry.languages)) {
    requireFormat(
      language &&
        typeof language.hash === "string" &&
        /^[\w-]+$/.test(language.hash),
      entryFile.path,
      "invalid language hash",
    );
    const path = `pagefind.${language.hash}.pf_meta`;
    const file = generated.get(path);
    requireFormat(file, path, "missing declared language metadata");
    const table = decodeTable(file);
    requireFormat(
      Array.isArray(table) &&
        table.length === 6 &&
        table[0] === VERSION &&
        Array.isArray(table[2]) &&
        Array.isArray(table[5]),
      file.path,
      "invalid metadata table schema",
    );
    const fields = table[5];
    requireFormat(
      fields.every((field) => typeof field === "string" && field.length > 0) &&
        new Set(fields).size === fields.length,
      file.path,
      "invalid metadata field names",
    );
    for (const chunk of table[2]) {
      requireFormat(
        Array.isArray(chunk) &&
          chunk.length === 3 &&
          chunk.every((value) => typeof value === "string") &&
          /^[\w-]+$/.test(chunk[2]),
        file.path,
        "invalid word chunk declaration",
      );
      const indexPath = `index/${chunk[2]}.pf_index`;
      requireFormat(
        generated.has(indexPath) && !indexes.has(indexPath),
        indexPath,
        "missing or duplicate declared word chunk",
      );
      indexes.set(indexPath, { file: generated.get(indexPath), fields });
    }
  }

  requireFormat(indexes.size > 0, "index/", "missing engine word tables");
  const words = new Set();
  for (const { file, fields: metaFields } of indexes.values()) {
    const table = decodeTable(file);
    requireFormat(
      Array.isArray(table) && table.length === 1 && Array.isArray(table[0]),
      file.path,
      "invalid word table schema",
    );
    for (const record of table[0]) {
      requireFormat(
        Array.isArray(record) &&
          record.length === 3 &&
          typeof record[0] === "string" &&
          record[0].length > 0 &&
          record[0].isWellFormed() &&
          Array.isArray(record[2]),
        file.path,
        "invalid word record",
      );
      let searchable = searchablePostings(record[1], metaFields, file.path);
      for (const variant of record[2]) {
        requireFormat(
          Array.isArray(variant) &&
            variant.length === 2 &&
            typeof variant[0] === "string",
          file.path,
          "invalid variant record",
        );
        // Main postings can be empty when the visible word exists only as a variant.
        searchable =
          searchablePostings(variant[1], metaFields, file.path) || searchable;
      }
      if (searchable) words.add(record[0]);
    }
  }
  return { words: [...words].sort() };
}
