import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Calendar, Percent, TrendingUp, Clock, Shield,
  Zap, FileText, Scale, ArrowRight
} from 'lucide-react';
import { Translation } from '../translations';

interface PpaTermSheetProps { t: Translation; }

const ICONS = [Calendar, Percent, TrendingUp, Clock, Shield, Zap, FileText, Scale];

export default function PpaTermSheet({ t: _t }: PpaTermSheetProps) {
  const p = (_t as any).ppa as PpaTranslation;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  if (!p) return null;

  const terms = [
    { key: p.t1Key, val: p.t1Val, note: p.t1Note, color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'border-brand-orange/30' },
    { key: p.t2Key, val: p.t2Val, note: p.t2Note, color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30' },
    { key: p.t3Key, val: p.t3Val, note: p.t3Note, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { key: p.t4Key, val: p.t4Val, note: p.t4Note, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30' },
    { key: p.t5Key, val: p.t5Val, note: p.t5Note, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
    { key: p.t6Key, val: p.t6Val, note: p.t6Note, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
    { key: p.t7Key, val: p.t7Val, note: p.t7Note, color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/30' },
    { key: p.t8Key, val: p.t8Val, note: p.t8Note, color: 'text-slate-400', bg: 'bg-slate-700/30', border: 'border-slate-600/30' },
  ];

  return (
    <section ref={ref} id="ppa-terms" className="py-24 bg-white border-b border-slate-100" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-mono font-bold tracking-[0.2em] uppercase mb-5">
            <FileText className="w-3.5 h-3.5" />
            <span>{p.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-blue tracking-tight">{p.title}</h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xl mx-auto">{p.subtitle}</p>
        </motion.div>

        {/* Term Sheet Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {terms.map((term, idx) => {
            const Icon = ICONS[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.08 * idx }}
                className={`rounded-2xl border ${term.border} ${term.bg} p-5 flex flex-col gap-3`}
              >
                <div className={`w-9 h-9 rounded-xl ${term.bg} border ${term.border} ${term.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-[9px] font-mono font-extrabold uppercase tracking-[0.2em] ${term.color} mb-1`}>{term.key}</div>
                  <div className="font-display font-bold text-brand-blue text-base leading-tight mb-1.5">{term.val}</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{term.note}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-brand-orange shrink-0" />
            <p className="text-sm text-slate-400 leading-relaxed">
              <span className="text-white font-semibold">{p.stripTitle}</span>{' '}{p.stripDesc}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-600 shrink-0">
            <span>PPA No. US-PPA-01/26</span>
            <ArrowRight className="w-3 h-3" />
            <span>TIAC Arbitration</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export interface PpaTranslation {
  badge: string; title: string; subtitle: string;
  stripTitle: string; stripDesc: string;
  t1Key: string; t1Val: string; t1Note: string;
  t2Key: string; t2Val: string; t2Note: string;
  t3Key: string; t3Val: string; t3Note: string;
  t4Key: string; t4Val: string; t4Note: string;
  t5Key: string; t5Val: string; t5Note: string;
  t6Key: string; t6Val: string; t6Note: string;
  t7Key: string; t7Val: string; t7Note: string;
  t8Key: string; t8Val: string; t8Note: string;
}
