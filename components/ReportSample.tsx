const LEGS = [
  {
    code: "ALA",
    city: "Almaty",
    verdict: "Clear",
    tone: "clear" as const,
    detail: "Departure. No extra document for this passport on this flight.",
  },
  {
    code: "DXB",
    city: "Dubai",
    verdict: "Transit visa required",
    tone: "caution" as const,
    detail:
      "Landside connection — you leave the sterile area to collect bags. Apply before you fly; a typical processing window is a few days if you are eligible. Source example: GDRFA, checked 12 Aug 2026.",
  },
  {
    code: "BKK",
    city: "Bangkok",
    verdict: "Clear",
    tone: "clear" as const,
    detail: "Entry for a short stay. Destination visa is not the gap here.",
  },
];

export function ReportSample() {
  return (
    <article className="report" aria-label="Sample route report">
      <header className="report__head">
        <p className="report__brand">TransitCheck report</p>
        <p className="report__meta">Sample · checked 12 Aug 2026</p>
      </header>
      <h3 className="report__route">ALA → DXB → BKK</h3>
      <p className="report__sub">
        Kazakhstan passport · one ticket · 9 hours in Dubai. We checked official
        sources dated 12 Aug 2026.
      </p>
      <ol className="report__legs">
        {LEGS.map((leg) => (
          <li key={leg.code} className={`report__leg report__leg--${leg.tone}`}>
            <div className="report__leg-top">
              <span className="report__code">{leg.code}</span>
              <span className="report__city">{leg.city}</span>
              <span className={`chip chip--${leg.tone}`}>{leg.verdict}</span>
            </div>
            <p>{leg.detail}</p>
          </li>
        ))}
      </ol>
      <p className="report__foot">
        Your copy is a dated PDF with a link for every official source we used.
        This block is an example, not a real check.
      </p>
    </article>
  );
}
