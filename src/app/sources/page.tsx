import { Database, Globe, Satellite, Wifi } from "lucide-react";

export default function SourcesPage() {
  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Database className="text-purple-400" /> Intelligence Data Sources
        </h2>
        <p className="text-slate-400 mt-2 text-sm">Active APIs and sensory networks feeding the AI engine.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "ECMWF GRIB2", type: "Global Weather Model", icon: Globe, ping: "14ms" },
          { name: "GOES-16 Network", type: "Satellite Telemetry", icon: Satellite, ping: "22ms" },
          { name: "IMD Doppler Radars", type: "Local Precipitation", icon: Wifi, ping: "8ms" },
          { name: "IoT Sensor Grid", type: "Ground Truth Nodes", icon: Database, ping: "5ms" }
        ].map(source => (
          <div key={source.name} className="bg-[var(--color-panel)] border border-slate-700 p-6 rounded-2xl hover:border-purple-500/50 transition-colors">
            <source.icon size={32} className="text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-1">{source.name}</h3>
            <p className="text-sm text-slate-400 mb-4">{source.type}</p>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-500">Latency: <span className="text-emerald-400">{source.ping}</span></span>
              <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded">SYNCED</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
