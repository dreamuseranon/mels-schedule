"use client";
import { Item } from "@/lib/types";
import { COURSE_COLOR, TYPE_EMOJI } from "@/lib/colors";
import { spawnConfetti } from "./Confetti";

interface Props {
  item: Item;
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void;
  showCourse?: boolean;
}

export default function ItemRow({ item, onToggle, onDelete, showCourse }: Props) {
  const accent = COURSE_COLOR[item.course];
  const daysAway = Math.ceil(
    (new Date(item.date).getTime() - Date.now()) / 86400000
  );
  const overdue = !item.done && daysAway < 0;
  const soon    = !item.done && daysAway >= 0 && daysAway <= 3;

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
    onToggle(item.id);
  };

  return (
    <div
      className="flex items-start gap-2 py-2 px-3 rounded"
      style={{
        borderLeft: `3px solid ${accent}`,
        background: item.done ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.6)",
        borderBottom: "1px solid var(--border)",
        opacity: item.done ? 0.55 : 1,
        transition: "opacity 0.2s",
      }}
    >
      <input
        type="checkbox"
        checked={item.done}
        onChange={handleCheck}
        className="mt-0.5"
        style={item.done ? { background: accent, borderColor: accent } : {}}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm" style={{ color: item.done ? "var(--muted)" : "var(--text)" }}>
            <span className="mr-1">{TYPE_EMOJI[item.type] ?? "•"}</span>
            <span className={item.done ? "line-through" : ""}>{item.title}</span>
          </span>
          {item.weight ? (
            <span
              className="text-xs px-1.5 py-0.5 rounded"
              style={{ background: accent + "33", color: accent, fontFamily: "monospace" }}
            >
              {item.weight}%
            </span>
          ) : null}
          {overdue && (
            <span className="text-xs font-bold px-1.5 py-0.5 rounded-full" style={{ background: "#FFD8E8", color: "#C0306A" }}>overdue</span>
          )}
          {soon && (
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "#EEE0FF", color: "var(--lav-d)" }}>✧ due soon</span>
          )}
          {showCourse && (
            <span className="text-xs px-1 rounded" style={{ background: accent + "22", color: accent }}>
              {item.course}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            {new Date(item.date + "T12:00:00").toLocaleDateString("en-US", {
              weekday: "short", month: "short", day: "numeric",
            })}
          </span>
          {item.notes && (
            <span className="text-xs italic" style={{ color: "var(--muted)" }}>
              — {item.notes}
            </span>
          )}
        </div>
      </div>
      {onDelete && (
        <button
          onClick={() => onDelete(item.id)}
          className="text-xs opacity-30 hover:opacity-70 transition-opacity ml-1"
          title="Delete"
        >
          ✕
        </button>
      )}
    </div>
  );
}
