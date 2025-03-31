"use client";

import { useEffect, useState } from "react";
import { useDashboardStore } from "@/stores/dashboard-store";

interface TeacherPerformance {
  teacher_id: number;
  name: string;
  subject: string;
  section: string;
  avg_score: number;
  student_count: number;
}

export function TeacherPerformanceTable() {
  const [teachers, setTeachers] = useState<TeacherPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const { showTeacherPerformance, filters, setSelectedTeacherId, selectedTeacherId } = useDashboardStore();

  useEffect(() => {
    const fetchTeacherPerformance = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/statistics');
        if (!response.ok) throw new Error('Failed to fetch statistics');
        const data = await response.json();
        
        // Use the teacher performance data from the statistics endpoint
        setTeachers(data.teacherPerformance || []);
      } catch (error) {
        console.error("Error fetching teacher performance:", error);
      } finally {
        setLoading(false);
      }
    };

    if (showTeacherPerformance) {
      fetchTeacherPerformance();
    }
  }, [showTeacherPerformance, filters]);

  if (!showTeacherPerformance) {
    return null;
  }

  if (loading) {
    return (
      <div className="rounded-lg border animate-pulse">
        <div className="h-8 bg-gray-100 rounded-t-lg"></div>
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="h-12 bg-gray-50 border-t"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="bg-muted/50 p-4">
        <h3 className="font-medium">Teacher Performance</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/20">
              <th className="px-4 py-2 text-left text-sm font-medium">Teacher</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Subject</th>
              <th className="px-4 py-2 text-center text-sm font-medium">Section</th>
              <th className="px-4 py-2 text-center text-sm font-medium">Students</th>
              <th className="px-4 py-2 text-right text-sm font-medium">Avg. Score</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  No teacher data available
                </td>
              </tr>
            ) : (
              teachers.map((teacher, index) => (
                <tr 
                  key={teacher.teacher_id} 
                  className={`${index % 2 === 0 ? "bg-background" : "bg-muted/5"} ${
                    selectedTeacherId === teacher.teacher_id ? "bg-blue-50" : ""
                  } cursor-pointer hover:bg-muted/10`}
                  onClick={() => setSelectedTeacherId(
                    selectedTeacherId === teacher.teacher_id ? null : teacher.teacher_id
                  )}
                >
                  <td className="px-4 py-2 text-sm font-medium">{teacher.name}</td>
                  <td className="px-4 py-2 text-sm">{teacher.subject}</td>
                  <td className="px-4 py-2 text-sm text-center">{teacher.section}</td>
                  <td className="px-4 py-2 text-sm text-center">{teacher.student_count}</td>
                  <td className="px-4 py-2 text-sm font-medium text-right">
                    {teacher.avg_score.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {selectedTeacherId && (
        <div className="p-4 bg-muted/10 border-t">
          <p className="text-sm text-muted-foreground">
            Click on a teacher to see their top students and performance details
          </p>
        </div>
      )}
    </div>
  );
} 