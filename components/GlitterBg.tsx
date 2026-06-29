"use client";
import { useEffect, useState } from "react";

const CHARS = ["✦","✧","⋆","✦","✧","⋆","✦"];
const COLORS = ["#FF7AAE","#A87AE8","#5AAFE8","#A8F0DC","#FFD4A0","#FF9BE0","#FFF0A0","#D4B0FF"];

interface Star {
  id: number;
  left: string;
  top: string;
  size: number;
  color: string;
  char: string;
  duration: number;
  delay: number;
}

export default function GlitterBg() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 10 + Math.random() * 12,
        color: COLORS[i % COLORS.length],
        char: CHARS[i % CHARS.length],
        duration: 2.5 + Math.random() * 3.5,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  return (
    <>
      {stars.map((s) => (
        <div
          key={s.id}
          className="bg-star"
          style={{
            left: s.left,
            top: s.top,
            fontSize: s.size,
            color: s.color,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            filter: `drop-shadow(0 0 3px ${s.color})`,
          }}
        >
          {s.char}
        </div>
      ))}
    </>
  );
}
