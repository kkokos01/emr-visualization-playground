
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
              <Button className="bg-[#0A6EBD] hover:bg-[#085a9d] text-white">
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

      {/* Quick Navigation Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-all duration-300 cursor-pointer border-[#D3E4FD] hover:border-[#0A6EBD] bg-[#F5FAFD]">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2 text-slate-800">
              Understanding Your Health
            </h3>
            <p className="text-slate-600">Review your current health status and recent changes</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all duration-300 cursor-pointer border-[#D3E4FD] hover:border-[#2E8B57] bg-[#F2FCE2]">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2 text-slate-800">
              Recommendations
            </h3>
            <p className="text-slate-600">See what steps you should take next</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all duration-300 cursor-pointer border-[#D3E4FD] hover:border-[#0A6EBD] bg-[#E5DEFF]">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2 text-slate-800">
              Questions & Notes
            </h3>
            <p className="text-slate-600">Prepare for your next doctor visit</p>
          </CardContent>
        </Card>
      </div>

      {/* Executive Brief */}
      <Card className="border-[#D3E4FD] bg-white">
        <CardHeader>
          <CardTitle className="text-[#0A6EBD]">Executive Brief</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700">Content will be implemented in subsequent updates...</p>
        </CardContent>
      </Card>
    </div>
  );
}
