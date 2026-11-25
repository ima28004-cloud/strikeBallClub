export function sectionMotion() {
  const controller = new AbortController();
  const { signal } = controller;
  const observers = [];
  function watch(observer) {
    observers.push(observer);
    return observer;
  }
  const root = document.documentElement;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const motionEnabled = () => root.classList.contains("motion-on");
  const trackingEnabled = (event) =>
    motionEnabled() && finePointer.matches && event.pointerType !== "touch";
  const formats = document.querySelector("#formats");
  const grid = formats.querySelector(".format-grid");
  const gallery = document.querySelector(".gallery-grid");
  const swarm = gallery.querySelector(".swarm");
  const targets = [...document.querySelectorAll("[data-viewport]")];

  if ("IntersectionObserver" in window) {
    const view = watch(
      new IntersectionObserver(
        (entries, observer) => {
          for (const entry of entries) {
            if (entry.target.dataset.viewport === "once") {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-in-view");
                observer.unobserve(entry.target);
              }
            } else {
              entry.target.classList.toggle("is-in-view", entry.isIntersecting);
            }
          }
        },
        { threshold: 0.1 },
      ),
    );
    targets.forEach((target) => view.observe(target));
  } else {
    targets.forEach((target) => target.classList.add("is-in-view"));
  }

  formats.addEventListener(
    "pointermove",
    (event) => {
      if (!trackingEnabled(event)) return;
      const region = formats.getBoundingClientRect();
      const horizontal = (event.clientX - region.left) / region.width - 0.5;
      grid.style.setProperty("--grid-x", `${horizontal * 44}px`);
      const offer = event.target.closest(".offer");
      if (!offer) return;
      const card = offer.getBoundingClientRect();
      offer.style.setProperty("--light-x", `${event.clientX - card.left}px`);
      offer.style.setProperty("--light-y", `${event.clientY - card.top}px`);
    },
    { passive: true, signal },
  );
  formats.addEventListener(
    "pointerleave",
    () => grid.style.removeProperty("--grid-x"),
    { signal },
  );

  gallery.addEventListener(
    "pointermove",
    (event) => {
      if (!trackingEnabled(event)) return;
      const board = gallery.getBoundingClientRect();
      swarm.style.setProperty("--swarm-x", `${event.clientX - board.left}px`);
      swarm.style.setProperty("--swarm-y", `${event.clientY - board.top}px`);
      swarm.classList.add("is-tracking");
    },
    { passive: true, signal },
  );
  gallery.addEventListener(
    "pointerleave",
    () => swarm.classList.remove("is-tracking"),
    { signal },
  );

  const rail = document.querySelector(".section-rail");
  const railCurrent = rail.querySelector(".rail-current");
  const railIndicator = rail.querySelector(".rail-indicator");
  const links = [...rail.querySelectorAll("a")];
  const sections = links.map((link) =>
    document.getElementById(link.hash.slice(1)),
  );
  let progressFrame = 0;
  let activeIndex = -1;
  function updateProgress() {
    progressFrame = 0;
    const max = root.scrollHeight - innerHeight;
    root.style.setProperty(
      "--page-progress",
      max > 0 ? Math.max(0, Math.min(1, scrollY / max)) : 0,
    );
    let current = 0;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top < innerHeight * 0.44)
        current = index;
    });
    if (max > 0 && scrollY >= max - 2) current = links.length - 1;
    if (current === activeIndex) return;
    links[activeIndex]?.removeAttribute("aria-current");
    links[current].setAttribute("aria-current", "location");
    rail.style.setProperty("--rail-index", current);
    railCurrent.textContent = links[current].getAttribute("aria-label");
    railCurrent.hidden = false;
    railIndicator.hidden = false;
    activeIndex = current;
  }
  function queueProgress() {
    if (!progressFrame) progressFrame = requestAnimationFrame(updateProgress);
  }
  window.addEventListener("scroll", queueProgress, { passive: true, signal });
  window.addEventListener("resize", queueProgress, { passive: true, signal });
  if ("ResizeObserver" in window)
    watch(new ResizeObserver(queueProgress)).observe(
      document.querySelector("main"),
    );
  queueProgress();
  return () => {
    controller.abort();
    observers.forEach((observer) => observer.disconnect());
    cancelAnimationFrame(progressFrame);
  };
}
