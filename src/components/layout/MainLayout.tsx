
import { ReactNode } from "react";
import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

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
          <main className="flex-1 bg-gradient-to-br from-background to-muted">
            {/* AI Quick Actions */}
            <div className="container max-w-7xl mx-auto px-4 py-4">
              <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-primary/70 mb-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">AI Suggestions</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="secondary" size="sm" className="bg-white/50 hover:bg-white/80">
                    🔍 Analyze upcoming appointments
                  </Button>
                  <Button variant="secondary" size="sm" className="bg-white/50 hover:bg-white/80">
                    📊 Generate daily summary
                  </Button>
                  <Button variant="secondary" size="sm" className="bg-white/50 hover:bg-white/80">
                    ⚡ Optimize schedule
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="container max-w-7xl mx-auto px-4 pb-8">
              {children}
            </div>
          </main>
        </div>
      </div>
      <AIAssistant />
    </SidebarProvider>
  );
};
