/**
 * Metadata Module: SEO Builders and dynamic route metadata resolvers.
 */

export {
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  buildPageMetadata,
  buildPortfolioMetadata,
  buildHomepageMetadata,
} from "./builders";

export {
  getPortfolioRouteMetadata,
  getDynamicRouteMetadata,
  getHomePageMetadata,
} from "./resolvers";
