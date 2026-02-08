import { headers } from "next/headers";

/**
 * Build an absolute base URL that works:
 * - locally (localhost:3000)
 * - on Vercel
 * - in server components
 */
export function getBaseUrl() {
  const h = headers() as unknown as Headers;
  const host = h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

/**
 * Safely parse JSON without throwing
 */
async function safeJson<T>(res: Response): Promise<T | null> {
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/**
 * Fetch director dealings from your API route
 */
export async function fetchDirectorDealings() {
  const res = await fetch(`${getBaseUrl()}/api/director-dealings`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await safeJson<any>(res);
  return Array.isArray(data) ? data : data?.data ?? [];
}

/**
 * Fetch short interest from your API route
 */
export async function fetchShortInterest() {
  const res = await fetch(`${getBaseUrl()}/api/short-interest`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await safeJson<any>(res);
  return Array.isArray(data) ? data : data?.data ?? [];
}
