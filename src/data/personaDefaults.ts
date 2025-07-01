import { PersonaDefaults } from "@/types/rmg";

export const personaDefaults: Record<string, PersonaDefaults> = {
  whale: {
    dau: 500,
    avgStake: 2500,
    matchesPerDay: 8,
    unlockRate: 0.85,
    participationRate: 0.70,
    conversionRate: 0.15,
    rakePct: 0.10
  },
  grinder: {
    dau: 2000,
    avgStake: 25,
    matchesPerDay: 12,
    unlockRate: 0.60,
    participationRate: 0.80,
    conversionRate: 0.05,
    rakePct: 0.25
  },
  roi: {
    dau: 1200,
    avgStake: 200,
    matchesPerDay: 6,
    unlockRate: 0.75,
    participationRate: 0.60,
    conversionRate: 0.10,
    rakePct: 0.15
  }
};

export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString("en-IN");
};