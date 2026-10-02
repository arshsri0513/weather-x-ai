"use client";
import dynamic from "next/dynamic";
import { Play, Pause } from "lucide-react";
import { useState, useEffect } from "react";
import { useMapContext } from "@/lib/MapContext";

const GlobalMap = dynamic(() => import("@/components/maps/GlobalMap"), { ssr: false });

export default function AnomalyMapPage() {
  const { forecastHorizon } = useMapContext();
  const [timeStep, setTimeStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [activeLayers, setActiveLayers] = useState({
    temperature: true,
    precipitation: true,
    wind: true
  });

  // Auto-play logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeStep((prev) => {
          if (prev >= forecastHorizon) {
            setIsPlaying(false);
            return forecastHorizon;
          }
          return prev + 1;
        });
      }, 1000); // Advance 1 day every 1 second
    }
    return () => clearInterval(interval);
  }, [isPlaying, forecastHorizon]);

  const togglePlay = () => {
    if (timeStep >= forecastHorizon) {
      setTimeStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)] flex flex-col p-4 bg-[#07111F]">
      
      {/* Map takes up entire background */}
      <div className="flex-1 relative z-0 h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
         <GlobalMap timeStep={timeStep} activeLayers={activeLayers} />
      </div>

      {/* Overlays */}
      <div className="absolute top-8 left-8 z-10 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl pointer-events-auto">
         <h3 className="text-white font-bold text-sm mb-3">Geospatial Layers</h3>
         <div className="flex flex-col gap-2.5 text-xs">
           <label className="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white transition-colors">
             <input 
                type="checkbox" 
                checked={activeLayers.temperature}
                onChange={(e) => setActiveLayers({...activeLayers, temperature: e.target.checked})}
                className="accent-[var(--color-accent)] w-3.5 h-3.5"
             /> 
             Temperature Fields
           </label>
           <label className="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white transition-colors">
             <input 
                type="checkbox" 
                checked={activeLayers.precipitation}
                onChange={(e) => setActiveLayers({...activeLayers, precipitation: e.target.checked})}
                className="accent-[var(--color-accent)] w-3.5 h-3.5"
             /> 
             Precipitation Radar
           </label>
           <label className="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white transition-colors">
             <input 
                type="checkbox" 
                checked={activeLayers.wind}
                onChange={(e) => setActiveLayers({...activeLayers, wind: e.target.checked})}
                className="accent-[var(--color-accent)] w-3.5 h-3.5"
             /> 
             Wind Vectors
           </label>
         </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 w-11/12 max-w-4xl bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl p-5 shadow-2xl flex items-center gap-6 pointer-events-auto">
          <button 
            onClick={togglePlay}
            className="bg-[var(--color-accent)] text-slate-900 hover:bg-sky-400 p-3 rounded-full transition-all shadow-lg shadow-[var(--color-accent)]/20 hover:scale-105 active:scale-95"
          >
            {isPlaying ? <Pause size={20} className="fill-slate-900" /> : <Play size={20} className="ml-0.5 fill-slate-900" />}
          </button>
          
          <div className="flex-1">
            <div className="flex justify-between items-end mb-3">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest bg-slate-800 px-2 py-1 rounded">NOW</span>
              <span className="text-xs font-black text-slate-900 uppercase bg-[var(--color-accent)] px-4 py-1.5 rounded-full shadow-lg shadow-[var(--color-accent)]/20 tracking-wider transition-all">
                T+ {timeStep * 24} HOURS
              </span>
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest bg-slate-800 px-2 py-1 rounded">{forecastHorizon} DAYS</span>
            </div>
            <input 
              type="range" 
              min="0" max={forecastHorizon} 
              value={timeStep > forecastHorizon ? forecastHorizon : timeStep}
              onChange={(e) => {
                setTimeStep(Number(e.target.value));
                setIsPlaying(false);
              }}
              className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-[var(--color-accent)] outline-none"
            />
          </div>
        </div>
    </div>
  );
}