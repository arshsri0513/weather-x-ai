"use client";
import React, { createContext, useContext, useState } from 'react';

type MapContextType = {
  mapCenter: [number, number];
  setMapCenter: (center: [number, number]) => void;
  mapZoom: number;
  setMapZoom: (zoom: number) => void;
  searchedLocations: string[];
  addSearchedLocation: (loc: string) => void;
  forecastHorizon: number;
  setForecastHorizon: (days: number) => void;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 50]);
  const [mapZoom, setMapZoom] = useState(3);
  const [searchedLocations, setSearchedLocations] = useState<string[]>([]);
  const [forecastHorizon, setForecastHorizon] = useState<number>(7);

  const addSearchedLocation = (loc: string) => {
    setSearchedLocations(prev => [loc, ...prev]);
  };

  return (
    <MapContext.Provider value={{ mapCenter, setMapCenter, mapZoom, setMapZoom, searchedLocations, addSearchedLocation, forecastHorizon, setForecastHorizon }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const context = useContext(MapContext);
  if (!context) throw new Error("useMapContext must be used within MapProvider");
  return context;
}
