"use client";
import { CloudRain, Thermometer, Wind, Calendar, AlertTriangle, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

const FORECAST_DATA = [
  {
    period: "Day 1 - Day 3 (Near Term)",
    status: "CRITICAL",
    color: "var(--color-critical)",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    confidence: 94,
    temp: { val: "+5.1°C", trend: "up", desc: "Severe heat dome locked over northern plains. Unsafe outdoor conditions." },
    rain: { val: "-40%", trend: "down", desc: "Significant precipitation deficit continuing." },
    wind: { val: "Normal", trend: "flat", desc: "Stagnant air mass contributing to heat retention." }
  },
  {
    period: "Day 4 - Day 7 (Medium Range)",
    status: "HIGH RISK",
    color: "var(--color-high)",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    confidence: 78,
    temp: { val: "+2.0°C", trend: "down", desc: "Heatwave breaking as low pressure system moves in from the coast." },
    rain: { val: "+150%", trend: "up", desc: "Torrential downpours expected. High flash flood risk in urban centers." },
    wind: { val: "+35 km/h", trend: "up", desc: "Squall lines forming ahead of the precipitation front." }
  },
  {
    period: "Day 8 - Day 14 (Extended)",
    status: "MODERATE",
    color: "var(--color-moderate)",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    confidence: 62,
    temp: { val: "-1.5°C", trend: "down", desc: "Temperatures dropping slightly below historical baseline." },
    rain: { val: "+20%", trend: "flat", desc: "Lingering scattered showers. Flood waters receding slowly." },
    wind: { val: "Normal", trend: "down", desc: "Atmospheric stabilization expected across the region." }
  }
];

export default function ForecastPage() {
  const renderTrend = (trend: string, color: string) => {
    if (trend === 'up') return <ArrowUpRight size={16} className="text-red-400" />;
    if (trend === 'down') return <ArrowDownRight size={16} className="text-emerald-400" />;
    return <Activity size={16} className="text-slate-500" />;
  };

  return (
    <div className="p-10 max-w-7xl mx-auto pb-20">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Medium-Range Forecast</h2>
          <p className="text-slate-400 mt-2 text-sm">14-day AI projection horizon across primary meteorological variables for the Indian Subcontinent.</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Model Resolution</div>
          <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-sm font-bold text-slate-300">
            9km Spatio-Temporal Grid
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {FORECAST_DATA.map((data, i) => (
          <div key={i} className="bg-[var(--color-panel)] border border-slate-800 rounded-3xl p-8 hover:border-slate-600 transition-colors shadow-2xl relative overflow-hidden group">
            
            {/* Background Accent Gradient */}
            <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-5 pointer-events-none transition-opacity group-hover:opacity-10`} style={{backgroundColor: data.color}}></div>

            <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800 relative z-10">
              <h3 className="text-base font-black text-white uppercase tracking-widest flex items-center gap-3">
                <Calendar size={20} style={{color: data.color}}/> {data.period}
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">AI Confidence</span>
                  <span className="text-emerald-400 font-black">{data.confidence}%</span>
                </div>
                <div className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest border ${data.bg} ${data.border}`} style={{color: data.color}}>
                  {data.status}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
              {/* Temp */}
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-800 rounded-lg">
                      <Thermometer className="text-[var(--color-high)]" size={20}/>
                    </div>
                    <div className="text-slate-300 font-bold text-sm uppercase tracking-wider">Temperature</div>
                  </div>
                  {renderTrend(data.temp.trend, data.color)}
                </div>
                <div className="text-3xl font-black text-white mb-2">{data.temp.val}</div>
                <div className="text-slate-400 text-xs leading-relaxed">{data.temp.desc}</div>
              </div>

              {/* Rain */}
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-800 rounded-lg">
                      <CloudRain className="text-[var(--color-accent)]" size={20}/>
                    </div>
                    <div className="text-slate-300 font-bold text-sm uppercase tracking-wider">Precipitation</div>
                  </div>
                  {renderTrend(data.rain.trend, data.color)}
                </div>
                <div className="text-3xl font-black text-white mb-2">{data.rain.val}</div>
                <div className="text-slate-400 text-xs leading-relaxed">{data.rain.desc}</div>
              </div>

              {/* Wind */}
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-800 rounded-lg">
                      <Wind className="text-slate-400" size={20}/>
                    </div>
                    <div className="text-slate-300 font-bold text-sm uppercase tracking-wider">Wind Velocity</div>
                  </div>
                  {renderTrend(data.wind.trend, data.color)}
                </div>
                <div className="text-3xl font-black text-white mb-2">{data.wind.val}</div>
                <div className="text-slate-400 text-xs leading-relaxed">{data.wind.desc}</div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}