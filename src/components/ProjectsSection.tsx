import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { 
  FolderGit2, ExternalLink, Github, ArrowUpRight, Search, 
  Layers, Cpu, Server, Activity, ChevronRight 
} from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject?: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    'All',
    'Distributed Systems',
    'Spring Boot & Java 21',
    'Full Stack Web',
    'Cloud & DevOps'
  ];

  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesSearch = 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <FolderGit2 className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Featured Case Studies & Production Architectures
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Enterprise systems engineered with strict performance SLAs, high throughput, and zero-downtime tolerance.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tech, Kafka, K8s..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs font-mono rounded-md bg-[#0c1626] border border-[#1f2a3c] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            id={`filter-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white font-medium shadow-sm'
                : 'bg-[#0c1626] hover:bg-[#111c2d] text-slate-400 hover:text-slate-200 border border-[#1f2a3c]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl bg-[#0c1626] border border-[#1f2a3c] hover:border-[#334155] p-5 sm:p-6 flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-blue-500/5 relative"
          >
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Production Proven
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                {project.subtitle}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 pt-3 border-t border-[#1f2a3c]">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="p-2 rounded bg-[#081425] border border-[#1f2a3c]">
                    <div className="text-[10px] text-slate-400 font-mono">{metric.label}</div>
                    <div className="text-xs sm:text-sm font-bold text-white font-mono mt-0.5 text-blue-400">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Architecture Highlight Box */}
              <div className="p-3 rounded bg-[#081425] border border-[#1f2a3c] mb-4 text-xs font-mono text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Pattern:</span>
                  <span className="text-blue-300 font-medium truncate ml-2">{project.architectureDetails.pattern}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Throughput:</span>
                  <span className="text-emerald-400 font-medium">{project.architectureDetails.throughput}</span>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.technologies.slice(0, 6).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[11px] font-mono rounded bg-[#111c2d] text-slate-300 border border-[#1f2a3c]"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 6 && (
                  <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-[#111c2d] text-slate-400 border border-[#1f2a3c]">
                    +{project.technologies.length - 6} more
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#1f2a3c] flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveModalProject(project)}
                id={`btn-inspect-${project.id}`}
                className="px-3.5 py-1.5 rounded bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Deep Dive Architecture</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded bg-[#081425] hover:bg-[#111c2d] text-slate-400 hover:text-white border border-[#1f2a3c] transition-all"
                    title="View Source on GitHub"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded bg-[#081425] hover:bg-[#111c2d] text-slate-400 hover:text-white border border-[#1f2a3c] transition-all"
                    title="Open Live Architecture Demo"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Deep Dive Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />

    </section>
  );
};
