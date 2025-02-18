
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, ZoomIn, ZoomOut, Download } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CitationExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  sourceDocument?: {
    title: string;
    content: string;
    date: string;
    type: string;
  };
}

export const CitationExplorer = ({ isOpen, onClose, sourceDocument }: CitationExplorerProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[80vh]">
        <div className="grid grid-cols-12 gap-4 h-full">
          {/* Document View */}
          <div className="col-span-7 border rounded-lg">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Source Document</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Search in document..." className="flex-1" />
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <ScrollArea className="h-[calc(100%-8rem)] p-4">
              {sourceDocument ? (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    {sourceDocument.type} • {sourceDocument.date}
                  </div>
                  <h4 className="font-medium">{sourceDocument.title}</h4>
                  <div className="text-sm whitespace-pre-wrap">{sourceDocument.content}</div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  Select a source to view its content
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Evidence Chain */}
          <div className="col-span-5 border rounded-lg">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Evidence Chain</h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            <ScrollArea className="h-[calc(100%-4rem)] p-4">
              <div className="space-y-4">
                <div className="border rounded p-3">
                  <h4 className="font-medium mb-2">Connected Data Points</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      HbA1c Results - March 1, 2024
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      Previous Lab Results - December 15, 2023
                    </li>
                  </ul>
                </div>

                <div className="border rounded p-3">
                  <h4 className="font-medium mb-2">Related Patient History</h4>
                  <ul className="text-sm space-y-2">
                    <li>Initial Diabetes Diagnosis - 2020</li>
                    <li>Treatment Plan Updates - 2023</li>
                  </ul>
                </div>

                <div className="border rounded p-3">
                  <h4 className="font-medium mb-2">Alternative Interpretations</h4>
                  <div className="text-sm text-muted-foreground">
                    Consider potential impact of recent medication changes on results.
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
