import type { Metadata } from "next";
import { getHomePage, getPage, getPortfolioItemByUrl } from "../cms";
import {
  buildPageMetadata,
  buildPortfolioMetadata,
  buildHomepageMetadata,
} from "./builders";

/**
 * Resolves metadata specifically for portfolio detail routes (/portfolio/[slug]).
 */
export async function getPortfolioRouteMetadata(slug: string): Promise<Metadata> {
  const path = `/portfolio/${slug}`;
  const item = await getPortfolioItemByUrl(path);
  if (item) {
    return buildPortfolioMetadata(item);
  }
  return {
    title: "Project niet gevonden",
  };
}

/**
 * Resolves metadata dynamically for catch-all route paths (e.g. "/about", "/portfolio").
 */
export async function getDynamicRouteMetadata(path: string): Promise<Metadata> {
  // 1. Check page entry first for standard routes
  const page = await getPage(path);
  if (page) {
    return buildPageMetadata(page);
  }

  // 2. Fallback check for portfolio item if accessed via catch-all
  const item = await getPortfolioItemByUrl(path);
  if (item) {
    return buildPortfolioMetadata(item);
  }

  return {
    title: "Pagina niet gevonden",
  };
}

/**
 * Resolves metadata for the homepage.
 */
export async function getHomePageMetadata(): Promise<Metadata> {
  const page = await getHomePage();
  return buildHomepageMetadata(page);
}
