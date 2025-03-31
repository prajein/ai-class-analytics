"use client";

import { useEffect, useState } from "react";
import { useDashboardStore } from "@/stores/dashboard-store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Define a type for statistics data
interface StatisticsData {
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
}

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function SubjectCharts() {
  const [stats, setStats] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { activeSubject } = useDashboardStore();

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/statistics');
        if (!response.ok) throw new Error('Failed to fetch statistics');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading || !stats) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="h-[300px] bg-gray-100 animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Prepare data for bar chart - best vs worst class performance
  const barData = Object.entries(stats.bestClassesPerSubject).map(([subject, classInfo]) => {
    const worstClass = stats.worstClassesPerSubject[subject];

    return {
      subject,
      best: parseFloat(classInfo.avg_score.toFixed(2)),
      worst: worstClass ? parseFloat(worstClass.avg_score.toFixed(2)) : 0,
    };
  });

  // Prepare data for pie chart - best individual scores by subject
  const pieData = Object.entries(stats.bestIndividualScores).map(([subject, scoreInfo]) => ({
    name: subject,
    value: scoreInfo.score,
  }));

  // Filter data if an active subject is selected
  const filteredBarData = activeSubject
    ? barData.filter((item) => item.subject === activeSubject)
    : barData;

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4">
        <h3 className="text-lg font-medium mb-4">
          Class Performance by Subject
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredBarData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="best"
                name="Best Class Average"
                fill="#0088FE"
              />
              <Bar
                dataKey="worst"
                name="Worst Class Average"
                fill="#FF8042"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="text-lg font-medium mb-4">
          Top Score Distribution by Subject
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `Score: ${value}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 