"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { PieChart, Activity, Target } from "lucide-react";

const chartData = [
  { name: 'Day 1', rainfall: 45, heat: 24, wind: 24 },
  { name: 'Day 3', rainfall: 52, heat: 28, wind: 22 },
  { name: 'Day 5', rainfall: 82, heat: 32, wind: 28 },
  { name: 'Day 7', rainfall: 146, heat: 48, wind: 45 }, // Peak anomaly
  { name: 'Day 9', rainfall: 90, heat: 35, wind: 30 },
  { name: 'Day 11', rainfall: 65, heat: 28, wind: 25 },
  { name: 'Day 14', rainfall: 50, heat: 25, wind: 20 },
];

const regionalData = [
  { region: 'North', risk: 85, normal: 30 },
  { region: 'East Coast', risk: 92, normal: 45 },
  { region: 'West Coast', risk: 78, normal: 60 },
  { region: 'Central', risk: 45, normal: 25 },
  { region: 'South', risk: 65, normal: 40 },
];

const radarData = [
  { subject: 'Thermal', A: 95, fullMark: 100 },
  { subject: 'Rainfall', A: 85, fullMark: 100 },
  { subject: 'Wind', A: 65, fullMark: 100 },
  { subject: 'Drought', A: 30, fullMark: 100 },
  { subject: 'Pressure', A: 75, fullMark: 100 },
  { subject: 'Cyclone', A: 80, fullMark: 100 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-10 max-w-7xl mx-auto pb-20">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Geospatial Analytics</h2>
          <p className="text-slate-400 mt-2 text-sm">Longitudinal statistical analysis of extreme weather signatures.</p>
        </div>
        <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 px-5 py-2.5 rounded-lg text-sm font-bold text-[var(--color-accent)] shadow-[0_0_15px_rgba(56,189,248,0.2)]">
          Live Model: Next 14 Days
        </div>
      </div>

      <div className="space-y-8">
        
        {/* Top Row: Main Line/Area Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart 1: Anomaly Intensity Trends */}
          <div className="bg-[var(--color-panel)] border border-slate-800 rounded-3xl p-8 shadow-2xl hover:border-slate-600 transition-colors">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
              <PieChart size={18} className="text-[var(--color-accent)]"/> Global Anomaly Intensity
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorHeat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-high)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--color-high)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="rainfall" stroke="var(--color-accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorRain)" />
                  <Area type="monotone" dataKey="heat" stroke="var(--color-high)" strokeWidth={3} fillOpacity={1} fill="url(#colorHeat)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Deviation vs Historical Baseline */}
          <div className="bg-[var(--color-panel)] border border-slate-800 rounded-3xl p-8 shadow-2xl hover:border-slate-600 transition-colors">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
              <Activity size={18} className="text-[var(--color-critical)]"/> Deviation vs Historical Baseline
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="rainfall" name="AI Forecast" stroke="var(--color-critical)" strokeWidth={3} dot={{r: 4, fill: "var(--color-critical)", strokeWidth: 0}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="wind" name="Historical Normal" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Row: Bar Chart and Radar Chart to fill space */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Regional Volatility */}
          <div className="lg:col-span-2 bg-[var(--color-panel)] border border-slate-800 rounded-3xl p-8 shadow-2xl hover:border-slate-600 transition-colors">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
              <Activity size={18} className="text-purple-400"/> Regional Volatility Index (India)
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="region" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: '#1e293b', opacity: 0.4}}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}/>
                  <Bar dataKey="normal" name="Historical Baseline" fill="#334155" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="risk" name="AI Projected Risk" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Threat Matrix Radar */}
          <div className="bg-[var(--color-panel)] border border-slate-800 rounded-3xl p-8 shadow-2xl hover:border-slate-600 transition-colors flex flex-col">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-3">
              <Target size={18} className="text-[var(--color-high)]"/> Threat Matrix Vector
            </h3>
            <div className="flex-1 w-full min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Threat Level" dataKey="A" stroke="var(--color-high)" fill="var(--color-high)" fillOpacity={0.4} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}