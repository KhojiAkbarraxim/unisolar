import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, FileCheck, TrendingUp, DollarSign, Table, ChevronDown, ChevronUp, Sparkles, FileSpreadsheet } from 'lucide-react';
import { Translation } from '../translations';

interface ForInvestorsProps {
  t: Translation;
  onConsultationClick: () => void;
}



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
