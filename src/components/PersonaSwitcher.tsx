'use client';

import React from 'react';
import { HouseholdProfile, PersonaType } from '@/types';
import { PERSONA_LIST } from '@/lib/personas';

interface PersonaSwitcherProps {
  currentProfile: HouseholdProfile;
  onSelectPersona: (personaId: PersonaType) => void;
}

export const PersonaSwitcher: React.FC<PersonaSwitcherProps> = ({
  currentProfile,
  onSelectPersona,
}) => {
  return (
    <div
      className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
      role="tablist"
      aria-label="Household Profile Personas"
    >
      {PERSONA_LIST.map((p) => {
        const isSelected = currentProfile.id === p.id;
        return (
          <button
            key={p.id}
            role="tab"
            aria-selected={isSelected}
            aria-label={`${p.label}: ${p.description}`}
            onClick={() => onSelectPersona(p.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full min-h-[36px] transition-all text-xs font-heading font-medium ${
              isSelected
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">{p.icon}</span>
            <span>{p.label}</span>
            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span>}
          </button>
        );
      })}
    </div>
  );
};
