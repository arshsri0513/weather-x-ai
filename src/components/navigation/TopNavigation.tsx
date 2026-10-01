"use client";
import { Search, User, Globe, Loader2 } from "lucide-react";
import { useState } from "react";
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
    <header className="h-16 bg-[var(--color-panel)] border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-50">
      <div className="flex items-center gap-4 flex-1">
        {/* Search */}
        <div className="relative w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {isSearching ? <Loader2 size={16} className="text-slate-500 animate-spin" /> : <Search size={16} className="text-slate-500" />}
          </div>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search city, state, region or coordinates (Press Enter)..." 
            className="block w-full pl-9 pr-3 py-2 border border-slate-700 rounded-lg bg-[var(--color-background)] text-slate-300 placeholder-slate-500 focus:outline-none focus:border-[var(--color-accent)] text-sm transition-all"
          />
          {errorMsg && (
            <div className="absolute top-12 left-0 w-full bg-slate-900 border border-[var(--color-critical)]/50 text-[var(--color-critical)] text-xs p-2.5 rounded-lg shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
              {errorMsg}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-slate-400 font-medium bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800">
          <Globe size={16} className="text-[var(--color-accent)]"/>
          Forecast Horizon: <span className="text-white font-bold">14 Days</span>
        </div>
        
        <div className="h-6 w-px bg-slate-700"></div>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}
