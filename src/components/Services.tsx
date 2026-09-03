import React from 'react';
import { Cpu, ShieldCheck, Sun, ArrowRight } from 'lucide-react';
import { Translation } from '../translations';

interface ServicesProps {
  t: Translation;
  onConsultationClick: () => void;
}

export default function Services({ t, onConsultationClick }: ServicesProps) {
  const services = [
    {
      id: 'epc',
      title: t.services.epcTitle,
      desc: t.services.epcDesc,
      features: t.services.epcFeatures
    },
    {
      id: 'om',
      title: t.services.omTitle,
      desc: t.services.omDesc,
      features: t.services.omFeatures
    },
    {
      id: 'carports',
      title: t.services.carportsTitle,
      desc: t.services.carportsDesc,
      features: t.services.carportsFeatures
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 border-b border-slate-100" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="services-heading">
          <h2 className="text-sm font-mono text-brand-orange font-bold uppercase tracking-[0.25em] mb-2">{t.services.badge}</h2>
          <p className="text-3xl sm:text-4xl font-display font-bold text-brand-blue tracking-tight">
            {t.services.title}
          </p>
          <div className="flex justify-center gap-1.5 mt-4">
            <div className="w-2.5 h-2.5 bg-brand-orange" />
            <div className="w-10 h-2.5 bg-slate-900" />
            <div className="w-2.5 h-2.5 bg-brand-orange" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16" id="services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-brand-orange transition-colors"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 border border-slate-100 flex items-center justify-center text-brand-blue">
                  {index === 0 && <Cpu className="w-6 h-6 text-brand-orange" />}
                  {index === 1 && <ShieldCheck className="w-6 h-6 text-emerald-500" />}
                  {index === 2 && <Sun className="w-6 h-6 text-amber-500" />}
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold text-brand-blue tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h4 className="text-xs font-mono font-bold text-brand-blue uppercase tracking-wider mb-3">{t.services.scopeTitle}</h4>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-brand-orange text-sm leading-none mt-0.5">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto border border-slate-800" id="services-callout">
          <h3 className="text-2xl font-display font-bold mb-4">{t.services.calloutTitle}</h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-6">
            {t.services.calloutDesc}
          </p>
          <button
            onClick={onConsultationClick}
            className="inline-flex items-center space-x-2 bg-brand-orange hover:bg-brand-orange-light text-slate-950 font-bold px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-brand-orange/10"
            id="services-cta-btn"
          >
            <span>{t.services.calloutBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
