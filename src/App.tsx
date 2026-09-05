import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Partners from './components/Partners';
import ForInvestors from './components/ForInvestors';
import Services from './components/Services';
import Solar3DStudio from './components/Solar3DStudio';
import Contact from './components/Contact';
import InvestorZone from './components/InvestorZone';
import { translations } from './translations';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './components/Logo';

export default function App() {
  // Global States
  const [lang, setLang] = useState<'UZ' | 'RU' | 'EN' | 'JA'>('UZ');
  const [activeSection, setActiveSection] = useState('home');
  const [isInvestorLoggedIn, setIsInvestorLoggedIn] = useState(false);
  const [consultationTrigger, setConsultationTrigger] = useState(false);

  const t = translations[lang];

  // Synchronize document HTML lang attribute and title
  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  // Optimized scroll listener using requestAnimationFrame to prevent layout thrashing
  useEffect(() => {
    let ticking = false;
    const sections = ['home', 'about', 'partners', 'investors', 'solar3d', 'services', 'contact', 'investor-zone'];

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 250;
          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveSection(section === 'investor-zone' ? 'investors' : section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Handler to scroll smoothly to a specific section
  const handleSectionScroll = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler for Investor Zone Portal button in Navbar
  const handleInvestorZoneNavClick = () => {
    handleSectionScroll('investor-zone');
  };

  // Trigger to pre-fill and focus contact form
  const handleConsultationRequest = () => {
    setConsultationTrigger(prev => !prev);
    handleSectionScroll('contact');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-brand-orange selection:text-slate-950 font-sans" id="app-root">
      
      {/* Dynamic Header / Navigation */}
      <Navbar
        t={t}
        currentLang={lang}
        setLang={setLang}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onInvestorZoneClick={handleInvestorZoneNavClick}
        isLoggedIn={isInvestorLoggedIn}
      />

      {/* Main Corporate Sections Container */}
      <main className="flex-1" id="main-content">
        
        {/* Hero Landing */}
        <Hero t={t} onSectionScroll={handleSectionScroll} />

        {/* 01 · Biz haqimizda (Kompaniya ma’lumotnomasi) */}
        <About t={t} />

        {/* 02 · Bizning hamkorlarimiz (Strategik va Muhandislik hamkorlar) */}
        <Partners t={t} />

        {/* 03 · Investorlar uchun */}
        <ForInvestors t={t} onConsultationClick={handleConsultationRequest} />

        {/* 04 · Interaktiv 3D Quyosh Paneli Studiyasi */}
        <Solar3DStudio t={t} />

        {/* 05 · Xizmatlar */}
        <Services t={t} onConsultationClick={handleConsultationRequest} />

        {/* 06 · Bog'lanish / Kontakt */}
        <Contact t={t} consultationTrigger={consultationTrigger} />

        {/* 08 · Investor Zonasi portali */}
        <InvestorZone
          t={t}
          isLoggedIn={isInvestorLoggedIn}
          setIsLoggedIn={setIsInvestorLoggedIn}
          onClose={() => handleSectionScroll('home')}
        />

      </main>

      {/* Footer Credentials & Site Info */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12" id="site-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-8 mb-8">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <Logo variant="dark" size="sm" />
              <p className="text-xs text-slate-400 font-mono">
                {t.footer.tagline}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                {t.footer.legalSummary}
              </p>
              <p className="text-xs font-mono text-brand-orange font-semibold">
                {t.footer.motto}
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-mono text-white font-bold uppercase tracking-wider">{t.footer.navTitle}</h4>
              <ul className="space-y-1.5 text-xs">
                {[
                  { id: 'home', label: t.nav.home },
                  { id: 'about', label: t.nav.about },
                  { id: 'partners', label: t.nav.partners },
                  { id: 'investors', label: t.nav.investors },
                  { id: 'solar3d', label: t.nav.solar3d },
                  { id: 'services', label: t.nav.services },
                  { id: 'contact', label: t.nav.contact },
                ].map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleSectionScroll(item.id)}
                      className="hover:text-brand-orange transition-colors cursor-pointer text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact quick desk column */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-mono text-white font-bold uppercase tracking-wider">{t.footer.contactTitle}</h4>
              <div className="space-y-2 text-xs">
                <p className="flex items-start space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                  <span className="text-slate-400">{t.contact.addressValue}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>info@unisolar.uz</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>+998 (90) 123-45-67</span>
                </p>
                <p className="text-slate-500 text-[11px] font-mono pt-1">
                  Veb-sayt: unisolar.uz
                </p>
              </div>
            </div>

          </div>

          {/* Copyright strip */}
          <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>{t.footer.allRights}</p>
            <p className="flex items-center space-x-1 mt-2 sm:mt-0">
              <span>{t.footer.bottomPpa}</span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
