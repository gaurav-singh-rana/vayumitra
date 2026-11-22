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
    <div className="space-y-1.5">
      <span className="font-heading text-xs font-semibold text-on-surface-variant flex items-center gap-1">
        <span className="material-symbols-outlined text-[16px] text-secondary">family_restroom</span>
        <span>{t.personaHeading}</span>
      </span>

      <div
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
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
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full min-h-[38px] transition-all text-xs font-heading font-semibold ${
                isSelected
                  ? 'bg-primary text-on-primary shadow-sm scale-102'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[17px]">{p.icon}</span>
              <span>{displayLabel}</span>
              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};
