import type { MetadataRoute } from "next";
import { getAllPageUrls, getAllPortfolioUrls, type EntryUrlRecord } from "@/lib/cms";
import { env } from "@/lib/env";

function toSitemapEntries(
  records: EntryUrlRecord[],
  baseUrl: string,
  priority: number
): MetadataRoute.Sitemap {
  return records.flatMap(({ url, updatedAt }) =>
    url && url !== "/"
      ? [
          {
            url: `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`,
            lastModified: updatedAt ? new Date(updatedAt) : new Date(),
            changeFrequency: "monthly" as const,
            priority,
          },
        ]
      : []
  );
}

/**
 * Next.js Dynamic Sitemap generator
 * Automatically queries Contentstack for all pages and portfolio projects,
 * generating a fresh /sitemap.xml for Google and other search engines.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.siteUrl;

  const [pages, portfolioItems] = await Promise.all([
    getAllPageUrls(),
    getAllPortfolioUrls(),
  ]);

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...toSitemapEntries(pages, baseUrl, 0.8),
    ...toSitemapEntries(portfolioItems, baseUrl, 0.7),
  ];
}
