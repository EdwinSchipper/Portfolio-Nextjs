export interface ContentstackEnvConfig {
  readonly apiKey: string;
  readonly deliveryToken: string;
  readonly previewToken: string;
  readonly environment: string;
  readonly region: string;
  readonly isPreview: boolean;
  readonly isConfigured: boolean;
  readonly contentDeliveryHost?: string;
  readonly previewHost?: string;
  readonly applicationHost?: string;
  readonly imageHostname?: string;
}

export interface EnvConfig {
  readonly siteUrl: string;
  readonly gtmId?: string;
  readonly contentstack: ContentstackEnvConfig;
  readonly isProduction: boolean;
  readonly isDevelopment: boolean;
}

const DEFAULT_SITE_URL = "https://www.edwinschipper.nl";

function normalizeOptionalString(value: string | undefined): string | undefined {
  const trimmed = (value || "").trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function stripTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

/**
 * Resolves the canonical base URL for the application with fallbacks
 * for explicit site URL, Vercel production/preview URLs, and default domain.
 */
export function getSiteUrl(): string {
  const explicitSiteUrl = normalizeOptionalString(process.env.NEXT_PUBLIC_SITE_URL);
  if (explicitSiteUrl) {
    return stripTrailingSlash(explicitSiteUrl);
  }

  const vercelProductionUrl = normalizeOptionalString(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  );
  if (vercelProductionUrl) {
    return `https://${stripTrailingSlash(vercelProductionUrl)}`;
  }

  const vercelPreviewUrl = normalizeOptionalString(process.env.VERCEL_URL);
  if (vercelPreviewUrl) {
    return `https://${stripTrailingSlash(vercelPreviewUrl)}`;
  }

  return DEFAULT_SITE_URL;
}

let cachedContentstackEnv: ContentstackEnvConfig | null = null;

function getContentstackEnv(): ContentstackEnvConfig {
  if (cachedContentstackEnv) {
    return cachedContentstackEnv;
  }

  const apiKey = (process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || "").trim();
  const deliveryToken = (
    process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN || ""
  ).trim();
  const previewToken = (
    process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN || ""
  ).trim();
  const environment = (
    process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || ""
  ).trim();
  const region = (process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || "EU").trim();
  const isPreview = process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true";

  cachedContentstackEnv = {
    apiKey,
    deliveryToken,
    previewToken,
    environment,
    region,
    isPreview,
    isConfigured: Boolean(apiKey && deliveryToken && environment),
    contentDeliveryHost: normalizeOptionalString(
      process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_DELIVERY
    ),
    previewHost: normalizeOptionalString(
      process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST
    ),
    applicationHost: normalizeOptionalString(
      process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_APPLICATION
    ),
    imageHostname: normalizeOptionalString(
      process.env.NEXT_PUBLIC_CONTENTSTACK_IMAGE_HOSTNAME
    ),
  };

  return cachedContentstackEnv;
}

/**
 * Centralized, strictly typed environment configuration for the application.
 * Direct access to process.env outside of this module and next.config.mjs is prohibited.
 */
export const env: EnvConfig = {
  get siteUrl(): string {
    return getSiteUrl();
  },
  get gtmId(): string | undefined {
    return normalizeOptionalString(process.env.NEXT_PUBLIC_GTM_ID);
  },
  get contentstack(): ContentstackEnvConfig {
    return getContentstackEnv();
  },
  get isProduction(): boolean {
    return process.env.NODE_ENV === "production";
  },
  get isDevelopment(): boolean {
    return process.env.NODE_ENV === "development";
  },
};

