
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string | ReactNode;
  trend?: "up" | "down";
  trendColor?: "text-red-600" | "text-green-600";
  subtitle?: string;
}

export const MetricCard = ({ 
  icon: Icon, 
  title, 
  value, 
  trend, 
  trendColor,
  subtitle 
}: MetricCardProps) => {
  return (
    <div className="p-3 bg-muted rounded-lg border border-primary/10">
      <div className="flex justify-between items-center">
        <span className="font-medium">{title}</span>
        <div className="flex items-center gap-2">
          <span className={`font-medium ${trendColor}`}>{value}</span>
          {trend === "up" && <div className="h-4 w-4 text-red-600">↑</div>}
          {trend === "down" && <div className="h-4 w-4 text-green-600">↓</div>}
        </div>
      </div>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export type { MetricCardProps };
