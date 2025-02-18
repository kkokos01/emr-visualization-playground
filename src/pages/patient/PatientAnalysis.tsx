import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Printer, Download, Search, BookmarkPlus, ArrowRight, ChevronDown, ChevronUp, MoveDown, MoveUp, Brain, Microscope, Stethoscope, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";

export default function PatientAnalysis() {
  const { id } = useParams();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    health: false,
    recommendations: false,
    questions: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const expandAll = () => {
    setExpandedSections({
      health: true,
      recommendations: true,
      questions: true
    });
  };

  const collapseAll = () => {
    setExpandedSections({
      health: false,
      recommendations: false,
      questions: false
    });
  };

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      setExpandedSections(prev => ({
        ...prev,
        [section]: true
      }));
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      {/* Welcome Header */}
      <Card className="bg-[#F5FAFD] border-[#D3E4FD]">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold text-[#0A6EBD]">
                Your Health Analysis
              </CardTitle>
              <p className="text-slate-700 mt-3 text-lg">
                We've analyzed your health information to help you better understand your health journey.
              </p>
              <p className="text-slate-600 mt-2 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-[#2E8B57] mr-2"></span>
                Estimated reading time: 8 minutes
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
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-9 bg-white border-[#D3E4FD] focus:border-[#0A6EBD]" 
                placeholder="Search within this report..."
              />
            </div>
            <div className="flex gap-2">
              <Button className="bg-[#0A6EBD] hover:bg-[#085a9d] text-white" onClick={() => scrollToSection('recommendations')}>
                <ArrowRight className="w-4 h-4 mr-2" />
                View key findings
              </Button>
              <Button variant="outline" className="border-[#2E8B57] text-[#2E8B57] hover:bg-[#F2FCE2]">
                <BookmarkPlus className="w-4 h-4 mr-2" />
                Save for later
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Educational Context Card */}
      <Card className="border-[#8B5CF6] bg-[#F5F3FF]">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border border-[#8B5CF6]/20">
                <Brain className="w-6 h-6 text-[#8B5CF6] mb-2" />
                <h3 className="font-semibold text-lg mb-2">Understanding Your Health</h3>
                <p className="text-sm text-slate-600">
                  Our AI analysis provides initial insights into your health patterns and potential areas of focus.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border border-[#8B5CF6]/20">
                <Microscope className="w-6 h-6 text-[#8B5CF6] mb-2" />
                <h3 className="font-semibold text-lg mb-2">Deeper Analysis Available</h3>
                <p className="text-sm text-slate-600">
                  Want to explore specific aspects of your health in detail? Our comprehensive second opinion service dives deeper.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border border-[#8B5CF6]/20">
                <Stethoscope className="w-6 h-6 text-[#8B5CF6] mb-2" />
                <h3 className="font-semibold text-lg mb-2">Expert Guidance</h3>
                <p className="text-sm text-slate-600">
                  Use these insights to have more informed discussions with your healthcare providers.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Card className="border-[#D3E4FD] bg-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-[#0A6EBD]">Comprehensive Health Assessment (non-diagnostic)</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={expandAll}>
                <MoveDown className="w-4 h-4 mr-2" />
                Expand All
              </Button>
              <Button variant="outline" size="sm" onClick={collapseAll}>
                <MoveUp className="w-4 h-4 mr-2" />
                Collapse All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Understanding Your Health Section */}
          <div id="health" className="border rounded-lg overflow-hidden">
            <div 
              className="bg-[#EBF5FB] p-4 flex justify-between items-center cursor-pointer border-[#0A6EBD]"
              onClick={() => toggleSection('health')}
            >
              <h3 className="text-lg font-semibold text-slate-800">Understanding Your Health</h3>
              {expandedSections.health ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
            {expandedSections.health && (
              <div className="p-4 bg-white">
                <p className="text-slate-700 mb-4">Your recent health assessment shows several key areas of focus:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>Blood pressure readings have been consistently within target range</li>
                  <li>Cholesterol levels show improvement from previous measurements</li>
                  <li>Exercise routine has been maintained at recommended frequency</li>
                  <li>Sleep patterns indicate good quality rest most nights</li>
                </ul>
              </div>
            )}
          </div>

          {/* Recommendations Section */}
          <div id="recommendations" className="border rounded-lg overflow-hidden">
            <div 
              className="bg-[#F2FCE2] p-4 flex justify-between items-center cursor-pointer border-[#2E8B57]"
              onClick={() => toggleSection('recommendations')}
            >
              <h3 className="text-lg font-semibold text-slate-800">Recommendations</h3>
              {expandedSections.recommendations ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
            {expandedSections.recommendations && (
              <div className="p-4 bg-white">
                <div className="mb-6 p-4 bg-[#F2FCE2] border-2 border-[#2E8B57] rounded-lg">
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">Recommended Physician Follow-up</h4>
                  <div className="space-y-3">
                    <p className="text-slate-700">Schedule an appointment with Dr. Thompson to discuss:</p>
                    <ul className="list-disc list-inside space-y-2 text-slate-600 mb-4">
                      <li>Review of recent lab results and medication adjustments</li>
                      <li>Update to preventive care schedule</li>
                      <li>Discussion of lifestyle modifications</li>
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        className="bg-[#2E8B57] hover:bg-[#247347] text-white"
                        onClick={() => window.location.href = '/appointments'}
                      >
                        Book Appointment Now
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-[#2E8B57] text-[#2E8B57] hover:bg-[#F2FCE2]"
                        onClick={() => window.location.href = `/patient/${id}/second-opinion`}
                      >
                        Get a Second Opinion
                      </Button>
                    </div>
                  </div>
                </div>

                <p className="text-slate-700 mb-4">Additional recommendations for your health management:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>Continue current exercise routine with focus on strength training</li>
                  <li>Maintain current medication schedule</li>
                  <li>Consider scheduling a nutrition consultation</li>
                </ul>
              </div>
            )}
          </div>

          {/* Questions & Notes Section */}
          <div id="questions" className="border rounded-lg overflow-hidden">
            <div 
              className="bg-[#FEF7CD] p-4 flex justify-between items-center cursor-pointer border-[#E67E22]"
              onClick={() => toggleSection('questions')}
            >
              <h3 className="text-lg font-semibold text-slate-800">Questions & Notes</h3>
              {expandedSections.questions ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
            {expandedSections.questions && (
              <div className="p-4 bg-white">
                <p className="text-slate-700 mb-4">Consider discussing these topics at your next appointment:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>Recent changes in sleep pattern and potential solutions</li>
                  <li>Updated family medical history information</li>
                  <li>Seasonal allergy management strategies</li>
                  <li>Preventive screening schedule for the upcoming year</li>
                </ul>
              </div>
            )}
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
