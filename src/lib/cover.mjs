import { normalizeBase } from "./paths.mjs";

/** Use the same safe, mounted cover URL for HTML, search cards and social metadata. */
export function coverUrl(value, base = "/", sourceId = "") {
  if (typeof value !== "string" || !value.trim()) return undefined;
  const href = value.trim().replace(/%(?![0-9a-f]{2})/gi, "%25");
  const origin = "https://cover.invalid";
  try {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) {
      const url = new URL(href, origin);
      return ["https:", "http:"].includes(url.protocol) &&
        !url.username &&
        !url.password
        ? url.href
        : undefined;
    }
    if (/^[?#]|[\u0000-\u001f\\]/.test(href)) return undefined;
    const mount = normalizeBase(base);
    const directory = sourceId
      .split("/")
      .slice(0, -1)
      .map(encodeURIComponent)
      .join("/");
    const path =
      href.startsWith(mount) && mount !== "/"
        ? href
        : href.startsWith("/")
          ? `${mount}${href.slice(1)}`
          : `${mount}${directory ? `${directory}/` : ""}${href}`;
    const url = new URL(path, origin);
    return url.pathname.startsWith(mount)
      ? `${url.pathname}${url.search}${url.hash}`
      : undefined;
  } catch {
    return undefined;
  }
}
