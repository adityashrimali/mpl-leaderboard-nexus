import { useState } from "react";
import { Persona } from "@/types/mpl";
import PersonaTabs from "@/components/shared/PersonaTabs";
import LiveStatsDashboard from "@/components/shared/LiveStatsDashboard";
import PersonaInsights from "@/components/shared/PersonaInsights";
import InternalPanel from "@/components/shared/InternalPanel";

const BattlePassTab = () => {
  const [activePersona, setActivePersona] = useState<Persona>('whale');

  const handlePersonaChange = (persona: Persona) => {
    setActivePersona(persona);
  };

  return (
    <div className="space-y-8">
      {/* Battle Pass Configuration */}
      <InternalPanel title="Battle Pass Configuration">
        <div className="p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-gray-600">Battle Pass configuration panel coming soon...</p>
          <p className="text-sm text-gray-500 mt-2">
            Will include seasonal tiers, premium pricing, and milestone rewards
          </p>
        </div>
      </InternalPanel>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Battle Pass – Live Preview
          </h2>
          <p className="text-gray-600">
            Configure seasonal progression systems with free and premium tiers.
          </p>
        </div>
        
        <PersonaTabs 
          activePersona={activePersona}
          onPersonaChange={handlePersonaChange}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Battle Pass Preview</h3>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-600">Battle Pass preview coming soon...</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1 xl:col-span-2 space-y-4">
            <LiveStatsDashboard />
            <PersonaInsights activePersona={activePersona} />

            {/* Battle Pass Math Model */}
            <InternalPanel title="Battle Pass Math Model">
              <div className="p-4 bg-gray-100 rounded-lg text-center">
                <p className="text-gray-600">Battle Pass math model coming soon...</p>
                <p className="text-sm text-gray-500 mt-2">
                  Will include conversion rates, LTV impact, and reward cost analysis
                </p>
              </div>
            </InternalPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattlePassTab;