import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BattlePassConfig } from "@/types/rmg";
import { Crown, Settings } from "lucide-react";

interface BattlePassConfigPanelProps {
  config: BattlePassConfig;
  onConfigChange: (config: BattlePassConfig) => void;
  onDeploy: () => void;
}

const BattlePassConfigPanel = ({ config, onConfigChange, onDeploy }: BattlePassConfigPanelProps) => {
  const updateField = (field: keyof BattlePassConfig, value: any) => {
    onConfigChange({
      ...config,
      [field]: value
    });
  };

  const updateMilestone = (index: number, field: 'freeReward' | 'premiumReward', value: string) => {
    const newMilestones = [...config.milestones];
    newMilestones[index] = {
      ...newMilestones[index],
      [field]: value
    };
    onConfigChange({
      ...config,
      milestones: newMilestones
    });
  };

  return (
    <Card className="mb-8 border-2 border-rmg-red/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-rmg-red/5 to-rmg-orange/5">
        <CardTitle className="flex items-center space-x-2 text-rmg-red">
          <Crown className="h-6 w-6" />
          <span>Battle Pass Configuration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="seasonName">Season Name</Label>
            <Input
              id="seasonName"
              value={config.seasonName}
              onChange={(e) => updateField('seasonName', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="duration">Duration</Label>
            <select 
              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
              value={config.duration}
              onChange={(e) => updateField('duration', e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="seasonal">Seasonal</option>
            </select>
          </div>
          <div>
            <Label htmlFor="premiumPrice">Premium Price (₹)</Label>
            <Input
              id="premiumPrice"
              type="number"
              value={config.premiumPrice}
              onChange={(e) => updateField('premiumPrice', parseInt(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="annualDiscount">Annual Discount %</Label>
            <Input
              id="annualDiscount"
              type="number"
              step="1"
              value={config.annualDiscount}
              onChange={(e) => updateField('annualDiscount', parseInt(e.target.value))}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Milestone Rewards</span>
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-rmg-red/10 to-rmg-orange/10">
                  <th className="border border-gray-200 p-3 text-left font-semibold">Tier</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold">Free Reward</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold">Premium Reward</th>
                </tr>
              </thead>
              <tbody>
                {config.milestones.map((milestone, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-200 p-3 font-medium text-rmg-red">
                      {milestone.tier}
                    </td>
                    <td className="border border-gray-200 p-2">
                      <Input
                        value={milestone.freeReward}
                        onChange={(e) => updateMilestone(index, 'freeReward', e.target.value)}
                        className="h-8"
                      />
                    </td>
                    <td className="border border-gray-200 p-2">
                      <Input
                        value={milestone.premiumReward}
                        onChange={(e) => updateMilestone(index, 'premiumReward', e.target.value)}
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
            <Crown className="h-5 w-5" />
            <span>Deploy Battle Pass</span>
          </Button>
          <p className="text-sm text-muted-foreground max-w-md">
            Deploy updates the battle pass configuration and refreshes all persona previews.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BattlePassConfigPanel;