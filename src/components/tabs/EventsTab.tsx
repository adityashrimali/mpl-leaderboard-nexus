import { useState } from "react";
import { toast } from "sonner";
import { Persona, EventConfig } from "@/types/rmg";
import PersonaTabs from "@/components/shared/PersonaTabs";
import LiveStatsDashboard from "@/components/shared/LiveStatsDashboard";
import PersonaInsights from "@/components/shared/PersonaInsights";
import InternalPanel from "@/components/shared/InternalPanel";
import EventConfigPanel from "@/components/events/EventConfigPanel";
import EventMobilePreview from "@/components/events/EventMobilePreview";
import NetProfitPanel from "@/components/shared/NetProfitPanel";

const EventsTab = () => {
  const [activePersona, setActivePersona] = useState<Persona>('whale');
  const [config, setConfig] = useState<EventConfig>({
    name: 'Diwali Challenge',
    theme: 'diwali',
    schedule: 'weekly',
    active: true,
    prizePoolPct: 5.0,
    challenges: [
      { game: 'Ludo', targetWins: 5, nextTargets: [10, 15], rewardPct: 3.0 },
      { game: 'Carrom', targetWins: 3, nextTargets: [6, 9], rewardPct: 5.0 },
      { game: 'Pool', targetWins: 2, nextTargets: [4, 6], rewardPct: 8.0 },
      { game: 'Cricket', targetWins: 4, nextTargets: [8, 12], rewardPct: 4.0 }
    ]
  });

  const handlePersonaChange = (persona: Persona) => {
    setActivePersona(persona);
  };

  const handleDeploy = () => {
    toast.success('Event configuration deployed! 🎉', {
      description: 'Event preview updated with new settings.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Stats and Profit Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LiveStatsDashboard />
        <NetProfitPanel feature="events" config={config} />
      </div>

      {/* Events Configuration */}
      <InternalPanel title="Time-Limited Events Configuration">
        <EventConfigPanel 
          config={config}
          onConfigChange={setConfig}
          onDeploy={handleDeploy}
        />
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
            <EventMobilePreview 
              persona={activePersona}
              config={config}
            />
          </div>
          
          <div className="lg:col-span-1 xl:col-span-2 space-y-4">
            <PersonaInsights activePersona={activePersona} />

            {/* Events Math Model */}
            <InternalPanel title="Events Math Model">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white rounded border">
                    <div className="text-sm text-gray-600">Reward Cost</div>
                    <div className="text-lg font-semibold text-rmg-red">₹{(2000 * 0.8 * 25 * (config.prizePoolPct / 100)).toLocaleString("en-IN")}</div>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <div className="text-sm text-gray-600">Participation Rate</div>
                    <div className="text-lg font-semibold text-rmg-green">80%</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  RewardCost = DAU × participationRate × avgStake × prizePoolPct
                </div>
              </div>
            </InternalPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsTab;