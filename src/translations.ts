import { Translation, TeamMember, Partner, Project, MonthlyRecord } from './types';
import { uzTranslation } from './data/translations/uz';
import { ruTranslation } from './data/translations/ru';
import { enTranslation } from './data/translations/en';
import { jaTranslation } from './data/translations/ja';

export type { Translation, TeamMember, Partner, Project, MonthlyRecord };

export const translations: Record<'UZ' | 'RU' | 'EN' | 'JA', Translation> = {
  UZ: uzTranslation,
  RU: ruTranslation,
  EN: enTranslation,
  JA: jaTranslation
};

export const sampleTeam: TeamMember[] = [
  {
    name: "Nodirbek Nematov",
    role: "General Director & Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Kenji Sato",
    role: "Chief Investment Officer (CIO)",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Dilshod Umarov",
    role: "Chief Operations Officer (COO)",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
  }
];

export const samplePartners: Partner[] = [
  { name: "Japan Uz Trade House" },
  { name: "RES HUB" },
  { name: "RHYTHM PLUS" },
  { name: "Sungrow" },
  { name: "LONGi Solar" },
  { name: "Hopewind" }
];

export const sampleProjects: Project[] = [
  {
    name: "Sho'rchi Don Maxsulotlari AJ",
    location: "Surxondaryo viloyati, Sho'rchi tumani",
    capacity: "3.0 MW",
    status: 'completed',
    panels: "4,170 panels (Tier-1 Monocrystalline)",
    inverters: "8 x Sungrow 350kW Inverters",
    description: "Designed to provide 100% of the grain mill's daytime energy needs, saving over 450,000,000 UZS annually in grid costs.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Urganch Tekstil MChJ",
    location: "Xorazm viloyati, Urganch tumani",
    capacity: "1.5 MW",
    status: 'completed',
    panels: "2,080 panels (Tier-1 Monocrystalline)",
    inverters: "4 x Sungrow 350kW Inverters",
    description: "Rooftop-mounted facility supplying clean energy for state-of-the-art weaving looms. Decreases carbon footprint by 1,200 tons of CO2 annually.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80"
  }
];

export const sampleInvestorData: MonthlyRecord[] = [
  { month: "January 2026", generation: 382.4, revenue: "183,552,000 UZS", payout: "146,841,600 UZS", status: "Paid" },
  { month: "February 2026", generation: 412.1, revenue: "197,808,000 UZS", payout: "158,246,400 UZS", status: "Paid" },
  { month: "March 2026", generation: 495.8, revenue: "237,984,000 UZS", payout: "190,387,200 UZS", status: "Paid" },
  { month: "April 2026", generation: 541.2, revenue: "259,776,000 UZS", payout: "207,820,800 UZS", status: "Paid" },
  { month: "May 2026", generation: 610.5, revenue: "293,040,000 UZS", payout: "234,432,000 UZS", status: "Paid" },
  { month: "June 2026", generation: 654.0, revenue: "313,920,000 UZS", payout: "251,136,000 UZS", status: "Paid" }
];
