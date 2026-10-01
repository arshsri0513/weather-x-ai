"use client";
import { Search, Filter, Database } from "lucide-react";
import { useState, useEffect } from "react";

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<{id: string, type: string, loc: string, sev: string, c: string, start: string, prob: string, stat: string}[]>([]);

  useEffect(() => {
    const pool = [
      { type: 'Category 4 Cyclone Risk', loc: 'Odisha, India', sev: 'CRITICAL', c: 'text-[var(--color-critical)]' },
      { type: 'Extreme Flash Flood', loc: 'Bihar, India', sev: 'HIGH', c: 'text-[var(--color-high)]' },
      { type: 'Severe Heatwave (+5.1°C)', loc: 'Delhi, India', sev: 'CRITICAL', c: 'text-[var(--color-critical)]' },
      { type: 'Monsoon Anomaly', loc: 'Mumbai, India', sev: 'MODERATE', c: 'text-[var(--color-moderate)]' },
      { type: 'High Wind Shear', loc: 'Gujarat, India', sev: 'HIGH', c: 'text-[var(--color-high)]' },
      { type: 'Cloudburst Warning', loc: 'Uttarakhand, India', sev: 'CRITICAL', c: 'text-[var(--color-critical)]' },
      { type: 'Urban Flooding', loc: 'Chennai, India', sev: 'HIGH', c: 'text-[var(--color-high)]' },
      { type: 'Drought Stress', loc: 'Rajasthan, India', sev: 'MODERATE', c: 'text-[var(--color-moderate)]' },
      { type: 'Hurricane Risk', loc: 'Florida, USA', sev: 'CRITICAL', c: 'text-[var(--color-critical)]' },
      { type: 'Typhoon Formation', loc: 'Tokyo, Japan', sev: 'HIGH', c: 'text-[var(--color-high)]' },
    ];

    const generated = Array.from({length: 15}).map((_, i) => {
      const item = pool[Math.floor(Math.random() * pool.length)];
      const date = new Date(Date.now() - Math.floor(Math.random() * 14) * 86400000);
      return {
        id: `A-${1050 - i}`,
        type: item.type,
        loc: item.loc,
        sev: item.sev,
        c: item.c,
        start: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        prob: `${Math.floor(Math.random() * 20) + 80}%`,
        stat: Math.random() > 0.6 ? 'ACTIVE' : 'RESOLVED'
      }
    });

    setEvents(generated);
  }, []);

  const filteredEvents = events.filter(e => 
    e.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white tracking-tight">Event Tracking Database</h2>
        <p className="text-slate-400 mt-2 text-sm">Comprehensive log of all AI-detected extreme weather events and their current status.</p>
      </div>
      
      <div className="bg-[var(--color-panel)] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-slate-800 flex justify-between bg-slate-900/80 backdrop-blur">
           <div className="flex items-center gap-3 bg-slate-950 border border-slate-700 px-4 py-2.5 rounded-lg w-80 focus-within:border-[var(--color-accent)] transition-colors">
             <Search size={16} className="text-slate-500"/>
             <input 
               type="text" 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="Search Event ID or Location..." 
               className="bg-transparent outline-none text-sm text-white w-full placeholder-slate-600"
             />
           </div>
           <button className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-700 px-5 py-2.5 rounded-lg transition-colors">
             <Filter size={16}/> Filter Database
           </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/90 text-[10px] uppercase tracking-widest text-slate-500 font-black border-b border-slate-800">
              <tr>
                <th className="p-5">Event ID</th>
                <th className="p-5">Threat Type</th>
                <th className="p-5">Location</th>
                <th className="p-5">Severity</th>
                <th className="p-5">Detected On</th>
                <th className="p-5">AI Prob.</th>
                <th className="p-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredEvents.length > 0 ? filteredEvents.map(e => (
                <tr key={e.id} className="hover:bg-slate-800/40 transition-colors cursor-pointer group">
                  <td className="p-5 font-mono font-bold text-white flex items-center gap-2">
                    <Database size={14} className="text-slate-600 group-hover:text-[var(--color-accent)] transition-colors"/> 
                    {e.id}
                  </td>
                  <td className="p-5 font-medium">{e.type}</td>
                  <td className="p-5">{e.loc}</td>
                  <td className={`p-5 font-black ${e.c}`}>{e.sev}</td>
                  <td className="p-5 text-slate-400">{e.start}</td>
                  <td className="p-5 font-bold text-emerald-400">{e.prob}</td>
                  <td className="p-5">
                    <span className={`px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest ${e.stat === 'ACTIVE' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-slate-800 text-slate-400'}`}>
                      {e.stat}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-slate-500">
                    No matching intelligence intercepts found for "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}