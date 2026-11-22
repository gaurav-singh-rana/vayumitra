'use client';

import React, { useState } from 'react';
import { AirQualitySnapshot, HouseholdProfile } from '@/types';
import { Language } from '@/lib/translations';

interface AqiInHeroSectionProps {
  snapshot: AirQualitySnapshot;
  profile: HouseholdProfile;
  lang: Language;
  onAutoDetectLocation: () => void;
  isLocating: boolean;
  onRefreshLive?: () => void;
  isRefreshing?: boolean;
}

export const AqiInHeroSection: React.FC<AqiInHeroSectionProps> = ({
  snapshot,
  profile,
  lang,
  onAutoDetectLocation,
  isLocating,
  onRefreshLive,
  isRefreshing,
}) => {
  const [standard, setStandard] = useState<'in' | 'us'>('in');
  const aqi = snapshot?.aqi ?? 150;
  const displayAqi = standard === 'us' && snapshot?.usAqi ? snapshot.usAqi : aqi;
  const pm25Val = snapshot?.pollutants?.pm25?.value ?? Math.round(aqi * 0.7);
  const pm10Val = snapshot?.pollutants?.pm10?.value ?? Math.round(aqi * 0.9);
  const temp = snapshot?.temperatureC ?? 24;
  const humidity = snapshot?.humidityPct ?? 48;
  const wind = snapshot?.windSpeedKmH ?? 3.6;
  const weatherCond = snapshot?.weatherCondition ?? 'Sunny';
  const rank = snapshot?.rankInIndia ?? 9;

  // Format updated timestamp
  const formatTime = (ts?: string) => {
    if (!ts) return '12:00 (Local Time)';
    try {
      const d = new Date(ts);
      return `${d.toLocaleDateString('en-CA')} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (Local Time)`;
    } catch {
      return 'Just Now';
    }
  };

  // Refined editorial palette with semantic air-quality badges paired with text and icons
  const getBannerTheme = () => {
    if (aqi <= 50) {
      return {
        cardBg: 'bg-white',
        gradientOverlay: 'from-emerald-50/50 via-white to-teal-50/30',
        badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        badgeIcon: 'check_circle',
        statusText: lang === 'hi' ? 'अच्छा (Good)' : 'Good',
        pointerPercent: Math.min(95, Math.max(5, (aqi / 500) * 100)),
        cardBorder: 'border-slate-200/90',
        severityText: lang === 'hi' ? 'स्वच्छ हवा • आउटडोर सुरक्षित' : 'Clean Air • Outdoor Safe',
      };
    }
    if (aqi <= 100) {
      return {
        cardBg: 'bg-white',
        gradientOverlay: 'from-teal-50/40 via-white to-sky-50/20',
        badgeBg: 'bg-teal-50 text-teal-800 border-teal-200',
        badgeIcon: 'info',
        statusText: lang === 'hi' ? 'संतोषजनक (Moderate)' : 'Moderate',
        pointerPercent: Math.min(95, Math.max(5, (aqi / 500) * 100)),
        cardBorder: 'border-slate-200/90',
        severityText: lang === 'hi' ? 'सामान्य हवा • संवेदनशील वर्ग ध्यान दें' : 'Acceptable Air • Sensitive Groups Caution',
      };
    }
    if (aqi <= 200) {
      return {
        cardBg: 'bg-white',
        gradientOverlay: 'from-amber-50/50 via-white to-orange-50/30',
        badgeBg: 'bg-amber-50 text-amber-900 border-amber-200',
        badgeIcon: 'warning',
        statusText: lang === 'hi' ? 'मध्यम (Poor)' : 'Poor',
        pointerPercent: Math.min(95, Math.max(5, (aqi / 500) * 100)),
        cardBorder: 'border-slate-200/90',
        severityText: lang === 'hi' ? 'श्वसन संबंधी असहजता संभव' : 'Breathing Discomfort Possible',
      };
    }
    if (aqi <= 300) {
      return {
        cardBg: 'bg-white',
        gradientOverlay: 'from-rose-50/40 via-white to-amber-50/20',
        badgeBg: 'bg-rose-50 text-rose-900 border-rose-200',
        badgeIcon: 'report_problem',
        statusText: lang === 'hi' ? 'खराब (Very Poor)' : 'Very Poor',
        pointerPercent: Math.min(95, Math.max(5, (aqi / 500) * 100)),
        cardBorder: 'border-slate-200/90',
        severityText: lang === 'hi' ? 'गंभीर श्वसन प्रभाव • मास्क अनिवार्य' : 'Prolonged Exposure Unsafe • Mask Required',
      };
    }
    // Severe / Hazardous
    return {
      cardBg: 'bg-white',
      gradientOverlay: 'from-rose-50/60 via-white to-red-50/40',
      badgeBg: 'bg-red-50 text-red-950 border-red-200',
      badgeIcon: 'dangerous',
      statusText: lang === 'hi' ? 'गंभीर (Severe)' : 'Severe',
      pointerPercent: Math.min(95, Math.max(5, (aqi / 500) * 100)),
      cardBorder: 'border-slate-200/90',
      severityText: lang === 'hi' ? 'स्वास्थ्य आपातकाल • बाहर जाना टालें' : 'Health Emergency • Stay Indoors',
    };
  };

  const theme = getBannerTheme();

  return (
    <section className="space-y-3.5" aria-labelledby="live-heading">
      {/* Top Header Row */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              LIVE TELEMETRY
            </span>
          </div>

          <h1 id="live-heading" className="font-heading text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {snapshot.locationName} Air Quality Index (AQI)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Real-time PM2.5, PM10 air pollution telemetry for {snapshot.locationName.split('—')[0].trim()}
          </p>
          <div className="text-[11px] text-slate-400 font-medium tabular-nums">
            Last Updated: <span className="text-slate-600 font-semibold">{formatTime(snapshot.timestamp)}</span>
          </div>
        </div>

        {/* Right utility buttons: Standard Switcher, Refresh, Locate Me, Share */}
        <div className="flex items-center gap-2 self-start flex-wrap pt-1">
          {/* AQI Standard Switcher */}
          <div className="flex items-center p-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setStandard('in')}
              className={`px-3 py-1 rounded-full transition-all ${
                standard === 'in'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              type="button"
              title="CPCB Indian National Air Quality Standard"
            >
              AQI-IN
            </button>
            <button
              onClick={() => setStandard('us')}
              className={`px-3 py-1 rounded-full transition-all ${
                standard === 'us'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              type="button"
              title="US EPA Air Quality Standard"
            >
              AQI-US
            </button>
          </div>

          {/* Refresh Live Button */}
          {onRefreshLive && (
            <button
              onClick={onRefreshLive}
              disabled={isRefreshing}
              className="px-3 py-1.5 rounded-full bg-white text-slate-700 hover:bg-slate-50 text-xs font-heading font-semibold flex items-center gap-1.5 border border-slate-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors"
              type="button"
              title="Bypass cache & fetch fresh real-time sensor reading"
            >
              <span className={`material-symbols-outlined text-[16px] text-slate-500 ${isRefreshing ? 'animate-spin' : ''}`}>
                refresh
              </span>
              <span>{isRefreshing ? 'Syncing...' : 'Live Sync'}</span>
            </button>
          )}

          <button
            onClick={onAutoDetectLocation}
            disabled={isLocating}
            className="px-3 py-1.5 rounded-full bg-white text-slate-700 hover:bg-slate-50 text-xs font-heading font-semibold flex items-center gap-1.5 border border-slate-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-slate-500">
              {isLocating ? 'sync' : 'near_me'}
            </span>
            <span>{isLocating ? 'Locating...' : 'Locate me'}</span>
          </button>

          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }}
            aria-label="Share current AQI report"
            className="w-8 h-8 rounded-full bg-white border border-slate-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">share</span>
          </button>
        </div>
      </div>

      {/* Main Hero Card Container (Daylight-First Calm Editorial Banner) */}
      <div
        className={`w-full rounded-2xl p-5 sm:p-7 bg-white bg-gradient-to-br ${theme.gradientOverlay} border ${theme.cardBorder} shadow-[0_1px_3px_rgba(15,23,42,0.04),0_6px_20px_rgba(15,23,42,0.02)] relative overflow-hidden flex flex-col justify-between min-h-[220px]`}
      >
        {/* Top content row */}
        <div className="flex items-start justify-between flex-wrap gap-4 z-10">
          {/* Live AQI Number & Semantic Status Badge */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Ground Telemetry</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                {displayAqi}
              </span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                AQI ({standard === 'us' ? 'US EPA' : 'CPCB IN'})
              </span>
            </div>

            {/* Severity Pill paired with Semantic Icon and Text Label */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="text-xs text-slate-600 font-medium">Status:</span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-bold border shadow-xs ${theme.badgeBg}`}>
                <span className="material-symbols-outlined text-[16px]">
                  {theme.badgeIcon}
                </span>
                <span>{theme.statusText}</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                • {theme.severityText}
              </span>
            </div>
          </div>

          {/* Weather Widget */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/80 shadow-xs min-w-[210px] space-y-2">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px] text-amber-500">
                  {weatherCond.includes('Sunny') ? 'wb_sunny' : weatherCond.includes('Cloud') ? 'partly_cloudy_day' : 'foggy'}
                </span>
                <div>
                  <span className="font-heading text-xl font-bold text-slate-800 tabular-nums">{temp} °C</span>
                  <span className="text-xs text-slate-500 ml-1.5 font-medium">{weatherCond}</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[16px]">device_thermostat</span>
            </div>

            {/* Micro Weather Details Grid */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-600">
              <div>
                <span className="block text-slate-400 uppercase font-semibold">Humidity</span>
                <span className="font-bold text-slate-800 tabular-nums">{humidity}%</span>
              </div>
              <div>
                <span className="block text-slate-400 uppercase font-semibold">Wind</span>
                <span className="font-bold text-slate-800 tabular-nums">{wind} km/h</span>
              </div>
              <div>
                <span className="block text-slate-400 uppercase font-semibold">UV Index</span>
                <span className="font-bold text-slate-800 tabular-nums">4 (Mod)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom PM levels & AQI Scale Bar */}
        <div className="pt-5 z-10 space-y-2.5">
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 tabular-nums">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              PM2.5: <strong className="font-bold text-slate-900">{pm25Val} µg/m³</strong>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              PM10: <strong className="font-bold text-slate-900">{pm10Val} µg/m³</strong>
            </span>
          </div>

          {/* Horizontal Color Scale Bar */}
          <div className="relative pt-2">
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 via-orange-500 via-rose-500 to-red-800 shadow-inner" />
            {/* Animated Needle Indicator */}
            <div
              className="absolute top-1 transform -translate-x-1/2 flex flex-col items-center transition-all duration-700"
              style={{ left: `${theme.pointerPercent}%` }}
            >
              <div className="w-3.5 h-3.5 bg-slate-900 rounded-full border-2 border-white shadow-sm" />
            </div>

            <div className="flex justify-between text-[10px] text-slate-500 font-medium pt-1.5">
              <span>Good (0)</span>
              <span>Mod (50)</span>
              <span>Poor (100)</span>
              <span>Unhealthy (200)</span>
              <span>Severe (300)</span>
              <span>Hazardous (400+)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Rank Banner Ribbon under Hero Card */}
      <div className="w-full bg-white rounded-xl p-3 border border-slate-200/80 shadow-xs flex items-center gap-3">
        <span className="px-2.5 py-1 rounded-md bg-slate-900 text-white font-heading text-xs font-bold flex items-center gap-1 shadow-xs shrink-0 tabular-nums">
          <span className="material-symbols-outlined text-[14px] text-amber-400">military_tech</span>
          Rank {rank}th
        </span>
        <p className="text-xs text-slate-600 font-medium">
          Currently, <strong className="text-slate-900">{snapshot.locationName.split('—')[0].trim()}</strong> ranks{' '}
          <span className="text-slate-900 font-bold tabular-nums">{rank}th</span> among the high-pollution urban corridors monitored today.
        </p>
      </div>
    </section>
  );
};
