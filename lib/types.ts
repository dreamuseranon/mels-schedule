export type Course = "NUR304" | "NUR326" | "NUR347" | "OTHER";
export type ItemType =
  | "exam"
  | "medtable"
  | "casestudy"
  | "assignment"
  | "clinical"
  | "lab"
  | "appointment";

export interface Item {
  id: string;
  course: Course;
  type: ItemType;
  title: string;
  date: string; // YYYY-MM-DD
  weight?: number;
  notes?: string;
  done: boolean;
}

export interface Topic {
  id: string;
  text: string;
  done: boolean;
}

export interface Week {
  weekNum: number;
  startDate: string;
  endDate: string;
  topics: Topic[];
}

export interface DashboardData {
  semesterStart: string;
  items: Item[];
  weeks: Week[];
}
