import type { NextConfig } from "next";
// import { fetchRedirects } from "@/sanity/lib/fetchRedirects";

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
    return [
      {
        source: "/after-60-do-this-every-morning-to-potentially-live-10-years-longer-5-science-backed-habits/",
        destination: "/blog/after-60-do-this-every-morning-to-potentially-live-10-years-longer-5-science-backed-habits",
        permanent: true, // true = 301, false = 302
      },
    ];
  },
};

export default nextConfig;