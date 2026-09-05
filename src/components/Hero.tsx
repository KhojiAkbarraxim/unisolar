import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CalendarRange, Landmark, Zap, ArrowRight, Rotate3d } from 'lucide-react';
import { Translation } from '../translations';

interface HeroProps {
  t: Translation;
  onSectionScroll: (sectionId: string) => void;
}

export default function Hero({ t, onSectionScroll }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center bg-slate-950 overflow-hidden py-16" style={{ contentVisibility: 'auto' }}>
      {/* Dynamic Background Panel with Solar Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950 z-10" />
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80"
          alt="Solar plant field"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-blue/30 mix-blend-multiply" />
      </div>

      {/* Decorative vector grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-12 items-center"
        >
          {/* Slogan and Text Column */}
          <div className="lg:col-span-7 space-y-8" id="hero-main-content">
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-brand-orange/10 border border-brand-orange/30 px-3 py-1.5 rounded-full text-brand-orange text-xs font-mono font-bold tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.hero.badge}</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.1]" id="hero-title">
              {t.hero.slogan}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400 font-extrabold block">
                {t.hero.subSlogan}
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-slate-300 max-w-2xl leading-relaxed">
              {t.hero.desc}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4" id="hero-cta-buttons">
              <button
                id="hero-to-investors"
                onClick={() => onSectionScroll('investors')}
                className="group flex items-center justify-center space-x-2 bg-brand-orange hover:bg-brand-orange-light text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg shadow-brand-orange/20 transition-all transform hover:-translate-y-0.5 cursor-pointer text-base"
              >
                <span>{t.hero.ctaInvestors}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                id="hero-to-partners"
                onClick={() => onSectionScroll('partners')}
                className="flex items-center justify-center space-x-2 bg-slate-900 border border-slate-700 hover:border-slate-500 hover:bg-slate-850 text-white font-medium px-8 py-4 rounded-xl transition-all cursor-pointer text-base"
              >
                <span>{t.hero.ctaPartners}</span>
              </button>
              <button
                id="hero-to-solar3d"
                onClick={() => onSectionScroll('solar3d')}
                className="flex items-center justify-center space-x-2 bg-sky-950/60 border border-sky-600/40 hover:border-sky-400 text-sky-200 hover:text-white font-medium px-6 py-4 rounded-xl transition-all cursor-pointer text-base group"
              >
                <Rotate3d className="w-5 h-5 text-sky-400 group-hover:rotate-45 transition-transform" />
                <span>{t.hero.cta3D}</span>
              </button>
            </motion.div>
          </div>

          {/* Quick Metrics Dashboard Column */}
          <div className="lg:col-span-5" id="hero-metrics-grid">
            <motion.div
              variants={itemVariants}
              className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
            >
              <div className="border-b border-slate-850 pb-4">
                <h3 className="text-sm font-mono text-brand-orange font-bold uppercase tracking-wider">{t.hero.activeProjectTitle}</h3>
                <p className="text-xs text-slate-400 mt-1">{t.hero.activeProjectSubtitle}</p>
              </div>

              {/* Grid of numbers */}
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-850">
                  <Zap className="w-6 h-6 text-brand-orange mb-2" />
                  <span className="block text-2xl sm:text-3xl font-mono font-bold text-white">{t.hero.statCapacityVal}</span>
                  <span className="block text-xs text-slate-400 mt-1">{t.hero.statCapacityLabel}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-850">
                  <CalendarRange className="w-6 h-6 text-sky-400 mb-2" />
                  <span className="block text-2xl sm:text-3xl font-mono font-bold text-white">{t.hero.statTermVal}</span>
                  <span className="block text-xs text-slate-400 mt-1">{t.hero.statTermLabel}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-850">
                  <Landmark className="w-6 h-6 text-emerald-400 mb-2" />
                  <span className="block text-2xl sm:text-3xl font-mono font-bold text-emerald-400">{t.hero.statTariffVal}</span>
                  <span className="block text-xs text-slate-400 mt-1">{t.hero.statTariffLabel}</span>
                </div>


              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{t.hero.systemStatus}</span>
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5" />
                  {t.hero.stableGrid}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
