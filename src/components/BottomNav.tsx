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
      className="fixed bottom-0 w-full z-40 pb-safe bg-surface/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(15,76,92,0.06)] border-t border-surface-container"
      aria-label="Main Application Navigation"
    >
      <div className="max-w-4xl mx-auto flex justify-around items-center h-16 px-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              role="tab"
              aria-selected={isActive}
              aria-label={`Navigate to ${item.label} section`}
              className={`flex flex-col items-center justify-center min-w-[52px] min-h-[44px] px-2 transition-colors ${
                isActive
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <span
                className="material-symbols-outlined text-[23px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="font-heading text-[11px] sm:text-xs mt-0.5 truncate max-w-[68px]">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1 rounded-full bg-secondary mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
