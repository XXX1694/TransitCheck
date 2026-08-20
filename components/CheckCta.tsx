"use client";

import type { ReactNode } from "react";
import Link from "next/link";

type CheckCtaProps = {
  className?: string;
  children?: ReactNode;
};

function trackCtaClick() {
  if (typeof window.plausible === "function") {
    window.plausible("cta_check_route");
  }
}

export function CheckCta({
  className,
  children = "Заказать разбор — $12",
}: CheckCtaProps) {
  return (
    <Link href="/#order" className={className} onClick={trackCtaClick}>
      {children}
    </Link>
  );
}
