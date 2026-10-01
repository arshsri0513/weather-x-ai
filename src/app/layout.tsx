import type { Metadata } from "next";
import "./globals.css";
import { NavigationSidebar } from "@/components/navigation/Sidebar";
import { TopNavigation } from "@/components/navigation/TopNavigation";
import { MapProvider } from "@/lib/MapContext";

export const metadata: Metadata = {
  title: "WEATHER-X AI | Command Center",
  description: "AI-Driven Spatio-Temporal Extreme Weather Intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="flex h-screen w-screen overflow-hidden bg-[var(--color-background)]">
        <MapProvider>
          <NavigationSidebar />
          <div className="flex flex-col flex-1 overflow-hidden relative">
            <TopNavigation />
            <main className="flex-1 overflow-auto relative">
              {children}
            </main>
          </div>
        </MapProvider>
      </body>
    </html>
  );
}
