import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  FileSignature, Ruler, Truck, HardHat, Zap, Banknote,
  Clock, Calendar, ChevronRight, CheckCircle2
} from 'lucide-react';
import { Translation } from '../translations';

interface DeliveryTimelineProps {
  t: Translation;
}

export default function DeliveryTimeline({ t: _t }: DeliveryTimelineProps) {
  const d = (_t as any).delivery as DeliveryTranslation;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  if (!d) return null;

  const milestones = [
    { day: d.m1Day, label: d.m1Label, desc: d.m1Desc, icon: <FileSignature className="w-5 h-5" />, accent: '#f97316', step: '01' },
    { day: d.m2Day, label: d.m2Label, desc: d.m2Desc, icon: <Ruler className="w-5 h-5" />,          accent: '#38bdf8', step: '02' },
    { day: d.m3Day, label: d.m3Label, desc: d.m3Desc, icon: <Truck className="w-5 h-5" />,          accent: '#a78bfa', step: '03' },
    { day: d.m4Day, label: d.m4Label, desc: d.m4Desc, icon: <HardHat className="w-5 h-5" />,        accent: '#fbbf24', step: '04' },
    { day: d.m5Day, label: d.m5Label, desc: d.m5Desc, icon: <Zap className="w-5 h-5" />,            accent: '#34d399', step: '05' },
    { day: d.m6Day, label: d.m6Label, desc: d.m6Desc, icon: <Banknote className="w-5 h-5" />,       accent: '#86efac', step: '06' },
  ];

  return (
    <section
      ref={ref}
      id="delivery-timeline"
      className="py-24 bg-white border-b border-slate-100 overflow-hidden"
      style={{ contentVisibility: 'auto' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold tracking-[0.2em] uppercase mb-5">
            <Clock className="w-3.5 h-3.5" />
            <span>{d.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-blue tracking-tight">
            {d.title}
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xl mx-auto">
            {d.subtitle}
          </p>
        </motion.div>

        {/* ── Desktop: Step cards with chevron connectors ── */}
        <div className="hidden lg:flex items-stretch gap-0 mb-16">
          {milestones.map((m, idx) => (
            <div key={idx} className="flex items-stretch flex-1">
              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.12 }}
                className="flex-1 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:shadow-md hover:border-slate-300 transition-all duration-300 p-5 flex flex-col gap-3"
              >
                {/* Top row: step number + day badge */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-mono font-black tracking-widest"
                    style={{ color: m.accent }}
                  >
                    {m.step}
                  </span>
                  <span
                    className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full"
                    style={{ background: `${m.accent}18`, color: m.accent }}
                  >
                    {m.day}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${m.accent}15`, color: m.accent }}
                >
                  {m.icon}
                </div>

                {/* Label */}
                <div className="font-display font-bold text-brand-blue text-sm leading-tight">
                  {m.label}
                </div>

                {/* Desc */}
                <p className="text-[11px] text-slate-500 leading-relaxed flex-1">
                  {m.desc}
                </p>
              </motion.div>

              {/* Chevron connector — between cards, not after last */}
              {idx < milestones.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + idx * 0.12 }}
                  className="flex items-center justify-center w-6 shrink-0"
                >
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* ── Mobile: Vertical numbered list ── */}
        <div className="lg:hidden space-y-3 mb-12">
          {milestones.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              {/* Step icon */}
              <div className="shrink-0 flex flex-col items-center gap-1">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${m.accent}18`, color: m.accent }}
                >
                  {m.icon}
                </div>
                <span className="text-[9px] font-mono font-black" style={{ color: m.accent }}>{m.step}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full"
                    style={{ background: `${m.accent}18`, color: m.accent }}
                  >
                    {m.day}
                  </span>
                </div>
                <div className="font-display font-bold text-brand-blue text-sm">{m.label}</div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Then 12 Years banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-10"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 text-brand-orange flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-brand-orange font-bold uppercase tracking-widest mb-1">{d.thenBadge}</div>
                <div className="font-display font-bold text-white text-xl">{d.thenTitle}</div>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              {[d.thenPoint1, d.thenPoint2, d.thenPoint3].map((pt, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed">{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export interface DeliveryTranslation {
  badge: string; title: string; subtitle: string;
  m1Day: string; m1Label: string; m1Desc: string;
  m2Day: string; m2Label: string; m2Desc: string;
  m3Day: string; m3Label: string; m3Desc: string;
  m4Day: string; m4Label: string; m4Desc: string;
  m5Day: string; m5Label: string; m5Desc: string;
  m6Day: string; m6Label: string; m6Desc: string;
  thenBadge: string; thenTitle: string;
  thenPoint1: string; thenPoint2: string; thenPoint3: string;
}
