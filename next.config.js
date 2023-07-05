/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@deck.gl/layers", "@mapbox/tiny-sdf"],
  experimental: {
    esmExternals: "loose",
  },
  eslint: {
    ignoreDuringBuilds: true,
    tsconfigPath: "./tsconfig.next.json",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  api: {
    responseLimit: false,
  },
};

module.exports = nextConfig;
