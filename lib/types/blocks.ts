import type { BaseEntity, BaseSectionBlock, CSLPContainer, File, Link, SystemFields } from "./core";
import type { PortfolioItem } from "./pages";

/**
 * Experience & Timeline Models
 */

export interface ExperienceRole extends BaseEntity {
  title?: string;
  period?: string;
  role_type?: "core" | "secondary" | string;
  roleType?: string;
  badge?: string;
  description?: string;
}
export type TimelineRole = ExperienceRole;

export interface ExperienceCompany extends BaseEntity {
  company?: string;
  company_name?: string;
  company_period?: string;
  website?: string | Link;
  roles?: ExperienceRole[];
  Roles?: ExperienceRole[];
}
export type TimelineCompany = ExperienceCompany;

export interface ExperienceTimelineBlock extends BaseEntity {
  section_title?: string;
  companies?: ExperienceCompany[];
  experience_timeline?: ExperienceCompany[] | { companies?: ExperienceCompany[]; $?: CSLPContainer };
}

export interface ResumeStack extends BaseEntity {
  stack_label?: string;
  stackLabel?: string;
  stack_title?: string;
  stackTitle?: string;
  label?: string;
  title?: string;
  tag?: string[];
  tags?: string[];
  Tag?: string[];
  Tags?: string[];
}

export interface CertificationItem extends BaseEntity {
  title?: string;
  year?: string;
  date?: string;
  platform?: string;
  institution?: string;
  location?: string;
}

export type ResumeStackData =
  | ResumeStack
  | {
      tag?: string | string[] | Array<{ text?: string; title?: string; name?: string }>;
      Tag?: string | string[] | Array<{ text?: string; title?: string; name?: string }>;
      tags?: string | string[] | Array<{ text?: string; title?: string; name?: string }>;
      Tags?: string | string[] | Array<{ text?: string; title?: string; name?: string }>;
      stack_tags?: string | string[] | Array<{ text?: string; title?: string; name?: string }>;
      stackTags?: string | string[] | Array<{ text?: string; title?: string; name?: string }>;
      items?: string | string[] | Array<{ text?: string; title?: string; name?: string }>;
      stack_label?: string;
      stackLabel?: string;
      stack_title?: string;
      stackTitle?: string;
      label?: string;
      title?: string;
      $?: CSLPContainer;
    }
  | string[]
  | string;

export interface ResumeSectionBlock extends BaseSectionBlock {
  left_col_span?: number | string;
  left_col?: number | string;
  leftCol?: number | string;
  right_col_span?: number | string;
  right_col?: number | string;
  rightCol?: number | string;
  timeline_position?: "right" | "left" | "full" | "Right" | "Left" | "Full" | "rechts" | "links" | string;
  timeline_placement?: string;
  section_title_main?: string;
  description?: string;
  text?: string;
  intro?: string;
  section_label?: string;
  button?: Link;
  button_cta?: Link;
  companies?: ExperienceCompany[];
  Companies?: ExperienceCompany[];
  stack_label?: string;
  stackLabel?: string;
  Stack_label?: string;
  stack_title?: string;
  stackTitle?: string;
  Stack_title?: string;
  stack?: ResumeStackData;
  Stack?: ResumeStackData;
  education_label?: string;
  Education_label?: string;
  education_title?: string;
  Education_title?: string;
  certifications_label?: string;
  Certifications_label?: string;
  certifications_title?: string;
  Certifications_title?: string;
  certifications?: CertificationItem[];
  Certifications?: CertificationItem[];
  education?: CertificationItem[];
  Education?: CertificationItem[];
}

/**
 * Modular Blocks & Content Components
 */

export interface Block extends BaseEntity {
  title?: string;
  copy?: string;
  image?: File | null;
  layout?: ("image_left" | "image_right") | null;
}

export interface CtaBlock extends BaseEntity {
  title?: string;
  label?: string;
  text_cta?: string;
  description?: string;
  text?: string;
  image?: File | null;
  image_light?: File | null;
  image_dark?: File | null;
  image_dark_mode?: File | null;
  image_alt?: string;
  button_cta?: Link;
  button_to?: string;
  button_text?: string;
  to?: string;
}

export interface ServiceCardBlock extends BaseEntity {
  card_title?: string;
  card_text?: string;
  grid_size?: "1" | "2" | "3" | string;
  card_variant?: "Default" | "Image Tag" | string;
  variant?: string;
  image?: File;
}

export interface FeaturedProjectsBlock extends BaseSectionBlock {
  label_projects?: string;
  label?: string;
  title?: string;
  intro?: string;
  projects?: PortfolioItem[];
}

/**
 * Shared Item Models (Cards, Numbered Items, Links, Socials)
 */

export interface SectionItem extends BaseEntity {
  number?: string;
  icon?: string;
  image?: File;
  card_title?: string;
  title?: string;
  tag?: string;
  text?: string;
  description?: string;
  button?: Link;
  card_variant?: "Default" | "Image Tag" | string;
}
export type CardSectionItem = SectionItem;
export type NumberedItem = SectionItem;
export type GridCard = SectionItem;

export interface SocialLink extends BaseEntity {
  icon?: string;
  link?: string | Link;
  title?: string;
  label?: string;
}

export interface GridSocials extends BaseEntity {
  label?: string;
  links?: SocialLink[];
  items?: SocialLink[];
}

export interface CardSectionBlock extends BaseSectionBlock {
  columns?: "1" | "2" | "3" | "4" | string;
  label_cards?: string;
  cards?: CardSectionItem[];
}

export interface NumberedSectionBlock extends BaseSectionBlock {
  columns?: "1" | "2" | "3" | "4" | string;
  label_numbered?: string;
  items?: NumberedItem[];
  numbered_items?: NumberedItem[];
}

/**
 * Grid Section Models
 */

/** Nested column group for Grid Section (content_left / content_right) */
export interface GridSectionColumn extends BaseEntity {
  label_left?: string;
  label_right?: string;
  title_h1?: string;
  title_h1r?: string;
  heading_type?: string;
  quote_left?: string;
  quote_right?: string;
  text_left?: string;
  text_right?: string;
  text_right_extended?: string;
  image_left?: File;
  image_right?: File;
  button_left?: Link;
  button_right?: Link;
  cards?: GridCard[];
  resume_timeline?: ExperienceCompany[] | { companies?: ExperienceCompany[]; $?: CSLPContainer };
  timeline?: ExperienceCompany[] | { companies?: ExperienceCompany[]; $?: CSLPContainer };
  career_timeline?: ExperienceCompany[] | { companies?: ExperienceCompany[]; $?: CSLPContainer };
  socials?: GridSocials | SocialLink[];
  social_links?: GridSocials | SocialLink[];
  connect?: GridSocials | SocialLink[];
}

/** Grid Section modular block */
export interface GridSectionBlock extends BaseSectionBlock {
  left_col_span?: number | string;
  right_col_span?: number | string;
  content_left?: GridSectionColumn;
  content_right?: GridSectionColumn;
}

/**
 * Hero Block Models
 */

export interface HeroMicroLink extends BaseEntity {
  title?: string;
  label?: string;
  to?: string;
  href?: string;
  link?: string | Link;
  external?: boolean;
  title_attr?: string;
}

export interface HeroBlock extends BaseEntity {
  label?: string;
  title?: string;
  text?: string;
  description?: string;
  micro_links?: HeroMicroLink[];
  stats?: HeroMicroLink[];
  cta_button?: Link;
  button?: Link;
  cta_note?: string;
  is_available?: boolean;
  background_video?: File;
  video?: File;
  background_image?: File;
  fallback_image?: File;
  image_1?: File;
  image_ux?: File;
  image_2?: File;
  image_vormgeving?: File;
  image_3?: File;
  image_development?: File;
}

/**
 * Modular Blocks Container
 */

export interface Blocks extends SystemFields {
  hero?: HeroBlock;
  hero_block?: HeroBlock;
  Hero?: HeroBlock;
  hero_section?: HeroBlock;
  block?: Block;
  service_card?: ServiceCardBlock;
  featured_projects?: FeaturedProjectsBlock;
  experience_timeline?: ExperienceTimelineBlock;
  resume_section?: ResumeSectionBlock;
  Resume_Section?: ResumeSectionBlock;
  ResumeSection?: ResumeSectionBlock;
  grid_section_resume?: ResumeSectionBlock;
  resume_grid_section?: ResumeSectionBlock;
  grid_section?: GridSectionBlock;
  card_section?: CardSectionBlock;
  Card_Section?: CardSectionBlock;
  cardSection?: CardSectionBlock;
  CardSection?: CardSectionBlock;
  numbered_section?: NumberedSectionBlock;
  numbered_list?: NumberedSectionBlock;
  cta_resume?: CtaBlock;
  CTA_Resume?: CtaBlock;
  CtaBlock?: CtaBlock;
}
