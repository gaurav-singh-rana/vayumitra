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
  const [copiedBrief, setCopiedBrief] = useState(false);
  const t = TRANSLATIONS[lang];

  const { verdict } = plan;
  const safeAqi = snapshot?.aqi ?? 150;
  const pm25Val = snapshot?.pollutants?.pm25?.value ?? Math.round(safeAqi * 0.7);

  const handleCopyWhatsAppBrief = () => {
    const briefText = `🚨 *वायुमित्र दैनिक वायु सुरक्षा रिपोर्ट — ${snapshot.locationName}*
📅 तारीख: ${new Date().toLocaleDateString('hi-IN')} | लाइव AQI: ${safeAqi} (${snapshot.hindiSeverity || snapshot.severity})
📊 मुख्य प्रदूषक PM2.5: ${pm25Val} µg/m³ (${snapshot.pollutants?.pm25?.multiplierVsWHO || 'WHO मानक से अत्यधिक'})

🛡️ *${profile.name} व परिवार के लिए मुख्य सुझाव:*
1. 🧒 *बच्चों व बुजुर्गों की सुरक्षा:* सुबह 7-11 बजे स्मॉग ट्रैप के दौरान पार्क या आउटडोर वॉक न करें। सबसे सुरक्षित समय दोपहर 12 से 4 बजे का है।
2. 🪟 *खिड़कियां:* दोपहर 2 बजे से पहले बंद रखें। दरवाजे के नीचे हल्का गीला तौलिया लगाएं (18% जहरीला धुआं रोकता है)।
3. 🍳 *रसोई तड़का:* छौंक लगाने से 3 मिनट पहले एग्जॉस्ट चालू करें ताकि धुआं घर में न फैले।
4. 🚇 *सफर:* सड़क जाम की बजाय सील्ड मेट्रो/ई-रिक्शा चुनें (बचाया गया CO2: ${verdict?.avertedCo2 || '4.2 kg'})।

_सुरक्षा स्कोर: ${verdict?.score || 84}/100 • बचाए गए सिगरेट: ${verdict?.sparedCigarettesEquiv || '≈ 4 cigarettes'}_
_स्त्रोत: CPCB स्टेशन ${snapshot.stationCode} | वायुमित्र_`;

    navigator.clipboard.writeText(briefText).then(() => {
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 3000);
    });
  };

  const personaList: PersonaType[] = [
    'parents_young_children',
    'seniors_respiratory',
    'daily_commuter',
    'wfh_homemaker',
  ];

  return (
    <section className="space-y-5" aria-labelledby="recommendation-hub-title">
      {/* 1. Today's Human Verdict Hero Card (Daylight-First Calm Editorial Card) */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 text-slate-800 shadow-[0_1px_3px_rgba(15,23,42,0.04),0_6px_20px_rgba(15,23,42,0.02)] relative overflow-hidden border border-slate-200/90 space-y-5">
        {/* Section Title & Subtitle */}
        <div className="flex items-start justify-between flex-wrap gap-4 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {lang === 'hi' ? 'दैनिक सुरक्षा निर्णय' : "Today's Human Verdict"}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                • CPCB Grounded
              </span>
            </div>
            <h2 id="recommendation-hub-title" className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {verdict?.headline || (lang === 'hi' ? 'वायुमित्र सुरक्षा योजना' : 'Personalized Protection Plan')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {lang === 'hi'
                ? `${snapshot.locationName} के लिए ${profile.name} हेतु व्यक्तिगत वैज्ञानिक सुरक्षा प्रोटोकॉल`
                : `Tailored for ${profile.name} in ${snapshot.locationName} based on diurnal boundary telemetry`}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopyWhatsAppBrief}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-heading text-xs font-semibold transition-all border shadow-xs ${
                copiedBrief
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200/90 hover:text-slate-900'
              }`}
              type="button"
              title="Copy WhatsApp Clean Air Advisory for Family"
            >
              <span className="material-symbols-outlined text-[16px] text-slate-500">
                {copiedBrief ? 'check_circle' : 'share'}
              </span>
              <span>
                {copiedBrief
                  ? (lang === 'hi' ? 'सलाह कॉपी हो गई!' : 'Advisory Copied!')
                  : (lang === 'hi' ? 'व्हाट्सएप सलाह' : 'WhatsApp Family Brief')}
              </span>
            </button>

            <button
              onClick={() => onOpenCopilot(`Give me personalized clean air guidance for ${profile.name} in ${snapshot.locationName} today.`)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-heading text-xs font-semibold transition-all shadow-xs active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-emerald-400">auto_awesome</span>
              <span>{lang === 'hi' ? 'AI वायुमित्र से पूछें' : 'Ask AI Copilot'}</span>
            </button>
          </div>
        </div>

        {/* 2. Interactive Persona Quick Switcher */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            {lang === 'hi' ? 'घरेलू सदस्य चुनें:' : 'Household Health Profile:'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {personaList.map((pId) => {
              const p = HOUSEHOLD_PERSONAS[pId];
              const isSelected = profile.id === pId;

              return (
                <button
                  key={pId}
                  onClick={() => onSelectPersona(pId)}
                  className={`p-3 rounded-xl text-left transition-all border flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                      : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/70 text-slate-700'
                  }`}
                  type="button"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    isSelected ? 'bg-white/15 text-white' : 'bg-white text-slate-600 border border-slate-200/80'
                  }`}>
                    <span className="material-symbols-outlined text-[18px]">
                      {p.icon}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-xs font-bold truncate leading-snug">
                      {p.name}
                    </p>
                    <p className={`text-[10px] truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {lang === 'hi' ? p.hindiLabel.split('(')[0] : p.label.split('(')[0]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Shielding Impact Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
          {/* Spared Passive Cigarettes */}
          <div className="bg-slate-50/70 rounded-xl p-3.5 border border-slate-200/80">
            <div className="flex items-center gap-1 text-slate-500">
              <span className="material-symbols-outlined text-[16px] text-amber-600">smoke_free</span>
              <span className="text-[10px] uppercase tracking-wider font-bold">
                {lang === 'hi' ? 'बचाए गए सिगरेट' : 'Spared Cigarettes'}
              </span>
            </div>
            <div className="font-heading text-lg sm:text-xl font-bold text-slate-900 mt-1 tabular-nums">
              {verdict?.sparedCigarettesEquiv || `≈ ${Math.max(1, Math.round(pm25Val / 22))} cigarettes`}
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {lang === 'hi' ? 'धुएं के बराबर बचाव' : 'Passive smoke avoided'}
            </span>
          </div>

          {/* Spared PM2.5 Soot */}
          <div className="bg-slate-50/70 rounded-xl p-3.5 border border-slate-200/80">
            <div className="flex items-center gap-1 text-slate-500">
              <span className="material-symbols-outlined text-[16px] text-emerald-600">air</span>
              <span className="text-[10px] uppercase tracking-wider font-bold">
                {lang === 'hi' ? 'रोका गया PM2.5' : 'Spared PM2.5'}
              </span>
            </div>
            <div className="font-heading text-lg sm:text-xl font-bold text-slate-900 mt-1 tabular-nums">
              {verdict?.sparedPm25 || `${Math.round(pm25Val * 0.65)} µg/day`}
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {lang === 'hi' ? 'फेफड़ों में जाने से रोका' : 'Direct lung defense'}
            </span>
          </div>

          {/* Clean Air Score */}
          <div className="bg-slate-50/70 rounded-xl p-3.5 border border-slate-200/80">
            <div className="flex items-center gap-1 text-slate-500">
              <span className="material-symbols-outlined text-[16px] text-sky-600">verified_user</span>
              <span className="text-[10px] uppercase tracking-wider font-bold">
                {lang === 'hi' ? 'सुरक्षा स्कोर' : 'Protection Score'}
              </span>
            </div>
            <div className="font-heading text-lg sm:text-xl font-bold text-slate-900 mt-1 flex items-baseline gap-1 tabular-nums">
              <span>{verdict?.score || 84}</span>
              <span className="text-xs text-slate-500 font-normal">/ 100</span>
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {verdict?.rankTitle || 'Clean Air Sentinel'}
            </span>
          </div>

          {/* Averted CO2 */}
          <div className="bg-slate-50/70 rounded-xl p-3.5 border border-slate-200/80">
            <div className="flex items-center gap-1 text-slate-500">
              <span className="material-symbols-outlined text-[16px] text-teal-600">eco</span>
              <span className="text-[10px] uppercase tracking-wider font-bold">
                {lang === 'hi' ? 'CO2 बचत' : 'Averted CO2'}
              </span>
            </div>
            <div className="font-heading text-lg sm:text-xl font-bold text-slate-900 mt-1 tabular-nums">
              {verdict?.avertedCo2 || '4.2 kg'}
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {lang === 'hi' ? 'स्वच्छ आवागमन से' : 'via clean commute'}
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
      <div className="bg-white rounded-2xl p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-slate-200/90 flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab('routine')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-heading text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
            activeSubTab === 'routine'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">schedule</span>
          <span>{lang === 'hi' ? '1. दैनिक दिनचर्या' : '1. Daily Rhythm'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('indoor')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-heading text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
            activeSubTab === 'indoor'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">home</span>
          <span>{lang === 'hi' ? '2. इनडोर हैक्स व सील' : '2. Indoor Hacks & Seal'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('impact')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-heading text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
            activeSubTab === 'impact'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">eco</span>
          <span>{lang === 'hi' ? '3. सुरक्षित सफर व असर' : '3. Commute & Impact'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('science')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-heading text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
            activeSubTab === 'science'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
            {/* Bio-Inhaled PM2.5 Exposure Dose vs VayuMitra Shield Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 border border-surface-container shadow-sm space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-heading text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">pulmonology</span>
                  {lang === 'hi' ? 'बायोलॉजिकल लंग एक्सपोज़र मॉडल' : 'Biological Lung Bio-Dose Model'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  {lang === 'hi' ? '88% फेफड़ों की सुरक्षा' : '88% Exposure Reduced'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Unshielded Inhaled Dose */}
                <div className="p-3.5 rounded-xl bg-error-container/20 border border-error/20 space-y-1">
                  <span className="text-xs font-bold text-error flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">close</span>
                    {lang === 'hi' ? 'बिना सुरक्षा के (Unshielded Exposure)' : 'Without VayuMitra Shielding'}
                  </span>
                  <div className="font-heading text-2xl font-black text-error">
                    {Math.round(pm25Val * 1.8)} µg/day
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-snug">
                    {lang === 'hi'
                      ? `सुबह की जॉगिंग या खुली खिड़की से औसतन ≈ ${Math.max(2, Math.round((pm25Val * 1.8) / 22))} सिगरेट के बराबर कालिख फेफड़ों की कोशिकाओं में जमती है।`
                      : `Open morning exposure deposits particulate soot equivalent to ≈ ${Math.max(2, Math.round((pm25Val * 1.8) / 22))} passive cigarettes in deep alveoli.`}
                  </p>
                </div>

                {/* VayuMitra Protocol Shielded Dose */}
                <div className="p-3.5 rounded-xl bg-secondary-container/20 border border-secondary/30 space-y-1">
                  <span className="text-xs font-bold text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">verified</span>
                    {lang === 'hi' ? 'वायुमित्र प्रोटोकॉल के साथ (Shielded)' : 'With VayuMitra Protocol'}
                  </span>
                  <div className="font-heading text-2xl font-black text-secondary">
                    {Math.round(pm25Val * 0.22)} µg/day
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-snug">
                    {lang === 'hi'
                      ? `दोपहर 2 बजे का सेफ विंडो + दरवाजे का गीला तौलिया शील्ड + N95 से फेफड़ों में जाने वाला धुआं 88% तक रुक जाता है।`
                      : `2 PM solar dispersion + damp towel draft seal + N95 cuts lung particulate deposition by up to 88%.`}
                  </p>
                </div>
              </div>
            </div>

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
