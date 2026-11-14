import Image from "next/image";
import { HeroBlock as HeroBlockType, CSLPAttribute } from "@/lib/types";
import HeroBackgroundVideo from "./HeroBackgroundVideo";
import HeroLocalClock from "./HeroLocalClock";
import HeroAvailabilityStatus from "./HeroAvailabilityStatus";

const ACCENT_PHRASE = "Digital Creative";

function renderHeroHeadline(title: string) {
  const accentIndex = title.toLowerCase().indexOf(ACCENT_PHRASE.toLowerCase());
  if (accentIndex === -1) {
    return title;
  }

  const before = title.slice(0, accentIndex);
  const highlighted = title.slice(accentIndex, accentIndex + ACCENT_PHRASE.length);
  const after = title.slice(accentIndex + ACCENT_PHRASE.length);

  return (
    <>
      {before}
      <span className="relative inline-block sm:whitespace-nowrap">
        <span className="relative z-10">{highlighted}</span>
        <span
          aria-hidden="true"
          className="hero-underline-draw pointer-events-none select-none absolute -bottom-2.5 sm:-bottom-3.5 md:-bottom-4 left-0 z-0 w-full"
        >
          <Image
            src="/img/hero/digital-creative-underline-light.png"
            alt=""
            width={815}
            height={45}
            unoptimized
            loading="lazy"
            className="block dark:hidden w-full h-auto"
          />
          <Image
            src="/img/hero/digital-creative-underline-dark.png"
            alt=""
            width={815}
            height={45}
            unoptimized
            loading="lazy"
            className="hidden dark:block w-full h-auto"
          />
        </span>
      </span>
      {after}
    </>
  );
}

export interface HeroBlockProps {
  data?: HeroBlockType;
  previewAttr?: CSLPAttribute;
}

export default function HeroBlock({ data, previewAttr }: HeroBlockProps) {
  const cslp = data?.$;

  const title = data?.title || "Front-end Developer & Digital Creative";
  const text =
    data?.text ||
    data?.description ||
    "Met ruim 20 jaar ervaring in design, development en digitale ervaringen.";

  const backgroundVideo = data?.background_video || data?.video;
  const backgroundImage = data?.background_image || data?.fallback_image;
  const backgroundVideoUrl = backgroundVideo?.url;
  const backgroundImageUrl = backgroundImage?.url || "/img/hero/hero-background-fallback.jpg";

  return (
    <section
      {...previewAttr}
      aria-labelledby="hero-top"
      className="relative overflow-hidden bg-background-950 w-full flex flex-col -mt-23 md:-mt-27 lg:-mt-29.25 px-8 sm:px-14 md:px-20 lg:px-20 xl:px-28 pt-32 md:pt-36 lg:pt-40 pb-8 sm:pb-24 lg:pb-30 xl:pb-20 font-content min-h-dvh"
      id="hero-section"
    >
      <HeroBackgroundVideo
        videoUrl={backgroundVideoUrl}
        fallbackImageUrl={backgroundImageUrl}
        videoCslp={backgroundVideo?.$ && backgroundVideo.$.url}
        imageCslp={backgroundImage?.$ && backgroundImage.$.url}
      />

      <div className="relative z-10 mt-auto mx-auto w-full max-w-[1980px] lg:justify-center items-end grid grid-cols-12 gap-y-20 sm:gap-y-28 lg:gap-y-40 xl:gap-y-8">
        <div className="col-span-12 lg:col-span-8 self-end flex">
          <div className="flex flex-col gap-y-10 md:gap-y-20 xl:gap-y-20">
            <h1
              id="hero-top"
              className="text-title_heroM sm:text-title_2 md:text-title_hero lg:text-title_hero xl:text-title_hero_xl font-semibold lg:font-medium text-title-200 text-balance"
              {...(cslp && cslp.title)}
            >
              {renderHeroHeadline(title)}
            </h1>

            <p
              id="hero-middle"
              className="text-heroM sm:text-hero text-pretty sm:text-pretty font-content font-normal text-title-200 max-w-3xl"
              {...(cslp && (cslp.text || cslp.description))}
            >
              {text}
            </p>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4 self-end">
          <div className="text-content-200 flex flex-col items-end text-right text-noteM sm:text-medium w-full">
            <HeroLocalClock />
            <span className="inline-flex items-center gap-2">
              <span>
                <span className="sr-only">Locatie: </span>
                <span aria-hidden="true">[</span>
                Dedemsvaart
                <span aria-hidden="true">]</span>
              </span>
              <HeroAvailabilityStatus
                isAvailable={data?.is_available ?? true}
                cslp={cslp && cslp.is_available}
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
