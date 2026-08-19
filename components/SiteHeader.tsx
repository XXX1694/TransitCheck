import Link from "next/link";
import { CheckCta } from "@/components/CheckCta";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="wordmark">
          TransitCheck
        </Link>
        <p className="site-header__meta">Human transit-visa check</p>
        <CheckCta className="btn btn--ghost site-header__cta">
          Check a route
        </CheckCta>
      </div>
    </header>
  );
}
