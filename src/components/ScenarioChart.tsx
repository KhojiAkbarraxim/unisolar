import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { BarChart3, TrendingDown, ChevronDown } from 'lucide-react';
import { Translation } from '../translations';

interface ScenarioChartProps { t: Translation; }

// Relative output index values — not real kWh (no exact numbers shown)
// Base = EPC-guaranteed, High = upside case, degraded from year 1
const YEARS = [1,2,3,4,5,6,7,8,9,10,11,12];
// Base case: starts at 100, degrades 0.5%/yr
const BASE = YEARS.map(y => parseFloat((100 * Math.pow(0.995, y - 1)).toFixed(2)));
// High case: starts at 107.1, degrades 0.5%/yr
const HIGH = YEARS.map(y => parseFloat((107.1 * Math.pow(0.995, y - 1)).toFixed(2)));
const MAX_VAL = Math.max(...HIGH);

export default function ScenarioChart({ t: _t }: ScenarioChartProps) {
  const s = (_t as any).scenario as ScenarioTranslation;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [activeScenario, setActiveScenario] = useState<'both' | 'base' | 'high'>('both');
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  if (!s) return null;

  const showBase = activeScenario === 'both' || activeScenario === 'base';
  const showHigh = activeScenario === 'both' || activeScenario === 'high';

  return (
    <section ref={ref} id="scenario-chart" className="py-24 bg-slate-950 border-b border-slate-900 overflow-hidden" style={{ contentVisibility: 'auto' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#f97316_0%,transparent_50%)] opacity-[0.03] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold tracking-[0.2em] uppercase mb-5">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{s.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">{s.title}</h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-xl mx-auto">{s.subtitle}</p>
        </motion.div>

        {/* Scenario toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
            {(['both', 'base', 'high'] as const).map((sc) => (
              <button
                key={sc}
                onClick={() => setActiveScenario(sc)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeScenario === sc
                    ? 'bg-brand-orange text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sc === 'both' ? s.toggleBoth : sc === 'base' ? s.toggleBase : s.toggleHigh}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 mb-6"
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <div className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider mb-1">{s.chartBadge}</div>
              <div className="font-display font-bold text-white text-base">{s.chartTitle}</div>
            </div>
            <div className="flex gap-4 text-[11px] font-mono">
              <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-sky-400 inline-block" /><span className="text-slate-400">{s.legendBase}</span></span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-brand-orange inline-block" /><span className="text-slate-400">{s.legendHigh}</span></span>
            </div>
          </div>

          {/* Grouped bars */}
          <div className="flex items-end gap-1 sm:gap-2 h-56 relative">
            {YEARS.map((yr, idx) => {
              const baseH = (BASE[idx] / MAX_VAL) * 100;
              const highH = (HIGH[idx] / MAX_VAL) * 100;
              const isHov = hoveredYear === idx;
              return (
                <div
                  key={yr}
                  className="flex-1 flex flex-col items-center gap-1 cursor-pointer"
                  onMouseEnter={() => setHoveredYear(idx)}
                  onMouseLeave={() => setHoveredYear(null)}
                >
                  {/* Tooltip */}
                  {isHov && (
                    <div className="absolute bottom-full mb-2 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-[10px] font-mono text-white whitespace-nowrap z-20 shadow-xl -translate-x-1/2 left-1/2 pointer-events-none">
                      <div>Y{yr} {s.tooltipBase}: <span className="text-sky-400">{BASE[idx].toFixed(1)}</span></div>
                      <div>Y{yr} {s.tooltipHigh}: <span className="text-brand-orange">{HIGH[idx].toFixed(1)}</span></div>
                    </div>
                  )}
                  <div className="w-full flex items-end justify-center gap-0.5" style={{ height: '100%' }}>
                    {/* Base bar */}
                    {showBase && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={isInView ? { height: `${baseH}%` } : {}}
                        transition={{ duration: 0.7, delay: 0.35 + idx * 0.06, ease: 'easeOut' }}
                        className={`flex-1 rounded-t-md transition-opacity ${isHov ? 'bg-sky-400' : 'bg-sky-500/50'}`}
                      />
                    )}
                    {/* High bar */}
                    {showHigh && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={isInView ? { height: `${highH}%` } : {}}
                        transition={{ duration: 0.7, delay: 0.4 + idx * 0.06, ease: 'easeOut' }}
                        className={`flex-1 rounded-t-md transition-opacity ${isHov ? 'bg-brand-orange' : 'bg-brand-orange/40'}`}
                      />
                    )}
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-mono text-slate-600">Y{yr}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 mt-4 text-[10px] font-mono text-slate-600">
            <TrendingDown className="w-3 h-3 text-slate-600" />
            <span>{s.degradNote}</span>
          </div>
          <p className="text-[11px] text-slate-600 font-mono mt-2">{s.chartNote}</p>
        </motion.div>

        {/* Two scenario cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              badge: s.baseBadge, title: s.baseTitle, desc: s.baseDesc,
              color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20',
              pillBg: 'bg-sky-500/20'
            },
            {
              badge: s.highBadge, title: s.highTitle, desc: s.highDesc,
              color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'border-brand-orange/20',
              pillBg: 'bg-brand-orange/20'
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.65 + i * 0.1 }}
              className={`rounded-2xl border ${card.border} ${card.bg} p-5`}
            >
              <div className={`inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest ${card.color} ${card.pillBg} px-2.5 py-1 rounded-full mb-3`}>
                <span>{card.badge}</span>
              </div>
              <div className="font-display font-bold text-white text-sm mb-1.5">{card.title}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export interface ScenarioTranslation {
  badge: string; title: string; subtitle: string;
  toggleBoth: string; toggleBase: string; toggleHigh: string;
  chartBadge: string; chartTitle: string;
  legendBase: string; legendHigh: string;
  tooltipBase: string; tooltipHigh: string;
  degradNote: string; chartNote: string;
  baseBadge: string; baseTitle: string; baseDesc: string;
  highBadge: string; highTitle: string; highDesc: string;
}
