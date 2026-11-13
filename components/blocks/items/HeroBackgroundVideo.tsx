import Image from "next/image";
import type { CSLPAttribute } from "@/lib/types";
import HeroVideoLayer from "./HeroVideoLayer";

export interface HeroBackgroundVideoProps {
  videoUrl?: string;
  fallbackImageUrl: string;
  videoCslp?: CSLPAttribute;
  imageCslp?: CSLPAttribute;
}

/**
 * Full-bleed looping hero background video layered directly over its identical
 * first-frame fallback image. Renders the LCP image and scrims on the server
 * while delegating video playback and reduced-motion checks to `HeroVideoLayer`.
 */
export default function HeroBackgroundVideo({
  videoUrl,
  fallbackImageUrl,
  videoCslp,
  imageCslp,
}: HeroBackgroundVideoProps) {
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

      {videoUrl ? (
        <HeroVideoLayer videoUrl={videoUrl} videoCslp={videoCslp} />
      ) : null}

      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background-950/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background-950 via-background-950/75 to-transparent" />
    </div>
  );
}
