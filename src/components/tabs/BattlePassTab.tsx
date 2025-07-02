import { useState } from "react";
import { toast } from "sonner";
import { Persona, BattlePassConfig } from "@/types/rmg";
import PersonaTabs from "@/components/shared/PersonaTabs";
import LiveStatsDashboard from "@/components/shared/LiveStatsDashboard";
import PersonaInsights from "@/components/shared/PersonaInsights";
import InternalPanel from "@/components/shared/InternalPanel";
import BattlePassConfigPanel from "@/components/battlepass/BattlePassConfigPanel";
import BattlePassMobilePreview from "@/components/battlepass/BattlePassMobilePreview";
import NetProfitPanel from "@/components/shared/NetProfitPanel";

const BattlePassTab = () => {
  const [activePersona, setActivePersona] = useState<Persona>('whale');
  const [config, setBattlePassConfig] = useState<BattlePassConfig>({
    seasonId: 'Season 1',
    seasonName: 'Monsoon Madness',
    duration: 'monthly',
    premiumPrice: 199,
    annualDiscount: 20,
    milestones: [
      { tier: 1, freeReward: '₹10', premiumReward: '₹50' },
      { tier: 2, freeReward: '₹5', premiumReward: '₹25' },
      { tier: 3, freeReward: '₹15', premiumReward: '₹75' },
      { tier: 4, freeReward: '₹20', premiumReward: '₹100' },
      { tier: 5, freeReward: '₹25', premiumReward: '₹150' },
      { tier: 6, freeReward: '₹30', premiumReward: '₹200' },
      { tier: 7, freeReward: '₹35', premiumReward: '₹250' },
      { tier: 8, freeReward: '₹40', premiumReward: '₹300' },
      { tier: 9, freeReward: '₹45', premiumReward: '₹400' },
      { tier: 10, freeReward: '₹50', premiumReward: '₹500' }
    ]
  });

  const handlePersonaChange = (persona: Persona) => {
    setActivePersona(persona);
  };

  const handleDeploy = () => {
    toast.success('Battle Pass configuration deployed! ⚔️', {
      description: 'Battle Pass preview updated with new settings.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Stats and Profit Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LiveStatsDashboard />
        <NetProfitPanel feature="battlepass" config={config} />
      </div>

      {/* Battle Pass Configuration */}
      <InternalPanel title="Battle Pass Configuration">
        <BattlePassConfigPanel 
          config={config}
          onConfigChange={setBattlePassConfig}
          onDeploy={handleDeploy}
        />
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
            <BattlePassMobilePreview 
              persona={activePersona}
              config={config}
            />
          </div>
          
          <div className="lg:col-span-1 xl:col-span-2 space-y-4">
            <PersonaInsights activePersona={activePersona} />

            {/* Battle Pass Math Model */}
            <InternalPanel title="Battle Pass Math Model">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-white rounded border">
                    <div className="text-sm text-gray-600">Conversion Rate</div>
                    <div className="text-lg font-semibold text-rmg-purple">15%</div>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <div className="text-sm text-gray-600">Net Revenue</div>
                    <div className="text-lg font-semibold text-rmg-green">₹{(500 * 0.15 * config.premiumPrice - 500 * 0.15 * 50).toLocaleString("en-IN")}</div>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <div className="text-sm text-gray-600">LTV Impact</div>
                    <div className="text-lg font-semibold text-rmg-blue">+35%</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  NetRev = DAU × conversion × price - reward costs; LTV boost from engagement
                </div>
              </div>
            </InternalPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattlePassTab;