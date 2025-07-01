import { TrendingUp } from "lucide-react";
import { personaDefaults, formatCurrency } from "@/data/personaDefaults";

interface NetProfitPanelProps {
  feature: 'leaderboards' | 'events' | 'spins' | 'battlepass';
  config: any;
}

const NetProfitPanel = ({ feature, config }: NetProfitPanelProps) => {
  const calculateProfit = (persona: string) => {
    const defaults = personaDefaults[persona];
    const gmv = defaults.dau * defaults.avgStake * defaults.matchesPerDay;
    
    let profit = 0;
    switch (feature) {
      case 'leaderboards':
        profit = gmv * defaults.rakePct * (1 - 0.05); // Assuming 5% prize pool
        break;
      case 'events':
        profit = gmv * defaults.rakePct * (1 - (config.prizePoolPct / 100));
        break;
      case 'spins':
        const spinRevenue = defaults.dau * 0.3 * config.paidSpinCost;
        const spinCost = defaults.dau * config.dailyFree * 2; // Avg free spin cost
        profit = spinRevenue - spinCost;
        break;
      case 'battlepass':
        const bpRevenue = defaults.dau * 0.15 * config.premiumPrice;
        const bpCost = defaults.dau * 0.15 * 50; // Avg reward cost
        profit = bpRevenue - bpCost;
        break;
    }
    
    return {
      unlockPct: Math.round(defaults.unlockRate * 100),
      gmv: Math.round(gmv / 1000),
      profit: Math.round(profit / 1000)
    };
  };

  const personas = ['whale', 'grinder', 'roi'];

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg">
      <div className="flex items-center mb-4">
        <TrendingUp className="w-5 h-5 text-rmg-green mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">Net Profit Analysis</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 font-medium text-gray-600">Persona</th>
              <th className="text-center py-2 font-medium text-gray-600">Unlock%</th>
              <th className="text-center py-2 font-medium text-gray-600">GMV</th>
              <th className="text-center py-2 font-medium text-gray-600">Profit</th>
            </tr>
          </thead>
          <tbody>
            {personas.map((persona) => {
              const data = calculateProfit(persona);
              return (
                <tr key={persona} className="border-b border-gray-100">
                  <td className="py-3 font-medium capitalize text-rmg-red">{persona}</td>
                  <td className="text-center py-3">{data.unlockPct}%</td>
                  <td className="text-center py-3 text-rmg-blue">₹{data.gmv}K</td>
                  <td className="text-center py-3 text-rmg-green font-semibold">₹{data.profit}K</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        GMV = DAU × avgStake × matches; Profit = GMV × rake × (1 - costs)
      </div>
    </div>
  );
};

export default NetProfitPanel;