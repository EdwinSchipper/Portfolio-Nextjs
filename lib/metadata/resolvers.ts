import type { Metadata } from "next";
import { getHomePage, getPage, getPortfolioItemByUrl, resolveCmsPath } from "../cms";
import {
  buildHomepageMetadata,
  buildPageMetadata,
  buildPortfolioMetadata,
} from "./builders";

/**
 * Resolves metadata specifically for portfolio detail routes (/portfolio/[slug]).
 */
export async function getPortfolioRouteMetadata(slug: string): Promise<Metadata> {
  const item = await getPortfolioItemByUrl(`/portfolio/${slug}`);
  if (item) {
    return buildPortfolioMetadata(item);
  }

  return {
    title: "Project niet gevonden",
    robots: {
      index: false,
      follow: false,
    },
  };
}

/**
 * Resolves metadata dynamically for catch-all route paths (e.g. "/overmij", "/portfolio").
 */
export async function getDynamicRouteMetadata(
  slugOrPath: string | string[]
): Promise<Metadata> {
  const path = resolveCmsPath(slugOrPath);
  const page = await getPage(path);
  if (page) {
    return buildPageMetadata(page);
  }

  return {
    title: "Pagina niet gevonden",
    robots: {
      index: false,
      follow: false,
    },
  };
}

/**
 * Resolves metadata for the homepage.
 */
export async function getHomePageMetadata(): Promise<Metadata> {
  const page = await getHomePage();
  return buildHomepageMetadata(page);
}
