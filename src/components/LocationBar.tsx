'use client';

import React, { useState, useEffect, useRef } from 'react';
import { IndianLocation, AirQualitySnapshot, PersonaType } from '@/types';
import { INDIAN_LOCATIONS } from '@/lib/indian-cities';
import { Language, TRANSLATIONS } from '@/lib/translations';

interface LocationBarProps {
  currentLocation: IndianLocation;
  snapshot: AirQualitySnapshot | null;
  lang: Language;
  onSelectLocation: (loc: IndianLocation, presetPersona?: PersonaType) => void;
  onAutoDetectLocation: () => void;
  isLocating: boolean;
  locationError: string | null;
}

export const LocationBar: React.FC<LocationBarProps> = ({
  currentLocation,
  snapshot,
  lang,
  onSelectLocation,
  onAutoDetectLocation,
  isLocating,
  locationError,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [matchingLocations, setMatchingLocations] = useState<IndianLocation[]>(INDIAN_LOCATIONS.slice(0, 10));
  const [isSearching, setIsSearching] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  // Debounced API search for all Indian cities
  useEffect(() => {
    if (!searchQuery.trim()) {
      setMatchingLocations(INDIAN_LOCATIONS.slice(0, 12));
      return;
    }

    setIsSearching(true);
    const handler = setTimeout(async () => {
      try {
        const res = await fetch(`/api/cities?q=${encodeURIComponent(searchQuery.trim())}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setMatchingLocations(data);
          }
        }
      } catch {
        // Fallback to local filter
        const filtered = INDIAN_LOCATIONS.filter(
          (l) =>
            l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.state.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setMatchingLocations(filtered);
      } finally {
        setIsSearching(false);
      }
    }, 280);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const formatTimestamp = (ts?: string) => {
    if (!ts) return lang === 'hi' ? 'लाइव अभी' : 'Live Just Now';
    try {
      const date = new Date(ts);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Live';
    }
  };

  return (
    <div className="flex flex-col space-y-2 mt-2">
      {/* Station Header Row */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-1.5 focus:outline-none min-h-[44px] text-left"
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label={`Current location: ${currentLocation.name}. Click to switch Indian city.`}
        >
          <span
            className="material-symbols-outlined text-primary text-[24px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            location_on
          </span>
          <span className="font-heading text-lg sm:text-xl text-primary font-bold tracking-tight group-hover:text-primary-container">
            {currentLocation.name}
          </span>
          <span className="material-symbols-outlined text-on-surface-variant text-[20px] group-hover:translate-y-0.5 transition-transform">
            expand_more
          </span>
        </button>

        {/* Live Station & Timestamp Provenance Pill */}
        <div
          className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-lowest rounded-full shadow-sm border border-surface-container"
          aria-live="polite"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
          </span>
          <span className="font-heading text-xs text-on-surface-variant font-medium">
            {snapshot ? `${snapshot.stationCode} • ${formatTimestamp(snapshot.timestamp)}` : 'Connecting...'}
          </span>
        </div>
      </div>

      {locationError && (
        <div className="text-xs text-error bg-error-container/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px]">info</span>
          <span>{locationError}</span>
        </div>
      )}

      {/* City Switcher Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={t.switchCity}
        >
          <div
            ref={modalRef}
            className="bg-surface-container-lowest w-full max-w-xl rounded-2xl shadow-2xl p-5 border border-surface-container flex flex-col max-h-[85vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div>
                <h2 className="font-heading text-lg font-bold text-primary">
                  {lang === 'hi' ? 'भारत का कोई भी शहर या स्टेशन चुनें' : 'Select Any Indian City or Station'}
                </h2>
                <p className="text-xs text-on-surface-variant">
                  {lang === 'hi'
                    ? 'सभी राज्यों, जिलों व कस्बों का रीयल-टाइम CPCB वायु गुणवत्ता डेटा'
                    : 'Real-time live CPCB telemetry across all Indian states & districts'}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors"
                aria-label="Close dialog"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Geolocation Auto-Detect Button */}
            <div className="pt-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onAutoDetectLocation();
                }}
                disabled={isLocating}
                className="w-full py-2.5 px-3 rounded-xl bg-secondary-container/40 hover:bg-secondary-container/70 text-on-secondary-container font-heading text-xs font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isLocating ? 'sync' : 'my_location'}
                </span>
                <span>{isLocating ? 'पहचान रहे हैं...' : t.detectGps}</span>
              </button>
            </div>

            {/* Search Input for All Indian Cities */}
            <div className="relative pt-3">
              <span className="material-symbols-outlined absolute left-3 top-6 text-on-surface-variant text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchCityPlaceholder}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-secondary"
                aria-label="Search any Indian city"
                autoFocus
              />
              {isSearching && (
                <span className="material-symbols-outlined absolute right-3 top-6 text-secondary text-[20px] animate-spin">
                  progress_activity
                </span>
              )}
            </div>

            {/* Featured Presets */}
            <div className="pt-3">
              <span className="font-heading text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
                {t.quickPresets}
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {INDIAN_LOCATIONS.filter((loc) => loc.isPreset).map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      onSelectLocation(preset, preset.presetPersona);
                      setIsOpen(false);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors flex items-center gap-1 ${
                      currentLocation.id === preset.id
                        ? 'bg-primary text-on-primary border-primary'
                        : 'bg-surface-container text-on-surface border-surface-container-high hover:bg-surface-container-high'
                    }`}
                    type="button"
                  >
                    <span>{preset.name.split('—')[0].trim()}</span>
                    <span className="text-[10px] opacity-75">({preset.stationCode})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Matching City List */}
            <div className="overflow-y-auto no-scrollbar space-y-1.5 pt-3 flex-1 min-h-[180px]">
              {matchingLocations.length === 0 ? (
                <div className="text-center py-8 text-on-surface-variant text-sm">
                  {lang === 'hi'
                    ? `"${searchQuery}" के लिए कोई लोकेशन नहीं मिली। वर्तनी जांचें।`
                    : `No matching Indian location found for "${searchQuery}". Check spelling.`}
                </div>
              ) : (
                matchingLocations.map((loc) => {
                  const isSelected = currentLocation.id === loc.id;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => {
                        onSelectLocation(loc, loc.presetPersona);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-secondary-container/30 border border-secondary text-primary font-bold'
                          : 'hover:bg-surface-container-low border border-transparent'
                      }`}
                      type="button"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{loc.name}</span>
                        <span className="text-xs text-on-surface-variant">
                          {loc.state} • {loc.stationName}
                        </span>
                      </div>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                        {loc.stationCode}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
