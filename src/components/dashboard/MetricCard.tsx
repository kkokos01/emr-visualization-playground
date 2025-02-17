
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
}

export const MetricCard = ({ label, value, icon: Icon }: MetricCardProps) => {
  return (
    <div
      className="card-gradient p-6 rounded-lg shadow-sm border border-muted"
      data-clickable="true"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          {label}
        </h3>
        <Icon className="w-5 h-5 text-primary opacity-75" />
      </div>
      <p className="text-2xl font-semibold text-foreground">{value}</p>
    </div>
  );
};
