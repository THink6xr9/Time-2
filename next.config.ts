import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Time-2",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "opensea.io",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      }
    ]
  }
};

export default nextConfig;
