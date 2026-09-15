import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { TrendingUp, Landmark, ArrowUpRight, Info } from 'lucide-react';
import { Translation } from '../translations';

interface ReturnVisualizerProps {
  t: Translation;
}

// 12 years of relative yield data (no actual UZS numbers, just % growth pattern from PPT)
// Year 1 = base 100%, grows each year by tariff escalation + compounding
const BASE_YIELDS = [27.2, 29.8, 32.6, 35.6, 39.0, 42.7, 46.7, 51.2, 56.0, 61.3, 67.1, 73.4];
const BANK_DEPOSIT = 19; // flat ~19% bank deposit benchmark

export default function ReturnVisualizer({ t: _t }: ReturnVisualizerProps) {
  const r = (_t as any).returns as ReturnsTranslation;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const maxYield = Math.max(...BASE_YIELDS);

  return (
    <section
      ref={ref}
      id="return-visualizer"
      className="py-24 bg-slate-950 border-b border-slate-900 overflow-hidden"
      style={{ contentVisibility: 'auto' }}
    >
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-64 bg-brand-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-[0.2em] uppercase mb-5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{r.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            {r.title}
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-xl mx-auto">
            {r.subtitle}
          </p>
        </motion.div>

        {/* Top KPI cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid sm:grid-cols-3 gap-4 mb-12"
        >
          {[
            {
              icon: <TrendingUp className="w-5 h-5" />,
              color: 'text-brand-orange',
              bg: 'bg-brand-orange/10',
              border: 'border-brand-orange/30',
              label: r.kpi1Label,
              value: r.kpi1Value,
              note: r.kpi1Note,
            },
            {
              icon: <ArrowUpRight className="w-5 h-5" />,
              color: 'text-emerald-400',
              bg: 'bg-emerald-500/10',
              border: 'border-emerald-500/30',
              label: r.kpi2Label,
              value: r.kpi2Value,
              note: r.kpi2Note,
            },
            {
              icon: <Landmark className="w-5 h-5" />,
              color: 'text-sky-400',
              bg: 'bg-sky-500/10',
              border: 'border-sky-500/30',
              label: r.kpi3Label,
              value: r.kpi3Value,
              note: r.kpi3Note,
            },
          ].map((kpi, i) => (
            <div key={i} className={`rounded-2xl border ${kpi.border} ${kpi.bg} p-5`}>
              <div className={`w-9 h-9 rounded-xl ${kpi.bg} border ${kpi.border} ${kpi.color} flex items-center justify-center mb-3`}>
                {kpi.icon}
              </div>
              <div className={`text-2xl sm:text-3xl font-mono font-extrabold ${kpi.color} mb-1`}>{kpi.value}</div>
              <div className="font-display font-bold text-white text-sm mb-1">{kpi.label}</div>
              <p className="text-[11px] text-slate-400">{kpi.note}</p>
            </div>
          ))}
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs font-mono text-brand-orange font-bold uppercase tracking-wider mb-1">{r.chartBadge}</div>
              <div className="font-display font-bold text-white text-base">{r.chartTitle}</div>
            </div>
            <div className="flex gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 rounded-full bg-brand-orange inline-block" />
                <span className="text-slate-400">{r.legendSolar}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 rounded-full bg-slate-600 inline-block" />
                <span className="text-slate-500">{r.legendBank}</span>
              </span>
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex items-end gap-1.5 sm:gap-2 h-52 relative">
            {/* Bank deposit flat line reference */}
            <div
              className="absolute left-0 right-0 border-t border-dashed border-slate-600/60 z-10 pointer-events-none"
              style={{ bottom: `${(BANK_DEPOSIT / maxYield) * 100}%` }}
            >
              <span className="absolute right-0 -top-4 text-[10px] font-mono text-slate-500 whitespace-nowrap">
                {r.bankLine} ~{BANK_DEPOSIT}%
              </span>
            </div>

            {BASE_YIELDS.map((yield_, idx) => {
              const heightPct = (yield_ / maxYield) * 100;
              const isHovered = hoveredYear === idx;
              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer group"
                  onMouseEnter={() => setHoveredYear(idx)}
                  onMouseLeave={() => setHoveredYear(null)}
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute -translate-y-full mb-2 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white whitespace-nowrap z-20 shadow-xl">
                      Y{idx + 1} · <span className="text-brand-orange font-bold">{yield_}%</span> {r.tooltipLabel}
                    </div>
                  )}
                  {/* Bar */}
                  <div className="w-full flex items-end" style={{ height: '100%' }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={isInView ? { height: `${heightPct}%` } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + idx * 0.07, ease: 'easeOut' }}
                      className={`w-full rounded-t-lg transition-all ${
                        isHovered
                          ? 'bg-brand-orange shadow-lg shadow-brand-orange/20'
                          : 'bg-brand-orange/40 group-hover:bg-brand-orange/60'
                      }`}
                    />
                  </div>
                  {/* Year label */}
                  <span className="text-[9px] font-mono text-slate-600 mt-1">Y{idx + 1}</span>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-600 font-mono mt-5 text-center">{r.chartNote}</p>
        </motion.div>

        {/* Payback + aligned note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-sm mb-1">{r.paybackTitle}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{r.paybackDesc}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/30 text-brand-orange flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-sm mb-1">{r.escalationTitle}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{r.escalationDesc}</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export interface ReturnsTranslation {
  badge: string;
  title: string;
  subtitle: string;
  kpi1Label: string; kpi1Value: string; kpi1Note: string;
  kpi2Label: string; kpi2Value: string; kpi2Note: string;
  kpi3Label: string; kpi3Value: string; kpi3Note: string;
  chartBadge: string;
  chartTitle: string;
  legendSolar: string;
  legendBank: string;
  bankLine: string;
  tooltipLabel: string;
  chartNote: string;
  paybackTitle: string;
  paybackDesc: string;
  escalationTitle: string;
  escalationDesc: string;
}
