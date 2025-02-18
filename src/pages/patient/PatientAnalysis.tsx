
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Printer, Download, Search, BookmarkPlus, ArrowRight, TrendingUp, Brain, BookOpen, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useParams, Link } from "react-router-dom";

export default function PatientAnalysis() {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      {/* Header */}
      <Card className="bg-[#F5FAFD] border-[#D3E4FD]">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold text-[#0A6EBD]">
                Your Health Analysis
              </CardTitle>
              <p className="text-slate-700 mt-3 text-lg">
                Review your health trends and discover opportunities for deeper understanding.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="hover:bg-slate-50">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-slate-50">
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-slate-50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Basic Health Trends */}
      <Card className="border-[#D3E4FD]">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800">Recent Health Trends</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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

          <div className="bg-[#F5F3FF] p-4 rounded-lg border border-[#8B5CF6]/20">
            <p className="text-sm text-slate-600">
              This is a basic overview of your recent health changes. For a more comprehensive understanding of your health patterns and expert insights, consider our Second Opinion analysis.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Second Opinion CTA */}
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
              <Link to={`/patient/${id}/second-opinion`}>
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
    </div>
  );
}
