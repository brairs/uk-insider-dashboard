// app/components/TickerBar.tsx

const TICKER_ITEMS = [
  { symbol: "FTSE 100", value: "+0.81%", direction: "up" },
  { symbol: "FTSE 250", value: "+0.42%", direction: "up" },
  { symbol: "TSCO", value: "+1.24%", direction: "up" },
  { symbol: "RR.", value: "-0.63%", direction: "down" },
  { symbol: "LLOY", value: "+0.37%", direction: "up" },
  { symbol: "BARC", value: "-0.15%", direction: "down" },
];

export default function TickerBar() {
  // duplicate items so the scroll loops smoothly
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="ticker-container mt-2 mb-1 rounded-full bg-slate-900/60 border-y border-slate-100/10 px-4 py-1 text-[11px] text-slate-300 backdrop-blur flex items-center gap-4">
      {/* Live pill on the left */}
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Live market
      </span>

      {/* Scrolling content */}
      <div className="relative flex-1 overflow-hidden">
        <div className="ticker-track inline-flex gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="font-medium text-slate-100">{item.symbol}</span>
              <span
                className={
                  "flex items-center gap-1 " +
                  (item.direction === "up"
                    ? "text-emerald-300"
                    : "text-rose-300")
                }
              >
                {item.direction === "up" ? "▲" : "▼"}
                {item.value}
              </span>
              <span className="text-slate-600">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
