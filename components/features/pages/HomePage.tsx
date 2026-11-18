import { Fragment } from "react";
import type { Homepage } from "@/lib/types";
import { extractHomepageShowcaseItems } from "@/lib/cms";
import { VB_EmptyBlockParentClass } from "@contentstack/live-preview-utils";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { ProjectShowcase } from "@/components/features/portfolio";

interface HomePageProps {
  page: Homepage | undefined;
}

/**
 * Dedicated Homepage layout.
 * Unlike standard subpages, the homepage starts cleanly with modular blocks
 * (e.g. Hero, GridSection, FeaturedProjects) without the subpage banner or breadcrumbs.
 */
export default function HomePage({ page }: HomePageProps) {
  const blocks = page?.blocks || [];
  const showcaseItems = extractHomepageShowcaseItems(page);

  return (
    <section className="homepage-content w-full">
      <div
        className={`w-full ${blocks.length === 0
          ? VB_EmptyBlockParentClass
          : ""
          }`}
        {...(page?.$ && page?.$.blocks)}
      >
        {blocks.map((item, index) => {
          const blockData = Object.values(item)[0] as { _metadata?: { uid: string } } | undefined;
          const blockKey = blockData?._metadata?.uid || `home-block-${index}`;

          return (
            <Fragment key={blockKey}>
              <BlockRenderer
                block={item}
                index={index}
                pagePreviewAttr={page?.$}
              />
              {index === 0 && showcaseItems.length > 0 && (
                <div className="w-full px-6 sm:px-14 md:px-20 xl:px-14 py-14 md:py-24">
                  <div className="mx-auto w-full sm:max-w-xl md:max-w-3xl lg:max-w-7xl">
                    <ProjectShowcase
                      items={showcaseItems}
                      variant="surface"
                      ariaLabel="Uitgelichte projecten showcase"
                    />
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
