import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventConfig, Challenge } from "@/types/rmg";
import { Calendar, Trophy } from "lucide-react";

interface EventConfigPanelProps {
  config: EventConfig;
  onConfigChange: (config: EventConfig) => void;
  onDeploy: () => void;
}

const EventConfigPanel = ({ config, onConfigChange, onDeploy }: EventConfigPanelProps) => {
  const updateField = (field: keyof EventConfig, value: any) => {
    onConfigChange({
      ...config,
      [field]: value
    });
  };

  const updateChallenge = (index: number, field: keyof Challenge, value: any) => {
    const newChallenges = [...config.challenges];
    newChallenges[index] = {
      ...newChallenges[index],
      [field]: value
    };
    onConfigChange({
      ...config,
      challenges: newChallenges
    });
  };

  return (
    <Card className="mb-8 border-2 border-rmg-red/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-rmg-red/5 to-rmg-orange/5">
        <CardTitle className="flex items-center space-x-2 text-rmg-red">
          <Calendar className="h-6 w-6" />
          <span>Event Configuration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="eventName">Event Name</Label>
            <Input
              id="eventName"
              value={config.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="theme">Theme</Label>
            <Select value={config.theme} onValueChange={(value) => updateField('theme', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diwali">Diwali</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="seasonal">Seasonal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="schedule">Schedule</Label>
            <Select value={config.schedule} onValueChange={(value: any) => updateField('schedule', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select schedule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="prizePool">Prize Pool %</Label>
            <Input
              id="prizePool"
              type="number"
              step="0.1"
              value={config.prizePoolPct}
              onChange={(e) => updateField('prizePoolPct', parseFloat(e.target.value))}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Trophy className="h-5 w-5" />
            <span>Game Challenges</span>
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-rmg-red/10 to-rmg-orange/10">
                  <th className="border border-gray-200 p-3 text-left font-semibold">Game</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold">Target Wins</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold">Reward %</th>
                </tr>
              </thead>
              <tbody>
                {config.challenges.map((challenge, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-200 p-3 font-medium text-rmg-red">
                      {challenge.game}
                    </td>
                    <td className="border border-gray-200 p-2">
                      <Input
                        type="number"
                        value={challenge.targetWins}
                        onChange={(e) => updateChallenge(index, 'targetWins', parseInt(e.target.value))}
                        className="h-8"
                      />
                    </td>
                    <td className="border border-gray-200 p-2">
                      <Input
                        type="number"
                        step="0.1"
                        value={challenge.rewardPct}
                        onChange={(e) => updateChallenge(index, 'rewardPct', parseFloat(e.target.value))}
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
            <Calendar className="h-5 w-5" />
            <span>Deploy Event Config</span>
          </Button>
          <p className="text-sm text-muted-foreground max-w-md">
            Deploy activates the event configuration and updates live preview for all personas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventConfigPanel;