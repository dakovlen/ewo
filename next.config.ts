import type { NextConfig } from "next";
import { fetchRedirects } from "@/sanity/lib/fetchRedirects";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
    async redirects() {
    try {
      const sanityRedirects = await fetchRedirects();
      
      return sanityRedirects.map((redirect) => ({
        source: redirect.source,
        destination: redirect.destination,
        permanent: redirect.permanent,
      }));
    } catch (error) {
      console.error('Failed to fetch redirects for next.config.js:', error);
      return [];
    }
  },
};

export default nextConfig;