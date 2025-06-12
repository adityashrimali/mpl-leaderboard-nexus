
import { Persona } from "@/types/mpl";
import { Crown, Target, TrendingUp } from "lucide-react";

interface PersonaTabsProps {
  activePersona: Persona;
  onPersonaChange: (persona: Persona) => void;
}

const PersonaTabs = ({ activePersona, onPersonaChange }: PersonaTabsProps) => {
  const personas = [
    { id: 'whale' as Persona, label: 'Whale', icon: Crown, description: 'High stakes player' },
    { id: 'grinder' as Persona, label: 'Grinder', icon: Target, description: 'Volume player' },
    { id: 'roi' as Persona, label: 'ROI-Seeker', icon: TrendingUp, description: 'Strategic player' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {personas.map((persona) => {
        const Icon = persona.icon;
        const isActive = activePersona === persona.id;
        
        return (
          <button
            key={persona.id}
            onClick={() => onPersonaChange(persona.id)}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${isActive 
                ? 'gradient-mpl-primary text-white shadow-lg glow-mpl transform scale-105' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
              }
            `}
          >
            <Icon className="h-5 w-5" />
            <div className="text-left">
              <div className="font-semibold">{persona.label}</div>
              <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                {persona.description}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default PersonaTabs;
