import { DATA_RETENTION_DAYS } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="frame">
        <div className="site-footer__main">
          <p className="wordmark">
            <span className="wordmark__code">TC</span>
            <span className="wordmark__name">Разбор транзита</span>
          </p>
          <p>
            Окончательное решение принимает перевозчик на стойке и пограничная
            служба в стране стыковки. Отчёт верен на дату и время в его шапке.
            Правила меняются: если вылет через месяц, закажите разбор ближе к
            датам.
          </p>
          <p className="site-footer__legal">
            Из данных берём почту, гражданство, страну проживания, маршрут и
            даты. Храним {DATA_RETENTION_DAYS} дней, чтобы вы могли написать
            «тот же маршрут». Скан паспорта не просим и не принимаем. Номер
            карты не видим: оплата идёт через Kaspi или платёжную форму.
          </p>
          <p className="site-footer__legal">
            TransitCheck — информационная сверка источников, не юридическая и не
            иммиграционная консультация.
          </p>
        </div>
      </div>
    </footer>
  );
}
