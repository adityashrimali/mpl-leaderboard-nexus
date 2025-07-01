import { Persona } from "@/types/rmg";

interface PersonaInsightsProps {
  activePersona: Persona;
}

const PersonaInsights = ({ activePersona }: PersonaInsightsProps) => {
  return (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Persona Insights</h3>
      <div className="space-y-3">
        {activePersona === 'whale' && (
          <div className="p-4 bg-gradient-to-r from-mpl-red/5 to-mpl-orange/5 rounded-lg">
            <h4 className="font-semibold text-rmg-red">Whale Player Behavior</h4>
            <p className="text-sm text-gray-600 mt-1">
              High-value players focused on exclusive tables and maximum rewards. 
              They respond well to VIP treatment and premium gaming experiences.
            </p>
          </div>
        )}
        {activePersona === 'grinder' && (
          <div className="p-4 bg-gradient-to-r from-rmg-purple/5 to-rmg-blue/5 rounded-lg">
            <h4 className="font-semibold text-rmg-purple">Grinder Player Behavior</h4>
            <p className="text-sm text-gray-600 mt-1">
              Volume players who play consistently for smaller rewards. 
              They value progress tracking and achievable milestones.
            </p>
          </div>
        )}
        {activePersona === 'roi' && (
          <div className="p-4 bg-gradient-to-r from-rmg-green/5 to-rmg-blue/5 rounded-lg">
            <h4 className="font-semibold text-rmg-green">ROI-Seeker Behavior</h4>
            <p className="text-sm text-gray-600 mt-1">
              Strategic players who optimize for return on investment. 
              They prefer calculated risks and transparent profit metrics.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonaInsights;