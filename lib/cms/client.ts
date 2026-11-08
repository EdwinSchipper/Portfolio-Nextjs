import contentstack from "@contentstack/delivery-sdk";
import ContentstackLivePreview, { IStackSdk } from "@contentstack/live-preview-utils";
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

export const endpoints = getContentstackEndpoint(region, "", true) as ContentstackEndpoints;

export const stack = contentstack.stack({
  apiKey: apiKey || "missing-api-key",
  deliveryToken: deliveryToken || "missing-delivery-token",
  environment: environment || "missing-environment",
  region,
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
