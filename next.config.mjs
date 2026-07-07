/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the tracing root to this project — a stray parent lockfile in the
  // Downloads tree otherwise confuses Next's workspace-root inference.
  outputFileTracingRoot: import.meta.dirname,
  images: {
    // Allows the founder placeholder SVG to render via next/image. A real
    // raster photo (jpg/png) does not depend on this flag.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
