import { clubMessages } from "./club.js";
import { useEffect, useState } from "react";

export function SectionRail() {
  return (
    <nav className="section-rail" aria-label="Навигация по разделам">
      <span className="rail-current" aria-hidden="true" hidden>
        Начало
      </span>
      <div className="rail-track">
        <span className="rail-indicator" aria-hidden="true" hidden></span>
        <a className="rail-link" href="#cover" aria-label="Начало">
          <span className="rail-node" aria-hidden="true"></span>
          <span className="rail-hint" aria-hidden="true">
            Начало
          </span>
        </a>
        <a className="rail-link" href="#formats" aria-label="Форматы и цены">
          <span className="rail-node" aria-hidden="true"></span>
          <span className="rail-hint" aria-hidden="true">
            Форматы и цены
          </span>
        </a>
        <a className="rail-link" href="#first" aria-label="Новичкам">
          <span className="rail-node" aria-hidden="true"></span>
          <span className="rail-hint" aria-hidden="true">
            Новичкам
          </span>
        </a>
        <a className="rail-link" href="#field" aria-label="Полигон">
          <span className="rail-node" aria-hidden="true"></span>
          <span className="rail-hint" aria-hidden="true">
            Полигон
          </span>
        </a>
        <a className="rail-link" href="#photos" aria-label="Фото с игр">
          <span className="rail-node" aria-hidden="true"></span>
          <span className="rail-hint" aria-hidden="true">
            Фото с игр
          </span>
        </a>
        <a className="rail-link" href="#location" aria-label="Как добраться">
          <span className="rail-node" aria-hidden="true"></span>
          <span className="rail-hint" aria-hidden="true">
            Как добраться
          </span>
        </a>
        <a className="rail-link" href="#contact" aria-label="Запись">
          <span className="rail-node" aria-hidden="true"></span>
          <span className="rail-hint" aria-hidden="true">
            Запись
          </span>
        </a>
      </div>
    </nav>
  );
}

export function QuickBooking() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio >= 0.6) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setHidden(visible.size > 0);
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.6 },
    );
    document
      .querySelectorAll(".hero .primary, .offer .primary, .contact .action")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <aside hidden={hidden} className="mobile-book" aria-label="Быстрая запись">
      <a className="action primary arrow" href={clubMessages}>
        Записаться во ВКонтакте
      </a>
    </aside>
  );
}
