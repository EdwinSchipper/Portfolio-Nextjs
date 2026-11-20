import contentstack from "@contentstack/delivery-sdk";
import ContentstackLivePreview, { type IStackSdk } from "@contentstack/live-preview-utils";
import { getContentstackEndpoint, type ContentstackEndpoints } from "@contentstack/utils";
import { env } from "../env";

export const {
  isPreview,
  isConfigured,
  apiKey,
  deliveryToken,
  environment,
  previewToken,
  region,
} = env.contentstack;

const STACK_REQUEST_TIMEOUT_MS = 10_000;
const STACK_RETRY_LIMIT = 3;
const STACK_RETRY_DELAY_MS = 500;
const RETRYABLE_NETWORK_ERROR_CODES = new Set(["ECONNABORTED", "EPIPE"]);
const RETRYABLE_HTTP_STATUS_CODES = new Set([408, 500, 502, 503, 504]);

interface RetryableHttpError {
  code?: string;
  response?: {
    status?: number;
  };
}

/**
 * Determines whether a failed Contentstack Delivery SDK read request should be retried.
 * Extends the SDK's built-in network error list with timeout (ECONNABORTED), broken pipe
 * (EPIPE), and transient 408/5xx server responses.
 */
function isRetryableStackError(error: unknown): boolean {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const { code, response } = error as RetryableHttpError;
  if (!response && typeof code === "string" && RETRYABLE_NETWORK_ERROR_CODES.has(code)) {
    return true;
  }

  const status = response?.status;
  return typeof status === "number" && RETRYABLE_HTTP_STATUS_CODES.has(status);
}

export const endpoints = getContentstackEndpoint(region, "", true) as ContentstackEndpoints;

export const stack = contentstack.stack({
  apiKey: apiKey || "missing-api-key",
  deliveryToken: deliveryToken || "missing-delivery-token",
  environment: environment || "missing-environment",
  region,
  timeout: STACK_REQUEST_TIMEOUT_MS,
  retryOnError: true,
  retryLimit: STACK_RETRY_LIMIT,
  retryDelay: STACK_RETRY_DELAY_MS,
  retryCondition: isRetryableStackError,
  host: env.contentstack.contentDeliveryHost || (endpoints.contentDelivery as string),
  live_preview: {
    enable: isPreview,
    preview_token: previewToken,
    host: env.contentstack.previewHost || (endpoints.preview as string),
  },
});

let isLivePreviewInitialized = false;

/**
 * Initializes Contentstack Live Preview / Visual Builder listeners once per browser session.
 * Configured for client-side mode with visual builder endpoints.
 */
export function initLivePreview(): void {
  if (isLivePreviewInitialized || typeof window === "undefined") {
    return;
  }

  isLivePreviewInitialized = true;

  ContentstackLivePreview.init({
    ssr: false,
    enable: isPreview,
    mode: "builder",
    stackSdk: stack.config as IStackSdk,
    stackDetails: {
      apiKey,
      environment,
    },
    clientUrlParams: {
      host: env.contentstack.applicationHost || (endpoints.application as string),
    },
    editButton: {
      enable: false,
    },
  });
}
