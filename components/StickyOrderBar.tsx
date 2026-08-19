"use client";

import { useEffect, useState } from "react";
import { CheckCta } from "@/components/CheckCta";
import { PRICE_USD, SLA_HOURS } from "@/lib/site";

export function StickyOrderBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const order = document.getElementById("order");
    if (!order) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.12 },
    );

    observer.observe(order);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={visible ? "sticky-bar is-visible" : "sticky-bar"}
      role="region"
      aria-label="Заказать разбор"
      aria-hidden={!visible}
      hidden={!visible}
    >
      <p className="sticky-bar__copy mono">
        ${PRICE_USD} · {SLA_HOURS}ч
      </p>
      <CheckCta className="btn btn--solid sticky-bar__cta">
        Заказать разбор — ${PRICE_USD}
      </CheckCta>
    </div>
  );
}
