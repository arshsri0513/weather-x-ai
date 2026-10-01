import { Info, Code, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black text-white tracking-tight mb-4">WEATHER-X AI</h2>
        <p className="text-[var(--color-accent)] font-bold tracking-widest uppercase text-sm">v2.4.1 Production Build</p>
      </div>

      <div className="bg-[#050B14] border border-slate-800 rounded-3xl p-10 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
        
        <ShieldCheck size={120} className="absolute -top-10 -right-10 text-slate-800/30 rotate-12" />

        <p className="text-slate-300 leading-relaxed mb-8 relative z-10">
          Designed as a next-generation meteorological command center, Weather-X AI fuses multi-modal satellite data, local doppler radar, and historical climatological baselines using a cutting-edge Spatio-Temporal Graph Convolutional Network.
        </p>

        <div className="flex justify-center gap-6 text-sm text-slate-500 font-mono mb-8 relative z-10">
          <span>React 18</span>
          <span>Next.js App Router</span>
          <span>Tailwind CSS</span>
        </div>

        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 px-6 py-3 rounded-xl relative z-10">
          <Code size={18} className="text-slate-400" />
          <span className="text-white font-bold">Built for Advanced Agentic UI</span>
        </div>
      </div>
    </div>
  )
}
