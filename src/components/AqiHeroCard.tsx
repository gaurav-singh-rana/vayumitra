'use client';

import React from 'react';
import { AirQualitySnapshot, HouseholdProfile } from '@/types';

interface AqiHeroCardProps {
  snapshot: AirQualitySnapshot;
  profile: HouseholdProfile;
}

export const AqiHeroCard: React.FC<AqiHeroCardProps> = ({ snapshot, profile }) => {
  const aqi = snapshot.aqi;

  // Calculate radial progress arc (dasharray is 251.2 for radius 40)
  // AQI 0 to 500 mapped to 0% to 100%
  const percentage = Math.min(100, Math.max(5, (aqi / 500) * 100));
  const dashOffset = 251.2 - (251.2 * percentage) / 100;

  const getSeverityPill = () => {
    if (aqi <= 100) {
      return {
        bg: 'bg-emerald-100 text-emerald-800',
        dot: 'bg-emerald-600',
        tier: 'TIER 1 GOOD',
        color: '#10b981',
      };
    }
    if (aqi <= 200) {
      return {
        bg: 'bg-amber-100 text-amber-800',
        dot: 'bg-amber-600',
        tier: 'TIER 3 MODERATE',
        color: '#f59e0b',
      };
    }
    if (aqi <= 300) {
      return {
        bg: 'bg-orange-100 text-orange-800',
        dot: 'bg-orange-600',
        tier: 'TIER 4 POOR',
        color: '#f97316',
      };
    }
    return {
      bg: 'bg-error-container text-on-error-container',
      dot: 'bg-error',
      tier: aqi > 400 ? 'CAT. 5 EMERGENCY' : 'TIER 5 SEVERE',
      color: '#ba1a1a',
    };
  };

  const pillInfo = getSeverityPill();

  return (
    <section
      className="w-full bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden relative"
      aria-labelledby="aqi-heading"
    >
      <div className="p-4 sm:p-6 flex flex-col space-y-4">
        {/* Top Row: Severity Tag & Live Sensor ID */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-heading text-xs font-bold ${pillInfo.bg}`}
          >
            <span className={`w-2 h-2 rounded-full ${pillInfo.dot} animate-pulse`}></span>
            <span id="aqi-heading">
              {snapshot.severity.toUpperCase()} • {snapshot.hindiSeverity}
            </span>
          </span>
          <span className="font-heading text-xs text-outline font-semibold uppercase tracking-wider">
            {pillInfo.tier}
          </span>
        </div>

        {/* Main Metric and Radial Display */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col min-w-0">
            <span className="font-heading text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              National AQI Index (NAQI)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-4xl sm:text-5xl text-primary font-bold tracking-tight">
                {aqi}
              </span>
              <span className="font-heading text-xs text-error font-semibold flex items-center">
                ▲ PM2.5 Dominant
              </span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
              {snapshot.summary}
            </p>
          </div>

          {/* Radial Circular Progress Gauge */}
          <div
            className="relative flex-shrink-0 w-24 h-24 flex items-center justify-center"
            aria-hidden="true"
          >
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background track */}
              <circle
                className="text-surface-container"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeWidth="9"
              />
              {/* Severity Arc */}
              <circle
                className="transition-all duration-1000 ease-out"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke={pillInfo.color}
                strokeDasharray="251.2"
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                strokeWidth="9"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ color: pillInfo.color, fontVariationSettings: "'FILL' 1" }}
              >
                {aqi > 300 ? 'warning' : aqi > 200 ? 'error' : 'eco'}
              </span>
              <span className="font-heading text-xs font-bold" style={{ color: pillInfo.color }}>
                {aqi > 300 ? 'Tier 5' : aqi > 200 ? 'Tier 4' : 'Safe'}
              </span>
            </div>
          </div>
        </div>

        {/* Atmospheric Inversion Alert Banner */}
        <div className="p-3 sm:p-4 rounded-xl bg-surface-container-high text-on-surface flex items-start gap-3 border border-surface-container-highest">
          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex-shrink-0 flex items-center justify-center mt-0.5">
            <span className="material-symbols-outlined text-[18px]">wb_twilight</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-heading text-xs sm:text-sm font-bold text-primary">
                Ground Inversion Layer Risk: {snapshot.inversionRisk}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-heading text-[10px] font-semibold">
                Until 11:30 AM
              </span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
              Cool night air locks heavy vehicular PM2.5 at breathing level. {profile.name}&apos;s safe outdoor
              breathing window opens at{' '}
              <strong className="text-secondary font-semibold">12:30 PM – 3:45 PM</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
