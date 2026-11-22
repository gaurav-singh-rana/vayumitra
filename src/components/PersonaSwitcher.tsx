'use client';

import React from 'react';
import { HouseholdProfile, PersonaType } from '@/types';
import { PERSONA_LIST } from '@/lib/personas';
import { Language, TRANSLATIONS } from '@/lib/translations';

interface PersonaSwitcherProps {
  currentProfile: HouseholdProfile;
  lang: Language;
  onSelectPersona: (personaId: PersonaType) => void;
}

export const PersonaSwitcher: React.FC<PersonaSwitcherProps> = ({
  currentProfile,
  lang,
  onSelectPersona,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-heading text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-slate-400">group</span>
          <span>{t.personaHeading}</span>
        </span>
        <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
          {lang === 'hi' ? 'दैनिक सुरक्षा सुझावों को अनुकूलित करें' : 'Tailors action advice to health vulnerabilities'}
        </span>
      </div>

      <div
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5"
        role="tablist"
        aria-label="Household Profile Personas"
      >
        {PERSONA_LIST.map((p) => {
          const isSelected = currentProfile.id === p.id;
          const displayLabel = lang === 'hi' ? p.hindiLabel : p.label;

          return (
            <button
              key={p.id}
              role="tab"
              aria-selected={isSelected}
              aria-label={`${displayLabel}: ${p.description}`}
              onClick={() => onSelectPersona(p.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full min-h-[38px] transition-all text-xs font-heading font-semibold border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.03)]'
              }`}
              type="button"
            >
              <span className={`material-symbols-outlined text-[17px] ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`}>
                {p.icon}
              </span>
              <span>{displayLabel}</span>
              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};
