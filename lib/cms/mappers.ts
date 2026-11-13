import type {
  CSLPAttribute,
  CSLPContainer,
  CertificationItem,
  CtaBlock,
  ExperienceCompany,
  ExperienceTimelineBlock,
  File,
  PortfolioItem,
  ResumeSectionBlock,
} from "../types";

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
    post.case_thumbnail ||
    post.featured_image ||
    post.portfolioimagedetail;

  const imageUrl = resolveFirstAssetUrl(
    post.case_thumbnail,
    post.featured_image,
    post.portfolioimagedetail
  );

  const imageCslp =
    resolveAssetCslp(thumbnailAsset) ||
    post?.$?.case_thumbnail ||
    post?.$?.featured_image;

  const tag =
    post.project_tag ||
    (Array.isArray(post.category) ? post.category[0] : post.category) ||
    "Recent werk";

  const title =
    post.project_title ||
    post.title ||
    "Consistente Merktaal & Platform";

  const description = post.project_desc || post.description || "";
  const company = post.company || post.title || "Project";

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

/**
 * Normalizes a Contentstack CTA_Resume modular block across field aliases.
 */
export function normalizeCtaBlock(data: CtaBlock): NormalizedCtaBlock {
  const imageLight = data.image || data.image_light;
  const imageDark = data.image_dark_mode || data.image_dark;

  return {
    label: data.label,
    title: data.title,
    description: data.description || data.text_cta || data.text,
    buttonHref: data.button_cta?.href || data.button_to || data.to,
    buttonText: data.button_cta?.title || data.button_text || "Bekijk CV",
    imageLight,
    imageDark,
    imageAlt:
      data.image_alt ||
      imageLight?.title ||
      imageDark?.title ||
      data.title ||
      "CTA image",
    meta: data.$,
  };
}

/**
 * Extracts tech stack tag strings from Contentstack stack payloads, nested objects, or repeatable groups.
 */
export function extractStackTags(stackData: unknown): string[] {
  if (!stackData) return [];
  const results: string[] = [];

  const addTag = (val: unknown) => {
    if (val === null || val === undefined) return;
    if (typeof val === "string") {
      const trimmed = val.trim();
      if (trimmed) results.push(trimmed);
    } else if (Array.isArray(val)) {
      val.forEach(addTag);
    } else if (typeof val === "object") {
      const record = val as Record<string, unknown>;
      const tagVal =
        record.tag ?? record.Tag ?? record.name ?? record.value ?? record.title;
      if (tagVal !== undefined) {
        addTag(tagVal);
      }
    }
  };

  if (Array.isArray(stackData)) {
    stackData.forEach(addTag);
  } else if (typeof stackData === "object") {
    const record = stackData as Record<string, unknown>;
    const rawTags =
      record.tag ??
      record.Tag ??
      record.tags ??
      record.Tags ??
      record.items;

    if (rawTags !== undefined) {
      addTag(rawTags);
    } else {
      Object.entries(record).forEach(([key, val]) => {
        const lowerKey = key.toLowerCase();
        if (
          !lowerKey.includes("label") &&
          !lowerKey.includes("title") &&
          !key.startsWith("_") &&
          key !== "$"
        ) {
          addTag(val);
        }
      });
    }
  } else if (typeof stackData === "string") {
    addTag(stackData);
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

  const rawWidth =
    options.width || sectionData.container_width || sectionData.width;
  const colorModeKey = options.colorMode || sectionData.color_mode;

  const rawPosition = (
    options.timelinePosition ||
    sectionData.timeline_position ||
    sectionData.timeline_placement ||
    ""
  )
    .trim()
    .toLowerCase();

  const isPositionFull =
    rawPosition === "full" ||
    rawPosition === "center" ||
    rawPosition === "full width" ||
    rawPosition === "volledig";

  const isTimelineLeft = rawPosition === "left" || rawPosition === "links";

  const rawCompanies = sectionData.companies || sectionData.Companies;
  const companies: ExperienceCompany[] = Array.isArray(rawCompanies)
    ? rawCompanies
    : rawCompanies
      ? [rawCompanies]
      : [];

  const rawStack = sectionData.stack || sectionData.Stack;
  const rawStackObj =
    typeof rawStack === "object" && rawStack !== null && !Array.isArray(rawStack)
      ? (rawStack as Record<string, unknown> & { $?: CSLPContainer })
      : undefined;
  const tags = extractStackTags(rawStack);

  const stackLabel =
    (typeof rawStackObj?.stack_label === "string"
      ? rawStackObj.stack_label
      : typeof rawStackObj?.Stack_label === "string"
        ? rawStackObj.Stack_label
        : typeof rawStackObj?.stackLabel === "string"
          ? rawStackObj.stackLabel
          : typeof rawStackObj?.label === "string"
            ? rawStackObj.label
            : undefined) ||
    sectionData.stack_label ||
    sectionData.Stack_label ||
    sectionData.stackLabel;

  const stackLabelCslp =
    (rawStackObj?.$ &&
      (rawStackObj.$.stack_label ||
        rawStackObj.$.Stack_label ||
        rawStackObj.$.stackLabel ||
        rawStackObj.$.label)) ||
    sectionData.$?.stack_label ||
    sectionData.$?.["stack.stack_label"];

  const stackTitle =
    (typeof rawStackObj?.stack_title === "string"
      ? rawStackObj.stack_title
      : typeof rawStackObj?.Stack_title === "string"
        ? rawStackObj.Stack_title
        : typeof rawStackObj?.stackTitle === "string"
          ? rawStackObj.stackTitle
          : typeof rawStackObj?.title === "string"
            ? rawStackObj.title
            : undefined) ||
    sectionData.stack_title ||
    sectionData.Stack_title ||
    sectionData.stackTitle;

  const stackTitleCslp =
    (rawStackObj?.$ &&
      (rawStackObj.$.stack_title ||
        rawStackObj.$.Stack_title ||
        rawStackObj.$.stackTitle ||
        rawStackObj.$.title)) ||
    sectionData.$?.stack_title ||
    sectionData.$?.["stack.stack_title"];

  const label = sectionData.label || sectionData.section_label;
  const title = sectionData.title || sectionData.section_title_main;
  const description =
    sectionData.description || sectionData.text || sectionData.intro;
  const button = sectionData.button || sectionData.button_cta;
  const buttonHref = button?.href || button?.url;
  const buttonTitle = button?.title || button?.text;

  const rawCertifications =
    sectionData.certifications ||
    sectionData.Certifications ||
    sectionData.education ||
    sectionData.Education;

  const certifications: CertificationItem[] = Array.isArray(rawCertifications)
    ? rawCertifications
    : rawCertifications
      ? [rawCertifications]
      : [];

  const educationLabel =
    sectionData.education_label ||
    sectionData.Education_label ||
    sectionData.certifications_label ||
    sectionData.Certifications_label ||
    "02 — Opleiding";

  const educationTitle =
    sectionData.education_title ||
    sectionData.Education_title ||
    sectionData.certifications_title ||
    sectionData.Certifications_title ||
    "Opleiding & Certificeringen";

  const hasIntroContent = Boolean(
    label || title || description || (buttonHref && buttonTitle)
  );

  const isFullWidth =
    isPositionFull ||
    (!rawPosition &&
      companies.length === 0 &&
      !sectionData.left_col_span &&
      !sectionData.right_col_span) ||
    !hasIntroContent;

  return {
    rawWidth,
    colorModeKey,
    isTimelineLeft,
    isFullWidth,
    leftColSpan:
      options.leftColSpan ||
      sectionData.left_col_span ||
      sectionData.left_col ||
      sectionData.leftCol,
    rightColSpan:
      options.rightColSpan ||
      sectionData.right_col_span ||
      sectionData.right_col ||
      sectionData.rightCol,
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

