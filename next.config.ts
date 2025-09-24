import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Remove basePath and assetPrefix for custom domain deployment
  // basePath: process.env.NODE_ENV === 'production' ? '/thomaskelly281.github.io' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/thomaskelly281.github.io' : '',
};

export default nextConfig;
