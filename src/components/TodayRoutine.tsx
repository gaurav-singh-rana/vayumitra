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
          <h2 className="font-heading text-lg sm:text-xl text-slate-900 font-bold">
            {profile.name}&apos;s Low-Emission Daily Routine
          </h2>
          <p className="text-xs text-slate-500 font-medium">{profile.ageContext} • Diurnal breath schedule</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
          <span className="material-symbols-outlined text-[20px]">schedule</span>
        </div>
      </div>

      {/* Routine Timeline Cards with Clear 'Why & Direct Impact' Callouts */}
      <div className="space-y-4" role="region" aria-label="Timeline of Daily Safe Breathing Windows">
        {routineItems.map((item) => {
          const isAfternoon = item.period === 'Afternoon';
          const isMorning = item.period === 'Morning';

          // Why & Direct Impact explanation specific to the diurnal window
          const impactReason = isMorning
            ? 'Cold morning air traps dense combustion exhaust at ground level. Shifting workouts indoors avoids up to 70% deep alveolar soot intake.'
            : isAfternoon
            ? 'Peak solar warming breaks the inversion lid and disperses surface particulate, offering today’s cleanest outdoor ventilation window.'
            : 'Cooling dusk temperatures compress the atmospheric boundary layer, re-trapping evening rush-hour traffic emissions against homes.';

          return (
            <article
              key={item.id}
              className={`p-5 sm:p-6 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03)] space-y-3 relative overflow-hidden border ${
                isAfternoon
                  ? 'bg-emerald-50/20 border-emerald-200/80'
                  : 'bg-white border-slate-200/90'
              }`}
            >
              {/* Header: Period, Time Window & Status Pill */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-heading text-base font-bold text-slate-900">{item.period}</span>
                  <span className="font-heading text-xs text-slate-500 font-medium tabular-nums">
                    • {item.timeWindow}
                  </span>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-heading text-xs font-bold border ${
                    isMorning
                      ? 'bg-rose-50 text-rose-900 border-rose-200'
                      : isAfternoon
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {isMorning ? 'report_problem' : isAfternoon ? 'verified' : 'nights_stay'}
                  </span>
                  <span>{item.statusTag}</span>
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h3 className="font-heading text-sm sm:text-base font-bold text-slate-800">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Why & Direct Impact Callout Box */}
              <div className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                isAfternoon
                  ? 'bg-emerald-50/50 border-emerald-200/60 text-emerald-950'
                  : 'bg-slate-50 border-slate-200/70 text-slate-700'
              }`}>
                <span className="material-symbols-outlined text-[18px] text-emerald-700 shrink-0 mt-0.5">
                  science
                </span>
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">
                    Why &amp; Direct Impact:
                  </span>
                  <span>{impactReason}</span>
                </div>
              </div>

              {/* Action Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {item.badges.map((b, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700 font-heading text-xs font-medium"
                  >
                    <span className="material-symbols-outlined text-[16px] text-slate-500">
                      {b.icon === 'airware' ? 'air' : b.icon}
                    </span>
                    <span>{b.text}</span>
                  </span>
                ))}
              </div>

              {/* Highlight Action Button for Afternoon */}
              {item.highlightAction && (
                <div className="pt-1">
                  <button
                    onClick={() =>
                      onOpenCopilot(
                        `Tell me the exact safest window and precautions for ${profile.name}'s afternoon walk.`
                      )
                    }
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white hover:bg-emerald-50/30 text-emerald-900 shadow-xs min-h-[44px] transition-colors border border-emerald-200"
                    type="button"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-700 text-[20px]">
                        directions_walk
                      </span>
                      <span className="font-heading text-xs sm:text-sm font-bold">
                        {item.highlightAction.text}
                      </span>
                    </div>
                    <span className="font-heading text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md tabular-nums">
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
      <div className="space-y-3 pt-2">
        {/* Ask Vayu AI Prompt Card */}
        <div className="w-full p-4 sm:p-5 bg-white border border-slate-200/90 rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03)] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                Ask Vayu AI Copilot
              </span>
              <p className="font-heading text-xs sm:text-sm font-semibold truncate text-slate-900">
                &quot;Is outdoor activity safe for {profile.name} today?&quot;
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              onOpenCopilot(`Can ${profile.name} do outdoor physical activities at 5 PM today?`)
            }
            aria-label="Ask Vayu AI this question"
            className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 hover:bg-slate-800 transition-transform active:scale-95 shadow-xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* Home Air Fortress Playbook Card */}
        <div className="w-full p-4 sm:p-5 bg-white rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03)] border border-slate-200/90 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">home</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading text-xs sm:text-sm text-slate-900 font-bold truncate">
                Home Air Fortress Playbook
              </span>
              <p className="text-xs text-slate-500 truncate">
                3 instant zero-cost actions to cut indoor PM2.5
              </p>
            </div>
          </div>
          <button
            onClick={() => onSwitchTab('indoor')}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-heading text-xs font-bold transition-colors min-h-[38px]"
            type="button"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};
