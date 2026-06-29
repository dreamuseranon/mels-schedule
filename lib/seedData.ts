import { DashboardData, Item, Week } from "./types";
import { EXAM_GUIDES } from "./examData";

function id() {
  return Math.random().toString(36).slice(2, 10);
}

const rawItems: Omit<Item, "id">[] = [
  // ── MAY 2026 ────────────────────────────────────────────────────────────
  { course: "NUR347", type: "assignment", title: "ELNEC Module 1: Intro to Palliative Care",          date: "2026-05-22", weight: 3,  notes: "Upload certificate to Blackboard by 11:59pm", done: true },
  { course: "NUR326", type: "medtable",   title: "Med Table 1: Anti-Emetics",                          date: "2026-05-24", weight: 1,  notes: "Ondansetron, prochlorperazine, meclizine, scopolamine", done: false },
  { course: "NUR304", type: "lab",        title: "Lab 1 — Skills Blitz",                               date: "2026-05-26", notes: "8:15am–12:15pm · Sim Lab · Wear uniform · Sign in required", done: false },
  { course: "NUR304", type: "casestudy",  title: "Case Study 1 — Perioperative Care",                  date: "2026-05-29", weight: 4,  notes: "HESI case study — submit to Blackboard by 11:59pm", done: false },
  { course: "NUR347", type: "assignment", title: "ELNEC Module 2: Communication in Palliative Care",   date: "2026-05-29", weight: 3,  notes: "Upload certificate by 11:59pm", done: false },
  { course: "NUR326", type: "medtable",   title: "Med Table 2: Respiratory",                           date: "2026-05-31", weight: 1,  notes: "Albuterol, salmeterol, tiotropium, guaifenesin, acetylcysteine", done: false },

  // ── JUNE 2026 ───────────────────────────────────────────────────────────
  { course: "NUR304", type: "casestudy",  title: "Case Study 2 — COPD/Pneumonia",                      date: "2026-06-05", weight: 4,  notes: "HESI case study — due 11:59pm", done: false },
  { course: "NUR326", type: "medtable",   title: "Med Table 3: Anti-Hypertensives",                    date: "2026-06-07", weight: 1,  notes: "ACE inhibitors, ARBs, CCBs, beta blockers, digoxin", done: false },
  { course: "NUR304", type: "lab",        title: "Lab 2 — Skills Blitz",                               date: "2026-06-09", notes: "8:15am–12:15pm · O2 delivery, NGT, catheter, trach, ADLs", done: false },
  { course: "NUR304", type: "exam",       title: "EXAM 1 — Periop, IV Access, Respiratory",            date: "2026-06-10", weight: 15, notes: "COPD, Pneumonia, Tracheostomy, O2 delivery", done: false },
  { course: "NUR347", type: "assignment", title: "Tuesdays with Morrie Reflection",                    date: "2026-06-12", weight: 20, notes: "4–5 pages, APA format — due 11:59pm", done: false },
  { course: "NUR326", type: "casestudy",  title: "Case Study 1: Cardiac",                             date: "2026-06-14", weight: 6,  notes: "Angina, CHF, CAD, PAD, anti-lipidemics — due 11:59pm", done: false },
  { course: "NUR326", type: "casestudy",  title: "Case Study 2: Anti-Coagulation",                    date: "2026-06-14", weight: 6,  notes: "⚠️ SAME DAY as Cardiac CS! Due 11:59pm", done: false },
  { course: "NUR326", type: "exam",       title: "EXAM 1 — Anti-emetics, Respiratory, Anti-HTN",      date: "2026-06-16", weight: 12, notes: "Weeks 1–3 content", done: false },
  { course: "NUR347", type: "assignment", title: "ELNEC Module 3: Pain Management",                    date: "2026-06-19", weight: 3,  notes: "Upload certificate by 11:59pm", done: false },
  { course: "NUR347", type: "assignment", title: "ELNEC Module 4: Symptom Management",                 date: "2026-06-19", weight: 3,  notes: "Upload certificate by 11:59pm", done: false },
  { course: "NUR326", type: "medtable",   title: "Med Table 4: Anti-Coagulants",                      date: "2026-06-21", weight: 1,  notes: "Heparin, warfarin, enoxaparin, apixaban, clopidogrel, tPA, TXA", done: false },
  { course: "NUR304", type: "lab",        title: "Lab 3 — Simulation Day 1",                          date: "2026-06-23", notes: "8:15am–12:15pm · Hematology/Cardio sim: MED42, MED37", done: false },
  { course: "NUR304", type: "exam",       title: "EXAM 2 — Cardiac & Hematologic",                    date: "2026-06-24", weight: 15, notes: "HTN, HF, VTE, CAD, Angina, PVD, Anemia, Blood Products, Transfusions", done: false },
  { course: "NUR304", type: "casestudy",  title: "Case Study 3 — BPH",                                date: "2026-06-26", weight: 4,  notes: "Renal/urologic HESI case study — due 11:59pm", done: false },
  { course: "NUR304", type: "clinical",   title: "Mid-Point Clinical Evaluation + 3 Concept Maps",    date: "2026-06-26", notes: "Submit eval + 3 concept maps to Blackboard", done: false },
  { course: "NUR304", type: "clinical",   title: "Clinical Reflection (mid-semester)",                 date: "2026-06-26", notes: "Written reflection — submit to Blackboard", done: false },
  { course: "NUR347", type: "assignment", title: "Holistic Client Care Plan",                          date: "2026-06-26", weight: 20, notes: "Physical, emotional, cultural, spiritual, social. SMART goals. APA.", done: false },
  { course: "NUR326", type: "medtable",   title: "Med Table 5: Genitourinary",                        date: "2026-06-28", weight: 1,  notes: "Tamsulosin, finasteride, sildenafil, oxybutynin", done: false },
  { course: "NUR326", type: "exam",       title: "EXAM 2 — Cardiac, Anti-Coag, GU Meds",             date: "2026-06-29", weight: 12, notes: "Weeks 4–6: Angina/CHF/CAD, anti-lipidemics, anti-coagulants, GU", done: false },

  // ── JULY 2026 ───────────────────────────────────────────────────────────
  { course: "NUR304", type: "assignment", title: "Midway Course Evaluation (NUR 304)",                 date: "2026-07-04", notes: "Complete NUR 304 midway course evaluation", done: false },
  { course: "NUR326", type: "casestudy",  title: "Case Study 3: GI",                                  date: "2026-07-05", weight: 6,  notes: "GERD, PUD, H2 antagonists, PPIs, antacids — due 11:59pm", done: false },
  { course: "NUR326", type: "medtable",   title: "Med Table 6: Oral Antiglycemics & Non-Insulin",     date: "2026-07-12", weight: 1,  notes: "Metformin, GLP-1 agonists, SGLT2, DPP-4 inhibitors", done: false },
  { course: "NUR326", type: "casestudy",  title: "Case Study 4: Endocrine",                           date: "2026-07-12", weight: 6,  notes: "Levothyroxine, methimazole, PTU, testosterone — due 11:59pm", done: false },
  { course: "NUR304", type: "lab",        title: "Lab 4 — Simulation Day 2",                          date: "2026-07-14", notes: "8:15am–12:15pm · Neuro/MSK/DM sim: FUN07, MED32", done: false },
  { course: "NUR304", type: "exam",       title: "EXAM 3 — Renal, GI/Hepatic, Diabetes",              date: "2026-07-15", weight: 15, notes: "AKI, CKD, UTI/CAUTI, BPH, GERD, PUD, Type 2 Diabetes", done: false },
  { course: "NUR304", type: "assignment", title: "School of Nursing Feedback Survey",                  date: "2026-07-19", notes: "Complete SON feedback survey", done: false },
  { course: "NUR326", type: "exam",       title: "EXAM 3 — GI Meds, Antiglycemics, Endocrine",       date: "2026-07-20", weight: 12, notes: "Weeks 7–9: GI meds, oral antiglycemics, endocrine meds", done: false },
  { course: "NUR326", type: "medtable",   title: "Med Table 7: Neuro",                                date: "2026-07-26", weight: 1,  notes: "Donepezil, memantine, levodopa/carbidopa, phenytoin, lorazepam", done: false },
  { course: "NUR304", type: "exam",       title: "EXAM 4 — Integumentary, Endocrine, Neuro, MSK",    date: "2026-07-29", weight: 15, notes: "Seizures, Stroke, OA, Gout, Osteoporosis, TJA, Amputation", done: false },
  { course: "NUR304", type: "casestudy",  title: "Case Study 4 — PVD with Amputation",               date: "2026-07-31", weight: 4,  notes: "HESI case study — due 11:59pm", done: false },
  { course: "NUR347", type: "assignment", title: "ELNEC Module 6: Final Hours",                       date: "2026-07-31", weight: 3,  notes: "Upload certificate by 11:59pm", done: false },

  // ── AUGUST 2026 ─────────────────────────────────────────────────────────
  { course: "NUR326", type: "medtable",   title: "Med Table 8: Musculoskeletal",                      date: "2026-08-02", weight: 1,  notes: "SERMs, bisphosphonates, allopurinol, colchicine", done: false },
  { course: "NUR326", type: "exam",       title: "EXAM 4 — Neuro Meds & MSK Meds",                   date: "2026-08-03", weight: 12, notes: "Weeks 10–11: dementia, Parkinson's, anticonvulsants, MSK meds", done: false },
  { course: "NUR304", type: "clinical",   title: "Final Clinical Evaluation",                          date: "2026-08-04", notes: "Submit to Blackboard — last day of clinical", done: false },
  { course: "NUR347", type: "assignment", title: "ELNEC Module 5: Loss, Grief & Bereavement",         date: "2026-08-07", weight: 3,  notes: "Upload certificate by 11:59pm", done: false },
  { course: "NUR347", type: "assignment", title: "Final Reflection Paper",                             date: "2026-08-07", weight: 20, notes: "EOL care, ethics, culture, Wit film, ELNEC integration — APA — due 11:59pm", done: false },
  { course: "NUR304", type: "exam",       title: "HESI Comprehensive Final Exam",                     date: "2026-08-11", weight: 15, notes: "🎯 All NUR 304 content · NCLEX-style · Benchmark 850+", done: false },
  { course: "NUR326", type: "exam",       title: "HESI Comprehensive Final Exam",                     date: "2026-08-11", weight: 15, notes: "🎯 All NUR 326 pharmacology · NCLEX-style · Benchmark 850+", done: false },
];

function buildWeeks(semesterStart: string): Week[] {
  const topicsByWeek: string[][] = [
    // Week 1: May 18–24
    [
      "NUR304: Review syllabus & perioperative nursing overview",
      "NUR304: Pre-op, intra-op, post-op care & PACU nursing",
      "NUR326: Review syllabus & anti-emetic drug classes",
      "NUR326: Ondansetron, prochlorperazine, meclizine, scopolamine — drug suffixes & side effects",
      "NUR347: Review syllabus & complete ELNEC Module 1 (Intro to Palliative Care) ✓",
    ],
    // Week 2: May 25–31
    [
      "NUR304: IV access & fluid management (isotonic vs hypotonic vs hypertonic)",
      "NUR304: Lab 1 Skills Blitz prep — review sim lab procedures",
      "NUR326: Respiratory meds — beta2 agonists (albuterol, salmeterol)",
      "NUR326: Anticholinergics (tiotropium), mucolytics (acetylcysteine), expectorants (guaifenesin)",
      "NUR347: ELNEC Module 2 — Therapeutic communication in palliative care",
    ],
    // Week 3: Jun 1–7
    [
      "NUR304: COPD pathophysiology & nursing management",
      "NUR304: Pneumonia types, assessment & nursing interventions",
      "NUR304: Tracheostomy care & O2 delivery systems (low-flow vs high-flow) — know flow rates!",
      "NUR326: Anti-hypertensives — ACE inhibitors (-pril), ARBs (-sartan), beta blockers (-olol), CCBs (-dipine)",
      "NUR326: Digoxin — toxicity signs, normal range, when to hold",
    ],
    // Week 4: Jun 8–14
    [
      "NUR304: ⚠️ EXAM 1 Wed Jun 10 — Periop, IV Access, Respiratory",
      "NUR304: Lab 2 Skills Blitz — O2 delivery, NGT, catheter, trach",
      "NUR326: Cardiac pharm — nitrates (angina), statins/fibrates (CAD), anti-lipidemics",
      "NUR326: ⚠️ Case Study 1 (Cardiac) + Case Study 2 (Anti-Coag) BOTH due Sun Jun 14!",
      "NUR347: Work on Tuesdays with Morrie reflection (due Jun 12, 4–5 pages APA)",
    ],
    // Week 5: Jun 15–21
    [
      "NUR304: Cardiac — HTN, Heart Failure (preload vs afterload, LSHF vs RSHF)",
      "NUR304: Hematologic — Anemia types, Blood Products, Transfusion reactions",
      "NUR326: ⚠️ EXAM 1 Mon Jun 16 — Anti-emetics, Respiratory, Anti-HTN",
      "NUR326: Anti-coagulants — heparin (antidote: protamine sulfate), warfarin (antidote: Vit K)",
      "NUR347: ELNEC Modules 3 & 4 — Pain Management + Symptom Management (both due Jun 19)",
    ],
    // Week 6: Jun 22–28
    [
      "NUR304: ⚠️ EXAM 2 Wed Jun 24 — Cardiac & Hematologic",
      "NUR304: Lab 3 Simulation Day 1 — Hematology/Cardio sims",
      "NUR304: Begin Renal — AKI vs CKD (onset, reversibility, BUN/creatinine/GFR)",
      "NUR326: Genitourinary meds — tamsulosin, finasteride, sildenafil, oxybutynin",
      "NUR347: ⚠️ Holistic Client Care Plan due Fri Jun 26 (physical, emotional, cultural, spiritual)",
    ],
    // Week 7: Jun 29–Jul 5
    [
      "NUR304: Renal — UTI/CAUTI prevention, BPH nursing care",
      "NUR326: ⚠️ EXAM 2 Mon Jun 29 — Cardiac, Anti-Coag, GU Meds",
      "NUR326: GI meds — H2 antagonists (famotidine), PPIs (omeprazole), sucralfate, antacids",
      "NUR326: Misoprostol, bismuth subsalicylate — indications & nursing considerations",
      "NUR304: Complete Midway Course Eval by Sat Jul 4",
    ],
    // Week 8: Jul 6–12
    [
      "NUR304: GI/Hepatic — GERD, PUD, Diverticular disease, Ostomies, Hepatic disorders",
      "NUR304: Diabetes Type 2 — management, complications, insulin types",
      "NUR326: Oral antiglycemics — metformin (hold before contrast!), GLP-1s (slow gastric emptying)",
      "NUR326: SGLT2 inhibitors, DPP-4 inhibitors, sulfonylureas — side effects & nursing notes",
      "NUR326: ⚠️ Case Study 4 (Endocrine) + Med Table 6 both due Sun Jul 12!",
    ],
    // Week 9: Jul 13–19
    [
      "NUR304: ⚠️ EXAM 3 Wed Jul 15 — Renal, GI/Hepatic, Diabetes",
      "NUR304: Lab 4 Simulation Day 2 — Neuro/MSK/DM sims",
      "NUR326: Endocrine meds — levothyroxine (take on empty stomach), methimazole, PTU",
      "NUR326: ⚠️ EXAM 3 Mon Jul 20 — GI meds, Antiglycemics, Endocrine",
      "NUR347: Start Final Reflection Paper (EOL care, ethics, culture, Wit film, ELNEC integration)",
    ],
    // Week 10: Jul 20–26
    [
      "NUR304: Integumentary — Herpes Zoster, Cellulitis, wound care staging",
      "NUR304: Endocrine disorders — Thyroid (hypo/hyper), Cushing's, Addison's, Pituitary",
      "NUR304: Neurology — Seizure types (tonic-clonic, absence, focal) & management",
      "NUR304: Stroke — FAST, tPA window (3–4.5 hrs), ischemic vs hemorrhagic",
      "NUR326: Neuro meds — donepezil, memantine (dementia); levodopa/carbidopa (Parkinson's)",
    ],
    // Week 11: Jul 27–Aug 2
    [
      "NUR304: ⚠️ EXAM 4 Wed Jul 29 — Integumentary, Endocrine, Neuro, MSK",
      "NUR304: MSK — OA, Gout, Osteomyelitis, Osteoporosis, TJA nursing care, Amputation",
      "NUR326: Anticonvulsants — phenytoin, levetiracetam, valproic acid",
      "NUR326: MSK meds — bisphosphonates (empty stomach, sit upright 30 min!), SERMs, allopurinol, colchicine",
      "NUR347: ELNEC Module 6 (Final Hours) due Jul 31 — upload certificate",
    ],
    // Week 12: Aug 3–9
    [
      "NUR326: ⚠️ EXAM 4 Mon Aug 3 — Neuro Meds & MSK Meds",
      "NUR304: Final Clinical Evaluation due Tue Aug 4 — submit to Blackboard",
      "NUR347: ELNEC Module 5 (Loss, Grief & Bereavement) due Fri Aug 7",
      "NUR347: ⚠️ Final Reflection Paper due Fri Aug 7 (APA, Wit film, ELNEC integration)",
      "Start comprehensive HESI review — all NUR 304 + NUR 326 content",
    ],
    // Week 13: Aug 10–14
    [
      "🎯 HESI DOUBLE DAY — Tue Aug 11: NUR 304 + NUR 326 both!",
      "NUR304 HESI: Periop · Respiratory · Cardiac · Hematologic · Renal · GI · DM · Neuro · MSK",
      "NUR326 HESI: All 8 drug tables — anti-emetics through musculoskeletal meds",
      "Target: 850+ benchmark on both exams — complete custom remediation if below",
      "🌸 You did it! Semester complete Aug 14 🌸",
    ],
  ];

  const weeks: Week[] = [];
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
      topics: (topicsByWeek[i] ?? []).map((text) => ({ id: id(), text, done: false })),
    });
  }
  return weeks;
}

export function buildSeedData(): DashboardData {
  const semesterStart = "2026-05-18";
  return {
    semesterStart,
    items: rawItems.map((raw) => ({ ...raw, id: id() })),
    weeks: buildWeeks(semesterStart),
    examGuides: EXAM_GUIDES,
  };
}

export { buildWeeks };
