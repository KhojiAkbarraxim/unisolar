import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Zap, Building2, TrendingUp, Banknote, ArrowRight, Info, ChevronDown } from 'lucide-react';
import { Translation } from '../translations';

interface MechanismFlowProps {
  t: Translation;
}

export default function MechanismFlow({ t: _t }: MechanismFlowProps) {
  const m = (_t as any).mechanism as MechanismTranslation;

  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedFlow, setHighlightedFlow] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Auto-run animation on scroll into view
  useEffect(() => {
    if (isInView && !isAnimating) {
      const timer = setTimeout(() => {
        setHighlightedFlow(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const steps = [
    {
      id: 0,
      icon: <Zap className="w-5 h-5" />,
      color: 'amber',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      badge: 'bg-amber-500/20 text-amber-300',
      label: m.step1Label,
      sublabel: m.step1Sub,
      detail: m.step1Detail,
      connector: m.conn1,
    },
    {
      id: 1,
      icon: <Building2 className="w-5 h-5" />,
      color: 'rose',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      text: 'text-rose-400',
      badge: 'bg-rose-500/20 text-rose-300',
      label: m.step2Label,
      sublabel: m.step2Sub,
      detail: m.step2Detail,
      connector: m.conn2,
    },
    {
      id: 2,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'sky',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/30',
      text: 'text-sky-400',
      badge: 'bg-sky-500/20 text-sky-300',
      label: m.step3Label,
      sublabel: m.step3Sub,
      detail: m.step3Detail,
      connector: m.conn3,
    },
    {
      id: 3,
      icon: <Banknote className="w-5 h-5" />,
      color: 'emerald',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      badge: 'bg-emerald-500/20 text-emerald-300',
      label: m.step4Label,
      sublabel: m.step4Sub,
      detail: m.step4Detail,
      connector: null,
    },
  ];

  const splitSteps = [
    {
      id: 'unisolar',
      percent: '20%',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      label: m.split20Label,
      desc: m.split20Desc,
    },
    {
      id: 'investor',
      percent: '80%',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      label: m.split80Label,
      desc: m.split80Desc,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="mechanism"
      className="py-24 bg-slate-950 border-b border-slate-900 relative overflow-hidden"
      style={{ contentVisibility: 'auto' }}
    >
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-brand-orange/10 border border-brand-orange/30 px-3.5 py-1.5 rounded-md text-brand-orange text-xs font-mono font-bold tracking-[0.2em] mb-5 uppercase">
            <Zap className="w-3.5 h-3.5" />
            <span>{m.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-tight">
            {m.title}
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-xl mx-auto">
            {m.subtitle}
          </p>
        </motion.div>

        {/* MAIN FLOW — Desktop (horizontal) */}
        <div className="hidden lg:block mb-12">
          {/* Top 4-step horizontal chain */}
          <div className="relative flex items-stretch gap-0">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                {/* Step card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 * idx }}
                  className="flex-1 relative"
                >
                  <button
                    onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                    className={`w-full h-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer group
                      ${step.bg} ${step.border}
                      ${activeStep === step.id ? 'ring-2 ring-offset-2 ring-offset-slate-950 ring-' + step.color + '-500/50 scale-[1.02]' : 'hover:scale-[1.01]'}
                    `}
                  >
                    <div className={`w-10 h-10 rounded-xl ${step.bg} border ${step.border} ${step.text} flex items-center justify-center mb-3`}>
                      {step.icon}
                    </div>
                    <div className={`text-[10px] font-mono font-bold uppercase tracking-widest ${step.text} mb-1`}>
                      {m.stepLabel} {idx + 1}
                    </div>
                    <div className="font-display font-bold text-white text-sm leading-snug mb-1.5">
                      {step.label}
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      {step.sublabel}
                    </div>
                    <div className={`mt-3 inline-flex items-center text-[10px] font-mono px-2 py-1 rounded-md ${step.badge}`}>
                      <Info className="w-3 h-3 mr-1" />
                      {activeStep === step.id ? m.collapseHint : m.expandHint}
                    </div>
                  </button>
                </motion.div>

                {/* Connector arrow between steps (except after last) */}
                {idx < steps.length - 1 && (
                  <div className="flex items-center px-2 shrink-0">
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.15 * idx + 0.3 }}
                      className="flex flex-col items-center"
                    >
                      <div className={`text-[9px] font-mono text-slate-500 mb-1 whitespace-nowrap`}>
                        {step.connector}
                      </div>
                      <ArrowRight className={`w-5 h-5 ${highlightedFlow ? 'text-brand-orange' : 'text-slate-700'} transition-colors duration-700`} />
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Expandable detail panel */}
          <AnimatePresence>
            {activeStep !== null && (
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-4"
              >
                <div className={`rounded-2xl border p-5 ${steps[activeStep].bg} ${steps[activeStep].border}`}>
                  <p className={`text-sm leading-relaxed ${steps[activeStep].text}`}>
                    {steps[activeStep].detail}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MOBILE vertical flow */}
        <div className="lg:hidden space-y-3 mb-12">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
            >
              <button
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${step.bg} ${step.border}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg ${step.bg} border ${step.border} ${step.text} flex items-center justify-center shrink-0`}>
                      {step.icon}
                    </div>
                    <div>
                      <div className={`text-[9px] font-mono font-bold uppercase tracking-widest ${step.text}`}>
                        {m.stepLabel} {idx + 1}
                      </div>
                      <div className="font-display font-bold text-white text-sm">{step.label}</div>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeStep === step.id ? 'rotate-180' : ''}`} />
                </div>
                <AnimatePresence>
                  {activeStep === step.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className={`text-xs leading-relaxed mt-3 ${step.text}`}>{step.detail}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              {idx < steps.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[9px] text-slate-600 font-mono">{step.connector}</span>
                    <div className={`w-px h-4 ${highlightedFlow ? 'bg-brand-orange' : 'bg-slate-700'} transition-colors duration-700`} />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* SPLIT SECTION — 20% / 80% visual */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-orange/10 border border-brand-orange/30 text-brand-orange flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-mono text-brand-orange font-bold uppercase tracking-wider">{m.splitBadge}</div>
                <div className="font-display font-bold text-white text-base">{m.splitTitle}</div>
              </div>
            </div>
          </div>

          {/* Visual bar */}
          <div className="px-6 py-5">
            <div className="relative h-8 rounded-xl overflow-hidden flex mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: '20%' } : {}}
                transition={{ duration: 0.9, delay: 0.7, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-orange-600 to-orange-500 flex items-center justify-center"
              >
                <span className="text-xs font-mono font-bold text-slate-950 whitespace-nowrap px-2">20%</span>
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: '80%' } : {}}
                transition={{ duration: 0.9, delay: 0.7, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 flex items-center justify-center"
              >
                <span className="text-xs font-mono font-bold text-slate-950 whitespace-nowrap px-2">80%</span>
              </motion.div>
            </div>
            <div className="flex gap-2 text-[10px] font-mono text-slate-500 mb-5">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />UNISOLAR</span>
              <span className="flex items-center gap-1 ml-2"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />{m.investorLabel}</span>
            </div>

            {/* Two cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {splitSteps.map((s) => (
                <div
                  key={s.id}
                  className={`rounded-2xl border p-5 ${s.bg} ${s.border}`}
                >
                  <div className={`text-3xl font-mono font-extrabold ${s.color} mb-1`}>{s.percent}</div>
                  <div className="font-display font-bold text-white text-sm mb-2">{s.label}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom aligned-incentive note */}
          <div className="px-6 pb-6">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex gap-3">
              <div className="w-5 h-5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                <Zap className="w-3 h-3" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                <span className="text-brand-orange font-semibold">{m.alignedNote1} </span>
                {m.alignedNote2}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center text-[11px] font-mono text-slate-600 mt-8"
        >
          {m.footnote}
        </motion.p>
      </div>
    </section>
  );
}

// Type export for translations
export interface MechanismTranslation {
  badge: string;
  title: string;
  subtitle: string;
  stepLabel: string;
  expandHint: string;
  collapseHint: string;
  step1Label: string;
  step1Sub: string;
  step1Detail: string;
  conn1: string;
  step2Label: string;
  step2Sub: string;
  step2Detail: string;
  conn2: string;
  step3Label: string;
  step3Sub: string;
  step3Detail: string;
  conn3: string;
  step4Label: string;
  step4Sub: string;
  step4Detail: string;
  splitBadge: string;
  splitTitle: string;
  split20Label: string;
  split20Desc: string;
  split80Label: string;
  split80Desc: string;
  investorLabel: string;
  alignedNote1: string;
  alignedNote2: string;
  footnote: string;
}
