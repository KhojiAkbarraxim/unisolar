import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Landmark, ShieldCheck, TrendingUp, FileCheck, ArrowUpRight, AlertCircle } from 'lucide-react';
import { Translation } from '../translations';

interface TaxRegulatoryProps { t: Translation; }

export default function TaxRegulatory({ t: _t }: TaxRegulatoryProps) {
  const tx = (_t as any).taxReg as TaxRegTranslation;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  if (!tx) return null;

  const conservativeItems = [
    { icon: <Landmark className="w-4 h-4" />, title: tx.c1Title, desc: tx.c1Desc },
    { icon: <ShieldCheck className="w-4 h-4" />, title: tx.c2Title, desc: tx.c2Desc },
    { icon: <FileCheck className="w-4 h-4" />, title: tx.c3Title, desc: tx.c3Desc },
  ];

  const upsideItems = [
    { title: tx.u1Title, desc: tx.u1Desc },
    { title: tx.u2Title, desc: tx.u2Desc },
    { title: tx.u3Title, desc: tx.u3Desc },
    { title: tx.u4Title, desc: tx.u4Desc },
  ];

  return (
    <section ref={ref} id="tax-regulatory" className="py-24 bg-white border-b border-slate-100" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-slate-800/10 border border-slate-300 text-slate-600 text-xs font-mono font-bold tracking-[0.2em] uppercase mb-5">
            <Landmark className="w-3.5 h-3.5" />
            <span>{tx.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-blue tracking-tight">{tx.title}</h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xl mx-auto">{tx.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          {/* Conservative model */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.15 }} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 text-white flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">{tx.conservativeBadge}</div>
                <div className="font-display font-bold text-brand-blue text-base">{tx.conservativeTitle}</div>
              </div>
            </div>
            <div className="space-y-4">
              {conservativeItems.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-display font-bold text-brand-blue text-sm">{item.title}</div>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Potential upside */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.25 }} className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 border border-emerald-500 text-white flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[9px] font-mono font-bold text-emerald-600 uppercase tracking-widest">{tx.upsideBadge}</div>
                <div className="font-display font-bold text-emerald-800 text-base">{tx.upsideTitle}</div>
              </div>
            </div>
            <div className="space-y-3.5">
              {upsideItems.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <ArrowUpRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-display font-bold text-emerald-800 text-sm">{item.title}</div>
                    <p className="text-xs text-emerald-700 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Legal rights footer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="rounded-2xl border border-slate-200 bg-slate-900 p-5"
        >
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
            <div className="text-[10px] font-mono text-brand-orange font-bold uppercase tracking-widest">{tx.legalBadge}</div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: tx.l1Title, desc: tx.l1Desc },
              { title: tx.l2Title, desc: tx.l2Desc },
              { title: tx.l3Title, desc: tx.l3Desc },
            ].map((l, i) => (
              <div key={i}>
                <div className="font-display font-bold text-white text-sm mb-1">{l.title}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export interface TaxRegTranslation {
  badge: string; title: string; subtitle: string;
  conservativeBadge: string; conservativeTitle: string;
  c1Title: string; c1Desc: string;
  c2Title: string; c2Desc: string;
  c3Title: string; c3Desc: string;
  upsideBadge: string; upsideTitle: string;
  u1Title: string; u1Desc: string;
  u2Title: string; u2Desc: string;
  u3Title: string; u3Desc: string;
  u4Title: string; u4Desc: string;
  legalBadge: string;
  l1Title: string; l1Desc: string;
  l2Title: string; l2Desc: string;
  l3Title: string; l3Desc: string;
}
