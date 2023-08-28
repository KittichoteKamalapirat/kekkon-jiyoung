/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    GOOGLE_MAP_KEY: process.env.GOOGLE_MAP_KEY,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_GOOGLE_MAP_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/after",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
