import React, { useState } from 'react';
import { MapPin, Phone, Mail, FileSpreadsheet, Send, MessageSquare, Check } from 'lucide-react';
import { Translation } from '../translations';

interface ContactProps {
  t: Translation;
  consultationTrigger: boolean;
}

export default function Contact({ t, consultationTrigger }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (consultationTrigger) {
      setMsg(t.contact.interestPrefill);
      const formEl = document.getElementById('contact-form-card');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [consultationTrigger, t.contact.interestPrefill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMsg('');
    }, 800);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 border-b border-slate-100" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="contact-heading">
          <h2 className="text-sm font-mono text-brand-orange font-bold uppercase tracking-[0.25em] mb-2">{t.contact.badge}</h2>
          <p className="text-3xl sm:text-4xl font-display font-bold text-brand-blue tracking-tight">
            {t.contact.subtitle}
          </p>
          <div className="flex justify-center gap-1.5 mt-4">
            <div className="w-2.5 h-2.5 bg-brand-orange" />
            <div className="w-10 h-2.5 bg-slate-900" />
            <div className="w-2.5 h-2.5 bg-brand-orange" />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start" id="contact-main-grid">
          {/* Office Credentials & Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-brand-blue tracking-tight">{t.contact.deskTitle}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t.contact.deskDesc}
              </p>
            </div>

            <div className="space-y-5" id="contact-credentials-list">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/5 border border-slate-200 text-brand-blue flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-400 font-bold uppercase">{t.contact.addressLabel}</span>
                  <span className="text-slate-700 text-sm font-medium">{t.contact.addressValue}</span>
                </div>
              </div>

              {/* Phones */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/5 border border-slate-200 text-brand-blue flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-400 font-bold uppercase">{t.contact.phoneLabel}</span>
                  <span className="text-slate-700 text-sm font-mono font-medium block">+998 (90) 123-45-67</span>
                  <span className="text-slate-700 text-sm font-mono font-medium block">+998 (95) 987-65-43</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/5 border border-slate-200 text-brand-blue flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-400 font-bold uppercase">{t.contact.emailLabel}</span>
                  <span className="text-slate-700 text-sm font-mono font-medium">info@unisolar.uz</span>
                </div>
              </div>

              {/* TIN (STIR) */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/5 border border-slate-200 text-brand-blue flex items-center justify-center shrink-0 mt-0.5">
                  <FileSpreadsheet className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-400 font-bold uppercase">{t.contact.tinLabel}</span>
                  <span className="text-slate-700 text-sm font-mono font-medium">312 853 539</span>
                </div>
              </div>
            </div>

            {/* Social Networks List */}
            <div className="space-y-3" id="social-accounts">
              <h4 className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">{t.contact.socialLabel}</h4>
              <div className="flex space-x-3">
                <a
                  href="https://t.me/unisolar"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-white hover:bg-sky-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-600 hover:text-sky-600 hover:border-sky-300 transition-colors"
                >
                  Telegram
                </a>
                <a
                  href="https://linkedin.com/company/unisolar"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-white hover:bg-blue-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://instagram.com/unisolar"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-white hover:bg-pink-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-600 hover:text-pink-600 hover:border-pink-300 transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form Card */}
          <div className="lg:col-span-7" id="contact-form-card">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs">
              <h3 className="text-xl font-display font-bold text-brand-blue mb-6 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-brand-orange" />
                <span>{t.contact.formHeading}</span>
              </h3>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-6 h-6" />
                  </div>
                  <p className="text-emerald-800 text-sm font-medium leading-relaxed">
                    {t.contact.formSuccess}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono font-bold text-emerald-700 hover:underline hover:text-emerald-900 cursor-pointer"
                  >
                    {t.contact.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" id="form-inquiry">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-500 font-bold uppercase">{t.contact.formName} *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nodirbek Nematov"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue bg-slate-50 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-500 font-bold uppercase">{t.contact.formEmail} *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nodirbek@unisolar.uz"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue bg-slate-50 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-500 font-bold uppercase">{t.contact.formPhone}</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 (90) 123-45-67"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue bg-slate-50 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-500 font-bold uppercase">{t.contact.formMsg}</label>
                    <textarea
                      rows={4}
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder="..."
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue bg-slate-50 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2 bg-brand-blue hover:bg-brand-blue-light text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "..." : t.contact.formSubmit}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
