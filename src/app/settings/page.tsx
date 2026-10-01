"use client";
import { Settings, Save, Bell, Shield, Map } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Settings className="text-slate-300" /> Platform Settings
        </h2>
        <p className="text-slate-400 mt-2 text-sm">Configure your command center experience.</p>
      </div>

      <div className="bg-[#050B14] border border-slate-800 rounded-2xl p-8 space-y-8">
        
        <div>
          <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Map size={18}/> Default Region</h3>
          <select className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-[var(--color-accent)]">
            <option>India (Primary)</option>
            <option>Global</option>
            <option>North America</option>
            <option>Europe</option>
          </select>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Bell size={18}/> Alert Thresholds</h3>
          <div className="space-y-3">
            {['Notify on CRITICAL threats', 'Notify on HIGH RISK threats', 'Enable Audio Sirens'].map(opt => (
              <label key={opt} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-[var(--color-accent)] focus:ring-[var(--color-accent)]" />
                <span className="text-slate-300 text-sm">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Shield size={18}/> Developer Mode</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-[var(--color-accent)] focus:ring-[var(--color-accent)]" />
            <span className="text-slate-300 text-sm">Show Raw Telemetry Data</span>
          </label>
        </div>

        <div className="pt-6 border-t border-slate-800">
          <button 
            onClick={() => setSaved(true)}
            className="flex items-center gap-2 bg-[var(--color-accent)] text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-sky-400 transition-colors"
          >
            <Save size={18} />
            {saved ? "SAVED" : "SAVE CONFIGURATION"}
          </button>
        </div>

      </div>
    </div>
  )
}
