/**
 * Core Contentstack & Live Preview Types
 */

export interface PublishDetails {
  environment: string;
  locale: string;
  time: string;
  user: string;
}

export interface CSLPAttribute {
  "data-cslp"?: string;
  "data-cslp-parent-field"?: string;
}
export type CSLPFieldMapping = CSLPAttribute;

/**
 * Universal container for Contentstack Live Preview ($) mappings.
 * Allows type-safe access to any field mapping without repetitive manual declarations.
 */
export type CSLPContainer<T = Record<string, any>> = {
  [K in keyof T]?: CSLPFieldMapping;
} & Record<string, CSLPFieldMapping | any>;

export interface Link {
  title: string;
  href: string;
}

export interface Taxonomy {
  taxonomy_uid: string;
  max_terms?: number;
  mandatory: boolean;
  non_localizable: boolean;
}

export interface File {
  uid: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
  content_type?: string;
  file_size?: string;
  tags?: string[];
  filename?: string;
  url: string;
  ACL?: any[] | object;
  is_dir?: boolean;
  parent_uid?: string;
  _version?: number;
  title?: string;
  _metadata?: object;
  description?: string;
  dimension?: {
    height: number;
    width: number;
  };
  publish_details?: PublishDetails;
  $?: CSLPContainer;
}

export interface SeoFields {
  meta_title?: string;
  meta_description?: string;
  og_image?: File | null;
  no_index?: boolean;
}

export interface SystemFields {
  uid?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
  _content_type_uid?: string;
  tags?: string[];
  ACL?: any[];
  _version?: number;
  _in_progress?: boolean;
  locale?: string;
  publish_details?: PublishDetails;
  title?: string;
}

/**
 * Base shape for any Contentstack block, modular item, or sub-component.
 */
export interface BaseEntity {
  _version?: number;
  _metadata?: { uid: string };
  $?: CSLPContainer;
  [key: string]: any;
}

/**
 * Common layout and header fields shared across major section blocks.
 */
export interface BaseSectionBlock extends BaseEntity {
  width?: string;
  container_width?: string; /** "small" | "Default" | "Large" | "Wide" */
  color_mode?: "Default" | "Alt" | "default" | "alt" | string;
  label?: string;
  section_label?: string;
  section_title?: string;
  title?: string;
  section_intro?: string;
  intro?: string;
}
