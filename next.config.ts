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
    // When running on Render (backend hosting), never rewrite /api/:path* to avoid self-referential 508 infinite loops
    const isRender = Boolean(process.env.RENDER || process.env.IS_RENDER || process.env.PORT === '5000');
    if (isRender) {
      return [];
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://test-bsh2.onrender.com';

    // Use fallback so existing static and dynamic route handlers (e.g. /api/admin/referrals/[partnerId])
    // are evaluated and served locally first, and only unmatched API routes proxy to the backend
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        {
          source: '/api/:path*',
          destination: `${backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl}/api/:path*`,
        },
      ],
    };
  },
};

module.exports = nextConfig;