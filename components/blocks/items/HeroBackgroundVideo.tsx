"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
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

interface HeroVideoLayerProps {
  videoUrl: string;
  videoCslp?: CSLPAttribute;
}

function HeroVideoLayer({ videoUrl, videoCslp }: HeroVideoLayerProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <video
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

export interface HeroBackgroundVideoProps {
  videoUrl: string;
  fallbackImageUrl: string;
  videoCslp?: CSLPAttribute;
  imageCslp?: CSLPAttribute;
}

/**
 * Full-bleed looping hero background video layered directly over its identical
 * first-frame fallback image for a zero-flicker LCP and seamless transition.
 * Uses `useSyncExternalStore` so `prefers-reduced-motion` never starts playback
 * or downloads video frames prior to hydration.
 */
export default function HeroBackgroundVideo({
  videoUrl,
  fallbackImageUrl,
  videoCslp,
  imageCslp,
}: HeroBackgroundVideoProps) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden bg-background-950"
      aria-hidden="true"
    >
      <Image
        src={fallbackImageUrl}
        alt=""
        fill
        sizes="100vw"
        quality={75}
        preload
        fetchPriority="high"
        className="object-cover object-center grayscale"
        {...imageCslp}
      />

      {videoUrl && !prefersReducedMotion ? (
        <HeroVideoLayer
          key={videoUrl}
          videoUrl={videoUrl}
          videoCslp={videoCslp}
        />
      ) : null}

      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background-950/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background-950 via-background-950/75 to-transparent" />
    </div>
  );
}
