import { useState } from "react";
import { toast } from "sonner";
import { Persona, SpinConfig } from "@/types/rmg";
import PersonaTabs from "@/components/shared/PersonaTabs";
import LiveStatsDashboard from "@/components/shared/LiveStatsDashboard";
import PersonaInsights from "@/components/shared/PersonaInsights";
import InternalPanel from "@/components/shared/InternalPanel";
import SpinConfigPanel from "@/components/spins/SpinConfigPanel";
import SpinMobilePreview from "@/components/spins/SpinMobilePreview";
import NetProfitPanel from "@/components/shared/NetProfitPanel";

const SpinsTab = () => {
  const [activePersona, setActivePersona] = useState<Persona>('whale');
  const [config, setConfig] = useState<SpinConfig>({
    dailyFree: 3,
    paidSpinCost: 10,
    rewards: [
      { label: '₹1', type: 'cash', value: 1, probability: 0.25 },
      { label: '₹5', type: 'cash', value: 5, probability: 0.20 },
      { label: '₹10', type: 'cash', value: 10, probability: 0.15 },
      { label: '5% Cashback', type: 'cashback', value: 0.05, probability: 0.20 },
      { label: '₹1', type: 'cash', value: 1, probability: 0.10 },
      { label: '₹10', type: 'cash', value: 10, probability: 0.08 },
      { label: '₹1,000 Jackpot', type: 'jackpot', value: 1000, probability: 0.02 }
    ]
  });

  const handlePersonaChange = (persona: Persona) => {
    setActivePersona(persona);
  };

  const handleDeploy = () => {
    toast.success('Spin configuration deployed! 🎰', {
      description: 'Spin wheel updated with new settings.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Stats and Profit Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LiveStatsDashboard />
        <NetProfitPanel feature="spins" config={config} />
      </div>

      {/* Spins Configuration */}
      <InternalPanel title="Enhanced Spins / Slots Configuration">
        <SpinConfigPanel 
          config={config}
          onConfigChange={setConfig}
          onDeploy={handleDeploy}
        />
      </InternalPanel>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Enhanced Spins / Slots – Live Preview
          </h2>
          <p className="text-gray-600">
            Configure daily spins, reward mechanics, and pricing for enhanced slot experiences.
          </p>
        </div>
        
        <PersonaTabs 
          activePersona={activePersona}
          onPersonaChange={handlePersonaChange}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <SpinMobilePreview 
              persona={activePersona}
              config={config}
            />
          </div>
          
          <div className="lg:col-span-1 xl:col-span-2 space-y-4">
            <PersonaInsights activePersona={activePersona} />

            {/* Spins Math Model */}
            <InternalPanel title="Spins Math Model">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-white rounded border">
                    <div className="text-sm text-gray-600">EV Free</div>
                    <div className="text-lg font-semibold text-rmg-green">
                      ₹{config.rewards.reduce((sum, r) => sum + (r.value * r.probability), 0).toFixed(2)}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <div className="text-sm text-gray-600">EV Paid</div>
                    <div className="text-lg font-semibold text-rmg-red">
                      ₹{(config.rewards.reduce((sum, r) => sum + (r.value * r.probability), 0) - config.paidSpinCost).toFixed(2)}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <div className="text-sm text-gray-600">Revenue/User</div>
                    <div className="text-lg font-semibold text-rmg-purple">₹{(config.paidSpinCost * 0.3).toFixed(2)}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  EV = Σ(probability × value); Revenue assumes 30% buy paid spins
                </div>
              </div>
            </InternalPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinsTab;