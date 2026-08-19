import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Got it",
  description:
    "We'll email a payment link and your answer within 24 hours. Check spam if you don't see it.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThanksPage() {
  return (
    <main id="main" className="thanks">
      <div className="wrap">
        <p className="kicker">Request received</p>
        <h1 className="display">Got it.</h1>
        <p>
          We&apos;ll email a payment link and your answer within 24 hours. Check
          spam if you don&apos;t see it — the first email from a new sender
          often lands there.
        </p>
        <Link className="btn btn--ghost" href="/">
          Back to TransitCheck
        </Link>
      </div>
    </main>
  );
}
