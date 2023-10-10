/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  serverRuntimeConfig: {
    GOOGLE_MAP_KEY: process.env.GOOGLE_MAP_KEY,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_APP_SCRIPT_URL: process.env.NEXT_PUBLIC_APP_SCRIPT_URL,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/after",
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
