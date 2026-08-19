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
        <h1 className="display">Got it.</h1>
        <p>
          Next email is a payment link if we can check the route — or a note if
          we can&apos;t, in which case you pay nothing. After you pay, the PDF
          arrives within 24 hours.
        </p>
        <p>
          Check spam if you don&apos;t see it. The first email from a new sender
          often lands there.
        </p>
        <Link className="btn btn--ghost" href="/">
          Back to TransitCheck
        </Link>
      </div>
    </main>
  );
}
