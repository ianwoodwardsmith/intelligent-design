import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enforce next/image — plain <img> will be flagged during build
  images: {
    // Add external domains here as needed:
    // remotePatterns: [{ protocol: "https", hostname: "example.com" }],
  },
};

export default nextConfig;
