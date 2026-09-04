import React from 'react';
import {
  Target,
  Compass,
  CheckCircle2,
  Check,
  MapPin,
  FileText
} from 'lucide-react';
import { Translation } from '../translations';
import TeamSection from './TeamSection';

interface AboutProps {
  t: Translation;
}

export default function About({ t }: AboutProps) {
  const companyInfo = t.about.companyDetails;
  const ppaBenefits = t.about.ppaBenefits;
  const fullServiceChain = t.about.serviceChain;
  const whyUnisolar = t.about.whyPoints;
  const values = t.about.values;
  const currentProjectSpecs = t.about.currentProjectSpecs;

  return (
    <section id="about" className="py-24 bg-white border-b border-slate-200/80" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header Title Section */}
        <div className="border-b border-slate-200 pb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono font-bold tracking-widest uppercase">
              {t.about.badge}
            </div>
            <div className="text-xs font-mono text-slate-500 flex items-center gap-3">
              <span>STIR: <strong className="text-slate-800 font-bold">312 853 539</strong></span>
              <span className="text-slate-300">|</span>
              <span>unisolar.ai.studio</span>
            </div>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-brand-blue tracking-tight leading-tight">
              {t.about.title}
            </h1>
            <p className="mt-2 text-base sm:text-lg font-mono text-brand-orange font-semibold">
              {t.about.subTitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{t.about.regionText}</span>
            </p>
          </div>

          {/* Intro Narrative */}
          <div className="mt-8 grid md:grid-cols-12 gap-6 text-slate-700 leading-relaxed text-base">
            <div className="md:col-span-6 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7">
              <p className="mb-4">
                {t.about.introP1}
              </p>
              <p>
                {t.about.introP2}
              </p>
            </div>
            <div className="md:col-span-6 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7">
              <h4 className="text-base font-display font-bold text-brand-blue mb-2">
                {t.about.japanUzPartnerTitle}
              </h4>
              <p>
                {t.about.japanUzPartnerDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Live Project Metrics in Numbers */}
        <div id="about-stats" className="bg-gradient-to-br from-brand-blue via-brand-blue to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg">
          <div className="mb-8 border-b border-white/10 pb-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-brand-orange font-bold">
              {t.hero.activeProjectSubtitle}
            </h3>
            <p className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              {t.hero.activeProjectTitle}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-3xl sm:text-4xl font-mono font-bold text-brand-orange mb-2">{t.hero.statCapacityVal}</div>
              <div className="text-sm font-semibold text-white">{t.hero.statCapacityLabel}</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-3xl sm:text-4xl font-mono font-bold text-white mb-2">{t.hero.statTermVal}</div>
              <div className="text-sm font-semibold text-slate-200">{t.hero.statTermLabel}</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-3xl sm:text-4xl font-mono font-bold text-emerald-400 mb-2">{t.hero.statTariffVal}</div>
              <div className="text-sm font-semibold text-slate-200">{t.hero.statTariffLabel}</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-3xl sm:text-4xl font-mono font-bold text-amber-300 mb-2">{t.hero.statCapexVal}</div>
              <div className="text-sm font-semibold text-slate-200">{t.hero.statCapexLabel}</div>
            </div>
          </div>
        </div>

        {/* Company Dossier & Mission / Vision */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Company Brief Table */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs" id="company-dossier">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-brand-blue/10 text-brand-blue">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-brand-blue">
                {t.about.companyDetailsTitle}
              </h3>
            </div>

            <div className="divide-y divide-slate-100 text-sm">
              {companyInfo.map((row, idx) => (
                <div key={idx} className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-5 font-mono text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {row.label}
                  </div>
                  <div className="sm:col-span-7 font-medium text-slate-800">
                    {row.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-brand-orange/10 text-brand-orange">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-display font-bold text-brand-blue">
                  {t.about.missionTitle}
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.about.missionDesc}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-sky-500/10 text-sky-600">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-display font-bold text-brand-blue">
                  {t.about.visionTitle}
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.about.visionDesc}
              </p>
            </div>
          </div>
        </div>

        {/* PPA Model */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-xs" id="about-ppa-model">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-orange block mb-2">
              {t.about.subTitle}
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-brand-blue">
              {t.about.ppaTitle}
            </h3>
            <p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              {t.about.ppaDesc}
            </p>
          </div>

          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ppaBenefits.map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                    <span className="font-display font-bold text-brand-blue text-base">{item.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Service Chain */}
        <div className="border border-slate-200 rounded-3xl p-8 sm:p-12 bg-white shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-orange block mb-2">
              FULL LIFECYCLE
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-brand-blue">
              {t.about.serviceChainTitle}
            </h3>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              {t.about.serviceChainDesc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fullServiceChain.map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-brand-blue text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  0{idx + 1}
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Why UNISOLAR & Values */}
        <div className="grid lg:grid-cols-2 gap-10">
          
          {/* Why UNISOLAR */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs">
            <h3 className="text-2xl font-display font-bold text-brand-blue mb-2">
              {t.about.whyTitle}
            </h3>
            <p className="text-xs text-slate-500 mb-6">{t.about.whyDesc}</p>
            <div className="space-y-4">
              {whyUnisolar.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-1 rounded-md bg-brand-orange/10 text-brand-orange mt-0.5 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-sm font-bold text-brand-blue block mb-0.5">
                      {item.title}
                    </strong>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs">
            <h3 className="text-2xl font-display font-bold text-brand-blue mb-6">
              {t.about.valuesTitle}
            </h3>
            <div className="space-y-4">
              {values.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-1 rounded-md bg-emerald-50 text-emerald-600 mt-0.5 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-sm font-bold text-brand-blue block mb-0.5">
                      {item.title}
                    </strong>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Project Benchmark */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl" id="about-active-project">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t.about.currentProjectBadge}
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              {t.about.currentProjectTitle}
            </h3>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.about.currentProjectDesc}
            </p>
          </div>

          <div className="overflow-hidden border border-slate-800 rounded-2xl bg-slate-950/60">
            <div className="divide-y divide-slate-800 text-xs sm:text-sm">
              {currentProjectSpecs.map((item, idx) => (
                <div key={idx} className="p-4 sm:px-6 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center hover:bg-slate-900/50 transition-colors">
                  <div className="sm:col-span-4 font-mono text-slate-400 font-semibold uppercase text-xs">
                    {item.label}
                  </div>
                  <div className="sm:col-span-8 font-medium text-slate-100">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <TeamSection t={t} />

      </div>
    </section>
  );
}
