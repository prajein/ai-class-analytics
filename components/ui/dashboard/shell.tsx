import React from "react";
import { cn } from "@/lib/utils";

export function DashboardShell({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("grid items-start gap-4 p-4 sm:p-6", className)} {...props}>
      {children}
    </div>
  );
} 