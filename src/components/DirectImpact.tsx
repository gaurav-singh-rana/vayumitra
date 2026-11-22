'use client';

import React from 'react';
import { AirQualitySnapshot, HouseholdProfile, RecommendationPlan } from '@/types';

interface DirectImpactProps {
  snapshot: AirQualitySnapshot;
  profile: HouseholdProfile;
  plan: RecommendationPlan;
}

export const DirectImpact: React.FC<DirectImpactProps> = ({
  snapshot,
  profile,
  plan,
}) => {
  const { verdict, alternatives } = plan;

  return (
    <div className="space-y-4">
      {/* Impact Section Header */}
      <div className="flex items-center justify-between pb-1 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <h2 className="font-heading text-lg sm:text-xl text-slate-900 font-bold">
            Sustainable Alternatives &amp; Direct Impact
          </h2>
          <span className="font-heading text-xs sm:text-sm text-slate-500 font-medium">
            (प्रभाव एवं विकल्प)
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200/90 rounded-full shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="font-heading text-xs text-slate-700 font-semibold">
            Live Cohort Sync
          </span>
        </div>
      </div>

      {/* 1. Household Impact Status Card */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03)] border border-slate-200/90 space-y-4 relative overflow-hidden">
        {/* Rank Header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="px-3 py-1 bg-slate-900 text-white font-heading text-xs rounded-full font-bold flex items-center gap-1.5 shadow-xs">
            <span
              className="material-symbols-outlined text-[16px] text-amber-400"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              military_tech
            </span>
            {verdict.rankTitle}
          </span>
          <span className="font-heading text-xs text-emerald-700 font-bold flex items-center gap-0.5">
            {verdict.rankPercentile}
            <span className="material-symbols-outlined text-[15px]">north_east</span>
          </span>
        </div>

        {/* Hero Circular Gauge & Descriptor */}
        <div className="flex items-center gap-5">
          {/* SVG Circular Progress Ring */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96" aria-hidden="true">
              <circle
                className="text-slate-100"
                cx="48"
                cy="48"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeWidth="7"
              />
              <circle
                className="text-emerald-600 transition-all duration-1000 ease-out"
                cx="48"
                cy="48"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * verdict.score) / 100}
                strokeLinecap="round"
                strokeWidth="7"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-heading text-2xl sm:text-3xl text-slate-900 font-extrabold leading-none tabular-nums">
                {verdict.score}
              </span>
              <span className="font-heading text-[10px] sm:text-xs text-slate-500 font-medium">
                / 100
              </span>
            </div>
          </div>

          {/* Household Context */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-700 text-[18px]">
                verified_user
              </span>
              <h3 className="font-heading text-base font-bold text-slate-900 truncate">
                {verdict.headline}
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {snapshot.locationName} • Active HEPA filtration + mindful transit shielding for{' '}
              <strong className="text-slate-800">{profile.name}</strong>.
            </p>
          </div>
        </div>

        {/* Dual Metric Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="bg-slate-50/70 p-4 rounded-xl flex flex-col justify-between border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-slate-600 mb-1">
              <span className="material-symbols-outlined text-[18px] text-emerald-600">air</span>
              <span className="font-heading text-xs font-semibold">PM2.5 Spared</span>
            </div>
            <div className="font-heading text-xl font-bold text-slate-900 tabular-nums">
              {verdict.sparedPm25}
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-snug">
              {verdict.sparedCigarettesEquiv} for{' '}
              <span className="font-semibold text-slate-800">{profile.name}</span>
            </p>
          </div>

          <div className="bg-slate-50/70 p-4 rounded-xl flex flex-col justify-between border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-slate-600 mb-1">
              <span className="material-symbols-outlined text-[18px] text-teal-600">cloud_done</span>
              <span className="font-heading text-xs font-semibold">CO2 Averted</span>
            </div>
            <div className="font-heading text-xl font-bold text-slate-900 tabular-nums">
              {verdict.avertedCo2}
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-snug">
              Past 7-day cumulative net footprint drop
            </p>
          </div>
        </div>

        {/* Progress to Next Rank */}
        <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 border border-slate-200/80">
          <div className="flex justify-between items-center text-slate-700">
            <span className="font-heading text-xs font-semibold flex items-center gap-1.5 text-slate-900">
              <span className="material-symbols-outlined text-[16px] text-amber-500">
                workspace_premium
              </span>
              Next Rank: Vayu Rishi (ऋषि)
            </span>
            <span className="font-heading text-xs text-slate-600 font-bold tabular-nums">
              {verdict.pointsToNextRank} pts to level up
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: '84%' }}></div>
          </div>
        </div>
      </section>

      {/* 2. Route Smog Shield Comparison */}
      <section className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-heading text-base font-bold text-slate-900">
              Route Smog Shield
            </h3>
            <p className="text-xs text-slate-500">
              {snapshot.locationName} ➔ City Commercial Hub Corridor
            </p>
          </div>
          <div className="px-3 py-1 bg-rose-50 text-rose-900 border border-rose-200 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
            <span className="font-heading text-xs font-bold tabular-nums">AQI {snapshot.aqi} Severe</span>
          </div>
        </div>

        {/* Alternatives Mapping with Why & Direct Impact Callouts */}
        {alternatives.map((alt, idx) => {
          const isRecommended = alt.type === 'recommended';

          return (
            <div
              key={idx}
              className={`rounded-2xl p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03)] space-y-3 border transition-all ${
                isRecommended
                  ? 'bg-white border-emerald-200/90'
                  : 'bg-white border-slate-200/80 opacity-90'
              }`}
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isRecommended ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <span className="material-symbols-outlined text-[22px]">
                      {isRecommended ? 'directions_subway' : 'directions_car'}
                    </span>
                  </div>
                  <div>
                    <span className="font-heading text-base font-bold text-slate-900 block">
                      {alt.title}
                    </span>
                    {isRecommended && (
                      <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        VayuMitra Recommended Route
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full font-heading text-xs font-bold flex items-center gap-1.5 border ${
                    isRecommended
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200 shadow-xs'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {isRecommended ? 'shield' : 'warning'}
                  </span>
                  {alt.badge}
                </span>
              </div>

              {/* 3 Metric Pills: Duration, Cost, Emissions */}
              <div
                className={`grid grid-cols-3 gap-2 py-2 text-center rounded-xl p-2.5 border ${
                  isRecommended ? 'bg-emerald-50/40 border-emerald-200/60' : 'bg-slate-50 border-slate-200/70'
                }`}
              >
                <div>
                  <span className="font-heading text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
                    Duration
                  </span>
                  <span className="font-heading text-xs sm:text-sm font-bold text-slate-900 tabular-nums">
                    {alt.duration}
                  </span>
                </div>
                <div>
                  <span className="font-heading text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
                    Cost
                  </span>
                  <span className="font-heading text-xs sm:text-sm font-bold text-slate-900 tabular-nums">
                    {alt.cost}
                  </span>
                </div>
                <div>
                  <span className="font-heading text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
                    Emissions
                  </span>
                  <span
                    className={`font-heading text-xs sm:text-sm font-bold tabular-nums ${
                      isRecommended ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {alt.emissions}
                  </span>
                </div>
              </div>

              {/* Why & Direct Impact Callout */}
              <div
                className={`flex items-start gap-2.5 p-3 rounded-xl text-xs leading-relaxed border ${
                  isRecommended
                    ? 'bg-emerald-50/60 border-emerald-200/80 text-emerald-950'
                    : 'bg-slate-50 border-slate-200/70 text-slate-700'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[18px] shrink-0 mt-0.5 ${
                    isRecommended ? 'text-emerald-700' : 'text-amber-600'
                  }`}
                >
                  {isRecommended ? 'health_and_safety' : 'warning'}
                </span>
                <div>
                  <span className="font-bold block mb-0.5 text-slate-900">
                    Why &amp; Direct Impact:
                  </span>
                  <p>{alt.notes}</p>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
