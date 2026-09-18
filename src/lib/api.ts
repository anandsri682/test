/**
 * Centralized API URL constructor.
 * Ensures all client-side network calls target the live Render backend URL directly:
 * https://test-bsh2.onrender.com
 */
const DEFAULT_PRODUCTION_BACKEND = 'https://test-bsh2.onrender.com';

export function getApiUrl(endpoint: string): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.trim() : '';
  const baseUrl = envUrl || DEFAULT_PRODUCTION_BACKEND;

  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  return `${cleanBase}${cleanEndpoint}`;
}

export default getApiUrl;
