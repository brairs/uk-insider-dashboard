// app/lib/serverApi.ts
export type DirectorDealing = {
  id?: number;
  company: string;
  ticker: string;
  director: string;
  role: string;
  type: string;
  valueGBP: number;
  price: number;
  date: string;
  source?: string;
};

export type ShortInterestRow = {
  company: string;
  ticker: string;
  shortPercent: number;
  funds: string[];
  lastUpdated: string;
};

function getBaseUrl() {
  // 1) If you set NEXT_PUBLIC_APP_URL in .env.local, that wins
  const explicit = process.env.NEXT_PUBLIC_APP_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  // 2) Vercel provides VERCEL_URL (no protocol)
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  // 3) Local dev fallback
  return "http://localhost:3000";
}

async function safeJson<T>(res: Response): Promise<T | null> {
  try {
    return await res.json() as T;
  } catch {
    return null;
  }
}

// /api/director-dealings returns: { deals: [...] }
export async function fetchDirectorDealings(): Promise<DirectorDealing[]> {
  const url = `${getBaseUrl()}/api/director-dealings`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];

  const data = await safeJson<any>(res);
  const deals = data?.deals;

  return Array.isArray(deals) ? (deals as DirectorDealing[]) : [];
}

// /api/short-interest returns: [ ... ]
export async function fetchShortInterest(): Promise<ShortInterestRow[]> {
  const url = `${getBaseUrl()}/api/short-interest`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];

  const data = await safeJson<any>(res);
  return Array.isArray(data) ? (data as ShortInterestRow[]) : [];
}
