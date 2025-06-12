
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Database } from "lucide-react";
import { SeasonConfig, TierConfig } from "@/types/mpl";

interface ConfigPanelProps {
  config: SeasonConfig;
  onConfigChange: (config: SeasonConfig) => void;
  onDeploy: () => void;
}

const ConfigPanel = ({ config, onConfigChange, onDeploy }: ConfigPanelProps) => {
  const updateSeasonField = (field: keyof SeasonConfig, value: string | number) => {
    onConfigChange({
      ...config,
      [field]: value
    });
  };

  const updateTier = (index: number, field: keyof TierConfig, value: string | number) => {
    const newTiers = [...config.tiers];
    newTiers[index] = {
      ...newTiers[index],
      [field]: typeof value === 'string' ? parseFloat(value) || 0 : value
    };
    onConfigChange({
      ...config,
      tiers: newTiers
    });
  };

  return (
    <Card className="mb-8 border-2 border-mpl-red/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-mpl-red/5 to-mpl-orange/5">
        <CardTitle className="flex items-center space-x-2 text-mpl-red">
          <Database className="h-6 w-6" />
          <span>Season Configuration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="seasonId" className="text-sm font-medium">Season ID</Label>
            <Input
              id="seasonId"
              value={config.seasonId}
              onChange={(e) => updateSeasonField('seasonId', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="ttlTop" className="text-sm font-medium">Top TTL (seconds)</Label>
            <Input
              id="ttlTop"
              type="number"
              value={config.ttlTop}
              onChange={(e) => updateSeasonField('ttlTop', parseInt(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="ttlOther" className="text-sm font-medium">Other TTL (seconds)</Label>
            <Input
              id="ttlOther"
              type="number"
              value={config.ttlOther}
              onChange={(e) => updateSeasonField('ttlOther', parseInt(e.target.value))}
              className="mt-1"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-mpl-red/10 to-mpl-orange/10">
                <th className="border border-gray-200 p-3 text-left font-semibold">Tier</th>
                <th className="border border-gray-200 p-3 text-left font-semibold">Min ₹</th>
                <th className="border border-gray-200 p-3 text-left font-semibold">Max ₹</th>
                <th className="border border-gray-200 p-3 text-left font-semibold">Prize %</th>
                <th className="border border-gray-200 p-3 text-left font-semibold">Milestone Games</th>
                <th className="border border-gray-200 p-3 text-left font-semibold">Milestone Reward ₹</th>
              </tr>
            </thead>
            <tbody>
              {config.tiers.map((tier, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="border border-gray-200 p-3 font-medium text-mpl-red">{tier.tier}</td>
                  <td className="border border-gray-200 p-2">
                    <Input
                      type="number"
                      value={tier.min}
                      onChange={(e) => updateTier(index, 'min', e.target.value)}
                      className="h-8"
                    />
                  </td>
                  <td className="border border-gray-200 p-2">
                    <Input
                      type="number"
                      value={tier.max}
                      onChange={(e) => updateTier(index, 'max', e.target.value)}
                      className="h-8"
                    />
                  </td>
                  <td className="border border-gray-200 p-2">
                    <Input
                      type="number"
                      value={tier.prize}
                      onChange={(e) => updateTier(index, 'prize', e.target.value)}
                      className="h-8"
                    />
                  </td>
                  <td className="border border-gray-200 p-2">
                    <Input
                      type="number"
                      value={tier.games}
                      onChange={(e) => updateTier(index, 'games', e.target.value)}
                      className="h-8"
                    />
                  </td>
                  <td className="border border-gray-200 p-2">
                    <Input
                      type="number"
                      value={tier.reward}
                      onChange={(e) => updateTier(index, 'reward', e.target.value)}
                      className="h-8"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <Button 
            onClick={onDeploy}
            className="gradient-mpl-primary text-white hover:opacity-90 transition-opacity flex items-center space-x-2 px-6 py-3 glow-mpl"
          >
            <Rocket className="h-5 w-5" />
            <span>Deploy Config → Refresh Preview</span>
          </Button>
          <p className="text-sm text-muted-foreground max-w-md">
            Deploy commits YAML configuration and triggers Airflow pipeline. In this demo, it refreshes the preview UI.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigPanel;
