
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Printer, Download, Search, BookmarkPlus, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";

export default function PatientAnalysis() {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      {/* Welcome Header */}
      <Card className="bg-gradient-to-r from-[#FDE1D3] to-[#F5FAFD] border-none shadow-md">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#0A6EBD] to-[#2E8B57] bg-clip-text text-transparent">
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
              <Button variant="outline" size="sm" className="hover:bg-[#F2FCE2] hover:text-[#2E8B57] transition-all">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-[#F2FCE2] hover:text-[#2E8B57] transition-all">
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-[#F2FCE2] hover:text-[#2E8B57] transition-all">
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
                className="pl-9 bg-white/80 border-[#E5DEFF] focus:border-[#8B5CF6] transition-all" 
                placeholder="Search within this report..."
              />
            </div>
            <div className="flex gap-2">
              <Button className="bg-[#0A6EBD] hover:bg-[#085a9d] text-white shadow-lg hover:shadow-xl transition-all">
                <ArrowRight className="w-4 h-4 mr-2" />
                Jump to recommendations
              </Button>
              <Button variant="secondary" className="bg-[#F2FCE2] text-[#2E8B57] hover:bg-[#E2F0D2] border border-[#2E8B57]/20">
                <BookmarkPlus className="w-4 h-4 mr-2" />
                Save for later
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Navigation Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-[#D3E4FD] hover:border-[#0A6EBD]/20 bg-gradient-to-b from-white to-[#F5FAFD]">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2 text-[#0A6EBD] group-hover:text-[#085a9d]">
              Understanding Your Health
            </h3>
            <p className="text-slate-600">Review your current health status and recent changes</p>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-[#F2FCE2] hover:border-[#2E8B57]/20 bg-gradient-to-b from-white to-[#F2FCE2]">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2 text-[#2E8B57] group-hover:text-[#247347]">
              Recommendations
            </h3>
            <p className="text-slate-600">See what steps you should take next</p>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-[#E5DEFF] hover:border-[#8B5CF6]/20 bg-gradient-to-b from-white to-[#E5DEFF]">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2 text-[#8B5CF6] group-hover:text-[#7C4DEE]">
              Questions & Notes
            </h3>
            <p className="text-slate-600">Prepare for your next doctor visit</p>
          </CardContent>
        </Card>
      </div>

      {/* Executive Brief */}
      <Card className="border border-[#FDE1D3] bg-gradient-to-r from-white to-[#FDE1D3]/20">
        <CardHeader>
          <CardTitle className="text-[#F97316]">Executive Brief</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700">Content will be implemented in subsequent updates...</p>
        </CardContent>
      </Card>
    </div>
  );
}
