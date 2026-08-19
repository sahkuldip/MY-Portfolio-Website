import React, { useState, useEffect } from 'react';
import { ScreenTab } from './types';
import { Navbar } from './components/Navbar';
import { ScreenSwitcher } from './components/ScreenSwitcher';
import { HeroSection } from './components/HeroSection';
import { ArchitectureSimulator } from './components/ArchitectureSimulator';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { BenchmarksSection } from './components/BenchmarksSection';
import { ResumeView } from './components/ResumeView';
import { ContactSection } from './components/ContactSection';
import { TerminalModal } from './components/TerminalModal';
import { UploadModal } from './components/UploadModal';
import { Footer } from './components/Footer';
import { MediaProvider, useMedia } from './context/MediaContext';
import { Terminal, Send, ArrowUp, Cpu, Sparkles, Layers, Upload, Camera } from 'lucide-react';

function PortfolioAppContent() {
  const [activeTab, setActiveTab] = useState<ScreenTab>('overview');
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const { openUploadModal } = useMedia();

  // Scroll to top on tab change
  const handleTabChange = (tab: ScreenTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut listener: Cmd/Ctrl + K or ` to open terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#081425] text-[#d8e3fb] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Glassmorphic Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenContact={() => handleTabChange('contact')}
      />

      {/* Screen / View Selector Bar */}
      <ScreenSwitcher
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />

      {/* Dynamic Screen Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* Screen 1: Full Comprehensive Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-16">
            <HeroSection
              onExploreArchitecture={() => handleTabChange('architecture')}
              onViewProjects={() => handleTabChange('projects')}
              onOpenContact={() => handleTabChange('contact')}
              onOpenTerminal={() => setTerminalOpen(true)}
            />

            {/* Architecture Lab Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">Live Sandbox</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Microservices Architecture & Concurrency Lab
                  </h2>
                </div>
                <button
                  onClick={() => handleTabChange('architecture')}
                  className="text-xs font-mono text-blue-400 hover:underline cursor-pointer"
                >
                  Expand Full Lab &gt;
                </button>
              </div>
              <ArchitectureSimulator />
            </div>

            {/* Production Case Studies Section */}
            <div className="space-y-4">
              <ProjectsSection />
            </div>

            {/* Career Timeline Section */}
            <div className="space-y-4">
              <ExperienceSection onViewResume={() => handleTabChange('resume')} />
            </div>

            {/* Skills Matrix Section */}
            <div className="space-y-4">
              <SkillsSection />
            </div>

            {/* Benchmarks Section */}
            <div className="space-y-4">
              <BenchmarksSection />
            </div>

            {/* Contact & Consultation Section */}
            <div className="space-y-4">
              <ContactSection />
            </div>
          </div>
        )}

        {/* Screen 2: Interactive Architecture Lab */}
        {activeTab === 'architecture' && (
          <div className="space-y-6 animate-fadeIn">
            <ArchitectureSimulator />
          </div>
        )}

        {/* Screen 3: Case Studies & Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-fadeIn">
            <ProjectsSection />
          </div>
        )}

        {/* Screen 4: Experience & Career Timeline */}
        {activeTab === 'experience' && (
          <div className="space-y-6 animate-fadeIn">
            <ExperienceSection onViewResume={() => handleTabChange('resume')} />
          </div>
        )}

        {/* Screen 5: Skills Matrix */}
        {activeTab === 'skills' && (
          <div className="space-y-6 animate-fadeIn">
            <SkillsSection />
          </div>
        )}

        {/* Screen 6: System Benchmarks */}
        {activeTab === 'benchmarks' && (
          <div className="space-y-6 animate-fadeIn">
            <BenchmarksSection />
          </div>
        )}

        {/* Screen 7: CLI Sandbox Screen */}
        {activeTab === 'terminal' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="rounded-xl bg-[#0c1626] border border-[#1f2a3c] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-blue-400" />
                    Interactive Developer CLI Terminal
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    Execute simulated system commands, inspect JVM properties, and run benchmarks.
                  </p>
                </div>
                <button
                  onClick={() => setTerminalOpen(true)}
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold cursor-pointer"
                >
                  Open Dedicated Overlay Terminal
                </button>
              </div>

              <div className="p-4 rounded-lg bg-[#081425] border border-[#1f2a3c] font-mono text-xs text-slate-300 space-y-2">
                <p className="text-blue-400 font-bold">Quick Command Reference:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
                  <li><span className="text-emerald-400">cat resume.json</span> - Print ATS profile in JSON</li>
                  <li><span className="text-emerald-400">skills</span> - Full engineering matrix</li>
                  <li><span className="text-emerald-400">projects</span> - Production projects list</li>
                  <li><span className="text-emerald-400">experience</span> - Internship & work history</li>
                  <li><span className="text-emerald-400">education</span> - Degree & training</li>
                  <li><span className="text-emerald-400">whoami</span> - Developer persona</li>
                </ul>
              </div>

              <button
                onClick={() => setTerminalOpen(true)}
                className="w-full py-4 rounded-lg bg-[#0a111e] border border-blue-500/30 hover:border-blue-500 text-blue-400 font-mono text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-inner"
              >
                <Terminal className="w-4 h-4" />
                <span>Click to Launch Terminal Environment (or press Ctrl+K / `)</span>
              </button>
            </div>
          </div>
        )}

        {/* Screen 8: Resume & ATS Export */}
        {activeTab === 'resume' && (
          <div className="space-y-6 animate-fadeIn">
            <ResumeView onOpenContact={() => handleTabChange('contact')} />
          </div>
        )}

        {/* Screen 9: Consultation & Contact */}
        {activeTab === 'contact' && (
          <div className="space-y-6 animate-fadeIn">
            <ContactSection />
          </div>
        )}

      </main>

      {/* Floating Action Buttons: Quick Upload & Terminal Launcher */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5">
        <button
          onClick={() => openUploadModal('photo')}
          id="floating-upload-fab"
          className="p-3 rounded-full bg-[#0f172a] hover:bg-[#152031] text-emerald-400 border border-[#334155] shadow-2xl hover:border-emerald-500 transition-all cursor-pointer group flex items-center gap-2"
          title="Upload Profile Photo or Resume"
        >
          <Upload className="w-4 h-4" />
          <span className="text-xs font-mono pr-1 hidden group-hover:inline">Upload</span>
        </button>

        <button
          onClick={() => setTerminalOpen(true)}
          id="floating-terminal-fab"
          className="p-3 rounded-full bg-[#0f172a] hover:bg-[#152031] text-blue-400 border border-[#334155] shadow-2xl hover:border-blue-500 transition-all cursor-pointer group flex items-center gap-2"
          title="Open Developer Terminal (Ctrl+K)"
        >
          <Terminal className="w-4 h-4" />
          <span className="text-xs font-mono pr-1 hidden group-hover:inline">CLI</span>
        </button>
      </div>

      {/* Interactive Profile Photo & Resume Upload Modal */}
      <UploadModal />

      {/* Interactive Terminal Modal Overlay */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenContact={() => handleTabChange('contact')}
      />

      {/* Global Footer */}
      <Footer
        onSelectTab={handleTabChange}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

    </div>
  );
}

export default function App() {
  return (
    <MediaProvider>
      <PortfolioAppContent />
    </MediaProvider>
  );
}
