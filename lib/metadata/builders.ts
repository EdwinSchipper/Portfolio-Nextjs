import type { Metadata } from "next";
import { resolveFirstAssetUrl } from "../cms/mappers";
import { SITE_LOCALE, SITE_NAME } from "../env";
import type { Homepage, Page, PortfolioItem } from "../types";

export const DEFAULT_TITLE = "Edwin Schipper";
export const DEFAULT_DESCRIPTION = "Portfolio Website van Edwin Schipper";

interface MetadataBuildOptions {
  title: Metadata["title"];
  ogTitle: string;
  description: string;
  canonicalPath?: string;
  imageUrl?: string;
  openGraphType: "website" | "article";
  noIndex?: boolean;
}

function toCanonicalPath(url?: string): string | undefined {
  const trimmed = (url ?? "").trim();
  if (!trimmed) {
    return undefined;
  }
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function createMetadataObject({
  title,
  ogTitle,
  description,
  canonicalPath,
  imageUrl,
  openGraphType,
  noIndex,
}: MetadataBuildOptions): Metadata {
  return {
    title,
    description,
    ...(canonicalPath ? { alternates: { canonical: canonicalPath } } : {}),
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: ogTitle,
      description,
      ...(canonicalPath ? { url: canonicalPath } : {}),
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: openGraphType,
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

/**
 * Builds metadata for a standard CMS page entry.
 */
export function buildPageMetadata(page: Page): Metadata {
  const title = page.seo?.meta_title || page.title || DEFAULT_TITLE;
  const description =
    page.seo?.meta_description || page.description || DEFAULT_DESCRIPTION;

  return createMetadataObject({
    title,
    ogTitle: title,
    description,
    canonicalPath: toCanonicalPath(page.url),
    imageUrl: page.seo?.og_image?.url,
    openGraphType: "website",
    noIndex: page.seo?.no_index,
  });
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
    resolveFirstAssetUrl(
      item.seo?.og_image,
      item.case_thumbnail,
      item.featured_image,
      item.portfolioimagedetail,
      item.banner_visual_1
    ) ?? undefined;

  return createMetadataObject({
    title,
    ogTitle: title,
    description,
    canonicalPath: toCanonicalPath(item.url),
    imageUrl,
    openGraphType: "article",
    noIndex: item.seo?.no_index,
  });
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

  const isGenericTitle =
    !metaTitle &&
    (!homepage?.title || homepage.title.toLowerCase().trim() === "homepage");

  const resolvedTitle =
    metaTitle ||
    (isGenericTitle
      ? "Edwin Schipper | Ontwerpbureau Schipper"
      : homepage?.title || DEFAULT_TITLE);

  const description =
    homepage?.seo?.meta_description ||
    homepage?.meta_description ||
    homepage?.description ||
    DEFAULT_DESCRIPTION;

  const ogImageUrl =
    resolveFirstAssetUrl(homepage?.seo?.og_image, homepage?.og_image) ?? undefined;

  return createMetadataObject({
    title: {
      absolute: resolvedTitle,
    },
    ogTitle: resolvedTitle,
    description,
    canonicalPath: "/",
    imageUrl: ogImageUrl,
    openGraphType: "website",
    noIndex: homepage?.seo?.no_index,
  });
}
