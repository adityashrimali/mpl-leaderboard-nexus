import { useState } from "react";
import { Persona } from "@/types/mpl";
import PersonaTabs from "@/components/shared/PersonaTabs";
import LiveStatsDashboard from "@/components/shared/LiveStatsDashboard";
import PersonaInsights from "@/components/shared/PersonaInsights";
import InternalPanel from "@/components/shared/InternalPanel";

const EventsTab = () => {
  const [activePersona, setActivePersona] = useState<Persona>('whale');

  const handlePersonaChange = (persona: Persona) => {
    setActivePersona(persona);
  };

  return (
    <div className="space-y-8">
      {/* Events Configuration */}
      <InternalPanel title="Time-Limited Events Configuration">
        <div className="p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-gray-600">Events configuration panel coming soon...</p>
          <p className="text-sm text-gray-500 mt-2">
            Will include Diwali Challenge, Weekly Events, and seasonal campaigns
          </p>
        </div>
      </InternalPanel>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Time-Limited Events – Live Preview
          </h2>
          <p className="text-gray-600">
            Configure and preview seasonal challenges, weekly events, and limited-time campaigns.
          </p>
        </div>
        
        <PersonaTabs 
          activePersona={activePersona}
          onPersonaChange={handlePersonaChange}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Event Preview</h3>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-600">Event preview coming soon...</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1 xl:col-span-2 space-y-4">
            <LiveStatsDashboard />
            <PersonaInsights activePersona={activePersona} />

            {/* Events Math Model */}
            <InternalPanel title="Events Math Model">
              <div className="p-4 bg-gray-100 rounded-lg text-center">
                <p className="text-gray-600">Events math model coming soon...</p>
                <p className="text-sm text-gray-500 mt-2">
                  Will include participation rates, reward costs, and retention lift calculations
                </p>
              </div>
            </InternalPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsTab;