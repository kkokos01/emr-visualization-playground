
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, ClipboardList, History, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface QuickReferencePanelProps {
  patientId?: string;
}

interface ReferenceItem {
  id: string;
  title: string;
  date?: string;
  status?: "warning" | "error" | "default";
  included: boolean;
}

export const QuickReferencePanel = ({ patientId }: QuickReferencePanelProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["orders", "analyses", "alerts"]);
  
  const [orders, setOrders] = useState<ReferenceItem[]>([
    { id: "1", title: "HbA1c", date: "3 days ago", included: true },
    { id: "2", title: "Lipid Panel", date: "1 week ago", included: true },
    { id: "3", title: "Chest X-Ray", date: "2 weeks ago", included: true },
  ]);

  const [analyses, setAnalyses] = useState<ReferenceItem[]>([
    { id: "1", title: "Diabetes Management Review", date: "1 month ago", included: true },
    { id: "2", title: "Cardiovascular Risk Assessment", date: "3 months ago", included: true },
  ]);

  const [alerts, setAlerts] = useState<ReferenceItem[]>([
    { id: "1", title: "Due for medication review", status: "warning", included: true },
    { id: "2", title: "Elevated BP trend detected", status: "error", included: true },
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleItem = (section: string, itemId: string) => {
    const updateItems = (items: ReferenceItem[], setItems: React.Dispatch<React.SetStateAction<ReferenceItem[]>>) => {
      setItems(items.map(item =>
        item.id === itemId ? { ...item, included: !item.included } : item
      ));
    };

    switch (section) {
      case "orders":
        updateItems(orders, setOrders);
        break;
      case "analyses":
        updateItems(analyses, setAnalyses);
        break;
      case "alerts":
        updateItems(alerts, setAlerts);
        break;
    }
  };

  const renderSection = (
    title: string,
    icon: React.ReactNode,
    items: ReferenceItem[],
    section: string
  ) => {
    const isExpanded = expandedSections.includes(section);

    return (
      <Card>
        <CardHeader>
          <CardTitle 
            className="text-sm font-medium flex items-center gap-2 cursor-pointer"
            onClick={() => toggleSection(section)}
          >
            {icon}
            {title}
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </CardTitle>
        </CardHeader>
        {isExpanded && (
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${section}-${item.id}`}
                    checked={item.included}
                    onCheckedChange={() => toggleItem(section, item.id)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={`${section}-${item.id}`}
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        item.status === "error" ? "text-destructive" : 
                        item.status === "warning" ? "text-amber-600" : ""
                      }`}
                    >
                      {item.title}
                    </label>
                    {item.date && (
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-4 p-4">
      {renderSection("Recent Orders", <ClipboardList className="w-4 h-4" />, orders, "orders")}
      {renderSection("Previous Analyses", <History className="w-4 h-4" />, analyses, "analyses")}
      {renderSection("Relevant Alerts", <Bell className="w-4 h-4" />, alerts, "alerts")}
    </div>
  );
};
