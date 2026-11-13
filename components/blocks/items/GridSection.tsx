import React from "react";
import Image from "next/image";
import {
  GridSectionBlock,
  GridSectionColumn,
  GridCard as GridCardType,
  TimelineCompany,
  SocialLink,
  GridSocials as GridSocialsType,
  CSLPAttribute,
  CSLPContainer,
} from "@/lib/types";
import { Button, Label, Icon, RichText } from "@/components/ui";
import { getContainerClass, getColorModeClass, colSpans, getHeadingTag } from "@/lib/layout";

export interface GridQuoteProps {
  quote?: string;
  className?: string;
  cslp?: CSLPAttribute;
}

export function GridQuote({
  quote,
  className = "",
  cslp,
}: GridQuoteProps) {
  if (!quote) return null;

  return (
    <blockquote
      {...cslp}
      className={`font-quote my-14 border-l-2 border-accent7-200 dark:border-accent8-200 pl-10 ${className}`}
    >
      <RichText
        content={quote}
        plainTextClassName=""
        className="font-playfull font-normal quote-text text-pretty text-content-100 dark:text-content-200 italic text-title_4M md:text-title_4 [&>p]:m-0"
      />
    </blockquote>
  );
}

export interface GridCardProps {
  card?: GridCardType;
  image?: { url?: string; title?: string; $?: CSLPContainer };
  tag?: string;
  title?: string;
  text?: string;
  description?: string;
  className?: string;
  cslp?: CSLPContainer;
}

export function GridCard({
  card,
  image,
  tag,
  title,
  text,
  description,
  className = "",
  cslp,
}: GridCardProps) {
  const cardImage = image || card?.image;
  const cardTag = tag || card?.tag || title || card?.title;
  const cardText = text || card?.text || description || card?.description;
  const cardMeta = cslp || card?.$;

  return (
    <div className={`font-content flex flex-col h-full ${className}`}>
      {cardImage?.url && (
        <div className="relative w-full aspect-16/10 rounded-md overflow-hidden border border-border-100 dark:border-border-200 bg-background-200 dark:bg-background-900">
          <Image
            src={cardImage.url}
            alt={cardImage.title || cardTag || "Image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            {...(cardImage?.$ && cardImage?.$.url)}
          />
        </div>
      )}

      {cardTag && (
        <div className="flex flex-wrap items-center gap-1.5 md:gap-1.5 mt-10 lg:mt-10">
          <Label
            variant="pill"
            cslp={cardMeta && (cardMeta.tag || cardMeta.title)}
          >
            {cardTag}
          </Label>
        </div>
      )}

      {cardText && (
        <p
          {...(cardMeta && (cardMeta.text || cardMeta.description))}
          className="mt-4 lg:mt-4 text-mediumM lg:text-medium font-normal text-content-100 dark:text-content-200"
        >
          {cardText}
        </p>
      )}
    </div>
  );
}

export interface GridCardsProps {
  cards?: GridCardType[];
  children?: React.ReactNode;
  className?: string;
  cslp?: CSLPAttribute;
}

export function GridCards({
  cards,
  children,
  className = "",
  cslp,
}: GridCardsProps) {
  return (
    <div
      {...cslp}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 lg:gap-8 ${className}`}
    >
      {cards && cards.length > 0
        ? cards.map((card, idx) => (
          <GridCard
            key={card._metadata?.uid || `card-${idx}`}
            card={card}
          />
        ))
        : children}
    </div>
  );
}

export interface GridTimelineProps {
  timeline?: TimelineCompany[] | { companies?: TimelineCompany[] } | null;
  className?: string;
  cslp?: CSLPAttribute;
}

export function GridTimeline({
  timeline,
  className = "",
  cslp,
}: GridTimelineProps) {
  if (!timeline) return null;

  const companies: TimelineCompany[] = Array.isArray(timeline)
    ? timeline
    : Array.isArray(timeline.companies)
      ? timeline.companies
      : [];

  if (companies.length === 0) return null;

  return (
    <div
      {...cslp}
      id="page-calendar-gsap"
      className={`font-content w-full ${className}`}
    >
      <div
        id="page-calendar-table"
        className="relative border-l-2 border-accent7-200 dark:border-accent8-200 ml-2 lg:ml-0 mt-4 lg:mt-8"
      >
        {companies.map((company, index) => {
          const rawWebsite = company.website;
          const websiteUrl =
            typeof rawWebsite === "object" && rawWebsite !== null
              ? rawWebsite.href || rawWebsite.url
              : rawWebsite;

          const companyName = company.company || company.company_name;
          const roles = Array.isArray(company.roles) ? company.roles : [];

          return (
            <React.Fragment
              key={company._metadata?.uid || companyName || `company-${index}`}
            >
              {index !== 0 && (
                <div
                  aria-hidden="true"
                  className="bg-background-200 dark:bg-background-900 -ml-1 h-10"
                />
              )}

              <div
                className="pl-8 lg:pl-10 relative last:pb-0 group calender-company-row transition-all duration-300"
                {...(company.$ && (company.$.company || company.$.company_name))}
              >
                <div
                  aria-hidden="true"
                  className="absolute -left-[11px] top-0 w-5 h-5 bg-accent7-900 dark:bg-accent8-900 border-4 border-accent7-200 dark:border-accent8-200 rounded-full ring-4 ring-background-100 dark:ring-background-800 transition-all duration-500 group-hover:scale-110 group-hover:bg-accent7-500 dark:group-hover:bg-accent8-500"
                />

                <div className="flex flex-col gap-1 lg:gap-0.5">
                  <div className="flex items-center justify-between -top-1.5 relative">
                    {websiteUrl ? (
                      <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-mediumM lg:text-small font-bold text-title-100 dark:text-title-200 flex items-center gap-2 group/link hover:underline cursor-pointer transition-colors duration-300"
                        {...(company.$ && company.$.website)}
                      >
                        {companyName}
                      </a>
                    ) : (
                      <span
                        className="text-mediumM lg:text-small font-bold text-title-100 dark:text-title-200 flex items-center gap-2"
                        {...(company.$ && (company.$.company || company.$.company_name))}
                      >
                        {companyName}
                      </span>
                    )}
                  </div>

                  {roles.length > 0 && (
                    <div className="flex flex-col">
                      {roles.map((role, rIdx) => (
                        <div
                          key={role._metadata?.uid || role.title || `role-${rIdx}`}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 text-mediumM lg:text-small text-content-100 dark:text-content-200 calender-role-row group-hover:text-content-100 dark:group-hover:text-content-200 transition-colors duration-300 border-b border-border-100 dark:border-accent8-200 py-2"
                        >
                          <span
                            className="font-medium"
                            {...(role.$ && role.$.title)}
                          >
                            {role.title}
                          </span>
                          <span
                            className="text-smallM lg:text-small text-content-300 dark:text-content-300"
                            {...(role.$ && role.$.period)}
                          >
                            {role.period}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export interface GridSocialsProps {
  socials?: GridSocialsType | SocialLink[] | null;
  className?: string;
  cslp?: CSLPAttribute;
}

export function GridSocials({
  socials,
  className = "",
  cslp,
}: GridSocialsProps) {
  if (!socials) return null;

  const rawLinks = Array.isArray(socials)
    ? socials
    : Array.isArray(socials.links)
      ? socials.links
      : Array.isArray(socials.items)
        ? socials.items
        : [];

  const label = !Array.isArray(socials) ? socials.label : undefined;

  if (rawLinks.length === 0) return null;

  return (
    <div
      {...cslp}
      className={`flex items-center gap-4 sm:gap-6 pt-2 font-content ${className}`}
    >
      {label && (
        <span
          {...(!Array.isArray(socials) && socials.$ && socials.$.label)}
          className="text-mediumM sm:text-small font-medium text-content-100/80 dark:text-content-200/80 shrink-0"
        >
          {label}
        </span>
      )}

      <div className="flex items-center gap-3 md:gap-4 flex-wrap">
        {rawLinks.map((item: SocialLink, idx: number) => {
          const rawLink = item.link;
          const href =
            typeof rawLink === "object" && rawLink !== null
              ? rawLink.href || rawLink.url
              : rawLink;

          if (!href) return null;

          const rawIcon = item.icon || "link";
          const lower = String(rawIcon).toLowerCase().trim();
          const iconName =
            lower === "email" || lower === "mail"
              ? "envelope"
              : lower === "phone" || lower === "tel" || lower === "mobiel" || lower === "telefoon"
                ? "device-phone-mobile"
                : lower === "linkedin"
                  ? "link"
                  : rawIcon;

          const title = item.title || item.label;
          const isExternal =
            typeof href === "string" &&
            (href.startsWith("http://") || href.startsWith("https://"));

          return (
            <a
              key={item._metadata?.uid || `social-${idx}`}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              aria-label={title || `Social link ${iconName}`}
              title={title}
              className="group w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full bg-accent7-900 dark:bg-accent8-900 border-2 border-accent7-200/50 dark:border-accent8-300/40 ring-4 ring-accent7-900/15 dark:ring-accent8-900/25 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md cursor-pointer"
              {...(item.$ && (item.$.icon || item.$.link))}
            >
              <Icon
                name={iconName}
                className="w-5 h-5 md:w-6 md:h-6 text-title-200 dark:text-title-100 stroke-[1.75]"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}

export interface GridColumnProps {
  span?: number | string;
  data?: GridSectionColumn;
  className?: string;
}

export function GridColumn({
  span = 6,
  data,
  className = "",
}: GridColumnProps) {
  if (!data) return null;

  const colClass = colSpans[String(span)] ?? colSpans["6"];
  const label = data.label_left || data.label_right;
  const title = data.title_h1 || data.title_h1r;
  const headingTag = getHeadingTag(data.heading_type, "h2");
  const text = data.text_left || data.text_right;
  const extendedText = data.text_right_extended;
  const quote = data.quote_left || data.quote_right;
  const image = data.image_left || data.image_right;
  const button = data.button_left || data.button_right;
  const cards = data.cards;
  const resumeTimeline =
    data.resume_timeline ||
    data.timeline ||
    data.career_timeline;
  const socials =
    data.socials ||
    data.social_links ||
    data.connect;
  const cslp = data.$;

  return (
    <div className={`${colClass} ${className}`}>
      <div className="space-y-8 sm:space-y-8 mb-14 sm:mb-0">
        {label && (
          <Label cslp={cslp && (cslp.label_left || cslp.label_right)}>
            {label}
          </Label>
        )}

        {title &&
          React.createElement(
            headingTag,
            {
              ...(cslp && (cslp.title_h1 || cslp.title_h1r)),
              className:
                "text-title_2M sm:text-title_2 font-bold text-title-100 dark:text-title-200 max-w-2xl text-balance w-11/12 md:w-full font-content",
            },
            title
          )}

        {text && (
          <RichText
            content={text}
            mode="html"
            cslp={cslp && (cslp.text_left || cslp.text_right)}
            className="text-baseM sm:text-base w-full text-content-100 dark:text-content-200 text-pretty font-normal font-content"
          />
        )}

        {image?.url && (
          <div className="relative w-full aspect-4/3 rounded-md overflow-hidden shadow-sm bg-background-200 dark:bg-background-900 border-dashed border-border-100 dark:border-border-200 mt-14 sm:mt-0">
            <Image
              src={image.url}
              alt={image.title || title || "Image"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              {...(image?.$ && image?.$.url)}
            />
          </div>
        )}

        {socials && (
          <GridSocials
            socials={socials}
            cslp={cslp && (cslp.socials || cslp.social_links || cslp.connect)}
          />
        )}

        {quote && (
          <GridQuote
            quote={quote}
            cslp={cslp && (cslp.quote_left || cslp.quote_right)}
          />
        )}

        {extendedText && (
          <RichText
            content={extendedText}
            mode="html"
            cslp={cslp && cslp.text_right_extended}
            className="text-baseM sm:text-base w-full text-content-100 dark:text-content-200 text-pretty font-normal font-content"
          />
        )}

        {button?.href && button?.title && (
          <div className="mb-14 sm:mb-0">
            <Button
              href={button.href}
              variant="primary"
              cslp={cslp && (cslp.button_left || cslp.button_right)}
            >
              {button.title}
            </Button>
          </div>
        )}

        {cards && cards.length > 0 && (
          <GridCards cards={cards} cslp={cslp && cslp.cards} />
        )}

        {resumeTimeline && (
          <GridTimeline
            timeline={resumeTimeline}
            cslp={cslp && (cslp.resume_timeline || cslp.timeline)}
          />
        )}
      </div>
    </div>
  );
}

export interface GridSectionProps {
  data?: GridSectionBlock;
  previewAttr?: CSLPAttribute;
  width?: "small" | "default" | "large" | "wide" | string;
  colorMode?: "default" | "alt" | string;
  className?: string;
}

/**
 * GridSection: Consolidated 2-column modular grid section.
 */
export default function GridSection({
  data,
  previewAttr,
  width,
  colorMode,
  className = "",
}: GridSectionProps) {
  if (!data) return null;

  const rawWidth = width || data.container_width;
  const containerClass = getContainerClass(rawWidth, "default");

  const colorModeKey = colorMode || data.color_mode;
  const colorModeClass = getColorModeClass(colorModeKey);

  const leftCol = data.left_col_span ?? "5";
  const rightCol = data.right_col_span ?? "7";
  const contentLeft = data.content_left;
  const contentRight = data.content_right;

  return (
    <section
      {...previewAttr}
      data-color-mode={colorModeKey}
      className={`col-span-full w-full mb-20 md:mb-40 lg:mb-40 ${colorModeClass} ${className}`}
    >
      <div
        className={`sm:grid grid-cols-1 md:grid-cols-12 mx-auto z-20 ${containerClass} px-10 sm:px-14 lg:px-12 md:px-20 gap-14 lg:gap-x-10 xl:gap-x-24`}
      >
        {contentLeft && <GridColumn span={leftCol} data={contentLeft} />}
        {contentRight && <GridColumn span={rightCol} data={contentRight} />}
      </div>
    </section>
  );
}

GridSection.Column = GridColumn;
GridSection.Cards = GridCards;
GridSection.Card = GridCard;
GridSection.Quote = GridQuote;