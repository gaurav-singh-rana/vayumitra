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
    <section className="space-y-3" aria-labelledby="decisions-heading">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 id="decisions-heading" className="font-heading text-lg sm:text-xl font-bold text-primary">
            {t.quickDecisionHeading}
          </h2>
          <p className="text-xs text-on-surface-variant font-medium">
            {t.quickDecisionSub}
          </p>
        </div>
        <span className="font-heading text-xs px-2.5 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full font-bold">
          {lang === 'hi' ? 'सीधा फैसला' : 'Direct Decision'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Decision 1: Outdoor Play / Walk */}
        <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between space-y-2.5 hover:border-secondary/40 transition-all">
          <div className="flex items-start justify-between gap-2">
            <span className="font-heading text-sm font-bold text-primary flex items-center gap-1.5">
              {t.decisionPlayTitle}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full font-heading text-[11px] font-bold ${
                isSevere
                  ? 'bg-error-container text-error'
                  : isHigh
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {isSevere ? (lang === 'hi' ? 'अभी असुरक्षित' : 'Unsafe Now') : (lang === 'hi' ? 'दोपहर में जाएं' : 'Midday Window')}
            </span>
          </div>

          <div className="bg-secondary-container/20 p-2.5 rounded-xl border border-secondary/20">
            <span className="font-heading text-xs text-secondary font-bold block">
              ✓ {t.decisionPlaySafe}
            </span>
            <span className="text-[11px] text-error font-semibold block mt-0.5">
              ✕ {t.decisionPlayUnsafe}
            </span>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
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
            className="text-xs text-secondary font-heading font-bold text-left hover:underline flex items-center gap-1 pt-1"
            type="button"
          >
            <span>{lang === 'hi' ? 'विस्तार से पूछें' : 'Ask specifics for this'}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Decision 2: Windows & Ventilation */}
        <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between space-y-2.5 hover:border-secondary/40 transition-all">
          <div className="flex items-start justify-between gap-2">
            <span className="font-heading text-sm font-bold text-primary flex items-center gap-1.5">
              {t.decisionWindowTitle}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-heading text-[11px] font-bold">
              {lang === 'hi' ? 'अभी बंद रखें' : 'Keep Closed'}
            </span>
          </div>

          <div className="bg-surface-container p-2.5 rounded-xl border border-surface-container-high">
            <span className="font-heading text-xs text-primary font-bold block">
              ✓ {t.decisionWindowSafe}
            </span>
            <span className="text-[11px] text-error font-semibold block mt-0.5">
              ✕ {t.decisionWindowUnsafe}
            </span>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
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
            className="text-xs text-secondary font-heading font-bold text-left hover:underline flex items-center gap-1 pt-1"
            type="button"
          >
            <span>{lang === 'hi' ? 'विस्तार से पूछें' : 'Ask specifics for this'}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Decision 3: Kitchen Smoke & Tadka */}
        <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between space-y-2.5 hover:border-secondary/40 transition-all">
          <div className="flex items-start justify-between gap-2">
            <span className="font-heading text-sm font-bold text-primary flex items-center gap-1.5">
              {t.decisionKitchenTitle}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-error-container text-error font-heading text-[11px] font-bold">
              {lang === 'hi' ? 'अति महत्वपूर्ण' : 'Crucial Hack'}
            </span>
          </div>

          <div className="bg-surface-container p-2.5 rounded-xl border border-surface-container-high">
            <span className="font-heading text-xs text-secondary font-bold block">
              ✓ {t.decisionKitchenSafe}
            </span>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
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
            className="text-xs text-secondary font-heading font-bold text-left hover:underline flex items-center gap-1 pt-1"
            type="button"
          >
            <span>{lang === 'hi' ? 'विस्तार से पूछें' : 'Ask specifics for this'}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Decision 4: Commute & Transit */}
        <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between space-y-2.5 hover:border-secondary/40 transition-all">
          <div className="flex items-start justify-between gap-2">
            <span className="font-heading text-sm font-bold text-primary flex items-center gap-1.5">
              {t.decisionTravelTitle}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-heading text-[11px] font-bold">
              {lang === 'hi' ? 'शील्डेड सफर' : 'Shielded Route'}
            </span>
          </div>

          <div className="bg-secondary-container/20 p-2.5 rounded-xl border border-secondary/20">
            <span className="font-heading text-xs text-secondary font-bold block">
              ✓ {t.decisionTravelSafe}
            </span>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
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
            className="text-xs text-secondary font-heading font-bold text-left hover:underline flex items-center gap-1 pt-1"
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
