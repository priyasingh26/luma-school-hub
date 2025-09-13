import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarWidth] = useState(280);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar sidebarWidth={sidebarWidth} />
      
      <main 
        style={{ marginLeft: sidebarWidth }}
        className="pt-16 transition-all duration-300"
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}