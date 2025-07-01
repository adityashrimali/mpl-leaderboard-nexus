import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SpinReward } from "@/types/rmg";

interface SpinWheelProps {
  rewards: SpinReward[];
  onSpin: (result: SpinReward) => void;
  isSpinning: boolean;
  canSpin: boolean;
}

const SpinWheel = ({ rewards, onSpin, isSpinning, canSpin }: SpinWheelProps) => {
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (!canSpin || isSpinning) return;

    // Calculate random result based on probabilities
    const random = Math.random();
    let cumulative = 0;
    let selectedReward = rewards[0];

    for (const reward of rewards) {
      cumulative += reward.probability;
      if (random <= cumulative) {
        selectedReward = reward;
        break;
      }
    }

    // Calculate rotation for animation
    const newRotation = rotation + 2160 + Math.random() * 360; // 6 full rotations + random
    setRotation(newRotation);

    // Trigger result after animation
    setTimeout(() => {
      onSpin(selectedReward);
    }, 6000);
  };

  const sliceAngle = 360 / rewards.length;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative w-80 h-80">
        {/* Wheel */}
        <div 
          className={`w-full h-full rounded-full border-8 border-rmg-gold relative overflow-hidden shadow-xl ${
            isSpinning ? 'spin-wheel' : ''
          }`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {rewards.map((reward, index) => (
            <div
              key={index}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `rotate(${index * sliceAngle}deg)`,
                clipPath: `polygon(50% 50%, 100% 0%, 100% ${(100 / rewards.length)}%)`
              }}
            >
              <div 
                className={`w-full h-full flex items-center justify-center text-white font-bold text-sm ${
                  index % 2 === 0 ? 'bg-rmg-red' : 'bg-rmg-purple'
                }`}
                style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((sliceAngle * Math.PI) / 180)}% ${50 - 50 * Math.cos((sliceAngle * Math.PI) / 180)}%)`
                }}
              >
                <span className="transform -rotate-45 text-xs px-2">
                  {reward.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Center pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-rmg-gold"></div>
        </div>

        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-rmg-gold rounded-full border-4 border-white shadow-lg flex items-center justify-center z-20">
          <span className="text-white font-bold text-xs">SPIN</span>
        </div>
      </div>

      <Button
        onClick={handleSpin}
        disabled={!canSpin || isSpinning}
        className={`px-8 py-3 text-lg font-semibold transition-all duration-300 ${
          canSpin && !isSpinning 
            ? 'gradient-rmg-primary text-white hover:scale-105 glow-rmg' 
            : 'bg-gray-400 text-gray-600 cursor-not-allowed'
        }`}
      >
        {isSpinning ? 'Spinning...' : canSpin ? 'Spin Now!' : 'No Spins Left'}
      </Button>
    </div>
  );
};

export default SpinWheel;