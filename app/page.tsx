import { CheckCta } from "@/components/CheckCta";
import { FaqList } from "@/components/FaqList";
import { OrderForm } from "@/components/OrderForm";
import { ReportSample } from "@/components/ReportSample";
import { RouteStrip } from "@/components/RouteStrip";
import { StickyOrderBar } from "@/components/StickyOrderBar";

const DELIVERABLES = [
  "A verdict for every airport on the ticket",
  "Airside versus landside — and whether you have to clear immigration",
  "Time and cost if you need to apply for something",
  "A link and a check date for every official source",
  "A PDF you can show at the desk",
];

export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <div className="wrap">
          <h1 className="display">Find out if they&apos;ll let you board.</h1>
          <p className="lede">
            Airlines refuse boarding over transit rules most travellers never
            hear about. Send us your route and passport — we check every leg
            against official government sources and send you a dated answer
            within 24 hours.
          </p>
          <div id="hero-cta" className="hero__actions">
            <CheckCta className="btn btn--solid" />
            <p className="hero__note">
              $12 per route · 24 hours · refund if we can&apos;t check it
            </p>
          </div>
        </div>
        <div className="wrap wrap--wide">
          <RouteStrip />
        </div>
      </section>

      <section className="section story" aria-labelledby="trap-heading">
        <div className="wrap wrap--wide story__grid">
          <h2 id="trap-heading" className="display">
            The trap is the layover
          </h2>
          <div className="story__body">
            <p>
              You have a visa for where you&apos;re going. You still get turned
              away at check-in, because your nine-hour connection needs a
              transit visa you never knew existed.
            </p>
            <blockquote>
              The airline is liable for flying you back. When the rules are
              unclear, they refuse to board you.
            </blockquote>
            <p>
              Booking the legs on separate tickets makes it worse — you may have
              to clear immigration to collect and re-check your bags. Destination
              visa pages almost never mention that.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="report-heading">
        <div className="wrap wrap--wide split">
          <div>
            <h2 id="report-heading" className="display">
              The report looks like this
            </h2>
            <p>
              A person checks the route and writes it so you can verify every
              line.
            </p>
            <ul className="plain-list">
              {DELIVERABLES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <ReportSample />
        </div>
      </section>

      <section className="section" id="order" aria-labelledby="order-heading">
        <div className="wrap wrap--wide">
          <h2 id="order-heading" className="display">
            Send the route
          </h2>
          <p className="section-lede">
            We&apos;ll look at coverage first, then email a payment link. You
            only pay if we can do the check.
          </p>
          <div className="order">
            <OrderForm />
            <aside className="order__aside">
              <p className="price-figure">$12</p>
              <p>Per route, answered within 24 hours.</p>
              <h3>Passports</h3>
              <p>
                Kazakhstan, Uzbekistan, Kyrgyzstan, India, Pakistan, Bangladesh,
                Philippines, Indonesia.
              </p>
              <h3>Hubs we check</h3>
              <p>
                UAE, Qatar, Turkey, China, Hong Kong, Singapore, Malaysia,
                Thailand, Vietnam, South Korea, Japan.
              </p>
              <p>If the route sits outside this, we tell you before you pay.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-heading">
        <div className="wrap">
          <h2 id="faq-heading" className="display">
            Questions
          </h2>
          <FaqList />
        </div>
      </section>

      <StickyOrderBar />
    </main>
  );
}
