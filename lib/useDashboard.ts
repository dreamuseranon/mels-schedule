"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { DashboardData, Item, ConfidenceLevel } from "./types";
import { buildWeeks } from "./seedData";

const DEBOUNCE_MS = 1200;

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstLoad = useRef(true);

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const persist = useCallback((next: DashboardData) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setSaveStatus("saving");
      try {
        await fetch("/api/data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(next),
        });
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } catch {
        setSaveStatus("error");
      }
    }, DEBOUNCE_MS);
  }, []);

  const update = useCallback(
    (fn: (d: DashboardData) => DashboardData) => {
      setData((prev) => {
        if (!prev) return prev;
        const next = fn(prev);
        if (!firstLoad.current) persist(next);
        firstLoad.current = false;
        return next;
      });
    },
    [persist]
  );

  // ── Items ──────────────────────────────────────────────────────
  const toggleItem = useCallback(
    (id: string) => update((d) => ({
      ...d,
      items: d.items.map((it) => it.id === id ? { ...it, done: !it.done } : it),
    })), [update]);

  const addItem = useCallback(
    (item: Item) => update((d) => ({ ...d, items: [...d.items, item] })),
    [update]);

  const deleteItem = useCallback(
    (id: string) => update((d) => ({ ...d, items: d.items.filter((it) => it.id !== id) })),
    [update]);

  // ── Weekly topics ──────────────────────────────────────────────
  const toggleTopic = useCallback(
    (weekNum: number, topicId: string) => update((d) => ({
      ...d,
      weeks: d.weeks.map((w) =>
        w.weekNum !== weekNum ? w : {
          ...w,
          topics: w.topics.map((t) => t.id === topicId ? { ...t, done: !t.done } : t),
        }
      ),
    })), [update]);

  const changeSemesterStart = useCallback(
    (date: string) => update((d) => ({
      ...d,
      semesterStart: date,
      weeks: buildWeeks(date).map((newW, i) => ({
        ...newW,
        topics: d.weeks[i]?.topics ?? newW.topics,
      })),
    })), [update]);

  // ── Exam Intelligence ──────────────────────────────────────────
  const toggleSubtopic = useCallback(
    (examKey: string, topicId: string, subtopicId: string) =>
      update((d) => ({
        ...d,
        examGuides: d.examGuides.map((g) =>
          g.examKey !== examKey ? g : {
            ...g,
            topics: g.topics.map((t) =>
              t.id !== topicId ? t : {
                ...t,
                subtopics: t.subtopics.map((s) =>
                  s.id !== subtopicId ? s : { ...s, done: !s.done }
                ),
              }
            ),
          }
        ),
      })),
    [update]);

  const setConfidence = useCallback(
    (examKey: string, topicId: string, level: ConfidenceLevel) =>
      update((d) => ({
        ...d,
        examGuides: d.examGuides.map((g) =>
          g.examKey !== examKey ? g : {
            ...g,
            topics: g.topics.map((t) =>
              t.id !== topicId ? t : { ...t, confidence: level }
            ),
          }
        ),
      })),
    [update]);

  return {
    data, saveStatus,
    toggleItem, addItem, deleteItem,
    toggleTopic, changeSemesterStart,
    toggleSubtopic, setConfidence,
  };
}
