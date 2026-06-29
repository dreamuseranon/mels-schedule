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
  const thisYear = now.getFullYear();

  return (
    <div className="flex gap-1 overflow-x-auto pb-1">
      {MONTHS.map((name, i) => {
        const isActive = i === currentMonth && thisYear === currentYear;
        const isNow = i === thisMonth && thisYear === currentYear;
        return (
          <button
            key={i}
            onClick={() => onJump(i, thisYear)}
            className="flex-shrink-0 flex flex-col items-center px-2 py-1.5 rounded text-xs transition-all"
            style={{
              border: `1px solid ${isActive ? "#7FAFC9" : "var(--border)"}`,
              background: isActive ? "#7FAFC922" : "rgba(255,255,255,0.6)",
              color: isNow ? "#7FAFC9" : "var(--text)",
              fontFamily: "monospace",
              fontWeight: isNow || isActive ? "bold" : "normal",
              minWidth: 40,
            }}
          >
            {name}
            {isNow && (
              <span
                className="w-1 h-1 rounded-full mt-0.5"
                style={{ background: "#7FAFC9", display: "block" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
