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
  { month: "January 2026", generation: 382.4, revenue: "183,552,000 UZS", payout: "146,841,600 UZS", status: "Paid" },
  { month: "February 2026", generation: 412.1, revenue: "197,808,000 UZS", payout: "158,246,400 UZS", status: "Paid" },
  { month: "March 2026", generation: 495.8, revenue: "237,984,000 UZS", payout: "190,387,200 UZS", status: "Paid" },
  { month: "April 2026", generation: 541.2, revenue: "259,776,000 UZS", payout: "207,820,800 UZS", status: "Paid" },
  { month: "May 2026", generation: 610.5, revenue: "293,040,000 UZS", payout: "234,432,000 UZS", status: "Paid" },
  { month: "June 2026", generation: 654.0, revenue: "313,920,000 UZS", payout: "251,136,000 UZS", status: "Paid" }
];

