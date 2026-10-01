import { Server, Activity, CheckCircle } from "lucide-react";

export default function SystemStatusPage() {
  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Server className="text-[var(--color-accent)]" /> Global System Status
        </h2>
        <p className="text-slate-400 mt-2 text-sm">Real-time health of the Weather-X AI infrastructure.</p>
      </div>
      
      <div className="bg-[#050B14] border border-slate-800 rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle size={32} className="text-emerald-400" />
            </div>
            <div className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 rounded-full animate-ping"></div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">All Systems Operational</h3>
            <p className="text-emerald-400 text-sm font-bold">Uptime: 99.998%</p>
          </div>
        </div>

        <div className="space-y-4">
          {['Spatio-Temporal Transformer', 'Geospatial Data Lake', 'Global Radar API', 'Threat Dispatch Engine'].map(sys => (
            <div key={sys} className="flex justify-between items-center p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="font-bold text-slate-300">{sys}</div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20">
                <Activity size={14}/> ONLINE
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
