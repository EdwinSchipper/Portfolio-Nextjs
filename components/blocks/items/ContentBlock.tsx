import React from "react";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { Block, CSLPAttribute } from "@/lib/types";

export interface ContentBlockProps {
  data?: Block;
  previewAttr?: CSLPAttribute;
  layout?: "image_left" | "image_right";
  className?: string;
}

/**
 * ContentBlock: Clean, single-file content block with image and rich text.
 */
export default function ContentBlock({
  data,
  previewAttr,
  layout,
  className = "",
}: ContentBlockProps) {
  if (!data) return null;

  const chosenLayout = layout || data?.layout || "image_left";
  const isImageLeft = chosenLayout === "image_left";

  return (
    <section
      {...previewAttr}
      className={`col-span-full w-full py-12 md:py-20 font-content ${className}`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col items-center gap-8 md:gap-12 lg:gap-16 ${isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
          }`}
      >
        {/* Media / Image */}
        {data.image?.url && (
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-4/3 rounded-md overflow-hidden shadow-sm bg-background-200 dark:bg-background-900 border border-border-100 dark:border-border-200">
              <Image
                src={data.image.url}
                alt={data.image.title || data.title || "Content image"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                {...(data?.$ && data?.$.image)}
              />
            </div>
          </div>
        )}

        {/* Content (Title & Copy) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
          {data.title && (
            <h2
              className="text-title_2M sm:text-title_2 font-bold text-title-100 dark:text-title-200 tracking-tight"
              {...(data?.$ && data?.$.title)}
            >
              {data.title}
            </h2>
          )}

          {data.copy && (
            <div
              className="text-mediumM sm:text-small text-content-100 dark:text-content-200 leading-relaxed font-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.copy),
              }}
              {...(data?.$ && data?.$.copy)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
