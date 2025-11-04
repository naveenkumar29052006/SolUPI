/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable specific ESLint rules during build
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },
  experimental: {
    // Remove the invalid turbotrace option
  },
};

export default nextConfig;
