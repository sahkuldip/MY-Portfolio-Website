import React, { useState, useEffect } from 'react';
import { 
  Play, RotateCcw, AlertTriangle, Zap, ShieldAlert, Activity, CheckCircle2, 
  Server, Database, Cpu, Layers, HardDrive, Terminal, RefreshCw, Info, Flame
} from 'lucide-react';
import { TOPOLOGY_NODES_INITIAL, MOCK_LOGS } from '../data/portfolioData';
import { TopologyNode, SystemLog } from '../types';

export const ArchitectureSimulator: React.FC = () => {
  const [nodes, setNodes] = useState<TopologyNode[]>(TOPOLOGY_NODES_INITIAL);
  const [selectedNode, setSelectedNode] = useState<TopologyNode>(TOPOLOGY_NODES_INITIAL[3]); // Banking core default
  const [concurrencyModel, setConcurrencyModel] = useState<'virtual_threads' | 'platform_threads'>('virtual_threads');
  const [simState, setSimState] = useState<'normal' | 'surge' | 'db_slow' | 'circuit_open'>('normal');
  const [logs, setLogs] = useState<SystemLog[]>(() => 
    MOCK_LOGS.map((l, i) => ({
      id: `log-${i}`,
      timestamp: new Date(Date.now() - (6 - i) * 2000).toLocaleTimeString(),
      level: l.level,
      service: l.service,
      message: l.message
    }))
  );

  // Simulated metrics tick
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((node) => {
          let rpsNoise = (Math.random() - 0.5) * (node.rps * 0.05);
          let latencyNoise = (Math.random() - 0.5) * 0.4;
          let newRps = Math.max(100, Math.round(node.rps + rpsNoise));
          let newLat = +(Math.max(0.2, node.latencyMs + latencyNoise)).toFixed(2);

          // If platform threads during surge, latency explodes due to thread contention
          if (concurrencyModel === 'platform_threads' && simState === 'surge' && node.id === 'svc-core') {
            newLat = +(newLat * 4.2).toFixed(2);
          }

          return {
            ...node,
            rps: newRps,
            latencyMs: newLat
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [concurrencyModel, simState]);

  const addLog = (level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG', service: string, message: string) => {
    const newLog: SystemLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString(),
      level,
      service,
      message
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 19)]);
  };

  const handleTrafficSurge = () => {
    setSimState('surge');
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === 'gw-1' || n.id === 'client-1') {
          return { ...n, rps: 38000, cpuPercent: 68, latencyMs: 4.8 };
        }
        if (n.id === 'svc-core') {
          return {
            ...n,
            rps: 32000,
            cpuPercent: concurrencyModel === 'virtual_threads' ? 52 : 94,
            latencyMs: concurrencyModel === 'virtual_threads' ? 7.8 : 34.5,
            instances: 12
          };
        }
        if (n.id === 'cache-1') {
          return { ...n, rps: 72000, cpuPercent: 42, latencyMs: 0.9 };
        }
        if (n.id === 'kafka-1') {
          return { ...n, rps: 45000, cpuPercent: 64, latencyMs: 1.4 };
        }
        return n;
      })
    );

    addLog('WARN', 'TrafficEngine', 'Simulated 10x traffic spike initiated: 140k cluster QPS generated');
    if (concurrencyModel === 'virtual_threads') {
      addLog('INFO', 'Java21Loom', 'Virtual thread executor spawned 12,500 lightweight fibers. Zero thread-starvation detected.');
    } else {
      addLog('WARN', 'PlatformThreads', 'OS thread pool reached max capacity (500 threads). Queue wait time spiking!');
    }
  };

  const handleInjectDbLag = () => {
    setSimState('db_slow');
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === 'db-1') {
          return { ...n, status: 'degraded', latencyMs: 480.0, cpuPercent: 89 };
        }
        if (n.id === 'svc-core') {
          return { ...n, latencyMs: 180.0, status: 'degraded' };
        }
        return n;
      })
    );

    addLog('ERROR', 'PostgreSQL-Shard-2', 'Disk I/O latency degraded: replica sync lag at 480ms');
    addLog('WARN', 'Resilience4j', 'Slow call rate exceeded 50% threshold on endpoint /api/v1/ledger');
  };

  const handleTripCircuitBreaker = () => {
    setSimState('circuit_open');
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === 'svc-core') {
          return { 
            ...n, 
            status: 'tripped', 
            circuitBreakerState: 'OPEN', 
            latencyMs: 1.2 // Fallback cache responds fast
          };
        }
        if (n.id === 'db-1') {
          return { ...n, status: 'degraded' };
        }
        return n;
      })
    );

    addLog('ERROR', 'Resilience4j', 'CircuitBreaker [paymentEngine] transitioned to OPEN state! Tripping fallback.');
    addLog('INFO', 'FallbackCache', 'Redirecting read traffic to Redis Read-Through cache. Degraded graceful degradation active.');
  };

  const handleResetSystem = () => {
    setSimState('normal');
    setNodes(TOPOLOGY_NODES_INITIAL);
    setSelectedNode(TOPOLOGY_NODES_INITIAL[3]);
    addLog('INFO', 'Orchestrator', 'Topology restored to healthy baseline. All circuit breakers CLOSED.');
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls Panel */}
      <div className="rounded-lg bg-[#0c1626] border border-[#1f2a3c] p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Cpu className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Live Distributed System & Microservices Topology Lab
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Interactive test bench modeling high-throughput Java 21 microservices, Resilience4j circuit breakers, Kafka event streams, and Redis cache clusters.
            </p>
          </div>

          {/* Concurrency Model Switcher */}
          <div className="flex items-center gap-2 bg-[#081425] p-1.5 rounded-md border border-[#1f2a3c] shrink-0">
            <span className="text-[11px] font-mono text-slate-400 px-2">Engine:</span>
            <button
              onClick={() => {
                setConcurrencyModel('virtual_threads');
                addLog('INFO', 'Runtime', 'Switched concurrency engine to Java 21 Virtual Threads (Loom)');
              }}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-all cursor-pointer ${
                concurrencyModel === 'virtual_threads'
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ⚡ Java 21 Loom
            </button>
            <button
              onClick={() => {
                setConcurrencyModel('platform_threads');
                addLog('WARN', 'Runtime', 'Switched concurrency engine to Traditional OS Thread Pool (Tomcat)');
              }}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-all cursor-pointer ${
                concurrencyModel === 'platform_threads'
                  ? 'bg-amber-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Standard OS Threads
            </button>
          </div>
        </div>

        {/* Action Buttons for Chaos Engineering Simulation */}
        <div className="mt-4 pt-4 border-t border-[#1f2a3c] flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            Chaos & Load Scenarios:
          </span>

          <button
            onClick={handleTrafficSurge}
            id="sim-traffic-surge-btn"
            className={`px-3 py-1.5 rounded text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              simState === 'surge'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'bg-[#111c2d] hover:bg-[#152031] text-slate-300 border border-[#334155]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulate 10x Spike (140k QPS)</span>
          </button>

          <button
            onClick={handleInjectDbLag}
            id="sim-db-lag-btn"
            className={`px-3 py-1.5 rounded text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              simState === 'db_slow'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'bg-[#111c2d] hover:bg-[#152031] text-slate-300 border border-[#334155]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Inject Database Latency (480ms)</span>
          </button>

          <button
            onClick={handleTripCircuitBreaker}
            id="sim-circuit-breaker-btn"
            className={`px-3 py-1.5 rounded text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              simState === 'circuit_open'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'bg-[#111c2d] hover:bg-[#152031] text-slate-300 border border-[#334155]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
            <span>Trip Resilience4j Circuit Breaker</span>
          </button>

          <button
            onClick={handleResetSystem}
            id="sim-reset-btn"
            className="ml-auto px-3 py-1.5 rounded text-xs font-mono font-medium bg-[#1e293b] hover:bg-[#28354b] text-slate-200 border border-[#475569] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Architecture Map (Left) & Node Inspector / Logs (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Topology Visualizer Map */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-lg bg-[#0c1626] border border-[#1f2a3c] p-4 relative overflow-hidden">
            
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1f2a3c]">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Service Mesh Topology (Istio & mTLS Enabled)</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Click any node to inspect telemetry</span>
            </div>

            {/* Architecture Node Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
              {nodes.map((node) => {
                const isSelected = selectedNode.id === node.id;
                let statusColor = 'border-[#1f2a3c] bg-[#111c2d] text-slate-200';
                let badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';

                if (node.status === 'degraded') {
                  statusColor = 'border-amber-500/50 bg-amber-500/5 text-amber-200';
                  badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/40';
                } else if (node.status === 'tripped') {
                  statusColor = 'border-purple-500/50 bg-purple-500/5 text-purple-200';
                  badgeColor = 'bg-purple-500/20 text-purple-300 border-purple-500/40';
                }

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    id={`topo-node-${node.id}`}
                    className={`p-3.5 rounded-md border text-left transition-all relative group cursor-pointer ${statusColor} ${
                      isSelected
                        ? 'ring-2 ring-blue-500 border-blue-400 shadow-lg shadow-blue-500/10'
                        : 'hover:border-[#334155]'
                    }`}
                  >
                    {/* Node Header */}
                    <div className="flex items-start justify-between gap-1 mb-2">
                      <span className="text-xs font-bold text-white tracking-tight line-clamp-1">
                        {node.name}
                      </span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border uppercase shrink-0 ${badgeColor}`}>
                        {node.status}
                      </span>
                    </div>

                    {/* Node Live Metrics */}
                    <div className="space-y-1 text-[11px] font-mono text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Throughput:</span>
                        <span className="font-semibold text-blue-400">{node.rps.toLocaleString()} RPS</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Latency:</span>
                        <span className={`font-semibold ${node.latencyMs > 50 ? 'text-rose-400' : 'text-slate-200'}`}>
                          {node.latencyMs} ms
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">CPU Usage:</span>
                        <span className={`font-semibold ${node.cpuPercent > 80 ? 'text-amber-400' : 'text-slate-300'}`}>
                          {node.cpuPercent}%
                        </span>
                      </div>
                      {node.circuitBreakerState !== 'CLOSED' && (
                        <div className="flex justify-between pt-1 border-t border-purple-500/30 text-purple-300 font-bold">
                          <span>Circuit:</span>
                          <span>{node.circuitBreakerState}</span>
                        </div>
                      )}
                    </div>

                    {/* Pod Replicas Indicator */}
                    <div className="mt-2.5 pt-2 border-t border-[#1f2a3c] flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Replicas: {node.instances} pods</span>
                      <span className="text-blue-400 group-hover:underline text-[10px]">Inspect &gt;</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Architecture Connections & Data Flow Legend */}
            <div className="mt-4 pt-3 border-t border-[#1f2a3c] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-blue-500"></span> Client Ingress (TLS 1.3)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Kafka Stream (Exactly-Once)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-violet-500"></span> Redis Cache / Redlock
                </span>
              </div>
              <span className="text-[11px] text-slate-400">Target SLA: 99.995% Uptime</span>
            </div>

          </div>

          {/* Real-time System Log Terminal */}
          <div className="rounded-lg bg-[#0a111e] border border-[#1f2a3c] overflow-hidden">
            <div className="bg-[#081425] px-4 py-2 border-b border-[#1f2a3c] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span>Cluster Event Stream (OpenTelemetry Collector / FluentBit)</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Streaming Live</span>
            </div>

            <div className="p-3 max-h-[160px] overflow-y-auto space-y-1 font-mono text-[11px] leading-relaxed">
              {logs.map((log) => {
                let badge = 'text-blue-400 bg-blue-500/10';
                if (log.level === 'WARN') badge = 'text-amber-400 bg-amber-500/10';
                if (log.level === 'ERROR') badge = 'text-rose-400 bg-rose-500/10';
                if (log.level === 'DEBUG') badge = 'text-slate-400 bg-slate-800';

                return (
                  <div key={log.id} className="flex items-start gap-2 text-slate-300">
                    <span className="text-slate-500 shrink-0">{log.timestamp}</span>
                    <span className={`px-1 py-0.2 rounded font-semibold text-[10px] shrink-0 ${badge}`}>
                      {log.level}
                    </span>
                    <span className="text-blue-300 shrink-0">[{log.service}]:</span>
                    <span className="text-slate-300">{log.message}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Node Inspector & Performance Diagnosis */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="rounded-lg bg-[#0c1626] border border-[#1f2a3c] p-4 space-y-4">
            
            {/* Selected Node Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2a3c]">
              <div>
                <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">Node Telemetry</span>
                <h3 className="text-base font-bold text-white">{selectedNode.name}</h3>
              </div>
              <span className="p-2 rounded bg-[#111c2d] border border-[#334155] text-blue-400">
                <Server className="w-4 h-4" />
              </span>
            </div>

            {/* Metric Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">CPU Allocation:</span>
                  <span className="font-semibold text-white">{selectedNode.cpuPercent}%</span>
                </div>
                <div className="w-full h-2 bg-[#111c2d] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      selectedNode.cpuPercent > 80 ? 'bg-rose-500' : selectedNode.cpuPercent > 50 ? 'bg-amber-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${selectedNode.cpuPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">Throughput:</span>
                  <span className="font-semibold text-blue-400">{selectedNode.rps.toLocaleString()} req/sec</span>
                </div>
                <div className="w-full h-2 bg-[#111c2d] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, (selectedNode.rps / 40000) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">P99 Latency:</span>
                  <span className={`font-semibold ${selectedNode.latencyMs > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {selectedNode.latencyMs} ms
                  </span>
                </div>
                <div className="w-full h-2 bg-[#111c2d] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      selectedNode.latencyMs > 50 ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, (selectedNode.latencyMs / 500) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Architecture Details Box */}
            <div className="p-3 rounded bg-[#081425] border border-[#1f2a3c] space-y-2 text-xs font-mono">
              <div className="text-slate-400">Active Deployment Spec:</div>
              <ul className="text-slate-300 space-y-1 list-disc list-inside">
                <li>JVM Heap: -Xms2g -Xmx2g with ZGC</li>
                <li>Thread Mode: {concurrencyModel === 'virtual_threads' ? 'Project Loom (Virtual Threads)' : 'OS Threads (500 max)'}</li>
                <li>Health Check: /actuator/health (200 OK)</li>
                <li>OpenTelemetry Tracing: Enabled</li>
              </ul>
            </div>

            {/* Resilience status */}
            <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20 text-xs">
              <div className="font-semibold text-blue-300 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                Resilience Guardrails
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Protected by Resilience4j RateLimiter (50k QPS/IP), Bulkhead isolation, and Distributed Redlock mutex locks.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
