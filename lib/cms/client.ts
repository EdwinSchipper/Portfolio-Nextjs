import contentstack from "@contentstack/delivery-sdk";
import ContentstackLivePreview, { IStackSdk } from "@contentstack/live-preview-utils";
import { getContentstackEndpoint, type ContentstackEndpoints } from "@contentstack/utils";

export const isPreview = process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true";

export const apiKey = (process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || "").trim();
export const deliveryToken = (process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN || "").trim();
export const environment = (process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || "").trim();
export const previewToken = (process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN || "").trim();
export const region = (process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || "EU").trim();
export const endpoints = getContentstackEndpoint(region, "", true) as ContentstackEndpoints;

export const stack = contentstack.stack({
  apiKey: apiKey || "missing-api-key",
  deliveryToken: deliveryToken || "missing-delivery-token",
  environment: environment || "missing-environment",
  region: region as any,
  host: process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_DELIVERY || (endpoints.contentDelivery as string),
  live_preview: {
    enable: isPreview,
    preview_token: previewToken,
    host: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST || (endpoints.preview as string),
  },
});

/**
 * Initializes Contentstack Live Preview / Visual Builder listeners.
 * Configured for client-side mode with visual builder endpoints.
 */
export function initLivePreview(): void {
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
      host: process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_APPLICATION || (endpoints.application as string),
    },
    editButton: {
      enable: false,
    },
  });
}
