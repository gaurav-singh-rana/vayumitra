'use client';

import React from 'react';

export type NavTab = 'today' | 'indoor' | 'impact' | 'copilot';

interface BottomNavProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const navItems: Array<{ id: NavTab; label: string; icon: string }> = [
    { id: 'today', label: 'Today', icon: 'schedule' },
    { id: 'indoor', label: 'Indoor', icon: 'shield' },
    { id: 'impact', label: 'Impact', icon: 'eco' },
    { id: 'copilot', label: 'Ask Vayu', icon: 'auto_awesome' },
  ];

  return (
    <nav
      className="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(15,76,92,0.06)] border-t border-surface-container"
      aria-label="Main Application Navigation"
    >
      <div className="max-w-4xl mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              role="tab"
              aria-selected={isActive}
              aria-label={`Navigate to ${item.label} section`}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-3 transition-colors ${
                isActive
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="font-heading text-xs mt-0.5">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-secondary mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
