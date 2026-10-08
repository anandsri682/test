/**
 * Centralized API URL constructor.
 * Ensures client-side network calls target the current domain/origin by default,
 * or process.env.NEXT_PUBLIC_API_URL if explicitly configured.
 */
export function getApiUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // If NEXT_PUBLIC_API_URL environment variable is explicitly set, use it
  if (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim()) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL.trim();
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    return `${cleanBase}${cleanEndpoint}`;
  }

  // Otherwise, use relative same-origin path for Next.js internal API routes
  return cleanEndpoint;
}

export default getApiUrl;
