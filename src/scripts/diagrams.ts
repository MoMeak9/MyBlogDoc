type Diagram = {
  figure: HTMLElement;
  visual: HTMLElement;
  status: HTMLElement;
  source: HTMLDetailsElement;
  text: string;
  rendered: boolean;
  busy: boolean;
};
let library: Promise<typeof import("mermaid")> | undefined;
let sequence = 0;

/** Diagram code remains readable HTML; the rendering library loads only near a diagram. */
export function initDiagrams() {
  const blocks = [
    ...document.querySelectorAll<HTMLPreElement>(
      '.prose pre[data-language="mermaid"]',
    ),
  ];
  if (!blocks.length) return;
  const english = document.documentElement.lang.startsWith("en");
  const labels = english
    ? {
        source: "Diagram source",
        loading: "Loading diagram…",
        error: "The diagram could not be drawn. Its source is available below.",
        diagram: "Diagram",
      }
    : {
        source: "图示源码",
        loading: "正在绘制图示…",
        error: "图示暂时无法绘制，可查看下方源码。",
        diagram: "图示",
      };
  const figures: Diagram[] = [];
  for (const pre of blocks) {
    const text = pre.querySelector("code")?.textContent;
    if (!text) continue;
    const figure = document.createElement("figure");
    figure.className = "article-diagram";
    const visual = document.createElement("div");
    visual.className = "diagram-visual";
    visual.setAttribute("data-lenis-prevent", "");
    const status = document.createElement("p");
    status.className = "diagram-status";
    status.textContent = labels.loading;
    const source = document.createElement("details");
    source.className = "diagram-source";
    source.open = true;
    const summary = document.createElement("summary");
    summary.textContent = labels.source;
    pre.before(figure);
    source.append(summary, pre);
    figure.append(status, visual, source);
    figures.push({
      figure,
      visual,
      status,
      source,
      text,
      rendered: false,
      busy: false,
    });
  }
  let dark = document.documentElement.classList.contains("dark");
  let disposed = false;
  const render = async (diagram: Diagram) => {
    if (diagram.busy || disposed) return;
    diagram.busy = true;
    try {
      library ??= import("mermaid");
      const { default: mermaid } = await library;
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        suppressErrorRendering: true,
        theme: dark ? "dark" : "default",
        fontFamily: "Arial, sans-serif",
        flowchart: { htmlLabels: false, useMaxWidth: true },
      });
      const { svg } = await mermaid.render(
        `article-diagram-${++sequence}`,
        diagram.text,
      );
      if (disposed || !diagram.figure.isConnected) return;
      // Mermaid's strict renderer sanitizes its SVG; imported prose is never executable.
      const document = new DOMParser().parseFromString(svg, "image/svg+xml");
      const image = document.documentElement;
      if (image.localName !== "svg") throw new Error("Invalid diagram output");
      image.setAttribute("role", "img");
      image.setAttribute("aria-label", labels.diagram);
      diagram.visual.replaceChildren(image);
      diagram.status.hidden = true;
      diagram.source.open = false;
      diagram.rendered = true;
    } catch {
      if (!disposed) {
        diagram.status.textContent = labels.error;
        diagram.source.open = true;
      }
    } finally {
      diagram.busy = false;
    }
  };
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) {
          const diagram = figures.find((item) => item.figure === entry.target);
          if (diagram && !diagram.rendered) {
            void render(diagram);
            observer.unobserve(entry.target);
          }
        }
    },
    { rootMargin: "160px" },
  );
  figures.forEach((diagram) => observer.observe(diagram.figure));
  const theme = new MutationObserver(() => {
    const next = document.documentElement.classList.contains("dark");
    if (dark === next) return;
    dark = next;
    for (const diagram of figures) if (diagram.rendered) void render(diagram);
  });
  theme.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  const dispose = () => {
    disposed = true;
    observer.disconnect();
    theme.disconnect();
  };
  document.addEventListener("astro:before-swap", dispose, { once: true });
  window.addEventListener(
    "pagehide",
    (event) => {
      if (!event.persisted) dispose();
    },
    { once: true },
  );
}
