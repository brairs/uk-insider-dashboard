import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    {
      company: "Tesco plc",
      ticker: "TSCO",
      shortPercent: 2.41,
      funds: ["BlackRock", "Citadel"],
      lastUpdated: "2024-11-28",
    },
    {
      company: "Rolls-Royce Holdings plc",
      ticker: "RR.",
      shortPercent: 1.93,
      funds: ["Marshall Wace"],
      lastUpdated: "2024-11-27",
    },
    {
      company: "Vodafone Group plc",
      ticker: "VOD",
      shortPercent: 0.87,
      funds: ["Millennium Capital"],
      lastUpdated: "2024-11-27",
    },
  ];

  return NextResponse.json(data, { status: 200 });
}
