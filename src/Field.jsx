import { rentalRates, rubles } from "./club.js";
import { useRef, useState } from "react";
import FieldImage from "./assets/field.webp";
import FieldMapImage from "./assets/field-map.webp";

export function Field() {
  const [zoomed, setZoomed] = useState(false);
  const viewport = useRef(null);
  function toggleZoom() {
    if (zoomed) viewport.current.scrollTo(0, 0);
    setZoomed(!zoomed);
  }
  return (
    <section
      className="field dark section"
      id="field"
      aria-labelledby="field-title"
    >
      <div className="wrap">
        <div className="section-heading">
          <h2 className="text-mask" data-viewport="once" id="field-title">
            Аренда площадок
            <span className="mask-glint" aria-hidden="true">
              Аренда площадок
            </span>
          </h2>
        </div>
        <div className="field-layout">
          <figure className="field-photo">
            <img
              src={FieldImage}
              width="1000"
              height="666"
              loading="lazy"
              alt="Участники идут по открытой площадке клуба"
            />
            <figcaption>Открытая площадка</figcaption>
          </figure>
          <div>
            <dl id="rental-rates" aria-labelledby="field-title">
              {rentalRates.map((rate) => (
                <div key={rate.name}>
                  <dt>
                    {rate.name} · до {rate.capacity} человек
                  </dt>
                  <dd>{rubles(rate.price)}{rate.unit && ` за ${rate.unit}`}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <figure className={zoomed ? "field-map is-zoomed" : "field-map"}>
          <figcaption className="field-map-heading">
            <h3 id="field-map-title">Карта полигона</h3>
            <button
              className="action outline field-map-toggle"
              type="button"
              aria-controls="field-map-viewport"
              aria-pressed={zoomed}
              onClick={toggleZoom}
            >
              {zoomed ? "Показать целиком" : "Увеличить карту"}
            </button>
          </figcaption>
          <p className="field-map-hint" id="field-map-hint" hidden={!zoomed}>
            Прокрутите схему в нужном направлении.
          </p>
          <div
            className="field-map-viewport"
            id="field-map-viewport"
            ref={viewport}
            tabIndex={zoomed ? 0 : undefined}
            aria-describedby={zoomed ? "field-map-hint" : undefined}
            role="region"
            aria-labelledby="field-map-title"
          >
            <img
              src={FieldMapImage}
              width="1280"
              height="720"
              loading="lazy"
              alt="Схема игровых зон страйкбольного клуба"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
