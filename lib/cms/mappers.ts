import type {
  CSLPAttribute,
  CSLPContainer,
  CertificationItem,
  CtaBlock,
  ExperienceCompany,
  ExperienceTimelineBlock,
  File,
  Link,
  PortfolioItem,
  ProjectShowcaseBlock,
  ProjectShowcaseTabItem,
  ResumeSectionBlock,
  StatItem,
  StatsBlock,
} from "../types";

export interface NormalizedProjectShowcaseItem {
  id: string;
  tabTitle: string;
  tabDescription: string;
  imageUrl: string | null;
  imageAlt: string;
  badgeLabel?: string;
  href?: string;
  linkLabel?: string;
  imageCslp?: CSLPAttribute;
  titleCslp?: CSLPAttribute;
  descriptionCslp?: CSLPAttribute;
  badgeCslp?: CSLPAttribute;
  linkCslp?: CSLPAttribute;
}

export interface NormalizedProjectShowcaseBlock {
  rawWidth?: string;
  colorModeKey?: string;
  label?: string;
  title?: string;
  intro?: string;
  linkHref?: string;
  linkLabel?: string;
  labelCslp?: CSLPAttribute;
  titleCslp?: CSLPAttribute;
  introCslp?: CSLPAttribute;
  linkCslp?: CSLPAttribute;
  items: NormalizedProjectShowcaseItem[];
  itemsCslp?: CSLPAttribute;
}

export interface NormalizedStatItem {
  id: string;
  label: string;
  value: string;
  labelCslp?: CSLPAttribute;
  valueCslp?: CSLPAttribute;
}

export interface StatsNormalizationOptions {
  width?: string;
  colorMode?: string;
}

export interface NormalizedStatsBlock {
  rawWidth?: string;
  colorModeKey?: string;
  label?: string;
  heading?: string;
  headingTag?: string;
  intro?: string;
  labelCslp?: CSLPAttribute;
  headingCslp?: CSLPAttribute;
  introCslp?: CSLPAttribute;
  items: NormalizedStatItem[];
  itemsCslp?: CSLPAttribute;
}

export interface NormalizedFeaturedProject {
  key: string;
  url: string;
  imageUrl: string | null;
  imageAlt: string;
  imageCslp?: CSLPAttribute;
  tag: string;
  title: string;
  description: string;
  company: string;
  numberLabel: string;
  isOdd: boolean;
  cslp?: CSLPContainer;
}

export interface NormalizedCtaBlock {
  label?: string;
  title?: string;
  description?: string;
  buttonHref?: string;
  buttonText: string;
  imageLight?: File | null;
  imageDark?: File | null;
  imageAlt: string;
  meta?: CSLPContainer;
}

export interface ResumeNormalizationOptions {
  width?: string;
  colorMode?: string;
  leftColSpan?: number | string;
  rightColSpan?: number | string;
  timelinePosition?: string;
}

export interface NormalizedResumeSection {
  rawWidth?: string;
  colorModeKey?: string;
  isTimelineLeft: boolean;
  isFullWidth: boolean;
  leftColSpan?: number | string;
  rightColSpan?: number | string;
  label?: string;
  title?: string;
  description?: string;
  buttonHref?: string;
  buttonTitle?: string;
  timelineSubtitle?: string;
  companies: ExperienceCompany[];
  tags: string[];
  hasStack: boolean;
  stackLabel?: string;
  stackLabelCslp?: CSLPAttribute;
  stackTitle?: string;
  stackTitleCslp?: CSLPAttribute;
  certifications: CertificationItem[];
  hasCertifications: boolean;
  educationLabel: string;
  educationTitle: string;
  meta?: CSLPContainer;
}

type WrappedResumeSection = ResumeSectionBlock & {
  resume_section?: ResumeSectionBlock;
  Resume_Section?: ResumeSectionBlock;
  ResumeSection?: ResumeSectionBlock;
  grid_section_resume?: ResumeSectionBlock;
  experience_timeline?: ResumeSectionBlock;
};

const STAT_LABEL_CSLP_KEYS = ["label", "stat_label", "title"] as const;
const STAT_VALUE_CSLP_KEYS = ["value", "stat_value", "number"] as const;
const SECTION_LABEL_CSLP_KEYS = ["label", "section_label"] as const;
const SECTION_HEADING_CSLP_KEYS = ["section_title", "title"] as const;
const SECTION_INTRO_CSLP_KEYS = ["section_intro", "intro", "description", "text"] as const;
const SECTION_STATS_CSLP_KEYS = ["stats", "items"] as const;
const STACK_LABEL_CSLP_KEYS = ["stack_label", "Stack_label", "stackLabel", "label"] as const;
const SECTION_STACK_LABEL_CSLP_KEYS = ["stack_label", "stack.stack_label"] as const;
const STACK_TITLE_CSLP_KEYS = ["stack_title", "Stack_title", "stackTitle", "title"] as const;
const SECTION_STACK_TITLE_CSLP_KEYS = ["stack_title", "stack.stack_title"] as const;
const FULL_POSITION_VALUES = new Set(["full", "center", "full width", "volledig"]);
const LEFT_POSITION_VALUES = new Set(["left", "links"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toArray<T>(value?: T | T[] | null): T[] {
  if (Array.isArray(value)) {
    return value;
  }
  return value ? [value] : [];
}

function pickFirstString(...candidates: unknown[]): string | undefined {
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate;
    }
  }
  return undefined;
}

function normalizeCmsHref(href?: string): string | undefined {
  if (!href) return undefined;
  const trimmed = href.trim();
  if (!trimmed) return undefined;
  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:")
  ) {
    return trimmed;
  }
  return `/${trimmed}`;
}

function pickFirstGridSpan(...candidates: Array<number | string | undefined>): number | string | undefined {
  for (const candidate of candidates) {
    if (typeof candidate === "number" && !Number.isNaN(candidate)) {
      return candidate;
    }
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate;
    }
  }
  return undefined;
}

function pickFirstCslp(
  container: CSLPContainer | undefined,
  keys: readonly string[]
): CSLPAttribute | undefined {
  if (!container) {
    return undefined;
  }

  for (const key of keys) {
    const mapping = container[key];
    if (mapping) {
      return mapping;
    }
  }

  return undefined;
}

/**
 * Safely extracts an image URL from either a Contentstack File object or string URL.
 */
export function resolveAssetUrl(asset?: File | string | null): string | null {
  if (!asset) return null;
  if (typeof asset === "string") return asset || null;
  if (typeof asset === "object" && asset.url) return asset.url;
  return null;
}

/**
 * Returns the first available image URL across a prioritized list of Contentstack asset candidates.
 */
export function resolveFirstAssetUrl(
  ...assets: Array<File | string | null | undefined>
): string | null {
  for (const asset of assets) {
    const url = resolveAssetUrl(asset);
    if (url) return url;
  }
  return null;
}

/**
 * Extracts a single Live Preview CSLP attribute for an asset field without spreading a container object.
 */
export function resolveAssetCslp(
  asset?: File | string | null,
  fallbackCslp?: CSLPAttribute
): CSLPAttribute | undefined {
  if (fallbackCslp) return fallbackCslp;
  if (typeof asset === "object" && asset !== null && asset.$) {
    return asset.$.url;
  }
  return undefined;
}

/**
 * Normalizes a Contentstack portfolio entry into render-ready view fields for FeaturedProjectsBlock.
 */
export function normalizeFeaturedProject(
  post: PortfolioItem,
  index: number
): NormalizedFeaturedProject {
  const url = post.url || `/portfolio/${post.uid || post.id || index}`;
  const thumbnailAsset =
    post.case_thumbnail || post.featured_image || post.portfolioimagedetail;

  const imageUrl = resolveFirstAssetUrl(
    post.case_thumbnail,
    post.featured_image,
    post.portfolioimagedetail
  );

  const imageCslp =
    resolveAssetCslp(thumbnailAsset) ||
    post.$?.case_thumbnail ||
    post.$?.featured_image;

  const categoryValue = Array.isArray(post.category) ? post.category[0] : post.category;
  const tag =
    pickFirstString(post.project_tag, categoryValue) || "Recent werk";
  const title =
    pickFirstString(post.project_title, post.title) || "Consistente Merktaal & Platform";
  const description = pickFirstString(post.project_desc, post.description) || "";
  const company = pickFirstString(post.company, post.title) || "Project";

  return {
    key: post.uid || `project-${index}`,
    url,
    imageUrl,
    imageAlt: post.alt_text || company,
    imageCslp,
    tag,
    title,
    description,
    company,
    numberLabel: String(index + 1).padStart(2, "0"),
    isOdd: index % 2 !== 0,
    cslp: post.$,
  };
}

function resolveShowcaseLink(
  link: Link | undefined,
  fallbackLabel: string,
  containerCslp?: CSLPAttribute
): { href?: string; label?: string; cslp?: CSLPAttribute } {
  const href = normalizeCmsHref(pickFirstString(link?.href, link?.url));
  const label =
    pickFirstString(link?.title, link?.text) ||
    (href ? fallbackLabel : undefined);
  const cslp = link?.$?.title ?? link?.$?.href ?? containerCslp;

  return { href, label, cslp };
}

function mapShowcaseTab(
  tab: ProjectShowcaseTabItem,
  index: number
): NormalizedProjectShowcaseItem {
  const tabTitle = pickFirstString(tab.tab_title) || `Onderdeel ${index + 1}`;
  const { href, label: linkLabel, cslp: linkCslp } = resolveShowcaseLink(
    tab.link,
    "Lees verder",
    tab.$?.link
  );

  return {
    id: tab._metadata?.uid || `showcase-tab-${index}`,
    tabTitle,
    tabDescription: pickFirstString(tab.tab_description) || "",
    imageUrl: resolveAssetUrl(tab.image),
    imageAlt:
      pickFirstString(tab.image_alt, tab.image?.title, tabTitle) ||
      "Showcase afbeelding",
    badgeLabel: pickFirstString(tab.badge_label),
    href,
    linkLabel,
    imageCslp: resolveAssetCslp(tab.image, tab.$?.image),
    titleCslp: tab.$?.tab_title,
    descriptionCslp: tab.$?.tab_description,
    badgeCslp: tab.$?.badge_label,
    linkCslp,
  };
}

/**
 * Normalizes a Contentstack `project_showcase` modular block into strict presentation contracts.
 */
export function normalizeProjectShowcaseBlock(
  data?: ProjectShowcaseBlock,
  options: { width?: string; colorMode?: string } = {}
): NormalizedProjectShowcaseBlock | null {
  if (!data) return null;

  const tabs = toArray<ProjectShowcaseTabItem>(data.tabs);
  const {
    href: linkHref,
    label: linkLabel,
    cslp: linkCslp,
  } = resolveShowcaseLink(data.link, "Lees meer", data.$?.link);

  return {
    rawWidth: pickFirstString(options.width, data.width, data.container_width),
    colorModeKey: pickFirstString(options.colorMode, data.color_mode),
    label: pickFirstString(data.label, data.section_label),
    title: pickFirstString(data.section_title, data.title),
    intro: pickFirstString(data.section_intro, data.intro),
    linkHref,
    linkLabel,
    labelCslp: data.$ && (data.$.label || data.$.section_label),
    titleCslp: data.$ && (data.$.section_title || data.$.title),
    introCslp: data.$ && (data.$.section_intro || data.$.intro),
    linkCslp,
    items: tabs.map(mapShowcaseTab),
    itemsCslp: data.$?.tabs,
  };
}

function mapStatItem(stat: StatItem, index: number): NormalizedStatItem {
  return {
    id: stat._metadata?.uid || `stat-item-${index}`,
    label: pickFirstString(stat.label, stat.stat_label, stat.title) || "",
    value: pickFirstString(stat.value, stat.stat_value, stat.number) || "",
    labelCslp: pickFirstCslp(stat.$, STAT_LABEL_CSLP_KEYS),
    valueCslp: pickFirstCslp(stat.$, STAT_VALUE_CSLP_KEYS),
  };
}

/**
 * Normalizes a Contentstack `stats` modular block into strict presentation contracts.
 */
export function normalizeStatsBlock(
  data?: StatsBlock,
  options: StatsNormalizationOptions = {}
): NormalizedStatsBlock | null {
  if (!data) return null;

  const rawStats = data.stats ?? data.items;
  const items = toArray<StatItem>(rawStats)
    .map(mapStatItem)
    .filter((item) => Boolean(item.label || item.value));

  return {
    rawWidth: pickFirstString(options.width, data.width, data.container_width),
    colorModeKey: pickFirstString(options.colorMode, data.color_mode),
    label: pickFirstString(data.label, data.section_label),
    heading: pickFirstString(data.section_title, data.title),
    headingTag: pickFirstString(data.heading_type),
    intro: pickFirstString(data.section_intro, data.intro, data.description, data.text),
    labelCslp: pickFirstCslp(data.$, SECTION_LABEL_CSLP_KEYS),
    headingCslp: pickFirstCslp(data.$, SECTION_HEADING_CSLP_KEYS),
    introCslp: pickFirstCslp(data.$, SECTION_INTRO_CSLP_KEYS),
    items,
    itemsCslp: pickFirstCslp(data.$, SECTION_STATS_CSLP_KEYS),
  };
}

/**
 * Normalizes a Contentstack CTA_Resume modular block across field aliases.
 */
export function normalizeCtaBlock(data: CtaBlock): NormalizedCtaBlock {
  const imageLight = data.image || data.image_light;
  const imageDark = data.image_dark_mode || data.image_dark;

  return {
    label: data.label,
    title: data.title,
    description: pickFirstString(data.description, data.text_cta, data.text),
    buttonHref: pickFirstString(data.button_cta?.href, data.button_to, data.to),
    buttonText:
      pickFirstString(data.button_cta?.title, data.button_text) || "Bekijk CV",
    imageLight,
    imageDark,
    imageAlt:
      pickFirstString(
        data.image_alt,
        imageLight?.title,
        imageDark?.title,
        data.title
      ) || "CTA image",
    meta: data.$,
  };
}

/**
 * Extracts tech stack tag strings from Contentstack stack payloads, nested objects, or repeatable groups.
 */
export function extractStackTags(stackData: unknown): string[] {
  if (!stackData) return [];
  const results: string[] = [];

  const addTag = (value: unknown) => {
    if (value === null || value === undefined) return;

    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed) results.push(trimmed);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(addTag);
      return;
    }

    if (isRecord(value)) {
      const nestedTag =
        value.tag ?? value.Tag ?? value.name ?? value.value ?? value.text ?? value.title;
      if (nestedTag !== undefined) {
        addTag(nestedTag);
      }
    }
  };

  if (Array.isArray(stackData) || typeof stackData === "string") {
    addTag(stackData);
    return results;
  }

  if (isRecord(stackData)) {
    const rawTags =
      stackData.tag ??
      stackData.Tag ??
      stackData.tags ??
      stackData.Tags ??
      stackData.stack_tags ??
      stackData.stackTags ??
      stackData.items;

    if (rawTags !== undefined) {
      addTag(rawTags);
    } else {
      Object.entries(stackData).forEach(([key, value]) => {
        const lowerKey = key.toLowerCase();
        if (
          !lowerKey.includes("label") &&
          !lowerKey.includes("title") &&
          !key.startsWith("_") &&
          key !== "$"
        ) {
          addTag(value);
        }
      });
    }
  }

  return results;
}

/**
 * Unwraps legacy ExperienceTimelineBlock shapes into a ResumeSectionBlock contract.
 */
export function normalizeExperienceTimeline(
  data: ExperienceTimelineBlock
): ResumeSectionBlock {
  if (data.companies || data.section_title) {
    return data;
  }

  const nestedTimeline = data.experience_timeline;
  if (Array.isArray(nestedTimeline)) {
    return { companies: nestedTimeline, $: data.$ };
  }

  return nestedTimeline || data;
}

/**
 * Normalizes ResumeSection payloads and field aliases into a clean presentation contract.
 */
export function normalizeResumeSection(
  data?: ResumeSectionBlock,
  options: ResumeNormalizationOptions = {}
): NormalizedResumeSection | null {
  if (!data) return null;

  const wrapped = data as WrappedResumeSection;
  const sectionData: ResumeSectionBlock =
    wrapped.resume_section ||
    wrapped.Resume_Section ||
    wrapped.ResumeSection ||
    wrapped.grid_section_resume ||
    wrapped.experience_timeline ||
    data;

  const rawWidth = pickFirstString(
    options.width,
    sectionData.container_width,
    sectionData.width
  );
  const colorModeKey = pickFirstString(options.colorMode, sectionData.color_mode);

  const normalizedPosition = (
    pickFirstString(
      options.timelinePosition,
      sectionData.timeline_position,
      sectionData.timeline_placement
    ) ?? ""
  )
    .trim()
    .toLowerCase();

  const isPositionFull = FULL_POSITION_VALUES.has(normalizedPosition);
  const isTimelineLeft = LEFT_POSITION_VALUES.has(normalizedPosition);

  const companies = toArray<ExperienceCompany>(
    sectionData.companies ?? sectionData.Companies
  );
  const certifications = toArray<CertificationItem>(
    sectionData.certifications ??
      sectionData.Certifications ??
      sectionData.education ??
      sectionData.Education
  );

  const rawStack = sectionData.stack ?? sectionData.Stack;
  const rawStackRecord = isRecord(rawStack)
    ? (rawStack as Record<string, unknown> & { $?: CSLPContainer })
    : undefined;
  const tags = extractStackTags(rawStack);

  const stackLabel = pickFirstString(
    rawStackRecord?.stack_label,
    rawStackRecord?.Stack_label,
    rawStackRecord?.stackLabel,
    rawStackRecord?.label,
    sectionData.stack_label,
    sectionData.Stack_label,
    sectionData.stackLabel
  );

  const stackLabelCslp =
    pickFirstCslp(rawStackRecord?.$, STACK_LABEL_CSLP_KEYS) ??
    pickFirstCslp(sectionData.$, SECTION_STACK_LABEL_CSLP_KEYS);

  const stackTitle = pickFirstString(
    rawStackRecord?.stack_title,
    rawStackRecord?.Stack_title,
    rawStackRecord?.stackTitle,
    rawStackRecord?.title,
    sectionData.stack_title,
    sectionData.Stack_title,
    sectionData.stackTitle
  );

  const stackTitleCslp =
    pickFirstCslp(rawStackRecord?.$, STACK_TITLE_CSLP_KEYS) ??
    pickFirstCslp(sectionData.$, SECTION_STACK_TITLE_CSLP_KEYS);

  const label = pickFirstString(sectionData.label, sectionData.section_label);
  const title = pickFirstString(sectionData.title, sectionData.section_title_main);
  const description = pickFirstString(
    sectionData.description,
    sectionData.text,
    sectionData.intro
  );

  const button = sectionData.button ?? sectionData.button_cta;
  const buttonHref = pickFirstString(button?.href, button?.url);
  const buttonTitle = pickFirstString(button?.title, button?.text);

  const educationLabel =
    pickFirstString(
      sectionData.education_label,
      sectionData.Education_label,
      sectionData.certifications_label,
      sectionData.Certifications_label
    ) || "02 — Opleiding";

  const educationTitle =
    pickFirstString(
      sectionData.education_title,
      sectionData.Education_title,
      sectionData.certifications_title,
      sectionData.Certifications_title
    ) || "Opleiding & Certificeringen";

  const hasIntroContent = Boolean(
    label || title || description || (buttonHref && buttonTitle)
  );

  const isFullWidth =
    isPositionFull ||
    (!normalizedPosition &&
      companies.length === 0 &&
      !sectionData.left_col_span &&
      !sectionData.right_col_span) ||
    !hasIntroContent;

  return {
    rawWidth,
    colorModeKey,
    isTimelineLeft,
    isFullWidth,
    leftColSpan: pickFirstGridSpan(
      options.leftColSpan,
      sectionData.left_col_span,
      sectionData.left_col,
      sectionData.leftCol
    ),
    rightColSpan: pickFirstGridSpan(
      options.rightColSpan,
      sectionData.right_col_span,
      sectionData.right_col,
      sectionData.rightCol
    ),
    label,
    title,
    description,
    buttonHref,
    buttonTitle,
    timelineSubtitle: sectionData.section_title,
    companies,
    tags,
    hasStack: tags.length > 0,
    stackLabel,
    stackLabelCslp,
    stackTitle,
    stackTitleCslp,
    certifications,
    hasCertifications: certifications.length > 0,
    educationLabel,
    educationTitle,
    meta: sectionData.$,
  };
}
