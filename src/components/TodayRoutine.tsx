'use client';

import React from 'react';
import { HouseholdProfile, RecommendationPlan } from '@/types';

interface TodayRoutineProps {
  profile: HouseholdProfile;
  plan: RecommendationPlan;
  onOpenCopilot: (presetQuestion?: string) => void;
  onSwitchTab: (tab: 'today' | 'indoor' | 'impact' | 'copilot') => void;
}

export const TodayRoutine: React.FC<TodayRoutineProps> = ({
  profile,
  plan,
  onOpenCopilot,
  onSwitchTab,
}) => {
  const { routineItems } = plan;

  return (
    <div className="space-y-4">
      {/* Routine Safe Windows Section Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="font-heading text-lg sm:text-xl text-primary font-bold">
            {profile.name}&apos;s Daily Breath Rhythm
          </h2>
          <p className="text-xs text-on-surface-variant">{profile.ageContext}</p>
        </div>
        <span className="material-symbols-outlined text-secondary text-[24px]">calendar_today</span>
      </div>

      {/* Routine Timeline Cards */}
      <div className="space-y-3" role="region" aria-label="Timeline of Daily Safe Breathing Windows">
        {routineItems.map((item) => {
          const isAfternoon = item.period === 'Afternoon';
          const isMorning = item.period === 'Morning';

          return (
            <article
              key={item.id}
              className={`p-4 rounded-xl shadow-sm space-y-2.5 relative overflow-hidden border border-surface-container ${
                isAfternoon ? 'bg-secondary-container/20' : 'bg-surface-container-lowest'
              }`}
            >
              {/* Left Color Indicator Bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  isMorning ? 'bg-error' : isAfternoon ? 'bg-secondary' : 'bg-primary'
                }`}
              />

              <div className="flex items-center justify-between pl-1 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-sm font-bold text-primary">{item.period}</span>
                  <span
                    className={`font-heading text-xs ${
                      isAfternoon ? 'text-secondary font-semibold' : 'text-on-surface-variant'
                    }`}
                  >
                    • {item.timeWindow}
                  </span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-heading text-xs font-semibold flex items-center gap-1 ${
                    isMorning
                      ? 'bg-error-container text-on-error-container'
                      : isAfternoon
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-surface-container-highest text-on-surface-variant'
                  }`}
                >
                  {isAfternoon && (
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                  )}
                  {item.statusTag}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-on-surface pl-1 leading-relaxed">
                {item.description}
              </p>

              {/* Action Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1 pl-1">
                {item.badges.map((b, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface font-heading text-xs"
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${
                        b.variant === 'error'
                          ? 'text-error'
                          : b.variant === 'secondary'
                          ? 'text-secondary'
                          : 'text-primary'
                      }`}
                    >
                      {b.icon}
                    </span>
                    <span>{b.text}</span>
                  </span>
                ))}
              </div>

              {/* Highlight Action Button for Afternoon */}
              {item.highlightAction && (
                <div className="pl-1 pt-1">
                  <button
                    onClick={() =>
                      onOpenCopilot(
                        `Tell me the exact safest window and precautions for ${profile.name}'s afternoon walk.`
                      )
                    }
                    className="w-full flex items-center justify-between p-2.5 rounded-lg bg-surface-container-lowest text-on-secondary-container shadow-xs min-h-[44px] hover:bg-surface-container transition-colors border border-surface-container"
                    type="button"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[20px]">
                        {item.highlightAction.icon}
                      </span>
                      <span className="font-heading text-xs sm:text-sm font-bold text-secondary">
                        {item.highlightAction.text}
                      </span>
                    </div>
                    <span className="font-heading text-xs font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
                      {item.highlightAction.aqiEstimate}
                    </span>
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Bottom Quick Action & AI Assistant Cards */}
      <div className="space-y-3 pt-1">
        {/* Ask Vayu AI Prompt Card */}
        <div className="w-full p-4 bg-primary text-on-primary rounded-xl shadow-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading text-[10px] text-primary-fixed uppercase tracking-wider font-semibold">
                Ask Vayu AI Copilot
              </span>
              <p className="font-heading text-xs sm:text-sm font-semibold truncate text-on-primary">
                &quot;Is outdoor play safe for {profile.name} today?&quot;
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              onOpenCopilot(`Can ${profile.name} do outdoor physical activities at 5 PM today?`)
            }
            aria-label="Ask Vayu AI this question"
            className="w-10 h-10 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center flex-shrink-0 hover:bg-surface-container-high transition-transform active:scale-95 shadow-sm"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>

        {/* Home Air Fortress Playbook Card */}
        <div className="w-full p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-surface-container-high text-secondary flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">home_iot_device</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading text-xs sm:text-sm text-primary font-bold truncate">
                Home Air Fortress Playbook
              </span>
              <p className="text-xs text-on-surface-variant truncate">
                3 instant zero-cost actions to cut indoor PM2.5
              </p>
            </div>
          </div>
          <button
            onClick={() => onSwitchTab('indoor')}
            className="px-4 py-2 rounded-md bg-secondary-container/40 text-on-secondary-container font-heading text-xs font-bold hover:bg-secondary-container/70 transition-colors min-h-[44px]"
            type="button"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};
