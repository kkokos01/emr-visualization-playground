
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export const HealthTrendsSection = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-[#D3E4FD] bg-[#F8FAFC]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Lab Results</h3>
            <TrendingUp className="w-4 h-4 text-slate-600" />
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between items-center">
              <span>HbA1c</span>
              <span className="text-red-600">↑ 7.2% (Previous: 6.8%)</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Blood Pressure</span>
              <span className="text-green-600">↓ 128/82 (Previous: 135/88)</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Cholesterol</span>
              <span className="text-amber-600">→ 195 mg/dL (Stable)</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-[#D3E4FD] bg-[#F8FAFC]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Medication Changes</h3>
            <TrendingUp className="w-4 h-4 text-slate-600" />
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between items-center">
              <span>Metformin</span>
              <span className="text-blue-600">Dose increased</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Lisinopril</span>
              <span className="text-green-600">Maintained</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
