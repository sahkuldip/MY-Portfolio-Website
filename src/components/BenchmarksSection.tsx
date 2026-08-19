import React from 'react';
import { BENCHMARKS } from '../data/portfolioData';
import { BarChart3, Zap, CheckCircle2, TrendingUp, Cpu, Server, Layers } from 'lucide-react';

export const BenchmarksSection: React.FC = () => {
  return (
    <section className="space-y-6">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <BarChart3 className="w-4 h-4" />
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            System Performance Benchmarks & Architectural Empirical Data
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Empirical load testing datasets comparing concurrency models, caching tiers, and JVM memory efficiency under enterprise peak loads.
        </p>
      </div>

      {/* Benchmarks Grid */}
      <div className="space-y-6">
        {BENCHMARKS.map((bench, idx) => (
          <div
            key={idx}
            className="rounded-xl bg-[#0c1626] border border-[#1f2a3c] p-5 sm:p-6 space-y-5"
          >
            {/* Title & Setup Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-[#1f2a3c]">
              <div>
                <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">
                  Benchmark Suite #{idx + 1}
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {bench.title}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">{bench.subtitle}</p>
              </div>

              <div className="p-2.5 rounded bg-[#081425] border border-[#1f2a3c] text-xs font-mono text-slate-400 self-start lg:self-auto max-w-md">
                <span className="text-slate-500 block text-[10px]">Test Environment:</span>
                <span className="text-slate-300">{bench.description}</span>
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="space-y-4">
              {bench.comparison.map((item, cIdx) => (
                <div key={cIdx} className="p-4 rounded-lg bg-[#081425] border border-[#1f2a3c] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-xs sm:text-sm font-semibold text-white font-mono">
                      {item.name}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 self-start sm:self-auto font-bold">
                      {item.improvement}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400">{item.details}</p>

                  {/* Dual Bar Representation */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="w-24 text-slate-400 shrink-0 text-[11px]">Baseline:</span>
                      <div className="flex-1 h-3 bg-[#111c2d] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-slate-600 rounded-full"
                          style={{ width: `${Math.min(100, (item.baseline / Math.max(item.baseline, item.optimized)) * 100)}%` }}
                        />
                      </div>
                      <span className="w-20 text-right text-slate-400 shrink-0 text-[11px]">
                        {item.baseline.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="w-24 text-blue-400 font-semibold shrink-0 text-[11px]">Optimized:</span>
                      <div className="flex-1 h-3 bg-[#111c2d] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                          style={{ width: `${Math.min(100, (item.optimized / Math.max(item.baseline, item.optimized)) * 100)}%` }}
                        />
                      </div>
                      <span className="w-20 text-right text-blue-400 font-bold shrink-0 text-[11px]">
                        {item.optimized.toLocaleString()}
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Verdict Box */}
            <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-400 font-mono">Architectural Recommendation: </span>
                <span className="text-slate-200">{bench.verdict}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
