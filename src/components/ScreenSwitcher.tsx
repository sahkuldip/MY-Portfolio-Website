import React from 'react';
import { ScreenTab } from '../types';
import { LayoutGrid, Cpu, FolderGit2, History, Wrench, BarChart3, Terminal, FileText, Send } from 'lucide-react';

interface ScreenSwitcherProps {
  activeTab: ScreenTab;
  setActiveTab: (tab: ScreenTab) => void;
}

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({ activeTab, setActiveTab }) => {
  const screens: { id: ScreenTab; label: string; badge?: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Full Showcase', icon: LayoutGrid },
    { id: 'architecture', label: 'Architecture Lab', badge: 'Live Sim', icon: Cpu },
    { id: 'projects', label: 'Case Studies', badge: '4 Systems', icon: FolderGit2 },
    { id: 'experience', label: 'Career Timeline', icon: History },
    { id: 'skills', label: 'Skills Matrix', icon: Wrench },
    { id: 'benchmarks', label: 'System Benchmarks', badge: 'Loom vs Thread', icon: BarChart3 },
    { id: 'terminal', label: 'CLI Sandbox', badge: 'Interactive', icon: Terminal },
    { id: 'resume', label: 'Resume Spec', icon: FileText },
    { id: 'contact', label: 'Consultation & Hire', icon: Send },
  ];

  return (
    <div className="w-full bg-[#081425] border-b border-[#1f2a3c] sticky top-16 sm:top-20 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none no-scrollbar">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider whitespace-nowrap pl-1 pr-2 hidden sm:inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Screen Views:
          </span>
          {screens.map((screen) => {
            const Icon = screen.icon;
            const isActive = activeTab === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => setActiveTab(screen.id)}
                id={`screen-tab-${screen.id}`}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1e293b] text-blue-400 border border-blue-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#111c2d] border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span>{screen.label}</span>
                {screen.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      isActive
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                        : 'bg-[#152031] text-slate-400 border border-[#334155]'
                    }`}
                  >
                    {screen.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
