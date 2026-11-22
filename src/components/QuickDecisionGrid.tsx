'use client';

import React from 'react';
import { AirQualitySnapshot, HouseholdProfile } from '@/types';
import { Language, TRANSLATIONS } from '@/lib/translations';

interface QuickDecisionGridProps {
  snapshot: AirQualitySnapshot;
  profile: HouseholdProfile;
  lang: Language;
  onOpenCopilot: (question?: string) => void;
}

export const QuickDecisionGrid: React.FC<QuickDecisionGridProps> = ({
  snapshot,
  profile,
  lang,
  onOpenCopilot,
}) => {
  const t = TRANSLATIONS[lang];
  const isSevere = snapshot.aqi >= 300;
  const isHigh = snapshot.aqi >= 200;

  return (
    <section className="space-y-3.5" aria-labelledby="decisions-heading">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 id="decisions-heading" className="font-heading text-lg sm:text-xl font-bold text-slate-900">
            {t.quickDecisionHeading}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {t.quickDecisionSub}
          </p>
        </div>
        <span className="font-heading text-xs px-3 py-1 bg-white border border-slate-200/90 text-slate-700 rounded-full font-bold shadow-xs">
          {lang === 'hi' ? 'सीधा फैसला' : 'Immediate Verdict'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Decision 1: Outdoor Play / Walk */}
        <div className="bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03)] border border-slate-200/90 flex flex-col justify-between space-y-3 hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between gap-2">
            <span className="font-heading text-sm font-bold text-slate-900 flex items-center gap-1.5">
              {t.decisionPlayTitle}
            </span>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-heading text-[11px] font-bold border ${
                isSevere
                  ? 'bg-rose-50 text-rose-900 border-rose-200'
                  : isHigh
                  ? 'bg-amber-50 text-amber-900 border-amber-200'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-200'
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">
                {isSevere ? 'dangerous' : 'schedule'}
              </span>
              <span>
                {isSevere ? (lang === 'hi' ? 'अभी असुरक्षित' : 'Unsafe Now') : (lang === 'hi' ? 'दोपहर में जाएं' : 'Midday Window')}
              </span>
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 space-y-1">
            <span className="font-heading text-xs text-emerald-800 font-bold block flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              {t.decisionPlaySafe}
            </span>
            <span className="text-[11px] text-rose-800 font-semibold block flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">cancel</span>
              {t.decisionPlayUnsafe}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {t.decisionPlayDesc}
          </p>

          <button
            onClick={() =>
              onOpenCopilot(
                lang === 'hi'
                  ? `क्या आज ${profile.name} के लिए बाहर जाना या पार्क खेलना सुरक्षित है?`
                  : `Is outdoor play or walk safe for ${profile.name} today?`
              )
            }
            className="text-xs text-slate-900 font-heading font-bold text-left hover:text-emerald-700 flex items-center gap-1 pt-1"
            type="button"
          >
            <span>{lang === 'hi' ? 'विस्तार से पूछें' : 'Ask specifics for this'}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Decision 2: Windows & Ventilation */}
        <div className="bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03)] border border-slate-200/90 flex flex-col justify-between space-y-3 hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between gap-2">
            <span className="font-heading text-sm font-bold text-slate-900 flex items-center gap-1.5">
              {t.decisionWindowTitle}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-heading text-[11px] font-bold border border-slate-200">
              <span className="material-symbols-outlined text-[13px]">lock</span>
              <span>{lang === 'hi' ? 'अभी बंद रखें' : 'Keep Closed'}</span>
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 space-y-1">
            <span className="font-heading text-xs text-emerald-800 font-bold block flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              {t.decisionWindowSafe}
            </span>
            <span className="text-[11px] text-rose-800 font-semibold block flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">cancel</span>
              {t.decisionWindowUnsafe}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {t.decisionWindowDesc}
          </p>

          <button
            onClick={() =>
              onOpenCopilot(
                lang === 'hi'
                  ? 'घर की खिड़कियां कब और कितनी देर के लिए खोलनी चाहिए?'
                  : 'When and for how long should I open house windows today?'
              )
            }
            className="text-xs text-slate-900 font-heading font-bold text-left hover:text-emerald-700 flex items-center gap-1 pt-1"
            type="button"
          >
            <span>{lang === 'hi' ? 'विस्तार से पूछें' : 'Ask specifics for this'}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Decision 3: Kitchen Smoke & Tadka */}
        <div className="bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03)] border border-slate-200/90 flex flex-col justify-between space-y-3 hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between gap-2">
            <span className="font-heading text-sm font-bold text-slate-900 flex items-center gap-1.5">
              {t.decisionKitchenTitle}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 font-heading text-[11px] font-bold border border-amber-200">
              <span className="material-symbols-outlined text-[13px]">priority_high</span>
              <span>{lang === 'hi' ? 'अति महत्वपूर्ण' : 'Crucial Protocol'}</span>
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
            <span className="font-heading text-xs text-emerald-800 font-bold block flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              {t.decisionKitchenSafe}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {t.decisionKitchenDesc}
          </p>

          <button
            onClick={() =>
              onOpenCopilot(
                lang === 'hi'
                  ? 'किचन का धुआं और तड़के के एरोसोल कैसे रोकें?'
                  : 'How to manage kitchen tadka smoke and cooking aerosols?'
              )
            }
            className="text-xs text-slate-900 font-heading font-bold text-left hover:text-emerald-700 flex items-center gap-1 pt-1"
            type="button"
          >
            <span>{lang === 'hi' ? 'विस्तार से पूछें' : 'Ask specifics for this'}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Decision 4: Commute & Transit */}
        <div className="bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03)] border border-slate-200/90 flex flex-col justify-between space-y-3 hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between gap-2">
            <span className="font-heading text-sm font-bold text-slate-900 flex items-center gap-1.5">
              {t.decisionTravelTitle}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 font-heading text-[11px] font-bold border border-emerald-200">
              <span className="material-symbols-outlined text-[13px]">shield</span>
              <span>{lang === 'hi' ? 'शील्डेड सफर' : 'Shielded Route'}</span>
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
            <span className="font-heading text-xs text-emerald-800 font-bold block flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              {t.decisionTravelSafe}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {t.decisionTravelDesc}
          </p>

          <button
            onClick={() =>
              onOpenCopilot(
                lang === 'hi'
                  ? 'ऑफिस या सफर के लिए सबसे सुरक्षित रूट और साधन क्या है?'
                  : 'What is the safest commute route and transit mode today?'
              )
            }
            className="text-xs text-slate-900 font-heading font-bold text-left hover:text-emerald-700 flex items-center gap-1 pt-1"
            type="button"
          >
            <span>{lang === 'hi' ? 'विस्तार से पूछें' : 'Ask specifics for this'}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};
