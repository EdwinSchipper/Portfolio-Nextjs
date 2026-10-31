import type { Metadata } from "next";
import type { Page, PortfolioItem, Homepage } from "../types";

export const DEFAULT_TITLE = "Edwin Schipper";
export const DEFAULT_DESCRIPTION = "Portfolio Website van Edwin Schipper";

/**
 * Builds metadata for a standard CMS page entry.
 */
export function buildPageMetadata(page: Page): Metadata {
  const title = page.seo?.meta_title || page.title || DEFAULT_TITLE;
  const description =
    page.seo?.meta_description || page.description || DEFAULT_DESCRIPTION;
  const ogImageUrl = page.seo?.og_image?.url;
  const canonicalPath = page.url ? (page.url.startsWith("/") ? page.url : `/${page.url}`) : undefined;

  return {
    title,
    description,
    ...(canonicalPath ? { alternates: { canonical: canonicalPath } } : {}),
    openGraph: {
      title,
      description,
      ...(canonicalPath ? { url: canonicalPath } : {}),
      siteName: "Edwin Schipper",
      locale: "nl_NL",
      type: "website",
      ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
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

  const canonicalPath = item.url ? (item.url.startsWith("/") ? item.url : `/${item.url}`) : undefined;

  return {
    title,
    description,
    ...(canonicalPath ? { alternates: { canonical: canonicalPath } } : {}),
    openGraph: {
      title,
      description,
      ...(canonicalPath ? { url: canonicalPath } : {}),
      siteName: "Edwin Schipper",
      locale: "nl_NL",
      type: "article",
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
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

  const title =
    metaTitle ||
    (isGenericTitle ? "Edwin Schipper | Ontwerpbureau Schipper" : homepage?.title || DEFAULT_TITLE);

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
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: "/",
      siteName: "Edwin Schipper",
      locale: "nl_NL",
      type: "website",
      ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
  };
}
