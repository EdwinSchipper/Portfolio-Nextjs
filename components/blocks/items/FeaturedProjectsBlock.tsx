import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FeaturedProjectsBlock as FeaturedProjectsBlockType,
  CSLPAttribute,
  File,
} from "@/lib/types";
import { Button, Label } from "@/components/ui";
import { CardSectionHeader } from "./CardSection";

export interface FeaturedProjectsBlockProps {
  data?: FeaturedProjectsBlockType;
  previewAttr?: CSLPAttribute;
  className?: string;
}

/**
 * FeaturedProjectsBlock: Case list matching the brand layout with desktop center divider line,
 * alternating image/text columns, numbered labels, and direct portfolio links.
 */
export default function FeaturedProjectsBlock({
  data,
  previewAttr,
  className = "",
}: FeaturedProjectsBlockProps) {
  if (!data) return null;

  const projects = data.projects || [];
  const sectionTitle = data.section_title || (data as any).title;
  const label = data.label || (data as any).label_projects;
  const sectionIntro = data.section_intro || (data as any).intro;

  const hasHeader = Boolean(label || sectionTitle || sectionIntro);

  return (
    <section
      {...previewAttr}
      className={`col-span-full w-full flex flex-col font-content ${className}`}
    >
      {hasHeader && (
        <CardSectionHeader
          label={label}
          title={sectionTitle}
          intro={sectionIntro}
          cslp={data?.$}
          cslpLabel={data?.$ && (data.$.label || (data.$ as any).label_projects)}
          cslpTitle={data?.$ && (data.$.section_title || (data.$ as any).title)}
          cslpIntro={data?.$ && (data.$.section_intro || (data.$ as any).intro)}
        />
      )}

      <div
        id="home-case-list"
        className="w-full flex flex-col gap-14 md:gap-8 mb-28 sm:mb-40 lg:mb-60 px-10 sm:px-14 md:px-20 xl:px-14 border-y border-border-100 dark:border-border-200 py-14 md:py-24 relative font-content"
      >
        {/* Desktop middenlijn divider */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border-100 dark:bg-border-200 -translate-x-1/2 pointer-events-none" />

        <div className="mx-auto w-full sm:max-w-xl md:max-w-3xl lg:max-w-7xl gap-14 sm:gap-20 flex flex-col relative z-10">
          {projects.length > 0 ? (
            projects.map((post, index) => {
              const postUrl = post.url || `/portfolio/${post.uid || (post as any).id || index}`;
              const thumbnailCandidate =
                post.case_thumbnail ||
                post.featured_image ||
                (typeof post.portfolioimagedetail === "object"
                  ? post.portfolioimagedetail
                  : null);
              const imageObj =
                typeof thumbnailCandidate === "object" && thumbnailCandidate !== null
                  ? (thumbnailCandidate as File)
                  : null;
              const imageUrl =
                imageObj?.url ||
                (typeof post.case_thumbnail === "string"
                  ? post.case_thumbnail
                  : typeof post.portfolioimagedetail === "string"
                    ? post.portfolioimagedetail
                    : null);

              const projectTag =
                post.project_tag ||
                (Array.isArray(post.category) ? post.category[0] : post.category) ||
                "Recent werk";

              const projectTitle =
                post.project_title ||
                post.title ||
                "Consistente Merktaal & Platform";

              const projectDesc =
                post.project_desc ||
                post.description ||
                "";

              const company = post.company || post.title || "Project";
              const isOdd = index % 2 !== 0;
              const numStr = String(index + 1).padStart(2, "0");

              return (
                <article
                  key={post.uid || `project-${index}`}
                  className="case-card grid grid-cols-1 md:grid-cols-12 w-full gap-10 md:gap-10"
                >
                  {/* Afbeelding kolom */}
                  <div
                    className={`case-img col-span-1 md:col-span-7 lg:col-span-7 rounded-md overflow-hidden bg-background-200 dark:bg-background-900 -mx-5 sm:mx-0 relative z-10 ${isOdd ? "md:order-2 lg:order-2" : "md:order-1 lg:order-1"
                      }`}
                  >
                    <Link
                      href={postUrl}
                      className="block h-full w-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent7-800 dark:focus-visible:ring-accent8-800"
                    >
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={post.alt_text || `Case study: ${company}`}
                          width={730}
                          height={440}
                          quality={90}
                          loading="lazy"
                          className="rounded-md w-full h-[220px] sm:h-[325px] md:h-[240px] lg:h-[400px] xl:h-[440px] object-cover group-hover:scale-[1.02] transition-transform duration-500 border border-border-100 dark:border-border-200"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 730px"
                          {...(imageObj?.$?.url || post?.$?.case_thumbnail || post?.$?.featured_image)}
                        />
                      )}
                    </Link>
                  </div>

                  {/* Content kolom */}
                  <div
                    className={`col-span-1 md:col-span-5 lg:col-span-5 flex flex-col justify-center ${isOdd
                        ? "md:order-1 lg:order-1 md:pr-10 xl:pr-16"
                        : "md:order-2 lg:order-2 md:pl-10 xl:pl-16"
                      }`}
                  >
                    <div className="flex flex-col gap-y-5 md:gap-y-6">
                      {/* Genummerd label via UI component */}
                      <div className="case-label">
                        <Label
                          id={`case-label-${index}`}
                          cslp={post?.$ && (post?.$.project_tag || post?.$.category)}
                        >
                          {`${numStr} — ${projectTag}`}
                        </Label>
                      </div>

                      {/* Titel */}
                      <div className="-mt-2">
                        <h5
                          className="case-title text-title_5M sm:text-title_5 text-title-100 dark:text-title-200 font-medium text-balance md:text-balance"
                          {...(post?.$ && (post?.$.project_title || post?.$.title))}
                        >
                          <Link
                            href={postUrl}
                            className="hover:text-accent7-900 dark:hover:text-accent8-900 transition-colors"
                          >
                            {projectTitle}
                          </Link>
                        </h5>
                      </div>

                      {/* Omschrijving */}
                      {projectDesc && (
                        <div>
                          <p
                            className="case-desc text-smallM sm:text-medium text-content-300 dark:text-content-200 font-medium text-pretty md:text-balance line-clamp-3"
                            {...(post?.$ && (post?.$.project_desc || post?.$.description))}
                          >
                            {projectDesc}
                          </p>
                        </div>
                      )}

                      {/* Button */}
                      <div className="case-btn w-fit">
                        <Button
                          href={postUrl}
                          size="sm"
                          aria-label={`Lees de volledige case van ${company}`}
                          cslp={post?.$ && post?.$.url}
                        >
                          Bekijk project
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="w-full py-10 flex justify-center">
              <span className="text-content-100 dark:text-content-200 font-content text-smallM italic">
                Geen projecten gevonden.
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
