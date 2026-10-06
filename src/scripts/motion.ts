import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type MotionSession = { dispose: () => void };
let currentSession: MotionSession | undefined;

const easeScroll = (progress: number) =>
  Math.min(1, 1.001 - 2 ** (-10 * progress));
const nativeScrollRegions =
  'pre, code, table, .toc, dialog, textarea, select, [contenteditable="true"], [data-lenis-prevent]';

/** Reconnect on Astro navigation or BFCache restoration without retaining a page's effects. */
export function initMotion(): () => void {
  currentSession?.dispose();
  if (typeof window === "undefined") return () => {};
  gsap.registerPlugin(ScrollTrigger);

  const events = new AbortController();
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const frames = new Set<number>();
  const counted = new WeakSet<HTMLElement>();
  const countTargets = new WeakMap<HTMLElement, number>();
  const countTweens = new Map<HTMLElement, gsap.core.Tween>();
  let context: gsap.Context | undefined;
  let lenis: Lenis | undefined;
  let counterObserver: IntersectionObserver | undefined;
  let overlayObserver: MutationObserver | undefined;
  let pageBody: HTMLElement | undefined;
  let active = false;
  let preservePosition = false;
  let disposed = false;

  const schedule = (callback: () => void) => {
    const frame = requestAnimationFrame(() => {
      frames.delete(frame);
      callback();
    });
    frames.add(frame);
  };
  const counters = () =>
    Array.from(document.querySelectorAll<HTMLElement>("[data-counter]"));
  const counterTarget = (element: HTMLElement) => {
    if (countTargets.has(element)) return countTargets.get(element);
    const value = Number(
      element.dataset.counter || element.textContent?.trim(),
    );
    if (!Number.isFinite(value) || value < 0) return undefined;
    countTargets.set(element, value);
    return value;
  };
  const finishCounters = () =>
    counters().forEach((element) => {
      const target = counterTarget(element);
      if (target !== undefined) element.textContent = String(target);
    });
  const cancelInertia = () => {
    if (lenis?.isScrolling !== "smooth") return;
    // Reset through public lifecycle methods without writing scrollTo(), so native
    // focus, scrollIntoView and the browser's smooth scrolling can keep their target.
    lenis.stop();
    lenis.start();
  };
  const tick = (seconds: number) => {
    if (!lenis) return;
    // Lenis owns its last animated position. A larger difference than browser
    // subpixel rounding means an external native scroll has taken over.
    if (Math.abs(lenis.actualScroll - lenis.animatedScroll) > 1)
      cancelInertia();
    lenis.raf(seconds * 1000);
  };
  const stopScrolling = () => {
    gsap.ticker.remove(tick);
    if (lenis) {
      lenis.stop();
      // stop() consumes native wheel events and applies overflow:clip. Destroy while
      // paused so dialogs, reduced motion and keyboard navigation keep native scroll.
      lenis.destroy();
      lenis = undefined;
    }
  };
  const overlayOpen = () =>
    document.body.classList.contains("menu-open") ||
    Boolean(document.querySelector("dialog[open]"));
  const startScrolling = () => {
    if (!active || reducedMotion.matches || overlayOpen() || lenis) return;
    lenis = new Lenis({
      duration: 1.2,
      easing: easeScroll,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
      anchors: false,
      prevent: (node) => node.matches(nativeScrollRegions),
      virtualScroll: ({ event }) => {
        if (!event.ctrlKey) return true;
        cancelInertia();
        return false;
      },
    });
    lenis.on("scroll", ScrollTrigger.update);
    lenis.start();
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
  };
  const syncOverlay = () =>
    overlayOpen() ? stopScrolling() : startScrolling();

  const stopEffects = () => {
    stopScrolling();
    counterObserver?.disconnect();
    counterObserver = undefined;
    countTweens.forEach((tween) => tween.kill());
    countTweens.clear();
    context?.revert();
    context = undefined;
    finishCounters();
  };
  const startEffects = () => {
    stopEffects();
    if (!active || reducedMotion.matches) return;
    startScrolling();
    context = gsap.context(() => {
      document
        .querySelectorAll<HTMLElement>('[data-animate="fade-up"]')
        .forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      document
        .querySelectorAll<HTMLElement>('[data-animate="stagger"]')
        .forEach((element) => {
          const children = element.querySelectorAll("[data-stagger-item]");
          if (children.length)
            gsap.fromTo(
              children,
              { opacity: 0, y: 32 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              },
            );
        });
      document
        .querySelectorAll<HTMLElement>('[data-animate="parallax"]')
        .forEach((element) => {
          gsap.to(element, {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      document
        .querySelectorAll<HTMLElement>('[data-animate="line"]')
        .forEach((element) => {
          gsap.fromTo(
            element,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 1,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
    }, document.body);

    if ("IntersectionObserver" in window) {
      counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const element = entry.target as HTMLElement;
            if (
              !entry.isIntersecting ||
              entry.intersectionRatio < 0.5 ||
              counted.has(element)
            )
              return;
            const target = counterTarget(element);
            if (target === undefined) return;
            counted.add(element);
            counterObserver?.unobserve(element);
            const state = { value: 0 };
            element.textContent = "0";
            countTweens.set(
              element,
              gsap.to(state, {
                value: target,
                duration: 1.8,
                ease: (progress) =>
                  progress === 1 ? 1 : 1 - 2 ** (-10 * progress),
                onUpdate: () => {
                  element.textContent = String(Math.floor(state.value));
                },
                onComplete: () => {
                  element.textContent = String(target);
                  countTweens.delete(element);
                },
              }),
            );
          });
        },
        { threshold: 0.5 },
      );
      counters().forEach((element) => counterObserver?.observe(element));
    }
    schedule(() => ScrollTrigger.refresh());
  };

  const hashTarget = (hash: string): HTMLElement | null => {
    if (!hash || hash === "#") return null;
    try {
      return document.getElementById(decodeURIComponent(hash.slice(1)));
    } catch {
      return document.getElementById(hash.slice(1));
    }
  };
  const anchorPosition = (target: HTMLElement) => {
    // Legacy Markdown aliases are zero-height spans directly before their heading.
    const heading =
      target.classList.contains("legacy-anchor") &&
      target.nextElementSibling instanceof HTMLElement
        ? target.nextElementSibling
        : target;
    const headerHeight =
      document.querySelector(".site-header")?.getBoundingClientRect().height ||
      0;
    const top =
      heading.getBoundingClientRect().top + window.scrollY - headerHeight - 24;
    return Math.max(
      0,
      Math.min(top, document.documentElement.scrollHeight - window.innerHeight),
    );
  };
  const goToAnchor = (
    target: HTMLElement,
    immediate: boolean,
    focus = false,
  ) => {
    const complete = () => {
      if (!focus || disposed || !target.isConnected) return;
      const hadTabIndex = target.hasAttribute("tabindex");
      if (!hadTabIndex) {
        target.setAttribute("tabindex", "-1");
        target.addEventListener(
          "blur",
          () => target.removeAttribute("tabindex"),
          { once: true, signal: events.signal },
        );
      }
      target.focus({ preventScroll: true });
    };
    const top = anchorPosition(target);
    if (lenis) lenis.scrollTo(top, { immediate, onComplete: complete });
    else {
      window.scrollTo({ top, behavior: "instant" });
      complete();
    }
  };
  const alignHash = () => {
    const target = hashTarget(location.hash);
    if (target) goToAnchor(target, true);
  };
  const onAnchorClick = (event: MouseEvent) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const link = event
      .composedPath()
      .find((node) => node instanceof HTMLAnchorElement) as
      HTMLAnchorElement | undefined;
    if (
      !link ||
      link.hasAttribute("download") ||
      (link.target && link.target !== "_self")
    )
      return;
    const url = new URL(link.href, location.href);
    if (
      url.origin !== location.origin ||
      url.pathname !== location.pathname ||
      url.search !== location.search
    )
      return;
    const target = hashTarget(url.hash);
    if (!target) return;
    event.preventDefault();
    if (url.hash !== location.hash) history.pushState(null, "", url);
    goToAnchor(target, reducedMotion.matches, true);
  };
  const suspend = () => {
    active = false;
    frames.forEach((frame) => cancelAnimationFrame(frame));
    frames.clear();
    overlayObserver?.disconnect();
    overlayObserver = undefined;
    stopEffects();
  };
  const mount = (restored = false) => {
    if (disposed || (active && pageBody === document.body)) return;
    suspend();
    pageBody = document.body;
    preservePosition = restored;
    active = true;
    startEffects();
    overlayObserver = new MutationObserver(syncOverlay);
    overlayObserver.observe(document.documentElement, {
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "open"],
    });
    if (!preservePosition) schedule(alignHash);
  };
  const dispose = () => {
    if (disposed) return;
    suspend();
    disposed = true;
    events.abort();
    if (currentSession?.dispose === dispose) currentSession = undefined;
  };
  currentSession = { dispose };

  const preserveReaderPosition = () => {
    preservePosition = true;
  };
  document.addEventListener("wheel", preserveReaderPosition, {
    passive: true,
    capture: true,
    signal: events.signal,
  });
  document.addEventListener(
    "pointerdown",
    () => {
      preserveReaderPosition();
      cancelInertia();
    },
    { passive: true, capture: true, signal: events.signal },
  );
  document.addEventListener(
    "touchstart",
    () => {
      preserveReaderPosition();
      cancelInertia();
    },
    { passive: true, capture: true, signal: events.signal },
  );
  document.addEventListener("focusin", cancelInertia, {
    signal: events.signal,
  });
  document.addEventListener("click", onAnchorClick, { signal: events.signal });
  document.addEventListener(
    "keydown",
    (event) => {
      preserveReaderPosition();
      // Keep keyboard scrolling native and cancel any wheel inertia before its default action.
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
        ].includes(event.key)
      ) {
        cancelInertia();
      }
    },
    { signal: events.signal },
  );
  document.addEventListener("astro:before-swap", suspend, {
    signal: events.signal,
  });
  document.addEventListener("astro:page-load", () => mount(), {
    signal: events.signal,
  });
  window.addEventListener("pagehide", suspend, { signal: events.signal });
  window.addEventListener(
    "pageshow",
    (event) => {
      if (event.persisted) mount(true);
    },
    { signal: events.signal },
  );
  window.addEventListener("hashchange", alignHash, { signal: events.signal });
  const refreshLayout = () => {
    ScrollTrigger.refresh();
    if (!preservePosition) alignHash();
  };
  window.addEventListener(
    "load",
    () => {
      if (active) schedule(refreshLayout);
    },
    { signal: events.signal },
  );
  reducedMotion.addEventListener(
    "change",
    () => {
      if (active) startEffects();
    },
    { signal: events.signal },
  );
  mount();
  void document.fonts?.ready.then(() => {
    if (active && !disposed) schedule(refreshLayout);
  });
  return dispose;
}
