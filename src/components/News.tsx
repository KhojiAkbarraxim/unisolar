import React from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { Translation } from '../translations';

interface NewsProps {
  t: Translation;
}

export default function News({ t }: NewsProps) {
  const newsItems = t.news.items;

  return (
    <section id="news" className="py-24 bg-white border-b border-slate-100" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="news-heading">
          <h2 className="text-sm font-mono text-brand-orange font-bold uppercase tracking-[0.25em] mb-2">{t.news.badge}</h2>
          <p className="text-3xl sm:text-4xl font-display font-bold text-brand-blue tracking-tight">
            {t.news.title}
          </p>
          <div className="flex justify-center gap-1.5 mt-4">
            <div className="w-2.5 h-2.5 bg-brand-orange" />
            <div className="w-10 h-2.5 bg-slate-900" />
            <div className="w-2.5 h-2.5 bg-brand-orange" />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8" id="news-grid">
          {newsItems.map((item, index) => (
            <article
              key={index}
              id={`news-item-${index}`}
              className="group bg-slate-50 border border-slate-200/80 rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Photo */}
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/60 backdrop-blur-xs text-brand-orange text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border border-white/10">
                    {item.category}
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-brand-blue tracking-tight leading-snug group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Read More button */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-mono text-brand-blue font-bold group-hover:text-brand-orange cursor-pointer">
                <span>{t.news.readMore}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
