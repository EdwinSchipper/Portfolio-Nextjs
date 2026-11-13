"use client";

import { useEffect, useSyncExternalStore } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import Button, { iconButtonSizeClass } from "@/components/ui/Button";

export interface ColorModeSelectorProps {
  className?: string;
  isOverHero?: boolean;
}

let themeListeners: Array<() => void> = [];
let mountedListeners: Array<() => void> = [];

function emitThemeChange() {
  for (const listener of themeListeners) {
    listener();
  }
}

const themeStore = {
  getSnapshot() {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  },
  getServerSnapshot() {
    return false;
  },
  subscribe(listener: () => void) {
    themeListeners.push(listener);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMedia = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        document.documentElement.classList.toggle("dark", e.matches);
        emitThemeChange();
      }
    };
    mediaQuery.addEventListener("change", handleMedia);

    return () => {
      themeListeners = themeListeners.filter((l) => l !== listener);
      mediaQuery.removeEventListener("change", handleMedia);
    };
  },
  toggle() {
    const isDark = document.documentElement.classList.contains("dark");
    const nextDark = !isDark;
    document.documentElement.classList.toggle("dark", nextDark);
    try {
      localStorage.setItem("theme", nextDark ? "dark" : "light");
    } catch {
      /** Ignore storage restrictions in private browsing or sandboxed contexts */
    }
    emitThemeChange();
  },
  init() {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = stored === "dark" || (!stored && prefersDark);
      document.documentElement.classList.toggle("dark", isDark);
      emitThemeChange();
    } catch {
      /** Ignore storage restrictions in private browsing or sandboxed contexts */
    }
  },
};

const mountedStore = {
  subscribe(listener: () => void) {
    mountedListeners.push(listener);
    return () => {
      mountedListeners = mountedListeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return true;
  },
  getServerSnapshot() {
    return false;
  },
};

/**
 * ColorModeSelector: Client-side theme switcher toggling the .dark class on <html>
 * and synchronizing with localStorage / system preference without hydration mismatch.
 */
export default function ColorModeSelector({
  className = "",
  isOverHero = false,
}: ColorModeSelectorProps) {
  const isMounted = useSyncExternalStore(
    mountedStore.subscribe,
    mountedStore.getSnapshot,
    mountedStore.getServerSnapshot
  );

  const isDark = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot
  );

  useEffect(() => {
    themeStore.init();
  }, []);

  if (!isMounted) {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex ${iconButtonSizeClass} items-center justify-center rounded-full border opacity-0 ${isOverHero
          ? "border-border-200/30"
          : "border-border-100/50 dark:border-border-200/30"
          }`}
      />
    );
  }

  return (
    <Button
      type="button"
      variant={isOverHero ? "icon-inverted" : "icon"}
      size="icon"
      onClick={() => themeStore.toggle()}
      aria-label={isDark ? "Schakel naar lichte modus" : "Schakel naar donkere modus"}
      title={isDark ? "Lichte modus" : "Donkere modus"}
      className={className}
    >
      {isDark ? (
        <SunIcon className="w-4 h-4 text-accent8-900 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <MoonIcon className="w-4 h-4 text-accent7-900 transition-transform duration-200 hover:-rotate-12" />
      )}
    </Button>
  );
}
