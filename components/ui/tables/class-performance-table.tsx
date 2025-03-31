"use client";

import { useEffect, useState } from "react";
import { useDashboardStore } from "@/stores/dashboard-store";

interface ClassPerformance {
  section: string;
  subject: string;
  avg_score: number;
  performance: 'Best' | 'Needs Improvement';
}

export function ClassPerformanceTable() {
  const [classes, setClasses] = useState<ClassPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const { filters, setFilters } = useDashboardStore();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/statistics');
        if (!response.ok) throw new Error('Failed to fetch statistics');
        const data = await response.json();
        
        // Combine best and worst classes for a complete view
        const allClasses: ClassPerformance[] = [];
        
        // Process best classes per subject
        if (data.bestClassesPerSubject) {
          Object.entries(data.bestClassesPerSubject).forEach(([subject, classInfo]: [string, any]) => {
            allClasses.push({
              section: classInfo.section,
              subject,
              avg_score: classInfo.avg_score,
              performance: 'Best'
            });
          });
        }
        
        // Process worst classes per subject
        if (data.worstClassesPerSubject) {
          Object.entries(data.worstClassesPerSubject).forEach(([subject, classInfo]: [string, any]) => {
            allClasses.push({
              section: classInfo.section,
              subject,
              avg_score: classInfo.avg_score,
              performance: 'Needs Improvement'
            });
          });
        }
        
        setClasses(allClasses);
      } catch (error) {
        console.error("Error fetching class performance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [filters]);

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

  const displayClasses = classes;

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="bg-muted/50 p-4">
        <h3 className="font-medium">Class Performance by Subject</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/20">
              <th className="px-4 py-2 text-left text-sm font-medium">Section</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Subject</th>
              <th className="px-4 py-2 text-right text-sm font-medium">Avg. Score</th>
              <th className="px-4 py-2 text-right text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {displayClasses.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  No class performance data available
                </td>
              </tr>
            ) : (
              displayClasses.map((classItem, index) => (
                <tr 
                  key={`${classItem.section}-${classItem.subject}`} 
                  className={`${index % 2 === 0 ? "bg-background" : "bg-muted/5"} cursor-pointer hover:bg-muted/10`}
                  onClick={() => setFilters({ 
                    section: classItem.section, 
                    subject: classItem.subject 
                  })}
                >
                  <td className="px-4 py-2 text-sm font-medium">{classItem.section}</td>
                  <td className="px-4 py-2 text-sm">{classItem.subject}</td>
                  <td className="px-4 py-2 text-sm text-right">
                    {classItem.avg_score.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-sm text-right">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      classItem.performance === 'Best' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {classItem.performance}
                    </span>
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