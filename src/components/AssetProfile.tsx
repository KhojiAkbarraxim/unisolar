import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { MapPin, Cpu, Zap, Wrench, Sun, BarChart3, Layers } from 'lucide-react';
import { Translation } from '../translations';

interface AssetProfileProps { t: Translation; }

export default function AssetProfile({ t: _t }: AssetProfileProps) {
  const a = (_t as any).asset as AssetTranslation;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  if (!a) return null;

  const specs = [
    { icon: <Zap className="w-4 h-4" />, label: a.s1Label, val: a.s1Val, sub: a.s1Sub },
    { icon: <Cpu className="w-4 h-4" />, label: a.s2Label, val: a.s2Val, sub: a.s2Sub },
    { icon: <Layers className="w-4 h-4" />, label: a.s3Label, val: a.s3Val, sub: a.s3Sub },
    { icon: <Sun className="w-4 h-4" />, label: a.s4Label, val: a.s4Val, sub: a.s4Sub },
    { icon: <BarChart3 className="w-4 h-4" />, label: a.s5Label, val: a.s5Val, sub: a.s5Sub },
    { icon: <Wrench className="w-4 h-4" />, label: a.s6Label, val: a.s6Val, sub: a.s6Sub },
  ];

  return (
    <section ref={ref} id="asset-profile" className="py-24 bg-slate-950 border-b border-slate-900 overflow-hidden" style={{ contentVisibility: 'auto' }}>
      {/* grid bg */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold tracking-[0.2em] uppercase mb-5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{a.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">{a.title}</h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-xl mx-auto">{a.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Left — location + operator */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="space-y-4">

            {/* Location card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/30 text-brand-orange flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] font-mono font-bold text-brand-orange uppercase tracking-widest mb-1">{a.locationBadge}</div>
                  <div className="font-display font-bold text-white text-lg">{a.locationName}</div>
                  <div className="text-sm text-slate-400">{a.locationSub}</div>
                </div>
              </div>

              {/* Stylized "map" placeholder */}
              <div className="rounded-xl bg-slate-800/60 border border-slate-700/50 h-36 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#f97316_0%,transparent_60%)] opacity-10" />
                <div className="text-center z-10">
                  <div className="w-3 h-3 rounded-full bg-brand-orange mx-auto mb-2 shadow-lg shadow-brand-orange/50 animate-ping" />
                  <div className="text-xs font-mono text-slate-400">{a.coords}</div>
                  <div className="text-[10px] font-mono text-slate-600 mt-1">{a.locationRegion}</div>
                </div>
              </div>
            </div>

            {/* Off-taker card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="text-[9px] font-mono font-bold text-sky-400 uppercase tracking-widest mb-3">{a.offtakerBadge}</div>
              <div className="font-display font-bold text-white text-base mb-1">{a.offtakerName}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{a.offtakerDesc}</p>
            </div>
          </motion.div>

          {/* Right — spec grid */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.25 }} className="grid grid-cols-2 gap-3">
            {specs.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center mb-3">
                  {s.icon}
                </div>
                <div className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-0.5">{s.label}</div>
                <div className="font-display font-bold text-white text-sm leading-tight">{s.val}</div>
                <div className="text-[10px] text-slate-600 mt-0.5">{s.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom warranties bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5"
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider shrink-0">{a.warrantyBadge}</span>
            {[a.w1, a.w2, a.w3, a.w4].map((w, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block shrink-0" />
                {w}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export interface AssetTranslation {
  badge: string; title: string; subtitle: string;
  locationBadge: string; locationName: string; locationSub: string;
  coords: string; locationRegion: string;
  offtakerBadge: string; offtakerName: string; offtakerDesc: string;
  s1Label: string; s1Val: string; s1Sub: string;
  s2Label: string; s2Val: string; s2Sub: string;
  s3Label: string; s3Val: string; s3Sub: string;
  s4Label: string; s4Val: string; s4Sub: string;
  s5Label: string; s5Val: string; s5Sub: string;
  s6Label: string; s6Val: string; s6Sub: string;
  warrantyBadge: string; w1: string; w2: string; w3: string; w4: string;
}
