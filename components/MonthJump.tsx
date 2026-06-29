"use client";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

interface Props {
  onJump: (month: number, year: number) => void;
  currentMonth: number;
  currentYear: number;
}

export default function MonthJump({ onJump, currentMonth, currentYear }: Props) {
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear  = now.getFullYear();

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1">
      {MONTHS.map((name, i) => {
        const isActive = i === currentMonth;
        const isNow    = i === thisMonth && thisYear === currentYear;
        return (
          <button
            key={i}
            onClick={() => onJump(i, thisYear)}
            className="fredoka flex-shrink-0 px-2.5 py-1 rounded-full text-xs transition-all"
            style={{
              background: isActive
                ? "linear-gradient(135deg, var(--pink), var(--lav))"
                : "rgba(255,255,255,0.55)",
              color: isActive ? "white" : isNow ? "var(--lav-d)" : "var(--muted)",
              border: isNow && !isActive ? "1.5px solid var(--lav)" : "1.5px solid transparent",
              fontWeight: isActive || isNow ? 700 : 500,
              backdropFilter: "blur(6px)",
              boxShadow: isActive ? "0 2px 10px rgba(168,122,232,0.3)" : "none",
            }}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}
