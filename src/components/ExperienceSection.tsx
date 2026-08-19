import React from 'react';
import { EXPERIENCE_HISTORY, EDUCATION_HISTORY } from '../data/portfolioData';
import { History, Building2, MapPin, Calendar, CheckCircle2, Award, ArrowUpRight, GraduationCap } from 'lucide-react';

interface ExperienceSectionProps {
  onViewResume?: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onViewResume }) => {
  return (
    <section className="space-y-10">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <History className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Work Experience & Academic Foundation
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Hands-on professional internship experience in backend development and rigorous computer science training.
          </p>
        </div>

        {onViewResume && (
          <button
            onClick={onViewResume}
            className="px-3.5 py-1.5 rounded bg-[#111c2d] hover:bg-[#152031] text-blue-400 border border-blue-500/30 text-xs font-mono font-medium flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>View Full ATS Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Part 1: Professional Experience Timeline */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-blue-400 uppercase font-mono tracking-wider flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          Professional Experience
        </h3>

        <div className="relative border-l-2 border-[#1f2a3c] ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-6">
          {EXPERIENCE_HISTORY.map((item) => (
            <div key={item.id} className="relative group">
              
              {/* Timeline Node Icon */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-blue-500 border-blue-400 ring-4 ring-blue-500/20 transition-all" />

              {/* Timeline Card */}
              <div className="rounded-xl bg-[#0c1626] border border-[#1f2a3c] hover:border-[#334155] p-5 sm:p-6 transition-all shadow-md">
                
                {/* Role & Company Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 pb-3 border-b border-[#1f2a3c]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {item.role}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Internship
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mt-1">
                      <span className="flex items-center gap-1 text-blue-300 font-semibold">
                        <Building2 className="w-3.5 h-3.5" />
                        {item.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#081425] px-3 py-1.5 rounded border border-[#1f2a3c] self-start lg:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{item.period}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300">{item.duration}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                  {item.summary}
                </p>

                {/* Key Deliverables Bullet List */}
                <div className="space-y-2 mt-4">
                  <h5 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">
                    Key Responsibilities & Deliverables:
                  </h5>
                  <ul className="space-y-1.5">
                    {item.achievements.map((ach, achIdx) => (
                      <li key={achIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Chips */}
                <div className="mt-5 pt-3 border-t border-[#1f2a3c] flex flex-wrap gap-1.5">
                  <span className="text-[11px] font-mono text-slate-400 self-center mr-1">Technologies Used:</span>
                  {item.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 text-[11px] font-mono rounded bg-[#111c2d] text-slate-300 border border-[#1f2a3c]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Education & Academic Trajectory */}
      <div className="space-y-4 pt-4 border-t border-[#1f2a3c]">
        <h3 className="text-sm font-bold text-emerald-400 uppercase font-mono tracking-wider flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          Education & Training
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EDUCATION_HISTORY.map((edu) => (
            <div
              key={edu.id}
              className="p-5 rounded-xl bg-[#0c1626] border border-[#1f2a3c] hover:border-[#334155] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-blue-400 font-semibold">{edu.period}</span>
                  {edu.isCurrent && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Ongoing
                    </span>
                  )}
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">{edu.degree}</h4>
                <p className="text-xs font-semibold text-slate-300 mt-1">{edu.institution}</p>
                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 mt-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{edu.location}</span>
                </div>
                {edu.details && (
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed border-t border-[#1f2a3c] pt-2">
                    {edu.details}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
