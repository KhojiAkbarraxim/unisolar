import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Sparkles } from 'lucide-react';
import { Translation } from '../types';

interface TeamSectionProps {
  t: Translation;
}

// Fallback high quality corporate styling with SVG initials when local image file is not yet moved
const INITIALS_GRADIENTS: Record<string, { bg: string; text: string }> = {
  'Bunyodbek Ibragimov': { bg: 'from-brand-blue to-slate-900', text: 'text-amber-300' },
  'Бунёдбек Ибрагимов': { bg: 'from-brand-blue to-slate-900', text: 'text-amber-300' },
  'Anvar Omonboyev': { bg: 'from-slate-800 to-brand-blue', text: 'text-white' },
  'Анвар Омонбоев': { bg: 'from-slate-800 to-brand-blue', text: 'text-white' },
  'Vafo Ortiqov': { bg: 'from-slate-900 to-slate-800', text: 'text-brand-orange' },
  'Вафо Ортиков': { bg: 'from-slate-900 to-slate-800', text: 'text-brand-orange' },
  'Said Raximov': { bg: 'from-brand-blue to-slate-950', text: 'text-emerald-400' },
  'Саид Рахимов': { bg: 'from-brand-blue to-slate-950', text: 'text-emerald-400' },
};

export default function TeamSection({ t }: TeamSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const teamMembers = t.about.teamMembers || [];

  const updateScrollButtons = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [teamMembers]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    // Scroll roughly 1 card width (~280px + gap)
    const cardWidth = 300;
    el.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  const handleImageError = (name: string) => {
    setFailedImages((prev) => ({ ...prev, [name]: true }));
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  if (!teamMembers || teamMembers.length === 0) return null;

  return (
    <div id="about-team" className="border border-slate-200/90 rounded-3xl p-6 sm:p-10 bg-white shadow-xs">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-mono font-bold tracking-wider uppercase mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>{t.about.teamBadge || '01.7 // BIZNING JAMOA'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-brand-blue tracking-tight">
            {t.about.teamTitle || 'Professional boshqaruv jamoasi'}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            {t.about.teamDesc || 'Quyosh energetikasi, huquqiy me’morchilik va xalqaro investitsiyalar sohasidagi yetakchi mutaxassislarimiz.'}
          </p>
        </div>

        {/* Scroll Control Arrows */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll team left"
            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-brand-blue disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll team right"
            className="w-10 h-10 rounded-xl border border-slate-200 bg-brand-blue text-white flex items-center justify-center hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-xs"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track (approx 1/4 screen per item) */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 -mx-2 px-2 scroll-smooth snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {teamMembers.map((member, idx) => {
          const hasImageFailed = failedImages[member.name];
          const initials = getInitials(member.name);
          const styling = INITIALS_GRADIENTS[member.name] || {
            bg: 'from-brand-blue to-slate-900',
            text: 'text-brand-orange',
          };

          return (
            <div
              key={idx}
              className="snap-start shrink-0 w-[240px] sm:w-[260px] md:w-[calc(25%-15px)] min-w-[230px] max-w-[280px] group flex flex-col bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3 sm:p-3.5 hover:border-brand-orange/40 hover:bg-white hover:shadow-md transition-all duration-300"
            >
              {/* Photo Frame (approx 1/4 screen height proportion) */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-200 border border-slate-200/60 mb-3.5">
                {!hasImageFailed ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    onError={() => handleImageError(member.name)}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  // Elegant Fallback Portrait Card if local file is missing
                  <div
                    className={`w-full h-full bg-gradient-to-br ${styling.bg} p-5 flex flex-col justify-between text-white relative overflow-hidden`}
                  >
                    <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/5 blur-xl pointer-events-none" />
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold">
                        UNISOLAR
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-brand-orange opacity-80" />
                    </div>
                    <div className="flex flex-col items-center justify-center my-auto z-10">
                      <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-inner mb-2">
                        <span className={`font-display font-bold text-2xl tracking-wider ${styling.text}`}>
                          {initials}
                        </span>
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-center text-slate-400 border-t border-white/10 pt-2 z-10">
                      Management Board
                    </div>
                  </div>
                )}

                {/* Subtle overlay badge for status */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-900/70 backdrop-blur-xs text-[10px] font-mono text-white/90 uppercase tracking-wider font-semibold">
                  0{idx + 1}
                </div>
              </div>

              {/* Text Info: Name & Role */}
              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-display font-bold text-brand-blue text-base sm:text-lg leading-snug group-hover:text-brand-orange transition-colors">
                    {member.name}
                  </h4>
                  <p className="mt-1 text-xs font-mono font-medium text-slate-500 leading-snug">
                    {member.role}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>UNISOLAR</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Helper text / hint for horizontal navigation */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Jami {teamMembers.length} nafar asosiy boshqaruv mutaxassisi</span>
        </span>
        <span className="hidden sm:inline-block text-slate-400">
          ← Gorizontal surish orqali barchasini ko‘ring →
        </span>
      </div>
    </div>
  );
}
