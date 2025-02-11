import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: './',
  reactStrictMode: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
