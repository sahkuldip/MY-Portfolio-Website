import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Wrench, Server, Cpu, Database, Layout, Cloud, Search, CheckCircle2, Sparkles } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server': return Server;
      case 'Cpu': return Cpu;
      case 'Database': return Database;
      case 'Layout': return Layout;
      case 'Cloud': return Cloud;
      default: return Wrench;
    }
  };

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    if (activeCategory !== 'All' && cat.category !== activeCategory) {
      return null;
    }
    const matchingSkills = cat.skills.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.highlight.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.badge && s.badge.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (matchingSkills.length === 0) return null;
    return { ...cat, skills: matchingSkills };
  }).filter(Boolean);

  return (
    <section className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Wrench className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Technical Matrix & Deep Competencies
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Systematic overview of core frameworks, JVM runtime internals, distributed streaming, and modern web architectures.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter skills (e.g., Loom, Kafka, RLS)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs font-mono rounded-md bg-[#0c1626] border border-[#1f2a3c] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
            activeCategory === 'All'
              ? 'bg-blue-600 text-white font-medium'
              : 'bg-[#0c1626] hover:bg-[#111c2d] text-slate-400 hover:text-slate-200 border border-[#1f2a3c]'
          }`}
        >
          All Domains
        </button>
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(cat.category)}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === cat.category
                ? 'bg-blue-600 text-white font-medium'
                : 'bg-[#0c1626] hover:bg-[#111c2d] text-slate-400 hover:text-slate-200 border border-[#1f2a3c]'
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Skill Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCategories.map((cat) => {
          if (!cat) return null;
          const Icon = getCategoryIcon(cat.iconName);

          return (
            <div
              key={cat.category}
              className="rounded-xl bg-[#0c1626] border border-[#1f2a3c] p-5 sm:p-6 space-y-4 hover:border-[#334155] transition-all"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1f2a3c]">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded bg-[#111c2d] border border-[#334155] text-blue-400">
                    <Icon className="w-4 h-4" />
                  </span>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {cat.category}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {cat.skills.length} Technologies
                </span>
              </div>

              {/* Skills List with Progress & Details */}
              <div className="space-y-3.5">
                {cat.skills.map((skill, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#081425] border border-[#1f2a3c] hover:border-[#334155] transition-all space-y-2">
                    
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-semibold text-white font-mono">
                            {skill.name}
                          </span>
                          {skill.badge && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              {skill.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {skill.highlight}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-blue-400">
                          {skill.years} yrs exp
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-[#111c2d] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
