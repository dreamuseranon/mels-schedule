"use client";
import { useState } from "react";
import { Item, Course, ItemType } from "@/lib/types";
import { COURSE_COLOR } from "@/lib/colors";

interface Props {
  defaultDate?: string;
  defaultCourse?: Course;
  onAdd: (item: Item) => void;
  onClose: () => void;
}

function id() { return Math.random().toString(36).slice(2, 10); }

const COURSES: Course[] = ["NUR304", "NUR326", "NUR347", "OTHER"];
const TYPES: ItemType[] = ["exam","medtable","casestudy","assignment","clinical","lab","appointment"];

export default function AddItemModal({ defaultDate, defaultCourse, onAdd, onClose }: Props) {
  const [form, setForm] = useState({
    course: defaultCourse ?? "NUR304" as Course,
    type: "assignment" as ItemType,
    title: "",
    date: defaultDate ?? new Date().toISOString().slice(0, 10),
    weight: "",
    notes: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date) return;
    onAdd({
      id: id(),
      course: form.course,
      type: form.type,
      title: form.title,
      date: form.date,
      weight: form.weight ? Number(form.weight) : undefined,
      notes: form.notes || undefined,
      done: false,
    });
    onClose();
  };

  const accent = COURSE_COLOR[form.course];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(61,44,30,0.25)" }}
      onClick={onClose}
    >
      <div
        className="rounded-lg p-6 w-full max-w-md shadow-xl"
        style={{ background: "var(--cream)", border: "1px solid var(--border)", borderTop: `4px solid ${accent}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mono text-lg mb-4" style={{ color: "var(--text)" }}>Add Item</h3>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs" style={{ color: "var(--muted)" }}>Course</label>
              <select
                value={form.course}
                onChange={(e) => set("course", e.target.value)}
                className="w-full mt-1 px-2 py-1.5 rounded text-sm"
                style={{ border: "1px solid var(--border)", background: "white" }}
              >
                {COURSES.map((c) => <option key={c} value={c}>{c === "OTHER" ? "Appointment / Other" : c}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs" style={{ color: "var(--muted)" }}>Type</label>
              <select
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
                className="w-full mt-1 px-2 py-1.5 rounded text-sm"
                style={{ border: "1px solid var(--border)", background: "white" }}
              >
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs" style={{ color: "var(--muted)" }}>Title *</label>
            <input
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Exam 3 – Neuro"
              className="w-full mt-1 px-2 py-1.5 rounded text-sm"
              style={{ border: "1px solid var(--border)", background: "white" }}
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs" style={{ color: "var(--muted)" }}>Date *</label>
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                className="w-full mt-1 px-2 py-1.5 rounded text-sm"
                style={{ border: "1px solid var(--border)", background: "white" }}
              />
            </div>
            <div className="flex-1">
              <label className="text-xs" style={{ color: "var(--muted)" }}>Weight (%)</label>
              <input
                type="number"
                min="0" max="100"
                value={form.weight}
                onChange={(e) => set("weight", e.target.value)}
                placeholder="—"
                className="w-full mt-1 px-2 py-1.5 rounded text-sm"
                style={{ border: "1px solid var(--border)", background: "white" }}
              />
            </div>
          </div>

          <div>
            <label className="text-xs" style={{ color: "var(--muted)" }}>Notes</label>
            <input
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="optional"
              className="w-full mt-1 px-2 py-1.5 rounded text-sm"
              style={{ border: "1px solid var(--border)", background: "white" }}
            />
          </div>

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="flex-1 py-2 rounded text-sm font-medium"
              style={{ background: accent, color: "white" }}
            >
              Add
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded text-sm"
              style={{ border: "1px solid var(--border)", background: "white" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
