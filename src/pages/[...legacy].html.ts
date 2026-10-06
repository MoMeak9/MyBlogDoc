import type { APIRoute, GetStaticPaths } from 'astro';
import { getPosts } from '../lib/content';
import { postPath, localePath } from '../lib/paths.mjs';

export const getStaticPaths = (async () => {
  const base = import.meta.env.BASE_URL;
  return [
    ...(await getPosts()).map(post => ({ params: { legacy: post.id }, props: { target: postPath(post.id, 'zh', base) } })),
    { params: { legacy: '个人简介' }, props: { target: localePath('about', 'zh', base) } },
    { params: { legacy: 'intro' }, props: { target: localePath('about', 'zh', base) } },
    { params: { legacy: 'README' }, props: { target: localePath('', 'zh', base) } },
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, site }) => {
  const target = String(props.target);
  const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!));
  const scriptTarget = JSON.stringify(target).replace(/</g, '\\u003c');
  return new Response(`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0;url=${escape(target)}"><link rel="canonical" href="${escape(new URL(target, site).href)}"><title>页面已迁移 · Yihui’s Blog</title></head><body><a href="${escape(target)}">页面已迁移，点击继续阅读 / Continue reading</a><script>location.replace(${scriptTarget}+location.search+location.hash)</script></body></html>`, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
};
