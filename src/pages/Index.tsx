
import { useState } from "react";
import { toast } from "sonner";
import MPLHeader from "@/components/MPLHeader";
import ConfigPanel from "@/components/ConfigPanel";
import PersonaTabs from "@/components/PersonaTabs";
import LeaderboardPreview from "@/components/LeaderboardPreview";
import { SeasonConfig, Persona } from "@/types/mpl";

const Index = () => {
  const [activePersona, setActivePersona] = useState<Persona>('whale');
  const [config, setConfig] = useState<SeasonConfig>({
    seasonId: '2025-W27',
    ttlTop: 30,
    ttlOther: 300,
    tiers: [
      { tier: '₹0–9', min: 0, max: 9, prize: 3, games: 15, reward: 5 },
      { tier: '₹10–99', min: 10, max: 99, prize: 3, games: 15, reward: 15 },
      { tier: '₹100–999', min: 100, max: 999, prize: 3, games: 15, reward: 150 },
      { tier: '₹1K+', min: 1000, max: 999999, prize: 3, games: 15, reward: 250 },
    ]
  });

  const handleDeploy = () => {
    console.log('Deploying configuration:', config);
    toast.success('Configuration deployed successfully! 🚀', {
      description: 'Leaderboard preview has been refreshed with new settings.',
    });
  };

  const handlePersonaChange = (persona: Persona) => {
    setActivePersona(persona);
    console.log('Switched to persona:', persona);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <MPLHeader />
        
        <ConfigPanel 
          config={config}
          onConfigChange={setConfig}
          onDeploy={handleDeploy}
        />
        
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center space-x-2">
              <span>MPL Ludo – Live Leaderboard Preview</span>
            </h2>
            <p className="text-gray-600">
              Switch between different player personas to see how the leaderboard appears to various user segments.
            </p>
          </div>
          
          <PersonaTabs 
            activePersona={activePersona}
            onPersonaChange={handlePersonaChange}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <LeaderboardPreview 
                persona={activePersona}
                config={config}
              />
            </div>
            
            <div className="lg:col-span-1 xl:col-span-2 space-y-4">
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Stats Dashboard</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-mpl-red/10 to-mpl-orange/10 rounded-lg">
                    <div className="text-2xl font-bold text-mpl-red">1,247</div>
                    <div className="text-sm text-gray-600">Active Players</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-mpl-purple/10 to-mpl-blue/10 rounded-lg">
                    <div className="text-2xl font-bold text-mpl-purple">₹89.2K</div>
                    <div className="text-sm text-gray-600">Total Pool</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-mpl-green/10 to-mpl-blue/10 rounded-lg">
                    <div className="text-2xl font-bold text-mpl-green">342</div>
                    <div className="text-sm text-gray-600">Games/Hour</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-mpl-gold/10 to-mpl-orange/10 rounded-lg">
                    <div className="text-2xl font-bold text-mpl-gold">94%</div>
                    <div className="text-sm text-gray-600">Engagement</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Persona Insights</h3>
                <div className="space-y-3">
                  {activePersona === 'whale' && (
                    <div className="p-4 bg-gradient-to-r from-mpl-red/5 to-mpl-orange/5 rounded-lg">
                      <h4 className="font-semibold text-mpl-red">Whale Player Behavior</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        High-value players focused on exclusive tables and maximum rewards. 
                        They respond well to VIP treatment and premium gaming experiences.
                      </p>
                    </div>
                  )}
                  {activePersona === 'grinder' && (
                    <div className="p-4 bg-gradient-to-r from-mpl-purple/5 to-mpl-blue/5 rounded-lg">
                      <h4 className="font-semibold text-mpl-purple">Grinder Player Behavior</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Volume players who play consistently for smaller rewards. 
                        They value progress tracking and achievable milestones.
                      </p>
                    </div>
                  )}
                  {activePersona === 'roi' && (
                    <div className="p-4 bg-gradient-to-r from-mpl-green/5 to-mpl-blue/5 rounded-lg">
                      <h4 className="font-semibold text-mpl-green">ROI-Seeker Behavior</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Strategic players who optimize for return on investment. 
                        They prefer calculated risks and transparent profit metrics.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
