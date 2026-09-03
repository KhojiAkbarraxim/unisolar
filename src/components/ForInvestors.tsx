import React from 'react';
import { ShieldCheck, ArrowRight, FileCheck, TrendingUp, DollarSign } from 'lucide-react';
import { Translation } from '../translations';

interface ForInvestorsProps {
  t: Translation;
  onConsultationClick: () => void;
}

export default function ForInvestors({ t, onConsultationClick }: ForInvestorsProps) {
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
        <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 grid lg:grid-cols-12 gap-0 mb-20" id="investor-sample-case">
          {/* Photo side */}
          <div className="lg:col-span-5 relative min-h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80"
              alt="3MW Solar Farm"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-blue/20 mix-blend-multiply" />
            <div className="absolute top-6 left-6 bg-brand-blue text-white font-mono text-xs font-bold px-3 py-1.5 rounded-full border border-brand-orange/30 shadow-md">
              {t.investors.sampleBadge}
            </div>
          </div>

          {/* Details side */}
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
            <div>
              <h3 className="text-2xl font-display font-bold text-brand-blue">{t.investors.exampleTitle}</h3>
              <p className="text-slate-500 text-sm mt-1">{t.investors.exampleDesc}</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 text-sm font-mono border-t border-slate-200/60 pt-6">
              <div>
                <span className="block text-slate-400 text-xs uppercase font-bold">{t.investors.sampleCapacityLabel}</span>
                <span className="text-lg font-bold text-brand-blue">{t.investors.sampleCapacityVal}</span>
              </div>
              <div>
                <span className="block text-slate-400 text-xs uppercase font-bold">{t.investors.sampleProductionLabel}</span>
                <span className="text-lg font-bold text-brand-blue">{t.investors.sampleProductionVal}</span>
              </div>
              <div>
                <span className="block text-slate-400 text-xs uppercase font-bold">{t.investors.sampleCapexLabel}</span>
                <span className="text-lg font-bold text-brand-blue">{t.investors.sampleCapexVal}</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono">
              <div>
                <span className="block text-slate-400 font-bold">{t.investors.sampleRevenueLabel}</span>
                <span className="text-base font-extrabold text-emerald-600">{t.investors.sampleRevenueVal}</span>
              </div>
              <div className="mt-2 sm:mt-0 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-100">
                {t.investors.sampleIrrBadge}
              </div>
            </div>
          </div>
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
