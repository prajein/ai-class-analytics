import React from "react";

interface DashboardHeaderProps {
  heading: string;
  description?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({
  heading,
  description,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col items-start gap-2 pb-5 pt-2 md:flex-row md:items-center md:justify-between">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl font-bold tracking-tight">{heading}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
} 