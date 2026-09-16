import { Translation, MonthlyRecord } from './types';
import { uzTranslation } from './data/translations/uz';
import { ruTranslation } from './data/translations/ru';
import { enTranslation } from './data/translations/en';
import { jaTranslation } from './data/translations/ja';

export type { Translation, MonthlyRecord };

export const translations: Record<'UZ' | 'RU' | 'EN' | 'JA', Translation> = {
  UZ: uzTranslation,
  RU: ruTranslation,
  EN: enTranslation,
  JA: jaTranslation
};

export const sampleInvestorData: MonthlyRecord[] = [
  { month: "January 2026", generation: 382.4, revenue: "—", payout: "—", status: "Paid" },
  { month: "February 2026", generation: 412.1, revenue: "—", payout: "—", status: "Paid" },
  { month: "March 2026", generation: 495.8, revenue: "—", payout: "—", status: "Paid" },
  { month: "April 2026", generation: 541.2, revenue: "—", payout: "—", status: "Paid" },
  { month: "May 2026", generation: 610.5, revenue: "—", payout: "—", status: "Paid" },
  { month: "June 2026", generation: 654.0, revenue: "—", payout: "—", status: "Paid" }
];

