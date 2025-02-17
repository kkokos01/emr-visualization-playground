
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Nurse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portal
        </Link>
        
        <div className="card-gradient p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-6">Nurse Dashboard</h1>
          <div className="grid gap-6">
            <div className="glass p-6">
              <h2 className="text-xl font-semibold mb-4">Patient Intake</h2>
              <p className="text-muted-foreground">Manage patient intake and initial assessments here.</p>
            </div>
            
            <div className="glass p-6">
              <h2 className="text-xl font-semibold mb-4">Tasks & Orders</h2>
              <p className="text-muted-foreground">View and manage pending tasks and physician orders.</p>
            </div>
            
            <div className="glass p-6">
              <h2 className="text-xl font-semibold mb-4">Medication Schedule</h2>
              <p className="text-muted-foreground">Track and manage medication administration schedules.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nurse;
