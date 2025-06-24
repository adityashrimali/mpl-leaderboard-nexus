
import { useState } from "react";
import { toast } from "sonner";
import { Settings } from "lucide-react";
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

  const [upliftKnobs, setUpliftKnobs] = useState({
    unlockPct: 30,      // V1 default
    matchDelta: 1       // +1 game per unlocked user
  });

  const recalcUplift = (cfg: SeasonConfig, knobs: typeof upliftKnobs) => {
    const unlockPct = knobs.unlockPct;
    const matches = 4.1 + knobs.matchDelta;

    const gmvMultiplier = (unlockPct / 17) * (matches / 4.1);
    const gmv = 28 * gmvMultiplier;   // in ₹K
    const cash = 95 * gmvMultiplier;   // in ₹K

    setUplift({ 
      unlockPct, 
      matches, 
      gmv: +gmv.toFixed(1), 
      cash: +cash.toFixed(1) 
    });
  };

  const handleDeploy = () => {
    console.log('Deploying configuration:', config);
    recalcUplift(config, upliftKnobs);
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
        
        {/* INTERNAL - Season Configuration */}
        <div className="bg-slate-50 rounded-xl border-l-4 border-mpl-red shadow-sm">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Settings className="w-5 h-5 text-mpl-red mr-2" />
              <h2 className="text-xl font-semibold text-mpl-red">Season Configuration</h2>
              <span className="ml-auto text-xs text-gray-500 font-medium">INTERNAL</span>
            </div>
            <ConfigPanel 
              config={config}
              onConfigChange={setConfig}
              onDeploy={handleDeploy}
            />
          </div>
        </div>
        
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

              {/* INTERNAL – Uplift Monitor & Knobs */}
              <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-mpl-red shadow-sm">
                <div className="flex items-center mb-4">
                  <Settings className="w-5 h-5 text-mpl-red mr-2" />
                  <h3 className="text-lg font-semibold text-mpl-red">Uplift Monitor</h3>
                  <span className="ml-auto text-xs text-gray-500 font-medium">INTERNAL</span>
                </div>

                {/* knobs */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Unlock % V1</label>
                    <input 
                      type="number" 
                      min={17} 
                      max={100}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-center text-sm"
                      value={upliftKnobs.unlockPct}
                      onChange={e => setUpliftKnobs({...upliftKnobs, unlockPct: +e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Match Δ (+)</label>
                    <input 
                      type="number" 
                      step={0.1} 
                      min={0}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-center text-sm"
                      value={upliftKnobs.matchDelta}
                      onChange={e => setUpliftKnobs({...upliftKnobs, matchDelta: +e.target.value})} 
                    />
                  </div>
                </div>

                {/* recalc button */}
                <button
                  className="mb-4 px-3 py-1 text-sm border border-mpl-red text-mpl-red rounded hover:bg-mpl-red hover:text-white transition-colors"
                  onClick={() => recalcUplift(config, upliftKnobs)}>
                  Recalculate
                </button>

                {/* live numbers */}
                <div className="space-y-1 text-sm leading-5">
                  <div><strong>Unlock rate:</strong> 17 % → <span className="text-mpl-red">{uplift.unlockPct.toFixed(1)} %</span></div>
                  <div><strong>Matches / unlocked:</strong> 4.1 → <span className="text-mpl-red">{uplift.matches.toFixed(1)}</span></div>
                  <div><strong>Net GMV / hr:</strong> ₹28 K → <span className="text-mpl-red">₹{uplift.gmv} K</span></div>
                  <div><strong>Net cash / hr:</strong> ₹95 K → <span className="text-mpl-red">₹{uplift.cash} K</span></div>
                </div>

                <p className="text-xs text-gray-400 mt-3">
                  GST 28 % & PG 1.5 % deducted. Prize-pool + milestones funded from delta stake.
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
