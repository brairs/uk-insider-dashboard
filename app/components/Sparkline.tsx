"use client";

interface SparklineProps {
  values: number[];   // 0–1 range
  stroke: string;
}

export default function Sparkline({ values, stroke }: SparklineProps) {
  const width = 80;
  const height = 26;

  // keep the line in a comfortable band (not too tall)
  const minY = height * 0.35;
  const maxY = height * 0.8;

  const points = values.map((v, i) => {
    const x = (i / (values.length - 1 || 1)) * width;
    const y = maxY - v * (maxY - minY);
    return { x, y };
  });

  if (points.length < 2) return null;

  // smooth-ish but not crazy wavy
  const path = points.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const prev = arr[i - 1];
    const dx = point.x - prev.x;

    const cp1x = prev.x + dx * 0.4;
    const cp1y = prev.y;
    const cp2x = prev.x + dx * 0.6;
    const cp2y = point.y;

    return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${point.x},${point.y}`;
  }, "");

  return (
    <svg width={width} height={height} className="overflow-visible">
      {/* baseline */}
      <line
        x1={0}
        y1={maxY}
        x2={width}
        y2={maxY}
        stroke="rgba(148,163,184,0.18)"
        strokeWidth={1}
      />
      {/* soft glow */}
      <path
        d={path}
        stroke={stroke}
        strokeWidth={2}
        strokeOpacity={0.25}
        fill="none"
        className="blur-[2px]"
      />
      {/* main line */}
      <path
        d={path}
        stroke={stroke}
        strokeWidth={1.35}
        fill="none"
      />
    </svg>
  );
}
