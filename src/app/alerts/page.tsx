"use client";
import { AlertTriangle, MapPin, Clock, ArrowRight, Activity, Thermometer, Wind, CloudRain } from "lucide-react";

const ALERTS = [
  { id: 'A-1042', type: 'Extreme Rainfall', location: 'Bihar, India', prob: 91, time: '36–48 hours', severity: 'CRITICAL', icon: CloudRain, color: 'text-[var(--color-critical)]', bg: 'bg-[var(--color-critical)]/10', border: 'border-[var(--color-critical)]/30' },
  { id: 'A-1043', type: 'Heat Anomaly', location: 'Delhi, India', prob: 84, time: '72 hours', severity: 'HIGH', icon: Thermometer, color: 'text-[var(--color-high)]', bg: 'bg-[var(--color-high)]/10', border: 'border-[var(--color-high)]/30' },
  { id: 'A-1044', type: 'Strong Wind', location: 'Rajasthan, India', prob: 68, time: '96 hours', severity: 'MODERATE', icon: Wind, color: 'text-[var(--color-moderate)]', bg: 'bg-[var(--color-moderate)]/10', border: 'border-[var(--color-moderate)]/30' },
];

export default function AlertsPage() {
  return (
    <div className="p-10 max-w-5xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white tracking-tight">Active Intelligence Alerts</h2>
        <p className="text-slate-400 mt-2 text-sm">Prioritized extreme weather anomalies detected by the Spatio-Temporal AI Engine.</p>
      </div>

      <div className="flex gap-3 mb-8">
        {['ALL', 'CRITICAL', 'HIGH', 'MODERATE'].map(filter => (
           <button key={filter} className="px-5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800 transition-colors hover:text-white">
             {filter}
           </button>
        ))}
      </div>

      <div className="space-y-4">
        {ALERTS.map(alert => {
          const Icon = alert.icon;
          return (
            <div key={alert.id} className={`flex items-center justify-between p-6 rounded-2xl border ${alert.border} ${alert.bg} backdrop-blur-sm relative overflow-hidden group hover:shadow-lg transition-all`}>
              <div className="flex items-center gap-6 z-10">
                <div className={`p-4 rounded-2xl bg-slate-950/50 ${alert.color} border border-slate-800/50 shadow-inner`}>
                  <Icon size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className={`text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded border ${alert.border} ${alert.color}`}>
                      {alert.severity}
                    </span>
                    <span className="text-xs text-slate-400 font-mono tracking-wider">{alert.id}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-1">{alert.type}</h3>
                  <div className="flex items-center gap-5 mt-2 text-xs font-medium text-slate-400">
                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-500"/> {alert.location}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-500"/> Expected: {alert.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 z-10 bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Probability</div>
                  <div className={`text-3xl font-black ${alert.color}`}>{alert.prob}%</div>
                </div>
                <div className="h-12 w-px bg-slate-700/50"></div>
                <div className="flex flex-col gap-2">
                  <button className="text-[10px] font-bold bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 transition-colors w-32 text-center tracking-widest uppercase">
                    VIEW ON MAP
                  </button>
                  <button className="text-[10px] font-bold bg-[var(--color-accent)] hover:bg-sky-400 text-slate-900 px-4 py-2 rounded-lg transition-colors w-32 text-center tracking-widest uppercase shadow-lg shadow-[var(--color-accent)]/20">
                    VIEW EVENT
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}