"use client";
import { AlertTriangle, MapPin, Clock, ArrowRight, Activity, Thermometer, Wind, CloudRain, ShieldAlert } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [dispatched, setDispatched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const LOCATIONS = ["Odisha, India", "Mumbai, India", "Delhi, India", "Chennai, India", "Kolkata, India", "Bengaluru, India", "Hyderabad, India", "Ahmedabad, India", "Pune, India", "Surat, India", "Jaipur, India", "Lucknow, India", "Kanpur, India", "Nagpur, India", "Patna, India", "Indore, India", "Bhopal, India", "Vadodara, India", "Agra, India", "Varanasi, India", "Guwahati, India", "Kochi, India", "Thiruvananthapuram, India"];
    
    const TYPES = [
      { type: 'Category 4 Cyclone Risk', severity: 'CRITICAL', icon: Wind, color: 'text-[var(--color-critical)]', bg: 'bg-[var(--color-critical)]/10', border: 'border-[var(--color-critical)]/30' },
      { type: 'Urban Flash Flood', severity: 'CRITICAL', icon: CloudRain, color: 'text-[var(--color-critical)]', bg: 'bg-[var(--color-critical)]/10', border: 'border-[var(--color-critical)]/30' },
      { type: 'Severe Heatwave (+6°C)', severity: 'HIGH RISK', icon: Thermometer, color: 'text-[var(--color-high)]', bg: 'bg-[var(--color-high)]/10', border: 'border-[var(--color-high)]/30' },
      { type: 'Atmospheric Shear', severity: 'MODERATE', icon: Activity, color: 'text-[var(--color-moderate)]', bg: 'bg-[var(--color-moderate)]/10', border: 'border-[var(--color-moderate)]/30' },
      { type: 'Coastal Storm Surge', severity: 'HIGH RISK', icon: AlertTriangle, color: 'text-[var(--color-high)]', bg: 'bg-[var(--color-high)]/10', border: 'border-[var(--color-high)]/30' },
      { type: 'Extreme Precipitation', severity: 'CRITICAL', icon: CloudRain, color: 'text-[var(--color-critical)]', bg: 'bg-[var(--color-critical)]/10', border: 'border-[var(--color-critical)]/30' },
      { type: 'Localized Drought', severity: 'MODERATE', icon: Thermometer, color: 'text-[var(--color-moderate)]', bg: 'bg-[var(--color-moderate)]/10', border: 'border-[var(--color-moderate)]/30' },
    ];

    const TIMES = ["Ongoing", "12 hours", "24 hours", "36 hours", "48 hours", "72 hours"];

    const generateAlerts = () => {
      const numAlerts = Math.floor(Math.random() * 4) + 4; // 4 to 7 alerts
      const newAlerts = [];
      const shuffledLocations = [...LOCATIONS].sort(() => 0.5 - Math.random());
      
      for(let i = 0; i < numAlerts; i++) {
        const randType = TYPES[Math.floor(Math.random() * TYPES.length)];
        const randTime = TIMES[Math.floor(Math.random() * TIMES.length)];
        const randProb = Math.floor(Math.random() * 40) + 60; // 60% to 99%
        const id = `A-${Math.floor(Math.random() * 9000) + 1000}`;
        
        newAlerts.push({
          id,
          location: shuffledLocations[i],
          prob: randProb,
          time: randTime,
          ...randType
        });
      }
      
      // Sort by severity (CRITICAL first, then HIGH RISK, then MODERATE)
      const severityScore: Record<string, number> = { 'CRITICAL': 3, 'HIGH RISK': 2, 'MODERATE': 1 };
      newAlerts.sort((a, b) => severityScore[b.severity] - severityScore[a.severity]);
      
      return newAlerts;
    };

    setAlerts(generateAlerts());
  }, []);

  const handleDispatch = (id: string) => {
    setDispatched(prev => ({ ...prev, [id]: true }));
  };

  const filteredAlerts = alerts.filter(a => activeFilter === 'ALL' || a.severity === activeFilter);

  return (
    <div className="p-10 max-w-7xl mx-auto pb-20">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <ShieldAlert className="text-[var(--color-critical)]"/> Active Intelligence Alerts
          </h2>
          <p className="text-slate-400 mt-2 text-sm">Prioritized extreme weather anomalies dynamically flagged by the Spatio-Temporal AI Engine.</p>
        </div>
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-lg text-red-400 font-bold text-xs">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          {alerts.filter(a => a.severity === 'CRITICAL').length} CRITICAL THREATS
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Alert Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-2 mb-6">
            {['ALL', 'CRITICAL', 'HIGH RISK', 'MODERATE'].map(filter => (
               <button 
                 key={filter} 
                 onClick={() => setActiveFilter(filter)}
                 className={`px-5 py-2 rounded-lg text-xs font-bold transition-colors ${activeFilter === filter ? 'bg-[var(--color-accent)] text-slate-900 shadow-lg shadow-[var(--color-accent)]/20' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'}`}
               >
                 {filter}
               </button>
            ))}
          </div>

          {filteredAlerts.length === 0 ? (
            <div className="text-center p-10 bg-slate-900 border border-slate-800 rounded-2xl text-slate-500">
              No active alerts for this severity level.
            </div>
          ) : filteredAlerts.map(alert => {
            const Icon = alert.icon;
            const isDispatched = dispatched[alert.id];
            return (
              <div key={alert.id} className={`flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl border ${alert.border} ${alert.bg} backdrop-blur-sm relative overflow-hidden group hover:shadow-lg hover:border-slate-500 transition-all`}>
                <div className="flex items-center gap-6 z-10 w-full md:w-auto mb-6 md:mb-0">
                  <div className={`p-4 rounded-2xl bg-slate-950/50 ${alert.color} border border-slate-800/50 shadow-inner shrink-0`}>
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

                <div className="flex items-center gap-6 z-10 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 w-full md:w-auto justify-between md:justify-normal">
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">AI Probability</div>
                    <div className={`text-3xl font-black ${alert.color}`}>{alert.prob}%</div>
                  </div>
                  <div className="h-12 w-px bg-slate-700/50 hidden md:block"></div>
                  <div className="flex flex-col gap-2">
                    <Link href={`/?search=${encodeURIComponent(alert.location)}`}>
                      <button className="text-[10px] font-bold bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 transition-colors w-32 text-center tracking-widest uppercase">
                        VIEW ON MAP
                      </button>
                    </Link>
                    <button 
                      onClick={() => handleDispatch(alert.id)}
                      disabled={isDispatched}
                      className={`text-[10px] font-bold px-4 py-2 rounded-lg transition-colors w-32 text-center tracking-widest uppercase ${isDispatched ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 cursor-not-allowed' : alert.severity === 'CRITICAL' ? 'bg-red-500 hover:bg-red-400 text-white shadow-lg shadow-red-500/20 border border-red-400' : 'bg-[var(--color-accent)] hover:bg-sky-400 text-slate-900 shadow-lg shadow-[var(--color-accent)]/20'}`}
                    >
                      {isDispatched ? 'DISPATCHED' : 'DISPATCH'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Col: Priority Map / Radar */}
        <div className="bg-[#050B14] border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden h-[600px]">
          <h3 className="absolute top-6 left-6 text-sm font-bold text-white uppercase tracking-widest z-20">Live Threat Radar</h3>
          
          {/* Simulated Radar UI */}
          <div className="relative w-72 h-72 rounded-full border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.1)]">
            <div className="absolute w-full h-full rounded-full border border-emerald-500/20 animate-[ping_3s_linear_infinite]"></div>
            <div className="absolute w-3/4 h-3/4 rounded-full border border-emerald-500/20"></div>
            <div className="absolute w-1/2 h-1/2 rounded-full border border-emerald-500/20"></div>
            
            {/* Radar Sweep */}
            <div className="absolute w-1/2 h-1/2 border-r-2 border-emerald-500 top-0 right-1/2 origin-bottom-right animate-[spin_4s_linear_infinite] bg-gradient-to-r from-transparent to-emerald-500/30"></div>
            
            {/* Threat Blips */}
            <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_red] animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_orange]"></div>
          </div>
          
          <div className="absolute bottom-6 left-6 right-6">
             <div className="bg-slate-900/80 backdrop-blur border border-slate-700 p-4 rounded-xl">
               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Primary Threat Vector</div>
               <div className="text-sm font-bold text-white mb-1">
                 {alerts.length > 0 ? `${alerts[0].location} (${alerts[0].id})` : 'Scanning...'}
               </div>
               <div className="text-xs text-red-400">
                 {alerts.length > 0 && alerts[0].severity === 'CRITICAL' ? 'Impact imminent. Evacuation recommended.' : 'Monitoring anomaly trajectory.'}
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  )
}