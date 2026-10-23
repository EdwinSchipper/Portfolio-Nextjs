import type { CSLPContainer, File, SeoFields, SystemFields } from "./core";
import type { Blocks } from "./blocks";

// ============================================================================
// Top-Level Pages & Portfolio Entries
// ============================================================================

export interface BasePageEntry extends SystemFields {
  uid: string;
  title: string;
  seo?: SeoFields;
  blocks?: Blocks[];
  $?: CSLPContainer;
  [key: string]: any;
}

export type Homepage = BasePageEntry;

export interface Page extends BasePageEntry {
  url?: string;
  description?: string;
  show_breadcrumbs?: boolean;
  breadcrumb_title?: string;
}

export interface TechStackItem {
  icon?: string;
  label: string;
  value: string;
  $?: CSLPContainer;
  [key: string]: any;
}

export interface PortfolioItem extends SystemFields {
  uid: string;
  title: string;
  seo?: SeoFields;
  url?: string;
  date?: string;
  company?: string;
  category?: string | string[];
  select?: string | string[];
  project_tag?: string;
  project_title?: string;
  project_desc?: string;
  case_thumbnail?: File | string | null;
  portfolioimagedetail?: File | string | null;
  banner_visual_1?: File | string | null;
  banner_visual_2?: File | string | null;
  portfolioimagedetail1?: File | string | null;
  portfolioimagedetail1_txt?: string;
  portfolioimagedetail2?: File | string | null;
  portfolioimagedetail2_txt?: string;
  portfolioimagedetail3?: File | string | null;
  portfolioimagedetail3_txt?: string;
  alt_text?: string;
  tech_stack?: TechStackItem[];
  featured_image?: File | null;
  description?: string;
  content?: string;
  show_breadcrumbs?: boolean;
  breadcrumb_title?: string;
  $?: CSLPContainer;
  [key: string]: any;
}
