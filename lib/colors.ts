import { Course } from "./types";

export const COURSE_COLOR: Record<Course, string> = {
  NUR304: "#6BB8E0", // sky blue
  NUR326: "#A98BE0", // lavender
  NUR347: "#FF86B8", // pink
  OTHER:  "#7DD4B0", // mint
};

export const COURSE_BG: Record<Course, string> = {
  NUR304: "#D8F0FC",
  NUR326: "#EAE0FC",
  NUR347: "#FFE0EF",
  OTHER:  "#D0F4E8",
};

export const COURSE_LABEL: Record<Course, string> = {
  NUR304: "NUR304",
  NUR326: "NUR326",
  NUR347: "NUR347",
  OTHER:  "Appointments",
};

export const TYPE_EMOJI: Record<string, string> = {
  exam:        "📋",
  medtable:    "💊",
  casestudy:   "📖",
  assignment:  "✏️",
  clinical:    "🏥",
  lab:         "🔬",
  appointment: "🩺",
};
