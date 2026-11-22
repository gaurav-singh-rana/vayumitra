'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/translations';

interface InversionVisualizerProps {
  lang: Language;
}

export const InversionVisualizer: React.FC<InversionVisualizerProps> = ({ lang }) => {
  const [timeMode, setTimeMode] = useState<'morning' | 'afternoon'>('morning');

  const isMorning = timeMode === 'morning';

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-sm border border-surface-container space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[22px]">wb_twilight</span>
          <div>
            <h3 className="font-heading text-sm sm:text-base font-bold text-primary">
              {lang === 'hi'
                ? 'ज़मीनी इनवर्जन ट्रैप (प्रदूषण कब उठता और बैठता है?)'
                : 'The Inversion Trap: Why Smog Traps & Rises'}
            </h3>
            <p className="text-xs text-on-surface-variant font-medium">
              {lang === 'hi'
                ? 'जानिए सुबह और शाम को ज़हर क्यों बढ़ता है और दोपहर क्यों सुरक्षित होती है'
                : 'Understand why mornings trap pollution and afternoons clear the air'}
            </p>
          </div>
        </div>

        {/* Time Mode Switcher */}
        <div className="flex bg-surface-container p-1 rounded-xl text-xs font-heading font-bold">
          <button
            onClick={() => setTimeMode('morning')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
              isMorning
                ? 'bg-error text-white shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
          >
            <span>🌅</span>
            <span>{lang === 'hi' ? 'सुबह 08:00 AM (खतरा)' : 'Morning 8 AM (Trap)'}</span>
          </button>
          <button
            onClick={() => setTimeMode('afternoon')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
              !isMorning
                ? 'bg-secondary text-on-secondary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
          >
            <span>☀️</span>
            <span>{lang === 'hi' ? 'दोपहर 02:00 PM (सुरक्षित)' : 'Afternoon 2 PM (Clear)'}</span>
          </button>
        </div>
      </div>

      {/* Animated Atmospheric Cross-Section */}
      <div
        className={`w-full rounded-2xl p-4 sm:p-5 text-white relative overflow-hidden min-h-[200px] flex flex-col justify-between transition-colors duration-700 ${
          isMorning
            ? 'bg-gradient-to-b from-slate-900 via-amber-950/40 to-slate-950 border border-error/30'
            : 'bg-gradient-to-b from-sky-600 via-sky-400 to-amber-100 border border-secondary/30'
        }`}
      >
        {/* Upper Atmosphere Layer */}
        <div className="flex items-center justify-between text-xs z-10">
          <span
            className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
              isMorning ? 'bg-amber-500/20 text-amber-300' : 'bg-white/30 text-white'
            }`}
          >
            {isMorning
              ? lang === 'hi'
                ? 'ऊपरी गर्म हवा की चादर (Lid Effect)'
                : 'Warm Air Ceiling (Lid Effect)'
              : lang === 'hi'
              ? 'खुला वातावरण (Free Thermal Ascend)'
              : 'Open Atmospheric Convection'}
          </span>
          <span className="font-mono text-[10px] opacity-80">Alt: ~800m</span>
        </div>

        {/* Animated Particles and Movement Lines */}
        <div className="relative h-20 w-full flex items-center justify-center my-2">
          {isMorning ? (
            /* Morning Smog Trap Animation */
            <div className="w-full flex flex-col items-center justify-center relative">
              {/* Red Barrier Line */}
              <div className="w-full border-t-2 border-dashed border-red-500/80 mb-2 flex items-center justify-center">
                <span className="bg-red-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">
                  {lang === 'hi' ? 'धुआं ऊपर जाने से रुका हुआ है' : 'Smog Blocked Below Lid'}
                </span>
              </div>

              {/* Trapped Swirling Soot */}
              <div className="flex items-center justify-around w-full px-4">
                <div className="flex items-center gap-1 animate-bounce">
                  <span className="material-symbols-outlined text-amber-400 text-[20px]">directions_car</span>
                  <span className="text-[10px] text-red-300 font-bold">Exhaust</span>
                </div>
                <div className="flex items-center gap-1 animate-pulse">
                  <span className="material-symbols-outlined text-red-400 text-[22px]">cloud</span>
                  <span className="text-[10px] text-red-200 font-bold">PM2.5 Trapped</span>
                </div>
                <div className="flex items-center gap-1 animate-bounce">
                  <span className="material-symbols-outlined text-amber-300 text-[20px]">fireplace</span>
                  <span className="text-[10px] text-red-300 font-bold">Biomass Smoke</span>
                </div>
              </div>
            </div>
          ) : (
            /* Afternoon Solar Clearing Animation */
            <div className="w-full flex flex-col items-center justify-center relative">
              {/* Ascending Solar Thermal Rays */}
              <div className="flex items-center justify-around w-full">
                <div className="flex flex-col items-center animate-pulse text-amber-200">
                  <span className="material-symbols-outlined text-[24px]">north</span>
                  <span className="text-[9px] font-bold">Thermal Lift</span>
                </div>
                <div className="flex flex-col items-center text-amber-300">
                  <span className="material-symbols-outlined text-[32px] animate-spin">wb_sunny</span>
                  <span className="text-[10px] font-bold text-slate-800">
                    {lang === 'hi' ? 'धूप से हवा का फैलाव' : 'Solar Boundary Break'}
                  </span>
                </div>
                <div className="flex flex-col items-center animate-pulse text-amber-200">
                  <span className="material-symbols-outlined text-[24px]">north</span>
                  <span className="text-[9px] font-bold">Clean Dispersion</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Breathing Zone (Ground Level) */}
        <div
          className={`p-2.5 rounded-xl flex items-center justify-between text-xs z-10 ${
            isMorning
              ? 'bg-red-950/80 text-red-200 border border-red-500/30'
              : 'bg-emerald-900/80 text-emerald-100 border border-emerald-400/30'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">
              {isMorning ? 'face' : 'sentiment_satisfied'}
            </span>
            <span className="font-bold">
              {isMorning
                ? lang === 'hi'
                  ? 'सांस लेने की ज़मीन: अत्यधिक जहरीली हवा (AQI ~350+)'
                  : 'Ground Breathing Zone: Severe Trapped Smoke (AQI ~350+)'
                : lang === 'hi'
                ? 'सांस लेने की ज़मीन: साफ हवा वेंटिलेशन विंडो (AQI ~120–180)'
                : 'Ground Breathing Zone: Clean Window (AQI ~120–180)'}
            </span>
          </div>
          <span className="font-mono text-[10px] font-bold">0–2m Level</span>
        </div>
      </div>

      {/* Explanatory Takeaway */}
      <div className="p-3 bg-surface-container-low rounded-xl text-xs leading-relaxed text-on-surface flex items-start gap-2.5 border border-surface-container">
        <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
          lightbulb
        </span>
        <p>
          {isMorning
            ? lang === 'hi'
              ? 'सुबह ठंड की वजह से हवा भारी होकर जमीन से चिपक जाती है और ऊपर की गर्म हवा ढक्कन की तरह धुआं रोक देती है। इसलिए सुबह वॉक या खिड़की खोलना फेफड़ों पर सिगरेट पीने जैसा भारी पड़ता है।'
              : 'Cold morning air contracts and hugs the ground, trapped beneath a warm inversion lid. Exercising or cracking windows now pulls dense trapped exhaust directly into alveoli.'
            : lang === 'hi'
            ? 'दोपहर 12 से 4 बजे के बीच सूरज की किरणें जमीन को गर्म करती हैं, जिससे गर्म हवा ऊपर उठकर ढक्कन को तोड़ देती है और प्रदूषण आसमान में बिखर जाता है। यही 20 मिनट के वेंटिलेशन का सही समय है।'
            : 'Midday solar warming breaks the boundary inversion lid, propelling particulate thousands of meters into the troposphere. This creates the optimal 20-minute whole-house ventilation window.'}
        </p>
      </div>
    </div>
  );
};
