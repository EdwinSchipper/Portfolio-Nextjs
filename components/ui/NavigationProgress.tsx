"use client";

import { useEffect, useRef, Suspense } from "react";
import { usePathname } from "next/navigation";

function NavigationProgressBar() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const activeRef = useRef<boolean>(false);

  useEffect(() => {
    if (!activeRef.current) return;
    activeRef.current = false;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!barRef.current || !containerRef.current) return;

    barRef.current.style.transition = "width 200ms ease-out, opacity 300ms ease-out 100ms";
    barRef.current.style.width = "100%";
    barRef.current.style.opacity = "0";

    timerRef.current = setTimeout(() => {
      if (containerRef.current && !activeRef.current) {
        containerRef.current.style.display = "none";
        if (barRef.current) barRef.current.style.width = "0%";
      }
    }, 450);
  }, [pathname]);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");
      if (
        !href ||
        target === "_blank" ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      try {
        const currentUrl = new URL(window.location.href);
        const targetUrl = new URL(anchor.href, window.location.href);

        if (
          targetUrl.origin === currentUrl.origin &&
          (targetUrl.pathname !== currentUrl.pathname || targetUrl.search !== currentUrl.search)
        ) {
          activeRef.current = true;
          if (timerRef.current) clearTimeout(timerRef.current);
          if (!barRef.current || !containerRef.current) return;

          containerRef.current.style.display = "block";
          barRef.current.style.transition = "width 200ms ease-out, opacity 150ms ease-out";
          barRef.current.style.opacity = "1";
          barRef.current.style.width = "25%";

          timerRef.current = setTimeout(() => {
            if (barRef.current && activeRef.current) {
              barRef.current.style.transition = "width 400ms ease-out";
              barRef.current.style.width = "75%";
            }
          }, 200);
        }
      } catch {
        /** Ignore URL parsing errors for non-standard schemes */
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ display: "none" }}
      className="fixed top-0 left-0 right-0 z-100 pointer-events-none h-[2.5px]"
    >
      <div
        ref={barRef}
        style={{ width: "0%", opacity: 0 }}
        className="h-full bg-accent7-900 dark:bg-accent8-900 shadow-[0_0_8px_rgba(240,90,70,0.6)] dark:shadow-[0_0_8px_rgba(242,101,82,0.8)]"
      />
    </div>
  );
}

/**
 * Universal Navigation Progress Bar providing immediate visual feedback on page transitions.
 */
export default function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <NavigationProgressBar />
    </Suspense>
  );
}
