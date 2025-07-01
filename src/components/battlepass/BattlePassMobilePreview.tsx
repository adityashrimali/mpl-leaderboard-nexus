import { Crown, Lock } from "lucide-react";
import { Persona, BattlePassConfig } from "@/types/rmg";
import VerticalPass from "./VerticalPass";

interface BattlePassMobilePreviewProps {
  persona: Persona;
  config: BattlePassConfig;
}

const BattlePassMobilePreview = ({ persona, config }: BattlePassMobilePreviewProps) => {
  const getPersonaGlow = (persona: Persona) => {
    switch (persona) {
      case 'whale': return 'shadow-lg shadow-rmg-red/20 border-rmg-red/30';
      case 'grinder': return 'shadow-lg shadow-rmg-purple/20 border-rmg-purple/30';
      case 'roi': return 'shadow-lg shadow-rmg-green/20 border-rmg-green/30';
    }
  };

  const isPremium = persona === 'whale'; // Whales more likely to have premium

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <span className="mr-2">📱</span>
        Battle Pass ({persona})
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
            {/* Season Header */}
            <div className={`bg-gradient-to-r from-rmg-gold/10 to-rmg-orange/10 p-3 rounded-lg border-2 ${getPersonaGlow(persona)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Crown className="w-4 h-4 text-rmg-gold mr-2" />
                  <span className="text-sm font-semibold text-rmg-gold">{config.seasonName}</span>
                </div>
                {isPremium && (
                  <span className="bg-rmg-gold text-white text-xs px-2 py-1 rounded-full">VIP</span>
                )}
              </div>
              <div className="text-xs text-gray-600">
                {config.duration} • Tier 6/10
              </div>
            </div>
            
            {/* Battle Pass Progress */}
            <div className="bg-white border rounded-lg p-3 h-48 overflow-y-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-600">Free Track</span>
                <span className="text-xs font-medium text-rmg-gold">VIP Track</span>
              </div>
              
              {/* Simplified Progress */}
              <div className="space-y-2">
                {config.milestones.slice(0, 6).map((milestone, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        index < 5 ? 'bg-rmg-green text-white' : 'bg-gray-300 text-gray-600'
                      }`}>
                        {milestone.tier}
                      </div>
                      <span className="text-xs text-rmg-green">{milestone.freeReward}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {!isPremium && <Lock className="w-3 h-3 text-gray-400" />}
                      <span className={`text-xs ${isPremium ? 'text-rmg-gold' : 'text-gray-400'}`}>
                        {milestone.premiumReward}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action Button */}
            {!isPremium ? (
              <button className="w-full bg-rmg-gold text-white py-2 rounded-lg text-sm font-medium shadow-sm">
                Unlock VIP ₹{config.premiumPrice}
              </button>
            ) : (
              <button className="w-full bg-rmg-green text-white py-2 rounded-lg text-sm font-medium shadow-sm">
                Claim Rewards
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattlePassMobilePreview;