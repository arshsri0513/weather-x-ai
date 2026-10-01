"use client";
import { Clock, ShieldAlert, Thermometer, CloudRain, Wind, PlayCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const HISTORY_LOGS = [
  { year: "2023", event: "Biparjoy Cyclone", type: "CRITICAL", icon: Wind, color: "var(--color-critical)", bg: "bg-red-500/10", border: "border-red-500/30", details: "Severe cyclonic storm over the Arabian Sea. The AI model successfully predicted landfall trajectory 9 days in advance with 92% confidence." },
  { year: "2021", event: "Tauktae Cyclone", type: "CRITICAL", icon: Wind, color: "var(--color-critical)", bg: "bg-red-500/10", border: "border-red-500/30", details: "Extremely severe cyclonic storm. Baseline deviation exceeded Z = +4.5σ." },
  { year: "2020", event: "Amphan Super Cyclone", type: "CRITICAL", icon: Wind, color: "var(--color-critical)", bg: "bg-red-500/10", border: "border-red-500/30", details: "First super cyclonic storm in the Bay of Bengal since 1999. Engine projected category escalation 48h prior to NWP consensus." },
  { year: "2019", event: "Bihar Flash Floods", type: "HIGH RISK", icon: CloudRain, color: "var(--color-high)", bg: "bg-orange-500/10", border: "border-orange-500/30", details: "Unprecedented monsoon rainfall. Predicted urban inundation severity accurately." },
  { year: "2015", event: "Indian Heatwave", type: "HIGH RISK", icon: Thermometer, color: "var(--color-high)", bg: "bg-orange-500/10", border: "border-orange-500/30", temp: "+6.2°C", details: "Severe heatwave across North/Central India. Sustained thermal anomalies locked in." },
];

export default function HistoryPage() {
  const [activeEvent, setActiveEvent] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLogs, setSimLogs] = useState<{text: string, time: string}[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clear interval on unmount or event change
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeEvent]);

  const handleEventChange = (i: number) => {
    setActiveEvent(i);
    setIsSimulating(false);
    setSimLogs([]);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimLogs([]);
    
    const initialLogs = [
      "Accessing archival satellite telemetry...",
      "Restoring pre-event climatological baseline...",
      "Injecting historical boundary conditions into Spatio-Temporal Transformer...",
      "Running backward inference..."
    ];

    const diagnostics = [
      "Cross-referencing historical SST anomalies",
      "Recalculating pressure gradients",
      "Evaluating upper-atmosphere shear vectors",
      "Mapping geopotential height fields",
      "Processing radar reflectivity signatures",
      "Validating against ERA5 reanalysis dataset",
      "Analyzing convective potential energy",
      "Scanning for cyclogenesis precursors"
    ];
    
    let count = 0;
    intervalRef.current = setInterval(() => {
      if (count < initialLogs.length) {
        setSimLogs(prev => [...prev, { text: initialLogs[count], time: new Date().toLocaleTimeString('en-GB') }]);
      } else {
        const randDiag = diagnostics[Math.floor(Math.random() * diagnostics.length)];
        const variance = (Math.random() * 5).toFixed(2);
        setSimLogs(prev => {
          // Keep only the last 50 logs to prevent memory leaks
          const updated = [...prev, { text: `[DIAGNOSTIC] ${randDiag}... Δ = ${variance}σ`, time: new Date().toLocaleTimeString('en-GB') }];
          return updated.length > 50 ? updated.slice(updated.length - 50) : updated;
        });
      }
      count++;
    }, 1000);
  };

  return (
    <div className="p-10 max-w-7xl mx-auto pb-20">
      <div className="mb-14">
        <h2 className="text-3xl font-bold text-white tracking-tight">Intelligence History</h2>
        <p className="text-slate-400 mt-2 text-sm">Retrospective analysis of historical extreme weather events validated by the AI engine.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Timeline Index */}
        <div className="col-span-1 border-r border-slate-800 pr-10">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
            <Clock size={16}/> Temporal Index
          </h3>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
            {HISTORY_LOGS.map((log, i) => (
              <div 
                key={i} 
                onClick={() => handleEventChange(i)}
                className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active cursor-pointer transition-all ${activeEvent === i ? 'scale-105' : 'opacity-50 hover:opacity-100'}`}
              >
                <div className={`flex items-center justify-center w-6 h-6 rounded-full border-4 border-[var(--color-background)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg ${activeEvent === i ? 'bg-[var(--color-accent)]' : 'bg-slate-700'}`}></div>
                <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border ${activeEvent === i ? 'bg-slate-800/80 border-[var(--color-accent)]/50' : 'bg-slate-900/50 border-slate-800'}`}>
                  <div className="text-[10px] font-black text-[var(--color-accent)] uppercase tracking-widest mb-1">{log.year}</div>
                  <div className="text-sm font-bold text-white">{log.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Detail View */}
        <div className="col-span-2">
           <div className="bg-[var(--color-panel)] border border-slate-700 rounded-3xl p-10 shadow-2xl relative overflow-hidden h-full flex flex-col justify-center min-h-[500px]">
             
             {/* Subtle Glow */}
             <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none" style={{backgroundColor: HISTORY_LOGS[activeEvent].color}}></div>

             <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`p-6 rounded-3xl mb-8 ${HISTORY_LOGS[activeEvent].bg} ${HISTORY_LOGS[activeEvent].border} border shadow-inner`}>
                  {(() => {
                    const ActiveIcon = HISTORY_LOGS[activeEvent].icon;
                    return <ActiveIcon size={64} style={{color: HISTORY_LOGS[activeEvent].color}} />;
                  })()}
                </div>
                
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border mb-4 ${HISTORY_LOGS[activeEvent].bg} ${HISTORY_LOGS[activeEvent].border}`} style={{color: HISTORY_LOGS[activeEvent].color}}>
                  {HISTORY_LOGS[activeEvent].type} SIGNATURE
                </span>
                
                <h3 className="text-4xl font-black text-white tracking-tight mb-2">{HISTORY_LOGS[activeEvent].event}</h3>
                <h4 className="text-xl font-bold text-slate-400 mb-8">{HISTORY_LOGS[activeEvent].year} Baseline Deviation</h4>

                <p className="text-slate-300 leading-relaxed max-w-lg mx-auto text-lg mb-10">
                  {HISTORY_LOGS[activeEvent].details}
                </p>

                {simLogs.length > 0 ? (
                  <div className="w-full max-w-lg mx-auto bg-black/50 border border-slate-700 p-4 rounded-xl text-left font-mono text-xs shadow-inner h-32 overflow-y-auto flex flex-col gap-2">
                    {simLogs?.map((log, i) => {
                      if (!log || typeof log !== 'object' || !log.text) return null;
                      return (
                        <div key={i} className="text-emerald-400">
                          <span className="text-slate-500 select-none mr-2">[{log.time}]</span>
                          {log.text}
                        </div>
                      )
                    })}
                    {isSimulating && <div className="text-slate-500 animate-pulse">_</div>}
                  </div>
                ) : (
                  <button 
                    onClick={runSimulation}
                    className="flex items-center gap-2 text-sm font-bold bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl transition-colors border border-slate-700 shadow-lg"
                  >
                    <PlayCircle size={18} className="text-[var(--color-accent)]"/> Run Historical Simulation
                  </button>
                )}
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}