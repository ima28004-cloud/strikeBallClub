export function terrainMotion() {
  const controller = new AbortController();
  const { signal } = controller;
  const observers = [];
  function watch(observer) {
    observers.push(observer);
    return observer;
  }
  const root = document.documentElement;
  const section = document.querySelector(".first");
  const canvas = section.querySelector(".brief-terrain");
  const photo = section.querySelector(".brief-photo-frame");
  const desktop = matchMedia("(hover: hover) and (pointer: fine)");
  const context = canvas.getContext("2d");
  if (!context) return;

  let width = 0;
  let height = 0;
  let gradient;
  let frame = 0;
  let lastDraw = 0;
  let time = 0;
  let visible = false;
  let drift = 0;
  let target = 0;
  const active = () =>
    visible && !document.hidden && root.classList.contains("motion-on");

  function paint() {
    if (!gradient) return;
    context.clearRect(0, 0, width, height);
    context.strokeStyle = gradient;
    const count = width < 700 ? 10 : 16;
    const phase = time * 0.00055;
    for (let line = 0; line < count; line++) {
      context.beginPath();
      const distance = line / (count - 1);
      for (let point = 0; point <= 58; point++) {
        const t = point / 58;
        const ridge =
          0.28 * Math.exp(-((t - 0.76 - drift * 0.07) ** 2) / 0.034);
        const curve =
          Math.sin(t * 8.8 + distance * 2.8 + phase) *
          (0.035 + distance * 0.028);
        const x = t * width;
        const y = height * (1.01 - 0.5 * t - ridge + curve + 0.57 * distance);
        if (point === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.lineWidth = line % 5 === 0 ? 1.2 : 0.72;
      context.globalAlpha = line % 5 === 0 ? 0.94 : 0.72;
      context.stroke();
    }
    context.globalAlpha = 1;
  }

  function size() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    if (!width || !height) return;
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    gradient = context.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "rgba(50,61,37,.26)");
    gradient.addColorStop(0.37, "rgba(50,61,37,.15)");
    gradient.addColorStop(0.63, "rgba(154,126,59,.13)");
    gradient.addColorStop(1, "rgba(50,61,37,.46)");
    paint();
  }

  function animate(now) {
    frame = 0;
    if (!active()) return;
    if (!lastDraw || now - lastDraw >= 34) {
      time += lastDraw ? Math.min(now - lastDraw, 48) : 0;
      lastDraw = now;
      drift += (target - drift) * 0.12;
      paint();
    }
    frame = requestAnimationFrame(animate);
  }

  function sync() {
    if (active() && !frame) frame = requestAnimationFrame(animate);
    if (!active() && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
      lastDraw = 0;
    }
  }

  section.addEventListener(
    "pointermove",
    (event) => {
      if (!active() || !desktop.matches || event.pointerType === "touch")
        return;
      const bounds = section.getBoundingClientRect();
      target = (event.clientX - bounds.left) / bounds.width - 0.5;
      if (!photo.contains(event.target)) return;
      const image = photo.getBoundingClientRect();
      photo.style.setProperty(
        "--frame-light-x",
        `${event.clientX - image.left}px`,
      );
      photo.style.setProperty(
        "--frame-light-y",
        `${event.clientY - image.top}px`,
      );
    },
    { passive: true, signal },
  );
  section.addEventListener(
    "pointerleave",
    () => {
      target = 0;
    },
    { signal },
  );
  document.addEventListener("visibilitychange", sync, { signal });
  watch(new MutationObserver(sync)).observe(root, {
    attributes: true,
    attributeFilter: ["class"],
  });
  if ("IntersectionObserver" in window) {
    watch(
      new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          sync();
        },
        { threshold: 0.08 },
      ),
    ).observe(section);
  }
  if ("ResizeObserver" in window)
    watch(new ResizeObserver(size)).observe(canvas);
  else window.addEventListener("resize", size, { passive: true, signal });
  size();
  return () => {
    controller.abort();
    observers.forEach((observer) => observer.disconnect());
    cancelAnimationFrame(frame);
  };
}
