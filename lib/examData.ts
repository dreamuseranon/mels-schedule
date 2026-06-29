import { ExamStudyGuide, ConfidenceLevel } from "./types";

function s(id: string, text: string) {
  return { id, text, done: false };
}
function t(id: string, title: string, subtopics: ReturnType<typeof s>[], confidence: ConfidenceLevel = 0) {
  return { id, title, subtopics, confidence };
}

export const EXAM_GUIDES: ExamStudyGuide[] = [

  // ═══════════════════════════════════════════════════════════════
  // NUR 304 — Health & Wellness II
  // ═══════════════════════════════════════════════════════════════

  {
    examKey: "NUR304-2026-06-10",
    course: "NUR304",
    examDate: "2026-06-10",
    examTitle: "Exam 1 — Periop, IV Access, Respiratory",
    estimatedHours: 4,
    aiTip: "Memorize O2 flow rates cold — expect 1–2 direct questions on which device delivers what FiO2. For COPD, the 88–92% O2 target is a classic NCLEX trap (not 95–100%) because CO2 retainers rely on hypoxic drive. PACU discharge questions almost always hinge on one criteria not being met — know all four: airway patent, O2 sat ≥95% on room air, pain controlled, aldrete score ≥8.",
    resources: [
      { type: "ati",     label: "ATI Med-Surg Ch. 10 — Perioperative Nursing" },
      { type: "ati",     label: "ATI Med-Surg Ch. 29–31 — Respiratory Disorders" },
      { type: "youtube", label: "RegisteredNurseRN — O2 Delivery Devices",  url: "https://www.youtube.com/results?search_query=registered+nurse+RN+oxygen+delivery+devices" },
      { type: "youtube", label: "RegisteredNurseRN — COPD Nursing",          url: "https://www.youtube.com/results?search_query=registered+nurse+RN+COPD+nursing" },
      { type: "quizlet", label: "Perioperative Nursing NCLEX",               url: "https://quizlet.com/search?query=perioperative+nursing+nclex" },
      { type: "skill",   label: "Tracheostomy care — Sim Lab prep" },
    ],
    topics: [
      t("n304e1t1", "Perioperative Nursing", [
        s("n304e1t1s1", "Pre-op: consent, NPO status (clear liquids 2h, solids 6–8h), allergies, latex/iodine"),
        s("n304e1t1s2", "Intraoperative: circulating vs scrub nurse roles, sterile field maintenance"),
        s("n304e1t1s3", "Post-op/PACU: Aldrete score ≥8 to discharge, airway priority, nausea management"),
        s("n304e1t1s4", "Surgical complications: DVT, atelectasis, wound dehiscence vs evisceration (evisceration → sterile saline-soaked gauze, call MD)"),
        s("n304e1t1s5", "Positioning: lithotomy (leg compartment syndrome), prone (pressure injuries), lateral"),
      ]),
      t("n304e1t2", "IV Therapy & Fluid Management", [
        s("n304e1t2s1", "Isotonic (0.9% NS, LR, D5W) — stays in vascular space. When to use each."),
        s("n304e1t2s2", "Hypotonic (0.45% NS) — moves water INTO cells. Risk: cerebral edema, avoid in head injury"),
        s("n304e1t2s3", "Hypertonic (3% NS, D5NS, D10W) — pulls water OUT of cells. Risk: fluid overload"),
        s("n304e1t2s4", "IV site complications: infiltration (vesicant = extravasation), phlebitis signs (redness, warmth, cord)"),
        s("n304e1t2s5", "Blood transfusion: 2-nurse verification, infuse within 4 hrs, vital signs at 15 min"),
      ]),
      t("n304e1t3", "Respiratory: COPD & Pneumonia", [
        s("n304e1t3s1", "COPD types: emphysema (pink puffer, barrel chest) vs chronic bronchitis (blue bloater, productive cough)"),
        s("n304e1t3s2", "O2 target for COPD: 88–92% (hypoxic drive). Avoid high-flow O2 without monitoring"),
        s("n304e1t3s3", "Pneumonia: CAP vs HAP, aspiration (dysphagia, NGT, Fowler's position)"),
        s("n304e1t3s4", "Priority interventions: HOB 30–45°, splinting with coughing, incentive spirometry, hydration"),
        s("n304e1t3s5", "Assessment findings: crackles, decreased breath sounds, dullness to percussion, fever, RR change"),
      ]),
      t("n304e1t4", "O2 Delivery Systems & Tracheostomy", [
        s("n304e1t4s1", "Nasal cannula: 1–6 LPM → 24–44% FiO2. Simple mask: 6–10 LPM → 35–50%. NRB: 10–15 LPM → 60–90%"),
        s("n304e1t4s2", "Venturi mask: precise FiO2, best for COPD. CPAP/BiPAP: non-invasive positive pressure"),
        s("n304e1t4s3", "Trach care: inner cannula cleaning q8h, suctioning (pre-oxygenate, <10–15 sec, sterile)"),
        s("n304e1t4s4", "Emergency: trach dislodged → hold stoma open, bag-mask if needed, have obturator at bedside"),
        s("n304e1t4s5", "Cuffed (mechanical vent patients) vs fenestrated (facilitates speaking). Speaking valve = Passy-Muir"),
      ]),
    ],
  },

  {
    examKey: "NUR304-2026-06-24",
    course: "NUR304",
    examDate: "2026-06-24",
    examTitle: "Exam 2 — Cardiac & Hematologic",
    estimatedHours: 5,
    aiTip: "LSHF vs RSHF is the #1 Exam 2 trap: LSHF backs up into the LUNGS (crackles, dyspnea, orthopnea, pink frothy sputum), RSHF backs up into the BODY (peripheral edema, JVD, ascites). For transfusions: STOP first, then NS flush, then notify MD — order matters on the NCLEX. Digoxin toxicity triad: nausea/vomiting, visual changes (halos), bradycardia. Always check HR before giving — hold if <60.",
    resources: [
      { type: "ati",     label: "ATI Med-Surg Ch. 17–22 — Cardiovascular System" },
      { type: "ati",     label: "ATI Med-Surg Ch. 37 — Hematologic Disorders" },
      { type: "youtube", label: "Ninja Nerd — Heart Failure Pathophysiology",   url: "https://www.youtube.com/results?search_query=ninja+nerd+heart+failure+pathophysiology" },
      { type: "youtube", label: "LevelUpRN — Blood Transfusion Reactions",      url: "https://www.youtube.com/results?search_query=leveluprn+blood+transfusion+reactions" },
      { type: "quizlet", label: "Heart Failure NCLEX Questions",                url: "https://quizlet.com/search?query=heart+failure+NCLEX" },
      { type: "quizlet", label: "Anemia Types Nursing",                         url: "https://quizlet.com/search?query=anemia+types+nursing" },
    ],
    topics: [
      t("n304e2t1", "Hypertension & Heart Failure", [
        s("n304e2t1s1", "HTN: primary vs secondary, JNC8 goal <130/80, DASH diet (low Na, high K, fruits/veg)"),
        s("n304e2t1s2", "Heart failure compensatory mechanisms: tachycardia, SNS activation, RAAS — understand why they WORSEN HF long-term"),
        s("n304e2t1s3", "LSHF (left-sided): backs up into lungs → crackles, dyspnea, orthopnea, pink frothy sputum, fatigue"),
        s("n304e2t1s4", "RSHF (right-sided): backs up into body → peripheral edema, JVD, ascites, hepatomegaly, anorexia"),
        s("n304e2t1s5", "Nursing: daily weight (>2 lb/day = report), I&O, HOB 30–45°, fluid restriction, low-Na diet"),
      ]),
      t("n304e2t2", "CAD, Angina, VTE & PVD", [
        s("n304e2t2s1", "CAD risk factors: modifiable (HTN, DM, smoking, obesity, dyslipidemia) vs non-modifiable (age, sex, genetics)"),
        s("n304e2t2s2", "Angina: stable (predictable, relieved by rest/NTG) vs unstable (at rest, not fully relieved — EMERGENCY)"),
        s("n304e2t2s3", "MONA: Morphine, O2, Nitrates, Aspirin — classic MI protocol order"),
        s("n304e2t2s4", "VTE/DVT: Virchow's triad (stasis, hypercoagulability, vessel injury). Homan's sign is UNRELIABLE. Use Doppler."),
        s("n304e2t2s5", "PVD: arterial (cool pale leg, absent pulses, pain at rest) vs venous (warm, edematous, brown staining, varicosities)"),
      ]),
      t("n304e2t3", "Anemia Types", [
        s("n304e2t3s1", "Iron deficiency: low MCV (microcytic), low Hgb. PO iron with OJ (↑ absorption), black stools are NORMAL"),
        s("n304e2t3s2", "B12/folate deficiency: macrocytic/megaloblastic. B12 deficiency → neurological symptoms (not folate alone)"),
        s("n304e2t3s3", "Aplastic anemia: pancytopenia (↓ RBC, WBC, platelets) — bone marrow failure. Infection + bleeding risk"),
        s("n304e2t3s4", "Sickle cell crisis: triggers (cold, dehydration, infection, altitude, hypoxia). Tx: hydration, O2, pain management"),
        s("n304e2t3s5", "Priority assessment for all anemia: O2 sat, activity tolerance, Hgb/Hct levels, signs of bleeding"),
      ]),
      t("n304e2t4", "Blood Products & Transfusion Reactions", [
        s("n304e2t4s1", "Blood products: pRBC (anemia), FFP (clotting factors/warfarin reversal), Platelets (<50K for procedures), Cryo (fibrinogen)"),
        s("n304e2t4s2", "Pre-transfusion: type & screen/crossmatch, 2-nurse ID verification, baseline vitals, large-bore IV (18G+)"),
        s("n304e2t4s3", "Febrile non-hemolytic: most common, fever/chills — STOP transfusion, Tylenol, may resume per MD order"),
        s("n304e2t4s4", "Acute hemolytic: MOST DANGEROUS — clerical error (wrong blood type). STOP immediately, NS flush, monitor kidneys, report to blood bank"),
        s("n304e2t4s5", "TRALI vs TACO: TRALI = acute lung injury (non-cardiogenic), TACO = fluid overload (cardiogenic). Differentiate with BNP."),
      ]),
    ],
  },

  {
    examKey: "NUR304-2026-07-15",
    course: "NUR304",
    examDate: "2026-07-15",
    examTitle: "Exam 3 — Renal, GI/Hepatic, Diabetes",
    estimatedHours: 5,
    aiTip: "AKI vs CKD: AKI is sudden and potentially reversible (oliguria <400mL/day is the key warning sign). CKD is chronic and progressive — the biggest late complication is cardiovascular disease, not just kidney failure. For DM2, the NCLEX loves insulin administration questions — glargine/detemir are NEVER mixed with any other insulin. The somogyi effect (rebound morning hyperglycemia from nocturnal hypoglycemia) vs dawn phenomenon (natural morning hyperglycemia) — know how to differentiate.",
    resources: [
      { type: "ati",     label: "ATI Med-Surg Ch. 33–35 — Renal & Urinary" },
      { type: "ati",     label: "ATI Med-Surg Ch. 38–42 — GI & Hepatic" },
      { type: "ati",     label: "ATI Med-Surg Ch. 57–58 — Diabetes" },
      { type: "youtube", label: "Ninja Nerd — AKI vs CKD",     url: "https://www.youtube.com/results?search_query=ninja+nerd+AKI+CKD" },
      { type: "youtube", label: "LevelUpRN — Diabetes Nursing", url: "https://www.youtube.com/results?search_query=leveluprn+diabetes+nursing" },
      { type: "quizlet", label: "Renal Disorders NCLEX",        url: "https://quizlet.com/search?query=renal+disorders+nclex+nursing" },
    ],
    topics: [
      t("n304e3t1", "AKI & CKD", [
        s("n304e3t1s1", "AKI phases: initiation → oliguric (↑ BUN/creatinine, <400mL/day urine) → diuretic → recovery"),
        s("n304e3t1s2", "AKI causes: prerenal (↓ perfusion), intrarenal (tubular damage), postrenal (obstruction)"),
        s("n304e3t1s3", "CKD: GFR <60 for ≥3 months. Stages 1–5. Stage 5 = ESRD, requires dialysis or transplant"),
        s("n304e3t1s4", "CKD complications: anemia (↓ erythropoietin), hyperkalemia, hyperphosphatemia, hypertension, metabolic acidosis"),
        s("n304e3t1s5", "Diet restrictions for CKD: ↓ K+, ↓ phosphorus, ↓ protein, ↓ Na+, ↓ fluid (if oliguric)"),
      ]),
      t("n304e3t2", "UTI/CAUTI, BPH & Urolithiasis", [
        s("n304e3t2s1", "UTI: dysuria, urgency, frequency, pyuria, bacteriuria. Elderly may present with CONFUSION only"),
        s("n304e3t2s2", "CAUTI prevention: closed drainage system, securing tubing, daily perineal care, remove catheter ASAP"),
        s("n304e3t2s3", "BPH: hesitancy, weak stream, nocturia, urinary retention. Post-void residual >100mL is significant"),
        s("n304e3t2s4", "Urolithiasis: flank pain radiating to groin, hematuria. Strain all urine. Increase fluids (2–3 L/day)"),
      ]),
      t("n304e3t3", "GI & Hepatic Disorders", [
        s("n304e3t3s1", "GERD: HOB 30°, avoid eating 2–3 hrs before bed, avoid caffeine/alcohol/fatty foods, weight loss"),
        s("n304e3t3s2", "PUD: H. pylori (most common cause), NSAIDs (second). Complications: hemorrhage, perforation (board belly = emergency)"),
        s("n304e3t3s3", "Diverticulitis: LLQ pain, fever, ↑ WBC. Clear liquid diet during flare. HIGH-fiber diet for PREVENTION."),
        s("n304e3t3s4", "Cirrhosis complications: ascites (paracentesis), esophageal varices (bleeding risk, avoid Valsalva), hepatic encephalopathy (ammonia → lactulose)"),
        s("n304e3t3s5", "Ostomy care: stoma should be beefy-red/moist. Pale/dark = ischemia. Output characteristics per location."),
      ]),
      t("n304e3t4", "Diabetes Type 2", [
        s("n304e3t4s1", "Diagnosis criteria: fasting glucose ≥126, A1C ≥6.5%, random glucose ≥200 with symptoms"),
        s("n304e3t4s2", "Hypoglycemia: <70 mg/dL. Signs: shakiness, diaphoresis, confusion. Tx: 15g fast-acting carbs, recheck in 15 min"),
        s("n304e3t4s3", "DKA (Type 1, can occur in Type 2): fruity breath, Kussmaul breathing, high glucose, anion gap acidosis, ketones"),
        s("n304e3t4s4", "HHNS (Type 2): extreme hyperglycemia (>600), profound dehydration, NO ketosis, altered consciousness"),
        s("n304e3t4s5", "Insulin: rapid (lispro/aspart — cover meals), short (regular — only IV insulin), long-acting (glargine/detemir — NO mixing!)"),
      ]),
    ],
  },

  {
    examKey: "NUR304-2026-07-29",
    course: "NUR304",
    examDate: "2026-07-29",
    examTitle: "Exam 4 — Integumentary, Endocrine, Neuro, MSK",
    estimatedHours: 5,
    aiTip: "Stroke is the highest-yield neuro topic: tPA window is 3–4.5 hours from symptom onset, and contraindications are commonly tested. For MSK, total joint arthroplasty questions focus on positioning restrictions: hip replacement = no flexion >90°, no adduction (crossing legs), no internal rotation. For thyroid: Grave's disease = hyperthyroid (heat intolerance, weight loss, exophthalmos), Hashimoto's = hypothyroid (cold intolerance, weight gain, fatigue). Thyroid storm = life-threatening emergency.",
    resources: [
      { type: "ati",     label: "ATI Med-Surg Ch. 61–64 — Neurological" },
      { type: "ati",     label: "ATI Med-Surg Ch. 54–56 — Endocrine" },
      { type: "ati",     label: "ATI Med-Surg Ch. 65–70 — Musculoskeletal" },
      { type: "youtube", label: "Ninja Nerd — Stroke (Ischemic vs Hemorrhagic)", url: "https://www.youtube.com/results?search_query=ninja+nerd+stroke+ischemic+hemorrhagic" },
      { type: "youtube", label: "RegisteredNurseRN — Thyroid Disorders",         url: "https://www.youtube.com/results?search_query=registered+nurse+RN+thyroid+disorders" },
      { type: "quizlet", label: "Neurological NCLEX",                            url: "https://quizlet.com/search?query=neurological+nclex+nursing" },
    ],
    topics: [
      t("n304e4t1", "Integumentary & Wound Care", [
        s("n304e4t1s1", "Pressure injury staging: Stage 1 (non-blanchable redness, intact skin), Stage 2 (partial thickness), Stage 3 (full thickness), Stage 4 (bone/tendon exposed), Unstageable, DTI"),
        s("n304e4t1s2", "Prevention: Braden scale (≤18 = at risk), reposition q2h, moisture barriers, specialty mattresses"),
        s("n304e4t1s3", "Herpes Zoster (shingles): dermatomal distribution, painful vesicles, contact+airborne precautions, postherpetic neuralgia"),
        s("n304e4t1s4", "Cellulitis: bacterial skin infection, warmth/redness/swelling/pain, IV antibiotics if severe, elevate limb"),
      ]),
      t("n304e4t2", "Endocrine: Thyroid & Adrenal", [
        s("n304e4t2s1", "Hypothyroidism: cold intolerance, weight gain, constipation, fatigue, bradycardia, myxedema coma (emergency)"),
        s("n304e4t2s2", "Hyperthyroidism/Grave's: heat intolerance, weight loss, tachycardia, exophthalmos, thyroid storm (fever, tachycardia, delirium — emergency!)"),
        s("n304e4t2s3", "Cushing's: excess cortisol → moon face, buffalo hump, central obesity, HTN, hyperglycemia, striae"),
        s("n304e4t2s4", "Addison's: cortisol deficiency → hypoglycemia, hypotension, hyperkalemia, hyponatremia, bronze skin"),
        s("n304e4t2s5", "Addisonian crisis: precipitated by stress/illness. Tx: IV hydrocortisone + fluids STAT"),
      ]),
      t("n304e4t3", "Neurology: Seizures & Stroke", [
        s("n304e4t3s1", "Seizure types: focal (one side), generalized tonic-clonic, absence (blank stare). Post-ictal confusion is normal."),
        s("n304e4t3s2", "Seizure precautions: padded siderails, oxygen & suction at bedside, NEVER restrain, do NOT put anything in mouth"),
        s("n304e4t3s3", "Stroke — FAST: Face droop, Arm weakness, Speech difficulty, Time to call 911"),
        s("n304e4t3s4", "Ischemic stroke: tPA within 3–4.5 hrs. Contraindications: hemorrhage, recent surgery, BP >185/110"),
        s("n304e4t3s5", "Post-stroke: dysphagia screening before oral intake, HOB 30°, NIH stroke scale, aspiration precautions"),
      ]),
      t("n304e4t4", "Musculoskeletal: OA, Gout & Arthroplasty", [
        s("n304e4t4s1", "OA: wear-and-tear, bony enlargement (Heberden's/Bouchard's nodes), worse with activity, improved with rest"),
        s("n304e4t4s2", "Gout: uric acid crystals in joints (big toe = podagra). Avoid: purines (red meat, organ meat, alcohol, sardines). Increase fluids."),
        s("n304e4t4s3", "Osteomyelitis: bone infection, fever, localized bone pain, ↑ WBC/ESR. Prolonged IV antibiotics."),
        s("n304e4t4s4", "Total Hip Arthroplasty: NO flexion >90°, NO adduction (crossing legs), NO internal rotation. Abductor wedge."),
        s("n304e4t4s5", "Amputation: stump positioning, residual limb care, phantom limb pain (treat as real), wrapping figure-8"),
      ]),
    ],
  },

  {
    examKey: "NUR304-2026-08-11",
    course: "NUR304",
    examDate: "2026-08-11",
    examTitle: "HESI Comprehensive Final — All NUR304",
    estimatedHours: 6,
    aiTip: "For the HESI, focus on PRIORITY and SAFETY questions — they make up the largest portion. Always: Assess before act. Airway before everything. Stable vs unstable patient determines who to see first. Practice the NCLEX Next Gen format (bow-tie, extended drag-and-drop). Your weakest exam topics from the semester are the ones most worth reviewing now. Aim for 850+ but remember: 900+ is outstanding.",
    resources: [
      { type: "ati",     label: "ATI Med-Surg — Full Textbook Review (comprehensive)" },
      { type: "quizlet", label: "NUR304 Comprehensive Review",  url: "https://quizlet.com/search?query=NUR304+comprehensive+nursing" },
      { type: "youtube", label: "LevelUpRN — NCLEX Priority Questions", url: "https://www.youtube.com/results?search_query=leveluprn+NCLEX+priority+nursing" },
      { type: "youtube", label: "Ninja Nerd — Full Nursing Review", url: "https://www.youtube.com/results?search_query=ninja+nerd+nursing+comprehensive+review" },
    ],
    topics: [
      t("n304e5t1", "Respiratory & Perioperative Review", [
        s("n304e5t1s1", "O2 delivery devices: all flow rates and FiO2 percentages — must be instant recall"),
        s("n304e5t1s2", "COPD: 88–92% target, hypoxic drive, emphysema vs bronchitis differentiation"),
        s("n304e5t1s3", "PACU discharge criteria: Aldrete score, vital sign parameters, pain scale"),
        s("n304e5t1s4", "IV fluids: know when to use isotonic vs hypotonic vs hypertonic + the risks of each"),
      ]),
      t("n304e5t2", "Cardiac & Hematologic Review", [
        s("n304e5t2s1", "LSHF vs RSHF: symptoms, assessment findings, priority nursing interventions"),
        s("n304e5t2s2", "Transfusion reactions: STOP → NS → vitals → notify MD → send blood back. Reaction types."),
        s("n304e5t2s3", "Anemia types: iron deficiency (microcytic), B12 (macrocytic, neuro sx), aplastic (pancytopenia), sickle cell (crisis care)"),
        s("n304e5t2s4", "Angina management: NTG storage, MONA, stable vs unstable differentiation"),
      ]),
      t("n304e5t3", "Renal, GI & Diabetes Review", [
        s("n304e5t3s1", "AKI oliguric phase: recognize early signs, BUN/creatinine trends, restrict K+ and fluids"),
        s("n304e5t3s2", "DKA vs HHNS: ketones + acidosis (DKA) vs no ketones + profound hyperglycemia (HHNS)"),
        s("n304e5t3s3", "Cirrhosis: hepatic encephalopathy (ammonia, lactulose), esophageal varices risk, paracentesis nursing"),
        s("n304e5t3s4", "Hypoglycemia: 15/15 rule, symptoms, when to give glucagon vs oral carbs"),
      ]),
      t("n304e5t4", "Neuro, Endocrine & MSK Review", [
        s("n304e5t4s1", "Stroke: tPA window, contraindications, FAST acronym, ischemic vs hemorrhagic differences"),
        s("n304e5t4s2", "Seizure safety: what to do and what NEVER to do during a seizure"),
        s("n304e5t4s3", "Thyroid storm vs myxedema coma: recognize and prioritize emergency interventions"),
        s("n304e5t4s4", "THA precautions: the three NOs (no >90° flexion, no adduction, no internal rotation)"),
      ]),
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // NUR 326 — Pathophysiology & Pharmacology II
  // ═══════════════════════════════════════════════════════════════

  {
    examKey: "NUR326-2026-06-16",
    course: "NUR326",
    examDate: "2026-06-16",
    examTitle: "Exam 1 — Anti-Emetics, Respiratory Meds, Anti-HTN",
    estimatedHours: 3,
    aiTip: "Drug suffix identification is worth memorizing completely: -pril (ACE inhibitors), -sartan (ARBs), -olol (beta blockers), -dipine (CCBs). The NCLEX favorite ACE inhibitor SE is the dry cough — if they ask 'which is most likely to cause a cough,' it's always the ACE inhibitor. For respiratory meds, acetylcysteine is the star student: it's both a mucolytic AND the antidote for acetaminophen (Tylenol) overdose — that dual-use is classic test material.",
    resources: [
      { type: "ati",     label: "ATI Pharmacology Ch. 14 — Respiratory Meds" },
      { type: "ati",     label: "ATI Pharmacology Ch. 20 — Anti-Hypertensives" },
      { type: "youtube", label: "LevelUpRN — ACE Inhibitors vs ARBs",        url: "https://www.youtube.com/results?search_query=leveluprn+ACE+inhibitors+ARBs" },
      { type: "youtube", label: "RegisteredNurseRN — Anti-Emetics Nursing",   url: "https://www.youtube.com/results?search_query=anti+emetics+nursing+pharmacology" },
      { type: "quizlet", label: "Anti-Hypertensive Drugs Pharmacology",       url: "https://quizlet.com/search?query=anti+hypertensive+pharmacology+nursing" },
    ],
    topics: [
      t("n326e1t1", "Anti-Emetics", [
        s("n326e1t1s1", "Serotonin antagonists (ondansetron/Zofran): post-op & chemotherapy N/V, QT prolongation monitoring"),
        s("n326e1t1s2", "Dopamine antagonists (prochlorperazine/Compazine): EPS side effects (tardive dyskinesia, akathisia) — know signs"),
        s("n326e1t1s3", "Antihistamines (meclizine/Antivert): motion sickness & vertigo, causes drowsiness, use with caution in elderly"),
        s("n326e1t1s4", "Anticholinergics (scopolamine patch): motion sickness, apply behind ear 4h before travel, 72h duration"),
        s("n326e1t1s5", "NCLEX pearl: EPS with dopamine antagonists → diphenhydramine (Benadryl) for acute EPS reversal"),
      ]),
      t("n326e1t2", "Respiratory Medications", [
        s("n326e1t2s1", "SABAs (albuterol): rescue inhaler, onset 5–15 min, use FIRST before LABA or ICS. Tachycardia SE."),
        s("n326e1t2s2", "LABAs (salmeterol): maintenance ONLY, never rescue. Always combine with ICS (not alone in asthma)"),
        s("n326e1t2s3", "LAMA (tiotropium/Spiriva): COPD maintenance, once daily, dry mouth SE, NOT for acute bronchospasm"),
        s("n326e1t2s4", "Guaifenesin (Mucinex): expectorant, INCREASE fluids to liquefy secretions"),
        s("n326e1t2s5", "Acetylcysteine (Mucomyst): mucolytic via nebulizer + Tylenol overdose antidote (oral/IV)"),
      ]),
      t("n326e1t3", "Anti-Hypertensive Drug Classes", [
        s("n326e1t3s1", "ACE inhibitors (-pril): dry cough (classic SE), hyperkalemia risk, teratogenic, monitor BUN/creatinine"),
        s("n326e1t3s2", "ARBs (-sartan): like ACE but NO cough (different mechanism), also hyperkalemia + teratogenic"),
        s("n326e1t3s3", "Beta blockers (-olol): hold if HR <60 bpm, masks hypoglycemia symptoms (important for DM patients!), do NOT stop abruptly"),
        s("n326e1t3s4", "CCBs (-dipine): check HR/BP before giving, constipation with verapamil/diltiazem, peripheral edema"),
        s("n326e1t3s5", "Digoxin: narrow therapeutic range 0.5–2 ng/mL. Toxicity: N/V, yellow-green halos, bradycardia. Hold if HR <60."),
      ]),
    ],
  },

  {
    examKey: "NUR326-2026-06-29",
    course: "NUR326",
    examDate: "2026-06-29",
    examTitle: "Exam 2 — Cardiac Meds, Anti-Coagulants, GU Meds",
    estimatedHours: 4,
    aiTip: "Anticoagulant reversal agents are guaranteed test questions: heparin → protamine sulfate, warfarin → Vitamin K (slow) or FFP (fast emergency reversal). The absolute contraindication pair that every nurse must know: sildenafil (Viagra) + nitrates = severe hypotension, NEVER give together. For warfarin education: consistent green leafy vegetable intake is the key (not 'avoid all vitamin K foods') — this is a nuanced point professors love to test.",
    resources: [
      { type: "ati",     label: "ATI Pharmacology Ch. 28 — Anticoagulants" },
      { type: "ati",     label: "ATI Pharmacology Ch. 22 — Cardiac Glycosides & Nitrates" },
      { type: "youtube", label: "LevelUpRN — Anticoagulants Full Review",   url: "https://www.youtube.com/results?search_query=leveluprn+anticoagulants+heparin+warfarin" },
      { type: "youtube", label: "Ninja Nerd — Nitrates Mechanism",          url: "https://www.youtube.com/results?search_query=ninja+nerd+nitrates+angina" },
      { type: "quizlet", label: "Anticoagulants NCLEX Pharmacology",        url: "https://quizlet.com/search?query=anticoagulants+NCLEX+pharmacology" },
    ],
    topics: [
      t("n326e2t1", "Cardiac Medications: Nitrates & Statins", [
        s("n326e2t1s1", "Nitroglycerin: SL route, repeat x3 q5min. Call 911 if no relief after 3 doses. Headache is EXPECTED."),
        s("n326e2t1s2", "NTG storage: dark glass bottle, discard 6 months after opening, replace if no tingling felt"),
        s("n326e2t1s3", "Absolute contraindication: NTG + sildenafil/tadalafil (PDE5 inhibitors) = severe hypotension"),
        s("n326e2t1s4", "Statins (atorvastatin/simvastatin): take at NIGHT (hepatic cholesterol synthesis peaks at night), monitor LFTs and CK (myopathy/rhabdomyolysis)"),
        s("n326e2t1s5", "Fibrates (gemfibrozil): triglyceride reduction, GI SE, increased myopathy risk when combined with statins"),
      ]),
      t("n326e2t2", "Anticoagulants", [
        s("n326e2t2s1", "Heparin: PTT monitoring (goal 60–100 sec). Antidote: protamine sulfate. Risk: HIT (thrombocytopenia 5–10 days in)"),
        s("n326e2t2s2", "Warfarin: PT/INR monitoring (goal INR 2–3 for most, 2.5–3.5 for mechanical valves). Antidote: Vitamin K (slow), FFP (fast)"),
        s("n326e2t2s3", "LMWH (enoxaparin): SubQ in abdomen, no routine lab monitoring needed. Do NOT expel air bubble before injecting."),
        s("n326e2t2s4", "DOACs (apixaban, rivaroxaban): no routine monitoring, fewer interactions than warfarin, generally no reversal agent (andexanet alfa for factor Xa)"),
        s("n326e2t2s5", "Clopidogrel (Plavix): antiplatelet, hold 5–7 days before surgery, watch for bleeding, irreversible platelet inhibition"),
      ]),
      t("n326e2t3", "Genitourinary Medications", [
        s("n326e2t3s1", "Tamsulosin (Flomax): alpha-1 blocker for BPH, orthostatic hypotension (take at HS), change positions slowly"),
        s("n326e2t3s2", "Finasteride (Proscar): 5-alpha reductase inhibitor for BPH. WOMEN OF CHILDBEARING AGE CANNOT touch crushed tablets — teratogenic"),
        s("n326e2t3s3", "Sildenafil (Viagra): PDE5 inhibitor, absolute contraindication with nitrates. Priapism >4h = emergency."),
        s("n326e2t3s4", "Oxybutynin (Ditropan): anticholinergic for OAB. Side effects: dry mouth, urinary retention, constipation, confusion in elderly (Beers list)"),
        s("n326e2t3s5", "Phenazopyridine (Pyridium): urinary analgesic (NOT antibiotic). Orange/red urine is NORMAL and expected — teach patient!"),
      ]),
    ],
  },

  {
    examKey: "NUR326-2026-07-20",
    course: "NUR326",
    examDate: "2026-07-20",
    examTitle: "Exam 3 — GI Meds, Antiglycemics, Endocrine Meds",
    estimatedHours: 4,
    aiTip: "Metformin has the most high-yield clinical pearl in all of pharmacology: HOLD metformin 48 hours BEFORE contrast dye procedures and restart only after verifying kidney function. GLP-1 agonists slow gastric emptying — that's why they cause nausea and also why they're great for weight loss. For thyroid drugs, the agranulocytosis warning for methimazole/PTU is classic: any fever, sore throat, or mouth sores = stop drug and get CBC immediately.",
    resources: [
      { type: "ati",     label: "ATI Pharmacology Ch. 35 — GI Medications" },
      { type: "ati",     label: "ATI Pharmacology Ch. 42 — Antidiabetic Agents" },
      { type: "ati",     label: "ATI Pharmacology Ch. 44 — Thyroid & Endocrine" },
      { type: "youtube", label: "LevelUpRN — Diabetes Medications",         url: "https://www.youtube.com/results?search_query=leveluprn+diabetes+medications+pharmacology" },
      { type: "youtube", label: "RegisteredNurseRN — Thyroid Medications",  url: "https://www.youtube.com/results?search_query=thyroid+medications+nursing+pharmacology" },
      { type: "quizlet", label: "GI Pharmacology NCLEX",                    url: "https://quizlet.com/search?query=GI+pharmacology+NCLEX" },
    ],
    topics: [
      t("n326e3t1", "GI Medications", [
        s("n326e3t1s1", "PPIs (omeprazole/pantoprazole): take 30–60 min BEFORE breakfast. Used for GERD, PUD, H. pylori (combo regimen)."),
        s("n326e3t1s2", "H2 blockers (famotidine/Pepcid): take at bedtime or before meals. Good for mild GERD. OTC available."),
        s("n326e3t1s3", "Sucralfate: physical coating agent — take on EMPTY STOMACH, 1 hr before meals. Constipation SE. Separate from other meds."),
        s("n326e3t1s4", "Antacids (Maalox/Tums): neutralize stomach acid quickly. Take 1–2 hrs AFTER other medications (chelation/absorption issues)."),
        s("n326e3t1s5", "Misoprostol: synthetic prostaglandin, protects GI mucosa (used with NSAIDs). Causes uterine contractions — pregnancy risk!"),
      ]),
      t("n326e3t2", "Oral Antidiabetics & GLP-1 Agents", [
        s("n326e3t2s1", "Metformin: biguanide, first-line for DM2. GI SE (take with food). HOLD 48h before contrast. Risk of lactic acidosis."),
        s("n326e3t2s2", "Sulfonylureas (glipizide/glyburide): stimulate insulin release, HIGH hypoglycemia risk, take with meals"),
        s("n326e3t2s3", "GLP-1 agonists (liraglutide/semaglutide): slow gastric emptying, weight loss, significant nausea. SubQ injection."),
        s("n326e3t2s4", "SGLT2 inhibitors (-gliflozin): increase urinary glucose excretion, weight loss, UTI/yeast infection risk, euglycemic DKA risk"),
        s("n326e3t2s5", "DPP-4 inhibitors (-gliptin): mild glucose lowering, low hypoglycemia risk, generally well-tolerated"),
      ]),
      t("n326e3t3", "Endocrine & Thyroid Medications", [
        s("n326e3t3s1", "Levothyroxine (Synthroid): take on EMPTY STOMACH, 30–60 min before breakfast, SAME TIME daily. No antacids with it."),
        s("n326e3t3s2", "Methimazole/PTU: for hyperthyroidism. Agranulocytosis risk — report fever/sore throat/mouth sores immediately, CBC check"),
        s("n326e3t3s3", "PTU preferred in first trimester of pregnancy. Methimazole can cause fetal abnormalities in early pregnancy."),
        s("n326e3t3s4", "Testosterone therapy: monitor Hgb/Hct (polycythemia risk), liver function, lipid panel, PSA in men"),
        s("n326e3t3s5", "Insulin: only regular insulin can be given IV. Glargine/detemir: DO NOT MIX with any other insulin. Give at bedtime."),
      ]),
    ],
  },

  {
    examKey: "NUR326-2026-08-03",
    course: "NUR326",
    examDate: "2026-08-03",
    examTitle: "Exam 4 — Neuro Meds & Musculoskeletal Meds",
    estimatedHours: 4,
    aiTip: "Bisphosphonate administration is guaranteed test material: empty stomach, full 8 oz glass of water, remain upright (sitting or standing) for 30–60 minutes after — this prevents esophageal erosion. For Parkinson's medications, the 'on-off' phenomenon with levodopa/carbidopa is important: even timing of doses matters enormously. Phenytoin (Dilantin) toxicity: remember SAFE — Sedation, Ataxia, nystagmus (eye), gingival hyperplasia (teeth/gums) + teratogenic.",
    resources: [
      { type: "ati",     label: "ATI Pharmacology Ch. 50 — Neurological Meds" },
      { type: "ati",     label: "ATI Pharmacology Ch. 55 — Musculoskeletal Meds" },
      { type: "youtube", label: "LevelUpRN — Anticonvulsants Pharmacology",  url: "https://www.youtube.com/results?search_query=leveluprn+anticonvulsants+pharmacology" },
      { type: "youtube", label: "RegisteredNurseRN — Parkinson's Medications", url: "https://www.youtube.com/results?search_query=parkinsons+medications+nursing+pharmacology" },
      { type: "quizlet", label: "Neuro Pharmacology NCLEX",                  url: "https://quizlet.com/search?query=neurological+pharmacology+NCLEX" },
    ],
    topics: [
      t("n326e4t1", "Dementia & Parkinson's Medications", [
        s("n326e4t1s1", "Donepezil (Aricept): acetylcholinesterase inhibitor for Alzheimer's. GI SE, take at bedtime (HS). May slow progression."),
        s("n326e4t1s2", "Memantine (Namenda): NMDA receptor antagonist, moderate-severe Alzheimer's. Can combine with donepezil."),
        s("n326e4t1s3", "Levodopa/Carbidopa (Sinemet): dopamine precursor for Parkinson's. Consistent timing essential — 'on-off' fluctuations."),
        s("n326e4t1s4", "Levodopa SE: dyskinesias (involuntary movements), orthostatic hypotension, nausea. Take with food (NOT high-protein meals)."),
        s("n326e4t1s5", "Selegiline: MAO-B inhibitor adjunct. Avoid tyramine-rich foods (aged cheese, wine, cured meats) — hypertensive crisis risk"),
      ]),
      t("n326e4t2", "Anticonvulsants", [
        s("n326e4t2s1", "Phenytoin (Dilantin): therapeutic range 10–20 mcg/mL. SAFE toxicity: Sedation, Ataxia, nystagmus, gingival hyperplasia. Teratogenic."),
        s("n326e4t2s2", "Levetiracetam (Keppra): fewer drug interactions than phenytoin, monitor mood/behavior changes (aggression reported)"),
        s("n326e4t2s3", "Valproic acid (Depakote): liver toxicity risk (monitor LFTs), teratogenic (neural tube defects), monitor platelets"),
        s("n326e4t2s4", "General: NEVER abruptly stop anticonvulsants — rebound seizures. Taper under MD guidance."),
      ]),
      t("n326e4t3", "Musculoskeletal Medications", [
        s("n326e4t3s1", "Bisphosphonates (alendronate/Fosamax): empty stomach + full glass water + upright 30–60 min. Weekly dosing is typical."),
        s("n326e4t3s2", "SERMs (raloxifene/Evista): for osteoporosis in post-menopausal women. VTE risk. Does NOT relieve hot flashes."),
        s("n326e4t3s3", "Calcitonin (Miacalcin): intranasal spray for osteoporosis. Alternate nostrils daily. Also used for hypercalcemia."),
        s("n326e4t3s4", "Allopurinol (Zyloprim): prevents gout attacks (lowers uric acid). Increase fluids. Do NOT start during acute attack."),
        s("n326e4t3s5", "Colchicine: acute gout treatment. Significant GI side effects (diarrhea, nausea). Reduce dose in renal/hepatic impairment."),
      ]),
      t("n326e4t4", "Myasthenia Gravis Meds", [
        s("n326e4t4s1", "Pyridostigmine (Mestinon): acetylcholinesterase inhibitor, increases acetylcholine at neuromuscular junction"),
        s("n326e4t4s2", "Myasthenic crisis (not enough drug): worsening weakness, respiratory failure → give more cholinergic medication"),
        s("n326e4t4s3", "Cholinergic crisis (too much drug): SLUDGE symptoms (Salivation, Lacrimation, Urination, Defecation, GI distress, Emesis) → STOP drug"),
        s("n326e4t4s4", "Differentiate crises: Tensilon (edrophonium) test — improvement = myasthenic crisis, worsening = cholinergic crisis"),
      ]),
    ],
  },

  {
    examKey: "NUR326-2026-08-11",
    course: "NUR326",
    examDate: "2026-08-11",
    examTitle: "HESI Comprehensive Final — All NUR326 Pharmacology",
    estimatedHours: 5,
    aiTip: "For the pharmacology HESI, the highest-yield strategy is to know your antidotes, reversal agents, and 'when to hold' rules cold. Create a quick reference: heparin→protamine, warfarin→VitK/FFP, opioid→naloxone, benzo→flumazenil, acetaminophen→acetylcysteine, digoxin toxicity→stop+monitor, beta blocker overdose→glucagon. These appear across multiple questions. Also review all drug SUFFIXES — the quickest way to identify drug class and expected nursing considerations.",
    resources: [
      { type: "ati",     label: "ATI Pharmacology — Full Review (all chapters)" },
      { type: "quizlet", label: "Pharmacology Antidotes & Reversal Agents",  url: "https://quizlet.com/search?query=pharmacology+antidotes+nursing+NCLEX" },
      { type: "quizlet", label: "Drug Suffixes & Classes Master Review",     url: "https://quizlet.com/search?query=drug+suffixes+nursing+pharmacology" },
      { type: "youtube", label: "LevelUpRN — Full Pharmacology Review",     url: "https://www.youtube.com/results?search_query=leveluprn+pharmacology+comprehensive+review" },
    ],
    topics: [
      t("n326e5t1", "Antidotes & Reversal Agents", [
        s("n326e5t1s1", "Heparin → Protamine sulfate | Warfarin → Vitamin K (slow) / FFP (fast emergency)"),
        s("n326e5t1s2", "Opioid overdose → Naloxone (Narcan) | Benzodiazepine overdose → Flumazenil"),
        s("n326e5t1s3", "Acetaminophen overdose → N-acetylcysteine (Mucomyst) — start within 8–10h for best results"),
        s("n326e5t1s4", "Digoxin toxicity → Stop drug, monitor K+, Digibind (digoxin immune fab) for severe toxicity"),
        s("n326e5t1s5", "Beta blocker overdose → Glucagon | Organophosphate (cholinergic) → Atropine"),
      ]),
      t("n326e5t2", "Drug Suffix Master Review", [
        s("n326e5t2s1", "-pril (ACE inhibitors): cough, hyperkalemia, teratogenic | -sartan (ARBs): same without cough"),
        s("n326e5t2s2", "-olol (beta blockers): hold if HR <60, masks hypoglycemia | -dipine (CCBs): peripheral edema, constipation"),
        s("n326e5t2s3", "-statin (statins): take at night, watch CK/LFTs, myopathy | -prazole (PPIs): take 30 min before meals"),
        s("n326e5t2s4", "-azepam/-azolam (benzos): respiratory depression, reversal = flumazenil, fall precautions"),
        s("n326e5t2s5", "-gliptin (DPP-4), -gliflozin (SGLT2), -tide (GLP-1): all antidiabetic, distinct mechanisms/SE"),
      ]),
      t("n326e5t3", "Highest-Yield Clinical Pearls", [
        s("n326e5t3s1", "Metformin: HOLD 48h before contrast. Levothyroxine: empty stomach, same time daily, 30–60 min before breakfast."),
        s("n326e5t3s2", "Nitrates + PDE5 inhibitors (sildenafil): ABSOLUTE contraindication — severe hypotension"),
        s("n326e5t3s3", "Bisphosphonates: empty stomach + full glass water + upright 30–60 min — esophageal erosion prevention"),
        s("n326e5t3s4", "Anticonvulsants: NEVER stop abruptly. Phenytoin therapeutic level: 10–20 mcg/mL. Gingival hyperplasia."),
        s("n326e5t3s5", "Allopurinol: do NOT start during acute gout attack. Colchicine: for acute attack, significant GI SE."),
      ]),
    ],
  },
];
