
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
          buttonVariant: 'default'
        };
      
      case 'roi':
        const mid = config.tiers[2]; // 100-999 tier
        return {
          rank: 27,
          description: 'Break-even in 1 win, profit starts after 2!',
          progress: 85,
          milestone: 'ROI meter: –₹120 of stake recouped',
          buttonText: `Play ₹${mid.min * 2} Table`,
          buttonVariant: 'secondary'
        };
      
      default:
        return {
          rank: 0,
          description: '',
          progress: 0,
          milestone: '',
          buttonText: '',
          buttonVariant: 'default'
        };
    }
  };

  const getGameTables = () => {
    switch (persona) {
      case 'whale':
        return [
          { stake: 2500, win: 4375, rake: '12.5%' },
          { stake: 5000, win: 9000, rake: '10%' },
          { stake: 10000, win: 18400, rake: '8%' }
        ];
      case 'grinder':
        return [
          { stake: 10, win: 30, rake: '25%' },
          { stake: 25, win: 75, rake: '25%' },
          { stake: 50, win: 150, rake: '25%' }
        ];
      case 'roi':
        return [
          { stake: 100, win: 170, rake: '15%' },
          { stake: 250, win: 420, rake: '16%' },
          { stake: 500, win: 850, rake: '15%' }
        ];
      default:
        return [];
    }
  };

  const getSampleRanks = () => [
    { pos: 23, name: 'Alpha99' },
    { pos: 24, name: 'You' },
    { pos: 25, name: 'BravoKid' }
  ];

  const personaData = getPersonaData();
  const tierConfig = config.tiers[persona === 'whale' ? 3 : persona === 'grinder' ? 1 : 2];
  const gameTables = getGameTables();
  const sampleRanks = getSampleRanks();

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

  return (
    <div className="space-y-6">
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
              ${personaData.buttonVariant === 'default' ? 'gradient-mpl-secondary text-white' : ''}
              ${personaData.buttonVariant === 'secondary' ? 'gradient-mpl-success text-white' : ''}
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

      {/* New Sub-tabs Section */}
      <Card className="border-2 border-gray-200 shadow-lg">
        <CardContent className="p-6">
          <Tabs defaultValue="games" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="games" className="font-semibold">Available Games</TabsTrigger>
              <TabsTrigger value="rules" className="font-semibold">Rules & Rewards</TabsTrigger>
              <TabsTrigger value="rankings" className="font-semibold">Live Rankings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="games" className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Game Tables</h4>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stake</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Winning</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rake</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {gameTables.map((table, index) => (
                      <tr key={index} className="hover:bg-gray-50 cursor-pointer transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">₹{table.stake.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">₹{table.win.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{table.rake}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="rules" className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Rules & Rewards</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-mpl-red/5 to-mpl-orange/5 rounded-lg">
                  <div className="w-2 h-2 bg-mpl-red rounded-full mt-2"></div>
                  <p className="text-gray-700">Points = ₹ stake (e.g., ₹10 win = 10 pts)</p>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-mpl-red/5 to-mpl-orange/5 rounded-lg">
                  <div className="w-2 h-2 bg-mpl-red rounded-full mt-2"></div>
                  <p className="text-gray-700">Top-20% ranks share <strong>3% prize pool</strong></p>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-mpl-red/5 to-mpl-orange/5 rounded-lg">
                  <div className="w-2 h-2 bg-mpl-red rounded-full mt-2"></div>
                  <p className="text-gray-700">Milestone: every 15 games ⇢ instant bonus</p>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-mpl-red/5 to-mpl-orange/5 rounded-lg">
                  <div className="w-2 h-2 bg-mpl-red rounded-full mt-2"></div>
                  <p className="text-gray-700">Season resets weekly; prizes auto-credited</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="rankings" className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Live Rankings</h4>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rank</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Player</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sampleRanks.map((rank, index) => (
                      <tr 
                        key={index} 
                        className={`transition-colors ${
                          rank.name === 'You' 
                            ? 'bg-gradient-to-r from-mpl-gold/10 to-mpl-orange/10 font-semibold' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">#{rank.pos}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{rank.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardPreview;
