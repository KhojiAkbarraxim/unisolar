import React, { useState, useEffect } from 'react';
import { Lock, Unlock, LogOut, CheckCircle2, Download, BarChart3, TrendingUp, AlertCircle, FileText, Activity, ShieldCheck } from 'lucide-react';
import { Translation, sampleInvestorData } from '../translations';

interface InvestorZoneProps {
  t: Translation;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  onClose: () => void;
}

export default function InvestorZone({ t, isLoggedIn, setIsLoggedIn }: InvestorZoneProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Telemetry simulation states
  const [currentKw, setCurrentKw] = useState(2410.8);
  const [cumulativeMwh, setCumulativeMwh] = useState(4122.45);
  const [activeTab, setActiveTab] = useState<'dash' | 'docs' | 'payouts'>('dash');

  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      setCurrentKw((prev) => {
        const delta = (Math.random() - 0.48) * 12;
        const next = prev + delta;
        return parseFloat(Math.max(2320, Math.min(2490, next)).toFixed(1));
      });

      setCumulativeMwh((prev) => {
        const next = prev + 0.002;
        return parseFloat(next.toFixed(5));
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'unisolar2026') {
      setIsLoggedIn(true);
      setError('');
      setPassword('');
    } else {
      setError(t.investorZone.wrongPass);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
  };

  return (
    <section id="investor-zone" className="py-24 bg-slate-900 text-white border-b border-slate-950" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-brand-orange/10 border border-brand-orange/30 px-3 py-1.5 rounded-md text-brand-orange text-xs font-mono font-bold tracking-[0.2em] mb-4 uppercase">
            <Lock className="w-3.5 h-3.5" />
            <span>{t.investorZone.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
            {t.investorZone.title}
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
            {t.investorZone.subtitle}
          </p>
          <div className="flex justify-center gap-1.5 mt-4">
            <div className="w-2.5 h-2.5 bg-brand-orange" />
            <div className="w-10 h-2.5 bg-slate-900" />
            <div className="w-2.5 h-2.5 bg-brand-orange" />
          </div>
        </div>

        {/* LOGGED OUT VIEW */}
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto" id="investor-login-container">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-5">
                <Lock className="w-48 h-48 -mr-8 -mt-8" />
              </div>

              <form onSubmit={handleLogin} className="space-y-6 relative z-10" id="login-form">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 text-brand-orange flex items-center justify-center mx-auto shadow-md">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-display font-bold">{t.investorZone.encryptedTitle}</h3>
                  <p className="text-xs text-slate-400">{t.investorZone.encryptedDesc}</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">{t.investorZone.keyLabel}</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.investorZone.passPlaceholder}
                    className="w-full px-4 py-3 border border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange bg-slate-900/60 text-sm text-white text-center font-mono placeholder:text-slate-600 focus:outline-hidden"
                  />
                </div>

                {error && (
                  <div className="flex items-center space-x-2 text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl text-xs font-mono">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-brand-orange hover:bg-brand-orange-light text-slate-950 font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                >
                  <Unlock className="w-4 h-4" />
                  <span>{t.investorZone.loginBtn}</span>
                </button>

                {/* Helper / Demo login hint */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-850 text-center space-y-1">
                  <span className="block text-[10px] font-mono text-brand-orange font-bold uppercase">{t.investorZone.hintTitle}</span>
                  <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
                    {t.investorZone.hintText}
                  </p>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* LOGGED IN VIEW */
          <div className="space-y-8 animate-in fade-in duration-200" id="investor-dashboard-view">
            
            {/* Header Banner */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-inner shrink-0">
                  <ShieldCheck className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-extrabold text-white">{t.investorZone.welcome}</h3>
                  <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mt-1">
                    <span>{t.investorZone.portfolioId}</span>
                    <span>•</span>
                    <span className="text-emerald-400 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
                      {t.investorZone.secureActive}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 bg-slate-900 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-900/40 text-xs font-mono text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.investorZone.logoutBtn}</span>
                </button>
              </div>
            </div>

            {/* Dashboard Tabs Toolbar */}
            <div className="flex border-b border-slate-800 gap-1 overflow-x-auto" id="dash-tabs-toolbar">
              <button
                onClick={() => setActiveTab('dash')}
                className={`px-5 py-3.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
                  activeTab === 'dash'
                    ? 'border-brand-orange text-brand-orange bg-slate-950/20'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>{t.investorZone.tabLiveTelemetry}</span>
              </button>
              <button
                onClick={() => setActiveTab('payouts')}
                className={`px-5 py-3.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
                  activeTab === 'payouts'
                    ? 'border-brand-orange text-brand-orange bg-slate-950/20'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>{t.investorZone.tabDisbursements}</span>
              </button>
              <button
                onClick={() => setActiveTab('docs')}
                className={`px-5 py-3.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
                  activeTab === 'docs'
                    ? 'border-brand-orange text-brand-orange bg-slate-950/20'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>{t.investorZone.tabDocuments}</span>
              </button>
            </div>

            {/* TAB: DASH */}
            {activeTab === 'dash' && (
              <div className="grid lg:grid-cols-12 gap-8 animate-in fade-in duration-150" id="tab-dash">
                <div className="lg:col-span-5 bg-slate-950 rounded-3xl p-6 border border-slate-850 space-y-6">
                  <div>
                    <span className="block text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">{t.investorZone.currentOutput}</span>
                    <span className="text-4xl font-mono font-extrabold text-brand-orange block mt-1">{currentKw.toLocaleString()} kW</span>
                    <span className="text-[10px] font-mono text-slate-400">{t.investorZone.activeFacilityNote}</span>
                  </div>

                  <div className="h-28 bg-slate-900 border border-slate-850 rounded-2xl flex items-end p-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-900 z-10" />
                    <div className="absolute inset-x-0 top-1/2 h-px bg-slate-800 z-0" />
                    <div className="w-full flex justify-between items-end h-full relative z-10 gap-1.5 px-2">
                      {[40, 55, 45, 60, 75, 65, 80, 85, 70, 75, 82, 85, 89, 87].map((val, idx) => (
                        <div
                          key={idx}
                          className="w-full bg-brand-orange/15 border-t-2 border-brand-orange rounded-t-xs"
                          style={{ height: `${val}%`, opacity: idx === 13 ? 1 : 0.4 + idx * 0.04 }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-850 pt-4 flex justify-between text-xs font-mono">
                    <div className="space-y-0.5">
                      <span className="text-slate-400">{t.investorZone.facilityTemp}</span>
                      <span className="block font-bold text-slate-200">38.4°C</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-slate-400">{t.investorZone.gridFrequency}</span>
                      <span className="block font-bold text-slate-200">50.02 Hz</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-slate-400">{t.investorZone.inverterStatus}</span>
                      <span className="block font-bold text-emerald-400">8 / 8 ONLINE</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 border border-slate-850 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="block text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">{t.investorZone.cumulativeTitle}</span>
                        <span className="text-4xl font-mono font-extrabold text-sky-400 block mt-1">{cumulativeMwh.toLocaleString(undefined, {minimumFractionDigits: 5, maximumFractionDigits: 5})} MWh</span>
                      </div>
                      <div className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-mono font-bold rounded-lg flex items-center space-x-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>Est. IRR: 13.7%</span>
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {t.investorZone.cumulativeDesc}
                    </p>
                  </div>

                  <div className="border-t border-slate-850 pt-6 mt-6 grid sm:grid-cols-2 gap-4 text-xs font-mono text-slate-400">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-850">
                      <span className="block text-slate-400 uppercase font-bold">{t.investorZone.totalCo2Savings}</span>
                      <span className="text-base font-bold text-white">3,124.5 tons</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-850">
                      <span className="block text-slate-400 uppercase font-bold">{t.investorZone.totalCashPaid}</span>
                      <span className="text-base font-bold text-emerald-400">1 139 248 800 UZS</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PAYOUTS */}
            {activeTab === 'payouts' && (
              <div className="bg-slate-950 rounded-3xl border border-slate-850 p-6 sm:p-8 animate-in fade-in duration-150" id="tab-payouts">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-lg font-display font-bold">{t.investorZone.monthlyDist}</h4>
                  <span className="text-[10px] font-mono text-slate-400">{t.investorZone.auditedBy}</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">{t.investorZone.monthCol}</th>
                        <th className="py-3 px-4">{t.investorZone.generationCol}</th>
                        <th className="py-3 px-4">{t.investorZone.revenueCol}</th>
                        <th className="py-3 px-4">{t.investorZone.payoutCol}</th>
                        <th className="py-3 px-4 text-right">{t.investorZone.statusCol}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {sampleInvestorData.map((row, index) => (
                        <tr key={index} id={`payout-row-${index}`} className="hover:bg-slate-900/50">
                          <td className="py-4 px-4 font-bold text-white">{row.month}</td>
                          <td className="py-4 px-4">{row.generation.toFixed(1)} MWh</td>
                          <td className="py-4 px-4 text-slate-400">{row.revenue}</td>
                          <td className="py-4 px-4 font-bold text-emerald-400">{row.payout}</td>
                          <td className="py-4 px-4 text-right">
                            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{t.investorZone.verified}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: DOCS */}
            {activeTab === 'docs' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-150" id="tab-docs">
                {t.investorZone.docs.map((doc, idx) => {
                  const colors = [
                    'bg-brand-orange/10 text-brand-orange',
                    'bg-sky-500/10 text-sky-400',
                    'bg-emerald-500/10 text-emerald-400',
                    'bg-purple-500/10 text-purple-400'
                  ];
                  return (
                    <div key={idx} className="bg-slate-950 rounded-2xl p-6 border border-slate-850 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className={`w-10 h-10 rounded-xl ${colors[idx % colors.length]} flex items-center justify-center`}>
                          <FileText className="w-5 h-5" />
                        </div>
                        <h4 className="font-display font-bold text-sm">{doc.title}</h4>
                        <p className="text-slate-400 text-xs leading-relaxed">{doc.desc}</p>
                      </div>
                      <button className="flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg py-2.5 text-xs font-mono font-bold cursor-pointer">
                        <Download className="w-4 h-4" />
                        <span>{doc.btnText}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
