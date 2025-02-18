
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface AnalysisAccordionProps {
  patientId: string;
  activeSection: string;
}

export const AnalysisAccordion = ({ patientId, activeSection }: AnalysisAccordionProps) => {
  const sections = [
    {
      id: "blood-pressure",
      title: "Blood Pressure Analysis",
      summary: "Mild hypertension with recent upward trend",
      explanation: "Your blood pressure shows higher than optimal readings, which means your heart is working harder than it should.",
      whyItMatters: "High blood pressure can increase your risk of heart disease and stroke. Managing it now can prevent future complications.",
      questionsToAsk: [
        "What lifestyle changes could help lower my blood pressure?",
        "Should we adjust my current medications?",
        "How often should I monitor my blood pressure at home?"
      ],
      terms: [
        { term: "Hypertension", definition: "High blood pressure, when the force of blood against artery walls is too high" },
        { term: "Systolic", definition: "The top number in blood pressure, measuring pressure when heart beats" }
      ],
      sources: [
        "American Heart Association Guidelines 2024",
        "Recent clinical studies on hypertension management"
      ]
    },
    // ... Additional sections for blood sugar, cholesterol, etc.
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <Accordion type="single" defaultValue={activeSection} className="space-y-4">
          {sections.map(section => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="text-lg font-medium">
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">In Simple Terms</h4>
                  <p className="text-muted-foreground">{section.explanation}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-medium mb-2">Why This Matters</h4>
                      <p className="text-muted-foreground">{section.whyItMatters}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Questions to Ask Your Doctor</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {section.questionsToAsk.map((question, index) => (
                      <li key={index} className="text-muted-foreground">{question}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Medical Terms Explained</h4>
                  <div className="space-y-2">
                    {section.terms.map((item, index) => (
                      <div key={index} className="bg-muted p-3 rounded-lg">
                        <span className="font-medium">{item.term}:</span>
                        <span className="text-muted-foreground ml-2">{item.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Sources</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {section.sources.map((source, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{source}</li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
