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
          className="rounded-2xl p-3 shimmer-card kawaii-card"
          style={{ borderLeft: "4px solid var(--pink-d)" }}
        >
          <p className="fredoka text-base font-semibold mb-2" style={{ color: "var(--lav-d)" }}>
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
              className="rounded-2xl flex flex-col shimmer-card kawaii-card"
              style={{
                borderTop: `4px solid ${accent}`,
                boxShadow: `0 4px 24px ${accent}33`,
              }}
            >
              <div className="px-3 pt-3 pb-2 flex items-center justify-between">
                <span className="fredoka font-semibold text-base" style={{ color: accent }}>
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
