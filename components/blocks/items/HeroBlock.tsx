import React from "react";
import Image from "next/image";
import { BoltIcon } from "@heroicons/react/24/outline";
import { HeroBlock as HeroBlockType, HeroMicroLink, CSLPAttribute } from "@/lib/types";
import { Button, Label } from "@/components/ui";

export interface HeroBlockProps {
  data?: HeroBlockType;
  previewAttr?: CSLPAttribute;
}

export default function HeroBlock({ data, previewAttr }: HeroBlockProps) {
  const cslp = data?.$;

  const label = data?.label || "Edwin Schipper";
  const title = data?.title || "Front-end Developer & Digital Creative";
  const text =
    data?.text ||
    data?.description ||
    "Sinds 2006 sla ik de brug tussen design en techniek.\nVoor werkgevers, start-ups en mijn eigen freelance klanten realiseer ik doordachte digitale producten.";

  const defaultMicroLinks: HeroMicroLink[] = [
    {
      title: "20+",
      label: "Jaren ervaring",
    },
    {
      title: "3+",
      label: "Kern expertises",
    },
  ];

  const rawLinks = data?.micro_links || data?.stats;
  const microLinks: HeroMicroLink[] =
    Array.isArray(rawLinks) && rawLinks.length > 0
      ? rawLinks
      : defaultMicroLinks;

  const ctaButton = data?.cta_button || data?.button;
  const buttonTitle = ctaButton?.title || "Plan een kennismaking";
  const buttonHref =
    (typeof ctaButton?.href === "string" ? ctaButton.href : undefined) ||
    "https://calendly.com/edwin-schipper/30min";

  const ctaNote =
    data?.cta_note || "Direct inplannen via Calendly (vrijblijvend)";

  const img1 = data?.image_1 || data?.image_ux;
  const img2 = data?.image_2 || data?.image_vormgeving;
  const img3 = data?.image_3 || data?.image_development;

  const img1Url = img1?.url || "/img/hero/Hero_Ux.jpg";
  const img2Url = img2?.url || "/img/hero/Hero_Vormgeving.jpg";
  const img3Url = img3?.url || "/img/hero/Hero_Development.jpg";

  return (
    <section
      {...previewAttr}
      className="w-full flex flex-col mb-14 sm:mb-40 md:mb-40 xl:mb-60 px-10 sm:px-14 md:px-20 lg:px-20 xl:px-14 mt-10 lg:my-40 font-content"
      id="hero-section"
    >
      <div className="mx-auto w-full container lg:justify-center items-start grid grid-cols-12 gap-y-20 sm:gap-y-28 lg:gap-y-8">
        <div className="col-span-12 sm:col-span-12 lg:col-span-5 xl:col-span-4 self-center flex">
          <div className="flex flex-col gap-y-7 md:gap-y-8">
            <div id="hero-label">
              <Label cslp={cslp && cslp.label}>
                {label}
              </Label>
            </div>

            <h1
              id="hero-top"
              className="text-title_1M sm:text-title_2 md:text-title_2 lg:text-title_2 xl:text-title_1 font-semibold dark:lg:font-medium text-title-100 dark:text-title-200 text-balance"
              {...(cslp && cslp.title)}
            >
              {title}
            </h1>

            <p
              id="hero-middle"
              className="text-mediumM sm:text-medium text-pretty font-content font-normal dark:font-normal text-content-100 dark:text-content-200 max-w-md"
              {...(cslp && (cslp.text || cslp.description))}
            >
              {text}
            </p>

            <div id="hero-href" className="flex items-center gap-x-7 sm:gap-x-10">
              {microLinks.map((link, index) => {
                const linkCslp = link?.$;
                return (
                  <span
                    key={link._metadata?.uid || index}
                    className={`flex flex-col ${index > 0
                      ? "border-l-2 border-border-100 dark:border-border-200 pl-7 sm:pl-10"
                      : ""
                      }`}
                  >
                    <span
                      className="text-title-100 dark:text-title-200 font-bold text-[24px] sm:text-[30px]"
                      {...(linkCslp && linkCslp.title)}
                    >
                      {link.title}
                    </span>

                    <p
                      className="text-content-300 dark:text-content-300 text-smallM sm:text-small font-normal"
                      {...(linkCslp && linkCslp.label)}
                    >
                      {link.label}
                    </p>
                  </span>
                );
              })}
            </div>

            <div id="hero-footer" className="">
              <Button
                href={buttonHref}
                variant="primary"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-fit"
                cslp={cslp && (cslp.cta_button || cslp.button)}
              >
                {buttonTitle}
              </Button>

              <div className="mt-4 sm:mt-3 w-full mx-auto relative">
                <div className="flex flex-row items-center justify-center md:justify-start gap-2">
                  <span>
                    <BoltIcon className="w-4 text-accent7-900 dark:text-accent8-900" />
                  </span>
                  <span
                    className="text-[11px] sm:text-[14px] text-content-300 font-medium"
                    {...(cslp && cslp.cta_note)}
                  >
                    {ctaNote}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-12 lg:col-span-7 xl:col-span-8 md:px-0 lg:px-10 xl:px-20 -mx-5 md:-mx-0 mt-0 lg:self-center xl:self-start">
          <div
            id="hero-gsap"
            className="grid grid-cols-12 grid-rows-[repeat(12,minmax(0,1fr))] gap-2 md:gap-2 w-full max-w-lg sm:max-w-none mx-auto relative"
          >
            <div className="hero-item z-20 col-start-1 col-end-6 row-start-1 row-end-11 max-h-[315px] sm:max-h-[560px] md:max-h-[460px] xl:max-h-[560px] bg-background-200 dark:bg-background-900 rounded-md border border-border-100 dark:border-border-200">
              {img1Url ? (
                <Image
                  src={img1Url}
                  alt={img1?.title || "Grafische Vormgeving"}
                  width={940}
                  height={560}
                  sizes="(max-width: 1023px) 42vw, 25vw"
                  className="w-full h-full object-cover rounded-md max-h-[315px] sm:max-h-[560px] md:max-h-[460px] xl:max-h-[560px]"
                  preload
                  {...(img1?.$ && img1?.$.url)}
                />
              ) : null}
            </div>

            <div className="hero-item z-10 col-start-6 col-end-12 row-start-3 row-end-7 max-h-[115px] sm:max-h-[217px] md:max-h-[217px] lg:max-h-[217px] bg-background-200 dark:bg-background-900 rounded-md border border-border-100 dark:border-border-200">
              {img2Url ? (
                <Image
                  src={img2Url}
                  alt={img2?.title || "Frontend Development"}
                  width={440}
                  height={217}
                  sizes="(max-width: 1023px) 50vw, 28vw"
                  className="w-full h-full object-cover rounded-md max-h-[115px] sm:max-h-[217px] md:max-h-[217px] lg:max-h-[217px]"
                  loading="eager"
                  {...(img2?.$ && img2?.$.url)}
                />
              ) : null}
            </div>

            <div className="hero-item z-30 col-start-6 col-end-13 row-start-7 row-end-13 bg-background-200 dark:bg-background-900 rounded-md border border-border-100 dark:border-border-200 max-h-[115px] sm:max-h-[232px] lg:max-h-[332px]">
              {img3Url ? (
                <Image
                  src={img3Url}
                  alt={img3?.title || "UX Design"}
                  width={1240}
                  height={332}
                  sizes="(max-width: 1023px) 58vw, 33vw"
                  className="w-full h-full object-cover rounded-md max-h-[115px] sm:max-h-[332px] md:max-h-[232px] lg:max-h-[332px]"
                  loading="eager"
                  {...(img3?.$ && img3?.$.url)}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
