"use client";

import Link from "next/link";

type CheckCtaProps = {
  className?: string;
};

function trackCtaClick() {
  if (typeof window.plausible === "function") {
    window.plausible("cta_check_route");
  }
}

export function CheckCta({ className }: CheckCtaProps) {
  return (
    <Link href="/#order" className={className} onClick={trackCtaClick}>
      Check my route — $12
    </Link>
  );
}
