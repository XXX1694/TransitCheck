"use client";

import { useEffect, useState } from "react";
import { CheckCta } from "@/components/CheckCta";

export function StickyOrderBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById("hero-cta");
    const order = document.getElementById("order");
    if (!heroCta || !order) {
      return;
    }

    let heroInView = true;
    let orderInView = false;

    const update = () => {
      setVisible(!heroInView && !orderInView);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target.id === "hero-cta") {
            heroInView = entry.isIntersecting;
          }
          if (entry.target.id === "order") {
            orderInView = entry.isIntersecting;
          }
        }
        update();
      },
      { threshold: 0.14 },
    );

    observer.observe(heroCta);
    observer.observe(order);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={visible ? "sticky-bar is-visible" : "sticky-bar"}
      role="region"
      aria-label="Check a route"
      aria-hidden={!visible}
      hidden={!visible}
    >
      <p className="sticky-bar__copy">$12 · 24 hours</p>
      <CheckCta className="btn btn--solid sticky-bar__cta">
        Send my route
      </CheckCta>
    </div>
  );
}
