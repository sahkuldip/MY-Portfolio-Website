import React, { useState } from 'react';
import { Terminal, Shield, Cpu, FolderGit2, History, Wrench, BarChart3, FileText, Send, Menu, X, ChevronRight, Upload, Camera } from 'lucide-react';
import { ScreenTab } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useMedia } from '../context/MediaContext';

interface NavbarProps {
  activeTab: ScreenTab;
  setActiveTab: (tab: ScreenTab) => void;
  onOpenTerminal: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenTerminal,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { profilePhoto, openUploadModal, uploadedResume } = useMedia();

  const navItems: { tab: ScreenTab; label: string; icon: React.ElementType }[] = [
    { tab: 'overview', label: 'Overview', icon: Shield },
    { tab: 'architecture', label: 'Architecture Lab', icon: Cpu },
    { tab: 'projects', label: 'Projects', icon: FolderGit2 },
    { tab: 'experience', label: 'Experience', icon: History },
    { tab: 'skills', label: 'Skills Matrix', icon: Wrench },
    { tab: 'benchmarks', label: 'Benchmarks', icon: BarChart3 },
    { tab: 'resume', label: 'Resume', icon: FileText },
    { tab: 'contact', label: 'Contact', icon: Send },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-nav border-b border-[#1f2a3c] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Avatar Identity */}
          <div className="flex items-center gap-3">
            
            {/* Clickable Profile Photo with Upload Trigger */}
            <div className="relative group">
              <button
                onClick={() => openUploadModal('photo')}
                className="w-10 h-10 rounded-full overflow-hidden border border-[#334155] group-hover:border-blue-500 bg-[#0f172a] flex items-center justify-center text-blue-400 transition-all cursor-pointer shadow-inner relative"
                title="Click to change profile photo"
              >
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-mono text-xs font-bold">&gt;_</span>
                )}
                
                {/* Hover Camera Overlay */}
                <div className="absolute inset-0 bg-blue-600/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
              id="brand-logo-btn"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white tracking-tight text-base sm:text-lg group-hover:text-blue-400 transition-colors">
                    {PERSONAL_INFO.name}
                  </span>
                  <span className="hidden xl:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Java • Spring Boot • ReactJS
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block font-mono">
                  {PERSONAL_INFO.role}
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => setActiveTab(item.tab)}
                  id={`nav-link-${item.tab}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm shadow-blue-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-[#152031] border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            
            {/* Upload Photo / Resume Trigger */}
            <button
              onClick={() => openUploadModal('photo')}
              id="header-upload-btn"
              title="Upload Profile Photo or Resume PDF"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-md bg-[#111c2d] hover:bg-[#152031] border border-[#334155] text-slate-200 hover:text-white transition-all cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span>Upload Photo / CV</span>
              {(profilePhoto || uploadedResume) && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              )}
            </button>

            {/* Terminal launcher */}
            <button
              onClick={onOpenTerminal}
              id="header-terminal-btn"
              title="Launch CLI Emulator"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-md bg-[#111c2d] border border-[#334155] text-slate-300 hover:text-blue-400 hover:border-blue-500/50 transition-all cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>CLI</span>
            </button>

            {/* Availability Badge */}
            <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 text-xs rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium text-[11px]">Ready to Join</span>
            </div>

            <button
              onClick={onOpenContact}
              id="header-consult-btn"
              className="px-3.5 py-1.5 text-xs font-semibold rounded bg-blue-600 text-white hover:bg-blue-500 active:scale-95 transition-all shadow-md shadow-blue-600/20 cursor-pointer flex items-center gap-1.5"
            >
              <span>Schedule Call</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => openUploadModal('photo')}
              className="p-2 rounded-md bg-[#111c2d] border border-[#334155] text-emerald-400"
              title="Upload Photo / Resume"
            >
              <Upload className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-md bg-[#111c2d] border border-[#334155] text-blue-400"
              aria-label="Open Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md bg-[#111c2d] border border-[#334155] text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
              id="mobile-nav-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#1f2a3c] bg-[#081425] px-4 pt-3 pb-5 space-y-2 shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2a3c] px-2 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for Full-Time Roles</span>
            </div>
            <button
              onClick={() => {
                openUploadModal('photo');
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono text-blue-400 flex items-center gap-1"
            >
              <Upload className="w-3 h-3" /> Upload Photo/Resume
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => {
                    setActiveTab(item.tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-all text-left ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:bg-[#152031] border border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                openUploadModal('resume');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 text-xs font-mono font-medium rounded bg-[#111c2d] text-emerald-400 border border-emerald-500/30 text-center flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Upload / Manage Resume PDF</span>
            </button>

            <button
              onClick={() => {
                onOpenContact();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-xs font-semibold rounded bg-blue-600 text-white hover:bg-blue-500 text-center"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
