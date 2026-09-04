import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, FileCheck, TrendingUp, DollarSign, Table, ChevronDown, ChevronUp, Sparkles, FileSpreadsheet } from 'lucide-react';
import { Translation } from '../translations';

interface ForInvestorsProps {
  t: Translation;
  onConsultationClick: () => void;
}

const CASH_FLOW_DATA = [
  { year: 1, gen: '4 200 000', tariff: '880', gross: '3 696 000 000', unisolar: '739,200,000', investor: '2,956,800,000', tax: '443,520,000', net: '2,513,280,000', yieldVal: '27.2%' },
  { year: 2, gen: '4 179 000', tariff: '968', gross: '4 045 272 000', unisolar: '809,054,400', investor: '3,236,217,600', tax: '485,432,640', net: '2,750,784,960', yieldVal: '29.8%' },
  { year: 3, gen: '4 158 105', tariff: '1 065', gross: '4 428,381,825', unisolar: '885,676,365', investor: '3,542,705,460', tax: '531,405,819', net: '3,011,299,641', yieldVal: '32.6%' },
  { year: 4, gen: '4 137 314', tariff: '1 171', gross: '4,844,794,694', unisolar: '968,958,939', investor: '3,875,835,755', tax: '581,375,363', net: '3,294,460,392', yieldVal: '35.6%' },
  { year: 5, gen: '4 116 628', tariff: '1 288', gross: '5,302,216,864', unisolar: '1,060,443,373', investor: '4,241,773,491', tax: '636,266,024', net: '3,605,507,468', yieldVal: '39.0%' },
  { year: 6, gen: '4 096 045', tariff: '1 417', gross: '5,804,095,765', unisolar: '1,160,819,153', investor: '4,643,276,612', tax: '696,491,492', net: '3,946,785,120', yieldVal: '42.7%' },
  { year: 7, gen: '4 075 565', tariff: '1 559', gross: '6,353,805,835', unisolar: '1,270,761,167', investor: '5,083,044,668', tax: '762,456,700', net: '4,320,587,968', yieldVal: '46.7%' },
  { year: 8, gen: '4 055 187', tariff: '1 715', gross: '6,954,645,705', unisolar: '1,390,929,141', investor: '5,563,716,564', tax: '834,557,485', net: '4,729,159,079', yieldVal: '51.2%' },
  { year: 9, gen: '4 034 911', tariff: '1 886', gross: '7,609,842,146', unisolar: '1,521,968,429', investor: '6,087,873,717', tax: '913,181,058', net: '5,174,692,659', yieldVal: '56.0%' },
  { year: 10, gen: '4 014 736', tariff: '2 075', gross: '8,330,577,200', unisolar: '1,666,115,440', investor: '6,664,461,760', tax: '999,669,264', net: '5,664,792,496', yieldVal: '61.3%' },
  { year: 11, gen: '3 994 663', tariff: '2 282', gross: '9,115,820,966', unisolar: '1,823,164,193', investor: '7,292,656,773', tax: '1,093,898,516', net: '6,198,758,257', yieldVal: '67.1%' },
  { year: 12, gen: '3 974 689', tariff: '2 511', gross: '9,980,444,079', unisolar: '1,996,088,816', investor: '7,984,355,263', tax: '1,197,653,289', net: '6,786,701,974', yieldVal: '73.4%' },
];

const TOTAL_BASE = {
  label: 'TOTAL · BASE',
  gen: '49 036 842',
  tariff: '—',
  gross: '76,465,897,079',
  unisolar: '15,293,179,416',
  investor: '61,172,717,663',
  tax: '9,175,907,649',
  net: '51,996,810,014',
  yieldVal: '562.5%'
};

const TOTAL_HIGH = {
  label: 'TOTAL · HIGH',
  gen: '52 539 474',
  tariff: '—',
  gross: '81,927,745,280',
  unisolar: '16,385,549,056',
  investor: '65,542,196,224',
  tax: '9,831,329,434',
  net: '55,710,866,791',
  yieldVal: '602.5%'
};

export default function ForInvestors({ t, onConsultationClick }: ForInvestorsProps) {
  const [showTable, setShowTable] = useState(false);

  const th = t.investors.tableHeaders || {
    year: 'Year',
    generation: 'Generation (kWh)',
    tariff: 'Tariff (UZS/kWh)',
    grossBilling: 'Gross billing (UZS)',
    unisolarShare: 'UNISOLAR 20% (UZS)',
    investorShare: 'Investor 80% (UZS)',
    profitTax: 'Profit tax 15% (UZS)',
    investorNet: 'Investor net (UZS)',
    yield: 'Project Gross Yield (%)',
  };

  return (
    <section id="investors" className="py-24 bg-white border-b border-slate-100" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="investors-heading">
          <h2 className="text-sm font-mono text-brand-orange font-bold uppercase tracking-[0.25em] mb-2">{t.investors.badge}</h2>
          <p className="text-3xl sm:text-4xl font-display font-bold text-brand-blue tracking-tight">
            {t.investors.whyTitle}
          </p>
          <div className="flex justify-center gap-1.5 mt-4">
            <div className="w-2.5 h-2.5 bg-brand-orange" />
            <div className="w-10 h-2.5 bg-slate-900" />
            <div className="w-2.5 h-2.5 bg-brand-orange" />
          </div>
        </div>

        {/* Why Invest Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20" id="investors-why-grid">
          {t.investors.whyPoints.map((point, index) => (
            <div key={index} id={`investor-why-card-${index}`} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
                {index === 0 && <FileCheck className="w-5 h-5 text-brand-orange" />}
                {index === 1 && <ShieldCheck className="w-5 h-5 text-emerald-500" />}
                {index === 2 && <TrendingUp className="w-5 h-5" />}
                {index === 3 && <DollarSign className="w-5 h-5 text-amber-500" />}
              </div>
              <h4 className="font-display font-bold text-brand-blue text-base mb-2">{point.title}</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>

        {/* 3 MW Sample Project Showcase Banner */}
        <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 mb-20 shadow-xs" id="investor-sample-case">
          <div className="grid lg:grid-cols-12 gap-0">
            {/* Photo side */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[440px]">
              <img
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80"
                alt="3MW Solar Farm"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-blue/25 mix-blend-multiply" />
              <div className="absolute top-6 left-6 bg-brand-blue text-white font-mono text-xs font-bold px-3.5 py-1.5 rounded-full border border-brand-orange/30 shadow-md">
                {t.investors.sampleBadge}
              </div>
            </div>

            {/* Details side */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-brand-orange/10 text-brand-orange text-[10px] font-mono font-bold uppercase tracking-wider">
                    Base Case: 4.2M kWh
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    PPA 12-Year
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-brand-blue tracking-tight">
                  {t.investors.exampleTitle}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  {t.investors.exampleDesc}
                </p>
              </div>

              {/* 3 Key Spec Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-mono border-t border-slate-200/80 pt-5">
                <div className="bg-white/70 p-3 rounded-xl border border-slate-200/50">
                  <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider">{t.investors.sampleCapacityLabel}</span>
                  <span className="text-base sm:text-lg font-bold text-brand-blue mt-0.5 block">{t.investors.sampleCapacityVal}</span>
                </div>
                <div className="bg-white/70 p-3 rounded-xl border border-slate-200/50">
                  <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider">{t.investors.sampleProductionLabel}</span>
                  <span className="text-base sm:text-lg font-bold text-brand-blue mt-0.5 block">{t.investors.sampleProductionVal}</span>
                </div>
                <div className="bg-white/70 p-3 rounded-xl border border-slate-200/50">
                  <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider">{t.investors.sampleCapexLabel}</span>
                  <span className="text-base sm:text-lg font-bold text-brand-blue mt-0.5 block">{t.investors.sampleCapexVal}</span>
                </div>
              </div>

              {/* 2 Primary Revenue & Net Return Cards */}
              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                {/* Year 1 Net Card */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
                  <div>
                    <span className="block text-slate-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                      {t.investors.sampleRevenueLabel}
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-emerald-600 font-mono mt-1 block">
                      {t.investors.sampleRevenueVal}
                    </span>
                  </div>
                  <div className="mt-3 inline-flex items-center self-start px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-mono font-bold border border-emerald-200/70">
                    <Sparkles className="w-3 h-3 mr-1 text-emerald-600" />
                    <span>{t.investors.sampleIrrBadge}</span>
                  </div>
                </div>

                {/* 12-Year Total Net Card */}
                <div className="bg-brand-blue text-white rounded-2xl p-4 flex flex-col justify-between shadow-xs">
                  <div>
                    <span className="block text-slate-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                      {t.investors.sample12YearNetLabel || '12-Year Cumulative Net Profit'}
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-amber-300 font-mono mt-1 block">
                      {t.investors.sample12YearNetVal || '51 996 810 014 UZS'}
                    </span>
                  </div>
                  <div className="mt-3 inline-flex items-center self-start px-2.5 py-1 rounded-full bg-white/10 text-amber-300 text-[11px] font-mono font-bold border border-amber-300/30">
                    <TrendingUp className="w-3 h-3 mr-1 text-amber-400" />
                    <span>{t.investors.sample12YearYieldBadge || '562.5% Gross Yield'}</span>
                  </div>
                </div>
              </div>

              {/* Toggle Table Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setShowTable(!showTable)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-mono font-semibold transition-all shadow-xs cursor-pointer"
                >
                  <Table className="w-4 h-4 text-brand-orange" />
                  <span>{showTable ? (t.investors.hideTableBtn || 'Jadvalni yopish') : (t.investors.viewTableBtn || '12 yillik pul oqimi jadvalini ko‘rish')}</span>
                  {showTable ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <span className="text-[11px] font-mono text-slate-400">
                  CONFIDENTIAL · UNISOLAR LLC
                </span>
              </div>
            </div>
          </div>

          {/* Expandable 12-Year Cash Flow Table */}
          {showTable && (
            <div className="border-t border-slate-200 bg-white p-4 sm:p-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-brand-orange" />
                  <h4 className="font-display font-bold text-brand-blue text-base sm:text-lg">
                    12-year cash flow — 3 MW, base case (4.2m kWh)
                  </h4>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Tariff: 880 UZS/kWh (+10% p.a.) · 80% Investor / 20% UNISOLAR · 15% Profit Tax
                </span>
              </div>

              {/* Responsive Scroll Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs font-mono text-slate-700">
                  <thead className="bg-slate-900 text-white text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-3 text-center">{th.year}</th>
                      <th className="py-3 px-3 text-right">{th.generation}</th>
                      <th className="py-3 px-3 text-right">{th.tariff}</th>
                      <th className="py-3 px-3 text-right">{th.grossBilling}</th>
                      <th className="py-3 px-3 text-right">{th.unisolarShare}</th>
                      <th className="py-3 px-3 text-right">{th.investorShare}</th>
                      <th className="py-3 px-3 text-right">{th.profitTax}</th>
                      <th className="py-3 px-3 text-right text-emerald-400 font-bold">{th.investorNet}</th>
                      <th className="py-3 px-3 text-right text-amber-300 font-bold">{th.yield}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {CASH_FLOW_DATA.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 text-center font-bold text-brand-blue">{row.year}</td>
                        <td className="py-2.5 px-3 text-right text-slate-600">{row.gen}</td>
                        <td className="py-2.5 px-3 text-right text-slate-600">{row.tariff}</td>
                        <td className="py-2.5 px-3 text-right text-slate-600">{row.gross}</td>
                        <td className="py-2.5 px-3 text-right text-slate-500">{row.unisolar}</td>
                        <td className="py-2.5 px-3 text-right text-slate-600">{row.investor}</td>
                        <td className="py-2.5 px-3 text-right text-rose-500/80">{row.tax}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-emerald-600 bg-emerald-50/40">{row.net}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-brand-blue">{row.yieldVal}</td>
                      </tr>
                    ))}

                    {/* TOTAL - BASE ROW */}
                    <tr className="bg-slate-900 text-white font-bold border-t-2 border-slate-700">
                      <td className="py-3 px-3 text-center text-amber-300">{TOTAL_BASE.label}</td>
                      <td className="py-3 px-3 text-right">{TOTAL_BASE.gen}</td>
                      <td className="py-3 px-3 text-right text-slate-400">—</td>
                      <td className="py-3 px-3 text-right">{TOTAL_BASE.gross}</td>
                      <td className="py-3 px-3 text-right text-slate-300">{TOTAL_BASE.unisolar}</td>
                      <td className="py-3 px-3 text-right">{TOTAL_BASE.investor}</td>
                      <td className="py-3 px-3 text-right text-rose-300">{TOTAL_BASE.tax}</td>
                      <td className="py-3 px-3 text-right text-emerald-400 text-sm">{TOTAL_BASE.net}</td>
                      <td className="py-3 px-3 text-right text-amber-300 text-sm">{TOTAL_BASE.yieldVal}</td>
                    </tr>

                    {/* TOTAL - HIGH ROW */}
                    <tr className="bg-amber-950/40 text-amber-200 font-bold border-t border-amber-900/30">
                      <td className="py-3 px-3 text-center text-amber-400">{TOTAL_HIGH.label}</td>
                      <td className="py-3 px-3 text-right">{TOTAL_HIGH.gen}</td>
                      <td className="py-3 px-3 text-right text-amber-300/60">—</td>
                      <td className="py-3 px-3 text-right">{TOTAL_HIGH.gross}</td>
                      <td className="py-3 px-3 text-right">{TOTAL_HIGH.unisolar}</td>
                      <td className="py-3 px-3 text-right">{TOTAL_HIGH.investor}</td>
                      <td className="py-3 px-3 text-right text-rose-300">{TOTAL_HIGH.tax}</td>
                      <td className="py-3 px-3 text-right text-amber-300 text-sm">{TOTAL_HIGH.net}</td>
                      <td className="py-3 px-3 text-right text-amber-400 text-sm">{TOTAL_HIGH.yieldVal}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Footnote */}
              <p className="mt-4 text-[11px] text-slate-400 font-mono leading-relaxed border-t border-slate-100 pt-3">
                {t.investors.tableFootnote || 'Base case = EPC-guaranteed 4,200,000 kWh in Year 1. High case = 4,500,000 kWh (+7.1% investor net over 12 years). Both cases assume 0.5% annual degradation, an initial tariff of 880 UZS/kWh escalating by 10% p.a. (PPA cl. 5.1), 20% UNISOLAR share of gross billing, 80% investor share, and 15% profit tax on the investor share.'}
              </p>
            </div>
          )}
        </div>

        {/* Protection Mechanisms */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-24" id="investors-protection">
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-2xl font-display font-bold text-brand-blue tracking-tight">{t.investors.protectionTitle}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t.investors.protectionDesc}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {t.investors.protectionPoints.map((point, index) => (
              <div key={index} id={`protection-point-${index}`} className="flex items-start space-x-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-slate-700 text-sm font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps to Collaborate */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800" id="investors-process">
          <h3 className="text-2xl font-display font-bold mb-12 text-center">{t.investors.processTitle}</h3>
          
          <div className="grid sm:grid-cols-4 gap-8 relative">
            {t.investors.processSteps.map((step, index) => (
              <div key={index} id={`process-step-${index}`} className="space-y-3 relative">
                <div className="w-10 h-10 rounded-full bg-brand-orange text-slate-950 font-mono font-bold flex items-center justify-center text-sm shadow-md">
                  {index + 1}
                </div>
                <h4 className="font-display font-bold text-white text-base">{step.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <span className="text-xs font-mono text-slate-400 block">{t.investors.auditTitle}</span>
              <p className="text-slate-300 text-sm mt-1">{t.investors.auditDesc}</p>
            </div>
            <button
              id="investor-cta-consultation"
              onClick={onConsultationClick}
              className="flex items-center justify-center space-x-2 bg-brand-orange hover:bg-brand-orange-light text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-brand-orange/15 transition-all cursor-pointer"
            >
              <span>{t.investors.ctaButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
