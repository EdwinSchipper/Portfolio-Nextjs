"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export interface ColorModeSelectorProps {
  className?: string;
}

let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) {
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
    listeners.push(listener);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMedia = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        document.documentElement.classList.toggle("dark", e.matches);
        emitChange();
      }
    };
    mediaQuery.addEventListener("change", handleMedia);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
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
    emitChange();
  },
  init() {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = stored === "dark" || (!stored && prefersDark);
      document.documentElement.classList.toggle("dark", isDark);
      emitChange();
    } catch {
      /** Ignore storage restrictions in private browsing or sandboxed contexts */
    }
  },
};

const mountedStore = {
  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
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
        className="inline-flex w-9 h-9 items-center justify-center rounded-full border border-border-100/50 dark:border-border-200/30 opacity-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => themeStore.toggle()}
      aria-label={isDark ? "Schakel naar lichte modus" : "Schakel naar donkere modus"}
      title={isDark ? "Lichte modus" : "Donkere modus"}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full bg-background-100 dark:bg-background-800 text-content-100 dark:text-content-200 border border-border-100/50 dark:border-border-200/30 transition-all duration-200 hover:border-border-100 dark:hover:border-border-200/60 hover:text-title-100 dark:hover:text-title-200 cursor-pointer ${className}`}
    >
      {isDark ? (
        <SunIcon className="w-4 h-4 text-accent8-900 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <MoonIcon className="w-4 h-4 text-accent7-900 transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
}
