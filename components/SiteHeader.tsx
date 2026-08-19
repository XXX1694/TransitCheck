import Link from "next/link";
import { CheckCta } from "@/components/CheckCta";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="frame site-header__inner">
        <div className="site-header__brand">
          <Link href="/" className="wordmark">
            <span className="wordmark__code">TC</span>
            <span className="wordmark__name">Разбор транзита</span>
          </Link>
        </div>
        <nav className="site-header__nav" aria-label="Разделы">
          <Link href="/#how">Как работает</Link>
          <Link href="/#report">Пример отчёта</Link>
          <Link href="/#price">Цена</Link>
        </nav>
        <CheckCta className="btn btn--ghost site-header__cta">Заказать</CheckCta>
      </div>
    </header>
  );
}
