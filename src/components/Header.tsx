'use client';

import React, { useState } from 'react';
import { AirQualitySnapshot, HouseholdProfile } from '@/types';

interface HeaderProps {
  snapshot: AirQualitySnapshot | null;
  profile: HouseholdProfile;
  onOpenCopilot: () => void;
}

export const Header: React.FC<HeaderProps> = ({ snapshot, profile, onOpenCopilot }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeakReport = () => {
    if (!snapshot) return;

    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      const text = `Namaste! VayuMitra live report for ${snapshot.locationName}. Current AQI is ${snapshot.aqi}, categorized as ${snapshot.severity}. Fine particulate PM2.5 is ${snapshot.pollutants.pm25.value} micrograms per cubic meter. Recommended safe outdoor window is afternoon 12 to 4 PM. Stay shielded!`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert(`VayuMitra Live Report: AQI ${snapshot.aqi} (${snapshot.severity}) at ${snapshot.locationName}`);
    }
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(15,76,92,0.04)] pt-safe">
      <div className="max-w-4xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
        {/* Brand & Live Source Provenance */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span className="font-heading text-xl sm:text-2xl text-primary font-bold tracking-tight">
              VayuMitra
            </span>
            <span className="font-heading text-sm sm:text-base text-secondary font-semibold">
              (वायुमित्र)
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="font-heading text-xs text-on-surface-variant font-medium tracking-wide">
              {snapshot ? snapshot.sourceName : 'CPCB Real-Time'}
            </span>
          </div>
        </div>

        {/* Action Controls: Voice 'Suno' & Persona Quick Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleSpeakReport}
            aria-label={isPlaying ? 'Stop audio report' : 'Listen to air report in Hindi/English'}
            className={`min-w-[44px] min-h-[44px] px-3 rounded-full flex items-center justify-center gap-1.5 transition-all focus:outline-none focus-visible:ring-2 ${
              isPlaying
                ? 'bg-secondary text-on-secondary shadow-md animate-pulse'
                : 'bg-secondary-container/40 text-on-secondary-container hover:bg-secondary-container/70'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isPlaying ? 'volume_off' : 'volume_up'}
            </span>
            <span className="font-heading text-xs font-bold hidden sm:inline">
              {isPlaying ? 'Suno (Playing)' : 'Suno'}
            </span>
          </button>

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
