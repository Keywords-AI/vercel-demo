import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Avoid Turbopack inferring the workspace root from lockfiles outside this repo.
    root: __dirname,
  },
  serverExternalPackages: ["ai", "@ai-sdk/openai", "@vercel/otel", "@opentelemetry/api"],
};

export default nextConfig;
