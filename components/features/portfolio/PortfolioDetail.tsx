import Image from "next/image";
import Link from "next/link";
import { PortfolioItem, CSLPAttribute } from "@/lib/types";
import { resolveAssetUrl, resolveAssetCslp } from "@/lib/cms";
import { Breadcrumbs } from "@/components/layout";
import { Label, Icon, RichText } from "@/components/ui";
import PortfolioTechStack from "./PortfolioTechStack";

interface PortfolioDetailProps {
  item?: PortfolioItem | null;
}

/**
 * Reusable case study section for Sections 02, 03, and 04.
 */
function CaseStudySection({
  id,
  step,
  title,
  text,
  cslp,
}: {
  id: string;
  step: string;
  title: string;
  text?: string;
  cslp?: CSLPAttribute;
}) {
  if (!text) return null;

  return (
    <section
      id={id}
      className="portfolio-section mx-auto max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl px-10 md:px-20 lg:px-12 mb-14 lg:mb-20 font-content"
    >
      <div className="container mx-auto">
        <div className="lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4 md:flex flex-row md:flex-col mb-7 lg:mb-0 items-start">
            <Label variant="numbered" className="mb-2">
              {step}
            </Label>
            <h3 className="text-title_3M sm:text-title_3 font-bold text-title-100 dark:text-title-200 max-w-sm md:max-w-xl lg:max-w-6xl text-balance">
              {title}
            </h3>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            <RichText
              content={text}
              cslp={cslp}
              className="text-content-100 dark:text-content-200 text-baseM sm:text-base font-normal text-pretty leading-relaxed [&>p]:mb-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Reusable full-width banner visual for project showcase images.
 */
function CaseStudyBanner({
  id,
  url,
  alt,
  cslp,
}: {
  id: string;
  url?: string | null;
  alt?: string;
  cslp?: CSLPAttribute;
}) {
  if (!url) return null;

  return (
    <section
      id={id}
      className="px-10 md:px-20 lg:px-12 mb-28 md:mb-40 lg:mb-48 max-w-xl md:max-w-4xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto"
    >
      <div className="container mx-auto">
        <div className="relative w-auto lg:w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[780px] rounded-md overflow-hidden group -mx-4 lg:mx-auto bg-background-200 dark:bg-background-900 border border-border-100 dark:border-border-200">
          <Image
            src={url}
            alt={alt || "Project visual"}
            fill
            loading="lazy"
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
            {...cslp}
          />
        </div>
      </div>
    </section>
  );
}

/**
 * PortfolioDetail: Case study detail view for individual portfolio items.
 * Renders header, breadcrumbs, overview, tech stack, and modular case study steps.
 */
export default function PortfolioDetail({ item }: PortfolioDetailProps) {
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center text-content-100/60 dark:text-content-200/60 font-content">
        Project niet gevonden.
      </div>
    );
  }

  const companyOrTitle = item.company || item.title;

  const overviewText = item.content || item.description;
  const overviewCslp = item?.$ && (item.$.description || item.$.content);

  const heroImg = item.portfolioimagedetail || item.featured_image;
  const heroImgUrl = resolveAssetUrl(heroImg);
  const heroImgAlt =
    item.alt_text ||
    (typeof heroImg === "object" && heroImg?.title) ||
    companyOrTitle;
  const heroImgCslp = resolveAssetCslp(
    heroImg,
    item?.$ && (item.$.portfolioimagedetail || item.$.featured_image)
  );

  const banner1Img = item.banner_visual_1 || item.portfolioimagedetail1;
  const banner1Url = resolveAssetUrl(banner1Img);
  const banner1Cslp = resolveAssetCslp(
    banner1Img,
    item?.$ && (item.$.banner_visual_1 || item.$.portfolioimagedetail1)
  );

  const banner2Img = item.banner_visual_2 || item.portfolioimagedetail2;
  const banner2Url = resolveAssetUrl(banner2Img);
  const banner2Cslp = resolveAssetCslp(
    banner2Img,
    item?.$ && (item.$.banner_visual_2 || item.$.portfolioimagedetail2)
  );

  const banner3Img = item.portfolioimagedetail3;
  const banner3Url = resolveAssetUrl(banner3Img);
  const banner3Cslp = resolveAssetCslp(
    banner3Img,
    item?.$ && item.$.portfolioimagedetail3
  );

  return (
    <article className="w-full">
      <header className="relative w-full flex flex-col justify-end pt-40 md:pt-40 lg:pt-52 pb-10 md:pb-16 lg:pb-24 overflow-hidden border-b border-border-100/30 dark:border-border-200/5 -mt-27.25 mb-14 lg:mb-20 bg-linear-to-tl from-accent7-200/30 to-accent7-500/60 dark:from-accent8-100 dark:via-accent8-100 dark:to-accent8-300 font-content">
        <div className="relative z-10 w-full max-w-4xl xl:max-w-6xl px-10 sm:px-14 md:px-20 lg:px-12 mx-auto flex flex-col items-start">
          <Label
            variant="brand"
            className="flex gap-3 items-center relative w-full mb-3 md:mb-3 xl:mb-3"
          >
            Portfolio
          </Label>

          <h1
            {...(item?.$ && (item?.$.company || item?.$.title))}
            className="text-title_1M sm:text-title_1 font-bold text-title-100 dark:text-title-200 tracking-tight text-balance max-w-4xl"
          >
            {companyOrTitle}
          </h1>
        </div>
      </header>

      <section id="portfolio-header" className="mx-auto max-w-4xl xl:max-w-6xl w-full">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Portfolio", href: "/portfolio" },
            { label: companyOrTitle, active: true },
          ]}
          currentTitleAttr={item?.$ && (item?.$.company || item?.$.title)}
        />
      </section>

      <section
        id="page-intro-gsap"
        className="flex lg:items-center justify-center sm:max-w-xl md:max-w-4xl lg:max-w-7xl container lg:w-full px-6 sm:px-0 md:px-14 lg:px-20 xl:px-12 mx-auto z-20 mb-14 lg:mb-40 overflow-hidden"
      >
        <div className="w-full mx-auto z-20 flex flex-col md:grid md:grid-cols-12 items-start justify-start lg:justify-end lg:items-end">
          <h2 className="sr-only">Portfolio</h2>

          <div
            id="page-intro-content-left"
            className="w-full relative group rounded-md overflow-hidden order-2 md:order-1 md:col-span-6 lg:col-span-7 mb-8 lg:mb-0 mt-8 md:mt-0 h-[220px] sm:h-[325px] md:h-[400px] lg:h-[500px] xl:h-[50vh] bg-background-200 dark:bg-background-900 border border-border-100 dark:border-border-200"
          >
            {heroImgUrl && (
              <Image
                src={heroImgUrl}
                alt={heroImgAlt}
                fill
                preload
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 60vw"
                className="object-cover"
                {...heroImgCslp}
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-background-900/5 via-background-900/10 dark:from-background-900/5 dark:via-background-900/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>

          <div
            id="page-intro-content-right"
            className="contents lg:relative lg:pt-10 lg:pb-0 md:order-2 md:col-span-6 lg:col-span-5 md:flex md:justify-end md:flex-col md:pl-14 xl:pl-24"
          >
            <div className="flex flex-col md:mb-4 lg:mb-10 order-1 lg:order-none w-full mx-auto px-4 sm:px-0">
              <Label variant="numbered" className="mb-2">
                01 — Overzicht
              </Label>
              <h2
                className="text-title_2M sm:text-title_2 font-bold text-title-100 dark:text-title-200 max-w-sm md:max-w-xl lg:max-w-6xl text-balance"
              >
                De essentie van het project
              </h2>
            </div>

            <RichText
              content={overviewText}
              cslp={overviewCslp}
              className="text-mediumM sm:text-medium w-full text-content-100 dark:text-content-200 text-pretty font-normal font-content order-3 lg:order-none max-w-xl mx-auto px-4 sm:px-0 leading-relaxed [&>p]:mb-4"
            />
          </div>
        </div>
      </section>

      <PortfolioTechStack
        items={item.tech_stack}
        cslp={item?.$ && item.$.tech_stack}
      />

      <CaseStudySection
        id="portfolio-section-01"
        step="02 — Uitdaging"
        title="De kern van de uitdaging"
        text={item.portfolioimagedetail1_txt}
        cslp={item?.$ && item.$.portfolioimagedetail1_txt}
      />

      <CaseStudyBanner
        id="portfolio-banner-1"
        url={banner1Url}
        alt={item.alt_text || (typeof banner1Img === "object" && banner1Img?.title) || `Project visual voor ${companyOrTitle}`}
        cslp={banner1Cslp}
      />

      <CaseStudySection
        id="portfolio-section-02"
        step="03 — Aanpak"
        title="Uitdagingen & Oplossingen"
        text={item.portfolioimagedetail2_txt}
        cslp={item?.$ && item.$.portfolioimagedetail2_txt}
      />

      <CaseStudyBanner
        id="portfolio-banner-2"
        url={banner2Url}
        alt={item.alt_text || (typeof banner2Img === "object" && banner2Img?.title) || `Project visual voor ${companyOrTitle}`}
        cslp={banner2Cslp}
      />

      <CaseStudySection
        id="portfolio-section-03"
        step="04 — Uitkomst"
        title="Mijn rol en expertise"
        text={item.portfolioimagedetail3_txt}
        cslp={item?.$ && item.$.portfolioimagedetail3_txt}
      />

      <CaseStudyBanner
        id="portfolio-banner-3"
        url={banner3Url}
        alt={item.alt_text || (typeof banner3Img === "object" && banner3Img?.title) || companyOrTitle}
        cslp={banner3Cslp}
      />

      <section id="portfolio-divider" className="section-divider">
        <hr className="max-w-5xl mx-auto mb-14 lg:mb-14 border-border-100 dark:border-border-200" />
      </section>

      <section
        id="aanpak-section"
        className="px-10 md:px-20 lg:px-12 mb-28 md:mb-40 lg:mb-60"
      >
        <div className="container mx-auto max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
          <div
            id="intro-label"
            className="flex gap-4 lg:gap-x-4 text-content-100/70 dark:text-content-200/70 text-smallM md:text-small font-content font-normal w-fit"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 hover:text-title-100 dark:hover:text-title-200 hover:gap-x-3 transition-all duration-200 font-bold underline"
            >
              <Icon name="arrow-long-left" size="sm" />
              <span>Terug naar portfolio</span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
