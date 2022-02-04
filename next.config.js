/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    BACKEND_API_URL: process.env.BACKEND_API_URL,
  },
  async rewrites() {
    return [
      {
        source: '/app/:any*',
        destination: '/app/',
      },
    ];
  },
  images: {
    domains: ['joeschmoe.io'],
  },
};
