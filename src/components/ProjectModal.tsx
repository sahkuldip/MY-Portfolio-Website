import React, { useState } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Copy, Check, Server, Layers, Cpu, Database, Activity, Shield } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copiedCode, setCopiedCode] = useState(false);

  if (!project) return null;

  const handleCopy = () => {
    if (project.codeSnippet?.code) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#0c1626] border border-[#334155] rounded-xl shadow-2xl overflow-hidden my-8 text-[#d8e3fb]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-6 border-b border-[#1f2a3c] bg-[#081425] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Featured Case Study
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            id="close-project-modal-btn"
            className="p-2 rounded-lg bg-[#111c2d] hover:bg-[#152031] text-slate-400 hover:text-white border border-[#334155] transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#111c2d] border border-[#1f2a3c]">
                <div className="text-xs text-slate-400 font-mono">{metric.label}</div>
                <div className="text-lg font-bold text-white font-mono mt-0.5 text-blue-400">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Narrative & Architecture Summary */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-2 text-slate-300">
              System Architecture & Problem Statement
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Architecture Specs Breakdown */}
          <div className="p-4 rounded-lg bg-[#081425] border border-[#1f2a3c] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-400 block">Architectural Pattern:</span>
              <span className="text-blue-300 font-medium">{project.architectureDetails.pattern}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Target Throughput:</span>
              <span className="text-emerald-400 font-medium">{project.architectureDetails.throughput}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Resilience & Failover:</span>
              <span className="text-amber-300 font-medium">{project.architectureDetails.resilienceStrategy}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Persistent Stores:</span>
              <span className="text-purple-300 font-medium">{project.architectureDetails.dataStore}</span>
            </div>
          </div>

          {/* ASCII Architecture Topology if available */}
          {project.architectureAscii && (
            <div>
              <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider mb-2">
                Distributed Dataflow Blueprint
              </h3>
              <div className="p-4 rounded-lg bg-[#060c18] border border-[#1f2a3c] overflow-x-auto text-[11px] font-mono leading-tight text-blue-300">
                <pre>{project.architectureAscii}</pre>
              </div>
            </div>
          )}

          {/* Key Engineering Highlights */}
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider mb-2">
              Key Architectural Contributions & Hard Problems Solved
            </h3>
            <ul className="space-y-2">
              {project.keyHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Snippet if available */}
          {project.codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">
                  Implementation: <span className="text-blue-400">{project.codeSnippet.filename}</span>
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono bg-[#111c2d] hover:bg-[#152031] text-slate-300 rounded border border-[#334155] cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-lg bg-[#060c18] border border-[#1f2a3c] overflow-x-auto text-xs font-mono leading-relaxed max-h-[280px]">
                <pre className="text-slate-300">
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Technology Tags */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider mb-2">
              Full Technology Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-[#111c2d] text-slate-200 border border-[#1f2a3c]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Impact Statement */}
          <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs">
            <span className="font-bold text-emerald-400 block mb-1">Production Impact:</span>
            <p className="text-slate-200">{project.impactSummary}</p>
          </div>

        </div>

        {/* Modal Footer Links */}
        <div className="p-4 border-t border-[#1f2a3c] bg-[#081425] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded bg-[#111c2d] hover:bg-[#152031] text-slate-300 hover:text-white border border-[#334155]"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Repository</span>
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Architecture Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded bg-[#1e293b] hover:bg-[#334155] text-slate-200 cursor-pointer"
          >
            Close Case Study
          </button>
        </div>

      </div>
    </div>
  );
};
