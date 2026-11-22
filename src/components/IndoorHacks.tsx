'use client';

import React, { useState } from 'react';
import { AirQualitySnapshot, HouseholdProfile } from '@/types';

interface IndoorHacksProps {
  snapshot: AirQualitySnapshot;
  profile: HouseholdProfile;
}

export const IndoorHacks: React.FC<IndoorHacksProps> = ({ snapshot }) => {
  const [activeMode, setActiveMode] = useState<'budget' | 'purifier'>('budget');

  const outdoorAqi = snapshot.aqi;
  const indoorAqi = Math.max(35, Math.round(outdoorAqi * 0.37));
  const shieldedPct = Math.round(((outdoorAqi - indoorAqi) / outdoorAqi) * 100);

  return (
    <div className="space-y-4">
      {/* Microclimate Delta Banner Card */}
      <section className="w-full bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-sm border border-surface-container">
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-secondary">location_on</span>
            <span className="font-heading text-sm sm:text-base text-primary font-bold tracking-tight">
              {snapshot.locationName}
            </span>
          </div>
          <span className="font-heading text-xs px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-medium">
            {snapshot.stationCode}
          </span>
        </div>

        {/* Comparative Split Telemetry */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          {/* Outdoor Smog Card */}
          <div className="bg-error-container/30 rounded-xl p-3 flex flex-col justify-between border border-error/10">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs text-error font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">cloud_off</span>
                Outdoor
              </span>
              <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
            </div>
            <div className="mt-2">
              <div className="font-heading text-3xl sm:text-4xl text-error font-bold tracking-tight">
                {outdoorAqi}
              </div>
              <div className="font-heading text-xs text-on-surface-variant font-medium mt-0.5">
                AQI • {snapshot.severity}
              </div>
              <p className="text-[11px] leading-tight text-on-surface-variant/80 mt-1">
                Inversion layer trapped soot
              </p>
            </div>
          </div>

          {/* Living Room Microclimate Card */}
          <div className="bg-secondary-container/30 rounded-xl p-3 flex flex-col justify-between border border-secondary/20">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs text-on-secondary-container font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">home_pin</span>
                Living Room
              </span>
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
            </div>
            <div className="mt-2">
              <div className="font-heading text-3xl sm:text-4xl text-secondary font-bold tracking-tight">
                {indoorAqi}
              </div>
              <div className="font-heading text-xs text-secondary font-semibold mt-0.5">
                AQI • Shield Active
              </div>
              <p className="text-[11px] leading-tight text-on-surface-variant/80 mt-1">
                Purified microclimate buffer
              </p>
            </div>
          </div>
        </div>

        {/* Microclimate Efficiency Status Strip */}
        <div className="mt-3 bg-surface-container-low rounded-xl p-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
            <span className="font-heading text-xs sm:text-sm text-on-surface font-semibold">
              Shielding {shieldedPct}% toxic load
            </span>
          </div>
          <span className="font-heading text-xs text-secondary bg-surface-container-lowest px-2.5 py-0.5 rounded-full font-bold shadow-xs">
            Target: &lt;60 AQI
          </span>
        </div>
      </section>

      {/* Segmented Mode Switcher */}
      <section className="w-full">
        <div
          className="bg-surface-container-high p-1 rounded-xl flex items-center gap-1"
          role="tablist"
          aria-label="Indoor Action Mode"
        >
          <button
            role="tab"
            aria-selected={activeMode === 'budget'}
            onClick={() => setActiveMode('budget')}
            className={`flex-1 min-h-[44px] rounded-lg flex items-center justify-center gap-1.5 transition-all font-heading text-xs sm:text-sm font-semibold ${
              activeMode === 'budget'
                ? 'bg-surface-container-lowest shadow-sm text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
          >
            <span>🌿</span>
            <span>Budget Hacks (₹0)</span>
          </button>
          <button
            role="tab"
            aria-selected={activeMode === 'purifier'}
            onClick={() => setActiveMode('purifier')}
            className={`flex-1 min-h-[44px] rounded-lg flex items-center justify-center gap-1.5 transition-all font-heading text-xs sm:text-sm font-semibold ${
              activeMode === 'purifier'
                ? 'bg-surface-container-lowest shadow-sm text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
          >
            <span>⚡</span>
            <span>Purifier Smart Mode</span>
          </button>
        </div>

        {/* Impact Teaser Banner */}
        <div className="mt-3 bg-tertiary-fixed/30 rounded-xl p-3 flex items-start gap-2.5 shadow-sm border border-secondary/15">
          <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">insights</span>
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-on-surface font-medium leading-relaxed">
              Applying these <span className="font-semibold text-secondary">3 zero-cost hacks</span>{' '}
              drops living room PM2.5 by{' '}
              <span className="font-semibold text-secondary">~58% today</span> without extra
              electricity expense.
            </p>
          </div>
        </div>
      </section>

      {/* Protocol Content */}
      {activeMode === 'budget' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-base sm:text-lg text-primary font-bold">
                Today&apos;s Defense Protocol
              </span>
              <span className="font-heading text-xs sm:text-sm text-secondary font-semibold">
                (प्रोटोकॉल)
              </span>
            </div>
            <span className="font-heading text-xs text-on-surface-variant font-medium">
              Step 1 &amp; 2 Active
            </span>
          </div>

          {/* Action Protocol Step 01: Thermal Venting */}
          <article className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-sm border border-surface-container flex flex-col gap-3">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-heading text-xs font-bold">
                  01
                </span>
                <div>
                  <h3 className="font-heading text-sm sm:text-base text-primary leading-tight font-bold">
                    Solar Window Cross-Venting
                  </h3>
                  <span className="text-xs text-on-surface-variant font-medium">
                    Thermal Dynamic Windowing
                  </span>
                </div>
              </div>
              <div className="bg-surface-container px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                  lock_clock
                </span>
                <span className="font-heading text-xs text-on-surface-variant font-bold">
                  Locked until 1:45 PM
                </span>
              </div>
            </div>

            {/* Inversion Window Notice */}
            <div className="rounded-xl bg-gradient-to-r from-primary to-primary-container text-white p-3.5 flex flex-col justify-end">
              <span className="font-heading text-xs text-secondary-fixed font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
                Best Solar Venting Window: 1:45 PM – 3:30 PM
              </span>
              <p className="text-xs text-surface-bright/90 leading-tight mt-1">
                Inversion layer breaks during peak solar heating. Safe for 20-minute whole-apartment
                cross-ventilation to flush CO2.
              </p>
            </div>

            {/* Core Rule Card */}
            <div className="bg-surface-container-low rounded-lg p-3 flex flex-col gap-1 border border-surface-container">
              <div className="flex items-center gap-1 text-error">
                <span className="material-symbols-outlined text-[18px]">block</span>
                <span className="font-heading text-xs font-bold">
                  Absolute Rule: Never crack windows 6 AM – 11 AM
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Cold morning inversion layers trap heavy particulate exhaust against the ground. Keep
                windows sealed until solar warmth ascends.
              </p>
            </div>

            {/* Jugaad Shield Tip */}
            <div className="bg-secondary-container/20 rounded-lg p-3 flex items-start gap-2.5 border border-secondary/20">
              <span className="material-symbols-outlined text-secondary text-[22px]">
                tips_and_updates
              </span>
              <div className="flex-1">
                <span className="font-heading text-[10px] text-secondary font-bold uppercase tracking-wider">
                  Pro Jugaad Shield
                </span>
                <p className="text-xs text-on-surface leading-snug mt-0.5">
                  A rolled, slightly damp cotton towel firmly wedged under corridor doors stops up
                  to <strong className="text-secondary font-bold">18% of hallway soot</strong>{' '}
                  infiltration.
                </p>
              </div>
            </div>
          </article>

          {/* Action Protocol Step 02: Kitchen Tadka Discipline */}
          <article className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-sm border border-surface-container flex flex-col gap-3">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-heading text-xs font-bold">
                  02
                </span>
                <div>
                  <h3 className="font-heading text-sm sm:text-base text-primary leading-tight font-bold">
                    Kitchen Tadka &amp; Exhaust Discipline
                  </h3>
                  <span className="text-xs text-on-surface-variant font-medium">
                    Aerosol Spike Management
                  </span>
                </div>
              </div>
              <div className="bg-error-container/40 px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="font-heading text-xs text-error font-bold">
                  PM2.5 &gt;450 µg/m³ Spike Hazard
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Pre-Ignition Rule */}
              <div className="bg-surface-container-low rounded-lg p-3 flex flex-col justify-between border border-surface-container">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[18px]">timer</span>
                  <span className="font-heading text-xs font-bold">3-Min Pre-Ignition</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                  Trigger chimney/exhaust 3 mins <em>before</em> lighting gas to establish directional
                  laminar suction draft.
                </p>
              </div>

              {/* Containment Rule */}
              <div className="bg-surface-container-low rounded-lg p-3 flex flex-col justify-between border border-surface-container">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[18px]">meeting_room</span>
                  <span className="font-heading text-xs font-bold">Airtight Compartment</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                  Seal connecting kitchen-hallway doors completely while crackling mustard seeds or
                  frying spices.
                </p>
              </div>
            </div>

            <div className="w-full bg-surface-container-high/60 rounded-lg p-3 flex items-center gap-2 text-xs text-on-surface">
              <span className="material-symbols-outlined text-secondary text-[20px]">air</span>
              <span>Oil smoke lingers indoors for up to 4.5 hours without laminar exhaust.</span>
            </div>
          </article>
        </div>
      ) : (
        /* Purifier Smart Mode */
        <div className="space-y-4">
          <article className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-sm border border-surface-container space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[24px]">airware</span>
                <h3 className="font-heading text-sm sm:text-base text-primary font-bold">
                  HEPA Fan Speed Discipline
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary text-on-secondary font-heading text-xs font-semibold">
                Continuous Medium Mode
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              <strong>Do NOT leave purifiers in Auto Mode on smog nights!</strong> Auto mode drops
              fan speed once PM2.5 reaches moderate levels, allowing dense outdoor air seepage to
              overwhelm room corners. Run on <strong>Medium Continuous</strong> to maintain 4–5 air
              changes per hour (ACH).
            </p>

            <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">settings_suggest</span>
                <span className="text-xs font-semibold text-primary">Pre-Filter Rinse Cycle:</span>
              </div>
              <span className="text-xs font-mono bg-surface-container-highest px-2 py-0.5 rounded text-on-surface-variant">
                Every 14 Days
              </span>
            </div>
          </article>

          <article className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-sm border border-surface-container space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[24px]">construction</span>
              <h3 className="font-heading text-sm sm:text-base text-primary font-bold">
                Corsi-Rosenthal DIY Air Purifier Protocol
              </h3>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              If you have large rooms without a dedicated purifier, build an affordable
              Corsi-Rosenthal box using a standard 12-inch table fan and MERV-13 / H12 furnace
              filter. It matches the Clean Air Delivery Rate (CADR) of an expensive unit at less than
              ₹1,500 total cost.
            </p>
          </article>
        </div>
      )}
    </div>
  );
};
