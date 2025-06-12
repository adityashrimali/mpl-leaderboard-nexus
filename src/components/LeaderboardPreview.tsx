
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Persona, SeasonConfig, PersonaData } from "@/types/mpl";
import { Trophy, Star, Target } from "lucide-react";

interface LeaderboardPreviewProps {
  persona: Persona;
  config: SeasonConfig;
}

const LeaderboardPreview = ({ persona, config }: LeaderboardPreviewProps) => {
  const getPersonaData = (): PersonaData => {
    switch (persona) {
      case 'whale':
        const high = config.tiers[3]; // 1K+ tier
        return {
          rank: 9,
          description: `Next prize jump: Top-5 → +${high.prize}% of stake`,
          progress: 60,
          milestone: `VIP milestone: ${high.games} games → ₹${high.reward}`,
          buttonText: `Enter ₹5,000 Table (2× pts)`,
          buttonVariant: 'destructive'
        };
      
      case 'grinder':
        const low = config.tiers[1]; // 10-99 tier
        return {
          rank: 52,
          description: `${Math.floor(low.games - low.reward/5)} wins to prize zone!`,
          progress: 40,
          milestone: `Milestone: ${Math.floor(low.games/2)}/${low.games} → ₹${low.reward}`,
          buttonText: 'Play ₹25 Table',
          buttonVariant: 'primary'
        };
      
      case 'roi':
        const mid = config.tiers[2]; // 100-999 tier
        return {
          rank: 27,
          description: 'Break-even in 1 win, profit starts after 2!',
          progress: 85,
          milestone: 'ROI meter: –₹120 of stake recouped',
          buttonText: `Play ₹${mid.min * 2} Table`,
          buttonVariant: 'success'
        };
      
      default:
        return {
          rank: 0,
          description: '',
          progress: 0,
          milestone: '',
          buttonText: '',
          buttonVariant: 'primary'
        };
    }
  };

  const personaData = getPersonaData();
  const tierConfig = config.tiers[persona === 'whale' ? 3 : persona === 'grinder' ? 1 : 2];

  const getGradientClass = () => {
    switch (persona) {
      case 'whale':
        return 'gradient-mpl-primary';
      case 'grinder':
        return 'gradient-mpl-secondary';
      case 'roi':
        return 'gradient-mpl-success';
      default:
        return 'gradient-mpl-primary';
    }
  };

  const getIconColor = () => {
    switch (persona) {
      case 'whale':
        return 'text-mpl-gold';
      case 'grinder':
        return 'text-mpl-blue';
      case 'roi':
        return 'text-mpl-green';
      default:
        return 'text-mpl-red';
    }
  };

  return (
    <Card className="border-2 border-mpl-red/20 shadow-xl hover:shadow-2xl transition-all duration-300 animate-pulse-glow">
      <CardHeader className={`${getGradientClass()} text-white rounded-t-lg`}>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              {persona === 'whale' && <Trophy className="h-6 w-6" />}
              {persona === 'grinder' && <Target className="h-6 w-6" />}
              {persona === 'roi' && <Star className="h-6 w-6" />}
            </div>
            <div>
              <h3 className="text-xl font-bold">{tierConfig.tier} Tier</h3>
              <p className="text-white/80 text-sm">Live Leaderboard Position</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">#{personaData.rank}</div>
            <div className="text-white/80 text-sm">Your Rank</div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="space-y-3">
          <p className="text-lg font-medium text-gray-800">{personaData.description}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress to next reward</span>
              <span>{personaData.progress}%</span>
            </div>
            <Progress 
              value={personaData.progress} 
              className="h-3 bg-gray-200"
            />
          </div>
          
          <div className="bg-gradient-to-r from-mpl-red/10 to-mpl-orange/10 p-4 rounded-lg">
            <p className="text-sm text-gray-600 font-medium">{personaData.milestone}</p>
          </div>
        </div>
        
        <Button 
          className={`
            w-full py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 glow-mpl
            ${personaData.buttonVariant === 'destructive' ? 'gradient-mpl-primary text-white' : ''}
            ${personaData.buttonVariant === 'primary' ? 'gradient-mpl-secondary text-white' : ''}
            ${personaData.buttonVariant === 'success' ? 'gradient-mpl-success text-white' : ''}
          `}
          variant={personaData.buttonVariant}
        >
          {personaData.buttonText}
        </Button>
        
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-mpl-red">{tierConfig.prize}%</div>
            <div className="text-xs text-gray-500">Prize Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-mpl-red">{tierConfig.games}</div>
            <div className="text-xs text-gray-500">Milestone Games</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-mpl-red">₹{tierConfig.reward}</div>
            <div className="text-xs text-gray-500">Milestone Reward</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardPreview;
