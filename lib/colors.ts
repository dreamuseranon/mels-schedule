import { Course } from "./types";

export const COURSE_COLOR: Record<Course, string> = {
  NUR304: "#7FAFC9",
  NUR326: "#93AC7E",
  NUR347: "#E89FB5",
  OTHER:  "#D9A85C",
};

export const COURSE_LABEL: Record<Course, string> = {
  NUR304: "NUR304",
  NUR326: "NUR326",
  NUR347: "NUR347",
  OTHER:  "Appointments",
};

export const TYPE_EMOJI: Record<string, string> = {
  exam:       "📋",
  medtable:   "💊",
  casestudy:  "📖",
  assignment: "✏️",
  clinical:   "🏥",
  lab:        "🔬",
  appointment:"🩺",
};
