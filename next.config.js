/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/app/:any*',
        destination: '/app/',
      },
    ];
  },
};
