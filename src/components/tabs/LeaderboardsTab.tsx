import { useState } from "react";
import { toast } from "sonner";
import { Persona, SeasonConfig } from "@/types/rmg";
import ConfigPanel from "@/components/ConfigPanel";
import LeaderboardPreview from "@/components/LeaderboardPreview";
import PersonaTabs from "@/components/shared/PersonaTabs";
import LiveStatsDashboard from "@/components/shared/LiveStatsDashboard";
import PersonaInsights from "@/components/shared/PersonaInsights";
import InternalPanel from "@/components/shared/InternalPanel";

const LeaderboardsTab = () => {
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
    gmv: 28,
    cash: 95,
  });

  const [upliftKnobs, setUpliftKnobs] = useState({
    unlockPct: 30,
    matchDelta: 1
  });

  const recalcUplift = (cfg: SeasonConfig, knobs: typeof upliftKnobs) => {
    const unlockPct = knobs.unlockPct;
    const matches = 4.1 + knobs.matchDelta;

    const gmvMultiplier = (unlockPct / 17) * (matches / 4.1);
    const gmv = 28 * gmvMultiplier;
    const cash = 95 * gmvMultiplier;

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
    <div className="space-y-8">
      {/* Season Configuration */}
      <InternalPanel title="Season Configuration">
        <ConfigPanel 
          config={config}
          onConfigChange={setConfig}
          onDeploy={handleDeploy}
        />
      </InternalPanel>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center space-x-2">
            <span>Multi-Scope Leaderboards – Live Preview</span>
          </h2>
          <p className="text-gray-600">
            Switch between different player personas to see how leaderboards appear to various user segments.
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
            <LiveStatsDashboard />
            <PersonaInsights activePersona={activePersona} />

            {/* Uplift Monitor */}
            <InternalPanel title="Uplift Monitor">
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
            </InternalPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardsTab;