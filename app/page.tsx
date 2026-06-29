"use client";
import { useState } from "react";
import { useDashboard } from "@/lib/useDashboard";
import HeroBrand from "@/components/HeroBrand";
import Clock from "@/components/Clock";
import GlitterBg from "@/components/GlitterBg";
import TrackerView from "@/components/TrackerView";
import CalendarView from "@/components/CalendarView";
import WeeklyTopicsView from "@/components/WeeklyTopicsView";
import AppointmentsView from "@/components/AppointmentsView";
import ExamIntelligenceView from "@/components/ExamIntelligenceView";
import MonthJump from "@/components/MonthJump";

type Tab = "tracker" | "calendar" | "topics" | "appointments" | "exams";

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: "tracker",      label: "Dashboard",        emoji: "🌸" },
  { id: "exams",        label: "Exam Intel",        emoji: "✦"  },
  { id: "calendar",     label: "Calendar",          emoji: "📅" },
  { id: "topics",       label: "Weekly Topics",     emoji: "✧"  },
  { id: "appointments", label: "Appointments",      emoji: "🩺" },
];

export default function Home() {
  const {
    data, saveStatus,
    toggleItem, addItem, deleteItem,
    toggleTopic,
    toggleSubtopic, setConfidence,
  } = useDashboard();
  const [tab, setTab] = useState<Tab>("tracker");
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth());
  const [calYear,  setCalYear]  = useState(() => new Date().getFullYear());

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="fredoka text-lg" style={{ color: "var(--lav-d)" }}>loading ✦</p>
      </div>
    );
  }

  const handleJump = (month: number, year: number) => {
    setCalMonth(month);
    setCalYear(year);
    setTab("calendar");
  };

  return (
    <div className="min-h-screen relative">
      <GlitterBg />

      <div className="relative" style={{ zIndex: 1 }}>

        {/* Premium brand header */}
        <HeroBrand />

        {/* Save status + clock bar */}
        <div
          className="px-4 py-2 flex items-center justify-between"
          style={{
            background: "rgba(255,255,255,0.35)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255,255,255,0.5)",
          }}
        >
          <span
            className="text-xs font-semibold"
            style={{
              color:
                saveStatus === "saving" ? "var(--lav-d)"
                : saveStatus === "saved"  ? "#5AAFE8"
                : saveStatus === "error"  ? "#E05080"
                : "transparent",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            {saveStatus === "saving" ? "✧ saving…"
              : saveStatus === "saved"  ? "✦ saved!"
              : saveStatus === "error"  ? "save error"
              : "·"}
          </span>
          <Clock />
        </div>

        {/* Month jump strip — only show when calendar is visible */}
        {tab === "calendar" && (
          <div
            className="px-4 py-2"
            style={{
              background: "rgba(255,255,255,0.3)",
              backdropFilter: "blur(8px)",
              borderBottom: "1px solid rgba(255,255,255,0.45)",
            }}
          >
            <div className="max-w-6xl mx-auto">
              <MonthJump onJump={handleJump} currentMonth={calMonth} currentYear={calYear} />
            </div>
          </div>
        )}

        {/* Nav tabs */}
        <div
          className="px-4"
          style={{
            background: "rgba(255,255,255,0.35)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255,255,255,0.5)",
          }}
        >
          <div className="max-w-6xl mx-auto flex overflow-x-auto">
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="fredoka text-sm transition-all"
                  style={{
                    fontWeight: active ? 600 : 400,
                    color: active
                      ? (t.id === "exams" ? "#9b59d4" : "var(--lav-d)")
                      : "var(--muted)",
                    background: "none",
                    border: "none",
                    borderBottom: active
                      ? `2.5px solid ${t.id === "exams" ? "#9b59d4" : "var(--lav-d)"}`
                      : "2.5px solid transparent",
                    cursor: "pointer",
                    padding: "12px 16px",
                    letterSpacing: "0.01em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.emoji} {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <main className="max-w-6xl mx-auto px-4 py-6">
          {tab === "tracker"      && <TrackerView      data={data} onToggle={toggleItem} onAdd={addItem} onDelete={deleteItem} />}
          {tab === "exams"        && <ExamIntelligenceView data={data} toggleSubtopic={toggleSubtopic} setConfidence={setConfidence} />}
          {tab === "calendar"     && <CalendarView     data={data} onToggle={toggleItem} onAdd={addItem} onDelete={deleteItem} activeMonth={{ year: calYear, month: calMonth }} />}
          {tab === "topics"       && <WeeklyTopicsView data={data} onToggleTopic={toggleTopic} />}
          {tab === "appointments" && <AppointmentsView data={data} onToggle={toggleItem} onAdd={addItem} onDelete={deleteItem} />}
        </main>

        <footer
          className="text-center py-4 fredoka text-sm"
          style={{
            color: "var(--lav-d)",
            borderTop: "1px solid rgba(255,255,255,0.4)",
            background: "rgba(255,255,255,0.2)",
          }}
        >
          ✦ Luminary · Nursing Student OS · you&apos;re doing amazing ✦
        </footer>
      </div>
    </div>
  );
}
