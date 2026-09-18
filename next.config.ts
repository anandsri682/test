/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://test-bsh2.onrender.com';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;