import { RouteStrip } from "@/components/RouteStrip";
import {
  SAMPLE_CHECKED_AT,
  SAMPLE_CONDITIONS,
  SAMPLE_FILE,
  SAMPLE_ID,
  SAMPLE_LEGS,
  SAMPLE_ROUTE,
  SAMPLE_SOURCES,
  SAMPLE_STUBS,
} from "@/lib/sample";

export function ReportPages() {
  return (
    <div>
      <div className="report-toolbar">
        <p className="toolbar-id mono">
          {SAMPLE_ID}.pdf · 2 стр.
        </p>
        <a className="btn btn--ghost" href={SAMPLE_FILE} download>
          Скачать полный пример
        </a>
      </div>

      <article className="report-sheet" aria-label="Пример отчёта, страница 1">
        <header className="report-sheet__head">
          <p className="report-sheet__brand">
            TC · {SAMPLE_ID} · P&lt;{SAMPLE_ROUTE.passport}
          </p>
          <p className="report-sheet__time">проверено {SAMPLE_CHECKED_AT}</p>
        </header>
        <h3 className="display report-sheet__title">{SAMPLE_ROUTE.display}</h3>
        <p className="report-sheet__sub">
          Паспорт {SAMPLE_ROUTE.passport} · живу в {SAMPLE_ROUTE.residence} ·{" "}
          {SAMPLE_ROUTE.tickets} · стыковка {SAMPLE_ROUTE.layover}
        </p>
        <RouteStrip stubs={SAMPLE_STUBS} />
        {SAMPLE_LEGS.map((leg) => (
          <section className="report-leg" key={leg.code}>
            <div className="report-leg__top">
              <span className="report-leg__code">{leg.code}</span>
              <span>{leg.title}</span>
              <p className={`verdict verdict--${leg.tone}`}>{leg.verdict}</p>
            </div>
            <p>{leg.body}</p>
          </section>
        ))}
      </article>

      <article className="report-sheet" aria-label="Пример отчёта, страница 2">
        <header className="report-sheet__head">
          <p className="report-sheet__brand">TC · {SAMPLE_ID} · стр. 2/2</p>
          <p className="report-sheet__time">источники на {SAMPLE_CHECKED_AT}</p>
        </header>
        <h3 className="display report-sheet__title">Условия стыковки</h3>
        {SAMPLE_CONDITIONS.map((item) => (
          <div className="condition" key={item.label}>
            <span className="condition__label">{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
        <h3>Источники</h3>
        {SAMPLE_SOURCES.map((source) => (
          <div className="source" key={source.id}>
            <span className="source__id">
              {source.id} · {source.checked}
            </span>
            <a href={source.href} target="_blank" rel="noreferrer">
              {source.title}
            </a>
            <span>{source.note}</span>
          </div>
        ))}
        <p className="strip-caption">
          Это пример, не ваш разбор. Дата и время на вашем PDF будут своими.
        </p>
      </article>
    </div>
  );
}
