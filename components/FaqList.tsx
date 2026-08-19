const FAQ = [
  {
    q: "Can't I just google this?",
    a: "You can. It takes hours, most sources are written for US and EU passports, and almost none of them cover transit separately from entry. We do that work and show you where every answer came from.",
  },
  {
    q: "Is this immigration advice?",
    a: "No. We're an information service. We cite official sources and date every check so you can verify them yourself.",
  },
  {
    q: "What if the rules change after I get my report?",
    a: "Every report is dated. Rules move, so re-check close to departure — official sources are always the final word.",
  },
  {
    q: "Who's behind this?",
    a: "One developer who got tired of rebuilding this spreadsheet before every trip.",
  },
];

export function FaqList() {
  return (
    <div className="faq">
      {FAQ.map((item) => (
        <details className="faq__item" key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
