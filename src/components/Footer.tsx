import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Shield, Terminal, ArrowUp, Github, Linkedin, Mail, Phone, Cpu, CheckCircle2 } from 'lucide-react';
import { ScreenTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: ScreenTab) => void;
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenTerminal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050d18] border-t border-[#1f2a3c] text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Top Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#1f2a3c]">
          
          {/* Identity Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#0f172a] border border-[#334155] flex items-center justify-center text-blue-400 text-xs font-bold font-mono">
                &gt;_
              </div>
              <span className="font-bold text-white text-sm tracking-tight">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md font-sans">
              Aspiring Java Full Stack Developer specializing in Java, Spring Boot REST APIs, ReactJS dynamic frontends, MySQL databases, and full stack web architecture.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for Full-Time Roles & Opportunities</span>
            </div>
          </div>

          {/* Quick Nav Column */}
          <div className="space-y-2">
            <span className="text-slate-300 font-bold uppercase tracking-wider block">
              Portfolio Views
            </span>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => onSelectTab('projects')} className="hover:text-blue-400 cursor-pointer">
                  • Full Stack Projects
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('experience')} className="hover:text-blue-400 cursor-pointer">
                  • Work Experience & Education
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('skills')} className="hover:text-blue-400 cursor-pointer">
                  • Technical Skills Matrix
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('resume')} className="hover:text-blue-400 cursor-pointer">
                  • ATS-Formatted Resume
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & System Column */}
          <div className="space-y-2">
            <span className="text-slate-300 font-bold uppercase tracking-wider block">
              Direct Contact
            </span>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={onOpenTerminal} className="hover:text-blue-400 flex items-center gap-1 cursor-pointer">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" /> CLI Terminal
                </button>
              </li>
              <li>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-blue-400 flex items-center gap-1">
                  <Github className="w-3.5 h-3.5 text-slate-400" /> GitHub (@sahkuldip)
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400 flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" /> LinkedIn Profile
                </a>
              </li>
              <li>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-blue-400 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-blue-400" /> {PERSONAL_INFO.email}
                </a>
              </li>
              <li>
                <a href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-emerald-400 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" /> {PERSONAL_INFO.phone}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Metadata row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-4">
            <span>Portfolio of Kuldip Sah</span>
            <span>•</span>
            <span>Java • Spring Boot • React • MySQL</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Location: {PERSONAL_INFO.location}</span>
            <button
              onClick={scrollToTop}
              id="scroll-to-top-btn"
              className="p-1.5 rounded bg-[#0c1626] border border-[#1f2a3c] text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1"
              title="Return to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
