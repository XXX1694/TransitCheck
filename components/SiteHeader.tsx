import Link from "next/link";
import { CheckCta } from "@/components/CheckCta";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="wordmark">
          TransitCheck
        </Link>
        <p className="site-header__meta">
          <span>DOC TC-24H</span>
          <span aria-hidden="true">·</span>
          <span>ROUTE VERDICT</span>
        </p>
        <CheckCta className="btn btn--ghost site-header__cta" />
      </div>
    </header>
  );
}
