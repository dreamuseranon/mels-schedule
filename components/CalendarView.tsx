"use client";
import { useState } from "react";
import { DashboardData, Item } from "@/lib/types";
import { COURSE_COLOR } from "@/lib/colors";
import ItemRow from "./ItemRow";
import AddItemModal from "./AddItemModal";

interface Props {
  data: DashboardData;
  onToggle: (id: string) => void;
  onAdd: (item: Item) => void;
  onDelete: (id: string) => void;
  activeMonth?: { year: number; month: number };
}

function fmt(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

const MONTH_NAMES = ["January","February","March","April","May","June",
  "July","August","September","October","November","December"];
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function CalendarView({ data, onToggle, onAdd, onDelete, activeMonth }: Props) {
  const today = new Date();
  const [year, setYear] = useState(activeMonth?.year ?? today.getFullYear());
  const [month, setMonth] = useState(activeMonth?.month ?? today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [addModal, setAddModal] = useState(false);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const itemsByDate: Record<string, Item[]> = {};
  data.items.forEach((it) => {
    if (!itemsByDate[it.date]) itemsByDate[it.date] = [];
    itemsByDate[it.date].push(it);
  });

  const todayStr = today.toISOString().slice(0, 10);

  const prev = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
    setSelectedDate(null);
  };
  const next = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
    setSelectedDate(null);
  };

  const selectedItems = selectedDate ? (itemsByDate[selectedDate] ?? []) : [];

  return (
    <div className="flex flex-col gap-4">
      {/* month nav */}
      <div className="flex items-center gap-3">
        <button
          onClick={prev}
          className="px-3 py-1 rounded text-sm"
          style={{ border: "1px solid var(--border)", background: "white" }}
        >‹</button>
        <h2 className="mono text-lg font-bold flex-1 text-center">
          {MONTH_NAMES[month]} {year}
        </h2>
        <button
          onClick={next}
          className="px-3 py-1 rounded text-sm"
          style={{ border: "1px solid var(--border)", background: "white" }}
        >›</button>
      </div>

      {/* grid */}
      <div
        className="rounded-lg overflow-hidden"
        style={{ border: "1px solid var(--border)", background: "rgba(255,255,255,0.5)" }}
      >
        {/* day headers */}
        <div className="grid grid-cols-7">
          {DAY_NAMES.map((d) => (
            <div key={d} className="text-center text-xs py-2 mono font-bold"
              style={{ color: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
              {d}
            </div>
          ))}
        </div>

        {/* cells */}
        <div className="grid grid-cols-7">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`e${i}`} className="border-b border-r" style={{ borderColor: "var(--border)", minHeight: 72 }} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const d = i + 1;
            const dateStr = fmt(year, month, d);
            const dayItems = itemsByDate[dateStr] ?? [];
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDate;

            return (
              <div
                key={d}
                onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                className="p-1.5 border-b border-r cursor-pointer transition-colors"
                style={{
                  borderColor: "var(--border)",
                  minHeight: 72,
                  background: isSelected
                    ? "#FAF5EC"
                    : isToday
                    ? "rgba(217,168,92,0.08)"
                    : undefined,
                }}
              >
                <div
                  className="text-xs font-bold mb-1 w-6 h-6 flex items-center justify-center rounded-full"
                  style={{
                    fontFamily: "monospace",
                    background: isToday ? "#D9A85C" : "transparent",
                    color: isToday ? "white" : "var(--text)",
                  }}
                >
                  {d}
                </div>
                <div className="flex flex-wrap gap-0.5">
                  {dayItems.map((it) => (
                    <div
                      key={it.id}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: COURSE_COLOR[it.course],
                        opacity: it.done ? 0.35 : 1,
                      }}
                      title={it.title}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* selected day panel */}
      {selectedDate && (
        <div
          className="rounded-lg p-4"
          style={{ border: "1px solid var(--border)", background: "rgba(255,255,255,0.7)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="mono font-bold">
              {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", {
                weekday: "long", month: "long", day: "numeric",
              })}
            </h3>
            <button
              onClick={() => setAddModal(true)}
              className="text-xs px-3 py-1 rounded"
              style={{ background: "#D9A85C22", border: "1px solid #D9A85C88", color: "#D9A85C" }}
            >
              + Add
            </button>
          </div>
          {selectedItems.length === 0 ? (
            <p className="text-sm" style={{ color: "var(--muted)" }}>Nothing scheduled.</p>
          ) : (
            <div className="flex flex-col gap-1">
              {selectedItems.map((it) => (
                <ItemRow key={it.id} item={it} onToggle={onToggle} onDelete={onDelete} showCourse />
              ))}
            </div>
          )}
        </div>
      )}

      {addModal && (
        <AddItemModal
          defaultDate={selectedDate ?? undefined}
          onAdd={onAdd}
          onClose={() => setAddModal(false)}
        />
      )}
    </div>
  );
}
