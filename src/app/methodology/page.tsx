"use client";
import { BookOpen, ArrowDown } from "lucide-react";

export default function MethodologyPage() {
  return (
    <div className="p-10 max-w-4xl mx-auto pb-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black text-white tracking-tight mb-4">Scientific Methodology</h2>
        <p className="text-slate-400 text-lg">Understanding the AI pipeline from raw ingestion to risk classification.</p>
      </div>

      <div className="space-y-6">
        {[
          { title: "1. Data Ingestion & Harmonization", desc: "Raw data from Satellite imagery, weather radar, and NWP models are ingested and harmonized into a uniform spatio-temporal grid." },
          { title: "2. Climatological Baselining", desc: "A 30-year historical baseline is established to define 'normal' conditions for any given grid cell on any given day of the year." },
          { title: "3. Spatio-Temporal Transformer (AI)", desc: "The core deep learning model evaluates the harmonized grid to detect non-linear atmospheric relationships and project forward up to 14 days." },
          { title: "4. Z-Score Anomaly Calculation", desc: "The AI projection is compared against the climatological baseline to generate a statistical Z-Score (deviation from the norm)." },
          { title: "5. Risk Classification", desc: "Anomalies with |Z| > 2.0 are flagged as High Risk, and |Z| > 3.0 trigger Critical Extreme alerts." }
        ].map((step, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="bg-[var(--color-panel)] border border-[var(--color-accent)]/20 p-8 rounded-2xl w-full text-center shadow-lg hover:border-[var(--color-accent)]/50 transition-colors">
              <h3 className="text-[var(--color-accent)] font-bold text-xl mb-2">{step.title}</h3>
              <p className="text-slate-300 text-sm">{step.desc}</p>
            </div>
            {i < 4 && <ArrowDown className="text-slate-600 my-4" size={24} />}
          </div>
        ))}
      </div>
    </div>
  )
}