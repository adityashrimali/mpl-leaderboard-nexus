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

  const [uplift, setUplift] = useState({
    unlockPct: 17,
    matches: 4.1,
    gmv: 28,      // in thousands
    cash: 95,     // in thousands
  });

  const recalcUplift = (cfg: SeasonConfig) => {
    // baselines
    const BASE_UNLOCK = 17;
    const BASE_MATCH  = 4.1;
    const BASE_PRIZE  = 3;   // %
    const BASE_GAMES  = 15;

    // read tier 0 (₹0-9) because it has the widest audience
    const t0 = cfg.tiers[0];

    // unlock % rises if prize pool % goes up OR milestone frequency shortens
    const unlockPct = BASE_UNLOCK
      + (t0.prize - BASE_PRIZE) * 2         // +2 pp per extra %
      + ((BASE_GAMES - t0.games) * 1.5);    // +1.5 pp per 1 game sooner

    // matches rise if milestone is easier or reward bigger
    const rewardFactor = t0.reward / 5;     // baseline reward=5
    const matchDelta = (BASE_GAMES - t0.games)/5 + (rewardFactor - 1)*0.2;

    const matches = BASE_MATCH + matchDelta;
    
    // calculate GMV and cash based on new behavioral metrics
    const gmv = 28 * (unlockPct / BASE_UNLOCK) * (matches / BASE_MATCH);
    const cash = 95 * (unlockPct / BASE_UNLOCK) * (matches / BASE_MATCH);

    setUplift({ 
      unlockPct: +unlockPct.toFixed(1), 
      matches: +matches.toFixed(1), 
      gmv: +gmv.toFixed(1), 
      cash: +cash.toFixed(1) 
    });
  };

  const handleDeploy = () => {
    console.log('Deploying configuration:', config);
    recalcUplift(config);                 // ⬅️  add this
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

              {/* Live Uplift Monitor */}
              <div className="bg-white p-6 rounded-xl border-2 border-red-200 shadow-lg">
                <h3 className="text-lg font-semibold text-mpl-red mb-4">Live Uplift Monitor</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Auto-recalculated each time you press <em>Deploy</em>.
                </p>

                <div className="space-y-1 text-sm">
                  <div><strong>Unlock&nbsp;rate:</strong> 17 % → <span className="text-mpl-red">{uplift.unlockPct.toFixed(1)} %</span></div>
                  <div><strong>Matches / unlocked user:</strong> 4.1 → <span className="text-mpl-red">{uplift.matches.toFixed(1)}</span></div>
                  <div><strong>Net GMV /hr:</strong> ₹28 K → <span className="text-mpl-red">₹{uplift.gmv} K</span></div>
                  <div><strong>Net cash /hr:</strong> ₹95 K → <span className="text-mpl-red">₹{uplift.cash} K</span></div>
                </div>

                <p className="text-xs text-gray-400 mt-3">
                  GST 28 % & PG 1.5 % already deducted; prize-pool and milestone costs come from the delta stake.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
