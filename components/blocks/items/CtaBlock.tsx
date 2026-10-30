import React from "react";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { CtaBlock as CtaBlockType, CSLPAttribute } from "@/lib/types";
import { Button, Label } from "@/components/ui";

export interface CtaBlockProps {
  data?: CtaBlockType;
  previewAttr?: CSLPAttribute;
  layout?: "image_left" | "image_right";
  className?: string;
}

/**
 * CtaBlock: Resume CTA block supporting label, title, description, dual light/dark image, and button.
 * Aligns with Contentstack content type schema (CTA_Resume).
 */
export default function CtaBlock({
  data,
  previewAttr,
  className = "",
}: CtaBlockProps) {
  if (!data) return null;

  const label = data.label;
  const title = data.title;
  const description = data.description || data.text_cta || data.text;
  const isHtml = typeof description === "string" && /<[a-z][\s\S]*>/i.test(description);

  const buttonHref = data.button_cta?.href || data.button_to || (data as any).to;
  const buttonText = data.button_cta?.title || data.button_text || "Bekijk CV";

  const imageLight = data.image || data.image_light;
  const imageDark = data.image_dark_mode || data.image_dark;
  const imageAlt = data.image_alt || imageLight?.title || imageDark?.title || title || "CTA image";

  const meta = data.$;

  return (
    <section
      {...previewAttr}
      id="resume-cta"
      className={`col-span-full w-full -mt-20 sm:-mt-32 lg:mt-0 lg:mb-32 font-content ${className}`}
    >
      <div
        className="mx-auto w-full md:max-w-4xl lg:border border-border-100 dark:border-border-200 lg:rounded-md bg-background-200 dark:bg-background-900 py-14 p-10 sm:p-14 md:p-20 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 group"
      >
        <div className="flex flex-col gap-y-8 order-2 md:order-1 w-full md:w-2/3">
          <div className="flex flex-col gap-y-5 gap-7">
            {label && (
              <div>
                <Label
                  variant="brand"
                  cslp={meta && meta.label}
                >
                  {label}
                </Label>
              </div>
            )}
            {title && (
              <h3
                id="services-heading"
                className="text-title_3M sm:text-title_3 text-pretty font-bold text-title-100 dark:text-title-200 -mt-3"
                {...(meta && meta.title)}
              >
                {title}
              </h3>
            )}
            {description && (
              isHtml ? (
                <div
                  id="services-text"
                  className="text-mediumM sm:text-medium text-pretty sm:text-balance font-content text-content-100 dark:text-content-200"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(description),
                  }}
                  {...(meta && (meta.text_cta || meta.description || meta.text))}
                />
              ) : (
                <p
                  id="services-text"
                  className="text-mediumM sm:text-medium text-pretty sm:text-balance font-content text-content-100 dark:text-content-200"
                  {...(meta && (meta.text_cta || meta.description || meta.text))}
                >
                  {description}
                </p>
              )
            )}
          </div>

          {buttonHref && (
            <div className="services-item w-full sm:w-fit">
              <Button
                href={buttonHref}
                className="w-full sm:w-auto"
                cslp={meta && (meta.button_cta || meta.button_to || meta.button_text)}
              >
                {buttonText}
              </Button>
            </div>
          )}
        </div>

        {(imageLight?.url || imageDark?.url) && (
          <div className="order-1 md:order-2 w-full md:w-1/3 flex justify-start md:justify-end services-item">
            {imageLight?.url && (
              <Image
                src={imageLight.url}
                alt={imageAlt}
                width={224}
                height={224}
                sizes="(max-width: 640px) 144px, (max-width: 1024px) 192px, 224px"
                loading="lazy"
                className={`w-36 sm:w-48 lg:w-56 h-auto transition-transform duration-500 group-hover:scale-105 origin-bottom object-contain ${imageDark?.url ? "block dark:hidden" : "block"
                  }`}
                {...(imageLight?.$?.url || (meta && (meta.image || meta.image_light)))}
              />
            )}
            {imageDark?.url && (
              <Image
                src={imageDark.url}
                alt={imageAlt}
                width={224}
                height={224}
                sizes="(max-width: 640px) 144px, (max-width: 1024px) 192px, 224px"
                loading="lazy"
                className={`w-36 sm:w-48 lg:w-56 h-auto transition-transform duration-500 group-hover:scale-105 origin-bottom object-contain ${imageLight?.url ? "hidden dark:block" : "block"
                  }`}
                {...(imageDark?.$?.url || (meta && (meta.image_dark_mode || meta.image_dark)))}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
