"use client";

import { useState, useSyncExternalStore } from "react";
import type { CSLPAttribute } from "@/lib/types";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  motionQuery.addEventListener("change", callback);
  return () => {
    motionQuery.removeEventListener("change", callback);
  };
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return true;
}

export interface HeroVideoLayerProps {
  videoUrl: string;
  videoCslp?: CSLPAttribute;
}

/**
 * Client-only video overlay for the hero background.
 * Uses `useSyncExternalStore` so `prefers-reduced-motion` never starts playback
 * or downloads video frames prior to hydration.
 */
export default function HeroVideoLayer({
  videoUrl,
  videoCslp,
}: HeroVideoLayerProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  if (!videoUrl || prefersReducedMotion) {
    return null;
  }

  return (
    <video
      key={videoUrl}
      src={videoUrl}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      disablePictureInPicture
      tabIndex={-1}
      onPlaying={() => setIsVideoPlaying(true)}
      className={`motion-reduce:hidden absolute inset-0 h-full w-full object-cover object-center grayscale transition-opacity duration-700 ease-out ${
        isVideoPlaying ? "opacity-100" : "opacity-0"
      }`}
      {...videoCslp}
    />
  );
}

