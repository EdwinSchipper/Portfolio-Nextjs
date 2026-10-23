/**
 * Dynamic Catch-All Route for Contentstack Pages
 * 
 * What it does:
 * - Catches any multi-segment or single-segment URL path (e.g., /over-ons, /portfolio/project-1).
 * - Queries Contentstack for an entry of content type 'page' matching that URL.
 * - Renders the page using SSR, handles 404s when an entry doesn't exist, and supports Live Preview.
 * 
 * How it works:
 * 1. Next.js App Router resolves dynamic URL parameters via `params` as a Promise.
 * 2. Joins slug array into an absolute path (e.g. ['portfolio', 'project-1'] -> '/portfolio/project-1').
 * 3. `getPage(path)` queries Contentstack SDK where the field 'url' equals the resolved path.
 * 4. If in preview mode, renders `<Preview />` with live listeners; otherwise renders static `<Page />`.
 */


import type { Metadata } from "next";
import { getPage, getPortfolioItemByUrl, isPreview } from "@/lib/cms";
import { getDynamicRouteMetadata } from "@/lib/metadata";
import { Page, Preview } from "@/components/features/pages";
import { PortfolioDetail, PortfolioPreview } from "@/components/features/portfolio";
import { notFound } from "next/navigation";

// Ensure subpages always fetch fresh content from Contentstack in production
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return getDynamicRouteMetadata(`/${slug.join("/")}`);
}

export default async function DynamicRoute({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  // Await the asynchronous params object (standard Next.js 15+ App Router)
  const { slug } = await params;

  // Reconstruct the URL path matching Contentstack's entry URL field (e.g., "/about" or "/portfolio")
  const path = `/${slug.join("/")}`;

  // 1. Query Contentstack for a 'page' entry matching this URL
  const page = await getPage(path);
  if (page) {
    if (isPreview) {
      return <Preview path={path} initialPage={page} />;
    }
    return <Page page={page} />;
  }

  // 2. Fallback check for portfolio item (for items not living under /portfolio/[slug])
  const portfolioItem = await getPortfolioItemByUrl(path);
  if (portfolioItem) {
    if (isPreview) {
      return <PortfolioPreview path={path} initialItem={portfolioItem} />;
    }
    return <PortfolioDetail item={portfolioItem} />;
  }

  // 3. Return 404 if no matching entry exists
  notFound();
}

