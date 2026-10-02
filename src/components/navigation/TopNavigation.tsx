"use client";
import { Search, User, Globe, Loader2, Activity, Volume2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useMapContext } from "@/lib/MapContext";

export function TopNavigation() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { setMapCenter, setMapZoom, addSearchedLocation } = useMapContext();

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      setIsSearching(true);
      setErrorMsg("");
      try {
        // Primary Search
        let res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
        let data = await res.json();
        
        // Smart Fallback (Mimic Google Maps Leniency)
        // If a highly specific street address fails (e.g. "Chilwaniya road motihari"),
        // fallback to searching just the last word (the city).
        if (!data || data.length === 0) {
          const parts = query.trim().split(" ");
          if (parts.length > 1) {
            const cityFallback = parts[parts.length - 1];
            res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityFallback)}`);
            data = await res.json();
          }
        }

        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setMapCenter([lat, lon]);
          setMapZoom(13); // Zoom in extremely close (street/district level)
          
          // Add this location to the context so it appears in the Intelligence Feed
          addSearchedLocation(query);
          
        } else {
          setErrorMsg("Address too specific. Try searching just the city name (e.g. 'Motihari').");
        }
      } catch (err) {
        console.error("Geocoding failed", err);
        setErrorMsg("Network error during search.");
      } finally {
        setIsSearching(false);
      }
    }
  };

  return (
    <header className="h-16 bg-[var(--color-panel)] border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-50 overflow-hidden">
      <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
        {/* Search */}
        <div className="relative w-64 xl:w-96 shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {isSearching ? <Loader2 size={16} className="text-slate-500 animate-spin" /> : <Search size={16} className="text-slate-500" />}
          </div>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search city or coordinates..." 
            className="block w-full pl-9 pr-3 py-2 border border-slate-700 rounded-lg bg-[var(--color-background)] text-slate-300 placeholder-slate-500 focus:outline-none focus:border-[var(--color-accent)] text-sm transition-all"
          />
          {errorMsg && (
            <div className="absolute top-12 left-0 w-full bg-slate-900 border border-[var(--color-critical)]/50 text-[var(--color-critical)] text-xs p-2.5 rounded-lg shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Live Telemetry Bar */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-6 ml-2 xl:ml-6 text-[9px] xl:text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap overflow-hidden min-w-0" style={{ maskImage: 'linear-gradient(to right, black 80%, transparent 100%)' }}>
          <div className="flex items-center gap-2 shrink-0">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
             Nodes: <span className="text-white">12,492</span>
          </div>
          <div className="h-3 w-px bg-slate-800 shrink-0"></div>
          <div className="flex items-center gap-2 shrink-0">
             <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></div>
             Latency: <span className="text-white">14ms</span>
          </div>
          <div className="h-3 w-px bg-slate-800 shrink-0"></div>
          <div className="flex items-center gap-2 shrink-0">
             <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_red]"></div>
             Threat: <span className="text-white">Elevated</span>
          </div>
          <div className="h-3 w-px bg-slate-800 shrink-0 hidden xl:block"></div>
          <div className="hidden xl:flex items-center gap-2 text-purple-400 shrink-0">
             <Activity size={12}/> Core Sync
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 xl:gap-6 shrink-0">
        
        {/* Language / Voice Selector */}
        <div className="hidden md:flex items-center gap-2 text-sm text-slate-400 font-medium bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors group relative">
          <button 
            onClick={() => {
              const select = document.getElementById('voice-lang-select') as HTMLSelectElement;
              const lang = select ? select.value : 'en-US';
              if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const msg = new SpeechSynthesisUtterance();
                msg.lang = lang;
                if (lang.startsWith('hi')) msg.text = "Weather-X AI mein aapka swagat hai. AI-driven intelligence.";
                else msg.text = "Welcome to Weather-X AI. AI-driven intelligence.";
                msg.rate = 0.9;
                msg.volume = 1.0;
                window.speechSynthesis.speak(msg);
              }
            }}
            className="cursor-pointer hover:scale-110 transition-transform p-1 rounded-full hover:bg-slate-800"
            title="Play Audio Announcement"
          >
            <Volume2 size={16} className="text-[var(--color-accent)] group-hover:animate-pulse"/>
          </button>
          <select 
            id="voice-lang-select" 
            defaultValue="en-US" 
            onChange={(e) => {
              const lang = e.target.value;
              if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const msg = new SpeechSynthesisUtterance();
                msg.lang = lang;
                if (lang.startsWith('hi')) msg.text = "Weather-X AI mein aapka swagat hai. AI-driven intelligence.";
                else msg.text = "Welcome to Weather-X AI. AI-driven intelligence.";
                msg.rate = 0.9;
                msg.volume = 1.0;
                window.speechSynthesis.speak(msg);
              }
            }}
            className="bg-transparent text-white font-bold outline-none cursor-pointer appearance-none pr-4 uppercase tracking-widest text-xs [&>option]:bg-slate-900 [&>option]:text-white [&>option]:p-2"
          >
            <option value="en-US">ENG</option>
            <option value="hi-IN">HIN</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
             <div className="w-1.5 h-1.5 border-r border-b border-slate-400 transform rotate-45"></div>
          </div>
        </div>

        <button 
          onClick={() => {
            const el = document.getElementById('forecast-span');
            if (el) {
              if (el.innerText === '14 Days') el.innerText = '7 Days';
              else if (el.innerText === '7 Days') el.innerText = '24 Hours';
              else el.innerText = '14 Days';
            }
          }}
          className="hidden sm:flex items-center gap-2 text-sm text-slate-400 font-medium bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer active:scale-95"
        >
          <Activity size={16} className="text-[var(--color-accent)]"/>
          Forecast: <span id="forecast-span" className="text-white font-bold">14 Days</span>
        </button>
        
        <div className="h-6 w-px bg-slate-700 hidden sm:block"></div>
        
        <div className="flex items-center gap-2">
          <Link href="/login" className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer shrink-0">
            <User size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}
