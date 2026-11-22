'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/translations';

interface InversionVisualizerProps {
  lang: Language;
}

export const InversionVisualizer: React.FC<InversionVisualizerProps> = ({ lang }) => {
  const [hour, setHour] = useState<number>(8); // 8 AM default trap, 14 (2 PM) safe

  const isMorningTrap = hour < 12 || hour >= 18;
  const isMiddaySafe = hour >= 12 && hour < 17;

  // Temperature math based on hour
  const groundTemp = isMiddaySafe ? 26 : hour <= 8 ? 13 : 16;
  const ceilingTemp = isMiddaySafe ? 14 : 20; // Inverted in morning (warmer higher up!)
  const inversionStrength = isMorningTrap ? (hour === 8 ? 92 : 78) : 18;

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-7 shadow-sm border border-surface-container space-y-5 overflow-hidden relative">
      {/* Subtle ambient blur */}
      <div
        className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl transition-colors duration-700 pointer-events-none opacity-20 ${
          isMiddaySafe ? 'bg-amber-400' : 'bg-red-600'
        }`}
      />

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 z-10 relative">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors shadow-md ${
              isMiddaySafe
                ? 'bg-gradient-to-tr from-amber-400 to-orange-500 text-white'
                : 'bg-gradient-to-tr from-slate-900 to-red-900 text-red-300'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">
              {isMiddaySafe ? 'wb_sunny' : 'ac_unit'}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-heading text-[10px] font-bold uppercase tracking-wider">
                Atmospheric Fluid Physics
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                {isMiddaySafe ? 'Convective Dispersion' : 'Inversion Smog Lid'}
              </span>
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-extrabold text-primary tracking-tight">
              {lang === 'hi'
                ? 'तापमान उलटाव सिम्युलेटर (प्रदूषण कब उठता और बैठता है?)'
                : 'The Inversion Trap: Why Smog Traps & Rises'}
            </h3>
          </div>
        </div>

        {/* Quick Hour Preset Pills */}
        <div className="flex items-center gap-1.5 bg-surface-container p-1 rounded-xl text-xs font-heading font-bold">
          <button
            onClick={() => setHour(8)}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              hour === 8
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
          >
            <span>🌅 08:00 AM</span>
            <span className="text-[10px] opacity-80">(Smog Trap)</span>
          </button>
          <button
            onClick={() => setHour(14)}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              hour === 14
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
          >
            <span>☀️ 02:00 PM</span>
            <span className="text-[10px] opacity-80">(Safe Window)</span>
          </button>
        </div>
      </div>

      {/* Interactive Time Slider */}
      <div className="bg-surface-container-low p-3.5 rounded-2xl border border-surface-container space-y-2">
        <div className="flex items-center justify-between text-xs font-heading font-semibold text-on-surface">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-secondary">schedule</span>
            <span>Interactive Diurnal Solar Timeline:</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-mono text-xs font-bold">
            {hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`}
          </span>
        </div>
        <input
          type="range"
          min="6"
          max="22"
          step="1"
          value={hour}
          onChange={(e) => setHour(parseInt(e.target.value, 10))}
          className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
          aria-label="Time of day simulation slider"
        />
        <div className="flex justify-between text-[10px] text-on-surface-variant font-mono">
          <span>06:00 AM (Cold Dawn)</span>
          <span className="text-emerald-600 font-bold">12:00 – 03:30 PM (Solar Convective Lift)</span>
          <span>10:00 PM (Nocturnal Reseal)</span>
        </div>
      </div>

      {/* Main High-Tech Atmosphere Simulation Stage */}
      <div
        className={`w-full rounded-2xl relative overflow-hidden transition-all duration-700 min-h-[300px] border shadow-inner flex flex-col justify-between p-4 sm:p-6 ${
          isMiddaySafe
            ? 'bg-gradient-to-b from-sky-400 via-sky-200 to-amber-100 border-emerald-300'
            : 'bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950/80 border-red-900/60'
        }`}
      >
        {/* Sky Elements: Sun or Cold Horizon */}
        <div className="flex items-start justify-between z-10">
          {/* Upper Altitude Gauge */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold shadow-xs ${
                  isMiddaySafe ? 'bg-white/80 text-sky-900' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}
              >
                Alt: 800m – 1,200m
              </span>
              <span className="font-mono text-xs font-bold text-white drop-shadow-md">
                Temp: {ceilingTemp}°C
              </span>
            </div>
            <p className="text-[11px] font-medium text-white/90 drop-shadow-md">
              {isMiddaySafe
                ? 'Upper Air is Cooler → Warm Ground Air Rises Freely'
                : '⚠️ Thermal Lid: Warm Air Ceiling Traps Dense Soot Below'}
            </p>
          </div>

          {/* Animated Sun / Moon Visual */}
          {isMiddaySafe ? (
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-amber-300/40 animate-ping absolute" />
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-[0_0_30px_#f59e0b] flex items-center justify-center text-amber-900 font-bold text-xs">
                ☀️ 26°C
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-end">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shadow-md">
                🌙
              </div>
              <span className="text-[10px] text-red-300 font-mono mt-1 font-bold">
                Cold Air Sink Active
              </span>
            </div>
          )}
        </div>

        {/* Dynamic Center Simulation: Inversion Lid OR Upward Thermal Columns */}
        <div className="my-auto py-4 relative z-10">
          {isMorningTrap ? (
            /* TRAP CEILING SIMULATION */
            <div className="space-y-3">
              {/* Glowing Red Inversion Barrier */}
              <div className="w-full relative flex items-center justify-center">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#ef4444]" />
                <span className="absolute px-3 py-1 rounded-full bg-red-600 text-white font-heading text-[10px] font-extrabold uppercase tracking-widest shadow-lg flex items-center gap-1.5 animate-pulse">
                  <span className="material-symbols-outlined text-[14px]">block</span>
                  Inversion Ceiling (~600m) • Smog Cannot Penetrate
                </span>
              </div>

              {/* Trapped Bouncing Soot Particles SVG */}
              <svg className="w-full h-24" viewBox="0 0 600 100" fill="none">
                {/* Particulate Smoke Clouds bouncing back down */}
                <g opacity="0.8">
                  <circle cx="80" cy="40" r="14" fill="#ef4444" fillOpacity="0.4" className="animate-ping" />
                  <circle cx="160" cy="30" r="10" fill="#f97316" fillOpacity="0.5" />
                  <circle cx="240" cy="50" r="16" fill="#ef4444" fillOpacity="0.4" />
                  <circle cx="320" cy="35" r="12" fill="#78350f" fillOpacity="0.6" />
                  <circle cx="420" cy="45" r="15" fill="#ef4444" fillOpacity="0.4" className="animate-ping" />
                  <circle cx="500" cy="30" r="11" fill="#ea580c" fillOpacity="0.5" />
                </g>

                {/* Downward Smog deflection arrows */}
                <path d="M120 20 Q120 60 140 80" stroke="#f87171" strokeWidth="2.5" strokeDasharray="4 4" markerEnd="url(#arrow)" />
                <path d="M280 18 Q280 60 260 80" stroke="#f87171" strokeWidth="2.5" strokeDasharray="4 4" />
                <path d="M440 22 Q440 60 460 80" stroke="#f87171" strokeWidth="2.5" strokeDasharray="4 4" />
              </svg>
            </div>
          ) : (
            /* CONVECTIVE THERMAL PLUMES (CLEAN AIR DISPERSION) */
            <div className="space-y-2">
              {/* Upward Convection Arrows and Ascending Plumes */}
              <svg className="w-full h-28" viewBox="0 0 600 110" fill="none">
                <defs>
                  <linearGradient id="upDraft" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Vertical Ascending Columns */}
                <rect x="90" y="10" width="40" height="90" rx="20" fill="url(#upDraft)" />
                <rect x="230" y="10" width="50" height="90" rx="25" fill="url(#upDraft)" />
                <rect x="380" y="10" width="45" height="90" rx="22" fill="url(#upDraft)" />
                <rect x="500" y="10" width="35" height="90" rx="17" fill="url(#upDraft)" />

                {/* Rising Flow Lines */}
                <path d="M110 90 L110 20 M105 30 L110 15 L115 30" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
                <path d="M255 90 L255 15 M250 25 L255 10 L260 25" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
                <path d="M402 90 L402 18 M397 28 L402 12 L407 28" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
                <path d="M517 90 L517 25 M512 35 L517 20 L522 35" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
              </svg>

              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-600 text-white font-heading text-[11px] font-bold shadow-md">
                  <span className="material-symbols-outlined text-[16px]">air</span>
                  Thermal Convection Active: Upward Smoke Venting @ 4.6 m/s
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Ground Breathing Zone (City Skyline & Traffic Layer) */}
        <div className="z-10 pt-2 border-t border-white/20">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  isMiddaySafe ? 'bg-emerald-500 animate-pulse' : 'bg-red-500 animate-ping'
                }`}
              />
              <span className="font-heading font-bold text-white drop-shadow-md">
                Ground Breathing Zone (0m – 2m Level):
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-white drop-shadow-md">
                Surface Temp: <strong>{groundTemp}°C</strong>
              </span>
              <span
                className={`px-2 py-0.5 rounded font-bold shadow-xs ${
                  isMiddaySafe ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                }`}
              >
                {isMiddaySafe ? 'AQI ~85–150 (Moderate)' : 'AQI ~280–380+ (Hazardous)'}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-white/95 leading-relaxed mt-1.5 drop-shadow-md">
            {isMiddaySafe ? (
              <>
                <strong>✅ What to do now:</strong> Solar surface heating creates turbulent mixing
                that ascends combustion soot 1,000 meters upward. This is today’s{' '}
                <strong>ideal window for 20-min cross-ventilation</strong> and outdoor market errands.
              </>
            ) : (
              <>
                <strong>🚨 Why you must seal indoor air:</strong> Heavy cold ground air cannot rise past the warm
                ceiling. Vehicle exhaust, biomass smoke, and dust are compressed into your nose and lungs.{' '}
                <strong>Keep all windows locked!</strong>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
