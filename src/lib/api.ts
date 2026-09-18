/**
 * Utility function to construct absolute API endpoints.
 * Supports NEXT_PUBLIC_API_URL when frontend and backend are hosted on separate platforms (e.g., Vercel + Render).
 * Defaults to relative path '/api/...' when hosted together.
 */
export function getApiUrl(endpoint: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  if (baseUrl) {
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    return `${cleanBase}${cleanEndpoint}`;
  }

  return cleanEndpoint;
}
