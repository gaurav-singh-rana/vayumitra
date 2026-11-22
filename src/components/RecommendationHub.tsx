'use client';

import React, { useState } from 'react';
import { AirQualitySnapshot, HouseholdProfile, PersonaType, RecommendationPlan } from '@/types';
import { HOUSEHOLD_PERSONAS } from '@/lib/personas';
import { Language, TRANSLATIONS } from '@/lib/translations';
import { TodayRoutine } from './TodayRoutine';
import { IndoorHacks } from './IndoorHacks';
import { DirectImpact } from './DirectImpact';
import { QuickDecisionGrid } from './QuickDecisionGrid';
import { InversionVisualizer } from './InversionVisualizer';
import { ParticleScaleVisualizer } from './ParticleScaleVisualizer';

interface RecommendationHubProps {
  snapshot: AirQualitySnapshot;
  profile: HouseholdProfile;
  plan: RecommendationPlan;
  lang: Language;
  onSelectPersona: (pId: PersonaType) => void;
  onOpenCopilot: (presetQuestion?: string) => void;
  onSwitchGlobalTab: (tab: 'today' | 'indoor' | 'impact' | 'copilot') => void;
}

export const RecommendationHub: React.FC<RecommendationHubProps> = ({
  snapshot,
  profile,
  plan,
  lang,
  onSelectPersona,
  onOpenCopilot,
  onSwitchGlobalTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'routine' | 'indoor' | 'impact' | 'science'>('routine');
  const t = TRANSLATIONS[lang];

  const { verdict } = plan;
  const safeAqi = snapshot?.aqi ?? 150;
  const pm25Val = snapshot?.pollutants?.pm25?.value ?? Math.round(safeAqi * 0.7);

  const personaList: PersonaType[] = [
    'parents_young_children',
    'seniors_respiratory',
    'daily_commuter',
    'wfh_homemaker',
  ];

  return (
    <section className="space-y-5" aria-labelledby="recommendation-hub-title">
      {/* 1. Header with Persona Selector Strip */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-xl relative overflow-hidden border border-indigo-800/40">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Title & Subtitle */}
        <div className="flex items-start justify-between flex-wrap gap-3 pb-4 border-b border-indigo-800/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 -ml-4.5"></span>
              <h2 id="recommendation-hub-title" className="font-heading text-lg sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <span>{lang === 'hi' ? 'वायुमित्र सुरक्षा योजना' : 'Personalized Protection Plan'}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-400/30">
                  {lang === 'hi' ? 'लाइव सिंक' : 'Live Sync'}
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-indigo-200/90 mt-1">
              {lang === 'hi'
                ? `${snapshot.locationName} के लिए परिवार-विशिष्ट वैज्ञानिक सुझाव — CPCB व Open-Meteo टेलीमेट्री पर आधारित`
                : `Household-specific protection for ${snapshot.locationName} based on verified live telemetry`}
            </p>
          </div>

          <button
            onClick={() => onOpenCopilot(`Give me personalized clean air guidance for ${profile.name} in ${snapshot.locationName} today.`)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-heading text-xs font-bold transition-all shadow-md active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span>{lang === 'hi' ? 'AI वायुमित्र से पूछें' : 'Ask AI Copilot'}</span>
          </button>
        </div>

        {/* 2. Interactive Persona Quick Switcher */}
        <div className="pt-4">
          <label className="text-xs font-semibold text-indigo-200 block mb-2">
            {lang === 'hi' ? 'किसके लिए सुझाव चाहिए? (Select Household Profile):' : 'Select Family Member Profile:'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {personaList.map((pId) => {
              const p = HOUSEHOLD_PERSONAS[pId];
              const isSelected = profile.id === pId;

              return (
                <button
                  key={pId}
                  onClick={() => onSelectPersona(pId)}
                  className={`p-2.5 sm:p-3 rounded-2xl text-left transition-all border flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-purple-600/40 border-purple-400 shadow-lg text-white ring-2 ring-purple-400/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-indigo-100/80 hover:text-white'
                  }`}
                  type="button"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    isSelected ? 'bg-purple-500 text-white' : 'bg-white/10 text-indigo-200'
                  }`}>
                    {p.id === 'parents_young_children' ? '🧒' : p.id === 'seniors_respiratory' ? '🧓' : p.id === 'daily_commuter' ? '🛵' : '🏡'}
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-xs font-bold truncate leading-snug">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-indigo-200/70 truncate">
                      {lang === 'hi' ? p.hindiLabel.split('(')[0] : p.label.split('(')[0]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Shielding Impact Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-4 border-t border-indigo-800/40">
          {/* Spared Passive Cigarettes */}
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold block">
              {lang === 'hi' ? 'बचाए गए सिगरेट' : 'Spared Cigarettes'}
            </span>
            <div className="font-heading text-base sm:text-lg font-black text-white mt-0.5">
              {verdict?.sparedCigarettesEquiv || `≈ ${Math.max(1, Math.round(pm25Val / 22))} cigarettes`}
            </div>
            <span className="text-[10px] text-indigo-200/70 block mt-0.5">
              {lang === 'hi' ? 'धुएं के बराबर बचाव' : 'Passive smoke avoided'}
            </span>
          </div>

          {/* Spared PM2.5 Soot */}
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold block">
              {lang === 'hi' ? 'रोका गया PM2.5' : 'Spared PM2.5'}
            </span>
            <div className="font-heading text-base sm:text-lg font-black text-white mt-0.5">
              {verdict?.sparedPm25 || `${Math.round(pm25Val * 0.65)} µg/day`}
            </div>
            <span className="text-[10px] text-indigo-200/70 block mt-0.5">
              {lang === 'hi' ? 'फेफड़ों में जाने से रोका' : 'Direct lung defense'}
            </span>
          </div>

          {/* Clean Air Score */}
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-purple-300 font-bold block">
              {lang === 'hi' ? 'सुरक्षा स्कोर' : 'Protection Score'}
            </span>
            <div className="font-heading text-base sm:text-lg font-black text-white mt-0.5 flex items-baseline gap-1">
              <span>{verdict?.score || 84}</span>
              <span className="text-xs text-indigo-200 font-normal">/ 100</span>
            </div>
            <span className="text-[10px] text-indigo-200/70 block mt-0.5">
              {verdict?.rankTitle || 'Clean Air Sentinel'}
            </span>
          </div>

          {/* Averted CO2 */}
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-cyan-300 font-bold block">
              {lang === 'hi' ? 'CO2 बचत' : 'Averted CO2'}
            </span>
            <div className="font-heading text-base sm:text-lg font-black text-white mt-0.5">
              {verdict?.avertedCo2 || '4.2 kg'}
            </div>
            <span className="text-[10px] text-indigo-200/70 block mt-0.5">
              {lang === 'hi' ? 'मेट्रो व ई-वाहन से' : 'via clean commute'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Direct 4 Life Decisions (Immediate non-IT answers) */}
      <QuickDecisionGrid
        snapshot={snapshot}
        profile={profile}
        lang={lang}
        onOpenCopilot={onOpenCopilot}
      />

      {/* 3. Three-Pillar Action Center Navigation Pills */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-200 flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab('routine')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeSubTab === 'routine'
              ? 'bg-purple-700 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">schedule</span>
          <span>{lang === 'hi' ? '1. आज की दिनचर्या' : '1. Daily Rhythm'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('indoor')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeSubTab === 'indoor'
              ? 'bg-purple-700 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">home</span>
          <span>{lang === 'hi' ? '2. घर के जुगाड़ व खिड़की' : '2. Indoor Hacks & Seal'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('impact')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeSubTab === 'impact'
              ? 'bg-purple-700 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">eco</span>
          <span>{lang === 'hi' ? '3. सुरक्षित सफर व असर' : '3. Commute & Impact'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('science')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeSubTab === 'science'
              ? 'bg-purple-700 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">science</span>
          <span>{lang === 'hi' ? 'वैज्ञानिक मॉडल' : 'Science Models'}</span>
        </button>
      </div>

      {/* 4. Active Sub-Pillar View */}
      <div className="space-y-5">
        {activeSubTab === 'routine' && (
          <div className="space-y-4">
            <TodayRoutine
              profile={profile}
              plan={plan}
              onOpenCopilot={onOpenCopilot}
              onSwitchTab={onSwitchGlobalTab}
            />
          </div>
        )}

        {activeSubTab === 'indoor' && (
          <div className="space-y-4">
            <IndoorHacks snapshot={snapshot} profile={profile} lang={lang} />
          </div>
        )}

        {activeSubTab === 'impact' && (
          <div className="space-y-4">
            <DirectImpact snapshot={snapshot} profile={profile} plan={plan} />
          </div>
        )}

        {activeSubTab === 'science' && (
          <div className="space-y-5">
            <InversionVisualizer lang={lang} />
            <ParticleScaleVisualizer lang={lang} currentPm25={pm25Val} />
          </div>
        )}
      </div>
    </section>
  );
};
