// components/FloatingSocialProof.tsx
"use client";

const badges = [
  {
    label: "Beginner-friendly",
    sub: "Clean, simple dashboard",
    className:
      "top-24 right-24 animate-float-slow",
  },
  {
    label: "Serious tools",
    sub: "For UK stocks & ETFs",
    className:
      "top-64 left-[18%] animate-float-medium",
  },
  {
    label: "Trusted by UK investors",
    sub: "Back-tested signals",
    className:
      "top-[55%] right-[18%] animate-float-fast",
  },
];

export function FloatingSocialProof() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-visible hidden md:block">
        {badges.map((badge, i) => (
          <div
            key={i}
            className={`pointer-events-none absolute rounded-full border border-emerald-400/30 bg-slate-900/80 px-4 py-2 shadow-lg shadow-emerald-500/10 backdrop-blur-md ${badge.className}`}
          >
            <div className="flex items-center gap-2 text-xs">
              <span className="text-amber-300 text-sm">★★★★★</span>
              <span className="font-medium text-slate-50">
                {badge.label}
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-slate-400">
              {badge.sub}
            </p>
          </div>
        ))}
      </div>

      {/* floating keyframes */}
      <style jsx global>{`
        @keyframes float-slow {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -14px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes float-medium {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(10px, -10px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes float-fast {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(-12px, -6px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .animate-float-slow {
          animation: float-slow 16s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 13s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 11s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
