"use client";
import { Cpu, Network, Zap, ShieldAlert, Terminal, PlayCircle } from "lucide-react";
import { useState, useEffect } from "react";

const INITIAL_LOGS = [
  "WEATHER-X AI Core v2.4.1-prod initialized.",
  "Establishing secure connection to geospatial data lake...",
  "OK. Listening for new meteorological ingest streams."
];

const STREAM_LOGS = [
  "Ingesting ECMWF GRIB2 dataset (34.2 GB)...",
  "Harmonizing spatio-temporal grid to 9km resolution...",
  "Executing multi-head attention over 30-year climatological baseline...",
  "WARNING: Thermal anomaly cluster detected at [28.7, 77.1] (Delhi).",
  "Calculating Z-Score deviation... Z = +4.2σ",
  "CLASSIFICATION: CRITICAL EXTREME (Severe Heatwave)",
  "Projecting 14-day temporal evolution vector...",
  "Attention heads focused on high-pressure stagnation.",
  "Cross-referencing with local radar telemetry...",
  "Update complete. Sleeping until next cycle."
];

export default function ModelsPage() {
  const [logs, setLogs] = useState<string[]>(INITIAL_LOGS);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (!isStreaming) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < STREAM_LOGS.length) {
        setLogs(prev => [...prev, STREAM_LOGS[currentIndex]]);
        currentIndex++;
      } else {
        setIsStreaming(false);
        clearInterval(interval);
      }
    }, 800); // 800ms per log line

    return () => clearInterval(interval);
  }, [isStreaming]);

  const triggerInference = () => {
    setLogs(["[MANUAL OVERRIDE] Initiating forced inference cycle..."]);
    setIsStreaming(true);
  };

  return (
    <div className="p-10 max-w-7xl mx-auto pb-20">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white tracking-tight">AI Anomaly Engine</h2>
        <p className="text-slate-400 mt-2 text-sm">Architecture, live performance metrics, and inference logs of the Spatio-Temporal Transformer.</p>
      </div>

      <div className="space-y-8">
        
        {/* Top Row: Engine Stats & Z-Score Logic */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Spatio-Temporal Transformer Status */}
          <div className="bg-[var(--color-panel)] border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-[var(--color-accent)]/50 transition-colors">
            
            {/* Background glowing CPU icon */}
            <Cpu size={250} className="absolute -bottom-10 -right-10 text-[var(--color-accent)] opacity-5 group-hover:opacity-10 transition-opacity" />
            
            <div className="flex items-center gap-2 mb-8 relative z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Engine Active</span>
            </div>

            <div className="relative z-10 mb-10">
              <h3 className="text-2xl font-black text-white tracking-tight mb-2">Spatio-Temporal Transformer</h3>
              <p className="text-[var(--color-accent)] font-bold text-sm bg-[var(--color-accent)]/10 inline-block px-3 py-1 rounded-md border border-[var(--color-accent)]/20">v2.4.1-prod (Multi-modal Attention)</p>
            </div>

            <div className="space-y-6 relative z-10">
              {[
                { label: 'Detection Confidence', val: 94 },
                { label: 'Spatial Consistency', val: 87 },
                { label: 'Temporal Consistency', val: 91 }
              ].map((metric, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">
                    <span>{metric.label}</span>
                    <span className="text-[var(--color-accent)]">{metric.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-accent)] rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)]" style={{ width: `${metric.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Z-Score Logic Definition */}
          <div className="bg-[var(--color-panel)] border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-3 border-b border-slate-800 pb-4">
              <Network size={18} className="text-purple-400"/> Z-Score Classification Logic
            </h3>
            
            <div className="space-y-4">
              {[
                { threshold: '|Z| < 1', title: 'Normal Conditions', desc: 'Within standard historical climatological variance.', c: 'var(--color-normal)', bg: 'bg-emerald-500/5', border: 'border-emerald-500/20' },
                { threshold: '1 - 2', title: 'Moderate Anomaly', desc: 'Notable deviation, monitoring recommended.', c: 'var(--color-moderate)', bg: 'bg-yellow-500/5', border: 'border-yellow-500/20' },
                { threshold: '2 - 3', title: 'High Risk', desc: 'Significant extreme event signature detected.', c: 'var(--color-high)', bg: 'bg-orange-500/5', border: 'border-orange-500/20' },
                { threshold: '≥ 3', title: 'Critical Extreme', desc: 'Severe historical deviation (+3.0σ). Alert triggered.', c: 'var(--color-critical)', bg: 'bg-red-500/5', border: 'border-red-500/30' },
              ].map((z, i) => (
                <div key={i} className={`flex items-center gap-6 p-4 rounded-xl border ${z.bg} ${z.border} hover:bg-slate-800/50 transition-colors`}>
                  <div className="text-xl font-black w-16 text-center" style={{color: z.c}}>{z.threshold}</div>
                  <div className="h-10 w-px bg-slate-700"></div>
                  <div>
                    <div className="font-bold text-white text-sm">{z.title}</div>
                    <div className="text-slate-400 text-xs mt-1">{z.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Live Inference Terminal */}
        <div className="bg-[#050B14] border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col">
          <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-3">
              <Terminal size={18} className="text-slate-500"/> Live Inference Telemetry
            </h3>
            <button 
              onClick={triggerInference}
              disabled={isStreaming}
              className="flex items-center gap-2 text-xs font-bold bg-slate-800 hover:bg-[var(--color-accent)] hover:text-slate-900 text-slate-300 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlayCircle size={14}/> Force Inference Cycle
            </button>
          </div>
          
          <div className="bg-black/50 border border-slate-800/80 rounded-xl p-5 h-64 overflow-y-auto font-mono text-xs shadow-inner flex flex-col gap-2">
            {logs.map((log, i) => {
              // Color code specific logs for realism
              let colorClass = "text-slate-400";
              if (log.includes("WARNING")) colorClass = "text-[var(--color-high)]";
              if (log.includes("CRITICAL")) colorClass = "text-[var(--color-critical)]";
              if (log.includes("OK") || log.includes("complete")) colorClass = "text-emerald-400";

              return (
                <div key={i} className="flex gap-4">
                  <span className="text-slate-600 select-none">[{new Date().toISOString().split('T')[1].slice(0,8)}]</span>
                  <span className={colorClass}>{log}</span>
                </div>
              )
            })}
            {isStreaming && (
              <div className="flex gap-4">
                <span className="text-slate-600 select-none">[{new Date().toISOString().split('T')[1].slice(0,8)}]</span>
                <span className="text-slate-500 animate-pulse">_</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}