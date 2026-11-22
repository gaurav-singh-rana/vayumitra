'use client';

import React from 'react';
import { Language, TRANSLATIONS } from '@/lib/translations';

export type NavTab = 'today' | 'decisions' | 'indoor' | 'impact' | 'copilot';

interface BottomNavProps {
  activeTab: NavTab;
  lang: Language;
  onChangeTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, lang, onChangeTab }) => {
  const t = TRANSLATIONS[lang];

  const navItems: Array<{ id: NavTab; label: string; icon: string }> = [
    { id: 'today', label: t.tabToday, icon: 'schedule' },
    { id: 'decisions', label: t.tabDecisions, icon: 'checklist' },
    { id: 'indoor', label: t.tabIndoor, icon: 'shield' },
    { id: 'impact', label: t.tabImpact, icon: 'eco' },
    { id: 'copilot', label: t.tabCopilot, icon: 'auto_awesome' },
  ];

  return (
    <nav
      className="fixed bottom-0 w-full z-40 pb-safe bg-white/95 backdrop-blur-md shadow-[0_-1px_4px_rgba(15,23,42,0.04)] border-t border-slate-200/80"
      aria-label="Main Application Navigation"
    >
      <div className="max-w-5xl mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              role="tab"
              aria-selected={isActive}
              aria-label={`Navigate to ${item.label} section`}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 transition-colors ${
                isActive
                  ? 'text-slate-900 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              type="button"
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="font-heading text-[11px] sm:text-xs mt-0.5 truncate max-w-[72px]">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1 rounded-full bg-emerald-500 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
