
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, ChevronDown, ChevronUp } from "lucide-react";
import { DemographicsForm } from "@/components/registration/DemographicsForm";
import { InsuranceForm } from "@/components/registration/InsuranceForm";
import { PharmacyForm } from "@/components/registration/PharmacyForm";
import { ContactsForm } from "@/components/registration/ContactsForm";
import { AttachmentsForm } from "@/components/registration/AttachmentsForm";
import { cn } from "@/lib/utils";

const PatientRegistration = () => {
  const { id } = useParams();
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    demographics: true,
    insurance: true,
    pharmacy: true,
    contacts: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const navPosition = navRef.current.getBoundingClientRect().top;
        setIsSticky(navPosition <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -60;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const sections = [
    { id: 'demographics', label: 'Demographics', component: DemographicsForm },
    { id: 'insurance', label: 'Insurance', component: InsuranceForm },
    { id: 'pharmacy', label: 'Pharmacy', component: PharmacyForm },
    { id: 'contacts', label: 'Contacts', component: ContactsForm },
  ];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Document Upload Section */}
      <AttachmentsForm />

      <div 
        ref={navRef}
        className={cn(
          "flex gap-4 p-4 bg-background rounded-t-lg border-b transition-all duration-200",
          isSticky && "fixed top-0 left-0 right-0 z-50 shadow-md"
        )}
      >
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="text-muted-foreground hover:text-primary hover:underline px-4 py-2"
          >
            {section.label}
          </button>
        ))}
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {sections.map(({ id, label, component: Component }) => (
            <div key={id} id={id} className="scroll-mt-20">
              <div 
                className="flex items-center justify-between cursor-pointer py-4"
                onClick={() => toggleSection(id)}
              >
                <h2 className="text-xl font-semibold">{label}</h2>
                <Button variant="ghost" size="icon">
                  {expandedSections[id] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {expandedSections[id] && (
                <div className="pt-4">
                  <Component />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PatientRegistration;
