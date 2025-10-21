/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable experimental features that might cache Tailwind
  experimental: {
    turbotrace: {
      logAll: true,
    },
  },
};

export default nextConfig;
