// Prefixes public-folder asset paths with the deploy basePath.
// Needed because next/image with `unoptimized` does not apply basePath to
// absolute /public paths. NEXT_PUBLIC_BASE_PATH is inlined at build time and
// matches `basePath` in next.config.ts.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string): string =>
  path.startsWith("/") ? `${BASE_PATH}${path}` : path;
