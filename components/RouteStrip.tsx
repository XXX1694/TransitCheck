const LEGS = [
  {
    code: "ALA",
    city: "Almaty",
    verdict: "Clear to depart",
    tone: "clear" as const,
  },
  {
    code: "DXB",
    city: "Dubai",
    verdict: "Transit visa, landside",
    tone: "caution" as const,
  },
  {
    code: "BKK",
    city: "Bangkok",
    verdict: "Clear to enter",
    tone: "clear" as const,
  },
];

export function RouteStrip() {
  return (
    <figure className="route-strip">
      <div className="route-strip__pass">
        <div className="route-strip__main">
          <div className="route-strip__banner">
            <span>TransitCheck</span>
            <span>Sample check</span>
            <span>ALA–DXB–BKK</span>
          </div>

          <ol className="route-strip__legs">
            {LEGS.map((leg, index) => (
              <li key={leg.code} className="route-leg">
                {index > 0 ? (
                  <span className="route-leg__arrow" aria-hidden="true">
                    →
                  </span>
                ) : null}
                <div className="route-leg__body">
                  <span className="route-leg__code">{leg.code}</span>
                  <span className="route-leg__city">{leg.city}</span>
                  <span className={`chip chip--${leg.tone}`}>{leg.verdict}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="route-strip__stub" aria-hidden="true">
          <span className="route-strip__stub-label">Window</span>
          <span className="route-strip__stub-value">24H</span>
          <span className="route-strip__stub-label">Price</span>
          <span className="route-strip__stub-value">$12</span>
          <span className="route-strip__barcode" />
          <span className="route-strip__stub-id">TC</span>
        </aside>
      </div>
      <figcaption className="route-strip__caption">
        Kazakh passport, nine hours in Dubai. Bangkok is fine. The layover is
        the problem.
      </figcaption>
    </figure>
  );
}
