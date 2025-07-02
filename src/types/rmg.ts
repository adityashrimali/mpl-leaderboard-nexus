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
  prizePoolPct?: number;
  milestoneRewardEveryN?: number;
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

// Events Types
export interface Challenge {
  game: string;
  targetWins: number;
  nextTargets: number[];
  rewardPct: number;
}

export interface EventConfig {
  name: string;
  theme: string;
  active: boolean;
  schedule: 'daily' | 'weekly' | 'monthly';
  challenges: Challenge[];
  prizePoolPct: number;
}

// Spins Types
export interface SpinReward {
  type: 'cashback' | 'discount' | 'cash' | 'multiplier' | 'jackpot';
  value: number;
  probability: number;
  label: string;
}

export interface SpinConfig {
  dailyFree: number;
  paidSpinCost: number;
  rewards: SpinReward[];
}

// Battle Pass Types
export interface Milestone {
  tier: number;
  freeReward: string;
  premiumReward: string;
}

export interface BattlePassConfig {
  seasonId: string;
  seasonName: string;
  duration: 'monthly' | 'quarterly';
  premiumPrice: number;
  annualDiscount: number;
  milestones: Milestone[];
}

// Persona defaults for calculations
export interface PersonaDefaults {
  dau: number;
  avgStake: number;
  matchesPerDay: number;
  unlockRate: number;
  participationRate: number;
  conversionRate: number;
  rakePct: number;
}