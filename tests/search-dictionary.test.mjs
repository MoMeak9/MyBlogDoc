import assert from "node:assert/strict";
import { gzipSync, gunzipSync } from "node:zlib";
import test from "node:test";
import { decode, encode } from "cbor-x";
import * as pagefind from "pagefind";
import { buildSearchDictionary } from "../src/lib/search-dictionary.mjs";

const header = Buffer.from("pagefind_dcd");
const encodedTable = (value) =>
  gzipSync(Buffer.concat([header, encode(value)]));
const fixtures = (rows, extraChunks = []) => [
  {
    path: "pagefind-entry.json",
    content: Buffer.from(
      JSON.stringify({
        version: "1.5.2",
        languages: { zh: { hash: "zh_abcdef" } },
      }),
    ),
  },
  {
    path: "pagefind.zh_abcdef.pf_meta",
    content: encodedTable([
      "1.5.2",
      [],
      ["zh_abcdef", ...extraChunks].map((hash) => ["", "", hash]),
      [],
      [],
      ["id", "record", "title", "image", "image_alt"],
    ]),
  },
  { path: "index/zh_abcdef.pf_index", content: encodedTable([rows]) },
];

test("dictionary reads real CJK and Latin keys, excluding only transport metadata", async () => {
  try {
    const created = await pagefind.createIndex({ forceLanguage: "zh" });
    assert.deepEqual(created.errors, []);
    for (const [id, title, body] of [
      [
        "editor-note",
        "Editor notes",
        "编辑器中的赘肉已经加载。 dispatchAction",
      ],
      ["latin-note", "Latin notes", "quartz useEffect"],
    ]) {
      const result = await created.index.addHTMLFile({
        url: `/posts/${id}/`,
        content: `<html lang="zh"><head><meta data-pagefind-meta="id[content]" content="${id}"><meta data-pagefind-meta="record[content]" content="transportrecordonlyword"><meta data-pagefind-meta="image[content]" content="transportimageonlyword"><meta data-pagefind-meta="image_alt[content]" content="transportimagealtonlyword"></head><body><h1 data-pagefind-body data-pagefind-meta="title">${title}</h1><article data-pagefind-body>${body}</article></body></html>`,
      });
      assert.deepEqual(result.errors, []);
    }
    const generated = await created.index.getFiles();
    assert.deepEqual(generated.errors, []);
    const engineKeys = generated.files
      .filter((file) => file.path.endsWith(".pf_index"))
      .flatMap((file) =>
        decode(gunzipSync(file.content).subarray(header.length))[0].map(
          (record) => record[0],
        ),
      );
    const expected = [
      ...new Set(
        engineKeys.filter(
          (word) => !word.toLowerCase().startsWith("transport"),
        ),
      ),
    ].sort();
    const { words } = buildSearchDictionary(generated.files);
    assert.deepEqual(
      words,
      expected,
      "All eligible normalized engine keys must be preserved exactly.",
    );
    assert.ok(words.includes("赘肉"));
    assert.ok(words.includes("编辑") && words.includes("器"));
    assert.ok(words.includes("useeffect") && words.includes("dispatchaction"));
    assert.equal(
      words.some((word) => word.toLowerCase().startsWith("transport")),
      false,
    );
    assert.equal(words.includes("privateonlytoken"), false);
  } finally {
    await pagefind.close();
  }
});

test("posting fields and variants preserve real body keys rather than filtering by token spelling", () => {
  const files = fixtures(
    [
      ["record_only", [[0, [], [-2, 0]]], []],
      ["image_only", [[0, [], [-4, 0]]], []],
      ["image_alt_only", [[0, [], [-5, 0]]], []],
      ["identity", [[0, [], [0]]], []],
      ["title_only", [[0, [], [-3, 0]]], []],
      ["eyj-real-code", [[0, [0], [-2, 0]]], []],
      ["variant_body", [], [["VARIANT", [[0, [-8, 0], []]]]]],
      ["weight_marker_only", [[0, [-8], []]], []],
    ],
    ["zh_fedcba"],
  );
  files.push({
    path: "index/zh_fedcba.pf_index",
    content: encodedTable([[["identity", [[0, [1], []]], []]]]),
  });
  assert.deepEqual(buildSearchDictionary(files), {
    words: ["eyj-real-code", "identity", "title_only", "variant_body"],
  });
  files.push({
    path: "index/zh_unused.pf_index",
    content: encodedTable([[["inactiveprivateword", [[0, [0], []]], []]]]),
  });
  assert.equal(
    buildSearchDictionary(files).words.includes("inactiveprivateword"),
    false,
    "Unreferenced chunks are not part of the active engine vocabulary.",
  );
});

test("dictionary rejects incompatible versions, bad gzip/header/CBOR and unknown schemas", () => {
  const valid = fixtures([["body", [[0, [0], []]], []]]);
  const replace = (path, content) =>
    valid.map((file) => (file.path === path ? { path, content } : file));
  assert.throws(
    () =>
      buildSearchDictionary(
        replace("pagefind-entry.json", Buffer.from('{"version":"1.5.3"}')),
      ),
    /expected version 1\.5\.2/,
  );
  assert.throws(
    () =>
      buildSearchDictionary(
        replace("index/zh_abcdef.pf_index", Buffer.from("not gzip")),
      ),
    /gzip/,
  );
  assert.throws(
    () =>
      buildSearchDictionary(
        replace(
          "index/zh_abcdef.pf_index",
          gzipSync(Buffer.concat([Buffer.from("wrong_header"), encode([[]])])),
        ),
      ),
    /header/,
  );
  assert.throws(
    () =>
      buildSearchDictionary(
        replace(
          "index/zh_abcdef.pf_index",
          gzipSync(Buffer.concat([header, Buffer.from([0x81])])),
        ),
      ),
    /CBOR/,
  );
  assert.throws(
    () =>
      buildSearchDictionary(
        replace("index/zh_abcdef.pf_index", encodedTable([[], []])),
      ),
    /word table schema/,
  );
  assert.throws(
    () =>
      buildSearchDictionary(fixtures([["body", [[0, ["invalid"], []]], []]])),
    /body location/,
  );
  assert.throws(
    () => buildSearchDictionary(fixtures([["body", [[0, [], [-99, 0]]], []]])),
    /field switch/,
  );
  assert.throws(
    () => buildSearchDictionary([...valid, valid[2]]),
    /duplicate generated path/,
  );
});
