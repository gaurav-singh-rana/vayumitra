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

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-sm border border-surface-container space-y-4 overflow-hidden relative">
      {/* Background ambient particle glow */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-error/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <span className="font-heading text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">biotech</span>
            {lang === 'hi' ? 'माइक्रोस्कोपिक विज्ञान' : 'Microscopic Physics'}
          </span>
          <h3 className="font-heading text-base sm:text-lg font-bold text-primary mt-0.5">
            {lang === 'hi'
              ? 'PM2.5 इतना खतरनाक क्यों है? (बाल बनाम धूल कण)'
              : 'Why PM2.5 is Deadly: Scale vs Human Hair'}
          </h3>
        </div>

        {/* Tab switch */}
        <div className="flex bg-surface-container p-0.5 rounded-lg text-xs font-heading font-semibold">
          <button
            onClick={() => setActiveTab('scale')}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === 'scale'
                ? 'bg-surface-container-lowest shadow-xs text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
          >
            {lang === 'hi' ? 'आकार तुलना' : 'Size Scale'}
          </button>
          <button
            onClick={() => setActiveTab('alveoli')}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === 'alveoli'
                ? 'bg-surface-container-lowest shadow-xs text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
          >
            {lang === 'hi' ? 'फेफड़ों में प्रवेश' : 'Deep Lung Entry'}
          </button>
        </div>
      </div>

      {activeTab === 'scale' ? (
        /* Visual 1: Relative Size Scale SVG Graphic */
        <div className="space-y-3">
          <div className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 rounded-xl p-4 sm:p-5 text-white relative overflow-hidden flex flex-col justify-center min-h-[160px]">
            {/* SVG Scale Comparison Diagram */}
            <div className="relative w-full flex items-center justify-between gap-2 z-10">
              {/* Human Hair Circle */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-dashed border-sky-400/80 bg-sky-500/10 flex items-center justify-center relative group">
                  <span className="text-[11px] font-mono text-sky-300 font-bold">~70 µm</span>
                  <span className="absolute bottom-1 text-[9px] text-sky-200">
                    {lang === 'hi' ? 'मानव बाल' : 'Human Hair'}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <div className="text-slate-500 font-mono text-xs flex items-center">
                <span>➔ 7x</span>
              </div>

              {/* PM10 Dust Particle */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-amber-400 bg-amber-500/20 flex items-center justify-center relative">
                  <span className="text-[10px] font-mono text-amber-300 font-bold">10 µm</span>
                  <span className="absolute -bottom-4 text-[9px] text-amber-200 whitespace-nowrap">
                    {lang === 'hi' ? 'सड़क की धूल' : 'PM10 Dust'}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <div className="text-slate-500 font-mono text-xs flex items-center">
                <span>➔ 4x</span>
              </div>

              {/* PM2.5 Micro Soot */}
              <div className="flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-red-500 shadow-[0_0_12px_#ef4444] animate-ping opacity-80" />
                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center -mt-5">
                  <span className="text-[7px] text-white font-bold">2.5</span>
                </div>
                <span className="text-[9px] text-red-300 font-bold mt-1 whitespace-nowrap">
                  {lang === 'hi' ? 'जहरीला PM2.5' : 'Toxic PM2.5'}
                </span>
              </div>
            </div>

            {/* Particle floating animations */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <div className="absolute top-3 left-10 w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              <div className="absolute bottom-4 right-1/4 w-1 h-1 rounded-full bg-amber-300 animate-bounce" />
              <div className="absolute top-6 right-10 w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            </div>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
            {lang === 'hi' ? (
              <>
                <strong>सरल भाषा में समझिए:</strong> PM2.5 कण एक इंसान के बाल से{' '}
                <span className="text-error font-bold">30 गुना छोटा</span> होता है। आपकी नाक के
                बाल या सामान्य कपड़ा इसे नहीं रोक सकते। यह सीधे फेफड़ों की अंतिम कोशिकाओं (Alveoli)
                और खून की नसों में घुस जाता है।
              </>
            ) : (
              <>
                <strong>In simple terms:</strong> A PM2.5 combustion particle is{' '}
                <span className="text-error font-bold">30 times thinner than human hair</span>.
                Ordinary cloth masks and nasal cilia cannot filter it. It bypasses upper airways
                directly into deep alveolar sacs and into the bloodstream.
              </>
            )}
          </p>
        </div>
      ) : (
        /* Visual 2: Alveoli Lung Infiltration Animation */
        <div className="space-y-3">
          <div className="bg-slate-900 rounded-xl p-4 text-white flex items-center justify-between gap-4">
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              {/* Animated Lung Bronchial Tree Outline */}
              <svg className="w-full h-full text-sky-400" viewBox="0 0 100 100" fill="none">
                <path
                  d="M50 10 L50 40 M50 40 Q35 55 25 75 M50 40 Q65 55 75 75"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="25" cy="75" r="14" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="75" cy="75" r="14" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2" />
                {/* Red particulate dots settling */}
                <circle cx="23" cy="73" r="2.5" fill="#ef4444" className="animate-ping" />
                <circle cx="28" cy="77" r="2.5" fill="#ef4444" />
                <circle cx="74" cy="74" r="2.5" fill="#ef4444" />
                <circle cx="78" cy="76" r="2.5" fill="#ef4444" className="animate-pulse" />
              </svg>
            </div>

            <div className="flex-1 text-xs space-y-1.5">
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold text-[10px] uppercase">
                {lang === 'hi' ? 'सीधा रक्त प्रवाह में प्रवेश' : 'Systemic Bloodstream Infiltration'}
              </span>
              <p className="text-slate-200 leading-snug">
                {lang === 'hi'
                  ? `वर्तमान में हवा में ${currentPm25} µg/m³ PM2.5 है। प्रत्येक सांस के साथ लाखों सूक्ष्म कण फेफड़ों में स्थायी जलन पैदा करते हैं।`
                  : `Current PM2.5 load is ${currentPm25} µg/m³. Every breath carries millions of combustion micro-aerosols triggering vascular oxidative stress.`}
              </p>
              <span className="text-[11px] text-sky-300 font-semibold block">
                {lang === 'hi'
                  ? '✓ N95 मास्क 95% सूक्ष्म कणों को नाक में ही रोक लेता है।'
                  : '✓ Certified N95 masks block ~95% of sub-micron soot.'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
