"use client";

import React, { useEffect, useState } from "react";

type ShortRow = {
  company: string;
  ticker: string;
  shortPercent: number;
  funds: string[];
  lastUpdated: string;
};

export default function ShortInterestCard() {
  const [rows, setRows] = useState<ShortRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/short-interest", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch short interest");
        const data = await res.json();
        setRows(data ?? []);
      } catch (err) {
        console.error(err);
        setError("Could not load short-interest data.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="relative rounded-3xl bg-slate-900/85 border border-slate-700/80 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.9)] backdrop-blur transition hover:border-rose-400/70 hover:shadow-[0_0_60px_rgba(248,113,113,0.45)] hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">
            Most Shorted UK Stocks &amp; ETFs
          </h2>
          <p className="mt-1 text-xs text-slate-400 max-w-sm">
            Names with heavy hedge-fund short interest based on FCA short-position data.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium bg-rose-500/10 text-rose-300 border-rose-500/40">
          Hedge fund pressure
        </span>
      </div>

      {loading && (
        <div className="mt-4 space-y-2">
          <SkeletonLine />
          <SkeletonLine className="w-4/5" />
          <SkeletonLine className="w-3/5" />
          <p className="text-[11px] text-slate-500 pt-1">
            Loading short-interest data…
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

      {!loading && !error && rows.length > 0 && (
        <div className="mt-1 space-y-2 text-xs">
          {rows.map((row, i) => {
            const tone =
              row.shortPercent >= 2
                ? "text-rose-300"
                : row.shortPercent >= 1
                ? "text-amber-300"
                : "text-slate-300";

            return (
              <div
                key={row.ticker + i}
                className="flex items-center justify-between gap-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 px-3 py-2"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-100 truncate">
                      {row.company}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      ({row.ticker})
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    {row.funds.length} hedge fund
                    {row.funds.length !== 1 ? "s" : ""} shorting this
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`text-[11px] font-semibold ${tone}`}>
                      {row.shortPercent.toFixed(2)}% short
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {row.funds.slice(0, 2).join(", ")}
                      {row.funds.length > 2 ? " + more" : ""}
                    </p>
                  </div>
                  <div className="text-right text-[10px] text-slate-500">
                    {new Date(row.lastUpdated).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && !error && rows.length === 0 && (
        <div className="mt-4 space-y-2">
          <SkeletonLine />
          <SkeletonLine className="w-4/5" />
          <p className="text-[11px] text-slate-500 pt-1">
            No short-interest positions loaded yet — hook this up to the FCA disclosures feed.
          </p>
        </div>
      )}

      <p className="mt-4 text-[11px] text-slate-500">
        Data shown for illustration — later swap this to live FCA public shorts data
        to monitor hedge-fund pressure in real time.
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
