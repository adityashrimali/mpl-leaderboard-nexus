import { BattlePassConfig, Persona } from "@/types/rmg";
import { Lock, Star, Coins, Zap } from "lucide-react";
import { formatCurrency } from "@/data/personaDefaults";

interface VerticalPassProps {
  config: BattlePassConfig;
  persona: Persona;
  currentProgress: number;
  isPremium: boolean;
}

const VerticalPass = ({ config, persona, currentProgress, isPremium }: VerticalPassProps) => {
  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'coins': return <Coins className="w-5 h-5" />;
      case 'spin': return <Star className="w-5 h-5" />;
      case 'bonus': return <Zap className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getRewardColor = (type: string) => {
    switch (type) {
      case 'coins': return 'text-rmg-gold';
      case 'spin': return 'text-rmg-purple';
      case 'bonus': return 'text-rmg-green';
      default: return 'text-rmg-red';
    }
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-rmg-purple to-rmg-blue text-white p-4">
        <h3 className="text-lg font-semibold">Battle Pass Progress</h3>
        <p className="text-white/80 text-sm">Season: {config.seasonId}</p>
      </div>

      <div className="h-[70vh] overflow-y-auto p-4">
        <div className="flex space-x-4">
          {/* Free Track */}
          <div className="flex-1">
            <h4 className="text-center font-semibold text-gray-800 mb-4 pb-2 border-b">
              Free Track
            </h4>
            <div className="space-y-4">
              {config.freeTier.map((reward, index) => (
                <div
                  key={index}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    currentProgress >= reward.milestone
                      ? 'bg-rmg-green/10 border-rmg-green'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${getRewardColor(reward.type)}`}>
                        {getRewardIcon(reward.type)}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">Level {reward.milestone}</div>
                        <div className="text-xs text-gray-600">{reward.reward}</div>
                      </div>
                    </div>
                    {currentProgress >= reward.milestone && (
                      <div className="w-6 h-6 bg-rmg-green rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Track */}
          <div className="flex-1">
            <h4 className="text-center font-semibold text-gray-800 mb-4 pb-2 border-b">
              Premium Track
            </h4>
            {!isPremium && (
              <div className="mb-4 p-3 bg-gradient-to-r from-rmg-gold/10 to-rmg-orange/10 rounded-lg border border-rmg-gold">
                <p className="text-center font-semibold text-rmg-red">
                  Unlock Premium {formatCurrency(config.premiumPrice)}
                </p>
              </div>
            )}
            <div className="space-y-4">
              {config.premiumTier.map((reward, index) => (
                <div
                  key={index}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    isPremium && currentProgress >= reward.milestone
                      ? 'bg-rmg-gold/10 border-rmg-gold'
                      : isPremium
                      ? 'bg-gray-50 border-gray-200'
                      : 'bg-gray-100 border-gray-300'
                  }`}
                >
                  {!isPremium && (
                    <div className="absolute inset-0 bg-gray-500/50 rounded-lg flex items-center justify-center z-10">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${getRewardColor(reward.type)}`}>
                        {getRewardIcon(reward.type)}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">Level {reward.milestone}</div>
                        <div className="text-xs text-gray-600">{reward.reward}</div>
                      </div>
                    </div>
                    {isPremium && currentProgress >= reward.milestone && (
                      <div className="w-6 h-6 bg-rmg-gold rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalPass;