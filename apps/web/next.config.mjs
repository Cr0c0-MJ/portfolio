/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['@portfolio/ui'],
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
