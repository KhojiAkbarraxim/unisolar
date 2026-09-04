import React, { useState } from 'react';
import { Menu, X, Globe, Lock, Shield } from 'lucide-react';
import { Translation } from '../translations';
import Logo from './Logo';

interface NavbarProps {
  t: Translation;
  currentLang: 'UZ' | 'RU' | 'EN' | 'JA';
  setLang: (lang: 'UZ' | 'RU' | 'EN' | 'JA') => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onInvestorZoneClick: () => void;
  isLoggedIn: boolean;
}

const LANGUAGES: { code: 'UZ' | 'RU' | 'EN' | 'JA'; label: string }[] = [
  { code: 'UZ', label: 'Oʻzbek' },
  { code: 'RU', label: 'Русский' },
  { code: 'EN', label: 'English' },
  { code: 'JA', label: '日本語' }
];

export default function Navbar({
  t,
  currentLang,
  setLang,
  activeSection,
  setActiveSection,
  onInvestorZoneClick,
  isLoggedIn
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'partners', label: t.nav.partners || 'Bizning hamkorlar' },
    { id: 'investors', label: t.nav.investors },
    { id: 'solar3d', label: t.nav.solar3d, isHighlight: true },
    { id: 'services', label: t.nav.services },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs" id="nav-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('home')} id="logo-container">
            <Logo variant="light" size="md" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-1" id="desktop-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer inline-flex items-center ${
                  activeSection === item.id
                    ? 'text-brand-blue bg-slate-50 font-semibold'
                    : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50/50'
                }`}
              >
                <span>{item.label}</span>
                {item.isHighlight && (
                  <span className="ml-1.5 px-1.5 py-0.2 bg-gradient-to-r from-brand-orange to-amber-500 text-slate-950 font-mono text-[9px] font-extrabold rounded-md shadow-xs">
                    3D
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Side Buttons: Language and Investor Zone */}
          <div className="hidden xl:flex items-center space-x-4" id="right-nav-actions">
            {/* Language Selector */}
            <div className="relative">
              <button
                id="lang-menu-toggle"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                onBlur={() => setTimeout(() => setLangMenuOpen(false), 200)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <Globe className="w-4 h-4 text-slate-400" />
                <span>{LANGUAGES.find(l => l.code === currentLang)?.label}</span>
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150" id="lang-dropdown">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      id={`lang-select-${lang.code}`}
                      onClick={() => {
                        setLang(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 cursor-pointer transition-colors flex justify-between items-center ${
                        currentLang === lang.code ? 'text-brand-blue font-semibold bg-slate-50' : 'text-slate-700'
                      }`}
                    >
                      <span>{lang.label}</span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Investor Zone Action */}
            <button
              id="investor-zone-toggle"
              onClick={onInvestorZoneClick}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm cursor-pointer ${
                isLoggedIn
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-brand-blue text-white hover:bg-brand-blue-light hover:shadow-md'
              }`}
            >
              {isLoggedIn ? <Shield className="w-4 h-4" /> : <Lock className="w-4 h-4 text-brand-orange" />}
              <span>{t.nav.investorZone}</span>
              {isLoggedIn && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" />}
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center space-x-2 xl:hidden" id="mobile-menu-actions">
            {/* Quick Lang Switcher for mobile */}
            <div className="relative">
              <button
                id="mobile-lang-btn"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="p-2 rounded-md hover:bg-slate-100 text-slate-600 cursor-pointer"
              >
                <Globe className="w-5 h-5" />
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-slate-100 py-1 z-50" id="mobile-lang-dropdown">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLang(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs cursor-pointer ${
                        currentLang === lang.code ? 'text-brand-blue font-semibold bg-slate-50' : 'text-slate-700'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Investor Button */}
            <button
              onClick={onInvestorZoneClick}
              className={`p-2 rounded-md cursor-pointer ${
                isLoggedIn ? 'text-emerald-600' : 'text-brand-blue'
              }`}
              title={t.nav.investorZone}
            >
              {isLoggedIn ? <Shield className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-brand-blue hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="xl:hidden bg-white border-b border-slate-100 py-4 px-4 space-y-2 animate-in fade-in duration-150" id="mobile-drawer">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                activeSection === item.id
                  ? 'text-brand-blue bg-slate-50 font-semibold'
                  : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
              }`}
            >
              <span>{item.label}</span>
              {item.isHighlight && (
                <span className="px-2 py-0.5 bg-gradient-to-r from-brand-orange to-amber-500 text-slate-950 font-mono text-xs font-extrabold rounded-md shadow-xs">
                  3D LAB
                </span>
              )}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                setIsOpen(false);
                onInvestorZoneClick();
              }}
              className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg text-base font-medium transition-all cursor-pointer ${
                isLoggedIn
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-brand-blue text-white hover:bg-brand-blue-light'
              }`}
            >
              {isLoggedIn ? <Shield className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>{t.nav.investorZone}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
