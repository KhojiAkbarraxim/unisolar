import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Banknote, TrendingUp, ShieldCheck, Users, ArrowRight, MessageSquare } from 'lucide-react';
import { Translation } from '../translations';

interface TheCaseBlockProps {
  t: Translation;
  onConsultationClick: () => void;
}

const ICONS = [Banknote, TrendingUp, ShieldCheck, Users];

export default function TheCaseBlock({ t: _t, onConsultationClick }: TheCaseBlockProps) {
  const c = (_t as any).theCase as TheCaseTranslation;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  if (!c) return null;

  const args = [
    { title: c.arg1Title, desc: c.arg1Desc, icon: ICONS[0] },
    { title: c.arg2Title, desc: c.arg2Desc, icon: ICONS[1] },
    { title: c.arg3Title, desc: c.arg3Desc, icon: ICONS[2] },
    { title: c.arg4Title, desc: c.arg4Desc, icon: ICONS[3] },
  ];

  return (
    <section
      ref={ref}
      id="the-case"
      className="py-24 bg-white border-b border-slate-100 relative overflow-hidden"
      style={{ contentVisibility: 'auto' }}
    >
      {/* Subtle top gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold tracking-[0.2em] uppercase mb-5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{c.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-blue tracking-tight">
            {c.title}
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            {c.subtitle}
          </p>
        </motion.div>

        {/* 4 argument cards */}
        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {args.map((arg, idx) => {
            const Icon = arg.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                className="group rounded-2xl border border-slate-200/80 bg-slate-50 p-6 hover:border-brand-orange/40 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0 group-hover:bg-brand-orange/15 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-brand-blue text-base mb-1.5">
                      {arg.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{arg.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="text-xs font-mono text-brand-orange font-bold uppercase tracking-widest mb-3">{c.ctaBadge}</div>
              <h3 className="text-2xl font-display font-bold text-white mb-3">{c.ctaTitle}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{c.ctaDesc}</p>

              <div className="mt-5 flex flex-wrap gap-3 text-[11px] font-mono text-slate-500">
                <span>UNISOLAR LLC</span>
                <span className="text-slate-700">·</span>
                <span>{c.ctaStir}</span>
                <span className="text-slate-700">·</span>
                <span>Khorezm, Uzbekistan</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              <button
                id="the-case-cta-primary"
                onClick={onConsultationClick}
                className="flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-light text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg shadow-brand-orange/20 transition-all hover:-translate-y-0.5 cursor-pointer text-sm whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{c.ctaBtn}</span>
              </button>
              <button
                id="the-case-cta-secondary"
                onClick={onConsultationClick}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-medium px-8 py-3.5 rounded-xl transition-all cursor-pointer text-sm whitespace-nowrap"
              >
                <ArrowRight className="w-4 h-4" />
                <span>{c.ctaBtnSecondary}</span>
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export interface TheCaseTranslation {
  badge: string; title: string; subtitle: string;
  arg1Title: string; arg1Desc: string;
  arg2Title: string; arg2Desc: string;
  arg3Title: string; arg3Desc: string;
  arg4Title: string; arg4Desc: string;
  ctaBadge: string; ctaTitle: string; ctaDesc: string;
  ctaStir: string; ctaBtn: string; ctaBtnSecondary: string;
}
