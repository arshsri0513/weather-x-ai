"use client";
import { Lock, Mail, Key, ShieldCheck, Activity, Code, Globe, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
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

  const SocialButton = ({ icon: Icon, provider }: { icon: any, provider: string }) => (
    <button 
      type="button"
      className="w-full flex items-center justify-center gap-3 bg-slate-900 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-all"
    >
      <Icon size={18} />
      Continue with {provider}
    </button>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-[var(--color-background)]">
      
      {/* Background aesthetics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[var(--color-panel)] border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-xl">
        
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <Activity className="text-[var(--color-accent)]" size={28} />
            <span className="text-2xl font-black text-white tracking-tight">WEATHER-X <span className="text-[var(--color-accent)]">AI</span></span>
          </Link>
          <h2 className="text-xl font-bold text-white mb-2">{isLogin ? 'Welcome back' : 'Create your account'}</h2>
          <p className="text-sm text-slate-400">
            {isLogin ? "Enter your credentials to access the command center." : "Sign up to start monitoring global weather anomalies."}
          </p>
        </div>

        {success ? (
          <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
            <ShieldCheck size={64} className="text-emerald-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Authentication Successful</h2>
            <p className="text-slate-400 text-sm">Redirecting to dashboard...</p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="flex gap-4">
              <SocialButton icon={Globe} provider="Google" />
              <SocialButton icon={Code} provider="GitHub" />
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink-0 mx-4 text-xs text-slate-500 uppercase font-bold tracking-widest">Or continue with email</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <form onSubmit={handleAuth} className="space-y-5">
              
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Arsh Srivastava" 
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={16} className="text-slate-500" />
                  </div>
                  <input 
                    type="email" 
                    required
                    placeholder="name@example.com" 
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-slate-300">Password</label>
                  {isLogin && <a href="#" className="text-xs text-[var(--color-accent)] hover:underline">Forgot password?</a>}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Key size={16} className="text-slate-500" />
                  </div>
                  <input 
                    type="password"
                    required 
                    placeholder="••••••••" 
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[var(--color-accent)] hover:bg-sky-400 text-slate-900 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2 shadow-lg shadow-[var(--color-accent)]/20"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                    Authenticating...
                  </>
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="text-center text-sm text-slate-400 mt-6">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)}
                className="text-[var(--color-accent)] font-bold hover:underline"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
