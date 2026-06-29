"use client";
import { DashboardData } from "@/lib/types";
import { spawnConfetti } from "./Confetti";

interface Props {
  data: DashboardData;
  onToggleTopic: (weekNum: number, topicId: string) => void;
}

function currentWeekNum(semesterStart: string): number {
  const start = new Date(semesterStart).getTime();
  const now = Date.now();
  const diff = Math.floor((now - start) / (7 * 86400000));
  return Math.max(1, Math.min(13, diff + 1));
}

export default function WeeklyTopicsView({ data, onToggleTopic }: Props) {
  const currentWeek = currentWeekNum(data.semesterStart);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        13-week checklist — review topics for each week. Current week highlighted.
      </p>

      {data.weeks.map((week) => {
        const isCurrent = week.weekNum === currentWeek;
        const done = week.topics.filter((t) => t.done).length;
        const total = week.topics.length;
        const startLabel = new Date(week.startDate + "T12:00:00").toLocaleDateString("en-US", {
          month: "short", day: "numeric",
        });
        const endLabel = new Date(week.endDate + "T12:00:00").toLocaleDateString("en-US", {
          month: "short", day: "numeric",
        });

        return (
          <div
            key={week.weekNum}
            className="rounded-lg"
            style={{
              border: `1px solid ${isCurrent ? "#93AC7E" : "var(--border)"}`,
              borderLeft: `4px solid ${isCurrent ? "#93AC7E" : "var(--border)"}`,
              background: isCurrent ? "rgba(147,172,126,0.07)" : "rgba(255,255,255,0.5)",
            }}
          >
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="mono font-bold text-sm" style={{ color: isCurrent ? "#93AC7E" : "var(--muted)" }}>
                  Week {week.weekNum}
                  {isCurrent && (
                    <span
                      className="ml-2 text-xs px-1.5 py-0.5 rounded"
                      style={{ background: "#93AC7E", color: "white" }}
                    >
                      current
                    </span>
                  )}
                </span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  {startLabel} – {endLabel}
                </span>
              </div>
              <span className="text-xs mono" style={{ color: "var(--muted)" }}>
                {done}/{total}
              </span>
            </div>

            {/* progress */}
            <div className="mx-4 h-1 rounded-full mb-2" style={{ background: "var(--border)" }}>
              <div
                className="h-1 rounded-full transition-all"
                style={{
                  background: "#93AC7E",
                  width: total ? `${(done / total) * 100}%` : "0%",
                }}
              />
            </div>

            <div className="flex flex-col gap-0.5 px-4 pb-3">
              {week.topics.map((topic) => (
                <label
                  key={topic.id}
                  className="flex items-center gap-2 py-1 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={topic.done}
                    onChange={(e) => {
                      if (e.target.checked) {
                        const rect = (e.target as HTMLElement).getBoundingClientRect();
                        spawnConfetti(rect.left + 8, rect.top + 8);
                      }
                      onToggleTopic(week.weekNum, topic.id);
                    }}
                  />
                  <span
                    className="text-sm transition-all"
                    style={{
                      color: topic.done ? "var(--muted)" : "var(--text)",
                      textDecoration: topic.done ? "line-through" : "none",
                    }}
                  >
                    {topic.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
