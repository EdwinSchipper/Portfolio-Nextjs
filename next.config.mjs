const contentstackApiKey = (process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || "").trim();
const contentstackAssetPathname = contentstackApiKey
  ? `/v3/assets/${contentstackApiKey}/**`
  : "/v3/assets/**";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Kostenefficiënte beeldoptimalisatie (WebP, 1 quality, 31d TTL) & afgeschermde Contentstack hosts
  images: {
    formats: ["image/webp"],
    qualities: [75],
    minimumCacheTTL: 2678400, // 31 dagen edge/CDN cache-TTL
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.contentstack.io",
        pathname: contentstackAssetPathname,
      },
      {
        protocol: "https",
        hostname: "*-images.contentstack.com",
        pathname: contentstackAssetPathname,
      },
      ...(process.env.NEXT_PUBLIC_CONTENTSTACK_IMAGE_HOSTNAME
        ? [
            {
              protocol: "https",
              hostname: process.env.NEXT_PUBLIC_CONTENTSTACK_IMAGE_HOSTNAME,
              pathname: contentstackAssetPathname,
            },
          ]
        : []),
    ],
  },

  // 2. Toon alle Server Component API-fetches netjes in de terminal met status en cache HIT/MISS
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // 3. Verwijder console.log in productie-builds (behalve errors)
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  // 4. Externaliseer isomorphic-dompurify / jsdom voor probleemloze SSR compilatie
  serverExternalPackages: ["isomorphic-dompurify"],

  // 5. Security-, Visual Builder framing- en open CORS headers voor AI discovery
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://*.contentstack.com;",
          },
        ],
      },
      {
        source: "/ai-catalog.json",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Content-Type", value: "application/json" },
        ],
      },
      {
        source: "/.well-known/ai-catalog.json",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Content-Type", value: "application/json" },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
        ],
      },
    ];
  },
};

export default nextConfig;
