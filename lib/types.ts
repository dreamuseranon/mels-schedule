export type Course = "NUR304" | "NUR326" | "NUR347" | "OTHER";
export type ItemType =
  | "exam" | "medtable" | "casestudy" | "assignment"
  | "clinical" | "lab" | "appointment";

export interface Item {
  id: string;
  course: Course;
  type: ItemType;
  title: string;
  date: string;
  weight?: number;
  notes?: string;
  done: boolean;
}

export interface Topic { id: string; text: string; done: boolean; }

export interface Week {
  weekNum: number;
  startDate: string;
  endDate: string;
  topics: Topic[];
}

// ── Exam Intelligence ──────────────────────────────────────────
export type ConfidenceLevel = 0 | 1 | 2 | 3 | 4;

export interface ExamSubtopic {
  id: string;
  text: string;
  done: boolean;
}

export interface ExamTopic {
  id: string;
  title: string;
  subtopics: ExamSubtopic[];
  confidence: ConfidenceLevel;
}

export interface ExamResource {
  type: "ati" | "quizlet" | "youtube" | "skill" | "powerpoint";
  label: string;
  url?: string;
}

export interface ExamStudyGuide {
  examKey: string;          // "NUR304-2026-06-10" — stable identifier
  course: Course;
  examDate: string;
  examTitle: string;
  estimatedHours: number;
  aiTip: string;
  resources: ExamResource[];
  topics: ExamTopic[];
}

export interface DashboardData {
  semesterStart: string;
  items: Item[];
  weeks: Week[];
  examGuides: ExamStudyGuide[];
}
