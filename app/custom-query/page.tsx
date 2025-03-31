import { DashboardHeader } from "@/components/ui/dashboard/header";
import { DashboardShell } from "@/components/ui/dashboard/shell";
import { CustomQueryForm } from "@/components/ui/forms/custom-query-form";

export default function CustomQueryPage() {
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Custom SQL Query" 
        description="Run custom SQL queries against the database."
      />
      
      <div className="space-y-8">
        <CustomQueryForm />
      </div>
    </DashboardShell>
  );
} 