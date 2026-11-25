import {
  event,
  clubVK,
  clubMessages,
  venueRates,
  kitRate,
  rubles,
} from "./club.js";

export function GameNotice({ upcoming }) {
  return (
    <div className="current">
      <div className="wrap current-inner">
        <div>
          <b id="next-title">
            {upcoming ? `Ближайшая игра · ${event.dateLabel}` : "Открытые игры"}
          </b>
          <p id="next-info">
            {upcoming
              ? `${event.price} за участника`
              : "Даты и прокат уточняйте у организатора."}
          </p>
        </div>
        <a id="next-link" href={clubVK}>
          Объявления клуба
        </a>
      </div>
    </div>
  );
}

export function Offers() {
  return (
    <section
      className="section formats dark"
      id="formats"
      aria-labelledby="formats-title"
      data-viewport=""
    >
      <div className="format-grid" aria-hidden="true">
        <div className="format-grid-inner">
          {Array.from({ length: 4 }, (_, row) => (
            <div className="tile-row" key={row}>
              {Array.from({ length: 8 }, (_, col) => (
                <i key={col} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="wrap formats-inner">
        <div className="section-heading">
          <h2 className="text-mask" data-viewport="once" id="formats-title">
            Выберите свою игру
            <span className="mask-glint" aria-hidden="true">
              Выберите свою игру
            </span>
          </h2>
        </div>
        <div className="offers">
          <article
            className="offer dark"
            id="open"
            aria-labelledby="open-title"
          >
            <div className="offer-copy">
              <h3 id="open-title">Открытая игра</h3>
              <p>Можно прийти одному или с друзьями.</p>
              <dl className="open-rates">
                <div>
                  <dt>Игра на центральной площадке</dt>
                  <dd>{rubles(1300)}</dd>
                </div>
                <div>
                  <dt>CQB-игра в подвале</dt>
                  <dd>{rubles(1500)}</dd>
                </div>
              </dl>
              <dl className="open-details">
                <div>
                  <dt>Длительность игры</dt>
                  <dd>4 часа</dd>
                </div>
                <div>
                  <dt>
                    <a href="#equipment-rental">Прокат снаряжения</a>
                  </dt>
                  <dd>{rubles(kitRate)} за комплект</dd>
                </div>
              </dl>
            </div>
            <a className="action primary arrow" href={clubMessages}>
              Записаться на открытую игру
            </a>
          </article>
          <article className="offer" id="group" aria-labelledby="group-title">
            <div className="offer-copy">
              <h3 id="group-title">Своя компания</h3>
              <p>Площадка для друзей, команды или коллег.</p>
              <p className="display price">3 часа</p>
              <p className="price-note">Бронирование площадки</p>
              <dl>
                <div>
                  <dt>Вместимость</dt>
                  <dd>От 10 человек</dd>
                </div>
                <div>
                  <dt>Экипировка</dt>
                  <dd>Своя или прокат</dd>
                </div>
                <div>
                  <dt>Цена</dt>
                  <dd>От {rubles(Math.min(...venueRates.map((rate) => rate.price)))}</dd>
                </div>
              </dl>
            </div>
            <a className="action outline arrow" href={clubMessages}>
              Уточнить свободные даты
            </a>
            <a className="source" href="#field">
              Сравнить площадки
            </a>
          </article>
        </div>
        <article
          className="rental-offer"
          id="equipment-rental"
          aria-labelledby="equipment-rental-title"
        >
          <div className="rental-offer-copy">
            <h3 id="equipment-rental-title">Аренда снаряжения</h3>
            <p>
              Состав снаряжения: привод и один бункерный магазин, очки, маска,
              перчатки, шлем, бронежилет и комплект формы.
            </p>
          </div>
          <p className="display rental-offer-price">{rubles(kitRate, 2)}</p>
        </article>
        <p className="offer-benefits">
          Участники страйкбольной команды РТУ МИРЭА играют бесплатно. Студентам
          и сотрудникам РТУ МИРЭА по студенческому билету или удостоверению, а
          также ветеранам боевых действий — скидка 20%.
        </p>
      </div>
    </section>
  );
}
