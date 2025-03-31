"use client";

import { useEffect, useState } from "react";
import { useDashboardStore } from "@/stores/dashboard-store";

// Define type for statistics data
interface StatisticsData {
  failedClassesCount: number;
  bestClassesPerSubject: Record<string, {
    section: string;
    avg_score: number;
  }>;
  worstClassesPerSubject: Record<string, {
    section: string;
    avg_score: number;
  }>;
  bestIndividualScores: Record<string, {
    student_id: number;
    name: string;
    score: number;
  }>;
  worstIndividualScores: Record<string, {
    student_id: number;
    name: string;
    score: number;
  }>;
  topStudents: Array<{
    student_id: number;
    name: string;
    section: string;
    average_score: number;
  }>;
  teacherPerformance: Array<{
    teacher_id: number;
    name: string;
    subject: string;
    section: string;
    avg_score: number;
    student_count: number;
  }>;
}

async function fetchStatistics() {
  try {
    const response = await fetch('/api/statistics');
    if (!response.ok) throw new Error('Failed to fetch statistics');
    return await response.json() as StatisticsData;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
}

export function StatsCards() {
  const [stats, setStats] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showFailedClasses } = useDashboardStore();

  useEffect(() => {
    const getStats = async () => {
      try {
        setLoading(true);
        const data = await fetchStatistics();
        setStats(data);
        setError(null);
      } catch (err) {
        setError("Failed to load statistics");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="bg-card border rounded-lg shadow p-4">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">
                <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-24 mt-1 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="rounded-md bg-red-100 p-4">
        <div className="text-sm text-red-800">
          {error || "Failed to load statistics"}
        </div>
      </div>
    );
  }

  // Get the first subject from bestIndividualScores
  const topSubject = Object.keys(stats.bestIndividualScores)[0];
  const topSubjectScore = stats.bestIndividualScores[topSubject]?.score;

  // Get the first subject from bestClassesPerSubject
  const bestSubject = Object.keys(stats.bestClassesPerSubject)[0];
  const bestClass = stats.bestClassesPerSubject[bestSubject];

  // Get the first subject from worstClassesPerSubject
  const worstSubject = Object.keys(stats.worstClassesPerSubject)[0];
  const worstClass = stats.worstClassesPerSubject[worstSubject];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {showFailedClasses && (
        <div className="bg-white border rounded-lg shadow p-4">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">
              Classes Missing Scores
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.failedClassesCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.failedClassesCount > 0 ? "Action required" : "All classes reporting"}
            </p>
          </div>
        </div>
      )}

      <div className="bg-white border rounded-lg shadow p-4">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium">
            Top Subject Score
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold">
            {topSubjectScore || "N/A"}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {topSubject || "No data"}
          </p>
        </div>
      </div>

      <div className="bg-white border rounded-lg shadow p-4">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium">
            Best Class
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold">
            {bestClass?.section || "N/A"}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {bestSubject}: {bestClass?.avg_score?.toFixed(2) || "N/A"}
          </p>
        </div>
      </div>

      <div className="bg-white border rounded-lg shadow p-4">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium">
            Needs Improvement
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold">
            {worstClass?.section || "N/A"}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {worstSubject}: {worstClass?.avg_score?.toFixed(2) || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
} 