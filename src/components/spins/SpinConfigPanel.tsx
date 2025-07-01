import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SpinConfig, SpinReward } from "@/types/rmg";
import { Zap, Settings } from "lucide-react";

interface SpinConfigPanelProps {
  config: SpinConfig;
  onConfigChange: (config: SpinConfig) => void;
  onDeploy: () => void;
}

const SpinConfigPanel = ({ config, onConfigChange, onDeploy }: SpinConfigPanelProps) => {
  const updateField = (field: keyof SpinConfig, value: any) => {
    onConfigChange({
      ...config,
      [field]: value
    });
  };

  const updateReward = (index: number, field: keyof SpinReward, value: any) => {
    const newRewards = [...config.rewards];
    newRewards[index] = {
      ...newRewards[index],
      [field]: value
    };
    onConfigChange({
      ...config,
      rewards: newRewards
    });
  };

  return (
    <Card className="mb-8 border-2 border-rmg-red/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-rmg-red/5 to-rmg-orange/5">
        <CardTitle className="flex items-center space-x-2 text-rmg-red">
          <Zap className="h-6 w-6" />
          <span>Spin Wheel Configuration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dailyFree">Daily Free Spins</Label>
            <Input
              id="dailyFree"
              type="number"
              min="0"
              value={config.dailyFree}
              onChange={(e) => updateField('dailyFree', parseInt(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="paidCost">Paid Spin Cost (₹)</Label>
            <Input
              id="paidCost"
              type="number"
              min="1"
              value={config.paidSpinCost}
              onChange={(e) => updateField('paidSpinCost', parseInt(e.target.value))}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Reward Configuration</span>
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-rmg-red/10 to-rmg-orange/10">
                  <th className="border border-gray-200 p-3 text-left font-semibold">Reward</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold">Value</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold">Probability</th>
                </tr>
              </thead>
              <tbody>
                {config.rewards.map((reward, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-200 p-3 font-medium text-rmg-red">
                      {reward.label}
                    </td>
                    <td className="border border-gray-200 p-2">
                      <Input
                        type="number"
                        value={reward.value}
                        onChange={(e) => updateReward(index, 'value', parseFloat(e.target.value))}
                        className="h-8"
                      />
                    </td>
                    <td className="border border-gray-200 p-2">
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        value={reward.probability}
                        onChange={(e) => updateReward(index, 'probability', parseFloat(e.target.value))}
                        className="h-8"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button 
            onClick={onDeploy}
            className="gradient-rmg-primary text-white hover:opacity-90 transition-opacity flex items-center space-x-2 px-6 py-3 glow-rmg"
          >
            <Zap className="h-5 w-5" />
            <span>Deploy Spin Config</span>
          </Button>
          <p className="text-sm text-muted-foreground max-w-md">
            Deploy updates the spin wheel configuration and refreshes all persona previews.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpinConfigPanel;