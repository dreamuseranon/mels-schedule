"use client";
import { useState, useMemo } from "react";
import { DashboardData, ExamStudyGuide, ExamTopic, ConfidenceLevel } from "@/lib/types";
import { COURSE_COLOR } from "@/lib/colors";

interface Props {
  data: DashboardData;
  toggleSubtopic: (examKey: string, topicId: string, subtopicId: string) => void;
  setConfidence: (examKey: string, topicId: string, level: ConfidenceLevel) => void;
}

const CONFIDENCE_LABELS: Record<ConfidenceLevel, string> = {
  0: "Not started",
  1: "Needs work",
  2: "Getting there",
  3: "Solid",
  4: "Got it!",
};
const CONFIDENCE_COLORS: Record<ConfidenceLevel, string> = {
  0: "#d1d5db",
  1: "#f87171",
  2: "#fb923c",
  3: "#60a5fa",
  4: "#34d399",
};

function getDaysUntil(dateStr: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(dateStr + "T00:00:00");
  return Math.ceil((d.getTime() - today.getTime()) / 86400000);
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  });
}

function ConfidenceMeter({
  level, examKey, topicId, onSet,
}: {
  level: ConfidenceLevel;
  examKey: string;
  topicId: string;
  onSet: (examKey: string, topicId: string, l: ConfidenceLevel) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {([0, 1, 2, 3, 4] as ConfidenceLevel[]).map((i) => (
        <button
          key={i}
          title={CONFIDENCE_LABELS[i]}
          onClick={() => onSet(examKey, topicId, i === level ? 0 : i)}
          style={{
            width: 14, height: 14, borderRadius: "50%", border: "none",
            cursor: "pointer", padding: 0,
            background: i <= level ? CONFIDENCE_COLORS[level] : "#e5e7eb",
            transition: "background 0.2s, transform 0.15s",
            transform: i === level ? "scale(1.25)" : "scale(1)",
          }}
        />
      ))}
      <span style={{
        fontSize: "0.7rem", color: "rgba(100,80,140,0.6)",
        marginLeft: 4, fontFamily: "'Nunito', sans-serif",
      }}>
        {CONFIDENCE_LABELS[level]}
      </span>
    </div>
  );
}

function ResourceIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    ati: "📘", quizlet: "🃏", youtube: "▶️", skill: "🩺", powerpoint: "📊",
  };
  return <span>{icons[type] ?? "🔗"}</span>;
}

function TopicCard({
  topic, examKey, toggleSubtopic, setConfidence,
}: {
  topic: ExamTopic;
  examKey: string;
  toggleSubtopic: Props["toggleSubtopic"];
  setConfidence: Props["setConfidence"];
}) {
  const [open, setOpen] = useState(false);
  const doneSubs = topic.subtopics.filter((s) => s.done).length;
  const totalSubs = topic.subtopics.length;
  const pct = totalSubs === 0 ? 0 : Math.round((doneSubs / totalSubs) * 100);

  return (
    <div style={{
      borderRadius: 14, overflow: "hidden",
      border: "1.5px solid rgba(180,140,240,0.18)",
      marginBottom: 10,
      background: "rgba(255,255,255,0.6)",
      backdropFilter: "blur(8px)",
      transition: "box-shadow 0.2s",
    }}>
      {/* Topic header */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%", textAlign: "left", cursor: "pointer",
          background: "none", border: "none",
          padding: "14px 18px 10px",
          display: "flex", alignItems: "center", gap: 12,
        }}
      >
        {/* Progress donut */}
        <svg width="36" height="36" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="14" fill="none" stroke="#e9d5ff" strokeWidth="4" />
          <circle
            cx="18" cy="18" r="14" fill="none"
            stroke={pct === 100 ? "#34d399" : "#a87de8"}
            strokeWidth="4"
            strokeDasharray={`${pct * 0.879} 87.96`}
            strokeLinecap="round"
            transform="rotate(-90 18 18)"
            style={{ transition: "stroke-dasharray 0.5s" }}
          />
          <text x="18" y="22" textAnchor="middle"
            style={{ fontFamily: "Nunito, sans-serif", fontSize: "9px", fill: "#7c3aed", fontWeight: 700 }}>
            {pct}%
          </text>
        </svg>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Fredoka', sans-serif", fontSize: "1.02rem",
            color: "rgba(60,30,100,0.9)", fontWeight: 600,
          }}>
            {topic.title}
          </div>
          <div style={{ marginTop: 4 }}>
            <ConfidenceMeter
              level={topic.confidence}
              examKey={examKey}
              topicId={topic.id}
              onSet={setConfidence}
            />
          </div>
        </div>
        <span style={{ fontSize: "0.75rem", color: "rgba(140,100,200,0.5)", marginRight: 4 }}>
          {doneSubs}/{totalSubs}
        </span>
        <span style={{ color: "rgba(140,100,200,0.5)", fontSize: "0.9rem" }}>
          {open ? "▲" : "▼"}
        </span>
      </button>

      {/* Subtopics */}
      {open && (
        <div style={{ padding: "2px 18px 14px", borderTop: "1px solid rgba(180,140,240,0.12)" }}>
          {topic.subtopics.map((s) => (
            <label
              key={s.id}
              style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: "6px 0", cursor: "pointer",
                borderBottom: "1px solid rgba(180,140,240,0.06)",
              }}
            >
              <input
                type="checkbox"
                checked={s.done}
                onChange={() => toggleSubtopic(examKey, topic.id, s.id)}
                style={{ marginTop: 2, accentColor: "#a87de8", width: 15, height: 15 }}
              />
              <span style={{
                fontFamily: "'Nunito', sans-serif", fontSize: "0.88rem",
                color: s.done ? "rgba(100,80,150,0.4)" : "rgba(60,30,100,0.85)",
                textDecoration: s.done ? "line-through" : "none",
                lineHeight: 1.45,
              }}>
                {s.text}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function StudyPlanWidget({ guides }: { guides: ExamStudyGuide[] }) {
  const upcoming = useMemo(() =>
    guides
      .filter((g) => getDaysUntil(g.examDate) >= 0)
      .sort((a, b) => a.examDate.localeCompare(b.examDate))
      .slice(0, 3),
    [guides]
  );

  if (upcoming.length === 0) return null;

  return (
    <div style={{
      borderRadius: 18, padding: "20px 22px",
      background: "rgba(255,255,255,0.55)",
      backdropFilter: "blur(14px)",
      border: "1.5px solid rgba(180,140,240,0.2)",
      marginBottom: 24,
    }}>
      <div style={{
        fontFamily: "'Fredoka', sans-serif", fontSize: "1.05rem",
        color: "rgba(80,40,130,0.85)", marginBottom: 14,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span>📅</span> Daily Study Plan
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {upcoming.map((g) => {
          const days = getDaysUntil(g.examDate);
          const remaining = g.topics.reduce(
            (acc, t) => acc + t.subtopics.filter((s) => !s.done).length, 0
          );
          const hoursPerDay = days > 0 ? Math.ceil(g.estimatedHours / days * 10) / 10 : g.estimatedHours;
          const color = COURSE_COLOR[g.course] ?? "#a87de8";
          return (
            <div key={g.examKey} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "10px 14px", borderRadius: 12,
              background: `${color}14`,
              border: `1.5px solid ${color}30`,
            }}>
              <div style={{
                width: 6, height: 40, borderRadius: 3,
                background: color, flexShrink: 0,
              }} />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "'Fredoka', sans-serif", fontSize: "0.92rem",
                  color: "rgba(60,30,100,0.9)",
                }}>
                  {g.examTitle}
                </div>
                <div style={{
                  fontFamily: "'Nunito', sans-serif", fontSize: "0.76rem",
                  color: "rgba(100,80,140,0.6)", marginTop: 2,
                }}>
                  {formatDate(g.examDate)} · {remaining} subtopics left
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{
                  fontFamily: "'Fredoka', sans-serif", fontSize: "1.1rem",
                  color: color, lineHeight: 1,
                }}>
                  {hoursPerDay}h
                </div>
                <div style={{
                  fontFamily: "'Nunito', sans-serif", fontSize: "0.68rem",
                  color: "rgba(100,80,140,0.5)",
                }}>
                  {days === 0 ? "today!" : `/ day (${days}d left)`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ExamIntelligenceView({ data, toggleSubtopic, setConfidence }: Props) {
  const [selectedKey, setSelectedKey] = useState<string | null>(
    data.examGuides.length > 0 ? data.examGuides[0].examKey : null
  );
  const [courseFilter, setCourseFilter] = useState<"ALL" | "NUR304" | "NUR326">("ALL");

  const guides = useMemo(() => {
    return data.examGuides
      .filter((g) => courseFilter === "ALL" || g.course === courseFilter)
      .sort((a, b) => a.examDate.localeCompare(b.examDate));
  }, [data.examGuides, courseFilter]);

  const selected = data.examGuides.find((g) => g.examKey === selectedKey) ?? null;

  const totalDone = selected
    ? selected.topics.reduce((acc, t) => acc + t.subtopics.filter((s) => s.done).length, 0)
    : 0;
  const totalSubs = selected
    ? selected.topics.reduce((acc, t) => acc + t.subtopics.length, 0)
    : 0;
  const overallPct = totalSubs === 0 ? 0 : Math.round((totalDone / totalSubs) * 100);

  const daysUntil = selected ? getDaysUntil(selected.examDate) : null;

  const avgConfidence = selected && selected.topics.length > 0
    ? selected.topics.reduce((acc, t) => acc + t.confidence, 0) / selected.topics.length
    : 0;

  return (
    <div style={{ padding: "24px 28px", maxWidth: 1100, margin: "0 auto" }}>

      {/* Study plan widget */}
      <StudyPlanWidget guides={data.examGuides} />

      {/* Course filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["ALL", "NUR304", "NUR326"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setCourseFilter(f)}
            style={{
              padding: "6px 16px", borderRadius: 20,
              cursor: "pointer", fontFamily: "'Fredoka', sans-serif", fontSize: "0.9rem",
              background: courseFilter === f
                ? (f === "NUR304" ? COURSE_COLOR.NUR304 : f === "NUR326" ? COURSE_COLOR.NUR326 : "linear-gradient(90deg,#c49ae8,#7bbde8)")
                : "rgba(255,255,255,0.5)",
              color: courseFilter === f ? "white" : "rgba(80,50,120,0.7)",
              backdropFilter: "blur(8px)",
              border: courseFilter === f ? "none" : "1.5px solid rgba(180,140,240,0.2)",
              transition: "all 0.2s",
            }}
          >
            {f === "ALL" ? "All Exams" : f}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20, alignItems: "start" }}>

        {/* ── LEFT SIDEBAR: exam list ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {guides.map((g) => {
            const days = getDaysUntil(g.examDate);
            const done = g.topics.reduce((a, t) => a + t.subtopics.filter((s) => s.done).length, 0);
            const total = g.topics.reduce((a, t) => a + t.subtopics.length, 0);
            const pct = total === 0 ? 0 : Math.round((done / total) * 100);
            const color = COURSE_COLOR[g.course] ?? "#a87de8";
            const isSelected = g.examKey === selectedKey;
            return (
              <button
                key={g.examKey}
                onClick={() => setSelectedKey(g.examKey)}
                style={{
                  textAlign: "left", cursor: "pointer",
                  padding: "12px 14px", borderRadius: 14,
                  border: isSelected ? `2px solid ${color}` : "1.5px solid rgba(180,140,240,0.15)",
                  background: isSelected ? `${color}18` : "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: "0.78rem", fontWeight: 600,
                    background: color, color: "white",
                    padding: "2px 8px", borderRadius: 8,
                  }}>
                    {g.course}
                  </span>
                  <span style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "0.7rem",
                    color: days < 0 ? "rgba(150,150,150,0.5)"
                      : days <= 3 ? "#f87171"
                      : days <= 7 ? "#fb923c"
                      : "rgba(100,80,140,0.55)",
                  }}>
                    {days < 0 ? "passed" : days === 0 ? "today!" : `${days}d`}
                  </span>
                </div>
                <div style={{
                  fontFamily: "'Nunito', sans-serif", fontSize: "0.84rem",
                  color: "rgba(60,30,100,0.85)", lineHeight: 1.3, marginBottom: 6,
                }}>
                  {g.examTitle}
                </div>
                {/* Progress bar */}
                <div style={{ height: 4, borderRadius: 2, background: "#e9d5ff", overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 2,
                    width: `${pct}%`,
                    background: pct === 100 ? "#34d399" : color,
                    transition: "width 0.4s",
                  }} />
                </div>
                <div style={{
                  fontFamily: "'Nunito', sans-serif", fontSize: "0.68rem",
                  color: "rgba(120,90,160,0.5)", marginTop: 3,
                }}>
                  {pct}% complete
                </div>
              </button>
            );
          })}
        </div>

        {/* ── RIGHT PANEL: selected exam guide ── */}
        {selected ? (
          <div>
            {/* Header card */}
            <div style={{
              borderRadius: 18, padding: "22px 26px 18px",
              background: "rgba(255,255,255,0.62)",
              backdropFilter: "blur(16px)",
              border: "1.5px solid rgba(180,140,240,0.2)",
              marginBottom: 18,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{
                      fontFamily: "'Fredoka', sans-serif", fontSize: "0.82rem",
                      background: COURSE_COLOR[selected.course] ?? "#a87de8",
                      color: "white", padding: "3px 10px", borderRadius: 10,
                    }}>
                      {selected.course}
                    </span>
                    {daysUntil !== null && daysUntil >= 0 && (
                      <span style={{
                        fontFamily: "'Nunito', sans-serif", fontSize: "0.76rem",
                        color: daysUntil <= 3 ? "#f87171" : "rgba(100,80,140,0.6)",
                        fontWeight: 600,
                      }}>
                        {daysUntil === 0 ? "🚨 Today!" : `${daysUntil} days away`}
                      </span>
                    )}
                  </div>
                  <div style={{
                    fontFamily: "'Fredoka', sans-serif", fontSize: "1.5rem",
                    color: "rgba(50,20,90,0.9)", lineHeight: 1.2, marginBottom: 4,
                  }}>
                    {selected.examTitle}
                  </div>
                  <div style={{
                    fontFamily: "'Nunito', sans-serif", fontSize: "0.8rem",
                    color: "rgba(100,80,140,0.6)",
                  }}>
                    {formatDate(selected.examDate)} · {selected.estimatedHours}h estimated
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display: "flex", gap: 14 }}>
                  {[
                    { label: "Complete", value: `${overallPct}%`, color: overallPct === 100 ? "#34d399" : "#a87de8" },
                    { label: "Done", value: `${totalDone}/${totalSubs}`, color: "#6bb8e0" },
                    { label: "Confidence", value: avgConfidence.toFixed(1) + "/4", color: "#f093c0" },
                  ].map((s) => (
                    <div key={s.label} style={{
                      textAlign: "center", padding: "10px 14px", borderRadius: 12,
                      background: `${s.color}15`,
                      border: `1.5px solid ${s.color}30`,
                    }}>
                      <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.2rem", color: s.color }}>
                        {s.value}
                      </div>
                      <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.68rem", color: "rgba(100,80,140,0.5)" }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Tip */}
              <div style={{
                marginTop: 16, padding: "12px 16px", borderRadius: 12,
                background: "linear-gradient(120deg, rgba(180,130,255,0.1), rgba(107,184,224,0.1))",
                border: "1.5px solid rgba(180,130,255,0.18)",
                display: "flex", gap: 10, alignItems: "flex-start",
              }}>
                <span style={{ fontSize: "1.1rem" }}>✨</span>
                <div>
                  <div style={{
                    fontFamily: "'Fredoka', sans-serif", fontSize: "0.8rem",
                    color: "rgba(120,80,200,0.7)", marginBottom: 3,
                    textTransform: "uppercase", letterSpacing: "0.08em",
                  }}>
                    AI Study Tip
                  </div>
                  <div style={{
                    fontFamily: "'Nunito', sans-serif", fontSize: "0.84rem",
                    color: "rgba(60,30,100,0.8)", lineHeight: 1.55,
                  }}>
                    {selected.aiTip}
                  </div>
                </div>
              </div>

              {/* Resources */}
              {selected.resources.length > 0 && (
                <div style={{ marginTop: 14 }}>
                  <div style={{
                    fontFamily: "'Fredoka', sans-serif", fontSize: "0.82rem",
                    color: "rgba(100,70,160,0.6)", marginBottom: 8,
                    textTransform: "uppercase", letterSpacing: "0.08em",
                  }}>
                    Study Resources
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {selected.resources.map((r, i) => (
                      <a
                        key={i}
                        href={r.url ?? "#"}
                        target={r.url ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          padding: "5px 12px", borderRadius: 20,
                          fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem",
                          color: "rgba(80,40,140,0.85)",
                          background: "rgba(180,130,255,0.1)",
                          border: "1.5px solid rgba(180,130,255,0.22)",
                          textDecoration: "none",
                          transition: "background 0.2s",
                        }}
                      >
                        <ResourceIcon type={r.type} />
                        {r.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Topics */}
            <div style={{
              fontFamily: "'Fredoka', sans-serif", fontSize: "0.85rem",
              color: "rgba(100,70,160,0.6)", marginBottom: 12,
              textTransform: "uppercase", letterSpacing: "0.1em",
            }}>
              Topics & Subtopics
            </div>
            {selected.topics.map((t) => (
              <TopicCard
                key={t.id}
                topic={t}
                examKey={selected.examKey}
                toggleSubtopic={toggleSubtopic}
                setConfidence={setConfidence}
              />
            ))}
          </div>
        ) : (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            height: 200, color: "rgba(130,100,180,0.4)",
            fontFamily: "'Nunito', sans-serif", fontSize: "0.9rem",
          }}>
            Select an exam to get started ✦
          </div>
        )}
      </div>
    </div>
  );
}
