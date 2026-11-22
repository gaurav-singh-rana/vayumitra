'use client';

import React, { useState } from 'react';
import { AirQualitySnapshot, HouseholdProfile } from '@/types';
import { Language, TRANSLATIONS } from '@/lib/translations';

interface HeaderProps {
  snapshot: AirQualitySnapshot | null;
  profile: HouseholdProfile;
  lang: Language;
  onToggleLang: () => void;
  onOpenCopilot: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  snapshot,
  profile,
  lang,
  onToggleLang,
  onOpenCopilot,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleSpeakReport = () => {
    if (!snapshot) return;

    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      const pm25Val = snapshot?.pollutants?.pm25?.value ?? Math.round(snapshot.aqi * 0.7);
      const text =
        lang === 'hi'
          ? `नमस्ते! वायुमित्र लाइव रिपोर्ट। ${snapshot.locationName} में वर्तमान AQI ${snapshot.aqi} है। यह श्रेणी ${snapshot.hindiSeverity} है। बारीक धूल कण PM2.5 का स्तर ${pm25Val} माइक्रोग्राम है। आज दोपहर 12 से 4 बजे का समय बाहर निकलने के लिए सबसे सुरक्षित है। सुबह और शाम खिड़कियां बंद रखें। सुरक्षित रहें!`
          : `Namaste! VayuMitra live report for ${snapshot.locationName}. Current AQI is ${snapshot.aqi}, categorized as ${snapshot.severity}. Fine particulate PM2.5 is ${pm25Val} micrograms per cubic meter. Recommended safe outdoor window is afternoon 12 to 4 PM. Stay shielded!`;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert(`VayuMitra: AQI ${snapshot.aqi} at ${snapshot.locationName}`);
    }
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(15,76,92,0.05)] pt-safe border-b border-surface-container">
      <div className="max-w-4xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
        {/* Brand & Live Source Provenance */}
        <div className="flex items-center gap-2.5">
          {/* Logo Mark Icon */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 via-teal-500 to-emerald-500 p-0.5 shadow-md flex items-center justify-center flex-shrink-0">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6" />
                <path d="M8 14 C12 9, 22 9, 25 13 C 27 16, 26 21, 22 23 C 18 25, 12 24, 11 20 C 10 17, 13 14, 16 14 C 19 14, 21 16, 20 18" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="16" cy="16" r="2.5" fill="#ffffff" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 leading-none">
              <span className="font-heading font-black text-2xl tracking-tighter bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                AQI
              </span>
              <span className="font-heading font-extrabold text-base sm:text-lg text-slate-800 tracking-tight ml-0.5">
                VayuMitra
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 font-bold ml-1 uppercase">
                .IN
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] text-slate-500 font-semibold tracking-wide truncate max-w-[160px] sm:max-w-none">
                {snapshot ? snapshot.sourceName : t.liveBadge}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls: Language Switcher, Voice 'Suno' & Persona Quick Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher Button */}
          <button
            onClick={onToggleLang}
            className="px-2.5 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-primary font-heading text-xs font-bold transition-all border border-surface-container flex items-center gap-1 min-h-[36px]"
            type="button"
            aria-label="Toggle language between English and Hindi"
            title="Switch Language / भाषा बदलें"
          >
            <span className="material-symbols-outlined text-[16px]">translate</span>
            <span>{lang === 'hi' ? 'EN' : 'हिं'}</span>
          </button>

          {/* Voice Narration Button */}
          <button
            onClick={handleSpeakReport}
            aria-label={isPlaying ? 'Stop audio report' : t.sunoBtn}
            className={`min-w-[44px] min-h-[40px] px-3 rounded-full flex items-center justify-center gap-1.5 transition-all focus:outline-none focus-visible:ring-2 ${
              isPlaying
                ? 'bg-secondary text-on-secondary shadow-md animate-pulse'
                : 'bg-secondary-container/40 text-on-secondary-container hover:bg-secondary-container/70'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isPlaying ? 'volume_off' : 'volume_up'}
            </span>
            <span className="font-heading text-xs font-bold hidden sm:inline">
              {isPlaying ? t.sunoPlaying : t.sunoBtn}
            </span>
          </button>

          {/* Persona Icon Button */}
          <button
            onClick={onOpenCopilot}
            aria-label={`Open Ask VayuMitra for ${profile.name}`}
            className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm hover:bg-primary-container transition-transform active:scale-95 focus:outline-none"
            type="button"
            title={profile.name}
          >
            <span className="material-symbols-outlined text-[20px]">{profile.icon}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
