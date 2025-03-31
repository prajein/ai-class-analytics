"use client";

import { useState, useEffect } from "react";
import { useDashboardStore } from "@/stores/dashboard-store";

// Simple Select component
function Select({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Slider({
  id,
  label,
  min,
  max,
  value,
  onChange,
}: {
  id: string;
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium flex justify-between">
        <span>{label}</span>
        <span className="text-muted-foreground">{value}</span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

export function DashboardFilters() {
  const { filters, setFilters, resetFilters } = useDashboardStore();
  const [classes, setClasses] = useState<Array<{ value: string; label: string }>>([]);
  const [teachers, setTeachers] = useState<Array<{ value: string; label: string }>>([]);
  const [subjects, setSubjects] = useState<Array<{ value: string; label: string }>>([]);
  
  // Fetch filter options
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // In a real app, these would be separate API calls
        // Here we'll simulate with static data
        setClasses([
          { value: "class1", label: "AI-2020" },
          { value: "class2", label: "AI-2021" },
          { value: "class3", label: "AI-2022" },
        ]);
        
        setTeachers([
          { value: "teacher1", label: "Dr. Smith" },
          { value: "teacher2", label: "Prof. Johnson" },
          { value: "teacher3", label: "Dr. Williams" },
        ]);
        
        setSubjects([
          { value: "ES", label: "Expert Systems" },
          { value: "FLAT", label: "Formal Languages & Automata Theory" },
          { value: "DBMS", label: "Database Management Systems" },
          { value: "MATHS", label: "Mathematics" },
          { value: "DAA", label: "Design & Analysis of Algorithms" },
        ]);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };
    
    fetchOptions();
  }, []);
  
  return (
    <div className="rounded-lg border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filters</h3>
        <button
          onClick={() => resetFilters()}
          className="text-sm text-blue-500 hover:underline"
        >
          Reset
        </button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Select
          id="class-filter"
          label="Class"
          options={classes}
          value={filters.classId || ""}
          onChange={(value) => setFilters({ classId: value || undefined })}
        />
        
        <Select
          id="teacher-filter"
          label="Teacher"
          options={teachers}
          value={filters.teacherId || ""}
          onChange={(value) => setFilters({ teacherId: value || undefined })}
        />
        
        <Select
          id="subject-filter"
          label="Subject"
          options={subjects}
          value={filters.subjectId || ""}
          onChange={(value) => setFilters({ subjectId: value || undefined })}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Slider
          id="min-score"
          label="Minimum Score"
          min={0}
          max={100}
          value={filters.minScore ?? 0}
          onChange={(value) => setFilters({ minScore: value })}
        />
        
        <Slider
          id="max-score"
          label="Maximum Score"
          min={0}
          max={100}
          value={filters.maxScore ?? 100}
          onChange={(value) => setFilters({ maxScore: value })}
        />
      </div>
    </div>
  );
} 