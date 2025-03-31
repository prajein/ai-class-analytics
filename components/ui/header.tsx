"use client";

import { MainNav } from "@/components/ui/nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex">
            <h1 className="text-xl font-bold text-primary">AI Class Analytics</h1>
          </div>
          <div className="hidden md:block">
            <MainNav />
          </div>
        </div>
      </div>
    </header>
  );
} 