import { NextResponse } from "next/server";

type DirectorDeal = {
  id: number;
  company: string;
  ticker: string;
  director: string;
  role: string;
  type: "Buy" | "Sell";
  valueGBP: number;
  price: number;
  date: string;
  source: string;
};

const mockDeals: DirectorDeal[] = [
  {
    id: 1,
    company: "Tesco plc",
    ticker: "TSCO",
    director: "Ken Murphy",
    role: "CEO",
    type: "Buy",
    valueGBP: 245000,
    price: 2.45,
    date: "2025-11-29",
    source: "LSE",
  },
  {
    id: 2,
    company: "Lloyds Banking Group plc",
    ticker: "LLOY",
    director: "Charlie Nunn",
    role: "CEO",
    type: "Buy",
    valueGBP: 120000,
    price: 0.47,
    date: "2025-11-28",
    source: "LSE",
  },
  {
    id: 3,
    company: "Vodafone Group plc",
    ticker: "VOD",
    director: "Margherita Della Valle",
    role: "CEO",
    type: "Sell",
    valueGBP: 95000,
    price: 0.95,
    date: "2025-11-27",
    source: "LSE",
  },
  {
    id: 4,
    company: "Barclays plc",
    ticker: "BARC",
    director: "C.S. Venkatakrishnan",
    role: "CEO",
    type: "Buy",
    valueGBP: 310000,
    price: 2.24,
    date: "2025-11-26",
    source: "LSE",
  },
  {
    id: 5,
    company: "Rolls-Royce Holdings plc",
    ticker: "RR.",
    director: "Tufan Erginbilgic",
    role: "CEO",
    type: "Buy",
    valueGBP: 180000,
    price: 5.12,
    date: "2025-11-25",
    source: "LSE",
  },
  {
    id: 6,
    company: "AstraZeneca plc",
    ticker: "AZN",
    director: "Pascal Soriot",
    role: "CEO",
    type: "Sell",
    valueGBP: 520000,
    price: 108.5,
    date: "2025-11-24",
    source: "LSE",
  },
];

export async function GET() {
  return NextResponse.json({ deals: mockDeals });
}
