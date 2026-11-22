'use client';

import React from 'react';
import { AirQualitySnapshot } from '@/types';

interface TelemetryGridProps {
  snapshot: AirQualitySnapshot;
}

export const TelemetryGrid: React.FC<TelemetryGridProps> = ({ snapshot }) => {
  const { pm25, pm10, no2 } = snapshot.pollutants;

  return (
    <section aria-label="Key Pollutants and Dispersion Telemetry">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {/* PM 2.5 Card */}
        <div className="bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl shadow-sm border border-surface-container flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-heading text-xs text-on-surface-variant font-semibold">
              PM 2.5 (Fine)
            </span>
            <span className="px-1.5 py-0.5 rounded-full bg-error-container text-on-error-container font-heading text-[10px] font-bold">
              {pm25.multiplierVsWHO || 'High'}
            </span>
          </div>
          <div className="my-2">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-primary">
              {pm25.value}
            </span>
            <span className="font-heading text-xs text-outline ml-1">{pm25.unit}</span>
          </div>
          {/* Wave sparkline SVG */}
          <div className="w-full h-5 pt-1" aria-hidden="true">
            <svg className="w-full h-full text-error" fill="none" viewBox="0 0 100 24" aria-hidden="true">
              <path
                d="M0 18 Q 15 22, 30 14 T 60 16 T 85 6 L 100 8"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2.5"
              />
            </svg>
          </div>
          <span className="text-[11px] text-on-surface-variant mt-1 leading-tight">
            {pm25.statusText}
          </span>
        </div>

        {/* PM 10 Card */}
        <div className="bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl shadow-sm border border-surface-container flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-heading text-xs text-on-surface-variant font-semibold">PM 10</span>
            <span className="material-symbols-outlined text-outline text-[18px]">grain</span>
          </div>
          <div className="my-2">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-primary">
              {pm10.value}
            </span>
            <span className="font-heading text-xs text-outline ml-1">{pm10.unit}</span>
          </div>
          <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-tight">
            {pm10.contextNote || 'Coarse road dust and industrial fly-ash.'}
          </p>
        </div>

        {/* NO2 Traffic Spike Card */}
        <div className="bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl shadow-sm border border-surface-container flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-heading text-xs text-on-surface-variant font-semibold">
              NO₂ (Combustion)
            </span>
            <span className="material-symbols-outlined text-error text-[18px]">traffic</span>
          </div>
          <div className="my-2">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-primary">
              {no2.value}
            </span>
            <span className="font-heading text-xs text-outline ml-1">{no2.unit}</span>
          </div>
          <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-tight">
            Exhaust spike recorded near major transport corridors.
          </p>
        </div>

        {/* Dispersion Card */}
        <div className="bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl shadow-sm border border-surface-container flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-heading text-xs text-on-surface-variant font-semibold">
              Dispersion Rate
            </span>
            <span className="material-symbols-outlined text-secondary text-[18px]">air</span>
          </div>
          <div className="my-2">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-primary">
              {snapshot.windSpeedKmH}{' '}
              <span className="font-heading text-xs font-normal text-outline">km/h</span>
            </span>
            <span className="font-heading text-xs text-secondary font-medium block">
              {snapshot.windDirection}
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-tight">
            {snapshot.dispersionRateText}
          </p>
        </div>
      </div>
    </section>
  );
};
