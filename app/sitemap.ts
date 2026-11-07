import type { MetadataRoute } from "next";
import { getAllPageUrls, getAllPortfolioUrls } from "@/lib/cms";
import { env } from "@/lib/env";

/**
 * Next.js Dynamic Sitemap generator
 * Automatically queries Contentstack for all pages and portfolio projects,
 * generating a fresh /sitemap.xml for Google and other search engines.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.siteUrl;

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  const [pages, portfolioItems] = await Promise.all([
    getAllPageUrls(),
    getAllPortfolioUrls(),
  ]);

  pages.forEach((page) => {
    if (page.url && page.url !== "/") {
      const cleanPath = page.url.startsWith("/") ? page.url : `/${page.url}`;
      entries.push({
        url: `${baseUrl}${cleanPath}`,
        lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  });

  portfolioItems.forEach((item) => {
    if (item.url) {
      const cleanPath = item.url.startsWith("/") ? item.url : `/${item.url}`;
      entries.push({
        url: `${baseUrl}${cleanPath}`,
        lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  });

  return entries;
}
