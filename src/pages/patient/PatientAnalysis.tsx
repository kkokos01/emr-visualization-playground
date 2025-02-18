
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
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">Welcome, Sarah</CardTitle>
              <p className="text-muted-foreground mt-2">
                I've carefully reviewed your health information and prepared this analysis for you.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Estimated reading time: 8 minutes
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm">
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
                className="pl-9" 
                placeholder="Search within this report..."
              />
            </div>
            <div className="flex gap-2">
              <Button>
                <ArrowRight className="w-4 h-4 mr-2" />
                Jump to recommendations
              </Button>
              <Button variant="secondary">
                <BookmarkPlus className="w-4 h-4 mr-2" />
                Save for later
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Navigation Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:border-primary/20 cursor-pointer transition-all">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2">Understanding Your Health</h3>
            <p className="text-muted-foreground">Review your current health status and recent changes</p>
          </CardContent>
        </Card>
        
        <Card className="hover:border-primary/20 cursor-pointer transition-all">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2">Recommendations</h3>
            <p className="text-muted-foreground">See what steps you should take next</p>
          </CardContent>
        </Card>
        
        <Card className="hover:border-primary/20 cursor-pointer transition-all">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2">Questions & Notes</h3>
            <p className="text-muted-foreground">Prepare for your next doctor visit</p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for Executive Brief */}
      <Card>
        <CardHeader>
          <CardTitle>Executive Brief</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Content will be implemented in subsequent updates...</p>
        </CardContent>
      </Card>
    </div>
  );
}
