import type { Metadata } from "next";
import { getHomePage, getPage, getPortfolioItemByUrl } from "./contentstack";
import type { Page, PortfolioItem, Homepage } from "./types";

const DEFAULT_TITLE = "Edwin Schipper";
const DEFAULT_DESCRIPTION = "Portfolio Website van Edwin Schipper";

/**
 * Builds metadata for a standard CMS page entry.
 */
export function buildPageMetadata(page: Page): Metadata {
  const title = page.seo?.meta_title || page.title || DEFAULT_TITLE;
  const description =
    page.seo?.meta_description || page.description || DEFAULT_DESCRIPTION;
  const ogImageUrl = page.seo?.og_image?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
    },
  };
}

/**
 * Builds metadata for a portfolio item entry.
 */
export function buildPortfolioMetadata(item: PortfolioItem): Metadata {
  const title = item.seo?.meta_title || item.project_title || item.title;
  const description =
    item.seo?.meta_description ||
    item.project_desc ||
    item.description ||
    DEFAULT_DESCRIPTION;

  const imageUrl =
    item.seo?.og_image?.url ||
    (typeof item.case_thumbnail === "object"
      ? item.case_thumbnail?.url
      : typeof item.case_thumbnail === "string"
      ? item.case_thumbnail
      : undefined) ||
    (typeof item.featured_image === "object" ? item.featured_image?.url : undefined) ||
    (typeof item.portfolioimagedetail === "object"
      ? item.portfolioimagedetail?.url
      : typeof item.portfolioimagedetail === "string"
      ? item.portfolioimagedetail
      : undefined) ||
    (typeof item.banner_visual_1 === "object"
      ? item.banner_visual_1?.url
      : typeof item.banner_visual_1 === "string"
      ? item.banner_visual_1
      : undefined);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
  };
}

/**
 * Builds metadata for the homepage.
 * Uses title.absolute to override the parent template so the homepage title
 * has complete, literal control without duplicate suffixes.
 */
export function buildHomepageMetadata(homepage?: Homepage): Metadata {
  const metaTitle =
    homepage?.seo?.meta_title ||
    homepage?.meta_title ||
    homepage?.seo_title;

  // If the Contentstack title is just "homepage" or "Homepage", provide a rich fallback
  const isGenericTitle =
    !metaTitle &&
    (!homepage?.title || homepage.title.toLowerCase().trim() === "homepage");

  const title = metaTitle || (isGenericTitle ? "Edwin Schipper | Ontwerpbureau Schipper" : homepage?.title || DEFAULT_TITLE);

  const description =
    homepage?.seo?.meta_description ||
    homepage?.meta_description ||
    homepage?.description ||
    DEFAULT_DESCRIPTION;

  const ogImageUrl =
    homepage?.seo?.og_image?.url ||
    (typeof homepage?.og_image === "object" ? homepage?.og_image?.url : undefined);

  return {
    title: {
      absolute: title,
    },
    description,
    openGraph: {
      title,
      description,
      ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
    },
  };
}

/**
 * Resolves metadata dynamically for catch-all route paths (e.g. "/about", "/portfolio/project-1").
 */
export async function getDynamicRouteMetadata(path: string): Promise<Metadata> {
  // 1. Check if there is a 'page' entry matching this URL
  const page = await getPage(path);
  if (page) {
    return buildPageMetadata(page);
  }

  // 2. Check if there is a 'portfolio_item' entry matching this URL
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
