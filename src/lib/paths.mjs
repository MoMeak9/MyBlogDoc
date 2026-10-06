/** Normalize the mount point shared by development and GitHub project Pages. */
export function normalizeBase(base = "/") {
  const segments = String(base).split("/").filter(Boolean);
  return segments.length ? `/${segments.join("/")}/` : "/";
}

/** Keep Markdown names intact, including Chinese characters, punctuation and case. */
export function encodePath(path) {
  return String(path)
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .map(encodeURIComponent)
    .join("/");
}

export function localePath(path = "", locale = "zh", base = "/") {
  const suffix = String(path).replace(/^\/+|\/+$/g, "");
  return `${normalizeBase(base)}${locale === "en" ? "en/" : ""}${suffix ? `${suffix}/` : ""}`;
}

export function postPath(id, locale = "zh", base = "/") {
  return localePath(`posts/${encodePath(id)}`, locale, base);
}

export function legacyPath(id, base = "/") {
  return `${normalizeBase(base)}${encodePath(id)}.html`;
}

function normalizeSourcePath(path) {
  const parts = [];
  for (const part of path.split("/")) {
    if (part === "..") parts.pop();
    else if (part && part !== ".") parts.push(part);
  }
  return parts.join("/");
}

/** Resolve local VuePress/Markdown links against the original source location. */
export function rewriteLegacyHref(
  href,
  { sourceId = "", locale = "zh", base = "/" } = {},
) {
  if (!href || /^(?:[a-z][a-z\d+.-]*:|\/\/|#|\?)/i.test(href)) return href;
  const root = normalizeBase(base);
  if (/^\/(?:[?#]|$)/.test(href))
    return `${localePath("", locale, base)}${href.slice(1)}`;
  if (
    root !== "/" &&
    /^\/(?:posts\/|content-assets\/|about\/|blog\/)/.test(href) &&
    !/\.(?:md|html)(?:[?#]|$)/i.test(href)
  ) {
    return `${root}${href.slice(1)}`;
  }
  const [, rawPath, suffix = ""] = href.match(/^([^?#]*)([?#].*)?$/) ?? [];
  if (!rawPath || !/\.(?:md|html)$/i.test(rawPath)) return href;
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(rawPath);
  } catch {
    decodedPath = rawPath;
  }
  const mount = normalizeBase(base);
  if (mount !== "/" && decodedPath.startsWith(mount))
    decodedPath = decodedPath.slice(mount.length);
  const sourceDirectory = sourceId.split("/").slice(0, -1).join("/");
  const resolved = normalizeSourcePath(
    rawPath.startsWith("/") ? decodedPath : `${sourceDirectory}/${decodedPath}`,
  ).replace(/\.(?:md|html)$/i, "");
  if (resolved === "README" || resolved === "index")
    return `${localePath("", locale, base)}${suffix}`;
  if (resolved === "个人简介")
    return `${localePath("about", locale, base)}${suffix}`;
  return `${postPath(resolved, locale, base)}${suffix}`;
}

/** Rendered Markdown is shared between locales; only its internal navigation changes. */
export function localizeDocumentHtml(html, locale = "zh", base = "/") {
  if (locale !== "en") return html;
  const mount = normalizeBase(base);
  return html.replace(
    /(<a\b[^>]*\bhref\s*=\s*)(["'])([^"']*)\2/gi,
    (match, prefix, quote, href) => {
      if (!href.startsWith(mount) || href.startsWith(`${mount}en/`))
        return match;
      const relative = href.slice(mount.length);
      if (!/^(?:posts\/|about\/|$)/.test(relative)) return match;
      return `${prefix}${quote}${mount}en/${relative}${quote}`;
    },
  );
}
