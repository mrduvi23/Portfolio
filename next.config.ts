import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["lenis"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
        pathname: "/api/mcp/asset/**",
      },
    ],
  },
};

export default nextConfig;
