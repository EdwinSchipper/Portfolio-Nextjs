"use client";

import { useEffect, useRef } from "react";

export interface HeroLocalClockProps {
  className?: string;
}

const amsterdamTimeFormatter = new Intl.DateTimeFormat("nl-NL", {
  timeZone: "Europe/Amsterdam",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

/**
 * Live Europe/Amsterdam clock updated directly via a DOM ref every second
 * to avoid unnecessary React re-renders in the Hero section.
 */
export default function HeroLocalClock({
  className = "",
}: HeroLocalClockProps) {
  const timeRef = useRef<HTMLTimeElement>(null);

  useEffect(() => {
    const updateClock = () => {
      if (timeRef.current) {
        const formattedTime = amsterdamTimeFormatter.format(new Date());
        timeRef.current.textContent = formattedTime;
        timeRef.current.dateTime = formattedTime;
      }
    };

    updateClock();
    const intervalId = window.setInterval(updateClock, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <span className={`inline-flex items-baseline tabular-nums ${className}`.trim()}>
      <span className="sr-only">Lokale tijd in Dedemsvaart: </span>
      <span aria-hidden="true">[</span>
      <time ref={timeRef} aria-live="off">
        --:--:--
      </time>
      <span aria-hidden="true">]</span>
    </span>
  );
}

