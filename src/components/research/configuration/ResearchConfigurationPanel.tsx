
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Brain, Calendar, Search, Upload, MessageSquare, FilePlus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ResearchConfigurationPanelProps {
  patientId?: string;
  mode?: "physician" | "patient";
}

export const ResearchConfigurationPanel = ({ patientId, mode = "physician" }: ResearchConfigurationPanelProps) => {
  const [additionalContext, setAdditionalContext] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [saveForFuture, setSaveForFuture] = useState(false);

  const physicianNotes = [
    { id: "note1", date: "2024-03-01", title: "Primary Care Visit Note", provider: "Dr. Smith" },
    { id: "note2", date: "2024-02-15", title: "Cardiology Consultation", provider: "Dr. Johnson" },
    { id: "note3", date: "2024-01-30", title: "Endocrinology Follow-up", provider: "Dr. Wilson" },
    { id: "pat1", date: "2024-02-20", title: "Blood Sugar Readings.pdf", provider: "Patient Upload" },
    { id: "pat2", date: "2024-02-01", title: "Previous Medical Records.pdf", provider: "Patient Upload" },
  ];

  // Initialize selectedNotes with all note IDs
  const [selectedNotes, setSelectedNotes] = useState<string[]>(
    physicianNotes.map(note => note.id)
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const toggleNote = (noteId: string) => {
    setSelectedNotes(prev => 
      prev.includes(noteId) 
        ? prev.filter(id => id !== noteId)
        : [...prev, noteId]
    );
  };

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Analysis Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Analysis Scope</Label>
            <RadioGroup defaultValue="comprehensive">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comprehensive" id="comprehensive" />
                <Label htmlFor="comprehensive">Comprehensive Analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="focused" id="focused" />
                <Label htmlFor="focused">Focused on Current Condition</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="specific" id="specific" />
                <Label htmlFor="specific">Specific Time Period</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>History Depth</Label>
            <div className="px-2">
              <Slider defaultValue={[5]} max={10} step={1} />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>1 year</span>
                <span>5 years</span>
                <span>10 years</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Priority Areas</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Recent Changes
              </Button>
              <Button variant="outline" className="justify-start">
                <Search className="w-4 h-4 mr-2" />
                Similar Cases
              </Button>
              <Button variant="outline" className="justify-start">
                <Brain className="w-4 h-4 mr-2" />
                Treatment Patterns
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Research Objective</Label>
            <Textarea 
              placeholder="Please describe what you'd like to learn from this analysis..."
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button className="w-full mt-6">
            Start Deep Analysis
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Physician Notes and Patient Context</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Input
              type="file"
              multiple
              id="files"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => document.getElementById('files')?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="save-future"
                checked={saveForFuture}
                onCheckedChange={(checked) => setSaveForFuture(checked as boolean)}
              />
              <label
                htmlFor="save-future"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Save for Future Reference
              </label>
            </div>
            {selectedFiles && Array.from(selectedFiles).map((file, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <FilePlus className="w-4 h-4" />
                {file.name}
              </div>
            ))}
          </div>

          <div className="space-y-4 mt-6">
            {physicianNotes.map((note) => (
              <div key={note.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id={note.id}
                  checked={selectedNotes.includes(note.id)}
                  onCheckedChange={() => toggleNote(note.id)}
                />
                <div className="flex-1">
                  <label
                    htmlFor={note.id}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {note.title}
                  </label>
                  <div className="text-sm text-muted-foreground mt-1">
                    {note.provider} • {note.date}
                  </div>
                </div>
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
