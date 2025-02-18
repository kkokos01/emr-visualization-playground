
import { ReactNode } from "react";
import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AIAssistant } from "@/components/ai/AIAssistant";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopNav />
          <main className="flex-1 bg-background mt-16">
            <div className="container max-w-7xl mx-auto px-4 pb-8">
              {children}
            </div>
          </main>
        </div>
      </div>
      <style>{`
        [data-mobile=true].custom-sheet {
          background-color: hsl(var(--background));
        }
      `}</style>
      <AIAssistant />
    </SidebarProvider>
  );
};
