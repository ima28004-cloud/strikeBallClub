export function heroMotion() {
  const controller = new AbortController();
  const { signal } = controller;
  const observers = [];
  function watch(observer) {
    observers.push(observer);
    return observer;
  }
  const hero = document.querySelector(".hero");
  const canvas = document.querySelector(".hero-lines");
  const toggle = document.querySelector(".motion-toggle");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const context = canvas.getContext("2d");
  if (!context) return;

  let width = 0;
  let height = 0;
  let gradient;
  let frame = 0;
  let time = 0;
  let lastFrame = 0;
  let pointer = 0;
  let targetPointer = 0;
  let inView = true;
  let paused = false;

  const enabled = () => !paused && !reduce.matches;

  function draw() {
    context.clearRect(0, 0, width, height);
    const narrow = width < 700;
    const lines = narrow ? 12 : 20;
    const drift = time * 0.00032;
    const step = narrow ? 0.024 : 0.018;
    for (let line = 0; line < lines; line++) {
      const offset = (line - (lines - 1) / 2) * step;
      context.beginPath();
      for (let i = 0; i <= 60; i++) {
        const x = i / 60;
        const bend = Math.sin(6.4 * x - drift + offset * 4.8) * 0.094;
        const arc =
          Math.exp(-Math.pow((x - 0.89) / 0.19, 2)) * (narrow ? 0.14 : 0.25);
        const y =
          height *
          (0.9 + offset + bend - arc + pointer * 0.058 * Math.sin(Math.PI * x));
        if (i === 0) context.moveTo(x * width, y);
        else context.lineTo(x * width, y);
      }
      context.strokeStyle = gradient;
      context.globalAlpha = line % 5 === 0 ? 0.82 : 0.47;
      context.lineWidth = line % 5 === 0 ? 1.12 : 0.72;
      context.stroke();
    }
    context.globalAlpha = 1;
  }

  function tick(now) {
    frame = 0;
    if (!enabled() || !inView || document.hidden) return;
    if (!lastFrame || now - lastFrame >= 32) {
      time += lastFrame ? Math.min(now - lastFrame, 45) : 0;
      lastFrame = now;
      pointer += (targetPointer - pointer) * 0.13;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }

  function sync() {
    const animate = enabled() && inView && !document.hidden;
    document.documentElement.classList.toggle("motion-on", enabled());
    toggle.hidden = reduce.matches;
    toggle.textContent = paused ? "Включить анимацию" : "Пауза анимации";
    if (animate && !frame) frame = requestAnimationFrame(tick);
    if (!animate && frame) {
      cancelAnimationFrame(frame);
      lastFrame = 0;
      frame = 0;
    }
    if (reduce.matches) {
      pointer = 0;
      targetPointer = 0;
      draw();
    }
  }

  function size() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    if (!width || !height) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    gradient = context.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "rgba(154,126,59,.12)");
    gradient.addColorStop(0.33, "rgba(210,207,154,.62)");
    gradient.addColorStop(0.62, "rgba(210,207,154,.50)");
    gradient.addColorStop(0.88, "rgba(210,207,154,.72)");
    gradient.addColorStop(1, "rgba(154,126,59,.19)");
    draw();
  }

  hero.addEventListener(
    "pointermove",
    (event) => {
      if (!enabled() || !finePointer.matches || event.pointerType === "touch")
        return;
      const bounds = hero.getBoundingClientRect();
      targetPointer = (event.clientY - bounds.top) / bounds.height - 0.5;
    },
    { passive: true, signal },
  );
  hero.addEventListener(
    "pointerleave",
    () => {
      targetPointer = 0;
    },
    { signal },
  );
  toggle.addEventListener(
    "click",
    () => {
      paused = !paused;
      sync();
    },
    { signal },
  );
  reduce.addEventListener("change", sync, { signal });
  document.addEventListener("visibilitychange", sync, { signal });
  if ("IntersectionObserver" in window) {
    const observer = watch(
      new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        sync();
      }),
    );
    observer.observe(hero);
  }
  if ("ResizeObserver" in window)
    watch(new ResizeObserver(size)).observe(canvas);
  else window.addEventListener("resize", size, { passive: true, signal });

  // A small, independently moving crop in each tile, with stationary buttons.
  const gallery = document.querySelector(".gallery-grid");
  const tiles = Array.from(gallery.querySelectorAll("button"));
  gallery.addEventListener(
    "pointermove",
    (event) => {
      if (!enabled() || !finePointer.matches || event.pointerType === "touch")
        return;
      const bounds = gallery.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      tiles.forEach((tile, index) => {
        tile.style.setProperty("--tile-x", `${x * (index === 1 ? -23 : 28)}px`);
        tile.style.setProperty("--tile-y", `${y * (index === 1 ? 19 : -16)}px`);
      });
    },
    { passive: true, signal },
  );
  gallery.addEventListener(
    "pointerleave",
    () => {
      for (const tile of tiles) {
        tile.style.removeProperty("--tile-x");
        tile.style.removeProperty("--tile-y");
      }
    },
    { signal },
  );

  size();
  sync();
  return () => {
    controller.abort();
    observers.forEach((observer) => observer.disconnect());
    cancelAnimationFrame(frame);
  };
}
