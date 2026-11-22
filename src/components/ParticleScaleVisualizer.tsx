'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/translations';

interface ParticleScaleVisualizerProps {
  lang: Language;
  currentPm25: number;
}

export const ParticleScaleVisualizer: React.FC<ParticleScaleVisualizerProps> = ({
  lang,
  currentPm25,
}) => {
  const [activeTab, setActiveTab] = useState<'scale' | 'alveoli'>('scale');
  const [zoomLevel, setZoomLevel] = useState<'1x' | '50x' | '500x'>('50x');
  const [isN95ShieldActive, setIsN95ShieldActive] = useState<boolean>(false);

  const safePm25 = currentPm25 > 0 ? currentPm25 : 85;

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-7 shadow-sm border border-surface-container space-y-5 overflow-hidden relative">
      {/* Subtle ambient particle glow */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-error/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 z-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[24px]">biotech</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-heading text-[10px] font-bold uppercase tracking-wider">
                Microscopic Aerosol Physics
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                Sub-Micron Particulate Deposition
              </span>
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-extrabold text-primary tracking-tight">
              {lang === 'hi'
                ? 'PM2.5 इतना घातक क्यों है? (इलेक्ट्रॉन माइक्रोस्कोप व्यू)'
                : 'Why PM2.5 is Deadly: Electron Microscope Scale'}
            </h3>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex bg-surface-container p-1 rounded-xl text-xs font-heading font-bold">
          <button
            onClick={() => setActiveTab('scale')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'scale'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
            <span>{lang === 'hi' ? 'आकार तुलना (Hair vs PM2.5)' : 'Scale vs Human Hair'}</span>
          </button>
          <button
            onClick={() => setActiveTab('alveoli')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'alveoli'
                ? 'bg-error text-white shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">cardiology</span>
            <span>{lang === 'hi' ? 'फेफड़ों व रक्त में प्रवेश' : 'Deep Lung & Bloodstream'}</span>
          </button>
        </div>
      </div>

      {activeTab === 'scale' ? (
        /* TAB 1: INTERACTIVE 3D ELECTRON MICROSCOPE COMPARISON */
        <div className="space-y-4">
          {/* Zoom Level Switcher HUD */}
          <div className="flex items-center justify-between bg-surface-container-low px-4 py-2.5 rounded-2xl border border-surface-container text-xs">
            <span className="font-heading font-semibold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[16px]">zoom_in</span>
              <span>Optical Magnification:</span>
            </span>
            <div className="flex items-center gap-1 bg-surface-container p-0.5 rounded-lg font-mono font-bold">
              {(['1x', '50x', '500x'] as const).map((z) => (
                <button
                  key={z}
                  onClick={() => setZoomLevel(z)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    zoomLevel === z
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          {/* Microscopic Stage Graphic Canvas */}
          <div className="w-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-2xl p-5 sm:p-7 text-white border border-slate-800 shadow-inner relative overflow-hidden min-h-[240px] flex flex-col justify-center">
            {/* Grid Reticle Overlay */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            {/* Particle Scale Elements Row */}
            <div className="relative w-full flex items-center justify-around gap-2 z-10">
              {/* 1. Human Hair Strand (70 µm) */}
              <div className="flex flex-col items-center">
                <div
                  className={`rounded-full border-2 border-dashed border-sky-400 bg-gradient-to-b from-sky-600/30 via-slate-700/50 to-sky-900/40 flex items-center justify-center relative shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-500 ${
                    zoomLevel === '1x' ? 'w-24 h-24' : zoomLevel === '50x' ? 'w-32 h-32' : 'w-44 h-44'
                  }`}
                >
                  <div className="text-center">
                    <span className="font-mono text-xs sm:text-sm font-extrabold text-sky-200 block">
                      ~70 µm
                    </span>
                    <span className="text-[10px] text-sky-300 font-medium">
                      {lang === 'hi' ? 'मानव बाल' : 'Human Hair'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ratio Arrow 1 */}
              <div className="flex flex-col items-center text-slate-500 font-mono text-[11px]">
                <span>➔ 7x</span>
                <span className="text-[9px] opacity-60">thinner</span>
              </div>

              {/* 2. PM10 Dust Particle (10 µm) */}
              <div className="flex flex-col items-center">
                <div
                  className={`rounded-full border border-amber-400 bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center relative shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-500 ${
                    zoomLevel === '1x' ? 'w-8 h-8' : zoomLevel === '50x' ? 'w-14 h-14' : 'w-20 h-20'
                  }`}
                >
                  <span className="font-mono text-[10px] font-bold text-amber-950">10µm</span>
                </div>
                <span className="text-[10px] text-amber-300 font-medium mt-1 whitespace-nowrap">
                  {lang === 'hi' ? 'सड़क की धूल (PM10)' : 'PM10 Road Dust'}
                </span>
              </div>

              {/* Ratio Arrow 2 */}
              <div className="flex flex-col items-center text-slate-500 font-mono text-[11px]">
                <span>➔ 4x</span>
                <span className="text-[9px] opacity-60">thinner</span>
              </div>

              {/* 3. Toxic PM2.5 Micro Soot (2.5 µm) */}
              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-red-500/40 animate-ping absolute" />
                  <div
                    className={`rounded-full bg-gradient-to-r from-red-600 to-rose-500 border border-white flex items-center justify-center shadow-[0_0_20px_#ef4444] transition-all duration-500 ${
                      zoomLevel === '1x' ? 'w-3 h-3' : zoomLevel === '50x' ? 'w-6 h-6' : 'w-10 h-10'
                    }`}
                  >
                    <span className="font-mono text-[8px] font-extrabold text-white">2.5</span>
                  </div>
                </div>
                <span className="text-[11px] text-red-400 font-extrabold mt-1.5 whitespace-nowrap drop-shadow-sm animate-pulse">
                  {lang === 'hi' ? 'जहरीला PM2.5' : 'Toxic PM2.5'}
                </span>
                <span className="text-[9px] text-slate-400 font-mono">(Combustion Soot)</span>
              </div>
            </div>

            {/* Scale Ratio Banner */}
            <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-300">
              <span className="font-heading text-red-400 font-bold">
                PM2.5 is 28 to 30 times thinner than human hair.
              </span>{' '}
              It passes right through the natural nose hair (cilia) defense matrix.
            </div>
          </div>
        </div>
      ) : (
        /* TAB 2: DEEP ALVEOLAR & BLOODSTREAM INFILTRATION SIMULATION */
        <div className="space-y-4">
          {/* N95 Shield Toggle Button */}
          <div className="flex items-center justify-between bg-surface-container-low px-4 py-2.5 rounded-2xl border border-surface-container text-xs">
            <span className="font-heading font-semibold text-on-surface">
              Test Inhalation Defense:
            </span>
            <button
              onClick={() => setIsN95ShieldActive(!isN95ShieldActive)}
              className={`px-3.5 py-1.5 rounded-xl font-heading font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs ${
                isN95ShieldActive
                  ? 'bg-secondary text-on-secondary shadow-md'
                  : 'bg-surface-container-high text-primary hover:bg-surface-container-highest'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isN95ShieldActive ? 'check_circle' : 'masks'}
              </span>
              <span>{isN95ShieldActive ? 'N95 Shield Active (95% Blocked)' : 'Equip Certified N95 Shield'}</span>
            </button>
          </div>

          {/* Anatomical Cross-Section Animation */}
          <div className="w-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-2xl p-5 sm:p-7 text-white border border-slate-800 shadow-inner relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left: Respiratory Tract SVG Simulation */}
            <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
              {/* Pulsating Alveolus Sac Bulb */}
              <svg className="w-full h-full" viewBox="0 0 160 160" fill="none">
                {/* Trachea & Bronchi */}
                <path d="M80 15 L80 50 M80 50 Q60 70 45 95 M80 50 Q100 70 115 95" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />

                {/* Left & Right Alveolar Sacs (Breathing Expansion Animation) */}
                <circle cx="45" cy="95" r="26" fill="#0284c7" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2.5" className="animate-pulse" />
                <circle cx="115" cy="95" r="26" fill="#0284c7" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2.5" className="animate-pulse" />

                {/* Blood Capillary Mesh around sacs */}
                <path d="M22 95 Q45 125 68 95" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M92 95 Q115 125 138 95" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />

                {/* Particulate stream passing into sacs (Blocked if N95 active) */}
                {!isN95ShieldActive ? (
                  <>
                    <circle cx="80" cy="30" r="3" fill="#ef4444" className="animate-ping" />
                    <circle cx="50" cy="90" r="2.5" fill="#ef4444" className="animate-bounce" />
                    <circle cx="40" cy="100" r="3" fill="#ef4444" />
                    <circle cx="110" cy="90" r="2.5" fill="#ef4444" className="animate-ping" />
                    <circle cx="120" cy="100" r="3" fill="#ef4444" />
                    {/* Capillary penetration dot */}
                    <circle cx="65" cy="102" r="2" fill="#f87171" className="animate-pulse" />
                  </>
                ) : (
                  /* N95 Electrostatic Shield Layer */
                  <g>
                    <rect x="60" y="8" width="40" height="8" rx="4" fill="#38bdf8" className="animate-pulse" />
                    <text x="80" y="14" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle">
                      N95 FILTER
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Right: Clinical Explanation & Inhaled Bio-Dose Counter */}
            <div className="flex-1 space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-md font-heading font-extrabold uppercase text-[10px] ${
                    isN95ShieldActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}
                >
                  {isN95ShieldActive ? 'Alveolar Bio-Shield Active' : 'Unshielded Alveolar Penetration'}
                </span>
                <span className="font-mono text-slate-400">
                  PM2.5: {safePm25} µg/m³
                </span>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="font-heading text-slate-400 text-[11px] block">
                  Estimated Particulate Lung Infiltration:
                </span>
                <span className="font-mono text-xl sm:text-2xl font-black text-white">
                  {isN95ShieldActive ? '< 420 particles/min' : `~${Math.round(safePm25 * 148).toLocaleString()} particles/min`}
                </span>
                <span className={`text-[10px] font-bold block ${isN95ShieldActive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isN95ShieldActive ? '✓ 95% blocked before entering bronchial tree' : '⚠️ Deep gas-exchange alveolar sac penetration'}
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed text-[11px]">
                {lang === 'hi'
                  ? 'PM2.5 कण इतने छोटे होते हैं कि वे फेफड़ों की अंतिम झिल्ली (0.2 माइक्रोन पतली) को पार करके सीधे दिल और दिमाग की रक्त वाहिकाओं में सूजन और क्लॉट्स का कारण बनते हैं।'
                  : 'PM2.5 particles are small enough to cross the ultra-thin 0.2 µm alveolar-capillary barrier directly into blood circulation, triggering systemic arterial inflammation.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
