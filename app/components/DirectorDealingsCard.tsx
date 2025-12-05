"use client";

import React, { useEffect, useState } from "react";

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

export default function DirectorDealingsCard() {
  const [deals, setDeals] = useState<DirectorDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/director-dealings", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setDeals(data.deals ?? []);
      } catch (err) {
        console.error(err);
        setError("Could not load insider trades.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const hasData = deals.length > 0;

  return (
    <div className="relative rounded-3xl bg-slate-900/85 border border-slate-700/80 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.9)] backdrop-blur transition hover:border-emerald-400/70 hover:shadow-[0_0_60px_rgba(16,185,129,0.45)] hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">
            Latest Director Dealings
          </h2>
          <p className="mt-1 text-xs text-slate-400 max-w-sm">
            Recent director buys and sells across UK-listed companies and
            investment trusts.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border-emerald-500/40">
          Insider flow
        </span>
      </div>

      {loading && (
        <div className="mt-4 space-y-2">
          <SkeletonLine />
          <SkeletonLine className="w-4/5" />
          <SkeletonLine className="w-3/5" />
          <p className="text-[11px] text-slate-500 pt-1">
            Loading latest insider trades…
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="mt-4 space-y-2">
          <p className="text-[11px] text-rose-300">{error}</p>
          <SkeletonLine />
          <SkeletonLine className="w-4/5" />
        </div>
      )}

      {!loading && !error && hasData && (
        <div className="mt-1 space-y-2 text-xs">
          {deals.slice(0, 4).map((deal) => (
            <div
              key={deal.id}
              className="flex items-center justify-between gap-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 px-3 py-2"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-100 truncate">
                    {deal.company}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    ({deal.ticker})
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">
                  {deal.director} · {deal.role}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p
                    className={
                      "text-[11px] font-semibold " +
                      (deal.type === "Buy"
                        ? "text-emerald-300"
                        : "text-rose-300")
                    }
                  >
                    {deal.type} £{deal.valueGBP.toLocaleString("en-GB")}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    @ £{deal.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right text-[10px] text-slate-500">
                  {new Date(deal.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && !hasData && (
        <div className="mt-4 space-y-2">
          <SkeletonLine />
          <SkeletonLine className="w-4/5" />
          <SkeletonLine className="w-3/5" />
          <p className="text-[11px] text-slate-500 pt-1">
            No insider trades loaded yet — check your data source connection.
          </p>
        </div>
      )}

      <p className="mt-4 text-[11px] text-slate-500">
        Data shown for illustration — later you can swap this to FCA PDMR / RNS
        feeds for live director transactions.
      </p>
    </div>
  );
}

function SkeletonLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={
        "h-2 rounded-full bg-slate-800/90 overflow-hidden relative " +
        className
      }
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
