// app/page.tsx
import BackgroundChart from "./components/BackgroundChart";

export default function MarketDashboardPage() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(45,212,191,0.12),_transparent_55%)]" />

      {/* WAVE BACKGROUND (only from BackgroundChart now) */}
      <BackgroundChart />

      {/* PAGE CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-40">
        {/* Heading + search */}
        <header className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.25em] uppercase text-emerald-400/70">
              UK Market Dashboard
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Track{" "}
              <span className="text-emerald-400">
                UK Stocks, ETFs &amp; Insider Activity
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-xl">
              A clean, exchange-style dashboard for monitoring director
              dealings, hedge-fund short interest, and signals across UK stocks
              and index funds like Vanguard and iShares.
            </p>
          </div>

          {/* Search + filters */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1 relative">
                <input
                  className="w-full rounded-full bg-slate-900/80 border border-slate-700/70 px-5 py-3 text-sm placeholder:text-slate-500 shadow-[0_0_32px_rgba(15,23,42,0.9)] outline-none transition focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-400/80"
                  placeholder="Search a UK stock or ETF…   e.g. VUAG, TSCO, VOD"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-emerald-500 text-xs px-3 py-1 font-medium text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.7)]">
                  Ctrl + K
                </div>
              </div>

              <button className="inline-flex items-center justify-center rounded-full bg-slate-900/80 border border-slate-700/80 px-4 py-2 text-xs font-medium text-slate-200 transition hover:border-emerald-400/80 hover:text-emerald-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.55)] hover:-translate-y-0.5">
                Advanced filters
              </button>
            </div>

            {/* Stat chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <StatPill
                label="FTSE 100"
                sublabel="Session move (placeholder)"
                value="+0.8%"
                tone="green"
              />
              <StatPill
                label="Short interest"
                sublabel="Hedge fund pressure high"
                value="Elevated"
                tone="red"
              />
              <StatPill
                label="UK ETFs tracked"
                sublabel="Vanguard, iShares & more"
                value="214"
                tone="amber"
              />
            </div>
          </div>
        </header>

        {/* MAIN BIG CARDS */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardCard
            title="Latest Director Dealings"
            badge="Insider flow"
            badgeTone="green"
            description="Recent director buys and sells across UK-listed companies and investment trusts."
          />

          <DashboardCard
            title="Most Shorted UK Stocks & ETFs"
            badge="Hedge fund pressure"
            badgeTone="red"
            description="Names with heavy hedge-fund short interest based on FCA short-position data."
          />
        </section>

        {/* BOTTOM ROW */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          <MiniCard
            title="Live signals"
            subtitle="Flow, momentum & anomalies"
            pill="Signal feed"
          >
            <SkeletonLine />
            <SkeletonLine className="w-4/5" />
            <SkeletonLine className="w-3/5" />
          </MiniCard>

          <MiniCard
            title="Watchlist"
            subtitle="Your pinned UK tickers"
            pill="Coming soon"
          >
            <SkeletonLine />
            <SkeletonLine className="w-2/3" />
            <SkeletonLine className="w-3/4" />
          </MiniCard>

          <MiniCard
            title="News & filings"
            subtitle="RNS, earnings & filings"
            pill="RNS feed"
          >
            <SkeletonLine />
            <SkeletonLine className="w-5/6" />
            <SkeletonLine className="w-2/3" />
          </MiniCard>
        </section>
      </div>
    </main>
  );
}

/* ----------------- small reusable components ----------------- */

type StatTone = "green" | "red" | "amber";

function StatPill(props: {
  label: string;
  sublabel: string;
  value: string;
  tone: StatTone;
}) {
  const toneClasses: Record<StatTone, string> = {
    green:
      "bg-emerald-500/10 text-emerald-300 border-emerald-500/40 shadow-[0_0_28px_rgba(16,185,129,0.45)]",
    red: "bg-rose-500/10 text-rose-300 border-rose-500/40 shadow-[0_0_28px_rgba(244,63,94,0.5)]",
    amber:
      "bg-amber-500/10 text-amber-300 border-amber-500/40 shadow-[0_0_28px_rgba(245,158,11,0.45)]",
  };

  return (
    <div className="group flex items-center gap-3 rounded-2xl bg-slate-900/80 border border-slate-700/70 px-4 py-3 transition hover:border-emerald-400/60 hover:bg-slate-900/95 hover:shadow-[0_0_38px_rgba(16,185,129,0.35)] hover:-translate-y-0.5">
      <div className="flex-1">
        <p className="text-[11px] uppercase tracking-wide text-slate-400">
          {props.label}
        </p>
        <p className="text-xs text-slate-500">{props.sublabel}</p>
      </div>
      <div
        className={
          "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold transition group-hover:scale-105 " +
          toneClasses[props.tone]
        }
      >
        {props.value}
      </div>
    </div>
  );
}

function DashboardCard(props: {
  title: string;
  badge: string;
  badgeTone: "green" | "red";
  description: string;
}) {
  const toneClasses =
    props.badgeTone === "green"
      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/40"
      : "bg-rose-500/10 text-rose-300 border-rose-500/40";

  return (
    <div className="relative rounded-3xl bg-slate-900/85 border border-slate-700/80 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.9)] backdrop-blur transition hover:border-emerald-400/70 hover:shadow-[0_0_60px_rgba(16,185,129,0.45)] hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">
            {props.title}
          </h2>
          <p className="mt-1 text-xs text-slate-400 max-w-sm">
            {props.description}
          </p>
        </div>
        <span
          className={
            "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium transition " +
            toneClasses +
            " hover:shadow-[0_0_26px_rgba(16,185,129,0.65)]"
          }
        >
          {props.badge}
        </span>
      </div>

      <div className="mt-5 space-y-2">
        <SkeletonLine />
        <SkeletonLine className="w-4/5" />
        <SkeletonLine className="w-3/5" />
      </div>

      <p className="mt-4 text-[11px] text-slate-500">
        No data yet — backend not connected. UI is ready for live trades.
      </p>
    </div>
  );
}

function MiniCard(props: {
  title: string;
  subtitle: string;
  pill: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-slate-900/85 border border-slate-800/80 p-4 backdrop-blur shadow-[0_18px_60px_rgba(15,23,42,0.95)] transition hover:border-emerald-400/70 hover:shadow-[0_0_45px_rgba(16,185,129,0.4)] hover:-translate-y-1">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-xs font-semibold text-slate-100">
            {props.title}
          </h3>
          <p className="mt-1 text-[11px] text-slate-500">{props.subtitle}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-slate-800/80 border border-slate-700/80 px-2.5 py-1 text-[10px] text-slate-300">
          {props.pill}
        </span>
      </div>
      <div className="mt-4 space-y-2">{props.children}</div>
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
