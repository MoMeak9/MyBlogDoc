import { ui, dateLabel, type Locale } from "../i18n";
import { localePath, normalizeBase, postPath } from "../lib/paths.mjs";

type Article = {
  id: string;
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  readMinutes: number;
  publishedDate?: string;
  modifiedDate?: string;
};
type JournalSession = { root: HTMLElement; dispose: () => void };

let currentSession: JournalSession | undefined;
let articleRequest: Promise<Article[]> | undefined;
let searchRequest: Promise<Map<string, string>> | undefined;
const pageSize = 12;
const images = [
  "editorial-writing.jpg",
  "editorial-design.jpg",
  "editorial-engineering.jpg",
];

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
        return records.filter((record): record is Article => {
          if (!record || typeof record !== "object") return false;
          const article = record as Article;
          return (
            typeof article.id === "string" &&
            !!article.id &&
            !article.id
              .split("/")
              .some((part) => part === "." || part === "..") &&
            typeof article.title === "string" &&
            typeof article.description === "string" &&
            Array.isArray(article.categories) &&
            article.categories.every((item) => typeof item === "string") &&
            Array.isArray(article.tags) &&
            article.tags.every((item) => typeof item === "string")
          );
        });
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
    searchRequest = fetchJson(`${base}search-index.json`)
      .then((value) => {
        const records = (value as { articles?: unknown[] })?.articles;
        if (!Array.isArray(records)) throw new Error("Invalid search index");
        const index = new Map<string, string>();
        for (const record of records) {
          if (!record || typeof record !== "object") continue;
          const article = record as { id?: unknown; text?: unknown };
          if (
            typeof article.id === "string" &&
            typeof article.text === "string"
          )
            index.set(article.id, article.text.toLocaleLowerCase());
        }
        return index;
      })
      .catch((error) => {
        searchRequest = undefined;
        throw error;
      });
  }
  return searchRequest;
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
  index: number,
  locale: Locale,
  base: string,
) {
  const t = ui(locale);
  const card = element("article", "post-card");
  const link = element("a");
  link.href = postPath(article.id, locale, base);
  const figure = element("figure");
  const image = element("img", "post-art");
  image.src = `${base}images/${images[index % images.length]}`;
  image.alt = "";
  image.width = 600;
  image.height = 450;
  image.loading = "lazy";
  image.decoding = "async";
  figure.append(image);
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
  link.append(
    figure,
    meta,
    element("h3", undefined, article.title),
    element("p", "post-description", article.description || t.empty),
    read,
  );
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
    const words = input.value
      .trim()
      .toLocaleLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    setFeedback("loading");
    try {
      const [articles, text] = await Promise.all([
        loadArticles(base),
        words.length
          ? loadSearch(base)
          : Promise.resolve(new Map<string, string>()),
      ]);
      if (disposed || version !== requestVersion) return;
      const filtered = articles.filter((article) => {
        if (selectedCategory && !article.categories.includes(selectedCategory))
          return false;
        if (!words.length) return true;
        const haystack =
          `${article.title} ${article.description} ${article.tags.join(" ")} ${text.get(article.id) ?? ""}`.toLocaleLowerCase();
        return words.every((word) => haystack.includes(word));
      });
      const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
      page = Math.min(page, pages);
      const start = (page - 1) * pageSize;
      grid.replaceChildren(
        ...filtered
          .slice(start, start + pageSize)
          .map((article, index) =>
            renderCard(article, start + index, locale, base),
          ),
      );
      if (count) count.textContent = String(filtered.length);
      if (empty) empty.hidden = filtered.length !== 0;
      updatePagination(page, pages, true);
      updateQuery();
      setFeedback();
      if (scroll)
        root.querySelector(".filter-bar")?.scrollIntoView({
          block: "start",
          behavior: "auto",
        });
    } catch {
      if (!disposed && version === requestVersion) setFeedback("error");
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
    inputTimer = setTimeout(() => {
      void update();
    }, 180);
  };
  input.addEventListener(
    "compositionstart",
    () => {
      composing = true;
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
      events.abort();
    },
  };
  syncChips();
  const selected = chips.find((chip) => chip.dataset.category === category);
  if (selected && category) showChip(selected);
  // A plain archive visit downloads no indices. Only a requested filter or search does.
  if (active()) void update();
}
