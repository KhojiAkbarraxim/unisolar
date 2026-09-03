import React from 'react';
import { Building2, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';
import { Translation } from '../translations';

interface PartnersProps {
  t: Translation;
}

export default function Partners({ t }: PartnersProps) {
  const iconMap: Record<string, any> = {
    'japan-uz': Building2,
    'res-hub': Wrench,
    'rhythm-plus': ShieldCheck
  };

  const styleMap: Record<string, { accentColor: string; tagColor: string }> = {
    'japan-uz': {
      accentColor: 'border-red-500/20 bg-red-50/50 text-red-600',
      tagColor: 'bg-red-100 text-red-800'
    },
    'res-hub': {
      accentColor: 'border-amber-500/20 bg-amber-50/50 text-brand-orange',
      tagColor: 'bg-amber-100 text-amber-900'
    },
    'rhythm-plus': {
      accentColor: 'border-emerald-500/20 bg-emerald-50/50 text-emerald-600',
      tagColor: 'bg-emerald-100 text-emerald-900'
    }
  };

  return (
    <section id="partners" className="py-24 bg-slate-50 border-b border-slate-200/80" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="partners-heading">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono font-bold tracking-widest uppercase mb-4">
            {t.partners.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-blue tracking-tight">
            {t.partners.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.partners.desc}
          </p>
          <div className="flex justify-center gap-1.5 mt-6">
            <div className="w-2.5 h-2.5 bg-brand-orange" />
            <div className="w-10 h-2.5 bg-slate-900" />
            <div className="w-2.5 h-2.5 bg-brand-orange" />
          </div>
        </div>

        {/* 3 Core Partners Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16" id="partners-cards-grid">
          {t.partners.partnersList.map((partner) => {
            const Icon = iconMap[partner.id] || Building2;
            const style = styleMap[partner.id] || {
              accentColor: 'border-brand-blue/20 bg-brand-blue/5 text-brand-blue',
              tagColor: 'bg-brand-blue/10 text-brand-blue'
            };

            return (
              <div
                key={partner.id}
                id={`partner-card-${partner.id}`}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className={`p-3 rounded-xl border ${style.accentColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${style.tagColor}`}>
                      {partner.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-brand-blue mb-3">
                    {partner.name}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {partner.description}
                  </p>
                </div>

                <div className="bg-slate-50/80 border-t border-slate-100 p-6 space-y-3">
                  {partner.details.map((item, idx) => (
                    <div key={idx} className="text-xs">
                      <span className="font-mono text-slate-400 font-bold uppercase tracking-wider block mb-0.5">
                        {item.label}
                      </span>
                      <span className="text-slate-800 font-medium leading-normal">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Ecosystem Table & Process Chain */}
        <div className="grid lg:grid-cols-12 gap-8 items-start" id="partners-ecosystem-section">
          
          {/* Ecosystem Table */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-sm">
                01
              </div>
              <h3 className="text-lg font-display font-bold text-brand-blue">
                {t.partners.ecosystemTitle}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              {t.partners.ecosystemDesc}
            </p>

            <div className="overflow-hidden border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-mono uppercase tracking-wider text-xs">{t.partners.ecosystemHeaders.partner}</th>
                    <th className="py-3 px-4 font-mono uppercase tracking-wider text-xs">{t.partners.ecosystemHeaders.role}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {t.partners.ecosystemRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-semibold text-brand-blue whitespace-nowrap">
                        {row.partner}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {row.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Process Flow Chain */}
          <div className="lg:col-span-6 bg-gradient-to-br from-brand-blue to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange font-bold text-sm">
                02
              </div>
              <h3 className="text-lg font-display font-bold text-white">
                {t.partners.processTitle}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              {t.partners.processDesc}
            </p>

            <div className="space-y-3">
              {t.partners.processFlow.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-3 sm:p-3.5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-orange text-slate-950 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div className="flex-1 text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                    {step}
                  </div>
                  {index < t.partners.processFlow.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-slate-500 shrink-0 mt-1 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
