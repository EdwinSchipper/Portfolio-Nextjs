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
  readonly revalidateSecret?: string;
  readonly contentstack: ContentstackEnvConfig;
  readonly isProduction: boolean;
  readonly isDevelopment: boolean;
}

const DEFAULT_SITE_URL = "https://www.edwinschipper.nl";

function normalizeOptionalString(value: string | undefined): string | undefined {
  const trimmed = (value || "").trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function normalizeBaseUrl(rawUrl: string): string {
  const hasProtocol = rawUrl.startsWith("https://") || rawUrl.startsWith("http://");
  const withProtocol = hasProtocol ? rawUrl : `https://${rawUrl}`;
  return withProtocol.endsWith("/") ? withProtocol.slice(0, -1) : withProtocol;
}

/**
 * Resolves the canonical base URL for the application from explicit configuration
 * with fallback to the default production domain.
 */
export function getSiteUrl(): string {
  const explicitSiteUrl = normalizeOptionalString(process.env.NEXT_PUBLIC_SITE_URL);
  if (explicitSiteUrl) {
    return normalizeBaseUrl(explicitSiteUrl);
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
  get revalidateSecret(): string | undefined {
    return normalizeOptionalString(process.env.CONTENTSTACK_REVALIDATE_SECRET);
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

