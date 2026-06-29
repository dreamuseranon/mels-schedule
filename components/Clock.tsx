"use client";
import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="fredoka text-sm tabular-nums px-4 py-1 rounded-full"
      style={{
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(8px)",
        border: "1.5px solid rgba(255,255,255,0.8)",
        color: "var(--lav-d)",
        letterSpacing: "0.04em",
        boxShadow: "0 2px 12px rgba(168,122,232,0.15)",
      }}
    >
      {time}
    </span>
  );
}
