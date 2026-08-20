import { FaqList } from "@/components/FaqList";
import { OrderForm } from "@/components/OrderForm";
import { ReportPages } from "@/components/ReportPages";
import { RouteStrip } from "@/components/RouteStrip";
import { StickyOrderBar } from "@/components/StickyOrderBar";
import { SAMPLE_STUBS } from "@/lib/sample";
import {
  AVG_HOURS,
  formatKzt,
  MIN_ORDER_DAYS,
  PRICE_KZT,
  PRICE_USD,
  SLA_HOURS,
} from "@/lib/site";

export default function Home() {
  return (
    <main id="main">
      <section className="hero" aria-labelledby="hero-heading">
        <div className="frame">
          <div className="hero__copy">
            <p className="eyebrow">Разбор одного маршрута · не подписка</p>
            <h1 id="hero-heading" className="display">
              С рейса снимают не из-за визы в конечную страну, а из-за транзитной
            </h1>
            <p className="lede">
              Проверяем каждое плечо вашего маршрута под ваш паспорт. PDF с
              источниками и датой — за {SLA_HOURS} часа.
            </p>
          </div>

          <div className="hero__form">
            <OrderForm />
          </div>

          <div className="hero__strip">
            <RouteStrip
              stubs={SAMPLE_STUBS}
              hitStamp
              labelledBy="hero-heading"
              caption="Паспорт KAZ, ALA→SIN→KUL, отдельные билеты, 9 часов в Чанги. Куала-Лумпур открыт. Стыковка — нет."
            />
          </div>

          <p className="hero__mrz" aria-hidden="true">
            <span className="uv-dot" />
            <span className="hero__mrz-text">
              P&lt;KAZ&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt; ALA&gt;SIN&gt;KUL&lt;&lt;28APR26&lt;&lt;TRANSIT&lt;CHECK&lt;&lt;&lt;&lt;&lt;&lt;
            </span>
          </p>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="why-heading">
        <div className="frame">
          <div className="section__main">
            <span className="uv-rule" />
            <p className="eyebrow">Почему это вообще происходит</p>
            <h2 id="why-heading" className="display">
              Решение принимают в Алматы, не на границе в Чанги
            </h2>
            <p>
              Если пассажира не впускают в стране стыковки, штраф и обратный
              билет платит авиакомпания. Поэтому агент на стойке сверяет не вашу
              визу в конечную страну, а допуск в хаб: выход из терминала, смена
              аэропорта, отдельные билеты, багаж.
            </p>
            <p className="fact">
              <span className="fact__label">
                ALA → SIN → KUL · 28.04.26 · отд. билеты · стыковка 9 ч
              </span>
              Виза Малайзии у пассажира с паспортом KAZ здесь ни при чём. На
              стойке в ALA смотрят Сингапур: отдельные билеты значат получение
              багажа и вход в страну. Нет визы ICA или основания для VFTF — на
              рейс не посадят.
            </p>
          </div>
          <aside className="section__meta">
            <ul className="margin-list">
              <li>
                <span>место отказа</span>
                <strong>стойка ALA</strong>
              </li>
              <li>
                <span>не граница</span>
                <strong>SIN IM</strong>
              </li>
              <li>
                <span>кто платит</span>
                <strong>перевозчик</strong>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section" id="google" aria-labelledby="compare-heading">
        <div className="frame">
          <div className="section__main">
            <p className="eyebrow">Почему бесплатные сервисы это не ловят</p>
            <h2 id="compare-heading" className="display">
              Один маршрут, два паспорта, разный ответ
            </h2>
            <p>
              Sherpa, iVisa, Atlys и IATA Travel Centre собраны вокруг въезда в
              конечную страну для паспортов США и ЕС. У этих паспортов транзит
              почти всегда открыт — ветка «стыковка / терминал / отдельные
              билеты» у них тонкая. Для паспорта Казахстана она основная.
            </p>
            <div className="compare-wrap">
            <table className="compare">
              <caption>
                ALA→SIN→KUL · стыковка 9 ч · отдельные билеты · выход к ленте в Чанги ·
                источники на 12.04.2026
              </caption>
              <thead>
                <tr>
                  <th scope="col">Плечо SIN</th>
                  <th scope="col">Паспорт USA / EU</th>
                  <th scope="col">Паспорт KAZ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Что часто пишет Google и авточекер</td>
                  <td>Visa not required, stay 90 days</td>
                  <td>
                    «Граждане Казахстана — 96 часов в Сингапуре без визы»
                  </td>
                </tr>
                <tr>
                  <td>Что написано у ICA</td>
                  <td>
                    Краткий въезд без визы. Стыковка не создаёт отдельного
                    документа.
                  </td>
                  <td>
                    96 часов без визы (VFTF) только при визе или ВНЖ Австралии,
                    Канады, Германии, Японии, Новой Зеландии, Швейцарии,
                    Великобритании или США. Иначе — виза Сингапура до вылета.
                    Airside на одном билете без выхода — виза не нужна.
                  </td>
                </tr>
                <tr>
                  <td>Что будет на стойке в ALA</td>
                  <td>Агент видит допуск. Посадка обычная.</td>
                  <td>
                    TIMATIC пишет visa required, если билеты отдельные и нет
                    третьей визы. Посадки нет.
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
            <p>
              Авточекер не врёт специально: он отвечает на другой вопрос. Мы
              отвечаем на тот, из-за которого снимают с рейса.
            </p>
          </div>
          <aside className="section__meta">
            <ul className="margin-list">
              <li>
                <span>сверка</span>
                <strong>ICA VFTF</strong>
              </li>
              <li>
                <span>не база</span>
                <strong>ручная</strong>
              </li>
              <li>
                <span>хабы</span>
                <strong>SIN DXB IST</strong>
              </li>
              <li>
                <span />
                <strong>PEK DOH KUL SVO</strong>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section" id="report" aria-labelledby="report-heading">
        <div className="frame">
          <div className="section__main">
            <p className="eyebrow">Пример отчёта</p>
            <h2 id="report-heading" className="display">
              Так выглядит PDF, который придёт на почту
            </h2>
            <p>
              Не мокап. Две страницы в потоке: шапка с датой, плечи, вердикты,
              условия стыковки, ссылки. Полный файл — одной кнопкой.
            </p>
            <ReportPages />
          </div>
          <aside className="section__meta">
            <ul className="margin-list">
              <li>
                <span>номер</span>
                <strong>TC-2026-0412</strong>
              </li>
              <li>
                <span>время</span>
                <strong>14:32 ALMT</strong>
              </li>
              <li>
                <span>страниц</span>
                <strong>02</strong>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section" id="how" aria-labelledby="how-heading">
        <div className="frame">
          <div className="section__main">
            <p className="eyebrow">Как это делается</p>
            <h2 id="how-heading" className="display">
              Часы, не секунды: сначала источники, потом штамп
            </h2>
            <p>
              Автоматическая база отвечает быстро, потому что она уже решила за
              другой паспорт. Мы читаем тексты за ваш. Ручной труд здесь не
              «душевность», а причина цены.
            </p>
            <ol className="log">
              <li>
                <span className="log__n">01</span>
                <span className="log__t">10:12</span>
                <p>
                  Режем маршрут на плечи: рейс, стыковка, рейс. Отмечаем
                  отдельные билеты, багаж, смену терминала или аэропорта.
                </p>
              </li>
              <li>
                <span className="log__n">02</span>
                <span className="log__t">10:40</span>
                <p>
                  Читаем правила страны стыковки для вашего паспорта: МИД,
                  консульство, иммиграция. Для примера выше — ICA Singapore,
                  страница VFTF и визовый список.
                </p>
              </li>
              <li>
                <span className="log__n">03</span>
                <span className="log__t">13:05</span>
                <p>
                  Сверяем, что видит перевозчик: страница авиакомпании и IATA
                  Travel Centre. Если тексты расходятся, в отчёт идут оба и дата
                  каждого.
                </p>
              </li>
              <li>
                <span className="log__n">04</span>
                <span className="log__t">16:20</span>
                <p>
                  Второй человек открывает те же ссылки и ставит штамп только
                  если оба пришли к одному вердикту по каждому плечу.
                </p>
              </li>
              <li>
                <span className="log__n">05</span>
                <span className="log__t">18:04</span>
                <p>
                  Собираем PDF: вердикт, условия, ссылки, дата и время проверки.
                  Письмо уходит на почту из заказа.
                </p>
              </li>
            </ol>
          </div>
          <aside className="section__meta">
            <ul className="margin-list">
              <li>
                <span>источники</span>
                <strong>МИД / ICA</strong>
              </li>
              <li>
                <span />
                <strong>авиа / IATA</strong>
              </li>
              <li>
                <span>сверка</span>
                <strong>два человека</strong>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section" id="price" aria-labelledby="price-heading">
        <div className="frame">
          <div className="section__main">
            <p className="eyebrow">Цена</p>
            <h2 id="price-heading" className="display">
              Один маршрут, одна сумма
            </h2>
            <div className="receipt">
              <div className="receipt__line">
                <p className="receipt__name">Разбор одного маршрута</p>
                <p className="receipt__sum">${PRICE_USD}</p>
              </div>
              <p className="receipt__kzt">
                {formatKzt(PRICE_KZT)} · Kaspi / карта · разово · не подписка ·
                автосписаний нет
              </p>
              <ol>
                <li>
                  <span>01</span>
                  Вердикт по каждому плечу отдельно
                </li>
                <li>
                  <span>02</span>
                  Выход из терминала, смена терминала, смена аэропорта, отдельные
                  билеты, багаж
                </li>
                <li>
                  <span>03</span>
                  Прямые ссылки на официальные источники по каждому пункту
                </li>
                <li>
                  <span>04</span>
                  Дата и время проверки на документе
                </li>
              </ol>
            </div>
            <p>
              Если из-за ошибки в отчёте вас не посадили на рейс — возвращаем $
              {PRICE_USD} и разбираем случай: что написали мы, что сказал агент,
              какой источник расходится.
            </p>
            <p>
              Заказ минимум за {MIN_ORDER_DAYS} дня до вылета. Ответ за{" "}
              {SLA_HOURS} ч, в среднем за {AVG_HOURS}.
            </p>
          </div>
          <aside className="section__meta">
            <ul className="margin-list">
              <li>
                <span>оплата</span>
                <strong>Kaspi / карта</strong>
              </li>
              <li>
                <span>тенге</span>
                <strong>{formatKzt(PRICE_KZT)}</strong>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section" id="faq" aria-labelledby="faq-heading">
        <div className="frame">
          <div className="section__main">
            <p className="eyebrow">Вопросы</p>
            <h2 id="faq-heading" className="display">
              То, что спрашивают до стойки
            </h2>
            <FaqList />
          </div>
        </div>
      </section>

      <StickyOrderBar />
    </main>
  );
}
