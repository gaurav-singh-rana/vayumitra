'use client';

import React from 'react';
import { AirQualitySnapshot, HouseholdProfile } from '@/types';
import { Language } from '@/lib/translations';

interface AqiHeroCardProps {
  snapshot: AirQualitySnapshot;
  profile: HouseholdProfile;
  lang: Language;
}

export const AqiHeroCard: React.FC<AqiHeroCardProps> = ({ snapshot, profile, lang }) => {
  const aqi = snapshot.aqi;

  const percentage = Math.min(100, Math.max(5, (aqi / 500) * 100));
  const dashOffset = 251.2 - (251.2 * percentage) / 100;

  const getSeverityInfo = () => {
    if (aqi <= 100) {
      return {
        bg: 'bg-emerald-100 text-emerald-800',
        dot: 'bg-emerald-600',
        tier: lang === 'hi' ? 'सुरक्षित • सामान्य हवा' : 'TIER 1 GOOD',
        verdictText: lang === 'hi' ? 'हवा साफ है, बाहर घूमना और खेलना सुरक्षित है।' : 'Air is clean, outdoor movement is safe.',
        color: '#10b981',
      };
    }
    if (aqi <= 200) {
      return {
        bg: 'bg-amber-100 text-amber-800',
        dot: 'bg-amber-600',
        tier: lang === 'hi' ? 'मध्यम • हल्की सतर्कता' : 'TIER 3 MODERATE',
        verdictText: lang === 'hi' ? 'संवेदनशील लोग ज्यादा देर भारी कसरत से बचें।' : 'Sensitive individuals should limit strenuous outdoor activity.',
        color: '#f59e0b',
      };
    }
    if (aqi <= 300) {
      return {
        bg: 'bg-orange-100 text-orange-800',
        dot: 'bg-orange-600',
        tier: lang === 'hi' ? 'खराब • सांस में भारीपन' : 'TIER 4 POOR',
        verdictText: lang === 'hi' ? 'सुबह-शाम बाहर न दौड़ें। दोपहर में ही बाहर निकलें।' : 'Avoid morning & evening outdoor cardio. Midday is safest.',
        color: '#f97316',
      };
    }
    return {
      bg: 'bg-error-container text-on-error-container',
      dot: 'bg-error',
      tier: lang === 'hi' ? 'गंभीर स्मॉग • आपात स्थिति' : 'CAT. 5 SEVERE SMOG',
      verdictText: lang === 'hi' ? 'जहरीली हवा जमीन के पास फंसी है। बच्चे और बुजुर्ग घर के अंदर रहें।' : 'Toxic soot trapped near ground. Vulnerable members stay indoors.',
      color: '#ba1a1a',
    };
  };

  const info = getSeverityInfo();

  return (
    <section
      className="w-full bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden relative"
      aria-labelledby="aqi-heading"
    >
      <div className="p-4 sm:p-6 flex flex-col space-y-4">
        {/* Top Row: Severity Tag & Live Sensor ID */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-heading text-xs font-bold ${info.bg}`}
          >
            <span className={`w-2 h-2 rounded-full ${info.dot} animate-pulse`}></span>
            <span id="aqi-heading">
              {lang === 'hi' ? snapshot.hindiSeverity : `${snapshot.severity.toUpperCase()} • ${snapshot.hindiSeverity}`}
            </span>
          </span>
          <span className="font-heading text-xs text-outline font-semibold uppercase tracking-wider">
            {info.tier}
          </span>
        </div>

        {/* Main Metric and Radial Display */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col min-w-0">
            <span className="font-heading text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              {lang === 'hi' ? 'राष्ट्रीय वायु गुणवत्ता सूचकांक (NAQI)' : 'National AQI Index (NAQI)'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-4xl sm:text-5xl text-primary font-bold tracking-tight">
                {aqi}
              </span>
              <span className="font-heading text-xs text-error font-semibold flex items-center">
                ▲ {snapshot.dominantPollutant} {lang === 'hi' ? 'अधिकतम' : 'Dominant'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed font-medium">
              {info.verdictText}
            </p>
          </div>

          {/* Radial Circular Progress Gauge */}
          <div
            className="relative flex-shrink-0 w-24 h-24 flex items-center justify-center"
            aria-hidden="true"
          >
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-surface-container"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeWidth="9"
              />
              <circle
                className="transition-all duration-1000 ease-out"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke={info.color}
                strokeDasharray="251.2"
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                strokeWidth="9"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ color: info.color, fontVariationSettings: "'FILL' 1" }}
              >
                {aqi > 300 ? 'warning' : aqi > 200 ? 'error' : 'eco'}
              </span>
              <span className="font-heading text-xs font-bold" style={{ color: info.color }}>
                {aqi > 300 ? 'Severe' : aqi > 200 ? 'Poor' : 'Normal'}
              </span>
            </div>
          </div>
        </div>

        {/* Atmospheric Inversion Alert Banner */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container-high text-on-surface flex items-start gap-3 border border-surface-container-highest">
          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex-shrink-0 flex items-center justify-center mt-0.5">
            <span className="material-symbols-outlined text-[18px]">wb_twilight</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-heading text-xs sm:text-sm font-bold text-primary">
                {lang === 'hi' ? 'ज़मीनी स्मॉग इनवर्जन ट्रैप (सुबह 11:30 तक)' : `Ground Inversion Risk: ${snapshot.inversionRisk}`}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-heading text-[10px] font-semibold">
                {lang === 'hi' ? 'दोपहर तक बंद' : 'Locked till 11:30 AM'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
              {lang === 'hi'
                ? `रात की ठंडी हवा जहरीले धुएं को जमीन पर दबा देती है। ${profile.name} के लिए सबसे सुरक्षित सांस की खिड़की दोपहर 12:30 से 3:45 बजे खुलेगी।`
                : `Cool night air locks heavy vehicular PM2.5 near breathing level. ${profile.name}'s safe outdoor window opens at 12:30 PM – 3:45 PM.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
