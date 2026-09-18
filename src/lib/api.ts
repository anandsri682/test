/**
 * Utility function to construct absolute API endpoints.
 * Supports NEXT_PUBLIC_API_URL when frontend and backend are hosted on separate platforms (e.g., Vercel + Render).
 * Automatically falls back to the production Render backend URL in browser production environments if unconfigured.
 */
const PRODUCTION_RENDER_BACKEND = 'https://test-bsh2.onrender.com';

export function getApiUrl(endpoint: string): string {
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

  // In production browser environments (e.g. Vercel deployment), fallback to the Render backend URL
  if (
    !baseUrl &&
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
  ) {
    baseUrl = PRODUCTION_RENDER_BACKEND;
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  if (baseUrl) {
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    return `${cleanBase}${cleanEndpoint}`;
  }

  return cleanEndpoint;
}
