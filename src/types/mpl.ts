
export interface TierConfig {
  tier: string;
  min: number;
  max: number;
  prize: number;
  games: number;
  reward: number;
}

export interface SeasonConfig {
  seasonId: string;
  ttlTop: number;
  ttlOther: number;
  tiers: TierConfig[];
}

export type Persona = 'whale' | 'grinder' | 'roi';

export interface PersonaData {
  rank: number;
  description: string;
  progress: number;
  milestone: string;
  buttonText: string;
  buttonVariant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}
