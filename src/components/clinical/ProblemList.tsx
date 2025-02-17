
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface Problem {
  name: string;
  since: string;
  details: string;
}

interface ProblemListProps {
  problems: Problem[];
}

export const ProblemList = ({ problems }: ProblemListProps) => {
  return (
    <Card className="p-6" data-clickable="true">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Heart className="h-5 w-5 text-primary" />
        Active Problems
      </h3>
      <div className="space-y-3">
        {problems.map((problem, index) => (
          <div key={index} className="p-3 bg-muted rounded-lg border border-primary/10">
            <div className="flex justify-between items-center">
              <span className="font-medium text-foreground">{problem.name}</span>
              <span className="text-sm text-primary">Since {problem.since}</span>
            </div>
            <p className="text-sm text-primary/70 mt-1">{problem.details}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
