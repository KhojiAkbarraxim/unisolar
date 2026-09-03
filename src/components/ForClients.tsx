import React from 'react';
import { Gift, Zap, ShieldAlert, CheckCircle2, Factory } from 'lucide-react';
import { Translation } from '../translations';

interface ForClientsProps {
  t: Translation;
}

export default function ForClients({ t }: ForClientsProps) {
  return (
    <section id="clients" className="py-24 bg-slate-50 border-b border-slate-100" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="clients-heading">
          <h2 className="text-sm font-mono text-brand-orange font-bold uppercase tracking-[0.25em] mb-2">04 // {t.nav.clients}</h2>
          <p className="text-3xl sm:text-4xl font-display font-bold text-brand-blue tracking-tight">
            {t.clients.benefitTitle}
          </p>
          <div className="flex justify-center gap-1.5 mt-4">
            <div className="w-2.5 h-2.5 bg-brand-orange" />
            <div className="w-10 h-2.5 bg-slate-900" />
            <div className="w-2.5 h-2.5 bg-brand-orange" />
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 gap-8 mb-16" id="clients-benefits-grid">
          {t.clients.benefits.map((benefit, index) => (
            <div key={index} id={`client-benefit-card-${index}`} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs flex items-start space-x-5">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 border border-slate-100 flex items-center justify-center text-brand-blue shrink-0">
                {index === 0 && <Zap className="w-6 h-6 text-brand-orange" />}
                {index === 1 && <Gift className="w-6 h-6 text-emerald-500" />}
                {index === 2 && <CheckCircle2 className="w-6 h-6 text-sky-500" />}
                {index === 3 && <Factory className="w-6 h-6" />}
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-bold text-brand-blue text-lg leading-snug">{benefit.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works Explainer Block */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-xs grid lg:grid-cols-12 gap-12 items-center mb-16" id="clients-process">
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-display font-bold text-brand-blue">{t.clients.howItWorksTitle}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t.clients.howItWorksText}
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our engineering team handles grid synchronizations, safety approvals, structural engineering, and utility permissions without disrupting your manufacturing flow.
            </p>
          </div>

          {/* Not Needed Checklist */}
          <div className="lg:col-span-6 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-150 space-y-4">
            <h4 className="text-sm font-mono text-slate-500 font-bold uppercase tracking-wider mb-2">{t.clients.notNeededTitle}</h4>
            <div className="space-y-3">
              {t.clients.notNeededPoints.map((point, index) => (
                <div key={index} id={`client-notneeded-${index}`} className="flex items-center space-x-3 text-slate-700 font-medium text-sm">
                  <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                    <span className="font-bold text-xs">✕</span>
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 12 Years Transfer Highlight Block (Sovereign Transfer) */}
        <div className="bg-gradient-to-br from-brand-orange to-amber-500 rounded-3xl p-8 sm:p-12 text-slate-950 relative overflow-hidden shadow-lg shadow-brand-orange/10" id="clients-transfer">
          <div className="absolute right-0 bottom-0 opacity-10">
            <Gift className="w-96 h-96 -mr-16 -mb-16" />
          </div>
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-slate-950/10 px-3 py-1 rounded-full text-slate-950 text-xs font-mono font-bold tracking-wider uppercase">
              <Gift className="w-4 h-4" />
              <span>Free Asset Transfer</span>
            </div>
            <h3 className="text-3xl font-display font-black tracking-tight">{t.clients.transferTitle}</h3>
            <p className="text-slate-900 text-base leading-relaxed font-medium">
              {t.clients.transferText}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
