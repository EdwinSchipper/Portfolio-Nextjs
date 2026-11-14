/**
 * CMS Module: Contentstack Delivery SDK client, server queries, mappers, and revalidation helpers.
 */

export {
  isPreview,
  isConfigured,
  apiKey,
  deliveryToken,
  environment,
  previewToken,
  region,
  endpoints,
  stack,
  initLivePreview,
} from "./client";

export {
  clearServerQueryCache,
  resolveCmsPath,
  getHomePage,
  getPage,
  getPortfolioItemByUrl,
  getAllPageUrls,
  getAllPortfolioUrls,
  getDynamicRouteStaticParams,
  getPortfolioRouteStaticParams,
} from "./queries";

export {
  isValidRevalidateRequest,
  resolveRevalidationTargets,
} from "./revalidation";

export {
  resolveAssetUrl,
  resolveFirstAssetUrl,
  resolveAssetCslp,
  normalizeFeaturedProject,
  normalizeCtaBlock,
  extractStackTags,
  normalizeExperienceTimeline,
  normalizeResumeSection,
} from "./mappers";

export type { EntryUrlRecord } from "./queries";
export type { RevalidationPattern, RevalidationTargets } from "./revalidation";
export type {
  NormalizedFeaturedProject,
  NormalizedCtaBlock,
  ResumeNormalizationOptions,
  NormalizedResumeSection,
} from "./mappers";
