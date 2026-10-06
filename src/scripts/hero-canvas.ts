import {
  createHeroGeometry,
  createHeroParticles,
  projectVertex,
  rotateVertex,
  type Vertex,
} from "../lib/hero-geometry";

/** The reference's slowly rotating wireframe, drawn without a WebGL dependency. */
export function initHeroCanvas(canvas: HTMLCanvasElement): () => void {
  const context = canvas.getContext("2d");
  const artwork = canvas.parentElement;
  const hero = canvas.closest(".hero");
  if (!context || !artwork || !hero) return () => {};
  const { vertices, edges } = createHeroGeometry();
  const particles = createHeroParticles();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const events = new AbortController();
  let width = 0,
    height = 0,
    ratio = 1;
  let frame: number | undefined;
  let previousTime: number | undefined;
  let seconds = 0;
  let visible = true;
  let disposed = false;
  let wireColor = "#c41e3a";
  let particleColor = "#888888";

  const palette = () => {
    const styles = getComputedStyle(document.documentElement);
    wireColor = styles.getPropertyValue("--accent").trim() || "#c41e3a";
    particleColor = styles.getPropertyValue("--muted").trim() || "#888888";
  };
  const draw = () => {
    if (!width || !height || disposed) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    context.fillStyle = particleColor;
    context.globalAlpha = 0.5;
    for (const vertex of particles) {
      const point = projectVertex(
        rotateVertex(vertex, 0, -seconds * 0.06),
        width,
        height,
      );
      if (
        point.depth <= 0.4 ||
        point.x < -4 ||
        point.x > width + 4 ||
        point.y < -4 ||
        point.y > height + 4
      )
        continue;
      context.beginPath();
      context.arc(
        point.x,
        point.y,
        Math.min(1.75, Math.max(0.45, (height * 0.005) / point.depth)),
        0,
        Math.PI * 2,
      );
      context.fill();
    }
    const projected = vertices.map((vertex) => {
      const scaled: Vertex = [
        vertex[0] * 1.2,
        vertex[1] * 1.2,
        vertex[2] * 1.2,
      ];
      return projectVertex(
        rotateVertex(scaled, 0.24 + seconds * 0.12, 0.36 + seconds * 0.18),
        width,
        height,
      );
    });
    context.strokeStyle = wireColor;
    context.globalAlpha = 0.35;
    context.lineWidth = 0.8;
    context.beginPath();
    for (const [start, end] of edges) {
      context.moveTo(projected[start].x, projected[start].y);
      context.lineTo(projected[end].x, projected[end].y);
    }
    context.stroke();
    context.globalAlpha = 1;
    artwork.classList.add("hero-art-ready");
  };
  const stop = () => {
    if (frame !== undefined) cancelAnimationFrame(frame);
    frame = undefined;
    previousTime = undefined;
  };
  const tick = (now: number) => {
    frame = undefined;
    if (
      disposed ||
      reduced.matches ||
      !visible ||
      document.hidden ||
      document.body.classList.contains("menu-open")
    )
      return;
    // Frame rate is bounded; elapsed time keeps rotation consistent on every display.
    if (previousTime === undefined || now - previousTime >= 1000 / 30) {
      seconds +=
        previousTime === undefined
          ? 0
          : Math.min((now - previousTime) / 1000, 0.1);
      previousTime = now;
      draw();
    }
    frame = requestAnimationFrame(tick);
  };
  const resume = () => {
    if (
      !disposed &&
      frame === undefined &&
      !reduced.matches &&
      visible &&
      !document.hidden &&
      !document.body.classList.contains("menu-open") &&
      width &&
      height
    )
      frame = requestAnimationFrame(tick);
  };
  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    draw();
    resume();
  };
  const viewport = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    visible ? resume() : stop();
  });
  viewport.observe(hero);
  const dimensions = new ResizeObserver(resize);
  dimensions.observe(canvas);
  const theme = new MutationObserver(() => {
    palette();
    draw();
  });
  theme.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  const menu = new MutationObserver(() => {
    document.body.classList.contains("menu-open") ? stop() : resume();
  });
  menu.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  document.addEventListener(
    "visibilitychange",
    () => {
      document.hidden ? stop() : resume();
    },
    { signal: events.signal },
  );
  reduced.addEventListener(
    "change",
    () => {
      stop();
      draw();
      resume();
    },
    { signal: events.signal },
  );
  palette();
  resize();
  return () => {
    disposed = true;
    stop();
    events.abort();
    viewport.disconnect();
    dimensions.disconnect();
    theme.disconnect();
    menu.disconnect();
    artwork.classList.remove("hero-art-ready");
  };
}
