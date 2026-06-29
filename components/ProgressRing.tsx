"use client";
import { useEffect, useState } from "react";

interface Props {
  pct: number;        // 0–100
  size?: number;      // px, default 80
  stroke?: number;    // default 8
  color?: string;
  trackColor?: string;
  children?: React.ReactNode;
}

export default function ProgressRing({
  pct,
  size = 80,
  stroke = 8,
  color = "url(#ringGrad)",
  trackColor = "rgba(255,255,255,0.4)",
  children,
}: Props) {
  const [animated, setAnimated] = useState(0);
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - animated / 100);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(pct), 80);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#FF7AAE" />
            <stop offset="50%"  stopColor="#A87AE8" />
            <stop offset="100%" stopColor="#5AAFE8" />
          </linearGradient>
        </defs>
        {/* track */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={trackColor} strokeWidth={stroke}
        />
        {/* progress */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
        />
      </svg>
      {children && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column",
        }}>
          {children}
        </div>
      )}
    </div>
  );
}
