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

  // AQI Severity styling matching the soft pastel gradient in the reference image
  const getBannerTheme = () => {
    if (aqi <= 50) {
      return {
        gradient: 'from-[#dcfce7] via-[#f0fdf4] to-[#bbf7d0]',
        badgeBg: 'bg-emerald-600 text-white',
        statusText: lang === 'hi' ? 'अच्छा' : 'Good',
        pointerPercent: Math.min(95, Math.max(5, (aqi / 500) * 100)),
        cardBorder: 'border-emerald-200',
      };
    }
    if (aqi <= 100) {
      return {
        gradient: 'from-[#fef9c3] via-[#fefce8] to-[#fde047]',
        badgeBg: 'bg-lime-600 text-white',
        statusText: lang === 'hi' ? 'संतोषजनक' : 'Moderate',
        pointerPercent: Math.min(95, Math.max(5, (aqi / 500) * 100)),
        cardBorder: 'border-lime-200',
      };
    }
    if (aqi <= 200) {
      return {
        gradient: 'from-[#fed7aa] via-[#fff7ed] to-[#fdba74]',
        badgeBg: 'bg-amber-600 text-white',
        statusText: lang === 'hi' ? 'मध्यम' : 'Poor',
        pointerPercent: Math.min(95, Math.max(5, (aqi / 500) * 100)),
        cardBorder: 'border-amber-200',
      };
    }
    if (aqi <= 300) {
      return {
        gradient: 'from-[#f5d0fe] via-[#fae8ff] to-[#e879f9]/30',
        badgeBg: 'bg-purple-600 text-white',
        statusText: lang === 'hi' ? 'खराब' : 'Unhealthy',
        pointerPercent: Math.min(95, Math.max(5, (aqi / 500) * 100)),
        cardBorder: 'border-purple-200',
      };
    }
    // Severe / Hazardous (Exact match to uploaded image purple/magenta banner)
    return {
      gradient: 'from-[#edd8f9] via-[#f9e0f1] to-[#e2c1f7]',
      badgeBg: 'bg-[#9333ea] text-white',
      statusText: lang === 'hi' ? 'गंभीर' : 'Severe',
      pointerPercent: Math.min(95, Math.max(5, (aqi / 500) * 100)),
      cardBorder: 'border-purple-200',
    };
  };

  const theme = getBannerTheme();

  return (
    <section className="space-y-3" aria-labelledby="live-heading">
      {/* Top Header Row matching AQI.in */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 text-[11px] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              LIVE
            </span>
          </div>

          <h1 id="live-heading" className="font-heading text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {snapshot.locationName} Air Quality Index (AQI) | Air Pollution
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Real-time PM2.5, PM10 air pollution level in {snapshot.locationName.split('—')[0].trim()}
          </p>
          <div className="text-[11px] text-slate-400 font-medium">
            Last Updated: <span className="text-slate-600 font-semibold">{formatTime(snapshot.timestamp)}</span>
          </div>
        </div>

        {/* Right utility buttons: Standard Switcher, Refresh, Locate Me, Share */}
        <div className="flex items-center gap-2 self-start flex-wrap pt-1">
          {/* AQI Standard Switcher like aqi.in */}
          <div className="flex items-center p-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setStandard('in')}
              className={`px-2.5 py-1 rounded-full transition-all ${
                standard === 'in'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              type="button"
              title="CPCB Indian National Air Quality Standard"
            >
              AQI-IN
            </button>
            <button
              onClick={() => setStandard('us')}
              className={`px-2.5 py-1 rounded-full transition-all ${
                standard === 'us'
                  ? 'bg-sky-600 text-white shadow-xs'
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
              className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-heading font-semibold flex items-center gap-1.5 border border-slate-200 transition-colors"
              type="button"
              title="Bypass cache & fetch fresh real-time sensor reading"
            >
              <span className={`material-symbols-outlined text-[16px] text-slate-600 ${isRefreshing ? 'animate-spin' : ''}`}>
                refresh
              </span>
              <span>{isRefreshing ? 'Syncing...' : 'Live Sync'}</span>
            </button>
          )}

          <button
            onClick={onAutoDetectLocation}
            disabled={isLocating}
            className="px-3 py-1.5 rounded-full bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-heading font-semibold flex items-center gap-1.5 border border-sky-200 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-sky-600">
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
            className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">share</span>
          </button>
        </div>
      </div>

      {/* Main Hero Card Container (Full-Width Atmospheric Gradient Banner) */}
      <div
        className={`w-full rounded-2xl p-5 sm:p-7 bg-gradient-to-r ${theme.gradient} border ${theme.cardBorder} shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[220px]`}
      >
        {/* Subtle Skyline / Monuments Silhouettes Background */}
        <div className="absolute bottom-0 right-0 left-0 h-16 opacity-15 pointer-events-none bg-repeat-x bg-bottom" style={{
          backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"60\" fill=\"black\"><path d=\"M10 60 L10 40 L25 40 L25 30 L35 20 L45 30 L45 40 L60 40 L60 60 Z M80 60 L80 25 L100 25 L100 60 Z M120 60 L120 35 L140 15 L160 35 L160 60 Z\"/></svg>')",
        }} />

        {/* Top content row */}
        <div className="flex items-start justify-between flex-wrap gap-4 z-10">
          {/* Live AQI Number & Badge */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>Live AQI</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
                {displayAqi}
              </span>
              <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">
                AQI ({standard === 'us' ? 'US' : 'IN'})
              </span>
            </div>

            {/* Severity Pill */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-slate-700 font-medium">Air Quality is</span>
              <span className={`px-3 py-1 rounded-md text-xs font-heading font-extrabold shadow-xs ${theme.badgeBg}`}>
                {theme.statusText}
              </span>
            </div>
          </div>

          {/* Weather Glassmorphic Floating Widget */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3.5 border border-white/60 shadow-sm min-w-[210px] space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {weatherCond.includes('Sunny') ? '☀️' : weatherCond.includes('Cloud') ? '⛅' : '🌫️'}
                </span>
                <div>
                  <span className="font-heading text-xl font-bold text-slate-800">{temp} °C</span>
                  <span className="text-xs text-slate-500 ml-1.5 font-medium">{weatherCond}</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">north_east</span>
            </div>

            {/* Micro Weather Details Grid */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-600">
              <div>
                <span className="block text-slate-400 uppercase">Humidity</span>
                <span className="font-bold text-slate-800">{humidity}%</span>
              </div>
              <div>
                <span className="block text-slate-400 uppercase">Wind</span>
                <span className="font-bold text-slate-800">{wind} km/h</span>
              </div>
              <div>
                <span className="block text-slate-400 uppercase">UV Index</span>
                <span className="font-bold text-slate-800">4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom PM levels & AQI Scale Bar */}
        <div className="pt-4 z-10 space-y-2">
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-800">
            <span>
              PM2.5: <strong className="font-bold text-slate-900">{pm25Val} µg/m³</strong>
            </span>
            <span className="text-slate-400">•</span>
            <span>
              PM10: <strong className="font-bold text-slate-900">{pm10Val} µg/m³</strong>
            </span>
          </div>

          {/* Horizontal Color Scale Bar */}
          <div className="relative pt-2">
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 via-orange-500 via-purple-600 to-red-700 shadow-inner" />
            {/* Animated Needle Indicator */}
            <div
              className="absolute top-1 transform -translate-x-1/2 flex flex-col items-center transition-all duration-700"
              style={{ left: `${theme.pointerPercent}%` }}
            >
              <div className="w-3.5 h-3.5 bg-slate-900 rounded-full border-2 border-white shadow-md animate-bounce" />
            </div>

            <div className="flex justify-between text-[10px] text-slate-600 font-medium pt-1.5">
              <span>Good (0)</span>
              <span>Moderate (50)</span>
              <span>Poor (100)</span>
              <span>Unhealthy (200)</span>
              <span>Severe (300)</span>
              <span>Hazardous (400+)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Rank Banner Ribbon under Hero Card */}
      <div className="w-full bg-white rounded-xl p-3 border border-slate-200 shadow-xs flex items-center gap-3">
        <span className="px-2.5 py-1 rounded-md bg-red-600 text-white font-heading text-xs font-bold flex items-center gap-1 shadow-xs shrink-0">
          Rank {rank}th
        </span>
        <p className="text-xs text-slate-700 font-medium">
          Currently, <strong className="text-slate-900">{snapshot.locationName.split('—')[0].trim()}</strong> ranks{' '}
          <span className="text-red-600 font-bold">{rank}th</span> among the high-pollution urban corridors monitored today.
        </p>
      </div>
    </section>
  );
};
