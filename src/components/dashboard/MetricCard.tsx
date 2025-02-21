
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
}

export const MetricCard = ({ label, value, icon: Icon }: MetricCardProps) => {
  return (
    <Card
      className="p-6"
      data-clickable="true"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          {label}
        </h3>
        <Icon className="w-5 h-5 text-primary opacity-75" />
      </div>
      <p className="text-2xl font-semibold text-foreground">{value}</p>
    </Card>
  );
};
