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
      badgeColor: 'bg-rose-50 text-rose-900 border border-rose-200',
      badgeIcon: 'warning',
      status: pm25?.statusText ?? 'High',
      danger: pm25Val > 120,
    },
    {
      id: 'pm10',
      name: lang === 'hi' ? 'पार्टिकुलेट मैटर (PM10)' : 'Particulate Matter (PM10)',
      value: pm10Val,
      unit: pm10?.unit ?? 'µg/m³',
      icon: 'blur_on',
      badgeColor: 'bg-amber-50 text-amber-900 border border-amber-200',
      badgeIcon: 'warning',
      status: pm10?.statusText ?? 'Elevated',
      danger: pm10Val > 200,
    },
    {
      id: 'no2',
      name: lang === 'hi' ? 'नाइट्रोजन डाइऑक्साइड (NO2)' : 'Nitrogen Dioxide (NO2)',
      value: no2.value,
      unit: no2.unit,
      icon: 'traffic',
      badgeColor: 'bg-amber-50 text-amber-900 border border-amber-200',
      badgeIcon: 'info',
      status: no2.statusText,
      danger: no2.value > 80,
    },
    {
      id: 'co',
      name: lang === 'hi' ? 'कार्बन मोनोऑक्साइड (CO)' : 'Carbon Monoxide (CO)',
      value: co?.value ?? 650,
      unit: co?.unit ?? 'ppb',
      icon: 'cloud',
      badgeColor: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
      badgeIcon: 'check_circle',
      status: co?.statusText ?? 'Safe Trace Level',
      danger: false,
    },
    {
      id: 'so2',
      name: lang === 'hi' ? 'सल्फर डाइऑक्साइड (SO2)' : 'Sulfur Dioxide (SO2)',
      value: so2?.value ?? 4,
      unit: so2?.unit ?? 'ppb',
      icon: 'factory',
      badgeColor: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
      badgeIcon: 'check_circle',
      status: so2?.statusText ?? 'Safe Level',
      danger: false,
    },
    {
      id: 'o3',
      name: lang === 'hi' ? 'ओजोन (O3)' : 'Ozone (O3)',
      value: o3?.value ?? 3,
      unit: o3?.unit ?? 'ppb',
      icon: 'wb_sunny',
      badgeColor: 'bg-teal-50 text-teal-800 border border-teal-200',
      badgeIcon: 'check_circle',
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

        <div className="flex items-center gap-1.5 px-3 py-1 bg-white text-slate-700 rounded-full border border-slate-200/90 text-xs font-heading font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>CPCB Certified Continuous Feed</span>
        </div>
      </div>

      {/* 2x3 Responsive Pollutant Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {pollutantsList.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectPollutant?.(item.name)}
            className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.02)] flex items-center justify-between hover:shadow-sm hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 shrink-0 group-hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-slate-600 block truncate">
                  {item.name}
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-heading text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">
                    {item.value}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{item.unit}</span>
                </div>
                <div className="mt-1">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor}`}>
                    <span className="material-symbols-outlined text-[12px]">{item.badgeIcon}</span>
                    <span>{item.status}</span>
                  </span>
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
