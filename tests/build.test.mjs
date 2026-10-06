import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { before, test } from 'node:test';

const root = process.cwd();
const dist = resolve(root, 'dist');
const mountSegments = (process.env.BASE_PATH || '/').split('/').filter(Boolean);
const base = mountSegments.length ? `/${mountSegments.join('/')}/` : '/';
const origin = new URL(process.env.SITE_URL || 'https://momeak9.github.io').origin;

function filesIn(directory, ignoreHidden = false) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (ignoreHidden && entry.name.startsWith('.')) return [];
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path, ignoreHidden) : [path];
  });
}

const notes = filesIn(join(root, 'src'), true)
  .filter(path => path.endsWith('.md'))
  .map(path => relative(join(root, 'src'), path).replaceAll('\\', '/'));
const postIds = notes.filter(path => !['README.md', '个人简介.md'].includes(path)).map(path => path.slice(0, -3));
const encodeId = id => id.split('/').map(encodeURIComponent).join('/');
const localizedRoute = (path, locale) => `${base}${locale === 'en' ? 'en/' : ''}${path ? `${path}/` : ''}`;
const expectedUrl = path => new URL(path, origin).href;
const regularPages = ['zh', 'en'].flatMap(locale => [
  ...['', 'blog', 'about', 'contact'].map(path => ({
    locale,
    route: path,
    file: join(locale === 'en' ? 'en' : '', path, 'index.html'),
  })),
  ...postIds.map(id => ({
    locale,
    route: `posts/${encodeId(id)}`,
    file: join(locale === 'en' ? 'en' : '', 'posts', id, 'index.html'),
  })),
]);
const htmlCache = new Map();

before(() => {
  assert.ok(existsSync(dist) && statSync(dist).isDirectory(), 'dist/ must exist; run pnpm build before pnpm test:build.');
});

function artifact(file) {
  const path = resolve(dist, file);
  assert.ok(existsSync(path) && statSync(path).isFile(), `Missing built file: ${file}`);
  if (!htmlCache.has(path)) htmlCache.set(path, readFileSync(path, 'utf8'));
  return htmlCache.get(path);
}

function decodeEntities(value) {
  return value.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, entity => {
    const named = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>' };
    if (named[entity.toLowerCase()]) return named[entity.toLowerCase()];
    const code = entity.slice(2, -1);
    return String.fromCodePoint(code[0].toLowerCase() === 'x' ? parseInt(code.slice(1), 16) : parseInt(code, 10));
  });
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/\b([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)]
    .map(([, name, doubleQuoted, singleQuoted]) => [name.toLowerCase(), decodeEntities(doubleQuoted ?? singleQuoted)]));
}

function localTarget(pathname, from) {
  assert.ok(pathname.startsWith(base), `${from}: local URL misses deployment base ${base}: ${pathname}`);
  const path = resolve(dist, decodeURIComponent(pathname.slice(base.length)));
  assert.ok(path === dist || path.startsWith(`${dist}/`), `${from}: local URL escapes dist/: ${pathname}`);
  const target = pathname.endsWith('/') || (existsSync(path) && statSync(path).isDirectory()) ? join(path, 'index.html') : path;
  assert.ok(existsSync(target) && statSync(target).isFile(), `${from}: missing local target ${pathname}`);
  return target;
}

function assertAbsoluteSiteUrl(value, from) {
  const url = new URL(value);
  assert.equal(url.origin, origin, `${from}: unexpected site origin`);
  localTarget(url.pathname, from);
  return url;
}

function locations(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => decodeEntities(match[1]));
}

test('every Markdown article has both locale pages and a real legacy HTML entry', t => {
  assert.ok(notes.includes('README.md') && notes.includes('个人简介.md'), 'Home and biography Markdown sources must remain present.');
  assert.ok(postIds.length > 0, 'No article Markdown sources were found.');
  t.diagnostic(`${notes.length} Markdown sources produce ${postIds.length} articles in each locale.`);
  for (const page of regularPages) artifact(page.file);
  for (const id of postIds) {
    const html = artifact(`${id}.html`);
    const target = localizedRoute(`posts/${encodeId(id)}`, 'zh');
    const canonical = [...html.matchAll(/<link\b[^>]*>/gi)].map(match => attributes(match[0])).find(link => link.rel === 'canonical');
    assert.equal(canonical?.href, expectedUrl(target), `${id}.html: legacy canonical must point to the new article.`);
    assert.match(html, /http-equiv="refresh"/i, `${id}.html: legacy entry must redirect readers.`);
    assert.ok(html.includes('location.replace('), `${id}.html: browser redirect must preserve old shared links.`);
  }
  const countPages = locale => filesIn(join(dist, locale === 'en' ? 'en/posts' : 'posts')).filter(path => path.endsWith('/index.html')).length;
  assert.equal(countPages('zh'), postIds.length, 'Unexpected Chinese article count.');
  assert.equal(countPages('en'), postIds.length, 'Unexpected English article count.');
  artifact('404.html');
  artifact('en/404/index.html');
});

test('canonical and all language alternates use the configured site origin and mount', () => {
  for (const page of regularPages) {
    const html = artifact(page.file);
    const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(match => attributes(match[0]));
    const canonicals = links.filter(link => link.rel === 'canonical');
    assert.equal(canonicals.length, 1, `${page.file}: expected one canonical URL.`);
    assert.equal(canonicals[0].href, expectedUrl(localizedRoute(page.route, page.locale)), `${page.file}: canonical URL mismatch.`);
    const alternates = links.filter(link => link.rel === 'alternate' && link.hreflang);
    for (const [language, locale] of [['zh-CN', 'zh'], ['en', 'en'], ['x-default', 'zh']]) {
      const matches = alternates.filter(link => link.hreflang === language);
      assert.equal(matches.length, 1, `${page.file}: missing or duplicate ${language} alternate.`);
      assert.equal(matches[0].href, expectedUrl(localizedRoute(page.route, locale)), `${page.file}: ${language} alternate URL mismatch.`);
      assertAbsoluteSiteUrl(matches[0].href, page.file);
    }
    assert.match(html, new RegExp(`<html\\b[^>]*lang="${page.locale === 'en' ? 'en' : 'zh-CN'}"`), `${page.file}: document language mismatch.`);
  }
});

test('absolute local navigation and media URLs resolve to published files', t => {
  const checked = new Set();
  for (const file of filesIn(dist).filter(path => path.endsWith('.html'))) {
    const from = relative(dist, file);
    const html = artifact(from);
    for (const match of html.matchAll(/<(?:a|link|script|img|source|video|audio|iframe)\b[^>]*>/gi)) {
      const attrs = attributes(match[0]);
      const values = [attrs.href, attrs.src, attrs.poster];
      if (attrs.srcset && !attrs.srcset.startsWith('data:')) values.push(...attrs.srcset.split(',').map(value => value.trim().split(/\s+/)[0]));
      for (const value of values) {
        if (!value?.startsWith('/') || value.startsWith('//')) continue;
        const pathname = new URL(value, origin).pathname;
        if (checked.has(pathname)) continue;
        localTarget(pathname, from);
        checked.add(pathname);
      }
    }
  }
  assert.ok(checked.size >= regularPages.length, 'Local navigation discovery missed published routes.');
  t.diagnostic(`${checked.size} distinct local navigation/resource URLs resolve under ${base}.`);
});

test('sitemaps include every public locale page and omit errors and legacy redirects', () => {
  const index = artifact('sitemap-index.xml');
  assert.match(index, /<sitemapindex\b/);
  const sitemapUrls = locations(index);
  assert.ok(sitemapUrls.length > 0, 'Sitemap index is empty.');
  const pageUrls = [];
  for (const sitemapUrl of sitemapUrls) {
    const url = assertAbsoluteSiteUrl(sitemapUrl, 'sitemap-index.xml');
    const xml = readFileSync(localTarget(url.pathname, 'sitemap-index.xml'), 'utf8');
    assert.match(xml, /<urlset\b/);
    pageUrls.push(...locations(xml));
  }
  assert.equal(pageUrls.length, new Set(pageUrls).size, 'Sitemap contains duplicate URLs.');
  for (const value of pageUrls) {
    const url = assertAbsoluteSiteUrl(value, 'sitemap');
    assert.ok(!url.pathname.endsWith('.html'), `Legacy HTML URL leaked into sitemap: ${value}`);
    assert.ok(!/\/404\/?$/.test(url.pathname), `404 URL leaked into sitemap: ${value}`);
  }
  assert.deepEqual(new Set(pageUrls), new Set(regularPages.map(page => expectedUrl(localizedRoute(page.route, page.locale)))), 'Sitemap must cover all public Chinese and English pages.');
});

test('RSS publishes 50 complete articles with valid mounted links and escaped XML', () => {
  const xml = artifact('rss.xml');
  assert.match(xml, /^<\?xml[^>]*\?><rss\b[^>]*version="2\.0"/);
  assert.ok(xml.endsWith('</channel></rss>'), 'RSS document is not closed.');
  assert.doesNotMatch(xml, /&(?!(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);)/i, 'RSS contains an unescaped ampersand.');
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(match => match[1]);
  assert.equal(items.length, 50, 'RSS must contain the latest 50 nonempty articles.');
  const links = [];
  for (const item of items) {
    for (const field of ['title', 'link', 'description', 'pubDate']) assert.match(item, new RegExp(`<${field}>[^<]+</${field}>`), `RSS article lacks ${field}.`);
    const link = decodeEntities(item.match(/<link>([^<]+)<\/link>/)[1]);
    const url = assertAbsoluteSiteUrl(link, 'RSS');
    assert.ok(url.pathname.startsWith(`${base}posts/`), `RSS article must use the Chinese article route: ${link}`);
    const guid = decodeEntities(item.match(/<guid\s+isPermaLink="true">([^<]+)<\/guid>/)?.[1] || '');
    assert.equal(guid, link, 'RSS permalink GUID must match its article link.');
    assert.ok(Number.isFinite(Date.parse(item.match(/<pubDate>([^<]+)<\/pubDate>/)[1])), 'RSS article date is invalid.');
    links.push(link);
  }
  assert.equal(links.length, new Set(links).size, 'RSS contains duplicate articles.');
  const self = attributes(xml.match(/<atom:link\b[^>]*>/)[0]);
  assert.equal(self.href, expectedUrl(`${base}rss.xml`));
  assert.equal(decodeEntities(xml.match(/<channel>[\s\S]*?<link>([^<]+)<\/link>/)[1]), expectedUrl(base));
});

test('IDE project files are absent from Git tracking', () => {
  const tracked = execFileSync('git', ['ls-files', '--', '.idea'], { cwd: root, encoding: 'utf8' });
  assert.equal(tracked.trim(), '', '.idea files must not be committed.');
});
