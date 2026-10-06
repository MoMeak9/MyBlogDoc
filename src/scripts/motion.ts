import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type MotionSession = { dispose: () => void };
let currentSession: MotionSession | undefined;

/** Reconnect on navigation and resume effects preserved in the browser's page cache. */
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
  let counterObserver: IntersectionObserver | undefined;
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
  const stopEffects = () => {
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
  const goToAnchor = (target: HTMLElement, focus = false) => {
    const complete = () => {
      if (!focus || disposed || !target.isConnected) return;
      const focusTarget =
        target.classList.contains("legacy-anchor") &&
        target.nextElementSibling instanceof HTMLElement
          ? target.nextElementSibling
          : target;
      const hadTabIndex = focusTarget.hasAttribute("tabindex");
      if (!hadTabIndex) {
        focusTarget.setAttribute("tabindex", "-1");
        focusTarget.addEventListener(
          "blur",
          () => focusTarget.removeAttribute("tabindex"),
          { once: true, signal: events.signal },
        );
      }
      focusTarget.focus({ preventScroll: true });
      document.dispatchEvent(
        new CustomEvent("blog:anchor-complete", {
          detail: { target, focus: true },
        }),
      );
    };
    const top = anchorPosition(target);
    window.scrollTo({ top, behavior: "instant" });
    complete();
  };
  const alignHash = () => {
    const target = hashTarget(location.hash);
    if (target) goToAnchor(target);
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
    // The browser owns hash navigation and history. Correct only the sticky
    // header offset and notify a mobile contents panel after its default action.
    schedule(() => goToAnchor(target, true));
  };
  const suspend = () => {
    active = false;
    frames.forEach((frame) => cancelAnimationFrame(frame));
    frames.clear();
    stopEffects();
  };
  const mount = (restored = false) => {
    if (disposed || (active && pageBody === document.body)) return;
    if (restored && pageBody === document.body) {
      preservePosition = true;
      active = true;
      ScrollTrigger.update();
      return;
    }
    suspend();
    pageBody = document.body;
    preservePosition = restored;
    active = true;
    startEffects();
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
    },
    { passive: true, capture: true, signal: events.signal },
  );
  document.addEventListener(
    "touchstart",
    () => {
      preserveReaderPosition();
    },
    { passive: true, capture: true, signal: events.signal },
  );
  document.addEventListener("click", onAnchorClick, { signal: events.signal });
  document.addEventListener("keydown", preserveReaderPosition, {
    signal: events.signal,
  });
  document.addEventListener("astro:before-swap", suspend, {
    signal: events.signal,
  });
  document.addEventListener("astro:page-load", () => mount(), {
    signal: events.signal,
  });
  window.addEventListener(
    "pagehide",
    (event) => {
      if (!event.persisted) {
        suspend();
        return;
      }
      active = false;
      frames.forEach((frame) => cancelAnimationFrame(frame));
      frames.clear();
    },
    { signal: events.signal },
  );
  window.addEventListener(
    "pageshow",
    (event) => {
      if (event.persisted) mount(true);
    },
    { signal: events.signal },
  );
  document.addEventListener("blog:anchor-layout-change", alignHash, {
    signal: events.signal,
  });
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
