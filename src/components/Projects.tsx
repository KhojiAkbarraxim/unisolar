import React, { useState } from 'react';
import { Layers, MapPin, Zap, Layers3, Activity } from 'lucide-react';
import { Translation, sampleProjects, Project } from '../translations';

interface ProjectsProps {
  t: Translation;
}

export default function Projects({ t }: ProjectsProps) {
  const [filter, setFilter] = useState<'all' | 'completed' | 'ongoing' | 'planned'>('all');

  const filteredProjects = sampleProjects.filter(project => {
    if (filter === 'all') return true;
    return project.status === filter;
  });

  return (
    <section id="projects" className="py-24 bg-white border-b border-slate-100" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="projects-heading">
          <h2 className="text-sm font-mono text-brand-orange font-bold uppercase tracking-[0.25em] mb-2">05 // {t.projects.title}</h2>
          <p className="text-3xl sm:text-4xl font-display font-bold text-brand-blue tracking-tight">
            Our Certified Infrastructure Projects
          </p>
          <div className="flex justify-center gap-1.5 mt-4">
            <div className="w-2.5 h-2.5 bg-brand-orange" />
            <div className="w-10 h-2.5 bg-slate-900" />
            <div className="w-2.5 h-2.5 bg-brand-orange" />
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12" id="projects-filter-bar">
          <button
            id="filter-btn-all"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-brand-blue text-white shadow-md'
                : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Projects
          </button>
          <button
            id="filter-btn-completed"
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center space-x-1.5 ${
              filter === 'completed'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            <span>{t.projects.statusCompleted}</span>
          </button>
          <button
            id="filter-btn-ongoing"
            onClick={() => setFilter('ongoing')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center space-x-1.5 ${
              filter === 'ongoing'
                ? 'bg-brand-orange text-slate-950 font-bold shadow-md'
                : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>{t.projects.statusOngoing}</span>
          </button>
          <button
            id="filter-btn-planned"
            onClick={() => setFilter('planned')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center space-x-1.5 ${
              filter === 'planned'
                ? 'bg-slate-800 text-white shadow-md'
                : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>{t.projects.statusPlanned}</span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8" id="projects-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.name}
              id={`project-card-${index}`}
              className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-150 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              {/* Photo Area */}
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase shadow-md ${
                    project.status === 'completed'
                      ? 'bg-emerald-500 text-white'
                      : project.status === 'ongoing'
                      ? 'bg-brand-orange text-slate-950'
                      : 'bg-slate-700 text-slate-100'
                  }`}>
                    {project.status === 'completed' && t.projects.statusCompleted}
                    {project.status === 'ongoing' && t.projects.statusOngoing}
                    {project.status === 'planned' && t.projects.statusPlanned}
                  </span>
                </div>

                {/* Capacity Label */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-1.5 bg-slate-950/60 backdrop-blur-xs px-3 py-1 rounded-lg text-white font-mono text-xs font-bold border border-white/10">
                  <Zap className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{project.capacity}</span>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-1 text-xs font-mono text-slate-450">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-brand-blue tracking-tight leading-snug group-hover:text-brand-orange transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technical properties */}
                <div className="border-t border-slate-200/60 pt-4 grid grid-cols-2 gap-4 text-xs font-mono text-slate-500">
                  <div>
                    <span className="block font-bold text-brand-blue">{t.projects.panelsLabel}</span>
                    <span>{project.panels.split(' (')[0]}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-brand-blue">{t.projects.invertersLabel}</span>
                    <span>{project.inverters}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
