/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Vercel strips trailing slashes; forcing them there causes an infinite redirect loop.
  trailingSlash: process.env.GITHUB_ACTIONS === 'true',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
