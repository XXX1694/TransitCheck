"use client";

import { useEffect, useState } from "react";

function formatAlmatyTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Almaty",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

export function SlaClock() {
  const [time, setTime] = useState("——:——:——");

  useEffect(() => {
    const tick = () => setTime(formatAlmatyTime(new Date()));
    tick();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      return;
    }

    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time className="mono" dateTime={time} suppressHydrationWarning>
      {time}
    </time>
  );
}
