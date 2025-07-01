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
    duration: 'monthly',
    premiumPrice: 199,
    annualDiscount: 20,
    freeTier: [
      { milestone: 1, reward: '₹10', value: 10, type: 'coins' },
      { milestone: 2, reward: '₹5', value: 5, type: 'coins' },
      { milestone: 3, reward: '₹15', value: 15, type: 'coins' }
    ],
    premiumTier: [
      { milestone: 1, reward: '₹50', value: 50, type: 'coins' },
      { milestone: 2, reward: '₹25', value: 25, type: 'coins' },
      { milestone: 3, reward: '₹75', value: 75, type: 'coins' }
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