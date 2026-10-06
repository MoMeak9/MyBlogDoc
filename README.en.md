# MyBlogDoc

[中文](README.md) · [Personal blog](https://yihuiblog.top/) · [Chronicle design reference](https://chronicle-83v.pages.dev/)

A personal frontend knowledge base and blog, statically generated with Astro from the original Markdown articles. The interface follows Chronicle's editorial layout, with article lists, category filters, search, and reading pages. Chinese and English interface translations share the same article content; switching languages does not translate the articles.

## Local development

Use Node.js 22.18 or newer. CI runs Node.js 22.22.3; `package.json` pins pnpm 10.34.6.

```sh
corepack enable
pnpm install
pnpm dev
```

If Corepack is unavailable, install pnpm with `npm install --global pnpm@10.34.6`.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm check` | Check Astro and TypeScript |
| `pnpm test` | Check Markdown metadata, article links, and deployment paths |
| `pnpm build` | Generate the static website in `dist/` |
| `pnpm preview` | Preview the generated website |
| `pnpm commit` | Commit staged changes with the existing git-cz configuration |

## Writing articles

Continue editing `.md` files in their original locations under `src/`. New articles also belong under `src/`; Chinese filenames and nested directories are supported. Hidden folders such as `.vuepress` and `.obsidian` are excluded from article discovery.

YAML frontmatter is optional. Existing `date`, `category`, `tag`, and `star` fields are supported, as are `categories` and `tags`. Titles come from `title`, the first H1, or the filename. Dates use `date` first, followed by the file's latest Git commit date; new uncommitted files use their filesystem date. Set `star: true` to feature an article.

```md
---
title: My new article
date: 2026-10-06
category:
  - Frontend
tag:
  - Astro
description: A short introduction to the article.
star: true
---

# My new article

Write your article here.
```

Standard Markdown, tables, syntax highlighting, native HTML, images, and videos are preserved. Legacy Vue code fences use HTML highlighting. Relative `.md` and `.html` article links resolve to the new article routes; legacy VuePress article `.html` URLs have compatibility entry points. Existing article bodies do not need a bulk rewrite. VuePress-specific Vue components are not executed as Astro components.

The default Chinese interface is at `/`; the English interface is at `/en/`. Both use the same articles.

## Covers, typography and social profiles

An explicit `cover` takes priority. Otherwise, only an image-only first body paragraph supplies a fallback. Articles beginning with text or containing no image use text cards; later illustrations are not covers. The interface uses `"PingFang SC", HarmonyOS_Regular, "Helvetica Neue", "Microsoft YaHei", sans-serif`, with system monospace for code and no external font requests.

Edit `src/config/site.ts` to configure the author and GitHub, Bilibili, and email profiles. The same links appear on the homepage, About page, footer, and mobile menu. Interface translations live in `src/i18n.ts`.

The About page uses `src/个人简介.md`, migrated from the [GitHub profile README](https://github.com/MoMeak9/MoMeak9/blob/91250d88177a33aa6da667942a7e4f7c448c0580/README.md). Its English content is preserved, with the source and revision recorded in frontmatter. Local SVG assets in `public/content-assets/github-profile/` follow the site's light/dark theme. Update the Markdown, SVG files, and contact details in `src/config/site.ts` together when refreshing the profile.

Pages use native browser scrolling. GSAP observes scroll position to animate reversible entrances, staggered cards, expanding rules, and counters. A Canvas renders the rotating wireframe icosahedron and particles, with a static SVG fallback. Drawing is capped at 30 FPS and pauses offscreen or in hidden tabs. The system's reduced motion preference keeps content and values static.

## Deploying to GitHub Pages

1. Open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
2. Push changes to `main` or `master`. The workflow installs locked dependencies, runs checks and tests, builds the website, and deploys it with the official GitHub Pages Actions.
3. You can also choose **Actions → Build and deploy Astro to GitHub Pages → Run workflow**. Only `main` and `master` deploy; Pull Requests run checks and builds.

The workflow reads the origin and base path from `actions/configure-pages`, supporting project sites, user sites, and configured custom domains. A normal `MyBlogDoc` project repository uses `/MyBlogDoc/`. Pull Request builds derive the path from `GITHUB_REPOSITORY`. Full Git history is checked out so article date fallbacks remain consistent. No PAT or manually maintained `gh-pages` branch is required.

To override deployment settings, add repository variables under **Settings → Secrets and variables → Actions → Variables**:

| Variable | Example | Meaning |
| --- | --- | --- |
| `SITE_URL` | `https://momeak9.github.io` | Website origin without the project subpath |
| `BASE_PATH` | `/MyBlogDoc/` | Project subpath; use `/` for root-domain deployment |

Local development defaults to `/`. To verify the same project path used in CI:

```sh
SITE_URL=https://momeak9.github.io BASE_PATH=/MyBlogDoc/ pnpm build
BASE_PATH=/MyBlogDoc/ pnpm preview
```

`.idea/`, `node_modules/`, `.astro/`, `dist/`, `.DS_Store`, and local environment files are ignored. Previously tracked `.idea` files have been removed from Git tracking while remaining available locally.

## Content migration and discovery

`scripts/migrate-blog.mjs` consumes a reviewed manifest. It defaults to dry-run; `--apply` writes the approved articles while keeping the source directory read-only. The review report is in `reports/content-migration.json`, and date provenance is in `src/data/migration-metadata.json`. The requested Douyin and legal directories, private correspondence, and credential-bearing work notes are excluded. Confirmed updates and document aliases are preserved; unresolved references remain readable plain text.

Archives statically render 12 articles per page, with search indexes loaded on demand. Phone layouts include horizontal category filters, a collapsible contents panel, 44px controls, and safe-area spacing. Mermaid diagrams load near the reader, keeping their original source available as a fallback.

## Local full-text and offline search

[Pagefind](https://pagefind.app/) builds a static, segmented Chinese index for public articles after the Astro build. Queries, relevance ranking, and highlighted excerpts run locally. Both interface languages share the original corpus and preserve their own article links. Keyword searches load only the required index chunks and visible excerpts; category-only filtering uses metadata. No search server, API key, or external search service is required.

Offline search prepares its full index and local assets automatically after the page loads and becomes idle. There is no download button. Background requests run at low priority and defer to search input, hidden tabs, Data Saver and slow connections. Completed data supports new offline queries, filtering, pagination and previously visited articles. Failed background updates preserve the prior complete cache and stay within the blog path. See the [implementation and validation notes](docs/offline-search.md).

## SEO and GEO

The site provides Blog, Person, BlogPosting, and visible breadcrumb JSON-LD, OG/Twitter sharing images, trustworthy publication/modification dates, explicit attribution, and sitemap lastmod. Unknown publication dates are never replaced with build timestamps. Article language follows the original content even when the interface is English.

`content-index.json` exposes public metadata, while `llms.txt` is an optional canonical navigation index. It is a community proposal rather than a Google ranking signal or an AI citation guarantee. [Google's AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) recommends accessible text, structured data, and trustworthy content.

A project Pages file at `/MyBlogDoc/robots.txt` does not control the entire host: crawlers look for `/robots.txt` at the domain root. Root-domain hosting can use the existing output directly. Search and training crawler permissions have not been changed. After publication, Search Console and Bing Webmaster Tools can verify indexing, crawling, and citations.

## Contact

This repository primarily contains personal notes. Report article or website problems in an [Issue](https://github.com/MoMeak9/MyBlogDoc/issues), or contact [minntaki@foxmail.com](mailto:minntaki@foxmail.com).
