import { timingSafeEqual } from "node:crypto";

export interface RevalidationPattern {
  path: string;
  type: "page" | "layout";
}

export interface RevalidationTargets {
  paths: string[];
  routePatterns: RevalidationPattern[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function normalizeEntryUrl(value: unknown): string | undefined {
  const raw = normalizeString(value);
  if (!raw) return undefined;
  const withLeadingSlash = raw.startsWith("/") ? raw : `/${raw}`;
  if (withLeadingSlash.length > 1 && withLeadingSlash.endsWith("/")) {
    return withLeadingSlash.slice(0, -1);
  }
  return withLeadingSlash;
}

function extractProvidedSecret(request: Request): string | undefined {
  const headerSecret = normalizeString(request.headers.get("x-revalidate-secret"));
  if (headerSecret) {
    return headerSecret;
  }

  const authHeader = normalizeString(request.headers.get("authorization"));
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    return normalizeString(authHeader.slice(7));
  }

  return undefined;
}

/**
 * Verifies an incoming Contentstack or admin revalidation request using timing-safe comparison.
 */
export function isValidRevalidateRequest(request: Request, expectedSecret: string): boolean {
  const providedSecret = extractProvidedSecret(request);
  if (!providedSecret) {
    return false;
  }

  const providedBuffer = Buffer.from(providedSecret, "utf8");
  const expectedBuffer = Buffer.from(expectedSecret, "utf8");

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(providedBuffer, expectedBuffer);
}

/**
 * Maps a Contentstack Publish/Unpublish webhook payload to Next.js paths and route patterns
 * that must be invalidated via revalidatePath().
 */
export function resolveRevalidationTargets(payload: unknown): RevalidationTargets {
  const root = isRecord(payload) ? payload : {};
  const data = isRecord(root.data) ? root.data : undefined;
  const entry = data && isRecord(data.entry) ? data.entry : isRecord(root.entry) ? root.entry : undefined;
  const contentType =
    data && isRecord(data.content_type)
      ? data.content_type
      : isRecord(root.content_type)
        ? root.content_type
        : undefined;

  const contentTypeUid =
    normalizeString(contentType?.uid) ?? normalizeString(root.content_type_uid);
  const entryUrl = normalizeEntryUrl(entry?.url ?? root.url ?? root.path);

  const paths = new Set<string>(["/sitemap.xml"]);
  const routePatterns: RevalidationPattern[] = [];

  if (contentTypeUid === "homepage") {
    paths.add("/");
  } else if (contentTypeUid === "portfolio_item") {
    paths.add("/");
    paths.add("/portfolio");
    if (entryUrl) {
      paths.add(entryUrl);
    } else {
      routePatterns.push({ path: "/portfolio/[slug]", type: "page" });
    }
  } else if (contentTypeUid === "page") {
    if (entryUrl) {
      paths.add(entryUrl);
    } else {
      routePatterns.push({ path: "/[...slug]", type: "page" });
    }
  } else if (entryUrl) {
    paths.add(entryUrl);
  } else {
    routePatterns.push({ path: "/", type: "layout" });
  }

  return {
    paths: Array.from(paths),
    routePatterns,
  };
}

