import assert from 'node:assert/strict';
import test from 'node:test';
import { articleImageUrl, articleIndexEntry, buildPageGraph, contentLanguage, extractAttribution, isPublicArticle, llmsIndex, resolveArticleDates, safeHttpUrl, serializeStructuredData, validDate } from '../src/lib/seo.ts';

const identity = {
  author: { name: 'Yihui' },
  socials: { github: { href: 'https://github.com/MoMeak9' }, bilibili: { href: 'https://space.bilibili.com/298768693' } },
};
const note = {
  id: 'JavaScript/== 与 ===', title: '相等比较', description: '比较运算的笔记', categories: ['JavaScript'],
  tags: ['ECMAScript'], language: 'zh-CN', author: { name: 'Yihui', explicit: false }, sources: [], indexable: true,
};

test('migration and Git modification dates never invent a publication date', () => {
  const dates = resolveArticleDates({}, '2022-05-01T10:00:00+08:00', '2026-10-06T12:00:00Z');
  assert.equal(dates.publishedDate, undefined);
  assert.equal(dates.modifiedDate.toISOString(), '2022-05-01T02:00:00.000Z');
  assert.equal(dates.modifiedDateSource, 'migration');
  assert.equal(resolveArticleDates({}).modifiedDate, undefined);
});

test('explicit publication and update metadata win, with invalid and earlier dates omitted', () => {
  const dates = resolveArticleDates({ pubDate: '2024-02-29', updatedDate: '2024-03-01T00:00:00Z' }, '2025-01-01', '2026-01-01');
  assert.equal(dates.publishedDate.toISOString(), '2024-02-29T00:00:00.000Z');
  assert.equal(dates.modifiedDate.toISOString(), '2024-03-01T00:00:00.000Z');
  assert.equal(dates.modifiedDateSource, 'frontmatter');
  assert.equal(validDate('2024-02-31'), undefined);
  assert.equal(resolveArticleDates({ date: '2024-04-01' }, '2024-03-01').modifiedDate, undefined);
  assert.equal(resolveArticleDates({}, 'invalid', '2023-01-01').modifiedDateSource, 'git');
});

test('authorship requires explicit metadata or attribution prose and ignores links in examples', () => {
  const result = extractAttribution({}, '原文作者：[Gaearon](https://github.com/gaearon)\n原文：[原文章](https://example.com/original)\n[普通链接](https://example.com/unrelated)\n```md\n作者：Fake\n原文：https://example.com/code-example\n```');
  assert.equal(result.author.name, 'Gaearon');
  assert.equal(result.author.url, 'https://github.com/gaearon');
  assert.equal(result.author.explicit, true);
  assert.deepEqual(result.sources, [{ url: 'https://example.com/original', title: '原文章' }]);
  assert.deepEqual(extractAttribution({}, '[普通链接](https://example.com)').sources, []);
  assert.equal(extractAttribution({ author: 'Explicit' }, '作者：Different').author.name, 'Explicit');
  assert.equal(extractAttribution({}, '```md\n作者：Unclosed example\n原文：https://example.com/in-code').author.explicit, false);
  assert.deepEqual(extractAttribution({}, '原文：<a href="https://example.com/html-source">来源</a>').sources, [{ url: 'https://example.com/html-source', title: undefined }]);
});

test('private, draft and redirect notes are excluded from public article discovery', () => {
  for (const data of [{ draft: true }, { private: true }, { visibility: 'private' }, { published: false }, { publish: false }, { public: false }, { redirect: '/new-location/' }]) assert.equal(isPublicArticle(data), false);
  assert.equal(isPublicArticle({}), true);
  assert.equal(isPublicArticle({ draft: false, published: true }), true);
  assert.equal(contentLanguage({}), 'zh-CN');
  assert.equal(contentLanguage({ language: 'en' }), 'en');
  assert.equal(contentLanguage({ language: '<script>' }), 'zh-CN');
});

test('JSON-LD serialization prevents script termination without changing content', () => {
  const payload = { title: '</script><script>alert(1)</script>', description: 'line\u2028separator\u2029' };
  const json = serializeStructuredData(payload);
  assert.equal(json.includes('<'), false);
  assert.equal(json.includes('\u2028'), false);
  assert.deepEqual(JSON.parse(json), payload);
});

test('structured articles preserve actual language and distinguish source author from publisher', () => {
  const article = { ...note, author: { name: 'Gaearon', url: 'https://github.com/gaearon', explicit: true }, sources: [{ url: 'https://example.com/source', title: '原文' }], modifiedDate: new Date('2022-01-01') };
  const result = buildPageGraph({ origin: 'https://example.org', base: '/MyBlogDoc/', path: 'posts/JavaScript/%3D%3D', locale: 'en', title: note.title, description: note.description, identity, article });
  const post = result['@graph'].find(item => item['@type'] === 'BlogPosting');
  assert.equal(post.inLanguage, 'zh-CN');
  assert.equal(post.author.name, 'Gaearon');
  assert.equal(post.publisher['@id'], 'https://example.org/MyBlogDoc/#person');
  assert.equal(post.datePublished, undefined);
  assert.equal(post.dateModified, '2022-01-01T00:00:00.000Z');
  assert.equal(post.image, undefined, 'Brand sharing artwork cannot become the article image.');
  assert.deepEqual(post.isBasedOn, ['https://example.com/source']);
  const author = result['@graph'].find(item => item['@type'] === 'Person');
  assert.deepEqual(author.sameAs, [identity.socials.github.href, identity.socials.bilibili.href]);
  const breadcrumbs = result['@graph'].find(item => item['@type'] === 'BreadcrumbList').itemListElement;
  assert.deepEqual(breadcrumbs.map(item => item.position), [1, 2, 3]);
  assert.equal(breadcrumbs[0].item, 'https://example.org/MyBlogDoc/en/');
  assert.equal(breadcrumbs[1].item, 'https://example.org/MyBlogDoc/en/blog/');
  assert.equal(breadcrumbs[2].item, post.url);
});

test('nonindexable notes have no article schema and image URLs reject unsafe protocols', () => {
  const graph = buildPageGraph({ origin: 'https://example.org', title: note.title, description: note.description, identity, article: { ...note, indexable: false } });
  assert.equal(graph['@graph'].some(item => item['@type'] === 'BlogPosting'), false);
  assert.equal(safeHttpUrl('javascript:alert(1)', 'https://example.org'), undefined);
  assert.equal(safeHttpUrl('https://user:password@example.org/'), undefined);
  assert.equal(safeHttpUrl('/MyBlogDoc/images/cover.jpg', 'https://example.org'), 'https://example.org/MyBlogDoc/images/cover.jpg');
  assert.equal(articleImageUrl('/images/cover.jpg', 'https://example.org', '/MyBlogDoc/'), 'https://example.org/MyBlogDoc/images/cover.jpg');
  assert.equal(articleImageUrl('../outside.jpg', 'https://example.org', '/MyBlogDoc/'), undefined);
});

test('content indexes preserve encoded names and optional dates with no article body duplication', () => {
  const entry = articleIndexEntry({ ...note, readMinutes: 4, modifiedDate: new Date('2023-02-01') }, 'https://example.org', '/MyBlogDoc/');
  assert.equal(decodeURIComponent(new URL(entry.url).pathname), '/MyBlogDoc/posts/JavaScript/== 与 ===/');
  assert.equal(entry.url.includes('%3D'), true);
  assert.equal(entry.alternates.en.includes('/MyBlogDoc/en/posts/'), true);
  assert.equal(entry.publishedDate, undefined);
  assert.equal(entry.modifiedDate, '2023-02-01T00:00:00.000Z');
  assert.equal(entry.readMinutes, 4);
  assert.equal('body' in entry, false);
  const index = llmsIndex([entry], 'https://example.org', '/MyBlogDoc/');
  assert.ok(index.startsWith('# Yihui’s Blog\n'));
  assert.ok(index.includes(entry.url));
  assert.ok(index.includes('不是搜索排名或 AI 引用保证'));
});
