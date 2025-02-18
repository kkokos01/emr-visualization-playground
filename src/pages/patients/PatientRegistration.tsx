
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { DemographicsForm } from "@/components/registration/DemographicsForm";
import { InsuranceForm } from "@/components/registration/InsuranceForm";
import { PharmacyForm } from "@/components/registration/PharmacyForm";
import { ContactsForm } from "@/components/registration/ContactsForm";
import { AttachmentsForm } from "@/components/registration/AttachmentsForm";

const PatientRegistration = () => {
  const { id } = useParams();
  const isNewPatient = !id;

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <Link
        to="/patients"
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Patients
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isNewPatient ? "New Patient Registration" : "Edit Patient"}
          </h1>
          <p className="text-muted-foreground">
            {isNewPatient
              ? "Complete the form below to register a new patient"
              : "Update patient information"}
          </p>
        </div>
        {!isNewPatient && (
          <div className="text-sm text-muted-foreground">
            Patient ID: {id}
          </div>
        )}
      </div>

      <Card className="p-6">
        <Tabs defaultValue="demographics" className="space-y-6">
          <TabsList className="w-full justify-start bg-muted p-0 h-12">
            <TabsTrigger
              value="demographics"
              className="h-12 px-6 data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:border-b-2"
            >
              Demographics
            </TabsTrigger>
            <TabsTrigger
              value="insurance"
              className="h-12 px-6 data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:border-b-2"
            >
              Insurance
            </TabsTrigger>
            <TabsTrigger
              value="pharmacy"
              className="h-12 px-6 data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:border-b-2"
            >
              Pharmacy
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="h-12 px-6 data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:border-b-2"
            >
              Contacts
            </TabsTrigger>
            <TabsTrigger
              value="attachments"
              className="h-12 px-6 data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:border-b-2"
            >
              Attachments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="demographics" className="space-y-4 mt-6">
            <DemographicsForm />
          </TabsContent>

          <TabsContent value="insurance" className="space-y-4 mt-6">
            <InsuranceForm />
          </TabsContent>

          <TabsContent value="pharmacy" className="space-y-4 mt-6">
            <PharmacyForm />
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4 mt-6">
            <ContactsForm />
          </TabsContent>

          <TabsContent value="attachments" className="space-y-4 mt-6">
            <AttachmentsForm />
          </TabsContent>
        </Tabs>

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
