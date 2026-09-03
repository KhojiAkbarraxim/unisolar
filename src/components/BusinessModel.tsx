import React, { useState } from 'react';
import { HelpCircle, ChevronRight, Calculator, Check, ArrowRight, ShieldCheck, Landmark } from 'lucide-react';
import { Translation } from '../translations';

interface BusinessModelProps {
  t: Translation;
}

export default function BusinessModel({ t }: BusinessModelProps) {
  // Simulator State
  const [capacity, setCapacity] = useState<number>(3); // Default to 3 MW (Sho'rchi sample)

  // Financial Constants (rough real-world estimates for Uzb)
  const CAPEX_PER_MW_USD = 750000;
  const USD_TO_UZS = 12500; // Mock current exchange rate for clean calculations
  const ANNUAL_MWH_PER_MW = 1600; // 1,600 MWh per 1 MW capacity in sunny Uzbekistan
  const PPA_TARIFF_UZS_KWH = 450; // Tariff charged to factory

  // Calculations
  const totalCostUsd = capacity * CAPEX_PER_MW_USD;
  const totalCostUzs = totalCostUsd * USD_TO_UZS;
  
  const annualMwh = capacity * ANNUAL_MWH_PER_MW;
  const annualKwh = annualMwh * 1000;
  
  const annualGrossRevUzs = annualKwh * PPA_TARIFF_UZS_KWH;
  const vatRate = 0.12; // 12% Uzbek VAT
  const netRevenueUzs = annualGrossRevUzs / (1 + vatRate);
  
  const investorShareUzs = netRevenueUzs * 0.8;
  const unisolarShareUzs = netRevenueUzs * 0.2;
  
  const paybackYears = (totalCostUzs / investorShareUzs).toFixed(1);

  // Helper to format currency in space-separated format requested by the client: e.g., 46 428 615 000
  const formatUzs = (num: number) => {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
  };

  const formatUsd = (num: number) => {
    return "$" + Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " USD";
  };

  return (
    <section id="model" className="py-24 bg-slate-50 border-b border-slate-100" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="model-heading">
          <h2 className="text-sm font-mono text-brand-orange font-bold uppercase tracking-[0.25em] mb-2">02 // {t.howItWorks.title}</h2>
          <p className="text-3xl sm:text-4xl font-display font-bold text-brand-blue tracking-tight">
            {t.howItWorks.subtitle}
          </p>
          <div className="flex justify-center gap-1.5 mt-4">
            <div className="w-2.5 h-2.5 bg-brand-orange" />
            <div className="w-10 h-2.5 bg-slate-900" />
            <div className="w-2.5 h-2.5 bg-brand-orange" />
          </div>
        </div>

        {/* 2-Column Core Business Concepts (PPA & 20/80) */}
        <div className="grid md:grid-cols-2 gap-8 mb-16" id="model-core-cards">
          {/* PPA Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-2 bg-brand-blue/5 text-brand-blue text-xs font-mono font-bold tracking-wide px-3 py-1.5 rounded-full mb-6">
                <HelpCircle className="w-4 h-4 text-brand-orange" />
                <span>Power Purchase Agreement</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-blue mb-4">{t.howItWorks.ppaTitle}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {t.howItWorks.ppaText}
              </p>
            </div>
            <div className="border-t border-slate-100 pt-6">
              <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-500">
                <div>
                  <span className="block font-bold text-brand-blue">Contract Length</span>
                  <span>12 Years Guaranteed</span>
                </div>
                <div>
                  <span className="block font-bold text-brand-blue">Grid Tariffs</span>
                  <span>20% Direct Savings</span>
                </div>
              </div>
            </div>
          </div>

          {/* 20/80 Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-2 bg-brand-orange/10 text-brand-orange text-xs font-mono font-bold tracking-wide px-3 py-1.5 rounded-full mb-6">
                <Landmark className="w-4 h-4" />
                <span>Equitable Yield Split</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-blue mb-4">{t.howItWorks.splitTitle}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {t.howItWorks.splitText}
              </p>
            </div>
            <div className="border-t border-slate-100 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-brand-blue" />
                  <span className="text-xs font-mono text-slate-500">Investor: 80%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-brand-orange" />
                  <span className="text-xs font-mono text-slate-500">UNISOLAR: 20%</span>
                </div>
              </div>
              {/* Simple split visual bar */}
              <div className="w-full h-3 bg-slate-100 rounded-full mt-3 overflow-hidden flex">
                <div className="bg-brand-blue h-full" style={{ width: '80%' }} />
                <div className="bg-brand-orange h-full" style={{ width: '20%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Cash Flowchart (Step-by-step vector path) */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xs mb-20" id="model-cash-flow">
          <div className="max-w-2xl mb-10">
            <h3 className="text-2xl font-display font-bold text-brand-blue mb-2">{t.howItWorks.flowTitle}</h3>
            <p className="text-slate-500 text-sm">{t.howItWorks.flowText}</p>
          </div>

          {/* Process Timeline/Path */}
          <div className="relative" id="flowchart-steps">
            {/* SVG Connector lines for desktop */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 hidden xl:block z-0" />
            
            <div className="grid xl:grid-cols-5 gap-8 relative z-10">
              {t.howItWorks.flowSteps.map((step, index) => (
                <div key={index} id={`flow-step-${index}`} className="flex flex-col items-center xl:items-start text-center xl:text-left bg-slate-50 xl:bg-white p-5 xl:p-0 rounded-2xl xl:rounded-none border border-slate-100 xl:border-none">
                  {/* Step bubble */}
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue text-white font-mono font-bold text-lg flex items-center justify-center mb-4 shadow-md border-b-2 border-brand-orange">
                    {index + 1}
                  </div>
                  <h4 className="font-display font-bold text-brand-blue text-base mb-1">
                    {index === 0 && "Factory pays"}
                    {index === 1 && "Aggregate"}
                    {index === 2 && "VAT Deduction"}
                    {index === 3 && "UNISOLAR (20%)"}
                    {index === 4 && "Investor (80%)"}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Aligned Interests (Why safe) */}
        <div className="grid md:grid-cols-2 gap-8 mb-20" id="model-safety-section">
          <div className="bg-gradient-to-br from-brand-blue to-brand-blue-dark rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
            <div className="absolute right-0 bottom-0 opacity-5">
              <ShieldCheck className="w-64 h-64 -mr-12 -mb-12" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-display font-bold mb-3">{t.howItWorks.managementTitle}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {t.howItWorks.managementText}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-display font-bold text-brand-blue mb-3">{t.howItWorks.safetyTitle}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t.howItWorks.safetyText}
              </p>
            </div>
          </div>
        </div>

        {/* Investment Simulator / Calculator Panel */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800" id="model-simulator">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 text-brand-orange font-mono text-xs font-bold uppercase mb-2">
                <Calculator className="w-4 h-4" />
                <span>Interactive Yield Calculator</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">{t.howItWorks.calcTitle}</h3>
              <p className="text-slate-400 text-sm mt-1">{t.howItWorks.calcDesc}</p>
            </div>
            <div className="mt-4 md:mt-0 bg-slate-950 px-5 py-3 rounded-2xl border border-slate-800 flex items-center space-x-3">
              <span className="text-xs font-mono text-slate-500">Exchange Rate:</span>
              <span className="text-sm font-mono font-bold text-slate-300">1 USD = 12 500 UZS</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Slider Column */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <label className="flex justify-between items-center text-sm font-mono text-slate-400 mb-2">
                  <span>{t.howItWorks.calcCapacity}</span>
                  <span className="text-2xl font-mono font-extrabold text-brand-orange">{capacity.toFixed(1)} MW</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={capacity}
                  onChange={(e) => setCapacity(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                  id="simulator-slider"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
                  <span>0.5 MW</span>
                  <span>5.0 MW</span>
                  <span>10.0 MW</span>
                </div>
              </div>

              {/* Technical indicators */}
              <div className="space-y-3 bg-slate-950/50 p-4 rounded-2xl border border-slate-850 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>PPA Billing Tariff:</span>
                  <span className="text-white">{PPA_TARIFF_UZS_KWH} UZS / kWh</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Expected Sunny Hours:</span>
                  <span className="text-white">1,600 hrs / year</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>VAT (QQS) Rate:</span>
                  <span className="text-white">12%</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Joint Venture Split Ratio:</span>
                  <span className="text-brand-orange font-bold">80% Investor / 20% O&M</span>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-850 grid sm:grid-cols-2 gap-6" id="simulator-results">
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-500">{t.howItWorks.calcCost}</span>
                <span className="block text-xl font-mono font-bold text-white leading-none">{formatUsd(totalCostUsd)}</span>
                <span className="block text-xs font-mono text-slate-400">{formatUzs(totalCostUzs)}</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-500">{t.howItWorks.calcYield}</span>
                <span className="block text-xl font-mono font-bold text-emerald-400 leading-none">{(annualMwh).toLocaleString()} MWh / year</span>
                <span className="block text-xs font-mono text-slate-450">{(annualKwh).toLocaleString()} kWh generated</span>
              </div>

              <div className="space-y-1 sm:col-span-2 border-t border-slate-850 pt-4 mt-2">
                <span className="text-xs font-mono text-slate-500">{t.howItWorks.calcRev}</span>
                <span className="block text-2xl font-mono font-bold text-white leading-none">{formatUzs(annualGrossRevUzs)}</span>
                <span className="block text-xs font-mono text-slate-450">Including VAT. Total customer billing payments.</span>
              </div>

              <div className="space-y-1 border-t border-slate-850 pt-4">
                <span className="text-xs font-mono text-sky-400 font-semibold">{t.howItWorks.calcShare80} (80%)</span>
                <span className="block text-xl font-mono font-bold text-sky-400 leading-none">{formatUzs(investorShareUzs)}</span>
                <span className="block text-xs font-mono text-slate-450">Net payout to Investor</span>
              </div>

              <div className="space-y-1 border-t border-slate-850 pt-4">
                <span className="text-xs font-mono text-brand-orange font-semibold">{t.howItWorks.calcShare20} (20%)</span>
                <span className="block text-xl font-mono font-bold text-brand-orange leading-none">{formatUzs(unisolarShareUzs)}</span>
                <span className="block text-xs font-mono text-slate-450">Retained for complete operations</span>
              </div>

              <div className="sm:col-span-2 bg-brand-orange/10 border border-brand-orange/30 rounded-xl p-4 flex items-center justify-between text-sm mt-2">
                <div className="flex items-center space-x-2 text-brand-orange font-mono">
                  <Calculator className="w-5 h-5" />
                  <span className="font-bold">{t.howItWorks.calcPayback}</span>
                </div>
                <span className="text-lg font-mono font-bold text-white">~ {paybackYears} Years</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
