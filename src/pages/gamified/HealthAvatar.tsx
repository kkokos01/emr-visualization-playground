
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { AvatarDisplay } from "./components/AvatarDisplay";
import { HealthStats } from "./components/HealthStats";
import { BodyMetricsPanel } from "./components/BodyMetricsPanel";

export default function HealthAvatar() {
  const [timeOffset, setTimeOffset] = useState([0]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);

  const handleTimeChange = (value: number[]) => {
    setTimeOffset(value);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#0A6EBD] mb-2">Future You</h1>
        <p className="text-slate-600">Visualize your health journey through time</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="p-6 bg-[#F8FAFC] border-[#D3E4FD]">
            <AvatarDisplay 
              timeOffset={timeOffset[0]} 
              selectedBodyPart={selectedBodyPart}
              onBodyPartSelect={setSelectedBodyPart}
            />
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Past</span>
                <span>Present</span>
                <span>Future</span>
              </div>
              <Slider
                value={timeOffset}
                onValueChange={handleTimeChange}
                min={-5}
                max={5}
                step={1}
                className="w-full"
              />
              <div className="text-center text-sm text-slate-600">
                {timeOffset[0] === 0 ? "Current" : 
                 timeOffset[0] < 0 ? `${Math.abs(timeOffset[0])} years ago` :
                 `${timeOffset[0]} years from now`}
              </div>
            </div>
          </Card>

          {selectedBodyPart && (
            <BodyMetricsPanel bodyPart={selectedBodyPart} timeOffset={timeOffset[0]} />
          )}
        </div>

        <div>
          <HealthStats timeOffset={timeOffset[0]} />
        </div>
      </div>
    </div>
  );
}
