import { cache } from "react";
import contentstack, { QueryOperation } from "@contentstack/delivery-sdk";
import type { Page, Homepage, PortfolioItem } from "../types";
import { stack, isPreview, isConfigured } from "./client";

const SERVER_CACHE_TTL_MS = 60_000;
const PAGE_REFERENCES = ["blocks.featured_projects.projects"];

type ContentTypeUid = "homepage" | "page" | "portfolio_item";

interface CacheRecord<T> {
  data: T;
  expiresAt: number;
}

interface SingleEntryQueryOptions {
  url?: string;
  references?: string[];
}

export interface EntryUrlRecord {
  url: string;
  updatedAt?: string;
}

const serverQueryCache = new Map<string, CacheRecord<unknown>>();
const inFlightRequests = new Map<string, Promise<unknown>>();

/**
 * Caches Contentstack SDK responses in server memory across requests and deduplicates
 * concurrent in-flight queries. Bypasses caching in the browser so Contentstack
 * Visual Builder / Live Preview client updates remain real-time.
 */
async function withServerCache<T>(
  cacheKey: string,
  fetcher: () => Promise<T>
): Promise<T> {
  if (typeof window !== "undefined") {
    return fetcher();
  }

  const now = Date.now();
  const cached = serverQueryCache.get(cacheKey) as CacheRecord<T> | undefined;
  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  const activeRequest = inFlightRequests.get(cacheKey) as Promise<T> | undefined;
  if (activeRequest) {
    return activeRequest;
  }

  const requestPromise = fetcher()
    .then((result) => {
      if (result !== undefined) {
        serverQueryCache.set(cacheKey, {
          data: result,
          expiresAt: Date.now() + SERVER_CACHE_TTL_MS,
        });
      }
      return result;
    })
    .finally(() => {
      inFlightRequests.delete(cacheKey);
    });

  inFlightRequests.set(cacheKey, requestPromise);
  return requestPromise;
}

/**
 * Rethrows Contentstack failures on the server so Next.js ISR keeps serving the last
 * successfully generated page instead of caching an empty page or a 404. In the browser
 * (Live Preview) the fallback value is returned so the editor UI stays responsive.
 */
function rethrowOnServer<T>(error: unknown, browserFallback: T): T {
  if (typeof window === "undefined") {
    throw error;
  }
  return browserFallback;
}

/**
 * Shared generic entry fetcher that consolidates configuration checks, server caching,
 * optional reference inclusion, URL filtering, and Live Preview editable tags.
 */
async function fetchSingleEntry<T extends { uid: string }>(
  contentType: ContentTypeUid,
  options: SingleEntryQueryOptions = {}
): Promise<T | undefined> {
  if (!isConfigured) {
    console.error(`[Contentstack] Missing required environment variables for "${contentType}".`);
    return undefined;
  }

  const { url, references } = options;
  const cacheKey = `entry:${contentType}:${url ?? "singleton"}:${isPreview ? "preview" : "live"}`;

  return withServerCache(cacheKey, async () => {
    try {
      const entryCall = stack.contentType(contentType).entry();
      if (references && references.length > 0) {
        entryCall.includeReference(references);
      }

      const result = url
        ? await entryCall.query().where("url", QueryOperation.EQUALS, url).find<T>()
        : await entryCall.find<T>();

      const entry = result.entries?.[0];
      if (entry && isPreview) {
        contentstack.Utils.addEditableTags(entry, contentType, true);
      }
      return entry;
    } catch (error) {
      console.error(
        `[Contentstack] Failed to fetch "${contentType}"${url ? ` for url "${url}"` : ""}:`,
        error
      );
      return rethrowOnServer(error, undefined);
    }
  });
}

/**
 * Shared generic fetcher for lightweight URL and timestamp lists per content type.
 */
async function fetchEntryUrls(
  contentType: Extract<ContentTypeUid, "page" | "portfolio_item">
): Promise<EntryUrlRecord[]> {
  if (!isConfigured) {
    return [];
  }

  return withServerCache(`urls:${contentType}`, async () => {
    try {
      const result = await stack
        .contentType(contentType)
        .entry()
        .only(["url", "updated_at"])
        .find<{ url?: string; updated_at?: string }>();

      return (result.entries || []).map((entry) => ({
        url: entry.url || "",
        updatedAt: entry.updated_at,
      }));
    } catch (error) {
      console.error(`[Contentstack] Failed to fetch URLs for "${contentType}":`, error);
      return rethrowOnServer(error, []);
    }
  });
}

/**
 * Splits a CMS URL path into non-empty route segments.
 */
function splitUrlSegments(url: string): string[] {
  return url.split("/").filter(Boolean);
}

/**
 * Fetches the singleton homepage entry and resolves referenced modular blocks.
 */
export const getHomePage = cache((): Promise<Homepage | undefined> =>
  fetchSingleEntry<Homepage>("homepage", { references: PAGE_REFERENCES })
);

/**
 * Fetches a single page entry matching the provided URL path.
 */
export const getPage = cache((url: string): Promise<Page | undefined> =>
  fetchSingleEntry<Page>("page", { url, references: PAGE_REFERENCES })
);

/**
 * Fetches a single portfolio item entry matching the provided URL slug.
 */
export const getPortfolioItemByUrl = cache((url: string): Promise<PortfolioItem | undefined> =>
  fetchSingleEntry<PortfolioItem>("portfolio_item", { url })
);

/**
 * Fetches lightweight URL and timestamp list of all pages.
 */
export const getAllPageUrls = cache((): Promise<EntryUrlRecord[]> => fetchEntryUrls("page"));

/**
 * Fetches lightweight URL and timestamp list of all portfolio items.
 */
export const getAllPortfolioUrls = cache((): Promise<EntryUrlRecord[]> =>
  fetchEntryUrls("portfolio_item")
);

/**
 * Resolves static route parameters for catch-all CMS pages (/app/[...slug]/page.tsx).
 */
export async function getDynamicRouteStaticParams(): Promise<{ slug: string[] }[]> {
  const pages = await getAllPageUrls();
  return pages.flatMap((page) => {
    const slug = splitUrlSegments(page.url);
    return slug.length > 0 && !(slug[0] === "portfolio" && slug.length > 1) ? [{ slug }] : [];
  });
}

/**
 * Resolves static route parameters for portfolio detail pages (/app/portfolio/[slug]/page.tsx).
 */
export async function getPortfolioRouteStaticParams(): Promise<{ slug: string }[]> {
  const items = await getAllPortfolioUrls();
  return items.flatMap((item) => {
    const slug = splitUrlSegments(item.url).at(-1);
    return slug ? [{ slug }] : [];
  });
}
