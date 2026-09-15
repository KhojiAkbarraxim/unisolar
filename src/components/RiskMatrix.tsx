import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import {
  ShieldCheck, HardHat, Wrench, Zap, AlertTriangle,
  Scale, Ban, RefreshCw, ChevronDown
} from 'lucide-react';
import { Translation } from '../translations';

interface RiskMatrixProps {
  t: Translation;
}

const ICONS = [HardHat, Wrench, Zap, ShieldCheck, Ban, RefreshCw, AlertTriangle, Scale];

export default function RiskMatrix({ t: _t }: RiskMatrixProps) {
  const r = (_t as any).riskMatrix as RiskMatrixTranslation;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  if (!r) return null;

  const rows = [
    { risk: r.r1Risk, owner: r.r1Owner, ownerType: 'epc', mitigation: r.r1Mit },
    { risk: r.r2Risk, owner: r.r2Owner, ownerType: 'epc', mitigation: r.r2Mit },
    { risk: r.r3Risk, owner: r.r3Owner, ownerType: 'epc', mitigation: r.r3Mit },
    { risk: r.r4Risk, owner: r.r4Owner, ownerType: 'unisolar', mitigation: r.r4Mit },
    { risk: r.r5Risk, owner: r.r5Owner, ownerType: 'offtaker', mitigation: r.r5Mit },
    { risk: r.r6Risk, owner: r.r6Owner, ownerType: 'offtaker', mitigation: r.r6Mit },
    { risk: r.r7Risk, owner: r.r7Owner, ownerType: 'shared', mitigation: r.r7Mit },
    { risk: r.r8Risk, owner: r.r8Owner, ownerType: 'investor', mitigation: r.r8Mit },
  ];

  const ownerStyles: Record<string, { bg: string; text: string; border: string; dot: string }> = {
    epc:      { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/30', dot: 'bg-violet-400' },
    unisolar: { bg: 'bg-brand-orange/10', text: 'text-brand-orange', border: 'border-brand-orange/30', dot: 'bg-brand-orange' },
    offtaker: { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/30', dot: 'bg-sky-400' },
    shared:   { bg: 'bg-slate-700/30', text: 'text-slate-400', border: 'border-slate-600/30', dot: 'bg-slate-500' },
    investor: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', dot: 'bg-amber-400' },
  };

  return (
    <section
      ref={ref}
      id="risk-matrix"
      className="py-24 bg-slate-950 border-b border-slate-900"
      style={{ contentVisibility: 'auto' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-mono font-bold tracking-[0.2em] uppercase mb-5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{r.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            {r.title}
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-xl mx-auto">
            {r.subtitle}
          </p>

          {/* Owner legend */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {([
              ['epc', r.legendEpc],
              ['unisolar', r.legendUnisolar],
              ['offtaker', r.legendOfftaker],
              ['shared', r.legendShared],
              ['investor', r.legendInvestor],
            ] as [string, string][]).map(([key, label]) => {
              const s = ownerStyles[key];
              return (
                <span key={key} className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${s.bg} ${s.text} border ${s.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                  {label}
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* Risk rows */}
        <div className="space-y-2">
          {rows.map((row, idx) => {
            const Icon = ICONS[idx];
            const s = ownerStyles[row.ownerType];
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className={`w-full text-left rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden
                    ${isOpen ? `${s.bg} ${s.border}` : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}
                  `}
                >
                  {/* Row header */}
                  <div className="flex items-center gap-4 p-4 sm:p-5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${s.bg} border ${s.border} ${s.text}`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="font-display font-bold text-white text-sm">
                        {row.risk}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shrink-0 ${s.bg} ${s.text} border ${s.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        {row.owner}
                      </span>
                    </div>

                    <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Expandable mitigation */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-slate-800/50">
                          <div className="flex items-start gap-2.5">
                            <ShieldCheck className={`w-4 h-4 shrink-0 mt-0.5 ${s.text}`} />
                            <p className="text-xs text-slate-300 leading-relaxed">{row.mitigation}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-[11px] font-mono text-slate-600 mt-8"
        >
          {r.footnote}
        </motion.p>
      </div>
    </section>
  );
}

export interface RiskMatrixTranslation {
  badge: string; title: string; subtitle: string; footnote: string;
  legendEpc: string; legendUnisolar: string; legendOfftaker: string;
  legendShared: string; legendInvestor: string;
  r1Risk: string; r1Owner: string; r1Mit: string;
  r2Risk: string; r2Owner: string; r2Mit: string;
  r3Risk: string; r3Owner: string; r3Mit: string;
  r4Risk: string; r4Owner: string; r4Mit: string;
  r5Risk: string; r5Owner: string; r5Mit: string;
  r6Risk: string; r6Owner: string; r6Mit: string;
  r7Risk: string; r7Owner: string; r7Mit: string;
  r8Risk: string; r8Owner: string; r8Mit: string;
}
