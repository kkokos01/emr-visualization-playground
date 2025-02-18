
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, BookOpen, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

interface SecondOpinionCTAProps {
  patientId: string;
}

export const SecondOpinionCTA = ({ patientId }: SecondOpinionCTAProps) => {
  return (
    <Card className="border-[#8B5CF6] bg-gradient-to-r from-[#F5F3FF] to-white">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold text-[#8B5CF6]">
              Want to Understand Your Health More Deeply?
            </h2>
            <p className="text-slate-700">
              Our comprehensive Second Opinion service provides:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Brain className="w-5 h-5 text-[#8B5CF6] mt-1" />
                <div>
                  <p className="font-medium">In-Depth Analysis</p>
                  <p className="text-sm text-slate-600">Advanced AI analysis of your complete medical history</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <BookOpen className="w-5 h-5 text-[#8B5CF6] mt-1" />
                <div>
                  <p className="font-medium">Educational Insights</p>
                  <p className="text-sm text-slate-600">Better understand your health conditions and treatment options</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Stethoscope className="w-5 h-5 text-[#8B5CF6] mt-1" />
                <div>
                  <p className="font-medium">Informed Discussions</p>
                  <p className="text-sm text-slate-600">Get prepared for more meaningful conversations with your healthcare team</p>
                </div>
              </li>
            </ul>
            <Link to={`/patient/${patientId}/second-opinion`}>
              <Button className="mt-4 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
                <ArrowRight className="w-4 h-4 mr-2" />
                Explore Second Opinion Analysis
              </Button>
            </Link>
          </div>
          <div className="md:w-1/3 p-6 bg-white rounded-lg border border-[#8B5CF6]/20 shadow-lg">
            <h3 className="font-semibold text-lg mb-4 text-[#8B5CF6]">What You'll Learn</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6]"></span>
                Detailed analysis of your health patterns
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6]"></span>
                Potential areas for preventive care
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6]"></span>
                Understanding of treatment effectiveness
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6]"></span>
                Personalized health insights
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
