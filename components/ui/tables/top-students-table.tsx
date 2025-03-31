"use client";

import { useEffect, useState } from "react";
import { useDashboardStore } from "@/stores/dashboard-store";

interface Student {
  student_id: number;
  name: string;
  section: string;
  average_score: number;
}

export function TopStudentsTable() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { showTopStudents, filters } = useDashboardStore();

  useEffect(() => {
    const fetchTopStudents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/statistics');
        if (!response.ok) throw new Error('Failed to fetch statistics');
        const data = await response.json();
        
        // Use the top students data from the statistics endpoint
        setStudents(data.topStudents || []);
      } catch (error) {
        console.error("Error fetching top students:", error);
      } finally {
        setLoading(false);
      }
    };

    if (showTopStudents) {
      fetchTopStudents();
    }
  }, [showTopStudents, filters]);

  if (!showTopStudents) {
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
        <h3 className="font-medium">Top 10 Students by Average Score</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/20">
              <th className="px-4 py-2 text-left text-sm font-medium">Rank</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Section</th>
              <th className="px-4 py-2 text-right text-sm font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  No student data available
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr 
                  key={student.student_id} 
                  className={index % 2 === 0 ? "bg-background" : "bg-muted/5"}
                >
                  <td className="px-4 py-2 text-sm">{index + 1}</td>
                  <td className="px-4 py-2 text-sm font-medium">{student.name}</td>
                  <td className="px-4 py-2 text-sm">{student.section}</td>
                  <td className="px-4 py-2 text-sm font-medium text-right">
                    {student.average_score.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 