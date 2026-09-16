import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  FileSignature, Ruler, Truck, HardHat, Zap, Banknote,
  Clock, Calendar, ArrowRight, CheckCircle2
} from 'lucide-react';
import { Translation } from '../translations';

interface DeliveryTimelineProps {
  t: Translation;
}

export default function DeliveryTimeline({ t: _t }: DeliveryTimelineProps) {
  const d = (_t as any).delivery as DeliveryTranslation;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const milestones = [
    {
      day: d.m1Day,
      label: d.m1Label,
      desc: d.m1Desc,
      icon: <FileSignature className="w-5 h-5" />,
      color: 'text-brand-orange',
      bg: 'bg-brand-orange/10',
      border: 'border-brand-orange/30',
      dot: 'bg-brand-orange',
    },
    {
      day: d.m2Day,
      label: d.m2Label,
      desc: d.m2Desc,
      icon: <Ruler className="w-5 h-5" />,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/30',
      dot: 'bg-sky-400',
    },
    {
      day: d.m3Day,
      label: d.m3Label,
      desc: d.m3Desc,
      icon: <Truck className="w-5 h-5" />,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/30',
      dot: 'bg-violet-400',
    },
    {
      day: d.m4Day,
      label: d.m4Label,
      desc: d.m4Desc,
      icon: <HardHat className="w-5 h-5" />,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      dot: 'bg-amber-400',
    },
    {
      day: d.m5Day,
      label: d.m5Label,
      desc: d.m5Desc,
      icon: <Zap className="w-5 h-5" />,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      dot: 'bg-emerald-400',
    },
    {
      day: d.m6Day,
      label: d.m6Label,
      desc: d.m6Desc,
      icon: <Banknote className="w-5 h-5" />,
      color: 'text-emerald-300',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400/30',
      dot: 'bg-emerald-300',
    },
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

        {/* Desktop horizontal timeline — creative connector */}
        <div className="hidden lg:block relative mb-16">

          {/* Track background — dashed rail */}
          <div className="absolute top-[27px] left-[calc(100%/12)] right-[calc(100%/12)] h-px z-0">
            {/* Base dashed track */}
            <div className="w-full h-full border-t-2 border-dashed border-slate-200" />
            {/* Animated glow fill on top */}
            <motion.div
              initial={{ width: '0%' }}
              animate={isInView ? { width: '100%' } : {}}
              transition={{ duration: 1.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute top-0 left-0 h-full"
              style={{
                background: 'linear-gradient(90deg, #f97316 0%, #fb923c 30%, #a78bfa 60%, #34d399 100%)',
                height: '2px',
                boxShadow: '0 0 8px 2px rgba(249,115,22,0.4)',
              }}
            />
          </div>

          {/* Step number badges — float above connectors */}
          <div className="absolute top-[12px] left-[calc(100%/12)] right-[calc(100%/12)] flex justify-between z-0 pointer-events-none">
            {[1, 2, 3, 4, 5].map((n) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + n * 0.18 }}
                className="w-[18px] h-[18px] rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm"
              >
                <span className="text-[7px] font-mono font-black text-slate-400">{n}</span>
              </motion.div>
            ))}
          </div>

          {/* Milestone nodes */}
          <div className="relative z-10 grid grid-cols-6 gap-3">
            {milestones.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.14 }}
                className="flex flex-col items-center group"
              >
                {/* Icon node with ring pulse */}
                <div className="relative mb-4">
                  <div className={`absolute inset-0 rounded-2xl ${m.bg} scale-150 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300`} />
                  <div className={`relative w-14 h-14 rounded-2xl ${m.bg} border-2 ${m.border} ${m.color} flex items-center justify-center shadow-sm`}>
                    {m.icon}
                  </div>
                  {/* Connector dot at bottom center */}
                  <div className={`absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full ${m.dot} border-2 border-white shadow-sm`} />
                </div>
                {/* Day badge */}
                <span className={`text-[10px] font-mono font-extrabold uppercase tracking-wider ${m.color} mb-1 mt-1`}>
                  {m.day}
                </span>
                {/* Label */}
                <span className="font-display font-bold text-brand-blue text-xs text-center leading-tight mb-1.5">
                  {m.label}
                </span>
                {/* Desc */}
                <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                  {m.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden space-y-0 mb-12 relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200">
            <motion.div
              initial={{ height: '0%' }}
              animate={isInView ? { height: '100%' } : {}}
              transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
              className="w-full bg-gradient-to-b from-brand-orange to-emerald-400"
            />
          </div>
          {milestones.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 * idx }}
              className="flex gap-4 pl-2 pb-8 last:pb-0"
            >
              <div className={`relative z-10 w-10 h-10 rounded-xl ${m.bg} border ${m.border} ${m.color} flex items-center justify-center shrink-0`}>
                {m.icon}
              </div>
              <div className="pt-1">
                <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${m.color} block`}>{m.day}</span>
                <span className="font-display font-bold text-brand-blue text-sm block">{m.label}</span>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Then 12 Years banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
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
              {[
                { text: d.thenPoint1 },
                { text: d.thenPoint2 },
                { text: d.thenPoint3 },
              ].map((p, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed">{p.text}</span>
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
  badge: string;
  title: string;
  subtitle: string;
  m1Day: string; m1Label: string; m1Desc: string;
  m2Day: string; m2Label: string; m2Desc: string;
  m3Day: string; m3Label: string; m3Desc: string;
  m4Day: string; m4Label: string; m4Desc: string;
  m5Day: string; m5Label: string; m5Desc: string;
  m6Day: string; m6Label: string; m6Desc: string;
  thenBadge: string;
  thenTitle: string;
  thenPoint1: string;
  thenPoint2: string;
  thenPoint3: string;
}
