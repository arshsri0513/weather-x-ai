"use client";
import { Activity, AlertTriangle, CloudRain, Thermometer, Wind, TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useMapContext } from "@/lib/MapContext";

// Dynamically load the map so Leaflet doesn't break SSR
const GlobalMap = dynamic(() => import("@/components/maps/GlobalMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center flex-col gap-4 shadow-2xl">
      <Activity size={32} className="text-slate-600 animate-pulse" />
      <p className="text-slate-500 font-medium">Loading Geospatial Engine...</p>
    </div>
  )
});

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [kpis, setKpis] = useState([
    { title: "ACTIVE ANOMALIES", value: 0, icon: Activity, trend: "Connecting to API...", color: "text-[var(--color-accent)]" },
    { title: "CRITICAL EVENTS", value: 0, icon: AlertTriangle, trend: "Connecting to API...", color: "text-[var(--color-critical)]" },
    { title: "EXTREME RAINFALL", value: 0, icon: CloudRain, trend: "Connecting to API...", color: "text-[var(--color-accent)]" },
    { title: "TEMP ANOMALIES", value: 0, icon: Thermometer, trend: "Connecting to API...", color: "text-[var(--color-high)]" },
    { title: "WIND ANOMALIES", value: 0, icon: Wind, trend: "Connecting to API...", color: "text-[var(--color-moderate)]" },
  ]);

  const [intercepts, setIntercepts] = useState<{time: string, type: string, loc: string, conf: number, status: string}[]>([]);

  useEffect(() => {
    // Simulate fetching fresh data from the backend on page load/refresh
    const active = Math.floor(Math.random() * 20) + 20;
    const critical = Math.floor(Math.random() * 5) + 2;
    const rain = Math.floor(Math.random() * 10) + 5;
    const temp = Math.floor(Math.random() * 8) + 4;
    const wind = Math.floor(Math.random() * 5) + 3;

    setKpis([
      { title: "ACTIVE ANOMALIES", value: active, icon: Activity, trend: "↑ 12% from previous cycle", color: "text-[var(--color-accent)]" },
      { title: "CRITICAL EVENTS", value: critical, icon: AlertTriangle, trend: "Requires immediate attention", color: "text-[var(--color-critical)]" },
      { title: "EXTREME RAINFALL", value: rain, icon: CloudRain, trend: "↑ 4 new zones detected", color: "text-[var(--color-accent)]" },
      { title: "TEMP ANOMALIES", value: temp, icon: Thermometer, trend: "↓ 2 resolved", color: "text-[var(--color-high)]" },
      { title: "WIND ANOMALIES", value: wind, icon: Wind, trend: "Stable", color: "text-[var(--color-moderate)]" },
    ]);

    // Generate dynamic feed data, prioritizing Indian locations
    const pool = [
      { type: 'Category 4 Cyclone Risk', loc: 'Odisha, India' },
      { type: 'Extreme Flash Flood', loc: 'Bihar, India' },
      { type: 'Severe Heatwave (+5.1°C)', loc: 'Delhi, India' },
      { type: 'Monsoon Anomaly', loc: 'Mumbai, India' },
      { type: 'High Wind Shear', loc: 'Gujarat, India' },
      { type: 'Cloudburst Warning', loc: 'Uttarakhand, India' },
      { type: 'Urban Flooding', loc: 'Chennai, India' },
      { type: 'Drought Stress', loc: 'Rajasthan, India' },
      { type: 'Hurricane Risk', loc: 'Florida, USA' },
      { type: 'Typhoon Formation', loc: 'Tokyo, Japan' },
    ];
    
    // Shuffle and pick 4
    const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    const newIntercepts = shuffled.map((item, i) => {
      const date = new Date(Date.now() - (i + 1) * Math.floor(Math.random() * 20) * 60000);
      return {
        time: `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
        type: item.type,
        loc: item.loc,
        conf: Math.floor(Math.random() * 15) + 85,
        status: Math.random() > 0.7 ? 'SCALED TO CRITICAL' : (Math.random() > 0.5 ? 'TRACKING' : 'ACTIVE')
      };
    });
    
    setIntercepts(newIntercepts);
  }, []);

  return (
    <div className="p-8 pb-20">
      
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">Main Dashboard</h2>
        <p className="text-slate-400 mt-1">Real-time spatio-temporal overview of global weather anomalies.</p>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-[var(--color-panel)] border border-slate-800 p-5 rounded-xl shadow-lg relative overflow-hidden group hover:border-slate-600 transition-colors cursor-default">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon size={48} className={kpi.color} />
              </div>
              <div className="relative z-10">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{kpi.title}</h3>
                <div className="text-4xl font-black text-white mb-3">
                  {kpi.value === 0 ? <Activity size={24} className="animate-spin text-slate-500" /> : kpi.value}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium bg-slate-900/50 p-1.5 rounded inline-flex">
                  <TrendingUp size={12} className={kpi.color} />
                  <span>{kpi.trend}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Map Area */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="text-[var(--color-accent)]" size={20}/>
            Global Anomaly Map
          </h3>
          <div className="flex gap-2">
            {['All', 'Rainfall', 'Temperature', 'Wind', 'Flood Risk'].map(filter => (
              <button 
                key={filter} 
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded text-xs font-bold transition-colors border ${
                  activeFilter === filter 
                    ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]' 
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[500px]">
          <GlobalMap 
            activeLayers={{
              temperature: activeFilter === 'All' || activeFilter === 'Temperature',
              precipitation: activeFilter === 'All' || activeFilter === 'Rainfall' || activeFilter === 'Flood Risk',
              wind: activeFilter === 'All' || activeFilter === 'Wind'
            }} 
          />
        </div>
      </div>

      {/* Live Intelligence Feed (Fills empty vertical space) */}
      <div className="bg-[var(--color-panel)] border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="text-[var(--color-critical)]" size={20}/>
            Latest Critical Intercepts
          </h3>
          <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">Auto-updating...</span>
        </div>
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/80 text-[10px] uppercase tracking-widest text-slate-500 font-black">
            <tr>
              <th className="p-4">Time (Local)</th>
              <th className="p-4">Anomaly Type</th>
              <th className="p-4">Region</th>
              <th className="p-4">AI Confidence</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {/* Render Searched Locations (User-driven) */}
            {useMapContext().searchedLocations.map((loc, i) => {
              const now = new Date();
              const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
              return (
                <tr key={`search-${i}`} className="hover:bg-slate-800/40 transition-colors bg-[var(--color-accent)]/5">
                  <td className="p-4 font-mono text-[var(--color-accent)]">{timeString}</td>
                  <td className="p-4 font-bold text-white">USER TARGETED SCAN</td>
                  <td className="p-4 font-bold">{loc}</td>
                  <td className="p-4 text-emerald-400 font-bold">100%</td>
                  <td className="p-4">
                    <span className="text-[9px] px-2 py-1 rounded font-black uppercase tracking-wider bg-[var(--color-accent)]/20 text-[var(--color-accent)] border border-[var(--color-accent)]/30">
                      ACTIVE SCAN
                    </span>
                  </td>
                </tr>
              )
            })}
            
            {/* Render Simulated Random Backend Data */}
            {intercepts.map((feed, i) => (
              <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-mono text-slate-400">{feed.time}</td>
                <td className="p-4 font-bold text-white">{feed.type}</td>
                <td className="p-4">{feed.loc}</td>
                <td className="p-4 text-emerald-400 font-bold">{feed.conf}%</td>
                <td className="p-4">
                  <span className={`text-[9px] px-2 py-1 rounded font-black uppercase tracking-wider ${
                    feed.status.includes('CRITICAL') ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {feed.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
