"use client";
import { Database, Cpu, Activity, CloudRain, AlertTriangle, ArrowDown, Radio, Satellite, HardDrive, Wifi, Server } from "lucide-react";
import { useState, useEffect } from "react";

const DATA_SOURCES = [
  { name: "Satellite Imagery", icon: Satellite, ping: "12ms", rate: "1.4 GB/s", color: "var(--color-normal)" },
  { name: "Doppler Radar", icon: Radio, ping: "8ms", rate: "3.2 GB/s", color: "var(--color-normal)" },
  { name: "NWP Models", icon: Server, ping: "45ms", rate: "800 MB/s", color: "var(--color-normal)" },
  { name: "IoT Weather Stations", icon: Wifi, ping: "4ms", rate: "12 MB/s", color: "var(--color-normal)" },
  { name: "Historical Archives", icon: HardDrive, ping: "110ms", rate: "5.1 GB/s", color: "var(--color-normal)" },
];

export default function DataFusionPage() {
  const [activePulse, setActivePulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulse(prev => (prev + 1) % 3);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-10 max-w-7xl mx-auto pb-20">
      <div className="mb-14">
        <h2 className="text-3xl font-bold text-white tracking-tight">Geospatial Data Fusion</h2>
        <p className="text-slate-400 mt-2 text-sm">Real-time ingestion and multi-modal preprocessing pipeline architecture.</p>
      </div>

      <div className="relative">
        
        {/* Tier 1: Data Sources */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative z-10">
          {DATA_SOURCES.map((source, i) => {
            const Icon = source.icon;
            return (
              <div key={i} className="bg-[var(--color-panel)] border border-slate-700 hover:border-emerald-500/50 rounded-2xl p-5 shadow-lg flex flex-col items-center justify-center text-center transition-colors group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/30"></div>
                <div className="p-4 rounded-full bg-slate-800 mb-4 group-hover:bg-emerald-500/10 transition-colors">
                  <Icon size={24} className="text-emerald-400"/>
                </div>
                <h3 className="text-sm font-bold text-white mb-4">{source.name}</h3>
                
                <div className="w-full space-y-2 border-t border-slate-800 pt-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span>Latency</span>
                    <span className="text-emerald-400">{source.ping}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span>Ingest Rate</span>
                    <span className="text-emerald-400">{source.rate}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">LIVE STREAM</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Data Flow Arrows */}
        <div className="flex justify-center my-8 relative h-16">
          <div className="absolute top-0 w-[80%] h-full flex justify-between px-10">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-full border-l-2 border-dashed border-slate-700 relative">
                <div className="absolute top-0 -left-[5px] w-2 h-2 rounded-full bg-[var(--color-accent)] animate-ping" style={{animationDelay: `${i * 0.2}s`}}></div>
              </div>
            ))}
          </div>
          <div className="w-[80%] border-b-2 border-dashed border-slate-700 absolute top-1/2 left-1/2 transform -translate-x-1/2"></div>
          <div className="h-1/2 border-l-2 border-dashed border-slate-700 absolute bottom-0 left-1/2 transform -translate-x-1/2">
             <div className="absolute bottom-0 -left-[5px] w-2 h-2 rounded-full bg-[var(--color-accent)] animate-ping"></div>
          </div>
        </div>

        {/* Tier 2: AI Engine */}
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-[var(--color-accent)] rounded-3xl p-10 text-center shadow-[0_0_50px_rgba(56,189,248,0.15)] relative overflow-hidden group">
            
            {/* Animated Pulse Rings */}
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[var(--color-accent)]/20 transition-transform duration-1000 ${activePulse === 0 ? 'scale-100 opacity-100' : 'scale-150 opacity-0'}`}></div>
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[var(--color-accent)]/20 transition-transform duration-1000 ${activePulse === 1 ? 'scale-100 opacity-100' : 'scale-150 opacity-0'}`}></div>

            <div className="relative z-10">
              <Cpu size={48} className="text-[var(--color-accent)] mx-auto mb-6 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"/>
              <h2 className="text-3xl font-black text-white tracking-tight mb-2">SPATIO-TEMPORAL AI ENGINE</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Multi-Modal Feature Extraction & Inference Layer</p>
            </div>
            
            {/* Live Processing Badges */}
            <div className="mt-8 flex justify-center gap-4 relative z-10">
               <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 px-4 py-2 rounded-lg text-xs font-bold text-[var(--color-accent)]">Processing 18.2 TB/s</div>
               <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 px-4 py-2 rounded-lg text-xs font-bold text-[var(--color-accent)]">99.98% Uptime</div>
            </div>
          </div>
        </div>

        {/* Data Flow Arrows */}
        <div className="flex justify-center my-8 h-12 relative">
          <div className="h-full border-l-2 border-dashed border-slate-700 relative">
             <div className="absolute top-0 -left-[5px] w-2 h-2 rounded-full bg-slate-400 animate-ping"></div>
          </div>
        </div>

        {/* Tier 3: Outputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10">
          <div className="bg-[var(--color-panel)] border border-slate-700 rounded-2xl p-8 text-center shadow-lg hover:-translate-y-1 transition-transform">
            <Activity size={32} className="text-orange-400 mx-auto mb-4"/>
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">Anomaly Detection</h3>
            <p className="text-slate-500 text-xs">Z-Score evaluation & historical baseline deviation</p>
          </div>
          
          <div className="bg-[var(--color-panel)] border border-slate-700 rounded-2xl p-8 text-center shadow-lg hover:-translate-y-1 transition-transform">
            <CloudRain size={32} className="text-[var(--color-accent)] mx-auto mb-4"/>
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">Forecast Generation</h3>
            <p className="text-slate-500 text-xs">14-day projection horizon mapping</p>
          </div>
          
          <div className="bg-[var(--color-panel)] border border-slate-700 rounded-2xl p-8 text-center shadow-lg hover:-translate-y-1 transition-transform">
            <AlertTriangle size={32} className="text-[var(--color-critical)] mx-auto mb-4"/>
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">Risk Classification</h3>
            <p className="text-slate-500 text-xs">Severity assessment & Alert routing system</p>
          </div>
        </div>

      </div>
    </div>
  );
}