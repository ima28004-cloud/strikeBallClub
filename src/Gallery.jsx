import { useRef, useState } from "react";
import GalleryBarrelsImage from "./assets/gallery-barrels.webp";
import GalleryBuildingImage from "./assets/gallery-building.webp";
import GalleryTeamImage from "./assets/gallery-team.webp";

const photos = [
  {
    src: GalleryBarrelsImage,
    alt: "Участники на площадке с зелёными бочками",
    label: "Увеличить фото: участники на площадке с зелёными бочками",
  },
  {
    src: GalleryBuildingImage,
    alt: "Двое игроков у деревянного здания",
    label: "Увеличить фото: двое игроков у деревянного здания",
  },
  {
    src: GalleryTeamImage,
    alt: "Команда собирается перед игрой",
    label: "Увеличить фото: команда собирается перед игрой",
  },
];

export function Gallery() {
  const viewer = useRef(null);
  const [index, setIndex] = useState(0);
  const photo = photos[index];
  function show(i) {
    setIndex(i);
    viewer.current.showModal();
  }
  function step(delta) {
    setIndex((i) => (i + delta + photos.length) % photos.length);
  }
  function onKeyDown(event) {
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  }
  return (
    <>
      <section
        className="section gallery dark"
        id="photos"
        aria-labelledby="gallery-title"
      >
        <div className="wrap">
          <div className="section-heading">
            <h2 className="text-mask" data-viewport="once" id="gallery-title">
              Фото с игр
              <span className="mask-glint" aria-hidden="true">
                Фото с игр
              </span>
            </h2>
          </div>
          <figure>
            <div className="gallery-grid" id="gallery">
              <div className="swarm" aria-hidden="true">
                <i
                  style={{
                    "--dx": "11px",
                    "--dy": "-8px",
                    "--lag": "76ms",
                    "--alpha": "0.85",
                  }}
                ></i>
                <i
                  style={{
                    "--dx": "19px",
                    "--dy": "0px",
                    "--lag": "110ms",
                    "--alpha": "0.66",
                  }}
                ></i>
                <i
                  style={{
                    "--dx": "24px",
                    "--dy": "10px",
                    "--lag": "140ms",
                    "--alpha": "0.61",
                  }}
                ></i>
                <i
                  style={{
                    "--dx": "10px",
                    "--dy": "15px",
                    "--lag": "170ms",
                    "--alpha": "0.46",
                  }}
                ></i>
                <i
                  style={{
                    "--dx": "-1px",
                    "--dy": "19px",
                    "--lag": "200ms",
                    "--alpha": "0.35",
                  }}
                ></i>
                <i
                  style={{
                    "--dx": "-7px",
                    "--dy": "11px",
                    "--lag": "230ms",
                    "--alpha": "0.34",
                  }}
                ></i>
              </div>
              {photos.map((photo, i) => (
                <button
                  type="button"
                  data-photo=""
                  key={photo.src}
                  aria-label={photo.label}
                  onClick={() => show(i)}
                >
                  <img
                    src={photo.src}
                    width="1000"
                    height="666"
                    loading="lazy"
                    alt={photo.alt}
                  />
                </button>
              ))}
            </div>
            <figcaption></figcaption>
          </figure>
        </div>
      </section>
      <dialog
        ref={viewer}
        onKeyDown={onKeyDown}
        id="viewer"
        aria-labelledby="viewer-title"
      >
        <div className="viewer-top">
          <strong id="viewer-title">Фото с игр</strong>
          <form method="dialog">
            <button className="viewer-button" autoFocus>
              Закрыть
            </button>
          </form>
        </div>
        <img className="viewer-photo" src={photo.src} alt={photo.alt} />
        <div className="viewer-foot">
          <p id="viewer-caption" aria-live="polite">
            {index + 1} / {photos.length} · {photo.alt}
          </p>
          <div className="viewer-controls">
            <button
              className="viewer-button"
              type="button"
              id="prev-photo"
              onClick={() => step(-1)}
            >
              Назад
            </button>
            <button
              className="viewer-button"
              type="button"
              id="next-photo"
              onClick={() => step(1)}
            >
              Далее
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
