"use client";

import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl, useMap, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Thermometer, Wind, CloudRain, Sun, Activity } from 'lucide-react';
import { useMapContext } from '@/lib/MapContext';

interface GlobalMapProps {
  timeStep?: number;
  activeLayers?: {
    temperature: boolean;
    precipitation: boolean;
    wind: boolean;
  };
}

// Helper component to update map view based on Context
function MapController() {
  const map = useMap();
  const { mapCenter, mapZoom } = useMapContext();

  useEffect(() => {
    map.flyTo(mapCenter, mapZoom, { animate: true, duration: 0.3 }); // Extremely fast camera snap
  }, [mapCenter, mapZoom, map]);

  return null;
}

export default function GlobalMap({ 
  timeStep = 0, 
  activeLayers = { temperature: true, precipitation: true, wind: true } 
}: GlobalMapProps) {
  const [mounted, setMounted] = useState(false);
  const { mapCenter, mapZoom } = useMapContext();

  useEffect(() => setMounted(true), []);

  // Generate massive mock dataset spanning 14 days
  const anomalies = useMemo(() => {
    const types = ['extreme_rainfall', 'heatwave', 'wind', 'drought'];
    const data = [];
    for(let i=0; i<300; i++) {
      data.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        region: 'Geospatial Detection Zone',
        confidence: (Math.random() * 0.4) + 0.55,
        coordinates: [(Math.random() * 120) - 60, (Math.random() * 360) - 180],
        severity: Math.random() > 0.85 ? 'critical' : Math.random() > 0.5 ? 'high' : 'moderate',
        value: `+${Math.floor(Math.random()*100)}% deviation`,
        day: Math.floor(Math.random() * 15) // Day 0 to 14
      });
    }
    // Hardcode some specific ones for demo purposes on day 0
    data.push({ id: 991, type: 'heatwave', region: 'Delhi, India', confidence: 0.99, coordinates: [28.7041, 77.1025], severity: 'critical', value: '+5.1°C', day: 0 });
    data.push({ id: 992, type: 'extreme_rainfall', region: 'Bihar, India', confidence: 0.94, coordinates: [25.0961, 85.3131], severity: 'high', value: '+146%', day: 0 });
    data.push({ id: 994, type: 'wind', region: 'Florida, USA (Hurricane Risk)', confidence: 0.97, coordinates: [27.9944, -81.7603], severity: 'critical', value: '+65% Wind Shear', day: 0 });
    data.push({ id: 995, type: 'wind', region: 'Tokyo, Japan', confidence: 0.88, coordinates: [35.6762, 139.6503], severity: 'high', value: '+40% Gusts', day: 0 });
    data.push({ id: 993, type: 'heatwave', region: 'Haryana, India', confidence: 0.88, coordinates: [29.0588, 76.0856], severity: 'high', value: '+3.5°C', day: 1 });
    
    return data;
  }, []);

  // Generate a global grid of wind vectors to simulate a wind field layer
  const windVectorField = useMemo(() => {
    const vectors = [];
    for (let lat = -70; lat <= 70; lat += 15) {
      for (let lon = -180; lon <= 180; lon += 15) {
        vectors.push({
          id: `wv-${lat}-${lon}`,
          lat, lon,
          direction: Math.random() * 360,
          intensity: Math.random()
        });
      }
    }
    return vectors;
  }, []);

  // Filter the map data precisely based on time AND active layers
  const filteredAnomalies = anomalies.filter(a => {
    if (a.day !== timeStep) return false;
    
    // Layer filtering
    if ((a.type === 'heatwave' || a.type === 'drought') && !activeLayers.temperature) return false;
    if (a.type === 'extreme_rainfall' && !activeLayers.precipitation) return false;
    if (a.type === 'wind' && !activeLayers.wind) return false;
    
    return true;
  });

  if (!mounted) return <div className="w-full h-full bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-500">Loading Geospatial Engine...</div>;

  const getColor = (sev: string) => {
    switch(sev) {
      case 'critical': return '#EF4444';
      case 'high': return '#FB923C';
      case 'moderate': return '#FACC15';
      default: return '#22C55E';
    }
  }

  const getIcon = (type: string) => {
    switch(type) {
      case 'extreme_rainfall': return <CloudRain size={16} />;
      case 'heatwave': return <Thermometer size={16} />;
      case 'wind': return <Wind size={16} />;
      case 'drought': return <Sun size={16} />;
      default: return <Activity size={16} />;
    }
  }

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-slate-800 relative z-0">
      <MapContainer center={mapCenter} zoom={mapZoom} zoomControl={false} style={{ height: '100%', width: '100%', backgroundColor: '#07111F' }}>
        <MapController />
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* The massive global wind vector layer */}
        {activeLayers.wind && windVectorField.map(v => (
          <Marker 
            key={v.id} 
            position={[v.lat, v.lon]}
            icon={L.divIcon({
              className: 'bg-transparent',
              html: `<div style="transform: rotate(${v.direction}deg); opacity: ${0.2 + v.intensity * 0.4}; font-size: 14px; color: #38BDF8; font-weight: bold; pointer-events: none;">↑</div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })}
            interactive={false}
          />
        ))}

        {filteredAnomalies.map(a => (
          <CircleMarker 
            key={a.id} 
            center={a.coordinates as [number, number]} 
            radius={a.confidence * 25}
            pathOptions={{
              color: getColor(a.severity),
              fillColor: getColor(a.severity),
              fillOpacity: 0.4,
              weight: 2
            }}
          >
            <Popup className="custom-popup">
              <div className="font-sans min-w-[200px] bg-slate-900 p-3 rounded-lg border border-slate-700 text-slate-200 shadow-2xl">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-700">
                  <div style={{color: getColor(a.severity)}}>{getIcon(a.type)}</div>
                  <strong className="block uppercase text-white font-bold tracking-wider text-xs">{a.type.replace('_', ' ')}</strong>
                </div>
                <div className="text-xs mb-1"><span className="text-slate-400">Location:</span> {a.region}</div>
                <div className="text-xs mb-1"><span className="text-slate-400">Deviation:</span> {a.value}</div>
                <div className="text-xs mb-2"><span className="text-slate-400">Forecast:</span> T+ {a.day * 24} Hours</div>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-800 text-[10px] font-bold">
                  <span className="text-slate-400">AI CONFIDENCE</span> 
                  <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">{(a.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
