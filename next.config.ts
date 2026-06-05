import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 * - `output: 'export'` emits a fully static site into `out/`.
 * - Project sites are served under `/<repo>`. Set NEXT_PUBLIC_BASE_PATH to that
 *   path (e.g. "/frolov") at build time; the asset() helper uses the same var
 *   so image/public paths stay in sync. Empty -> root deploy / custom domain.
 * - next/image optimization needs a server, so it is disabled for export.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
