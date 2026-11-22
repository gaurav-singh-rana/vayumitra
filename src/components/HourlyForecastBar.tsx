'use client';

import React from 'react';
import { AirQualitySnapshot, HourlyForecastItem } from '@/types';
import { Language } from '@/lib/translations';

interface HourlyForecastBarProps {
  snapshot: AirQualitySnapshot;
  lang: Language;
}

export const HourlyForecastBar: React.FC<HourlyForecastBarProps> = ({ snapshot, lang }) => {
  const forecast = snapshot.hourlyForecast;
  if (!forecast || forecast.length === 0) return null;

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-emerald-500 text-white';
    if (aqi <= 100) return 'bg-lime-500 text-slate-900';
    if (aqi <= 200) return 'bg-amber-500 text-slate-900';
    if (aqi <= 300) return 'bg-purple-600 text-white';
    return 'bg-rose-600 text-white';
  };

  return (
    <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 space-y-3" aria-labelledby="forecast-heading">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <span className="font-heading text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">timeline</span>
            {lang === 'hi' ? '24-घंटे का वायु पूर्वानुमान' : '24-Hour Diurnal Breathing Forecast'}
          </span>
          <h3 id="forecast-heading" className="font-heading text-base sm:text-lg font-bold text-slate-800 mt-0.5">
            {lang === 'hi' ? 'आज कब बाहर निकलना सबसे सुरक्षित है?' : 'When is Outdoor Exposure Safest Today?'}
          </h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          {lang === 'hi' ? 'दोपहर 2–4 बजे सेफ विंडो' : '2–4 PM Safe Solar Window'}
        </span>
      </div>

      {/* Horizontal Scrollable Hourly Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pt-1">
        {forecast.map((item: HourlyForecastItem, idx: number) => {
          const isOptimal = item.isSafeWindow;

          return (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex flex-col justify-between space-y-2 transition-all ${
                isOptimal
                  ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-400/40 shadow-xs'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">{item.time}</span>
                {isOptimal && (
                  <span className="material-symbols-outlined text-emerald-600 text-[16px]" title="Cleanest Solar Window">
                    verified
                  </span>
                )}
              </div>

              <div>
                <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-black ${getAqiColor(item.aqi)}`}>
                  AQI {item.aqi}
                </span>
                <span className="block text-[11px] text-slate-500 font-medium mt-1">
                  PM2.5: {item.pm25} µg
                </span>
              </div>

              <div className="pt-1 border-t border-slate-200/60">
                <span className={`text-[10px] font-bold block leading-tight ${
                  isOptimal ? 'text-emerald-700' : 'text-slate-500'
                }`}>
                  {isOptimal
                    ? (lang === 'hi' ? '✓ सुरक्षित विंडो' : '✓ Safest Window')
                    : item.hour <= 10
                    ? (lang === 'hi' ? '⛔ स्मॉग ट्रैप' : '⛔ Inversion Peak')
                    : (lang === 'hi' ? '⚠️ सतर्क रहें' : '⚠️ Smog Advisory')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
        {lang === 'hi'
          ? '💡 वैज्ञानिक तथ्य: सुबह 7–11 बजे जमीन की ठंडक से जहरीला धुआं नीचे फंसा रहता है। दोपहर में धूप से हवा गर्म होकर ऊपर उठती है, जिससे हवा 45% तक साफ हो जाती है।'
          : '💡 Scientific fact: Morning 7–11 AM ground inversions trap cold exhaust. Midday solar heating ascends particulate upward, creating a 45% cleaner breathing window.'}
      </p>
    </section>
  );
};
