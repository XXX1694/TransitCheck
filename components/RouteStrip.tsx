const LEGS = [
  {
    code: "ALA",
    city: "Almaty",
    verdict: "CLEAR",
    tone: "clear" as const,
  },
  {
    code: "DXB",
    city: "Dubai",
    verdict: "TRANSIT VISA REQUIRED (LANDSIDE)",
    tone: "caution" as const,
  },
  {
    code: "BKK",
    city: "Bangkok",
    verdict: "CLEAR",
    tone: "clear" as const,
  },
];

export function RouteStrip() {
  return (
    <figure className="route-strip" aria-labelledby="route-strip-caption">
      <div className="route-strip__pass">
        <div className="route-strip__main">
          <div className="route-strip__banner">
            <span>TransitCheck</span>
            <span>Boarding advice</span>
            <span>REF · EX-ALA-DXB-BKK</span>
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

          <p className="route-strip__note">
            Sample check · example only · not a boarding pass
          </p>
        </div>

        <aside className="route-strip__stub" aria-hidden="true">
          <span className="route-strip__stub-label">Gate</span>
          <span className="route-strip__stub-value">—</span>
          <span className="route-strip__stub-label">Window</span>
          <span className="route-strip__stub-value">24H</span>
          <span className="route-strip__barcode" />
          <span className="route-strip__stub-id">TC</span>
        </aside>
      </div>
      <figcaption id="route-strip-caption" className="sr-only">
        Example route ALA to DXB to BKK. Dubai carries a caution verdict:
        transit visa required, landside.
      </figcaption>
    </figure>
  );
}
