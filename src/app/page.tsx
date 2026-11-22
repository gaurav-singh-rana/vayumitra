'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { LocationBar } from '@/components/LocationBar';
import { PersonaSwitcher } from '@/components/PersonaSwitcher';
import { AqiHeroCard } from '@/components/AqiHeroCard';
import { QuickDecisionGrid } from '@/components/QuickDecisionGrid';
import { InversionVisualizer } from '@/components/InversionVisualizer';
import { ParticleScaleVisualizer } from '@/components/ParticleScaleVisualizer';
import { TelemetryGrid } from '@/components/TelemetryGrid';
import { TodayRoutine } from '@/components/TodayRoutine';
import { IndoorHacks } from '@/components/IndoorHacks';
import { DirectImpact } from '@/components/DirectImpact';
import { AskVayuCopilot } from '@/components/AskVayuCopilot';
import { BottomNav, NavTab } from '@/components/BottomNav';
import { INDIAN_LOCATIONS } from '@/lib/indian-cities';
import { HOUSEHOLD_PERSONAS } from '@/lib/personas';
import { Language, TRANSLATIONS } from '@/lib/translations';
import { AirQualitySnapshot, HouseholdProfile, IndianLocation, PersonaType, RecommendationPlan } from '@/types';

export default function HomePage() {
  const [lang, setLang] = useState<Language>('hi');
  const [currentLocation, setCurrentLocation] = useState<IndianLocation>(INDIAN_LOCATIONS[0]);
  const [currentProfile, setCurrentProfile] = useState<HouseholdProfile>(HOUSEHOLD_PERSONAS.parents_young_children);
  const [activeTab, setActiveTab] = useState<NavTab>('today');
  
  const [snapshot, setSnapshot] = useState<AirQualitySnapshot | null>(null);
  const [plan, setPlan] = useState<RecommendationPlan | null>(null);

  const [isLoadingAQI, setIsLoadingAQI] = useState<boolean>(true);
  const [isLoadingPlan, setIsLoadingPlan] = useState<boolean>(true);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [aqiError, setAqiError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [copilotInitialQuestion, setCopilotInitialQuestion] = useState<string | undefined>(undefined);

  const t = TRANSLATIONS[lang];

  // Fetch AQI for current location
  const fetchAQI = useCallback(async (loc: IndianLocation) => {
    setIsLoadingAQI(true);
    setAqiError(null);

    try {
      const res = await fetch(`/api/aqi?locationId=${loc.id}&lat=${loc.latitude}&lon=${loc.longitude}&q=${encodeURIComponent(loc.name)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Live air quality data is currently unavailable');
      }

      setSnapshot(data);
      return data as AirQualitySnapshot;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to retrieve air telemetry';
      setAqiError(msg);
      return null;
    } finally {
      setIsLoadingAQI(false);
    }
  }, []);

  // Fetch Personalized Guidance
  const fetchGuidance = useCallback(async (prof: HouseholdProfile, snap: AirQualitySnapshot) => {
    setIsLoadingPlan(true);

    try {
      const res = await fetch('/api/guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personaId: prof.id,
          snapshot: snap,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate guidance plan');
      }

      setPlan(data);
    } catch {
      // Handled silently with local fallback
    } finally {
      setIsLoadingPlan(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      const snap = await fetchAQI(currentLocation);
      if (snap && isMounted) {
        await fetchGuidance(currentProfile, snap);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [currentLocation, fetchAQI, currentProfile, fetchGuidance]);

  // Handle location switch
  const handleSelectLocation = (loc: IndianLocation, presetPersona?: PersonaType) => {
    setCurrentLocation(loc);
    if (presetPersona && HOUSEHOLD_PERSONAS[presetPersona]) {
      setCurrentProfile(HOUSEHOLD_PERSONAS[presetPersona]);
    }
  };

  // Handle persona switch
  const handleSelectPersona = (pId: PersonaType) => {
    const prof = HOUSEHOLD_PERSONAS[pId];
    if (prof) {
      setCurrentProfile(prof);
      if (snapshot) {
        fetchGuidance(prof, snapshot);
      }
    }
  };

  // Browser Geolocation Auto-Detection with graceful fallback
  const handleAutoDetect = () => {
    if (!('geolocation' in navigator)) {
      setLocationError(lang === 'hi' ? 'आपके ब्राउज़र में GPS सपोर्ट नहीं है।' : 'Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        const customLoc: IndianLocation = {
          id: `gps-${latitude.toFixed(2)}-${longitude.toFixed(2)}`,
          name: lang === 'hi' ? `मेरी लोकेशन (${latitude.toFixed(2)}, ${longitude.toFixed(2)})` : `My GPS Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`,
          state: 'GPS',
          stationName: 'Nearest Local Sensor Hub',
          stationCode: 'GPS-01',
          latitude,
          longitude,
        };
        setCurrentLocation(customLoc);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError(
            lang === 'hi'
              ? 'लोकेशन की अनुमति नहीं मिली। कृपया नीचे से अपना शहर चुनें।'
              : 'Location access was denied. Choose a city manually from the presets.'
          );
        } else {
          setLocationError(
            lang === 'hi'
              ? 'लोकेशन नहीं मिली। कृपया अपना शहर खुद चुनें।'
              : 'Unable to detect location. Please select your city manually.'
          );
        }
      },
      { timeout: 8000 }
    );
  };

  const handleOpenCopilot = (question?: string) => {
    setCopilotInitialQuestion(question);
    setIsCopilotOpen(true);
  };

  return (
    <>
      <Header
        snapshot={snapshot}
        profile={currentProfile}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'hi' ? 'en' : 'hi'))}
        onOpenCopilot={() => handleOpenCopilot()}
      />

      <main className="flex-1 w-full max-w-4xl mx-auto pt-20 pb-28 px-4 sm:px-6">
        {/* Location & Station Status Bar */}
        <LocationBar
          currentLocation={currentLocation}
          snapshot={snapshot}
          lang={lang}
          onSelectLocation={handleSelectLocation}
          onAutoDetectLocation={handleAutoDetect}
          isLocating={isLocating}
          locationError={locationError}
        />

        {/* Active Persona Switcher Pills */}
        <div className="mt-2.5 mb-4">
          <PersonaSwitcher
            currentProfile={currentProfile}
            lang={lang}
            onSelectPersona={handleSelectPersona}
          />
        </div>

        {/* Honest Error State & Recovery Banner */}
        {aqiError && (
          <div
            className="mb-4 p-4 rounded-xl bg-error-container text-on-error-container border border-error/20 flex items-center justify-between flex-wrap gap-3"
            role="alert"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-error text-[24px]">cloud_off</span>
              <div>
                <p className="font-heading text-sm font-bold text-error">
                  {lang === 'hi' ? 'लाइव वायु डेटा अभी उपलब्ध नहीं है' : 'Live air quality data is currently unavailable'}
                </p>
                <p className="text-xs text-on-surface-variant">
                  {lang === 'hi'
                    ? 'हम कभी भी मनगढ़ंत AQI नंबर नहीं दिखाते। कृपया दोबारा प्रयास करें।'
                    : 'We never fabricate or guess AQI numbers. Please try again or switch station.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => fetchAQI(currentLocation)}
              className="px-4 py-2 rounded-lg bg-error text-white font-heading text-xs font-bold hover:bg-error/90 transition-colors"
              type="button"
            >
              {lang === 'hi' ? 'दोबारा लोड करें' : 'Retry Live Fetch'}
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {isLoadingAQI && !snapshot && (
          <div className="space-y-4 animate-pulse" aria-live="polite" aria-label="Loading live telemetry">
            <div className="w-full h-44 bg-surface-container-high rounded-2xl"></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-28 bg-surface-container-high rounded-xl"></div>
              <div className="h-28 bg-surface-container-high rounded-xl"></div>
            </div>
          </div>
        )}

        {/* Main Tab Content */}
        {snapshot && (
          <div className="space-y-4">
            {activeTab === 'today' && (
              <>
                <AqiHeroCard snapshot={snapshot} profile={currentProfile} lang={lang} />
                <QuickDecisionGrid
                  snapshot={snapshot}
                  profile={currentProfile}
                  lang={lang}
                  onOpenCopilot={handleOpenCopilot}
                />
                {/* Visualizer 1: Temperature Inversion Trap Animation */}
                <InversionVisualizer lang={lang} />
                {/* Visualizer 2: Microscopic PM2.5 vs Human Hair Scale Graphic */}
                <ParticleScaleVisualizer lang={lang} currentPm25={snapshot.pollutants.pm25.value} />
                <TelemetryGrid snapshot={snapshot} />
                {plan && (
                  <TodayRoutine
                    profile={currentProfile}
                    plan={plan}
                    onOpenCopilot={handleOpenCopilot}
                    onSwitchTab={(t) => setActiveTab(t)}
                  />
                )}
              </>
            )}

            {activeTab === 'decisions' && (
              <div className="space-y-4">
                <QuickDecisionGrid
                  snapshot={snapshot}
                  profile={currentProfile}
                  lang={lang}
                  onOpenCopilot={handleOpenCopilot}
                />
                <InversionVisualizer lang={lang} />
                <AqiHeroCard snapshot={snapshot} profile={currentProfile} lang={lang} />
              </div>
            )}

            {activeTab === 'indoor' && (
              <IndoorHacks snapshot={snapshot} profile={currentProfile} lang={lang} />
            )}

            {activeTab === 'impact' && plan && (
              <DirectImpact
                snapshot={snapshot}
                profile={currentProfile}
                plan={plan}
              />
            )}

            {/* Informational Non-Medical Disclaimer */}
            <div className="pt-4 text-center">
              <p className="text-[11px] text-on-surface-variant/70 leading-relaxed max-w-2xl mx-auto">
                <strong>{lang === 'hi' ? 'वायुमित्र सूचना:' : 'VayuMitra Notice:'}</strong> {t.disclaimer}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button for Ask Vayu Copilot */}
      <button
        onClick={() => handleOpenCopilot()}
        aria-label="Open Ask Vayu AI Copilot"
        className="fixed right-4 sm:right-8 bottom-20 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-tertiary to-primary text-white shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-secondary/40 group"
        type="button"
      >
        <span className="material-symbols-outlined text-[26px] group-hover:rotate-12 transition-transform">
          auto_awesome
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-secondary border-2 border-surface animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-secondary border-2 border-surface"></span>
      </button>

      {/* Grounded Copilot Drawer */}
      {snapshot && (
        <AskVayuCopilot
          isOpen={isCopilotOpen || activeTab === 'copilot'}
          onClose={() => {
            setIsCopilotOpen(false);
            if (activeTab === 'copilot') setActiveTab('today');
          }}
          snapshot={snapshot}
          profile={currentProfile}
          initialQuestion={copilotInitialQuestion}
        />
      )}

      {/* Sticky Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        lang={lang}
        onChangeTab={(tab) => {
          if (tab === 'copilot') {
            setIsCopilotOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
      />
    </>
  );
}
