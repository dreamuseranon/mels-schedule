import { DashboardData, Item, Week } from "./types";

function id() {
  return Math.random().toString(36).slice(2, 10);
}

const rawItems: Omit<Item, "id" | "done">[] = [
  // ── NUR304 ──────────────────────────────────────────────────────────────
  { course: "NUR304", type: "assignment", title: "Module 1 Discussion Post", date: "2026-05-25", weight: 5 },
  { course: "NUR304", type: "medtable",   title: "Med Table #1 – Cardiac Meds", date: "2026-05-29", weight: 5 },
  { course: "NUR304", type: "exam",       title: "Exam 1 – Cardiac/Respiratory", date: "2026-06-05", weight: 20 },
  { course: "NUR304", type: "medtable",   title: "Med Table #2 – Respiratory Meds", date: "2026-06-12", weight: 5 },
  { course: "NUR304", type: "casestudy",  title: "Case Study – Heart Failure", date: "2026-06-19", weight: 10 },
  { course: "NUR304", type: "exam",       title: "Exam 2 – Renal/Endocrine", date: "2026-07-03", weight: 20 },
  { course: "NUR304", type: "medtable",   title: "Med Table #3 – Diuretics & Insulin", date: "2026-07-10", weight: 5 },
  { course: "NUR304", type: "assignment", title: "Concept Map – Diabetes Management", date: "2026-07-17", weight: 10 },
  { course: "NUR304", type: "exam",       title: "Final Exam (comprehensive)", date: "2026-08-07", weight: 25 },

  // ── NUR326 ──────────────────────────────────────────────────────────────
  { course: "NUR326", type: "clinical",   title: "Clinical Orientation", date: "2026-05-22", weight: 0 },
  { course: "NUR326", type: "assignment", title: "Care Plan #1", date: "2026-06-02", weight: 10 },
  { course: "NUR326", type: "lab",        title: "Lab Skills Check-off #1", date: "2026-06-09", weight: 10 },
  { course: "NUR326", type: "exam",       title: "Midterm – Fundamentals", date: "2026-06-26", weight: 25 },
  { course: "NUR326", type: "assignment", title: "Care Plan #2 – Post-op Patient", date: "2026-07-07", weight: 10 },
  { course: "NUR326", type: "lab",        title: "Lab Skills Check-off #2 – IV & Wound", date: "2026-07-14", weight: 10 },
  { course: "NUR326", type: "casestudy",  title: "Case Study – Sepsis Protocol", date: "2026-07-21", weight: 10 },
  { course: "NUR326", type: "clinical",   title: "Clinical Final Day", date: "2026-07-30", weight: 15 },
  { course: "NUR326", type: "exam",       title: "Final Exam", date: "2026-08-06", weight: 25 },

  // ── NUR347 ──────────────────────────────────────────────────────────────
  { course: "NUR347", type: "assignment", title: "Reflection Paper #1 – Mental Health Stigma", date: "2026-05-28", weight: 10 },
  { course: "NUR347", type: "exam",       title: "Exam 1 – Mood Disorders", date: "2026-06-11", weight: 20 },
  { course: "NUR347", type: "assignment", title: "Therapeutic Communication Role-play Write-up", date: "2026-06-18", weight: 10 },
  { course: "NUR347", type: "casestudy",  title: "Case Study – Schizophrenia", date: "2026-06-25", weight: 10 },
  { course: "NUR347", type: "exam",       title: "Exam 2 – Psychosis & Anxiety", date: "2026-07-09", weight: 20 },
  { course: "NUR347", type: "medtable",   title: "Psych Med Table – Antipsychotics & SSRIs", date: "2026-07-16", weight: 5 },
  { course: "NUR347", type: "assignment", title: "Reflection Paper #2 – Substance Use", date: "2026-07-23", weight: 10 },
  { course: "NUR347", type: "exam",       title: "Final Exam (comprehensive)", date: "2026-08-06", weight: 25 },

  // ── Appointments ────────────────────────────────────────────────────────
  { course: "OTHER", type: "appointment", title: "Annual Physical – Dr. Patel", date: "2026-06-03", notes: "Fasting labs beforehand" },
  { course: "OTHER", type: "appointment", title: "Dentist – Cleaning", date: "2026-07-01", },
  { course: "OTHER", type: "appointment", title: "Eye Exam", date: "2026-07-22", },
];

function buildWeeks(semesterStart: string): Week[] {
  const weeks: Week[] = [];
  const topicsByWeek: string[][] = [
    // Week 1
    ["Review NUR304 syllabus & course expectations", "Review NUR326 syllabus & clinical schedule", "Review NUR347 syllabus"],
    // Week 2
    ["NUR304: Cardiac anatomy & physiology", "NUR326: Nursing process & documentation", "NUR347: Mental health nursing intro & therapeutic communication"],
    // Week 3
    ["NUR304: Heart failure & cardiac meds", "NUR326: Vital signs & head-to-toe assessment", "NUR347: Anxiety disorders & interventions"],
    // Week 4
    ["NUR304: Respiratory disorders (COPD, asthma)", "NUR326: Care planning #1 draft", "NUR347: Mood disorders (depression & bipolar)"],
    // Week 5
    ["NUR304: EXAM 1 review session", "NUR326: Lab prep – hand hygiene & sterile technique", "NUR347: Schizophrenia & psychosis overview"],
    // Week 6
    ["NUR304: Renal system & fluid/electrolytes", "NUR326: Skills lab check-off #1 prep", "NUR347: EXAM 1 review session"],
    // Week 7
    ["NUR304: AKI vs CKD – nursing management", "NUR326: Post-op nursing care & wound assessment", "NUR347: Substance use disorders & dual diagnosis"],
    // Week 8
    ["NUR304: Endocrine – diabetes & thyroid", "NUR326: MIDTERM review session", "NUR347: Therapeutic modalities – CBT, DBT basics"],
    // Week 9
    ["NUR304: Insulin types & sliding-scale management", "NUR326: IV therapy & medication administration", "NUR347: EXAM 2 review session"],
    // Week 10
    ["NUR304: EXAM 2 review session", "NUR326: Care plan #2 – post-op patient", "NUR347: Eating disorders & body image"],
    // Week 11
    ["NUR304: Concept map – diabetes deep dive", "NUR326: Sepsis recognition & early intervention", "NUR347: Personality disorders overview"],
    // Week 12
    ["NUR304: Neuro overview (stroke, seizures)", "NUR326: Skills lab check-off #2 – IV & wound", "NUR347: Child & adolescent mental health"],
    // Week 13
    ["NUR304: FINAL EXAM comprehensive review", "NUR326: FINAL EXAM review & clinical portfolio", "NUR347: FINAL EXAM comprehensive review"],
  ];

  const start = new Date(semesterStart);
  for (let i = 0; i < 13; i++) {
    const weekStart = new Date(start);
    weekStart.setDate(start.getDate() + i * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    weeks.push({
      weekNum: i + 1,
      startDate: weekStart.toISOString().slice(0, 10),
      endDate: weekEnd.toISOString().slice(0, 10),
      topics: (topicsByWeek[i] ?? []).map((text) => ({
        id: id(),
        text,
        done: false,
      })),
    });
  }
  return weeks;
}

export function buildSeedData(): DashboardData {
  const semesterStart = "2026-05-18";
  return {
    semesterStart,
    items: rawItems.map((raw) => ({ ...raw, id: id(), done: false })),
    weeks: buildWeeks(semesterStart),
  };
}

export { buildWeeks };
