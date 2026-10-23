import { cache } from "react";
import contentstack, { QueryOperation } from "@contentstack/delivery-sdk";
import type { Page, Homepage, PortfolioItem } from "../types";
import { stack, isPreview, apiKey, deliveryToken, environment } from "./client";

/**
 * Fetches the singleton homepage entry and resolves referenced modular blocks.
 * Memoized with React cache() to prevent duplicate requests when used in generateMetadata and page.
 */
export const getHomePage = cache(async function getHomePage(): Promise<Homepage | undefined> {
  if (!apiKey || !deliveryToken || !environment) {
    console.error("[Contentstack] Missing required environment variables on server:", {
      apiKey: Boolean(apiKey),
      deliveryToken: Boolean(deliveryToken),
      environment: Boolean(environment),
    });
    return undefined;
  }

  try {
    const result = await stack
      .contentType("homepage")
      .entry()
      .includeReference(["blocks.featured_projects.projects"])
      .find<Homepage>();

    const entry = result.entries?.[0];
    if (entry) {
      if (isPreview) {
        contentstack.Utils.addEditableTags(entry, "homepage", true);
      }
      return entry;
    }
  } catch (error) {
    console.error("[Contentstack] Failed to fetch homepage entry:", error);
    return undefined;
  }
});

/**
 * Fetches a single page entry matching the provided URL path.
 * Memoized with React cache() to prevent duplicate requests when used in generateMetadata and page.
 */
export const getPage = cache(async function getPage(url: string): Promise<Page | undefined> {
  if (!apiKey || !deliveryToken || !environment) {
    console.error("[Contentstack] Missing required environment variables on server for getPage");
    return undefined;
  }

  try {
    const result = await stack
      .contentType("page")
      .entry()
      .includeReference(["blocks.featured_projects.projects"])
      .query()
      .where("url", QueryOperation.EQUALS, url)
      .find<Page>();

    const entry = result.entries?.[0];
    if (entry) {
      if (isPreview) {
        contentstack.Utils.addEditableTags(entry, "page", true);
      }
      return entry;
    }
  } catch (error) {
    console.error(`[Contentstack] Failed to fetch page entry for url "${url}":`, error);
    return undefined;
  }
});

/**
 * Fetches a single portfolio item entry matching the provided URL slug.
 * Memoized with React cache() to prevent duplicate requests when used in generateMetadata and page.
 */
export const getPortfolioItemByUrl = cache(async function getPortfolioItemByUrl(
  url: string
): Promise<PortfolioItem | undefined> {
  if (!apiKey || !deliveryToken || !environment) {
    console.error("[Contentstack] Missing required environment variables on server for getPortfolioItemByUrl");
    return undefined;
  }

  try {
    const result = await stack
      .contentType("portfolio_item")
      .entry()
      .query()
      .where("url", QueryOperation.EQUALS, url)
      .find<PortfolioItem>();

    const entry = result.entries?.[0];
    if (entry) {
      if (isPreview) {
        contentstack.Utils.addEditableTags(entry, "portfolio_item", true);
      }
      return entry;
    }
  } catch (error) {
    console.error(`[Contentstack] Failed to fetch portfolio item for url "${url}":`, error);
    return undefined;
  }
});

export interface GetPortfolioItemsOptions {
  limit?: number;
  skip?: number;
  category?: string;
}

export interface GetPortfolioItemsResult {
  items: PortfolioItem[];
  total: number;
}

/**
 * Fetches multiple portfolio item entries with optional pagination and category filtering.
 */
export async function getPortfolioItems({
  limit = 9,
  skip = 0,
  category,
}: GetPortfolioItemsOptions = {}): Promise<GetPortfolioItemsResult> {
  if (!apiKey || !deliveryToken || !environment) {
    console.error("[Contentstack] Missing required environment variables on server for getPortfolioItems");
    return { items: [], total: 0 };
  }

  try {
    let query = stack
      .contentType("portfolio_item")
      .entry()
      .query()
      .limit(limit)
      .skip(skip)
      .includeCount();

    if (category && category !== "Alles") {
      query = query.where("category", QueryOperation.EQUALS, category);
    }

    const result = await query.find<PortfolioItem>();

    if (isPreview && result.entries) {
      result.entries.forEach((entry) => {
        contentstack.Utils.addEditableTags(entry, "portfolio_item", true);
      });
    }

    return {
      items: result.entries || [],
      total: result.count || 0,
    };
  } catch (error) {
    console.error("[Contentstack] Failed to fetch portfolio items list:", error);
    return { items: [], total: 0 };
  }
}

/**
 * Fetches lightweight URL and timestamp list of all pages for sitemap generation.
 */
export async function getAllPageUrls(): Promise<{ url: string; updatedAt?: string }[]> {
  if (!apiKey || !deliveryToken || !environment) {
    return [];
  }

  try {
    const result = await stack.contentType("page").entry().find<Page>();
    return (result.entries || []).map((entry) => ({
      url: entry.url || "",
      updatedAt: entry.updated_at,
    }));
  } catch (error) {
    console.error("[Contentstack] Failed to fetch page URLs for sitemap:", error);
    return [];
  }
}

/**
 * Fetches lightweight URL and timestamp list of all portfolio items for sitemap generation.
 */
export async function getAllPortfolioUrls(): Promise<{ url: string; updatedAt?: string }[]> {
  if (!apiKey || !deliveryToken || !environment) {
    return [];
  }

  try {
    const result = await stack.contentType("portfolio_item").entry().find<PortfolioItem>();
    return (result.entries || []).map((entry) => ({
      url: entry.url || "",
      updatedAt: entry.updated_at,
    }));
  } catch (error) {
    console.error("[Contentstack] Failed to fetch portfolio URLs for sitemap:", error);
    return [];
  }
}
