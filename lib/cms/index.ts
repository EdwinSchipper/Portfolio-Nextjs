/**
 * CMS Module: Contentstack Delivery SDK client and data queries.
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

export type { EntryUrlRecord } from "./queries";
export type { RevalidationPattern, RevalidationTargets } from "./revalidation";
