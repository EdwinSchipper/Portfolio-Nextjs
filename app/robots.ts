import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

/**
 * Next.js Dynamic Robots.txt configuration
 * Automatically serves /robots.txt for search engine crawlers.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/skills/"],
      },
    ],
    sitemap: `${env.siteUrl}/sitemap.xml`,
  };
}
