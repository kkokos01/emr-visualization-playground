
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Printer, Download, Search, BookmarkPlus, ArrowRight, ChevronDown, ChevronUp, MoveDown, MoveUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
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
                Welcome, Sarah
              </CardTitle>
              <p className="text-slate-700 mt-3 text-lg">
                I've carefully reviewed your health information and prepared this analysis for you.
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
                Jump to recommendations
              </Button>
              <Button variant="outline" className="border-[#2E8B57] text-[#2E8B57] hover:bg-[#F2FCE2]">
                <BookmarkPlus className="w-4 h-4 mr-2" />
                Save for later
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className="hover:shadow-md transition-all duration-300 cursor-pointer border-[#0A6EBD] hover:border-[#085a9d] bg-[#EBF5FB]"
          onClick={() => scrollToSection('health')}
        >
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2 text-slate-800">
              Understanding Your Health
            </h3>
            <p className="text-slate-600">Review your current health status and recent changes</p>
          </CardContent>
        </Card>
        
        <Card 
          className="hover:shadow-md transition-all duration-300 cursor-pointer border-[#2E8B57] hover:border-[#247347] bg-[#F2FCE2]"
          onClick={() => scrollToSection('recommendations')}
        >
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2 text-slate-800">
              Recommendations
            </h3>
            <p className="text-slate-600">See what steps you should take next</p>
          </CardContent>
        </Card>
        
        <Card 
          className="hover:shadow-md transition-all duration-300 cursor-pointer border-[#E67E22] hover:border-[#D35400] bg-[#FEF7CD]"
          onClick={() => scrollToSection('questions')}
        >
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2 text-slate-800">
              Questions & Notes
            </h3>
            <p className="text-slate-600">Prepare for your next doctor visit</p>
          </CardContent>
        </Card>
      </div>

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
                    <Button 
                      className="w-full sm:w-auto bg-[#2E8B57] hover:bg-[#247347] text-white"
                      onClick={() => window.location.href = '/appointments'}
                    >
                      Book Appointment Now
                    </Button>
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
    </div>
  );
}
