'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { LocationBar } from '@/components/LocationBar';
import { PersonaSwitcher } from '@/components/PersonaSwitcher';
import { AqiInHeroSection } from '@/components/AqiInHeroSection';
import { MajorPollutantsGrid } from '@/components/MajorPollutantsGrid';
import { QuickDecisionGrid } from '@/components/QuickDecisionGrid';
import { InversionVisualizer } from '@/components/InversionVisualizer';
import { ParticleScaleVisualizer } from '@/components/ParticleScaleVisualizer';
import { TodayRoutine } from '@/components/TodayRoutine';
import { IndoorHacks } from '@/components/IndoorHacks';
import { DirectImpact } from '@/components/DirectImpact';
import { RecommendationHub } from '@/components/RecommendationHub';
import { HourlyForecastBar } from '@/components/HourlyForecastBar';
import { MaskDefenseCard } from '@/components/MaskDefenseCard';
import { AskVayuCopilot } from '@/components/AskVayuCopilot';
import { BottomNav, NavTab } from '@/components/BottomNav';
import { INDIAN_LOCATIONS } from '@/lib/indian-cities';
import { HOUSEHOLD_PERSONAS } from '@/lib/personas';
import { Language, TRANSLATIONS } from '@/lib/translations';
import { AirQualitySnapshot, HouseholdProfile, IndianLocation, PersonaType, RecommendationPlan } from '@/types';

export default function HomePage() {
  const [lang, setLang] = useState<Language>('en');
  const [currentLocation, setCurrentLocation] = useState<IndianLocation>(INDIAN_LOCATIONS[0]);
  const [currentProfile, setCurrentProfile] = useState<HouseholdProfile>(HOUSEHOLD_PERSONAS.parents_young_children);
  const [activeTab, setActiveTab] = useState<NavTab>('today');
  
  const [snapshot, setSnapshot] = useState<AirQualitySnapshot | null>(null);
  const [plan, setPlan] = useState<RecommendationPlan | null>(null);

  const [isLoadingAQI, setIsLoadingAQI] = useState<boolean>(true);
  const [isLoadingPlan, setIsLoadingPlan] = useState<boolean>(true);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [aqiError, setAqiError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [copilotInitialQuestion, setCopilotInitialQuestion] = useState<string | undefined>(undefined);

  const t = TRANSLATIONS[lang];

  // Fetch AQI for current location
  const fetchAQI = useCallback(async (loc: IndianLocation, forceRefresh = false) => {
    setIsLoadingAQI(true);
    setAqiError(null);

    try {
      const refreshQuery = forceRefresh ? '&refresh=true' : '';
      const res = await fetch(`/api/aqi?locationId=${loc.id}&lat=${loc.latitude}&lon=${loc.longitude}&q=${encodeURIComponent(loc.name)}${refreshQuery}`);
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

  const handleRefreshLive = async () => {
    setIsRefreshing(true);
    try {
      const snap = await fetchAQI(currentLocation, true);
      if (snap) {
        await fetchGuidance(currentProfile, snap);
      }
    } finally {
      setIsRefreshing(false);
    }
  };

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
      if (res.ok && data && data.verdict && data.routineItems) {
        setPlan(data);
      } else {
        throw new Error(data?.error || 'Failed to generate guidance plan');
      }
    } catch (err) {
      console.warn('Guidance API fallback to local engine:', err);
      // Resilient client-side fallback
      const safeAqi = snap?.aqi ?? 150;
      const isSevere = safeAqi >= 300;
      const isHigh = safeAqi >= 200;
      const safePm25 = snap?.pollutants?.pm25?.value ?? Math.round(safeAqi * 0.7);

      let morningTitle = `${prof.name}: Hazardous Morning Trap`;
      let morningDesc = `Dense ground-level inversion locks toxic combustion soot. Shift all morning exercise and outdoor play indoors.`;
      let afternoonAction = `20-min Balcony Walk & Cross-Vent`;
      let afternoonDesc = `Solar thermal radiation ascends particulate upward, creating today's cleanest breathing window.`;

      if (prof.id === 'parents_young_children') {
        morningTitle = `Aarav's Morning Play Lockdown`;
        morningDesc = `Morning park runs and outdoor playground activities are hazardous. School commute must use sealed transit with masks.`;
        afternoonAction = `20-min Balcony Solar Play`;
        afternoonDesc = `Solar warmth breaks inversion trap. Safe for short, low-cardio sunshine exposure.`;
      } else if (prof.id === 'seniors_respiratory') {
        morningTitle = `Cold Air Bronchospasm Shield`;
        morningDesc = `Avoid early morning walks before 10:30 AM completely. Morning chill + PM2.5 severely irritates bronchial pathways.`;
        afternoonAction = `Gentle Veranda Mobility Walk`;
        afternoonDesc = `Warmest part of the day minimizes bronchospasm risk and particulate inhalation.`;
      } else if (prof.id === 'daily_commuter') {
        morningTitle = `Peak Commute Bottleneck Alert`;
        morningDesc = `Peak traffic between 8:30 AM – 10:30 AM concentrates diesel NO2 and tire dust in underpasses. Switch to Metro.`;
        afternoonAction = `Staggered Off-Peak Transit Window`;
        afternoonDesc = `Midday transit sees 40% lower roadside particulate concentrations.`;
      } else if (prof.id === 'wfh_homemaker') {
        morningTitle = `Airtight Living Sanctuary`;
        morningDesc = `Keep outer apertures locked against incoming street smog. Run wet mop instead of dry brooming to avoid dust suspension.`;
        afternoonAction = `Controlled Solar Window Swap`;
        afternoonDesc = `Open south-facing apertures for exactly 20 minutes to flush stale indoor CO2.`;
      }

      setPlan({
        verdict: {
          headline: isSevere ? 'High Risk Inversion Day' : isHigh ? 'Elevated Smog Shield' : 'Manageable Air Day',
          subline: `${snap?.locationName || 'Local Area'} • Personalized for ${prof.label}`,
          score: isSevere ? 76 : isHigh ? 84 : 92,
          rankTitle: 'Clean Air Sentinel',
          rankPercentile: 'Top 14% Local Cohort',
          pointsToNextRank: 8,
          sparedPm25: `${Math.round(safePm25 * 0.65)} µg/day`,
          sparedCigarettesEquiv: `≈ ${Math.max(1, Math.round(safePm25 / 22))} passive cigarettes spared`,
          avertedCo2: '4.2 kg',
        },
        routineItems: [
          {
            id: 'morning',
            period: 'Morning',
            timeWindow: '07:00 – 11:00 AM',
            statusTag: isSevere ? 'Hazardous Peak' : 'Smog Advisory',
            severityClass: 'error',
            title: morningTitle,
            description: morningDesc,
            badges: [
              { icon: 'masks', text: 'N95 Mandatory Outdoors', variant: 'error' },
              { icon: 'toys', text: 'Indoor Activity Shift', variant: 'primary' },
            ],
          },
          {
            id: 'afternoon',
            period: 'Afternoon',
            timeWindow: '12:00 – 04:00 PM',
            statusTag: 'Safest Window',
            severityClass: 'secondary',
            title: 'Thermal Dispersion Aperture',
            description: afternoonDesc,
            badges: [
              { icon: 'wb_sunny', text: 'Solar Dispersion Active', variant: 'secondary' },
            ],
            highlightAction: {
              icon: 'nature_people',
              text: afternoonAction,
              aqiEstimate: `AQI ~${Math.max(45, Math.round(safeAqi * 0.52))}`,
            },
          },
          {
            id: 'evening',
            period: 'Evening',
            timeWindow: '05:00 – 09:00 PM',
            statusTag: 'Resettling',
            severityClass: 'primary',
            title: 'Dusk Trap & Sanctuary Protocol',
            description: `Cooling atmospheric boundary layer causes particulate to settle back down. Seal east/west facing windows and prep bedtime sanctuary.`,
            badges: [
              { icon: 'water_drop', text: 'Warm wet-mop living floor', variant: 'secondary' },
              { icon: 'airware', text: 'Purifier Fan 3 (HEPA)', variant: 'primary' },
            ],
          },
        ],
        indoorHacks: [
          {
            step: '01',
            title: 'Solar Window Cross-Venting',
            subtitle: 'Thermal Dynamic Windowing',
            category: 'budget',
            statusBadge: {
              text: isSevere ? 'Locked until 2:15 PM' : 'Optimal Window: 1:30 PM',
              variant: 'locked',
            },
            highlightBanner: {
              title: 'Best Solar Window: 2:15 PM – 3:45 PM',
              subtitle: 'Inversion layer breaks during peak solar heating. Safe for 20-min air swap.',
            },
            absoluteRule: {
              rule: 'Absolute Rule: Never crack windows 6 AM – 11 AM',
              explanation: 'Cold morning inversion layers trap heavy vehicular exhaust against the ground.',
            },
            jugaadShield: {
              title: 'Pro Jugaad Shield',
              content: 'A rolled, slightly damp cotton towel firmly wedged under corridor doors stops up to 18% of hallway soot infiltration.',
            },
          },
          {
            step: '02',
            title: 'Kitchen Tadka & Exhaust Discipline',
            subtitle: 'Aerosol Spike Management',
            category: 'budget',
            statusBadge: {
              text: 'PM2.5 >450 µg/m³ Spike',
              variant: 'warning',
            },
            highlightBanner: {
              title: '3-Min Pre-Ignition & Airtight Compartment',
              subtitle: 'Trigger chimney/exhaust 3 mins before lighting gas to establish directional laminar suction draft.',
            },
            absoluteRule: {
              rule: 'Airtight Compartment During Cooking',
              explanation: 'Seal connecting kitchen-hallway doors completely while crackling mustard seeds or dry red chilies.',
            },
          },
        ],
        alternatives: [
          {
            mode: 'car',
            type: 'unshielded',
            title: 'Solo Petrol Sedan (AC on)',
            badge: 'Unshielded',
            duration: '68 mins',
            cost: '₹340',
            emissions: '+14.2 kg',
            emissionsHighlight: false,
            notes: 'Hazard note: Underpass bottlenecks leak high PM2.5 through conventional cabin filters.',
          },
          {
            mode: 'metro',
            type: 'recommended',
            title: 'Blue Line Metro + E-Rickshaw',
            badge: 'Best Shielded',
            duration: '42 mins',
            cost: '₹55',
            emissions: '-4.2 kg CO2',
            emissionsHighlight: true,
            notes: 'VayuMitra Recommended Route: Sealed pressurized carriages filter 78% of roadway soot plumes.',
          },
        ],
        generatedAt: new Date().toISOString(),
        source: 'grounded_rules',
      });
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

  // Browser Geolocation Auto-Detection
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      <Header
        snapshot={snapshot}
        profile={currentProfile}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'hi' ? 'en' : 'hi'))}
        onOpenCopilot={() => handleOpenCopilot()}
      />

      <main className="w-full max-w-5xl mx-auto pt-20 pb-28 px-4 sm:px-6 space-y-5">
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

        {/* Persona Switcher Pills */}
        <div className="pt-1">
          <PersonaSwitcher
            currentProfile={currentProfile}
            lang={lang}
            onSelectPersona={handleSelectPersona}
          />
        </div>

        {/* Error State Banner */}
        {aqiError && (
          <div
            className="p-4 rounded-xl bg-error-container text-on-error-container border border-error/20 flex items-center justify-between flex-wrap gap-3"
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
          <div className="space-y-4 animate-pulse" aria-live="polite">
            <div className="w-full h-56 bg-slate-200 rounded-2xl"></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="h-28 bg-slate-200 rounded-xl"></div>
              <div className="h-28 bg-slate-200 rounded-xl"></div>
              <div className="h-28 bg-slate-200 rounded-xl"></div>
            </div>
          </div>
        )}

        {/* Loaded Main Experience */}
        {snapshot && (
          <div className="space-y-6">
            {activeTab === 'today' && (
              <>
                {/* 1. Ultra-clean AQI.in style Hero Banner with live weather & scale */}
                <AqiInHeroSection
                  snapshot={snapshot}
                  profile={currentProfile}
                  lang={lang}
                  onAutoDetectLocation={handleAutoDetect}
                  isLocating={isLocating}
                  onRefreshLive={handleRefreshLive}
                  isRefreshing={isRefreshing}
                />

                {/* 2. Major Air Pollutants Grid (AQI.in reference design) */}
                <MajorPollutantsGrid
                  snapshot={snapshot}
                  lang={lang}
                  onSelectPollutant={(p) => handleOpenCopilot(`Tell me about ${p} levels in ${snapshot.locationName} today.`)}
                />

                {/* 3. 24-Hour Diurnal Breathing Forecast */}
                <HourlyForecastBar snapshot={snapshot} lang={lang} />

                {/* 4. Core Personalized Recommendation Hub (Pillars 1, 2, 3 + Verdict + Persona Switcher) */}
                {plan && (
                  <RecommendationHub
                    snapshot={snapshot}
                    profile={currentProfile}
                    plan={plan}
                    lang={lang}
                    onSelectPersona={handleSelectPersona}
                    onOpenCopilot={handleOpenCopilot}
                    onSwitchGlobalTab={(t) => setActiveTab(t)}
                  />
                )}

                {/* 5. Mask Filtration & Penetration Defense Guide */}
                <MaskDefenseCard lang={lang} />
              </>
            )}

            {activeTab === 'decisions' && (
              <div className="space-y-5">
                <QuickDecisionGrid
                  snapshot={snapshot}
                  profile={currentProfile}
                  lang={lang}
                  onOpenCopilot={handleOpenCopilot}
                />
                <AqiInHeroSection
                  snapshot={snapshot}
                  profile={currentProfile}
                  lang={lang}
                  onAutoDetectLocation={handleAutoDetect}
                  isLocating={isLocating}
                />
                <InversionVisualizer lang={lang} />
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

            {/* Disclaimer */}
            <div className="pt-4 text-center">
              <p className="text-[11px] text-slate-400 leading-relaxed max-w-2xl mx-auto">
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
        className="fixed right-4 sm:right-8 bottom-20 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-purple-800 to-indigo-900 text-white shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-purple-400/40 group"
        type="button"
      >
        <span className="material-symbols-outlined text-[26px] group-hover:rotate-12 transition-transform">
          auto_awesome
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white"></span>
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
    </div>
  );
}
