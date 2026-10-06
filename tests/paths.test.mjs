import assert from 'node:assert/strict';
import test from 'node:test';
import { encodePath, legacyPath, localePath, localizeDocumentHtml, normalizeBase, postPath, rewriteLegacyHref } from '../src/lib/paths.mjs';

test('base paths support root domains and GitHub project Pages', () => {
  assert.equal(normalizeBase(''), '/');
  assert.equal(normalizeBase('/'), '/');
  assert.equal(normalizeBase('///MyBlogDoc//'), '/MyBlogDoc/');
  assert.equal(localePath('', 'zh', '/MyBlogDoc'), '/MyBlogDoc/');
  assert.equal(localePath('/about/', 'en', '/MyBlogDoc/'), '/MyBlogDoc/en/about/');
});

test('article URLs preserve nested Unicode, spaces, case and literal percent sequences', () => {
  const id = 'React/React Hooks笔记/React 实现按需加载';
  assert.equal(postPath(id, 'en', '/MyBlogDoc'), `/MyBlogDoc/en/posts/${id.split('/').map(encodeURIComponent).join('/')}/`);
  assert.equal(decodeURIComponent(postPath(id)), `/posts/${id}/`);
  assert.equal(encodePath('A/100%20原文'), 'A/100%2520%E5%8E%9F%E6%96%87');
  assert.equal(legacyPath('React/React基础', '/MyBlogDoc'), '/MyBlogDoc/React/React%E5%9F%BA%E7%A1%80.html');
});

test('relative Markdown and HTML URLs resolve from the source directory', () => {
  const options = { sourceId: 'React/React Hooks笔记/当前文章', base: '/MyBlogDoc/', locale: 'en' };
  assert.equal(rewriteLegacyHref('../React基础.md#组件', options), '/MyBlogDoc/en/posts/React/React%E5%9F%BA%E7%A1%80/#组件');
  assert.equal(rewriteLegacyHref('./自定义%20Hooks.html?q=1#状态', options), '/MyBlogDoc/en/posts/React/React%20Hooks%E7%AC%94%E8%AE%B0/%E8%87%AA%E5%AE%9A%E4%B9%89%20Hooks/?q=1#状态');
  assert.equal(rewriteLegacyHref('/MyBlogDoc/JavaScript/事件循环.md', options), '/MyBlogDoc/en/posts/JavaScript/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF/');
  assert.equal(rewriteLegacyHref('../../README.md', options), '/MyBlogDoc/en/');
  assert.equal(rewriteLegacyHref('/个人简介.html', options), '/MyBlogDoc/en/about/');
});

test('external links, assets and anchors retain their original destinations', () => {
  for (const href of ['https://example.com/article.html', '//example.com/article.md', 'mailto:a@example.com', '#section', '?q=1', '/images/photo.png', '../folder/']) {
    assert.equal(rewriteLegacyHref(href, { sourceId: 'React/文章' }), href);
  }
});

test('English article navigation localizes only article anchors', () => {
  const html = '<a href="/MyBlogDoc/posts/React/test/#api">文章</a><a href="/MyBlogDoc/about/">关于</a><img src="/MyBlogDoc/posts/image.png"><a href="https://example.com/">外链</a><a href="/MyBlogDoc/en/posts/a/">英文</a>';
  const result = localizeDocumentHtml(html, 'en', '/MyBlogDoc/');
  assert.match(result, /href="\/MyBlogDoc\/en\/posts\/React\/test\/#api"/);
  assert.match(result, /href="\/MyBlogDoc\/en\/about\/"/);
  assert.match(result, /src="\/MyBlogDoc\/posts\/image.png"/);
  assert.match(result, /href="https:\/\/example.com\/"/);
  assert.equal((result.match(/\/en\/en\//g) ?? []).length, 0);
  assert.equal(localizeDocumentHtml(html, 'zh', '/MyBlogDoc/'), html);
});
