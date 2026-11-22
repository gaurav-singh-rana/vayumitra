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
        <div className="flex items-center gap-1.5">
          <h2 className="font-heading text-lg sm:text-xl text-primary font-bold">
            Direct Impact &amp; Alternatives
          </h2>
          <span className="font-heading text-xs sm:text-sm text-on-surface-variant font-medium">
            (प्रभाव एवं विकल्प)
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-high rounded-full">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          <span className="font-heading text-xs text-on-surface-variant font-semibold">
            Live Cohort Sync
          </span>
        </div>
      </div>

      {/* 1. Household Impact Status Card */}
      <section className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-sm border border-surface-container space-y-4 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-36 h-36 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Rank Header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="px-3 py-1 bg-secondary-fixed/50 text-on-secondary-fixed font-heading text-xs rounded-full font-bold flex items-center gap-1">
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              military_tech
            </span>
            {verdict.rankTitle}
          </span>
          <span className="font-heading text-xs text-secondary font-semibold flex items-center gap-0.5">
            {verdict.rankPercentile}
            <span className="material-symbols-outlined text-[15px]">north_east</span>
          </span>
        </div>

        {/* Hero Circular Gauge & Descriptor */}
        <div className="flex items-center gap-4">
          {/* SVG Circular Progress Ring */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
              <circle
                className="text-surface-container"
                cx="48"
                cy="48"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeWidth="7"
              />
              <circle
                className="text-secondary transition-all duration-1000 ease-out"
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
              <span className="font-heading text-2xl sm:text-3xl text-primary font-bold leading-none">
                {verdict.score}
              </span>
              <span className="font-heading text-[10px] sm:text-xs text-on-surface-variant font-semibold">
                / 100
              </span>
            </div>
          </div>

          {/* Household Context */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-[18px]">
                verified_user
              </span>
              <h3 className="font-heading text-sm sm:text-base text-primary font-bold truncate">
                {verdict.headline}
              </h3>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {snapshot.locationName} • Active HEPA filtration + mindful transit shielding{' '}
              {profile.name}.
            </p>
          </div>
        </div>

        {/* Dual Metric Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="bg-surface-container-low p-3 rounded-xl flex flex-col justify-between border border-surface-container">
            <div className="flex items-center gap-1 text-secondary mb-1">
              <span className="material-symbols-outlined text-[18px]">air</span>
              <span className="font-heading text-xs font-semibold">PM2.5 Spared</span>
            </div>
            <div className="font-heading text-lg sm:text-xl text-primary font-bold">
              {verdict.sparedPm25}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1 leading-snug">
              {verdict.sparedCigarettesEquiv} for{' '}
              <span className="font-semibold text-primary">{profile.name}</span>
            </p>
          </div>

          <div className="bg-surface-container-low p-3 rounded-xl flex flex-col justify-between border border-surface-container">
            <div className="flex items-center gap-1 text-secondary mb-1">
              <span className="material-symbols-outlined text-[18px]">cloud_done</span>
              <span className="font-heading text-xs font-semibold">CO2 Averted</span>
            </div>
            <div className="font-heading text-lg sm:text-xl text-primary font-bold">
              {verdict.avertedCo2}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1 leading-snug">
              Past 7-day cumulative net footprint drop
            </p>
          </div>
        </div>

        {/* Progress to Next Rank */}
        <div className="bg-surface-container rounded-xl p-3 space-y-1.5 border border-surface-container-high">
          <div className="flex justify-between items-center text-on-surface">
            <span className="font-heading text-xs font-semibold flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                workspace_premium
              </span>
              Next Rank: Vayu Rishi (ऋषि)
            </span>
            <span className="font-heading text-xs text-secondary font-bold">
              {verdict.pointsToNextRank} pts to level up
            </span>
          </div>
          <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="bg-secondary h-full rounded-full transition-all" style={{ width: '84%' }}></div>
          </div>
        </div>
      </section>

      {/* 2. Route Smog Shield Comparison */}
      <section className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-heading text-sm sm:text-base text-primary font-bold">
              Route Smog Shield
            </h3>
            <p className="text-xs text-on-surface-variant">
              {snapshot.locationName} ➔ City Commercial Hub Corridor
            </p>
          </div>
          <div className="px-2.5 py-1 bg-error-container text-on-error-container rounded-full flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
            <span className="font-heading text-xs font-bold">AQI {snapshot.aqi} Severe</span>
          </div>
        </div>

        {/* Alternatives Mapping */}
        {alternatives.map((alt, idx) => {
          const isRecommended = alt.type === 'recommended';

          return (
            <div
              key={idx}
              className={`rounded-2xl p-4 shadow-sm space-y-2.5 border transition-all ${
                isRecommended
                  ? 'bg-gradient-to-br from-surface-container-lowest via-secondary-container/10 to-surface-container-lowest border-secondary/30 shadow-md'
                  : 'bg-surface-container-lowest border-surface-container opacity-85'
              }`}
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`material-symbols-outlined text-[24px] ${
                      isRecommended ? 'text-secondary' : 'text-outline'
                    }`}
                  >
                    {isRecommended ? 'directions_subway' : 'directions_car'}
                  </span>
                  <div>
                    <span className="font-heading text-sm sm:text-base text-primary font-bold block">
                      {alt.title}
                    </span>
                    {isRecommended && (
                      <span className="text-xs text-secondary font-semibold">
                        VayuMitra Recommended Route
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full font-heading text-xs font-bold flex items-center gap-1 ${
                    isRecommended
                      ? 'bg-secondary text-on-secondary shadow-xs'
                      : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {isRecommended && (
                    <span className="material-symbols-outlined text-[14px]">shield</span>
                  )}
                  {alt.badge}
                </span>
              </div>

              {/* 3 Metric Pills: Duration, Cost, Emissions */}
              <div
                className={`grid grid-cols-3 gap-2 py-1 text-center rounded-xl p-2 ${
                  isRecommended ? 'bg-secondary-fixed/20' : 'bg-surface-container-low'
                }`}
              >
                <div>
                  <span className="font-heading text-[10px] text-on-surface-variant block uppercase tracking-wide">
                    Duration
                  </span>
                  <span className="font-heading text-xs sm:text-sm font-bold text-on-surface">
                    {alt.duration}
                  </span>
                </div>
                <div>
                  <span className="font-heading text-[10px] text-on-surface-variant block uppercase tracking-wide">
                    Cost
                  </span>
                  <span className="font-heading text-xs sm:text-sm font-bold text-on-surface">
                    {alt.cost}
                  </span>
                </div>
                <div>
                  <span className="font-heading text-[10px] text-on-surface-variant block uppercase tracking-wide">
                    Emissions
                  </span>
                  <span
                    className={`font-heading text-xs sm:text-sm font-bold ${
                      isRecommended ? 'text-secondary' : 'text-error'
                    }`}
                  >
                    {alt.emissions}
                  </span>
                </div>
              </div>

              {/* Explanatory notes */}
              <div
                className={`flex items-start gap-2 p-2.5 rounded-lg text-xs leading-relaxed ${
                  isRecommended
                    ? 'bg-secondary-container/20 text-on-surface'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[18px] flex-shrink-0 mt-0.5 ${
                    isRecommended ? 'text-secondary' : 'text-error'
                  }`}
                >
                  {isRecommended ? 'health_and_safety' : 'warning'}
                </span>
                <p>{alt.notes}</p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
