import { ui, dateLabel, type Locale } from "../i18n";
import { localePath, normalizeBase, postPath } from "../lib/paths.mjs";
import {
  prepareSearchQuery,
  createSearchVocabulary,
  queryHasMatches,
  type SearchVocabulary,
} from "../lib/search-query";
import { createOfflineSearch, type OfflineSearchState } from "./offline-search";
import { coverUrl } from "../lib/cover.mjs";

type Article = {
  id: string;
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  readMinutes: number;
  publishedDate?: string;
  modifiedDate?: string;
  cover?: string;
};
type JournalSession = { root: HTMLElement; dispose: () => void };

let currentSession: JournalSession | undefined;
let articleRequest: Promise<Article[]> | undefined;
type SearchData = { meta: { record: string; id: string }; excerpt: string };
type SearchHit = { data: () => Promise<SearchData> };
type SearchAPI = {
  vocabulary: SearchVocabulary;
  options: (options: Record<string, unknown>) => Promise<void>;
  init: () => Promise<void>;
  search: (
    query: string,
    options: { filters: Record<string, string> },
  ) => Promise<{ results: SearchHit[] }>;
  destroy: () => Promise<void>;
};
let searchRequest: Promise<SearchAPI> | undefined;
let searchAttempt = 0;
let loadedSearchVersion: string | undefined;
const pageSize = 12;

async function fetchJson(path: string): Promise<unknown> {
  const response = await fetch(path, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error("Article index unavailable");
  return response.json();
}

function loadArticles(base: string) {
  if (!articleRequest) {
    articleRequest = fetchJson(`${base}content-index.json`)
      .then((value) => {
        const records = (value as { articles?: unknown[] })?.articles;
        if (!Array.isArray(records)) throw new Error("Invalid article index");
        return records.filter(isArticle);
      })
      .catch((error) => {
        articleRequest = undefined;
        throw error;
      });
  }
  return articleRequest;
}

function loadSearch(base: string) {
  if (!searchRequest) {
    const attempt = ++searchAttempt;
    searchRequest = fetchJson(`${base}search-version.json`)
      .then(async (value) => {
        const version = (value as { version?: unknown })?.version;
        if (typeof version !== "string" || !/^[a-f0-9]{8,64}$/.test(version))
          throw new Error("Invalid search version");
        if (attempt === searchAttempt) loadedSearchVersion = version;
        const [module, dictionary] = await Promise.all([
          import(
            /* @vite-ignore */ `${base}pagefind/pagefind.js?v=${version}&attempt=${attempt}`
          ),
          fetchJson(`${base}search-dictionary.json`),
        ]);
        const words = (dictionary as { words?: unknown })?.words;
        if (
          !Array.isArray(words) ||
          !words.every((word) => typeof word === "string")
        )
          throw new Error("Invalid search dictionary");
        const api = {
          ...module,
          vocabulary: createSearchVocabulary(words),
        } as SearchAPI;
        await api.options({
          basePath: `${base}pagefind/`,
          baseUrl: "/",
          excerptLength: 36,
          metaCacheTag: version,
        });
        // Capture the API's non-segmenting mode synchronously. Restore the document
        // language before any rendering or asynchronous work; UI semantics stay intact.
        const html = document.documentElement;
        const original = html.lang;
        let initializing: Promise<void>;
        try {
          html.lang = "en";
          initializing = api.init();
        } finally {
          html.lang = original;
        }
        await initializing;
        return api;
      })
      .catch((error) => {
        if (attempt === searchAttempt) {
          searchRequest = undefined;
          loadedSearchVersion = undefined;
        }
        throw error;
      });
  }
  return searchRequest;
}

function resetSearch() {
  const previous = searchRequest;
  searchAttempt++;
  searchRequest = undefined;
  loadedSearchVersion = undefined;
  void previous?.then((api) => api.destroy()).catch(() => {});
}

function isArticle(record: unknown): record is Article {
  if (!record || typeof record !== "object") return false;
  const article = record as Article;
  return (
    typeof article.id === "string" &&
    !!article.id &&
    !article.id.split("/").some((part) => part === "." || part === "..") &&
    typeof article.title === "string" &&
    typeof article.description === "string" &&
    Array.isArray(article.categories) &&
    article.categories.every((item) => typeof item === "string") &&
    Array.isArray(article.tags) &&
    article.tags.every((item) => typeof item === "string")
  );
}

/** Copy only text and marks from Pagefind's excerpt into the live document. */
function appendExcerpt(target: HTMLElement, excerpt: string) {
  const template = document.createElement("template");
  template.innerHTML = excerpt;
  const copy = (source: Node, destination: Node) => {
    if (source.nodeType === Node.TEXT_NODE) {
      destination.appendChild(
        document.createTextNode(source.textContent ?? ""),
      );
    } else if (source instanceof HTMLElement) {
      if (["SCRIPT", "STYLE"].includes(source.tagName)) return;
      if (source.tagName === "MARK") {
        const mark = document.createElement("mark");
        for (const child of source.childNodes) copy(child, mark);
        destination.appendChild(mark);
      } else for (const child of source.childNodes) copy(child, destination);
    }
  };
  for (const child of template.content.childNodes) copy(child, target);
}

function element<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  value?: string,
) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value !== undefined) node.textContent = value;
  return node;
}

function renderCard(
  article: Article,
  locale: Locale,
  base: string,
  excerpt?: string,
) {
  const t = ui(locale);
  const cover = coverUrl(article.cover, base);
  const card = element("article", `post-card${cover ? "" : " without-cover"}`);
  const link = element("a");
  link.href = postPath(article.id, locale, base);
  if (cover) {
    const figure = element("figure");
    const image = element("img", "post-art");
    image.src = cover;
    image.alt = "";
    image.width = 600;
    image.height = 450;
    image.loading = "lazy";
    image.decoding = "async";
    figure.append(image);
    link.append(figure);
  }
  const meta = element("div", "post-meta");
  const separator = () => {
    const node = element("span", undefined, "·");
    node.setAttribute("aria-hidden", "true");
    return node;
  };
  meta.append(
    element("span", "category", article.categories[0] ?? ""),
    separator(),
  );
  const rawDate = article.publishedDate || article.modifiedDate;
  const date = rawDate ? new Date(rawDate) : undefined;
  if (date && Number.isFinite(date.getTime())) {
    const time = element(
      "time",
      undefined,
      `${article.publishedDate ? t.articlePublished : t.articleUpdated} ${dateLabel(date, locale)}`,
    );
    time.dateTime = date.toISOString();
    meta.append(time);
  } else meta.append(element("span", undefined, t.missingDate));
  meta.append(
    separator(),
    element("span", undefined, `${article.readMinutes || 1} ${t.minuteRead}`),
  );
  const read = element("span", "text-link", t.readArticle);
  const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  for (const [name, value] of Object.entries({
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.5",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "aria-hidden": "true",
    focusable: "false",
  }))
    arrow.setAttribute(name, value);
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M5 12h14m-6-6 6 6-6 6");
  arrow.append(path);
  read.append(arrow);
  const description = element("p", "post-description");
  if (excerpt) appendExcerpt(description, excerpt);
  else description.textContent = article.description || t.empty;
  link.append(meta, element("h3", undefined, article.title), description, read);
  card.append(link);
  return card;
}

export function initJournal() {
  const root = document.querySelector<HTMLElement>("[data-journal]");
  if (currentSession?.root === root) return;
  currentSession?.dispose();
  currentSession = undefined;
  if (!root) return;

  const locale: Locale = root.dataset.locale === "en" ? "en" : "zh";
  const t = ui(locale);
  const base = normalizeBase(root.dataset.base);
  const staticPage = Number(root.dataset.staticPage) || 1;
  const staticPages = Number(root.dataset.staticPages) || 1;
  const staticTotal = Number(root.dataset.total) || 0;
  const grid = root.querySelector<HTMLElement>(".journal-grid");
  const input = root.querySelector<HTMLInputElement>("#article-search");
  const chipRegion = root.querySelector<HTMLElement>(".chips");
  const chips = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-category]"),
  ];
  const count = root.querySelector<HTMLElement>("#result-count");
  const pagination = root.querySelector<HTMLElement>(".pagination");
  const status = root.querySelector<HTMLElement>("#page-status");
  const previous = root.querySelector<HTMLAnchorElement>("#prev-page");
  const next = root.querySelector<HTMLAnchorElement>("#next-page");
  const empty = root.querySelector<HTMLElement>(".empty-results");
  const feedback = root.querySelector<HTMLElement>(".filter-feedback");
  const message = root.querySelector<HTMLElement>("#filter-message");
  const retry = root.querySelector<HTMLButtonElement>("#retry-filters");
  if (!grid || !input || !previous || !next) return;
  const staticCards = [...grid.childNodes];
  const events = new AbortController();
  const params = new URLSearchParams(location.search);
  let category = params.get("category") || "";
  if (!chips.some((chip) => chip.dataset.category === category)) category = "";
  input.value = params.get("q") || "";
  let page = Math.max(1, Number.parseInt(params.get("page") || "1", 10) || 1);
  let requestVersion = 0;
  let inputTimer: ReturnType<typeof setTimeout> | undefined;
  let disposed = false;
  let composing = false;
  const offlineBar = root.querySelector<HTMLElement>(".offline-search-bar");
  if (offlineBar) offlineBar.hidden = false;
  const offlineStatus = root.querySelector<HTMLElement>(
    "#offline-search-status",
  );
  const offline = createOfflineSearch(
    base,
    (state: OfflineSearchState) => {
      if (disposed) return;
      const ready = state.phase === "ready";
      if (
        ready &&
        loadedSearchVersion &&
        state.version !== loadedSearchVersion
      ) {
        resetSearch();
        articleRequest = undefined;
        if (active()) void update();
      }
      if (offlineStatus) {
        offlineStatus.dataset.phase = state.phase;
        const text = ready
          ? t.offlineReady
          : state.phase === "unsupported"
            ? t.offlineUnsupported
            : state.phase === "error"
              ? t.offlineDownloadError
              : t.offlineSearchHint;
        if (offlineStatus.textContent !== text)
          offlineStatus.textContent = text;
      }
    },
    { automatic: true },
  );
  const active = () => Boolean(category || input.value.trim());
  const archivePath = (number: number) =>
    localePath(number === 1 ? "blog" : `blog/${number}`, locale, base);

  const filterUrl = (number = page) => {
    const search = new URLSearchParams(location.search);
    for (const key of ["q", "category", "page"]) search.delete(key);
    if (input.value.trim()) search.set("q", input.value.trim());
    if (category) search.set("category", category);
    if (active() && number > 1) search.set("page", String(number));
    return `${location.pathname}${search.size ? `?${search}` : ""}${location.hash}`;
  };
  const updateQuery = () => history.replaceState(null, "", filterUrl());
  const setPageLink = (
    link: HTMLAnchorElement,
    href: string,
    disabled: boolean,
  ) => {
    link.href = href;
    if (disabled) {
      link.setAttribute("aria-disabled", "true");
      link.tabIndex = -1;
    } else {
      link.removeAttribute("aria-disabled");
      link.removeAttribute("tabindex");
    }
  };
  const updatePagination = (
    current: number,
    pages: number,
    filtered: boolean,
  ) => {
    if (pagination) pagination.hidden = pages <= 1;
    if (status) status.textContent = `${current} / ${pages}`;
    setPageLink(
      previous,
      filtered
        ? filterUrl(Math.max(1, current - 1))
        : archivePath(Math.max(1, current - 1)),
      current <= 1,
    );
    setPageLink(
      next,
      filtered
        ? filterUrl(Math.min(pages, current + 1))
        : archivePath(Math.min(pages, current + 1)),
      current >= pages,
    );
    if (current > 1) previous.rel = "prev";
    else previous.removeAttribute("rel");
    if (current < pages) next.rel = "next";
    else next.removeAttribute("rel");
  };
  const syncChips = () => {
    chips.forEach((chip) => {
      const selected = chip.dataset.category === category;
      chip.classList.toggle("active", selected);
      chip.setAttribute("aria-pressed", String(selected));
    });
  };
  const showChip = (chip: HTMLElement) => {
    if (!chipRegion || chipRegion.scrollWidth <= chipRegion.clientWidth) return;
    const region = chipRegion.getBoundingClientRect();
    const selected = chip.getBoundingClientRect();
    const delta =
      selected.left < region.left
        ? selected.left - region.left
        : selected.right > region.right
          ? selected.right - region.right
          : 0;
    if (delta)
      chipRegion.scrollTo({
        left: chipRegion.scrollLeft + delta,
        top: chipRegion.scrollTop,
        behavior: "auto",
      });
  };
  const setFeedback = (kind?: "loading" | "error") => {
    offline.setBusy(kind === "loading" || composing);
    if (feedback) feedback.hidden = !kind;
    if (message)
      message.textContent =
        kind === "loading"
          ? t.loadingArticles
          : kind === "error"
            ? t.filterError
            : "";
    if (retry) retry.hidden = kind !== "error";
    grid.setAttribute("aria-busy", String(kind === "loading"));
  };
  const restoreStaticPage = () => {
    grid.replaceChildren(...staticCards);
    if (count) count.textContent = String(staticTotal);
    if (empty) empty.hidden = staticTotal !== 0;
    updatePagination(staticPage, staticPages, false);
    setFeedback();
  };

  const update = async (scroll = false) => {
    const version = ++requestVersion;
    syncChips();
    updateQuery();
    if (!active()) {
      restoreStaticPage();
      return;
    }
    const selectedCategory = category;
    const query = prepareSearchQuery(input.value);
    setFeedback("loading");
    try {
      let total = 0;
      let cards: { article: Article; excerpt?: string }[];
      if (query) {
        const api = await loadSearch(base);
        if (disposed || version !== requestVersion) return;
        const prepared = prepareSearchQuery(input.value, api.vocabulary);
        const found = queryHasMatches(prepared, api.vocabulary)
          ? await api.search(prepared, {
              filters: selectedCategory ? { category: selectedCategory } : {},
            })
          : { results: [] };
        if (disposed || version !== requestVersion) return;
        total = found.results.length;
        page = Math.min(page, Math.max(1, Math.ceil(total / pageSize)));
        const start = (page - 1) * pageSize;
        const data = await Promise.all(
          found.results.slice(start, start + pageSize).map((hit) => hit.data()),
        );
        if (disposed || version !== requestVersion) return;
        cards = data.map((result) => {
          const encoded = result.meta.record
            .replace(/-/g, "+")
            .replace(/_/g, "/");
          const bytes = Uint8Array.from(atob(encoded), (character) =>
            character.charCodeAt(0),
          );
          const article: unknown = JSON.parse(new TextDecoder().decode(bytes));
          if (
            !isArticle(article) ||
            article.id !== decodeURIComponent(result.meta.id)
          )
            throw new Error("Invalid search result");
          return { article, excerpt: result.excerpt };
        });
      } else {
        const articles = await loadArticles(base);
        if (disposed || version !== requestVersion) return;
        const filtered = articles.filter(
          (article) =>
            !selectedCategory || article.categories.includes(selectedCategory),
        );
        total = filtered.length;
        page = Math.min(page, Math.max(1, Math.ceil(total / pageSize)));
        cards = filtered
          .slice((page - 1) * pageSize, page * pageSize)
          .map((article) => ({ article }));
      }
      const pages = Math.max(1, Math.ceil(total / pageSize));
      page = Math.min(page, pages);
      grid.replaceChildren(
        ...cards.map(({ article, excerpt }) =>
          renderCard(article, locale, base, excerpt),
        ),
      );
      if (count) count.textContent = String(total);
      if (empty) empty.hidden = total !== 0;
      updatePagination(page, pages, true);
      updateQuery();
      setFeedback();
      if (scroll)
        root.querySelector(".filter-bar")?.scrollIntoView({
          block: "start",
          behavior: "auto",
        });
    } catch {
      if (!disposed && version === requestVersion) {
        if (query) resetSearch();
        setFeedback("error");
      }
    }
  };
  const cancelInput = () => {
    clearTimeout(inputTimer);
    inputTimer = undefined;
  };
  const scheduleSearch = () => {
    requestVersion++;
    page = 1;
    cancelInput();
    if (composing) return;
    setFeedback("loading");
    inputTimer = setTimeout(() => {
      void update();
    }, 180);
  };
  input.addEventListener(
    "compositionstart",
    () => {
      composing = true;
      offline.setBusy(true);
      requestVersion++;
      cancelInput();
    },
    { signal: events.signal },
  );
  input.addEventListener(
    "compositionend",
    () => {
      composing = false;
      scheduleSearch();
    },
    { signal: events.signal },
  );
  input.addEventListener(
    "input",
    () => {
      scheduleSearch();
    },
    { signal: events.signal },
  );
  chips.forEach((chip) =>
    chip.addEventListener(
      "click",
      () => {
        cancelInput();
        category = chip.dataset.category || "";
        page = 1;
        showChip(chip);
        void update();
      },
      { signal: events.signal },
    ),
  );
  root.querySelector("#reset-filters")?.addEventListener(
    "click",
    () => {
      cancelInput();
      category = "";
      input.value = "";
      page = 1;
      void update();
      const allChip = chips.find((chip) => !chip.dataset.category);
      if (allChip) showChip(allChip);
    },
    { signal: events.signal },
  );
  retry?.addEventListener(
    "click",
    () => {
      void update();
    },
    { signal: events.signal },
  );
  for (const [link, direction] of [
    [previous, -1],
    [next, 1],
  ] as const) {
    link.addEventListener(
      "click",
      (event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        if (link.getAttribute("aria-disabled") === "true") {
          event.preventDefault();
          return;
        }
        if (!active()) return;
        event.preventDefault();
        cancelInput();
        page = Math.max(1, page + direction);
        void update(true);
      },
      { signal: events.signal },
    );
  }
  window.addEventListener(
    "popstate",
    () => {
      cancelInput();
      const search = new URLSearchParams(location.search);
      category = search.get("category") || "";
      if (!chips.some((chip) => chip.dataset.category === category))
        category = "";
      input.value = search.get("q") || "";
      page = Math.max(1, Number.parseInt(search.get("page") || "1", 10) || 1);
      void update();
    },
    { signal: events.signal },
  );
  currentSession = {
    root,
    dispose: () => {
      disposed = true;
      requestVersion++;
      cancelInput();
      offline.dispose();
      events.abort();
    },
  };
  syncChips();
  const selected = chips.find((chip) => chip.dataset.category === category);
  if (selected && category) showChip(selected);
  // A plain archive visit downloads no indices. Only a requested filter or search does.
  if (active()) void update();
}
