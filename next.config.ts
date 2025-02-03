import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["cdn.pixabay.com", "pixabay.com"],
  },
};

export default nextConfig;
