"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Map, Calendar, Activity, PieChart, 
  Cpu, Network, AlertTriangle, History, BookOpen, 
  Server, Database, Settings, Info 
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Anomaly Map", href: "/anomaly-map", icon: Map },
  { name: "Forecast", href: "/forecast", icon: Calendar },
  { name: "Event Tracking", href: "/events", icon: Activity },
  { name: "Analytics", href: "/analytics", icon: PieChart },
  { name: "AI Models", href: "/models", icon: Cpu },
  { name: "Data Fusion", href: "/data-fusion", icon: Network },
  { name: "Alerts", href: "/alerts", icon: AlertTriangle },
  { name: "History", href: "/history", icon: History },
  { name: "Methodology", href: "/methodology", icon: BookOpen },
];

const UTILITY_ITEMS = [
  { name: "System Status", href: "/status", icon: Server, status: "online" },
  { name: "Data Sources", href: "/sources", icon: Database },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "About", href: "/about", icon: Info },
];

export function NavigationSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[var(--color-panel)] border-r border-slate-800 flex flex-col shrink-0">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <Activity className="text-[var(--color-accent)]" />
          WEATHER-X <span className="text-[var(--color-accent)]">AI</span>
        </h1>
        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-semibold">
          AI-Driven Intelligence
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                isActive 
                  ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 pb-12 border-t border-slate-800 space-y-1">
        {UTILITY_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Icon size={16} />
              <span className="flex-1">{item.name}</span>
              {item.status === 'online' && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
