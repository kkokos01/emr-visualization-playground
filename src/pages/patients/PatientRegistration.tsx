
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, ChevronDown, ChevronUp, Expand, Shrink } from "lucide-react";
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

  const toggleAll = (expand: boolean) => {
    setExpandedSections({
      demographics: expand,
      insurance: expand,
      pharmacy: expand,
      contacts: expand,
    });
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

      <div className="flex justify-end gap-2 mb-6">
        <Button 
          variant="outline"
          size="sm"
          className="bg-primary/10 hover:bg-primary/20 border-0 text-primary"
          onClick={() => toggleAll(true)}
        >
          <Expand className="w-4 h-4 mr-2" />
          Expand All
        </Button>
        <Button 
          variant="outline"
          size="sm"
          className="bg-secondary/10 hover:bg-secondary/20 border-0 text-secondary"
          onClick={() => toggleAll(false)}
        >
          <Shrink className="w-4 h-4 mr-2" />
          Collapse All
        </Button>
      </div>

      <div className="space-y-6">
        {sections.map(({ id, label, component: Component }) => (
          <Card key={id} id={id} className="p-6 scroll-mt-20">
            <div 
              className="flex items-center justify-between cursor-pointer"
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
              <div className="pt-6">
                <Component />
              </div>
            )}
          </Card>
        ))}

        <Card className="p-6">
          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PatientRegistration;
