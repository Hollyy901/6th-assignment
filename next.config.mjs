/** @type {import('next').NextModeConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows images from any remote domain
      },
    ],
  },
};

export default nextConfig;