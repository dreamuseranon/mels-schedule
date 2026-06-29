"use client";
import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="mono text-sm tabular-nums px-3 py-1 rounded-full"
      style={{
        background: "linear-gradient(135deg, #FFE8F4, #EEE8FF)",
        border: "1px solid var(--border)",
        color: "var(--lav-d)",
        letterSpacing: "0.05em",
      }}
    >
      {time}
    </span>
  );
}
