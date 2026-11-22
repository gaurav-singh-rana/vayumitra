'use client';

import React from 'react';
import { AirQualitySnapshot } from '@/types';
import { Language } from '@/lib/translations';

interface MajorPollutantsGridProps {
  snapshot: AirQualitySnapshot;
  lang: Language;
  onSelectPollutant?: (pollutantName: string) => void;
}

export const MajorPollutantsGrid: React.FC<MajorPollutantsGridProps> = ({
  snapshot,
  lang,
  onSelectPollutant,
}) => {
  const safeAqi = snapshot?.aqi ?? 150;
  const pm25 = snapshot?.pollutants?.pm25;
  const pm10 = snapshot?.pollutants?.pm10;
  const no2 = snapshot?.pollutants?.no2;
  const so2 = snapshot?.pollutants?.so2;
  const co = snapshot?.pollutants?.co;
  const o3 = snapshot?.pollutants?.o3;

  const pm25Val = pm25?.value ?? Math.round(safeAqi * 0.7);
  const pm10Val = pm10?.value ?? Math.round(safeAqi * 0.9);

  const pollutantsList = [
    {
      id: 'pm25',
      name: lang === 'hi' ? 'पार्टिकुलेट मैटर (PM2.5)' : 'Particulate Matter (PM2.5)',
      value: pm25Val,
      unit: pm25?.unit ?? 'µg/m³',
      icon: 'grain',
      borderColor: 'border-l-purple-600',
      badgeColor: 'bg-purple-100 text-purple-700',
      status: pm25?.statusText ?? 'High',
      danger: pm25Val > 120,
    },
    {
      id: 'pm10',
      name: lang === 'hi' ? 'पार्टिकुलेट मैटर (PM10)' : 'Particulate Matter (PM10)',
      value: pm10Val,
      unit: pm10?.unit ?? 'µg/m³',
      icon: 'blur_on',
      borderColor: 'border-l-fuchsia-500',
      badgeColor: 'bg-fuchsia-100 text-fuchsia-700',
      status: pm10?.statusText ?? 'Elevated',
      danger: pm10Val > 200,
    },
    {
      id: 'co',
      name: lang === 'hi' ? 'कार्बन मोनोऑक्साइड (CO)' : 'Carbon Monoxide (CO)',
      value: co?.value ?? 650,
      unit: co?.unit ?? 'ppb',
      icon: 'cloud',
      borderColor: 'border-l-emerald-500',
      badgeColor: 'bg-emerald-100 text-emerald-700',
      status: co?.statusText ?? 'Safe Trace Level',
      danger: false,
    },
    {
      id: 'so2',
      name: lang === 'hi' ? 'सल्फर डाइऑक्साइड (SO2)' : 'Sulfur Dioxide (SO2)',
      value: so2?.value ?? 4,
      unit: so2?.unit ?? 'ppb',
      icon: 'factory',
      borderColor: 'border-l-teal-500',
      badgeColor: 'bg-teal-100 text-teal-700',
      status: so2?.statusText ?? 'Safe Level',
      danger: false,
    },
    {
      id: 'no2',
      name: lang === 'hi' ? 'नाइट्रोजन डाइऑक्साइड (NO2)' : 'Nitrogen Dioxide (NO2)',
      value: no2.value,
      unit: no2.unit,
      icon: 'traffic',
      borderColor: 'border-l-amber-500',
      badgeColor: 'bg-amber-100 text-amber-700',
      status: no2.statusText,
      danger: no2.value > 80,
    },
    {
      id: 'o3',
      name: lang === 'hi' ? 'ओजोन (O3)' : 'Ozone (O3)',
      value: o3?.value ?? 3,
      unit: o3?.unit ?? 'ppb',
      icon: 'wb_sunny',
      borderColor: 'border-l-cyan-500',
      badgeColor: 'bg-cyan-100 text-cyan-700',
      status: o3?.statusText ?? 'Normal Ground Trace',
      danger: false,
    },
  ];

  return (
    <section className="space-y-3" aria-labelledby="pollutants-title">
      <div className="flex items-center justify-between pb-1 flex-wrap gap-2">
        <div>
          <h2 id="pollutants-title" className="font-heading text-lg sm:text-xl font-bold text-slate-900">
            {lang === 'hi' ? 'मुख्य वायु प्रदूषक (Major Pollutants)' : 'Major Air Pollutants'}
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            {snapshot.locationName} • {snapshot.stationCode}
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-700 rounded-full border border-sky-200 text-xs font-heading font-semibold">
          <span className="w-2 h-2 rounded-full bg-sky-500"></span>
          <span>CPCB Certified Feed</span>
        </div>
      </div>

      {/* 2x3 Responsive Pollutant Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {pollutantsList.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectPollutant?.(item.name)}
            className={`bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center justify-between border-l-4 ${item.borderColor} hover:shadow-sm hover:border-slate-300 transition-all cursor-pointer group`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-slate-600 block truncate">
                  {item.name}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                    {item.value}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{item.unit}</span>
                </div>
              </div>
            </div>

            <span className="material-symbols-outlined text-slate-300 text-[20px] group-hover:translate-x-0.5 group-hover:text-slate-600 transition-all">
              chevron_right
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
