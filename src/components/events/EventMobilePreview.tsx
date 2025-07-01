import { Calendar, Trophy, Target } from "lucide-react";
import { Persona, EventConfig } from "@/types/rmg";
import { personaDefaults } from "@/data/personaDefaults";

interface EventMobilePreviewProps {
  persona: Persona;
  config: EventConfig;
}

const EventMobilePreview = ({ persona, config }: EventMobilePreviewProps) => {
  const defaults = personaDefaults[persona];
  
  const getPersonaGlow = (persona: Persona) => {
    switch (persona) {
      case 'whale': return 'shadow-lg shadow-rmg-red/20 border-rmg-red/30';
      case 'grinder': return 'shadow-lg shadow-rmg-purple/20 border-rmg-purple/30';
      case 'roi': return 'shadow-lg shadow-rmg-green/20 border-rmg-green/30';
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <span className="mr-2">📱</span>
        Event Preview ({persona})
      </h3>
      
      {/* Mobile Frame */}
      <div className="mx-auto w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-xl">
        <div className="w-full h-full bg-gray-100 rounded-2xl overflow-hidden">
          {/* Status Bar */}
          <div className="bg-gray-800 text-white text-xs px-4 py-1 flex justify-between">
            <span>9:41 AM</span>
            <span>100%</span>
          </div>
          
          {/* App Content */}
          <div className="p-4 space-y-3">
            {/* Event Header */}
            <div className={`bg-gradient-to-r from-rmg-red/10 to-rmg-orange/10 p-3 rounded-lg border-2 ${getPersonaGlow(persona)}`}>
              <div className="flex items-center mb-2">
                <Calendar className="w-4 h-4 text-rmg-red mr-2" />
                <span className="text-sm font-semibold text-rmg-red">{config.name}</span>
              </div>
              <div className="text-xs text-gray-600">{config.schedule} • {config.theme}</div>
            </div>
            
            {/* Challenges */}
            <div className="space-y-2">
              {config.challenges.slice(0, 3).map((challenge, index) => {
                const currentWins = Math.floor(Math.random() * challenge.targetWins);
                const rewardAmount = defaults.avgStake * (challenge.rewardPct / 100);
                
                return (
                  <div key={index} className="bg-white border rounded-lg p-3 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Trophy className="w-3 h-3 text-rmg-gold mr-1" />
                        <span className="text-xs font-medium">{challenge.game}</span>
                      </div>
                      <span className="text-xs text-rmg-green">₹{rewardAmount.toFixed(0)}</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                      <div 
                        className="bg-rmg-red h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentWins / challenge.targetWins) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{currentWins}/{challenge.targetWins} wins</span>
                      <span className="text-rmg-red font-medium">{challenge.rewardPct}% back</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Action Button */}
            <button className="w-full bg-rmg-red text-white py-2 rounded-lg text-sm font-medium shadow-sm">
              Play Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventMobilePreview;