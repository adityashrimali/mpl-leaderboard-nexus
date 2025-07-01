import { Zap, Gift } from "lucide-react";
import { Persona, SpinConfig } from "@/types/rmg";
import SpinWheel from "./SpinWheel";

interface SpinMobilePreviewProps {
  persona: Persona;
  config: SpinConfig;
}

const SpinMobilePreview = ({ persona, config }: SpinMobilePreviewProps) => {
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
        Spins Preview ({persona})
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
            {/* Spin Count */}
            <div className={`bg-gradient-to-r from-rmg-purple/10 to-rmg-blue/10 p-3 rounded-lg border-2 ${getPersonaGlow(persona)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Gift className="w-4 h-4 text-rmg-purple mr-2" />
                  <span className="text-sm font-semibold">Free Spins</span>
                </div>
                <span className="text-lg font-bold text-rmg-purple">{config.dailyFree}</span>
              </div>
              <div className="text-xs text-gray-600 mt-1">Daily limit</div>
            </div>
            
            {/* Spin Wheel */}
            <div className="flex justify-center">
              <div className="scale-75">
                <SpinWheel rewards={config.rewards} onSpin={() => {}} isSpinning={false} canSpin={true} />
              </div>
            </div>
            
            {/* Spin Buttons */}
            <div className="space-y-2">
              <button className="w-full bg-rmg-green text-white py-2 rounded-lg text-sm font-medium shadow-sm">
                Free Spin (2 left)
              </button>
              <button className="w-full bg-rmg-purple text-white py-2 rounded-lg text-sm font-medium shadow-sm">
                Paid Spin ₹{config.paidSpinCost}
              </button>
            </div>
            
            {/* Expected Value Display */}
            <div className="bg-white border rounded-lg p-2">
              <div className="text-xs text-gray-600 text-center">Expected Value</div>
              <div className="text-sm font-semibold text-center text-rmg-gold">
                ₹{config.rewards.reduce((sum, r) => sum + (r.value * r.probability), 0).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinMobilePreview;