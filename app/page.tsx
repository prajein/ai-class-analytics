import { DashboardHeader } from "@/components/ui/dashboard/header";
import { DashboardShell } from "@/components/ui/dashboard/shell";
import { StatsCards } from "@/components/ui/dashboard/stats-cards";
import { SubjectCharts } from "@/components/ui/dashboard/subject-charts";
import { ClassPerformanceTable } from "@/components/ui/tables/class-performance-table";
import { TopStudentsTable } from "@/components/ui/tables/top-students-table";
import { TeacherPerformanceTable } from "@/components/ui/tables/teacher-performance-table";

export default function Home() {
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="AI Department Analytics" 
        description="View and analyze AI Department midsemester scores."
      />
      
      <div className="space-y-8">
        <StatsCards />
        
        <div className="grid gap-8 md:grid-cols-2">
          <ClassPerformanceTable />
          <TopStudentsTable />
        </div>
        
        <SubjectCharts />
        
        <TeacherPerformanceTable />
      </div>
    </DashboardShell>
  );
}
