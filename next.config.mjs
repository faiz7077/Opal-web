// import type { NextConfig } from "next";

const NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images:{
    domains: ["assets.aceternity.com"]
  }
};

export default NextConfig;
