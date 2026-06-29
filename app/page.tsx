"use client";
import { useState } from "react";
import { useDashboard } from "@/lib/useDashboard";
import LandscapeBanner from "@/components/LandscapeBanner";
import Clock from "@/components/Clock";
import TrackerView from "@/components/TrackerView";
import CalendarView from "@/components/CalendarView";
import WeeklyTopicsView from "@/components/WeeklyTopicsView";
import AppointmentsView from "@/components/AppointmentsView";
import MonthJump from "@/components/MonthJump";

type Tab = "tracker" | "calendar" | "topics" | "appointments";

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: "tracker",      label: "Tracker",        emoji: "🌸" },
  { id: "calendar",     label: "Calendar",        emoji: "🗓️" },
  { id: "topics",       label: "Weekly Topics",   emoji: "✨" },
  { id: "appointments", label: "Appointments",    emoji: "🩺" },
];

export default function Home() {
  const { data, saveStatus, toggleItem, addItem, deleteItem, toggleTopic } = useDashboard();
  const [tab, setTab] = useState<Tab>("tracker");
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth());
  const [calYear, setCalYear] = useState(() => new Date().getFullYear());

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="mono text-sm" style={{ color: "var(--muted)" }}>loading…</p>
      </div>
    );
  }

  const handleJump = (month: number, year: number) => {
    setCalMonth(month);
    setCalYear(year);
    setTab("calendar");
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Landscape banner */}
      <div className="w-full" style={{ borderBottom: "1px solid var(--border)" }}>
        <LandscapeBanner />
      </div>

      {/* Header */}
      <header
        className="px-4 py-4"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="mono text-2xl font-bold tracking-tight holo">
              ✦ Mel&apos;s Schedule ✦
            </h1>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
              NUR304 · NUR326 · NUR347 · Summer 2026
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="text-xs"
              style={{
                color:
                  saveStatus === "saving" ? "var(--lavender)"
                  : saveStatus === "saved" ? "var(--sky-d)"
                  : saveStatus === "error" ? "#E05080"
                  : "transparent",
              }}
            >
              {saveStatus === "saving" ? "✧ saving…"
                : saveStatus === "saved" ? "✦ saved"
                : saveStatus === "error" ? "save error"
                : "·"}
            </span>
            <Clock />
          </div>
        </div>
      </header>

      {/* Month jump strip */}
      <div
        className="px-4 py-2"
        style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.4)" }}
      >
        <div className="max-w-6xl mx-auto">
          <MonthJump onJump={handleJump} currentMonth={calMonth} currentYear={calYear} />
        </div>
      </div>

      {/* Nav tabs */}
      <div
        className="px-4"
        style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.5)" }}
      >
        <div className="max-w-6xl mx-auto flex">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="text-sm transition-all"
              style={{
                fontFamily: "monospace",
                fontWeight: tab === t.id ? "bold" : "normal",
                color: tab === t.id ? "var(--lav-d)" : "var(--muted)",
                borderBottom: tab === t.id ? "2px solid var(--lavender)" : "2px solid transparent",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "12px 16px",
              }}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {tab === "tracker" && (
          <TrackerView
            data={data}
            onToggle={toggleItem}
            onAdd={addItem}
            onDelete={deleteItem}
          />
        )}
        {tab === "calendar" && (
          <CalendarView
            data={data}
            onToggle={toggleItem}
            onAdd={addItem}
            onDelete={deleteItem}
            activeMonth={{ year: calYear, month: calMonth }}
          />
        )}
        {tab === "topics" && (
          <WeeklyTopicsView data={data} onToggleTopic={toggleTopic} />
        )}
        {tab === "appointments" && (
          <AppointmentsView
            data={data}
            onToggle={toggleItem}
            onAdd={addItem}
            onDelete={deleteItem}
          />
        )}
      </main>

      {/* Footer */}
      <footer
        className="text-center py-4 text-xs"
        style={{ color: "var(--muted)", borderTop: "1px solid var(--border)" }}
      >
        ✦ you&apos;re doing amazing ✦
      </footer>
    </div>
  );
}
