"use client";
import { useState } from "react";
import { DashboardData, Item } from "@/lib/types";
import ItemRow from "./ItemRow";
import AddItemModal from "./AddItemModal";

interface Props {
  data: DashboardData;
  onToggle: (id: string) => void;
  onAdd: (item: Item) => void;
  onDelete: (id: string) => void;
}

export default function AppointmentsView({ data, onToggle, onAdd, onDelete }: Props) {
  const [showAdd, setShowAdd] = useState(false);

  const appointments = data.items
    .filter((it) => it.course === "OTHER")
    .sort((a, b) => a.date.localeCompare(b.date));

  const upcoming = appointments.filter((it) => !it.done && it.date >= new Date().toISOString().slice(0, 10));
  const past = appointments.filter((it) => it.done || it.date < new Date().toISOString().slice(0, 10));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Personal doctor appointments & other events
        </p>
        <button
          onClick={() => setShowAdd(true)}
          className="text-sm px-3 py-1.5 rounded"
          style={{ background: "#D9A85C22", border: "1px solid #D9A85C88", color: "#D9A85C" }}
        >
          + Add Appointment
        </button>
      </div>

      {upcoming.length > 0 && (
        <div>
          <h3 className="mono text-sm font-bold mb-2" style={{ color: "#D9A85C" }}>
            🩺 Upcoming
          </h3>
          <div
            className="rounded-lg overflow-hidden"
            style={{ border: "1px solid var(--border)", borderLeft: "4px solid #D9A85C" }}
          >
            {upcoming.map((it) => (
              <ItemRow key={it.id} item={it} onToggle={onToggle} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h3 className="mono text-sm font-bold mb-2" style={{ color: "var(--muted)" }}>
            Past / Done
          </h3>
          <div
            className="rounded-lg overflow-hidden"
            style={{ border: "1px solid var(--border)", opacity: 0.7 }}
          >
            {past.map((it) => (
              <ItemRow key={it.id} item={it} onToggle={onToggle} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}

      {appointments.length === 0 && (
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          No appointments yet. Add one above.
        </p>
      )}

      {showAdd && (
        <AddItemModal
          defaultCourse="OTHER"
          onAdd={onAdd}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
}
