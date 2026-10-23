/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Razendsnelle beeldoptimalisatie (AVIF/WebP) & langere cache voor Contentstack assets
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 dagen
    qualities: [75, 90],
    // Configure allowed hostnames for Next.js Image Optimization
    remotePatterns: [
      ...(process.env.NEXT_PUBLIC_CONTENTSTACK_IMAGE_HOSTNAME
        ? [{ hostname: process.env.NEXT_PUBLIC_CONTENTSTACK_IMAGE_HOSTNAME }]
        : [
            { hostname: "images.contentstack.io" },
            { hostname: "*-images.contentstack.com" },
          ]),
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
};

export default nextConfig;
