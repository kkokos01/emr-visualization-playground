
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Labs = () => {
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
          <h1 className="text-3xl font-bold mb-6">Pending Labs</h1>
          <div className="glass p-6">
            <p className="text-muted-foreground">Laboratory results and orders would appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labs;
