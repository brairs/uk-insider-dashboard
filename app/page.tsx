import BackgroundChart from "./components/BackgroundChart";
import TickerBar from "./components/TickerBar";
import Sparkline from "./components/Sparkline";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <main className="relative h-full bg-slate-950 text-slate-100">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),transparent_55%),radial-gradient(circle_at_bottom,_rgba(52,211,153,0.24),transparent_60%)]" />

        {/* MAIN CONTAINER */}
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col px-6 pt-8 pb-4 md:px-10 md:pt-10 md:pb-4">
          {/* Top label + top-right user header */}
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
              GLASS ANALYTICS
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <SignedOut>
                <a
                  href="/sign-in"
                  className="rounded-full bg-emerald-500 px-3 py-1 font-semibold text-slate-950 shadow-[0_0_16px_rgba(45,212,191,0.6)]"
                >
                  Sign in
                </a>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <button className="rounded-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500 px-3 py-1 text-[11px] font-semibold text-slate-950 shadow-[0_0_16px_rgba(45,212,191,0.6)]">
                Upgrade
              </button>
            </div>
          </div>

          {/* Ticker bar */}
          <TickerBar />

          {/* HERO */}
          <div className="mt-6 max-w-3xl space-y-3">
            <h1 className="text-3xl font-semibold leading-tight text-slate-50 md:text-4xl lg:text-5xl">
              Track{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                UK Stocks, ETFs &amp; Insider Trading
              </span>
            </h1>
            <p className="max-w-xl text-sm text-slate-400 md:text-base">
              Intuitive, fast, and data-rich. A unified dashboard for director
              dealings, hedge-fund short interest, market momentum, and
              smart-money activity across UK equities and index funds.
            </p>
          </div>

          {/* SEARCH + BUTTON */}
          <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-center">
            {/* Search bar with real input */}
            <div className="flex-1 rounded-full border border-emerald-500/40 bg-slate-900/80 px-5 py-3 text-sm shadow-[0_0_35px_rgba(16,185,129,0.35)] backdrop-blur transition hover:ring-emerald-400/50">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-medium text-emerald-300">
                  Search…
                </span>
                <input
                  type="text"
                  placeholder="e.g., VUAG, TSCO, VOD"
                  className="flex-1 bg-transparent text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none"
                />
              </div>
            </div>

            <button className="rounded-full bg-slate-900/80 px-4 py-2 text-xs font-medium text-slate-200 ring-1 ring-slate-600/60 backdrop-blur transition hover:ring-cyan-400/70">
              Advanced filters
            </button>
          </div>

          {/* APP HEADER NAV (the “roof”) – now pure navigation */}
          <div className="mt-5 flex items-center rounded-2xl bg-slate-900/70 px-5 py-2 ring-1 ring-slate-700/70 backdrop-blur shadow-[0_0_18px_rgba(15,23,42,0.5)]">
            {/* Left: logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 ring-1 ring-emerald-400/40 shadow-[0_0_10px_rgba(16,185,129,0.5)] text-xs font-semibold text-emerald-300">
                💠
              </div>
              <span className="text-[11px] font-medium text-slate-300">
                GLASS
              </span>
            </div>

            {/* Middle: nav links */}
            <nav className="ml-5 flex items-center gap-3 text-[11px] text-slate-400">
              <button className="rounded-full bg-slate-900/80 px-3 py-0.5 text-slate-100 ring-1 ring-emerald-400/60 shadow-[0_0_10px_rgba(16,185,129,0.35)]">
                Dashboard
              </button>
              <button className="px-3 py-0.5 transition hover:text-emerald-300">
                Screener
              </button>
              <button className="px-3 py-0.5 transition hover:text-emerald-300">
                Heatmap
              </button>
            </nav>
          </div>

          {/* TOP ROW: PORTFOLIO + 2 STATS */}
          <div className="mt-5 grid grid-cols-1 gap-2 text-xs md:grid-cols-4">
            {/* PORTFOLIO SNAPSHOT – spans 2 columns on desktop */}
            <div className="rounded-2xl bg-slate-900/70 px-4 py-3 ring-1 ring-slate-700/70 backdrop-blur transition hover:ring-emerald-400/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] md:col-span-2">
              <div className="flex items-center justify-between gap-4">
                {/* Left side: labels + legend */}
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-slate-400">
                    Portfolio
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    portfolio showing index funds, blue chips, and
                    high-conviction trades..
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span>Index funds · 50%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      <span>Blue chips · 30%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
                      <span>“Fun” trades · 20%</span>
                    </div>
                  </div>
                </div>

                {/* Right side: donut + value underneath */}
                <div className="flex flex-col items-center md:items-end">
                  <div className="h-16 w-16 md:h-18 md:w-18">
                    <svg viewBox="0 0 48 48" className="h-full w-full">
                      {/* base circle */}
                      <circle
                        cx="24"
                        cy="24"
                        r="14"
                        fill="none"
                        stroke="rgba(15,23,42,1)"
                        strokeWidth="8"
                      />
                      {/* index funds – 50% */}
                      <circle
                        cx="24"
                        cy="24"
                        r="14"
                        fill="none"
                        stroke="#34f8a4"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="44 44"
                        strokeDashoffset="0"
                      />
                      {/* blue chips – 30% */}
                      <circle
                        cx="24"
                        cy="24"
                        r="14"
                        fill="none"
                        stroke="#3dddf5"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="26 62"
                        strokeDashoffset="-44"
                      />
                      {/* fun trades – 20% */}
                      <circle
                        cx="24"
                        cy="24"
                        r="14"
                        fill="none"
                        stroke="#d573ff"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="18 70"
                        strokeDashoffset="-70"
                      />
                    </svg>
                  </div>

                  {/* value label BELOW the donut */}
                  <div className="mt-2 text-[11px] text-slate-400">
                    Total value{" "}
                    <span className="font-semibold text-slate-50">£24.3k</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FTSE 100 – sparkline card (free) */}
            <div className="rounded-2xl bg-slate-900/70 px-4 py-3 ring-1 ring-slate-700/70 backdrop-blur transition hover:ring-emerald-400/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]">
              <div className="text-[11px] uppercase tracking-wide text-slate-400">
                FTSE 100
              </div>
              <div className="mt-1 text-[11px] text-slate-500">
                Market Trend — Intraday Momentum
              </div>
              <div className="mt-2 h-6">
                <Sparkline
                  values={[0.12, 0.18, 0.16, 0.24, 0.22, 0.3, 0.28, 0.34]}
                  stroke="#22c55e"
                />
              </div>
            </div>

            {/* MARKET TREND – Pro, but subtle */}
            <div className="rounded-2xl bg-slate-900/70 px-4 py-3 ring-1 ring-slate-700/70 backdrop-blur transition hover:ring-emerald-400/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-slate-400">
                    Market trend
                  </div>
                  <div className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400">
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs">
                      +0.8%
                    </span>
                    Session move
                  </div>
                </div>

                {/* small Pro chip */}
                <button className="mt-1 inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-0.5 text-[10px] font-medium text-slate-200 ring-1 ring-slate-700/80 hover:ring-emerald-400/70 hover:bg-slate-900">
                  <span className="text-[11px]">🔒</span>
                  <span>Pro</span>
                </button>
              </div>

              {/* dimmed sparkline to hint “locked depth” but still look clean */}
              <div className="mt-2 h-6 opacity-60">
                <Sparkline
                  values={[0.2, 0.26, 0.24, 0.32, 0.3, 0.38, 0.36, 0.45]}
                  stroke="#22c55e"
                />
              </div>

              <p className="mt-1 text-[11px] text-slate-500">
                Realtime intraday trend available on Pro.
              </p>
            </div>
          </div>

          {/* MIDDLE CARDS */}
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* DIRECTOR DEALINGS – fully free */}
            <div className="rounded-2xl bg-slate-900/70 px-4 py-4 ring-1 ring-slate-700/70 backdrop-blur shadow-[0_0_24px_rgba(15,23,42,0.4)] transition hover:ring-emerald-400/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-50">
                  Latest Director Dealings
                </h2>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-medium text-emerald-300">
                  Insider flow
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  [
                    "Tesco plc (TSCO)",
                    "Ken Murphy — CEO",
                    "Buy £245,000 @ £2.45",
                    "29 Nov",
                  ],
                  [
                    "Lloyds Banking Group plc (LLOY)",
                    "Charlie Nunn — CEO",
                    "Buy £120,000 @ £0.47",
                    "28 Nov",
                  ],
                  [
                    "Vodafone Group plc (VOD)",
                    "Margherita Della Valle — CEO",
                    "Sell £95,000 @ £0.95",
                    "27 Nov",
                  ],
                ].map(([name, role, action, date], i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl bg-slate-900/60 px-3 py-2 transition hover:shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                  >
                    <div>
                      <div className="font-medium text-slate-50">{name}</div>
                      <div className="text-[11px] text-slate-400">{role}</div>
                    </div>
                    <div className="text-right">
                      <div
                        className={
                          action.startsWith("Sell")
                            ? "text-rose-300"
                            : "text-emerald-300"
                        }
                      >
                        {action}
                      </div>
                      <div className="text-[11px] text-slate-500">{date}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom mini-rectangle */}
              <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-900/60 px-3 py-2 text-[11px] text-slate-400">
                <span>
                  Live RNS / PDMR feed integrates automatically when enabled.
                </span>
                <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] text-slate-300">
                  RNS feed
                </span>
              </div>
            </div>

            {/* MOST SHORTED – partially paywalled list */}
            <div className="rounded-2xl bg-slate-900/70 px-4 py-4 ring-1 ring-slate-700/70 backdrop-blur shadow-[0_0_24px_rgba(15,23,42,0.4)] transition hover:ring-emerald-400/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-50">
                  Most Shorted UK Stocks &amp; ETFs
                </h2>
                <span className="rounded-full bg-rose-500/20 px-3 py-1 text-[11px] font-medium text-rose-300">
                  Hedge-Fund Activity
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  [
                    "Tesco plc (TSCO)",
                    "2 hedge funds shorting this",
                    "2.41% short",
                    "BlackRock, Citadel",
                    "28 Nov",
                  ],
                  [
                    "Rolls-Royce Holdings plc (RR.)",
                    "1 hedge fund shorting this",
                    "1.93% short",
                    "Marshall Wace",
                    "27 Nov",
                  ],
                  [
                    "Vodafone Group plc (VOD)",
                    "1 hedge fund shorting this",
                    "0.87% short",
                    "Millennium Capital",
                    "27 Nov",
                  ],
                ].map(([name, sub, pct, funds, date], i) => {
                  const locked = i >= 1; // blur everything except the first row (Tesco)

                  return (
                    <div
                      key={i}
                      className={`relative flex items-center justify-between rounded-xl bg-slate-900/60 px-3 py-2 transition ${
                        locked
                          ? "overflow-hidden"
                          : "hover:shadow-[0_0_12px_rgba(239,68,68,0.25)]"
                      }`}
                    >
                      {/* Left side */}
                      <div className={locked ? "blur-[3px]" : ""}>
                        <div className="font-medium text-slate-50">{name}</div>
                        <div className="text-[11px] text-slate-400">{sub}</div>
                      </div>

                      {/* Right side */}
                      <div
                        className={locked ? "text-right blur-[3px]" : "text-right"}
                      >
                        <div className="text-rose-300">{pct}</div>
                        <div className="text-[11px] text-slate-500">{funds}</div>
                        <div className="text-[11px] text-slate-500">{date}</div>
                      </div>

                      {/* Glass overlay – blur only */}
                      {locked && (
                        <div className="pointer-events-none absolute inset-0 backdrop-blur-sm" />
                      )}
                    </div>
                  );
                })}
              </div>
                     // forced redeploy


              {/* Single CTA at bottom */}
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-slate-900/90 px-4 py-2 text-[11px] font-medium text-slate-100 ring-1 ring-slate-700/80 hover:ring-emerald-400/70 hover:bg-slate-900">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 text-[10px]">
                  🔒
                </span>
                <span>Unlock with Pro.</span>
              </button>
            </div>
          </div>
        </div>

        {/* Waves */}
        <BackgroundChart />
      </main>
    </div>
  );
}
