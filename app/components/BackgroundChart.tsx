"use client";
import React, { useMemo } from "react";

export default function BackgroundChart() {
  const { basePathD, boostedPathD } = useMemo(() => {
    const maxX = 1400;

    const makePath = (amplitude: number, boostedRight: boolean) => {
      const points: string[] = [];
      const frequency = 0.015;
      const baseY = 270; // <<< raised 10px to avoid bottom clipping

      for (let x = 0; x <= maxX; x += 20) {
        const t = x / maxX;

        let y =
          baseY +
          Math.sin(x * frequency) * amplitude +
          Math.cos(x * frequency * 0.6) * (amplitude * 0.4);

        if (boostedRight && t > 0.7) {
          const k = (t - 0.7) / 0.3;
          const clamped = Math.max(0, Math.min(1, k));
          const extra = Math.pow(clamped, 2.3) * 70;
          y -= extra;
        }

        points.push(`${x},${y}`);
      }

      return `M${points.join(" L")}`;
    };

    return {
      basePathD: makePath(40, false),
      boostedPathD: makePath(40, true),
    };
  }, []);

  const futureLayers = [
    { scale: 0.99,  dy: -8, opacity: 0.22, width: 2.0, blur: 1.8, dur: "11s" },
    { scale: 0.975, dy: -16, opacity: 0.19, width: 1.9, blur: 2.1, dur: "12.5s" },
    { scale: 0.96,  dy: -24, opacity: 0.16, width: 1.8, blur: 2.4, dur: "14s" },
    { scale: 0.945, dy: -32, opacity: 0.14, width: 1.7, blur: 2.8, dur: "15.5s" },
    { scale: 0.93,  dy: -40, opacity: 0.11, width: 1.55, blur: 3.2, dur: "17s" },
    { scale: 0.915, dy: -48, opacity: 0.09, width: 1.4, blur: 3.6, dur: "18.5s" },
    { scale: 0.9,   dy: -56, opacity: 0.07, width: 1.3, blur: 4.0, dur: "20s" },
    { scale: 0.885, dy: -64, opacity: 0.05, width: 1.15, blur: 4.4, dur: "21.5s" },
  ];

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-[360px] z-[1]">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1400 380"   // increased height
        preserveAspectRatio="none"
      >
        {futureLayers.map((layer, i) => {
          const isLast = i === futureLayers.length - 1;
          const d = isLast ? boostedPathD : basePathD;

          return (
            <g
              key={i}
              transform={`scale(${layer.scale}) translate(0, ${layer.dy})`}
            >
              <path
                d={d}
                fill="none"
                stroke={`rgba(45,212,191,${layer.opacity})`}
                strokeWidth={layer.width}
                style={{
                  filter: `blur(${layer.blur}px) drop-shadow(0 0 5px rgba(45,212,191,${
                    layer.opacity * 0.5
                  }))`,
                }}
              />
              <circle r="2.1" fill="rgba(94,234,212,0.32)">
                <animateMotion dur={layer.dur} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          );
        })}

        <g transform="scale(0.99) translate(0, 26)">
          <path
            d={basePathD}
            fill="none"
            stroke="rgba(45,212,191,0.18)"
            strokeWidth="2"
            style={{
              filter: "blur(2.2px) drop-shadow(0 0 4px rgba(45,212,191,0.22))",
            }}
          />
        </g>
        <g transform="scale(0.97) translate(0, 46)">
          <path
            d={basePathD}
            fill="none"
            stroke="rgba(45,212,191,0.1)"
            strokeWidth="2"
            style={{
              filter: "blur(2.8px) drop-shadow(0 0 3px rgba(45,212,191,0.16))",
            }}
          />
        </g>

        <g>
          <path
            d={basePathD}
            fill="none"
            stroke="rgba(45,212,191,0.72)"
            strokeWidth="3"
            style={{
              filter:
                "drop-shadow(0 0 6px rgba(45,212,191,0.6)) drop-shadow(0 0 14px rgba(45,212,191,0.32))",
            }}
          />
          <circle r="4" fill="rgb(94,234,212)">
            <animateMotion dur="7.5s" repeatCount="indefinite" path={basePathD} />
            <animate attributeName="r" values="3;5;3" dur="1.4s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
}
