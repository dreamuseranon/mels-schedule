"use client";
import { useState } from "react";
import { DashboardData, Course, Item } from "@/lib/types";
import { COURSE_COLOR, COURSE_LABEL } from "@/lib/colors";
import ItemRow from "./ItemRow";
import AddItemModal from "./AddItemModal";

interface Props {
  data: DashboardData;
  onToggle: (id: string) => void;
  onAdd: (item: Item) => void;
  onDelete: (id: string) => void;
}

const COLUMNS: Course[] = ["NUR304", "NUR326", "NUR347", "OTHER"];

function isUrgent(item: Item) {
  if (item.done) return false;
  const days = Math.ceil((new Date(item.date).getTime() - Date.now()) / 86400000);
  return days <= 3;
}

export default function TrackerView({ data, onToggle, onAdd, onDelete }: Props) {
  const [addCourse, setAddCourse] = useState<Course | null>(null);

  const urgent = data.items.filter(isUrgent).sort(
    (a, b) => a.date.localeCompare(b.date)
  );

  const byCourseSorted = (course: Course) =>
    data.items
      .filter((it) => it.course === course)
      .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="flex flex-col gap-4">
      {/* Due Soon & Overdue banner */}
      {urgent.length > 0 && (
        <div
          className="rounded-xl p-3 shimmer-card"
          style={{
            background: "linear-gradient(135deg, #FFE8F4, #EEE0FF)",
            border: "1px solid var(--border)",
            borderLeft: "4px solid var(--pink)",
          }}
        >
          <p className="mono text-sm font-bold mb-2" style={{ color: "var(--lav-d)" }}>
            🌸 Due Soon & Overdue
          </p>
          <div className="flex flex-col gap-1">
            {urgent.map((it) => (
              <ItemRow key={it.id} item={it} onToggle={onToggle} showCourse />
            ))}
          </div>
        </div>
      )}

      {/* Four columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {COLUMNS.map((course) => {
          const accent = COURSE_COLOR[course];
          const items = byCourseSorted(course);
          const done = items.filter((i) => i.done).length;
          return (
            <div
              key={course}
              className="rounded-xl flex flex-col shimmer-card"
              style={{
                border: "1px solid var(--border)",
                borderTop: `4px solid ${accent}`,
                background: "rgba(255,255,255,0.72)",
                boxShadow: `0 2px 16px ${accent}22`,
              }}
            >
              <div className="px-3 pt-3 pb-2 flex items-center justify-between">
                <span className="mono font-bold text-sm" style={{ color: accent }}>
                  {COURSE_LABEL[course]}
                </span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  {done}/{items.length}
                </span>
              </div>

              {/* progress bar */}
              <div className="mx-3 h-1 rounded-full mb-2" style={{ background: "var(--border)" }}>
                <div
                  className="h-1 rounded-full transition-all"
                  style={{
                    background: accent,
                    width: items.length ? `${(done / items.length) * 100}%` : "0%",
                  }}
                />
              </div>

              <div className="flex flex-col flex-1 overflow-y-auto" style={{ maxHeight: 420 }}>
                {items.length === 0 ? (
                  <p className="text-xs px-3 py-2" style={{ color: "var(--muted)" }}>
                    Nothing here yet.
                  </p>
                ) : (
                  items.map((it) => (
                    <ItemRow key={it.id} item={it} onToggle={onToggle} onDelete={onDelete} />
                  ))
                )}
              </div>

              <div className="p-2">
                <button
                  onClick={() => setAddCourse(course)}
                  className="w-full text-xs py-1.5 rounded transition-opacity hover:opacity-80"
                  style={{
                    border: `1px dashed ${accent}88`,
                    color: accent,
                    background: accent + "11",
                  }}
                >
                  + Add
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {addCourse && (
        <AddItemModal
          defaultCourse={addCourse}
          onAdd={onAdd}
          onClose={() => setAddCourse(null)}
        />
      )}
    </div>
  );
}
