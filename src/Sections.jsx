import { clubMessages } from "./club.js";
import CoverImage from "./assets/cover.webp";
import FirstGameImage from "./assets/first-game.webp";

export function Header() {
  return (
    <header className="mast dark">
      <div className="wrap mast-inner">
        <a className="brand" href="#top">
          <span className="brand-icon" aria-hidden="true"></span>
          <span>
            <strong>Страйкбол</strong>
            <small>Клуб ВУЦ при РТУ МИРЭА</small>
          </span>
        </a>
        <nav className="nav" aria-label="Разделы сайта">
          <a href="#formats">Стоимость</a>
          <a href="#first">Новичкам</a>
          <a href="#field">Полигон</a>
          <a href="#location">Как добраться</a>
        </nav>
        <div className="mast-contacts">
          <a className="mast-phone" href="tel:+79855069992">
            +7 985 506 99 92
          </a>
          <a className="action outline" href={clubMessages}>
            Написать клубу
          </a>
        </div>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero dark" id="cover" aria-labelledby="title">
      <div className="hero-inner wrap">
        <div className="hero-stage">
          <img
            src={CoverImage}
            alt="Участники страйкбольной игры на лесной площадке клуба"
            width="1400"
            height="933"
            fetchPriority="high"
          />
        </div>
        <canvas className="hero-lines" aria-hidden="true"></canvas>
        <div className="hero-block">
          <h1 id="title">
            Страйкбол <span>в Москве</span>
          </h1>
          <p className="hero-copy">
            Приходите на открытую игру или забронируйте оборудованную площадку для своей компании.
          </p>
          <div className="hero-actions">
            <a className="action primary arrow" href={clubMessages}>
              Записаться во ВКонтакте
            </a>
            <a className="plain" href="#group">
              Узнать условия аренды
            </a>
          </div>
        </div>
        <div className="hero-meta">
          <a href="#location">
            <span className="geo-dot" aria-hidden="true"></span>
            <span>
              Метро «Юго-Западная»
              <span className="hero-address">
                {" "}
                · проспект Вернадского, 78, стр. 9
              </span>
            </span>
          </a>
          <button className="motion-toggle" type="button" hidden>
            Пауза анимации
          </button>
        </div>
      </div>
    </section>
  );
}

export function FirstGame() {
  return (
    <section className="first section" id="first" aria-labelledby="first-title">
      <canvas className="brief-terrain" aria-hidden="true"></canvas>
      <div className="wrap first-grid">
        <figure className="first-photo">
          <div className="brief-photo-frame" data-viewport="once">
            <div className="brief-photo-stage">
              <img
                src={FirstGameImage}
                width="1000"
                height="666"
                loading="lazy"
                alt="Участники клуба готовятся к старту игры"
              />
              <span className="brief-scan" aria-hidden="true"></span>
            </div>
          </div>
          <figcaption>Перед стартом игры</figcaption>
        </figure>
        <div>
          <h2 id="first-title" className="brief-title" data-viewport="once">
            Впервые{" "}
            <span className="brief-line">
              на игре?
              <span className="brief-echo" aria-hidden="true">
                на игре?
              </span>
            </span>
          </h2>
          <ol className="steps brief-steps" data-viewport="once">
            <li>
              <div>
                <strong>Напишите организатору</strong>
                <p>Уточните время и забронируйте прокат.</p>
              </div>
            </li>
            <li>
              <div>
                <strong>Пройдите инструктаж</strong>
                <p>Узнайте правила и наденьте защитные очки.</p>
              </div>
            </li>
            <li>
              <div>
                <strong>Подготовьтесь к старту</strong>
                <p>
                  На полигоне есть тёплая раздевалка, зона пристрелки, кулер с
                  питьевой водой, аппарат с кофе и перекусом.
                </p>
              </div>
            </li>
            <li>
              <div>
                <strong>Чтобы ничего не отвлекало от игры</strong>
                <p>
                  У нас можно взять снаряжение в аренду или оперативно починить
                  привод в мастерской.
                </p>
              </div>
            </li>
          </ol>
          <a className="action outline arrow brief-cta" href="#open">
            Условия открытой игры
          </a>
        </div>
      </div>
    </section>
  );
}

export function Location() {
  return (
    <section
      className="location section"
      id="location"
      aria-labelledby="location-title"
    >
      <div className="wrap location-grid">
        <div>
          <h2 id="location-title">Как добраться</h2>
          <address>Москва, проспект Вернадского, 78, стр. 9</address>
          <p>Ближайшая станция метро — «Юго-Западная».</p>
          <div className="location-actions">
            <a
              className="action outline arrow"
              href="https://yandex.ru/maps/?rtext=55.663654%2C37.483219~55.673377%2C37.479663&amp;rtt=pd"
            >
              Пешком от метро
            </a>
            <a
              className="action outline"
              href="https://yandex.ru/maps/?rtext=~55.673377%2C37.479663"
            >
              Другой маршрут
            </a>
          </div>
        </div>
        <figure className="map-frame">
          <iframe
            title="Положение клуба на Яндекс Картах"
            src="https://yandex.ru/map-widget/v1/?z=16&amp;ol=biz&amp;oid=35359491661"
            width="750"
            height="310"
            loading="lazy"
          ></iframe>
          <figcaption>
            <a href="https://yandex.ru/maps/org/straykbolny_klub_rtu_mirea/35359491661/">
              Открыть метку клуба
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section className="faq section" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <h2 id="faq-title">Частые вопросы</h2>
        <div>
          <details>
            <summary>Можно прийти без команды?</summary>
            <p>Да. Уточните свободные места у клуба.</p>
          </details>
          <details>
            <summary>Что нужно взять с собой?</summary>
            <p>
              Защитные очки обязательны. При записи уточните состав прокатного
              комплекта.
            </p>
          </details>
          <details>
            <summary>Как забронировать площадку для группы?</summary>
            <p>
              Напишите клубу дату, число игроков и сколько комплектов
              понадобится.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section
      className="contact section dark"
      id="contact"
      aria-labelledby="contact-title"
      data-viewport=""
    >
      <div className="contact-threads" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => (
          <i key={i} style={{ "--thread": i }} />
        ))}
      </div>
      <div className="wrap contact-grid">
        <div>
          <h2 className="text-mask" data-viewport="once" id="contact-title">
            Запись на игру
            <span className="mask-glint" aria-hidden="true">
              Запишитесь на игру
            </span>
          </h2>
          <p>Чтобы записаться на игру или забронировать площадку, позвоните или напишите клубу во ВКонтакте.</p>
        </div>
        <div>
          <a className="action inverse arrow" href={clubMessages}>
            Написать клубу во ВКонтакте
          </a>
          <small>
            <a href="https://yandex.ru/maps/org/straykbolny_klub_rtu_mirea/35359491661/?ysclid=mwuqo1z4ay97612082">
              просп. Вернадского, 78, стр. 9
            </a>
          </small>
          <a className="mast-phone" href="tel:+79855069992">
            +7 985 506 99 92
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer dark">
      <div className="wrap footer-inner">
        <span>Страйкбольный клуб РТУ МИРЭА</span>
        <small>
          Информация об услугах и ценах носит ознакомительный характер и не
          является публичной офертой.
        </small>
        <a href="#top">К началу страницы</a>
      </div>
    </footer>
  );
}
