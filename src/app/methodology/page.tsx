"use client";
import { Database, Cpu, Activity, BrainCircuit, Globe, Layers, ArrowDown } from "lucide-react";

export default function MethodologyPage() {
  return (
    <div className="p-10 max-w-6xl mx-auto pb-20">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-black text-white tracking-tight mb-4">Spatio-Temporal AI Architecture</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Technical specification of the multi-modal ingestion pipeline, attention-based transformer, and Z-Score classification mathematics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Col: The Math & Specs */}
        <div className="space-y-8">
          <div className="bg-[var(--color-panel)] border border-slate-700 p-8 rounded-3xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <BrainCircuit className="text-[var(--color-accent)]" size={24}/>
              <h3 className="text-xl font-bold text-white">Mathematical Foundation</h3>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              The core engine utilizes a modified Spatio-Temporal Graph Convolutional Network (ST-GCN) fused with multi-head attention mechanisms to predict nonlinear atmospheric dynamics.
            </p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 text-center">
              Z = (X - μ) / σ
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center">
              Where X is the projected inference, μ is the 30-year climatological baseline mean, and σ is the standard deviation.
            </p>
          </div>

          <div className="bg-[var(--color-panel)] border border-slate-700 p-8 rounded-3xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="text-purple-400" size={24}/>
              <h3 className="text-xl font-bold text-white">Grid Resolution Specs</h3>
            </div>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Spatial Resolution</span>
                <span className="font-bold text-white">9 km² (High-Res)</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Temporal Resolution</span>
                <span className="font-bold text-white">15-minute intervals</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Projection Horizon</span>
                <span className="font-bold text-white">T+336 hours (14 Days)</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Input Modalities</span>
                <span className="font-bold text-white">6 (Radar, Sat, NWP, etc.)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Col: The Pipeline Flow */}
        <div className="bg-[#050B14] p-10 rounded-3xl border border-slate-800 relative">
          <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-10 text-center">End-to-End Processing Pipeline</h3>
          
          <div className="space-y-2 relative">
            <div className="absolute left-[27px] top-10 bottom-10 w-0.5 bg-slate-800 z-0"></div>
            
            {[
              { title: "Multi-Modal Ingestion", desc: "Aggregating petabytes of raw geospatial telemetry.", icon: Database, color: "text-blue-400" },
              { title: "Harmonization Layer", desc: "Interpolating disparate data into a unified 9km grid.", icon: Globe, color: "text-indigo-400" },
              { title: "Attention Transformer", desc: "Executing parallel inference via the ST-GCN core.", icon: Cpu, color: "text-[var(--color-accent)]" },
              { title: "Z-Score Evaluation", desc: "Calculating historical variance and severity.", icon: Activity, color: "text-[var(--color-high)]" },
              { title: "Threat Routing", desc: "Dispatching actionable intelligence to the dashboard.", icon: BrainCircuit, color: "text-[var(--color-critical)]" },
            ].map((step, i) => (
              <div key={i} className="flex gap-6 relative z-10">
                <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 shadow-lg">
                  <step.icon size={24} className={step.color} />
                </div>
                <div className="pt-2 pb-8">
                  <div className="text-white font-bold text-lg mb-1">{step.title}</div>
                  <div className="text-slate-400 text-sm">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}