import type { ReactNode } from "react";
import type { Blocks, CSLPAttribute, CSLPContainer } from "@/lib/types";
import {
  CardSection,
  ContentBlock,
  CtaBlock,
  ExperienceTimelineBlock,
  FeaturedProjectsBlock,
  GridSection,
  HeroBlock,
  NumberedSection,
  ResumeSection,
  ServiceCardBlock,
} from "./items";

interface BlockRendererProps {
  block: Blocks;
  index: number;
  pagePreviewAttr?: CSLPContainer;
}

function renderModularBlock(
  block: Blocks,
  previewAttr?: CSLPAttribute
): ReactNode {
  for (const key of Object.keys(block)) {
    switch (key) {
      case "hero":
      case "hero_block":
      case "hero_section":
      case "Hero":
      case "heroBlock": {
        const data = block[key];
        if (data) return <HeroBlock data={data} previewAttr={previewAttr} />;
        break;
      }
      case "featured_projects": {
        if (block.featured_projects) {
          return (
            <FeaturedProjectsBlock
              data={block.featured_projects}
              previewAttr={previewAttr}
            />
          );
        }
        break;
      }
      case "service_card": {
        if (block.service_card) {
          return (
            <ServiceCardBlock
              data={block.service_card}
              previewAttr={previewAttr}
            />
          );
        }
        break;
      }
      case "block": {
        if (block.block) {
          return <ContentBlock data={block.block} previewAttr={previewAttr} />;
        }
        break;
      }
      case "cta_resume":
      case "CTA_Resume":
      case "c_t_a_resume":
      case "CtaBlock": {
        const data = block[key];
        if (data) return <CtaBlock data={data} previewAttr={previewAttr} />;
        break;
      }
      case "resume_section":
      case "grid_section_resume":
      case "resume_grid_section":
      case "Resume_Section":
      case "ResumeSection":
      case "resumeSection": {
        const data = block[key];
        if (data) return <ResumeSection data={data} previewAttr={previewAttr} />;
        break;
      }
      case "experience_timeline": {
        if (block.experience_timeline) {
          return (
            <ExperienceTimelineBlock
              data={block.experience_timeline}
              previewAttr={previewAttr}
            />
          );
        }
        break;
      }
      case "grid_section": {
        if (block.grid_section) {
          return (
            <GridSection data={block.grid_section} previewAttr={previewAttr} />
          );
        }
        break;
      }
      case "card_section":
      case "Card_Section":
      case "cardSection":
      case "CardSection": {
        const data = block[key];
        if (data) return <CardSection data={data} previewAttr={previewAttr} />;
        break;
      }
      case "numbered_section":
      case "numbered_list": {
        const data = block[key];
        if (data) {
          return <NumberedSection data={data} previewAttr={previewAttr} />;
        }
        break;
      }
      default:
        break;
    }
  }

  return null;
}

/**
 * BlockRenderer delegates each Contentstack modular block key to its typed React component.
 */
export default function BlockRenderer({
  block,
  index,
  pagePreviewAttr,
}: BlockRendererProps) {
  const blockPreviewAttr = pagePreviewAttr?.[`blocks__${index}`];
  return renderModularBlock(block, blockPreviewAttr);
}
