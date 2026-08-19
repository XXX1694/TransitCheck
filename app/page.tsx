import { CheckCta } from "@/components/CheckCta";
import { OrderForm } from "@/components/OrderForm";
import { RouteStrip } from "@/components/RouteStrip";

const GET_ITEMS = [
  "A verdict for every leg: clear, visa required, or transit visa required",
  "Airside versus landside rules for each connection, including whether you must clear immigration",
  "Processing time and cost for anything you need to apply for",
  "A link and a check date for every official source we used",
  "A PDF you can show at the check-in desk",
];

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

export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Human route check · 24 hours · $12</p>
          <h1 className="display">Find out if they&apos;ll let you board.</h1>
          <p className="lede">
            Airlines refuse boarding over transit rules most travellers never
            hear about. Send us your route and passport — we check every leg
            against official government sources and send you a dated answer
            within 24 hours.
          </p>
          <CheckCta className="btn btn--solid hero__cta" />
        </div>
        <div className="wrap wrap--wide">
          <RouteStrip />
        </div>
      </section>

      <section className="section" aria-labelledby="trap-heading">
        <div className="wrap">
          <p className="section-kicker">01 / The layover</p>
          <h2 id="trap-heading" className="display">
            The trap is the layover
          </h2>
          <p>
            You have a visa for where you&apos;re going. You still get turned
            away at check-in, because your nine-hour connection needs a transit
            visa you never knew existed. The airline is liable for flying you
            back, so when the rules are unclear, they refuse to board you.
            Booking your legs on separate tickets makes it worse — you may have
            to clear immigration to collect and re-check your bags.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="get-heading">
        <div className="wrap">
          <p className="section-kicker">02 / The report</p>
          <h2 id="get-heading" className="display">
            What you get
          </h2>
          <ol className="checklist">
            {GET_ITEMS.map((item, index) => (
              <li key={item}>
                <span className="checklist__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="cover-heading">
        <div className="wrap">
          <p className="section-kicker">03 / Coverage</p>
          <h2 id="cover-heading" className="display">
            What we cover
          </h2>
          <p>We keep our coverage narrow so it stays correct.</p>
          <div className="coverage">
            <div>
              <h3>Passports</h3>
              <p>
                Kazakhstan, Uzbekistan, Kyrgyzstan, India, Pakistan, Bangladesh,
                Philippines, Indonesia.
              </p>
            </div>
            <div>
              <h3>Routes through</h3>
              <p>
                UAE, Qatar, Turkey, China, Hong Kong, Singapore, Malaysia,
                Thailand, Vietnam, South Korea, Japan.
              </p>
            </div>
          </div>
          <p>If your route falls outside this, we&apos;ll tell you before you pay.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="price-heading">
        <div className="wrap">
          <p className="section-kicker">04 / Price</p>
          <h2 id="price-heading" className="display">
            Price
          </h2>
          <div className="price-block">
            <p className="price-figure">$12</p>
            <p>
              $12 per route. Answer within 24 hours. Full refund if we can&apos;t
              give you one.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="order" aria-labelledby="order-heading">
        <div className="wrap">
          <p className="section-kicker">05 / Route check</p>
          <h2 id="order-heading" className="display">
            Send the route
          </h2>
          <OrderForm />
        </div>
      </section>

      <section className="section" aria-labelledby="faq-heading">
        <div className="wrap">
          <p className="section-kicker">06 / Questions</p>
          <h2 id="faq-heading" className="display">
            FAQ
          </h2>
          <dl className="faq">
            {FAQ.map((item) => (
              <div className="faq__item" key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
