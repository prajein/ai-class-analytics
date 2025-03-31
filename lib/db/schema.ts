import { z } from "zod";

// Zod schemas for validation based on testDB.sql
export const classSchema = z.object({
  section: z.string(),
  room_number: z.string().optional(),
  building: z.string().optional(),
});

export const teacherSchema = z.object({
  teacher_id: z.number(),
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  section: z.string().optional(),
});

export const studentSchema = z.object({
  student_id: z.number(),
  name: z.string(),
  email: z.string().email(),
  section: z.string().optional(),
});

export const midsemScoreSchema = z.object({
  student_id: z.number(),
  es_score: z.number().min(0).max(30).optional(),
  flat_score: z.number().min(0).max(30).optional(),
  dbms_score: z.number().min(0).max(30).optional(),
  mathematics_score: z.number().min(0).max(30).optional(),
  daa_score: z.number().min(0).max(30).optional(),
  total_score: z.number().optional(),
});

export const sqlQuerySchema = z.object({
  query: z.string().min(1, "Query is required"),
});

// TypeScript types derived from Zod schemas
export type Class = z.infer<typeof classSchema>;
export type Teacher = z.infer<typeof teacherSchema>;
export type Student = z.infer<typeof studentSchema>;
export type MidsemScore = z.infer<typeof midsemScoreSchema>;
export type SqlQuery = z.infer<typeof sqlQuerySchema>;

// Extended types for UI components
export type StudentWithScore = Student & {
  es_score?: number;
  flat_score?: number;
  dbms_score?: number;
  mathematics_score?: number;
  daa_score?: number;
  total_score?: number;
  average_score?: number;
};

export type ClassPerformance = Class & {
  teacher_name?: string;
  subject?: string;
  avg_score?: number;
  passed_count?: number;
  failed_count?: number;
  total_students?: number;
};

export type SubjectPerformance = {
  subject: string;
  section: string;
  highest_score?: number;
  lowest_score?: number;
  avg_score?: number;
};

export type TeacherPerformance = Teacher & {
  avg_score?: number;
  section?: string;
  top_students?: StudentWithScore[];
};

// Dashboard filter state type
export type DashboardFilters = {
  section?: string;
  teacherId?: number;
  subject?: string;
  minScore?: number;
  maxScore?: number;
  dateRange?: {
    from: Date | undefined;
    to: Date | undefined;
  };
}; 