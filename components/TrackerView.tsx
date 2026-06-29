"use client";
import { useState, useEffect } from "react";
import { DashboardData, Course, Item, ItemType } from "@/lib/types";
import { COURSE_COLOR, COURSE_LABEL, TYPE_EMOJI } from "@/lib/colors";
import { spawnConfetti } from "./Confetti";
import AddItemModal from "./AddItemModal";
import ProgressRing from "./ProgressRing";

interface Props {
  data: DashboardData;
  onToggle: (id: string) => void;
  onAdd: (item: Item) => void;
  onDelete: (id: string) => void;
}

// ─── helpers ───────────────────────────────────────────────────

const STUDY_TIME: Record<ItemType, string> = {
  exam:        "3–4 hrs to study",
  medtable:    "2–3 hrs to review",
  casestudy:   "1–2 hrs",
  assignment:  "2–3 hrs to write",
  clinical:    "1–2 hrs to prep",
  lab:         "1–2 hrs to prep",
  appointment: "~30 min to prepare",
};

function daysAway(date: string) {
  return Math.ceil((new Date(date + "T12:00:00").getTime() - Date.now()) / 86400000);
}
function fmtDate(date: string) {
  return new Date(date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Good night";
}
function fmtFullDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

function CoursePill({ course }: { course: Course }) {
  const c = COURSE_COLOR[course];
  return (
    <span className="course-pill" style={{ background: c + "28", color: c }}>
      {COURSE_LABEL[course]}
    </span>
  );
}

// ─── Hero card ─────────────────────────────────────────────────
function HeroCard({ semPct, weekNum }: { semPct: number; weekNum: number }) {
  const [gt, setGt] = useState("Good morning");
  const [dt, setDt] = useState("");
  useEffect(() => { setGt(greeting()); setDt(fmtFullDate()); }, []);

  return (
    <div
      className="widget-card p-6 flex items-center justify-between gap-6 flex-wrap"
      style={{
        background: "linear-gradient(135deg, rgba(255,181,200,0.35), rgba(212,176,255,0.35), rgba(160,216,255,0.3))",
        borderRadius: 28,
      }}
    >
      <div>
        <p className="fredoka text-3xl font-semibold" style={{ color: "var(--text)" }}>
          {gt}, Mel ✦
        </p>
        <p className="text-sm mt-0.5" style={{ color: "var(--muted)", fontFamily: "'Nunito',sans-serif" }}>
          {dt}
        </p>
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span
            className="fredoka text-xs px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.6)", color: "var(--lav-d)", border: "1px solid rgba(255,255,255,0.8)" }}
          >
            🎓 Week {weekNum} of 13
          </span>
          <span
            className="fredoka text-xs px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.6)", color: "var(--lav-d)", border: "1px solid rgba(255,255,255,0.8)" }}
          >
            NUR304 · NUR326 · NUR347
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ProgressRing pct={semPct} size={88} stroke={9}>
          <span className="fredoka font-bold" style={{ fontSize: 15, color: "var(--lav-d)" }}>
            {Math.round(semPct)}%
          </span>
          <span style={{ fontSize: 9, color: "var(--muted)", fontFamily: "'Nunito',sans-serif" }}>semester</span>
        </ProgressRing>
        <div>
          <p className="fredoka text-lg font-semibold" style={{ color: "var(--text)" }}>Semester</p>
          <p className="text-xs" style={{ color: "var(--muted)", fontFamily: "'Nunito',sans-serif" }}>
            May 18 – Aug 14
          </p>
          <p className="fredoka text-xs mt-1" style={{ color: "var(--lav-d)" }}>
            {Math.round(semPct)}% complete
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Stats row ─────────────────────────────────────────────────
interface Stat { icon: string; label: string; value: string | number; sub?: string; accent: string }

function StatCard({ icon, label, value, sub, accent }: Stat) {
  return (
    <div className="stat-card p-4 flex flex-col gap-1">
      <span style={{ fontSize: 20 }}>{icon}</span>
      <p className="fredoka font-bold text-2xl" style={{ color: accent }}>{value}</p>
      <p className="fredoka text-xs font-semibold" style={{ color: "var(--text)" }}>{label}</p>
      {sub && <p style={{ fontSize: 10, color: "var(--muted)", fontFamily: "'Nunito',sans-serif" }}>{sub}</p>}
    </div>
  );
}

// ─── Today widget ───────────────────────────────────────────────
function TodayWidget({ items, onToggle }: { items: Item[]; onToggle: (id: string) => void }) {
  const todayStr = new Date().toISOString().slice(0, 10);
  const todays = items.filter(it => it.date === todayStr);

  return (
    <div className="widget-card p-5 flex flex-col gap-3">
      <p className="fredoka text-base font-semibold" style={{ color: "var(--text)" }}>📅 Today</p>
      {todays.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-4 gap-1">
          <span style={{ fontSize: 28 }}>🌸</span>
          <p className="fredoka text-sm" style={{ color: "var(--muted)" }}>Nothing due today!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {todays.map(it => {
            return (
              <label key={it.id} className="flex items-start gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={it.done}
                  onChange={e => {
                    if (e.target.checked) {
                      const r = (e.target as HTMLElement).getBoundingClientRect();
                      spawnConfetti(r.left + 9, r.top + 9);
                    }
                    onToggle(it.id);
                  }}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div
                    className="text-sm font-medium"
                    style={{
                      color: it.done ? "var(--muted)" : "var(--text)",
                      textDecoration: it.done ? "line-through" : "none",
                      fontFamily: "'Nunito',sans-serif",
                    }}
                  >
                    {TYPE_EMOJI[it.type]} {it.title}
                  </div>
                  <CoursePill course={it.course} />
                </div>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Priority card ─────────────────────────────────────────────
function PriorityCard({ item, onToggle }: { item: Item | undefined; onToggle: (id: string) => void }) {
  if (!item) {
    return (
      <div className="widget-card p-6 flex flex-col items-center justify-center gap-2" style={{ minHeight: 160 }}>
        <span style={{ fontSize: 36 }}>🎉</span>
        <p className="fredoka text-lg font-semibold" style={{ color: "var(--lav-d)" }}>All caught up!</p>
        <p className="text-sm" style={{ color: "var(--muted)", fontFamily: "'Nunito',sans-serif" }}>No pending assignments.</p>
      </div>
    );
  }

  const days  = daysAway(item.date);
  const c     = COURSE_COLOR[item.course];
  const urgency = Math.max(0, Math.min(100, 100 - (days / 14) * 100));
  const urgencyColor = days <= 1 ? "#FF5A8A" : days <= 3 ? "#FF7AAE" : days <= 7 ? "var(--lav-d)" : "var(--sky-d)";

  return (
    <div
      className="widget-card p-6 flex flex-col gap-4"
      style={{ borderTop: `3px solid ${c}`, minHeight: 160 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="fredoka text-xs px-2.5 py-0.5 rounded-full font-semibold"
              style={{ background: "#FF7AAE22", color: "#FF5A8A" }}
            >
              🔥 Highest Priority
            </span>
            <CoursePill course={item.course} />
            <span
              className="course-pill"
              style={{ background: c + "22", color: c }}
            >
              {item.type}
            </span>
          </div>
          <h3
            className="fredoka font-semibold"
            style={{ fontSize: 20, color: "var(--text)", lineHeight: 1.2 }}
          >
            {item.title}
          </h3>
          {item.notes && (
            <p className="text-xs italic" style={{ color: "var(--muted)", fontFamily: "'Nunito',sans-serif" }}>
              {item.notes}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <p className="fredoka font-bold text-2xl" style={{ color: urgencyColor }}>
            {days <= 0 ? "Today!" : days === 1 ? "Tomorrow" : `${days}d`}
          </p>
          <p style={{ fontSize: 11, color: "var(--muted)", fontFamily: "'Nunito',sans-serif" }}>
            {fmtDate(item.date)}
          </p>
        </div>
      </div>

      {/* urgency bar */}
      <div>
        <div className="flex justify-between mb-1.5">
          <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "'Nunito',sans-serif" }}>
            Urgency
          </span>
          <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "'Nunito',sans-serif" }}>
            {STUDY_TIME[item.type]}
          </span>
        </div>
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: 8, background: "rgba(255,255,255,0.5)" }}
        >
          <div
            className="h-full rounded-full priority-bar"
            style={{
              "--w": `${urgency}%`,
              background: `linear-gradient(90deg, ${c}, ${urgencyColor})`,
            } as React.CSSProperties}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        {item.weight && (
          <span
            className="fredoka text-xs px-3 py-1 rounded-full"
            style={{ background: c + "22", color: c }}
          >
            {item.weight}% of grade
          </span>
        )}
        <button
          onClick={e => {
            const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
            spawnConfetti(r.left + r.width / 2, r.top);
            onToggle(item.id);
          }}
          className="fredoka text-sm font-semibold px-4 py-2 rounded-full ml-auto transition-all"
          style={{
            background: item.done
              ? "rgba(255,255,255,0.5)"
              : `linear-gradient(135deg, ${c}, var(--lav-d))`,
            color: item.done ? "var(--muted)" : "white",
            boxShadow: item.done ? "none" : `0 4px 16px ${c}44`,
          }}
        >
          {item.done ? "✓ Done!" : "Mark as Done →"}
        </button>
      </div>
    </div>
  );
}

// ─── Due this week ─────────────────────────────────────────────
function DueThisWeekWidget({ items, onToggle }: { items: Item[]; onToggle: (id: string) => void }) {
  return (
    <div className="widget-card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="fredoka text-base font-semibold" style={{ color: "var(--text)" }}>
          📆 Due This Week
        </p>
        <span
          className="fredoka text-xs px-2 py-0.5 rounded-full"
          style={{ background: "var(--lav)44", color: "var(--lav-d)" }}
        >
          {items.length}
        </span>
      </div>
      {items.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--muted)", fontFamily: "'Nunito',sans-serif" }}>
          Nothing due this week ✧
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {items.slice(0, 6).map(it => {
            const c = COURSE_COLOR[it.course];
            const d = daysAway(it.date);
            return (
              <div
                key={it.id}
                className="flex items-center gap-2.5 py-1.5 px-3 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.45)", borderLeft: `3px solid ${c}` }}
              >
                <input
                  type="checkbox"
                  checked={it.done}
                  onChange={e => {
                    if (e.target.checked) {
                      const r = (e.target as HTMLElement).getBoundingClientRect();
                      spawnConfetti(r.left + 9, r.top + 9);
                    }
                    onToggle(it.id);
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-semibold truncate"
                    style={{
                      color: it.done ? "var(--muted)" : "var(--text)",
                      textDecoration: it.done ? "line-through" : "none",
                      fontFamily: "'Nunito',sans-serif",
                    }}
                  >
                    {TYPE_EMOJI[it.type]} {it.title}
                  </p>
                  <p style={{ fontSize: 10, color: "var(--muted)", fontFamily: "'Nunito',sans-serif" }}>
                    {COURSE_LABEL[it.course]} · {fmtDate(it.date)}
                  </p>
                </div>
                <span
                  className="fredoka text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{
                    background: d <= 1 ? "#FF5A8A22" : d <= 3 ? "#FFB5C822" : "rgba(255,255,255,0.5)",
                    color: d <= 1 ? "#FF5A8A" : d <= 3 ? "var(--pink-d)" : "var(--muted)",
                  }}
                >
                  {d <= 0 ? "today" : d === 1 ? "tmrw" : `${d}d`}
                </span>
              </div>
            );
          })}
          {items.length > 6 && (
            <p className="fredoka text-xs text-center" style={{ color: "var(--muted)" }}>
              +{items.length - 6} more
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Upcoming exams ────────────────────────────────────────────
function UpcomingExamsWidget({ items }: { items: Item[] }) {
  const exams = items
    .filter(it => it.type === "exam" && !it.done && it.date >= new Date().toISOString().slice(0, 10))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  return (
    <div className="widget-card p-5 flex flex-col gap-3">
      <p className="fredoka text-base font-semibold" style={{ color: "var(--text)" }}>
        🎓 Upcoming Exams
      </p>
      {exams.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--muted)", fontFamily: "'Nunito',sans-serif" }}>
          No upcoming exams ✧
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {exams.map(it => {
            const d   = daysAway(it.date);
            const hot = d <= 3;
            const c   = COURSE_COLOR[it.course];
            return (
              <div
                key={it.id}
                className="flex items-center gap-3 py-2 px-3 rounded-2xl"
                style={{
                  background: hot ? `${c}18` : "rgba(255,255,255,0.45)",
                  border: hot ? `1px solid ${c}44` : "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: c }}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-semibold truncate"
                    style={{ color: "var(--text)", fontFamily: "'Nunito',sans-serif" }}
                  >
                    {it.title}
                  </p>
                  <p style={{ fontSize: 10, color: "var(--muted)", fontFamily: "'Nunito',sans-serif" }}>
                    {COURSE_LABEL[it.course]} · {fmtDate(it.date)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                  <span
                    className="fredoka font-bold text-sm"
                    style={{ color: hot ? "#FF5A8A" : c }}
                  >
                    {d <= 0 ? "Today!" : d === 1 ? "Tmrw" : `${d}d`}
                  </span>
                  {it.weight && (
                    <span style={{ fontSize: 9, color: "var(--muted)", fontFamily: "'Nunito',sans-serif" }}>
                      {it.weight}%
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Course column ─────────────────────────────────────────────
const COURSES: Course[] = ["NUR304", "NUR326", "NUR347", "OTHER"];

function CourseColumn({
  course, items, onToggle, onDelete, onAddClick,
}: {
  course: Course;
  items: Item[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAddClick: () => void;
}) {
  const accent  = COURSE_COLOR[course];
  const sorted  = [...items].sort((a, b) => a.date.localeCompare(b.date));
  const done    = items.filter(i => i.done).length;
  const pct     = items.length ? (done / items.length) * 100 : 0;

  return (
    <div
      className="widget-card flex flex-col"
      style={{ borderTop: `3px solid ${accent}`, minHeight: 320 }}
    >
      {/* header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="fredoka font-semibold text-sm" style={{ color: accent }}>
            {COURSE_LABEL[course]}
          </span>
          <span className="fredoka text-xs" style={{ color: "var(--muted)" }}>
            {done}/{items.length}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.4)" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${accent}, var(--lav-d))` }}
          />
        </div>
      </div>

      {/* items */}
      <div className="flex-1 flex flex-col overflow-y-auto px-2 pb-2" style={{ maxHeight: 380 }}>
        {sorted.length === 0 ? (
          <p className="text-xs text-center py-4" style={{ color: "var(--muted)", fontFamily: "'Nunito',sans-serif" }}>
            Nothing here yet
          </p>
        ) : sorted.map(it => {
          const d = daysAway(it.date);
          const overdue = !it.done && d < 0;
          const soon    = !it.done && d >= 0 && d <= 3;
          return (
            <div
              key={it.id}
              className="group flex items-start gap-2 py-2 px-2 rounded-xl transition-all"
              style={{
                borderLeft: `2px solid ${accent}`,
                marginBottom: 4,
                background: it.done ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.45)",
                opacity: it.done ? 0.55 : 1,
              }}
            >
              <input
                type="checkbox"
                checked={it.done}
                onChange={e => {
                  if (e.target.checked) {
                    const r = (e.target as HTMLElement).getBoundingClientRect();
                    spawnConfetti(r.left + 9, r.top + 9);
                  }
                  onToggle(it.id);
                }}
                className="mt-0.5 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs leading-snug"
                  style={{
                    color: it.done ? "var(--muted)" : "var(--text)",
                    textDecoration: it.done ? "line-through" : "none",
                    fontFamily: "'Nunito',sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {TYPE_EMOJI[it.type]} {it.title}
                </p>
                <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                  <span style={{ fontSize: 10, color: "var(--muted)", fontFamily: "'Nunito',sans-serif" }}>
                    {fmtDate(it.date)}
                  </span>
                  {it.weight && (
                    <span
                      className="course-pill"
                      style={{ background: accent + "22", color: accent, fontSize: 9, padding: "1px 5px" }}
                    >
                      {it.weight}%
                    </span>
                  )}
                  {overdue && (
                    <span className="course-pill" style={{ background: "#FF5A8A22", color: "#FF5A8A", fontSize: 9 }}>
                      overdue
                    </span>
                  )}
                  {soon && !overdue && (
                    <span className="course-pill" style={{ background: "#FFB5C822", color: "var(--pink-d)", fontSize: 9 }}>
                      soon
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => onDelete(it.id)}
                className="opacity-0 group-hover:opacity-40 hover:!opacity-70 text-xs transition-opacity"
                style={{ color: "var(--muted)" }}
                title="Delete"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      {/* add button */}
      <div className="px-3 pb-3">
        <button
          onClick={onAddClick}
          className="fredoka w-full text-xs py-2 rounded-full transition-all"
          style={{
            border: `1.5px dashed ${accent}77`,
            color: accent,
            background: accent + "11",
          }}
        >
          + Add
        </button>
      </div>
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────
export default function TrackerView({ data, onToggle, onAdd, onDelete }: Props) {
  const [addCourse, setAddCourse] = useState<Course | null>(null);

  const today       = new Date().toISOString().slice(0, 10);
  const weekFromNow = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);

  const undone       = data.items.filter(it => !it.done);
  const done         = data.items.filter(it => it.done);
  const dueThisWeek  = data.items.filter(it => it.date >= today && it.date <= weekFromNow && !it.done);
  const overdue      = undone.filter(it => it.date < today);

  // semester progress
  const semStart = new Date("2026-05-18").getTime();
  const semEnd   = new Date("2026-08-14").getTime();
  const semPct   = Math.min(100, Math.max(0, ((Date.now() - semStart) / (semEnd - semStart)) * 100));
  const weekNum  = Math.max(1, Math.min(13, Math.ceil((Date.now() - semStart) / (7 * 86400000))));

  // next exam
  const nextExam = undone
    .filter(it => it.type === "exam" && it.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  // highest priority: nearest deadline with high weight
  const highestPriority = undone
    .filter(it => it.date >= today)
    .sort((a, b) => {
      const da = daysAway(a.date), db = daysAway(b.date);
      if (Math.abs(da - db) > 3) return da - db;
      return (b.weight ?? 0) - (a.weight ?? 0);
    })[0];

  const stats: Stat[] = [
    {
      icon: "📚", label: "Remaining", value: undone.length,
      accent: "var(--lav-d)",
      sub: `${overdue.length} overdue`,
    },
    {
      icon: "📅", label: "Due This Week", value: dueThisWeek.length,
      accent: "var(--pink-d)",
      sub: "next 7 days",
    },
    {
      icon: "✅", label: "Completed", value: done.length,
      accent: "var(--sky-d)",
      sub: `of ${data.items.length} total`,
    },
    {
      icon: "🎓", label: "Semester", value: `${Math.round(semPct)}%`,
      accent: "var(--lav-d)",
      sub: `Week ${weekNum} of 13`,
    },
    {
      icon: "🔥", label: "Next Exam",
      value: nextExam ? `${daysAway(nextExam.date)}d` : "—",
      accent: nextExam && daysAway(nextExam.date) <= 3 ? "#FF5A8A" : "var(--text)",
      sub: nextExam ? nextExam.title.slice(0, 22) + "…" : "No exams soon",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Hero */}
      <HeroCard semPct={semPct} weekNum={weekNum} />

      {/* Stats row */}
      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* Bento row 1: Today | Priority */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "2fr 3fr" }}>
        <TodayWidget items={data.items} onToggle={onToggle} />
        <PriorityCard item={highestPriority} onToggle={onToggle} />
      </div>

      {/* Bento row 2: Due this week | Upcoming exams */}
      <div className="grid grid-cols-2 gap-4">
        <DueThisWeekWidget items={dueThisWeek} onToggle={onToggle} />
        <UpcomingExamsWidget items={data.items} />
      </div>

      {/* Course columns */}
      <div>
        <p className="fredoka text-base font-semibold mb-3" style={{ color: "var(--text)" }}>
          📋 All Assignments
        </p>
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
          {COURSES.map(course => (
            <CourseColumn
              key={course}
              course={course}
              items={data.items.filter(it => it.course === course)}
              onToggle={onToggle}
              onDelete={onDelete}
              onAddClick={() => setAddCourse(course)}
            />
          ))}
        </div>
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
