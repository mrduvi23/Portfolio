import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["lenis"],
  images: {
    formats: ["image/webp"],
    qualities: [75, 90, 95, 100],
  },
};

export default nextConfig;
