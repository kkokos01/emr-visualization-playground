
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
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
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          <div className="grid gap-6">
            <div className="glass p-6">
              <h2 className="text-xl font-semibold mb-4">Appointment Management</h2>
              <p className="text-muted-foreground">Schedule and manage patient appointments here.</p>
            </div>
            
            <div className="glass p-6">
              <h2 className="text-xl font-semibold mb-4">Staff Schedule</h2>
              <p className="text-muted-foreground">View and manage staff schedules and rotations.</p>
            </div>
            
            <div className="glass p-6">
              <h2 className="text-xl font-semibold mb-4">Practice Analytics</h2>
              <p className="text-muted-foreground">Access practice performance metrics and reports.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
