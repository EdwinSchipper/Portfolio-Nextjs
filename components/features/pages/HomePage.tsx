import { Homepage } from "@/lib/types";
import { VB_EmptyBlockParentClass } from "@contentstack/live-preview-utils";
import BlockRenderer from "@/components/blocks/BlockRenderer";

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

  return (
    <section className="homepage-content w-full">

      {/* Container for modular blocks with Contentstack Visual Builder support*/}
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
            <BlockRenderer
              key={blockKey}
              block={item}
              index={index}
              pagePreviewAttr={page?.$}
            />
          );
        })}
      </div>
    </section>
  );
}
