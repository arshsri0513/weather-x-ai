"use client";
import { Lock, User, Key, ShieldCheck, Activity } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-[var(--color-background)]">
      
      {/* Background aesthetics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[var(--color-panel)] border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-xl">
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner relative overflow-hidden">
            <Activity className="text-[var(--color-accent)] relative z-10" size={32} />
            <div className="absolute inset-0 bg-[var(--color-accent)]/20 blur-md"></div>
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-2xl font-black text-white tracking-tight mb-2">WEATHER-X <span className="text-[var(--color-accent)]">AI</span></h1>
          <p className="text-xs text-slate-500 tracking-widest uppercase font-bold">Secure Command Authorization</p>
        </div>

        {success ? (
          <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
            <ShieldCheck size={64} className="text-emerald-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Access Granted</h2>
            <p className="text-slate-400 text-sm">Establishing secure telemetry link...</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Operator ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={16} className="text-slate-500" />
                </div>
                <input 
                  type="text" 
                  required
                  placeholder="Enter Operator ID" 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Access Passcode</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Key size={16} className="text-slate-500" />
                </div>
                <input 
                  type="password"
                  required 
                  placeholder="••••••••••••" 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[var(--color-accent)] hover:bg-sky-400 text-slate-900 font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-lg shadow-[var(--color-accent)]/20"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                  AUTHENTICATING...
                </>
              ) : (
                <>
                  <Lock size={18} />
                  INITIALIZE UPLINK
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  )
}
