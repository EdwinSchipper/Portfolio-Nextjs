import type { ComponentType } from "react";
import type { CSLPAttribute } from "@/lib/types";
import CardSection from "./CardSection";
import ContentBlock from "./ContentBlock";
import CtaBlock from "./CtaBlock";
import ExperienceTimelineBlock from "./ExperienceTimelineBlock";
import FeaturedProjectsBlock from "./FeaturedProjectsBlock";
import GridSection from "./GridSection";
import NumberedSection from "./NumberedSection";
import ResumeSection from "./ResumeSection";
import ServiceCardBlock from "./ServiceCardBlock";
import HeroBlock from "./HeroBlock";

export {
  CardSection,
  ContentBlock,
  CtaBlock,
  ExperienceTimelineBlock,
  FeaturedProjectsBlock,
  GridSection,
  NumberedSection,
  ResumeSection,
  ServiceCardBlock,
  HeroBlock,
};

/**
 * Component Registry: Koppelt Contentstack modular block UIDs aan hun React component.
 * Nieuw blok toevoegen? Alleen hier registreren, BlockRenderer pakt hem automatisch op!
 */
export const BLOCK_COMPONENTS: Record<
  string,
  ComponentType<{ data: never; previewAttr?: CSLPAttribute }>
> = {
  hero: HeroBlock,
  hero_block: HeroBlock,
  hero_section: HeroBlock,
  Hero: HeroBlock,
  heroBlock: HeroBlock,
  featured_projects: FeaturedProjectsBlock,
  service_card: ServiceCardBlock,
  block: ContentBlock,
  cta_resume: CtaBlock,
  CTA_Resume: CtaBlock,
  c_t_a_resume: CtaBlock,
  CtaBlock: CtaBlock,
  resume_section: ResumeSection,
  grid_section_resume: ResumeSection,
  resume_grid_section: ResumeSection,
  Resume_Section: ResumeSection,
  resumeSection: ResumeSection,
  experience_timeline: ExperienceTimelineBlock,
  grid_section: GridSection,
  card_section: CardSection,
  Card_Section: CardSection,
  cardSection: CardSection,
  CardSection: CardSection,
  numbered_section: NumberedSection,
  numbered_list: NumberedSection,
};
