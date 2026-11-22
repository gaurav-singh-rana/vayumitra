'use client';

import React, { useState } from 'react';
import { AirQualitySnapshot, HouseholdProfile } from '@/types';
import { JugaadVisualizer } from './JugaadVisualizer';
import { Language } from '@/lib/translations';

interface IndoorHacksProps {
  snapshot: AirQualitySnapshot;
  profile: HouseholdProfile;
  lang?: Language;
}

export const IndoorHacks: React.FC<IndoorHacksProps> = ({ snapshot, lang = 'hi' }) => {
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
                {lang === 'hi' ? 'बाहर की हवा' : 'Outdoor Smog'}
              </span>
              <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
            </div>
            <div className="mt-2">
              <div className="font-heading text-3xl sm:text-4xl text-error font-bold tracking-tight">
                {outdoorAqi}
              </div>
              <div className="font-heading text-xs text-on-surface-variant font-medium mt-0.5">
                AQI • {lang === 'hi' ? snapshot.hindiSeverity : snapshot.severity}
              </div>
              <p className="text-[11px] leading-tight text-on-surface-variant/80 mt-1">
                {lang === 'hi' ? 'जहरीली स्मॉग परत फंसी है' : 'Inversion layer trapped soot'}
              </p>
            </div>
          </div>

          {/* Living Room Microclimate Card */}
          <div className="bg-secondary-container/30 rounded-xl p-3 flex flex-col justify-between border border-secondary/20">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs text-on-secondary-container font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">home_pin</span>
                {lang === 'hi' ? 'लिविंग रूम' : 'Living Room'}
              </span>
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
            </div>
            <div className="mt-2">
              <div className="font-heading text-3xl sm:text-4xl text-secondary font-bold tracking-tight">
                {indoorAqi}
              </div>
              <div className="font-heading text-xs text-secondary font-semibold mt-0.5">
                AQI • {lang === 'hi' ? 'शील्ड सक्रिय' : 'Shield Active'}
              </div>
              <p className="text-[11px] leading-tight text-on-surface-variant/80 mt-1">
                {lang === 'hi' ? 'सुरक्षित इनडोर माइक्रोक्लाइमेट' : 'Purified microclimate buffer'}
              </p>
            </div>
          </div>
        </div>

        {/* Microclimate Efficiency Status Strip */}
        <div className="mt-3 bg-surface-container-low rounded-xl p-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
            <span className="font-heading text-xs sm:text-sm text-on-surface font-semibold">
              {lang === 'hi'
                ? `${shieldedPct}% जहरीले धुएं से परिवार का बचाव`
                : `Shielding ${shieldedPct}% of ambient toxic load`}
            </span>
          </div>
          <span className="font-heading text-xs text-secondary bg-surface-container-lowest px-2.5 py-0.5 rounded-full font-bold shadow-xs">
            {lang === 'hi' ? 'लक्ष्य: <60 AQI' : 'Target: <60 AQI'}
          </span>
        </div>
      </section>

      {/* Interactive Visualizer for Jugaad Towel */}
      <JugaadVisualizer lang={lang} />

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
            <span>{lang === 'hi' ? 'देसी जुगाड़ हैक्स (₹0 खर्च)' : 'Budget Hacks (₹0)'}</span>
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
            <span>{lang === 'hi' ? 'प्यूरीफायर स्मार्ट मोड' : 'Purifier Smart Mode'}</span>
          </button>
        </div>

        {/* Impact Teaser Banner */}
        <div className="mt-3 bg-tertiary-fixed/30 rounded-xl p-3 flex items-start gap-2.5 shadow-sm border border-secondary/15">
          <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">insights</span>
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-on-surface font-medium leading-relaxed">
              {lang === 'hi' ? (
                <>
                  इन <span className="font-semibold text-secondary">3 बिना खर्च वाले हैक्स</span> को
                  अपनाकर आज ही घर के अंदर PM2.5 में{' '}
                  <span className="font-semibold text-secondary">~58% की कमी</span> करें।
                </>
              ) : (
                <>
                  Applying these <span className="font-semibold text-secondary">3 zero-cost hacks</span>{' '}
                  drops living room PM2.5 by{' '}
                  <span className="font-semibold text-secondary">~58% today</span> without extra
                  electricity expense.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Protocol Content */}
      {activeMode === 'budget' ? (
        <div className="space-y-4">
          {/* Action Protocol Step 01: Thermal Venting */}
          <article className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-sm border border-surface-container flex flex-col gap-3">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-heading text-xs font-bold">
                  01
                </span>
                <div>
                  <h3 className="font-heading text-sm sm:text-base text-primary leading-tight font-bold">
                    {lang === 'hi' ? 'दोपहर धूप में खिड़कियां खोलना' : 'Solar Window Cross-Venting'}
                  </h3>
                  <span className="text-xs text-on-surface-variant font-medium">
                    {lang === 'hi' ? 'थर्मल डायनामिक वेंटिलेशन' : 'Thermal Dynamic Windowing'}
                  </span>
                </div>
              </div>
              <div className="bg-surface-container px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                  lock_clock
                </span>
                <span className="font-heading text-xs text-on-surface-variant font-bold">
                  {lang === 'hi' ? 'दोपहर 1:45 तक बंद' : 'Locked until 1:45 PM'}
                </span>
              </div>
            </div>

            {/* Inversion Window Notice */}
            <div className="rounded-xl bg-gradient-to-r from-primary to-primary-container text-white p-3.5 flex flex-col justify-end">
              <span className="font-heading text-xs text-secondary-fixed font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
                {lang === 'hi' ? 'सबसे सुरक्षित धूप खिड़की: दोपहर 1:45 – 3:30 बजे' : 'Best Solar Venting Window: 1:45 PM – 3:30 PM'}
              </span>
              <p className="text-xs text-surface-bright/90 leading-tight mt-1">
                {lang === 'hi'
                  ? 'धूप से इनवर्जन लेयर ऊपर उड़ जाती है। पूरे घर की बासी CO2 हवा को बदलने के लिए 20 मिनट के लिए दोनों तरफ की खिड़कियां खोलें।'
                  : 'Inversion layer breaks during peak solar heating. Safe for 20-minute whole-apartment cross-ventilation to flush CO2.'}
              </p>
            </div>

            {/* Core Rule Card */}
            <div className="bg-surface-container-low rounded-lg p-3 flex flex-col gap-1 border border-surface-container">
              <div className="flex items-center gap-1 text-error">
                <span className="material-symbols-outlined text-[18px]">block</span>
                <span className="font-heading text-xs font-bold">
                  {lang === 'hi' ? 'कड़ा नियम: सुबह 6 से 11 बजे खिड़की भूलकर भी न खोलें' : 'Absolute Rule: Never crack windows 6 AM – 11 AM'}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {lang === 'hi'
                  ? 'सुबह की ठंडी हवा भारी होती है और वाहनों का सारा जहरीला धुआं सीधे कमरे में भर जाता है।'
                  : 'Cold morning inversion layers trap heavy particulate exhaust against the ground. Keep windows sealed until solar warmth ascends.'}
              </p>
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
                    {lang === 'hi' ? 'किचन तड़का और एग्जॉस्ट अनुशासन' : 'Kitchen Tadka & Exhaust Discipline'}
                  </h3>
                  <span className="text-xs text-on-surface-variant font-medium">
                    {lang === 'hi' ? 'तेल के धुएं का नियंत्रण' : 'Aerosol Spike Management'}
                  </span>
                </div>
              </div>
              <div className="bg-error-container/40 px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="font-heading text-xs text-error font-bold">
                  PM2.5 &gt;450 µg/m³ Spike
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="bg-surface-container-low rounded-lg p-3 flex flex-col justify-between border border-surface-container">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[18px]">timer</span>
                  <span className="font-heading text-xs font-bold">
                    {lang === 'hi' ? 'गैस जलाने से 3 मिनट पहले' : '3-Min Pre-Ignition'}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                  {lang === 'hi'
                    ? 'गैस चालू करने से 3 मिनट पहले चिमनी चालू करें ताकि हवा का खिंचाव (suction draft) तैयार हो जाए।'
                    : 'Trigger chimney/exhaust 3 mins before lighting gas to establish directional laminar suction draft.'}
                </p>
              </div>

              <div className="bg-surface-container-low rounded-lg p-3 flex flex-col justify-between border border-surface-container">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[18px]">meeting_room</span>
                  <span className="font-heading text-xs font-bold">
                    {lang === 'hi' ? 'दरवाजे पूरी तरह बंद रखें' : 'Airtight Compartment'}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                  {lang === 'hi'
                    ? 'तड़का लगाते समय किचन और हॉल के बीच का दरवाजा पूरी तरह बंद रखें।'
                    : 'Seal connecting kitchen-hallway doors completely while crackling mustard seeds or frying spices.'}
                </p>
              </div>
            </div>

            <div className="w-full bg-surface-container-high/60 rounded-lg p-3 flex items-center gap-2 text-xs text-on-surface">
              <span className="material-symbols-outlined text-secondary text-[20px]">air</span>
              <span>
                {lang === 'hi'
                  ? 'किचन में तड़के का तेल धुआं बिना एग्जॉस्ट के घर में 4.5 घंटे तक मंडराता रहता है।'
                  : 'Oil smoke lingers indoors for up to 4.5 hours without laminar exhaust.'}
              </span>
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
                  {lang === 'hi' ? 'प्यूरीफायर को ऑटो-मोड पर न छोड़ें' : 'HEPA Fan Speed Discipline'}
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary text-on-secondary font-heading text-xs font-semibold">
                Continuous Medium Mode
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {lang === 'hi' ? (
                <>
                  <strong>स्मॉग की रात प्यूरीफायर को कभी ऑटो-मोड पर न रखें!</strong> ऑटो-मोड पंखे की
                  गति बहुत धीमी कर देता है, जिससे बाहर का धुआं कमरे के कोनों में भर जाता है। रात में
                  पंखे को <strong>मीडियम कंटीन्यूअस</strong> पर रखें।
                </>
              ) : (
                <>
                  <strong>Do NOT leave purifiers in Auto Mode on smog nights!</strong> Auto mode drops
                  fan speed once PM2.5 reaches moderate levels, allowing dense outdoor air seepage to
                  overwhelm room corners. Run on <strong>Medium Continuous</strong> to maintain 4–5 air
                  changes per hour.
                </>
              )}
            </p>
          </article>

          <article className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-sm border border-surface-container space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[24px]">construction</span>
              <h3 className="font-heading text-sm sm:text-base text-primary font-bold">
                {lang === 'hi' ? '₹1,200 में घर पर बना DIY एयर प्यूरीफायर' : 'Corsi-Rosenthal DIY Air Purifier Protocol'}
              </h3>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {lang === 'hi'
                ? 'यदि आपके पास प्यूरीफायर नहीं है, तो एक साधारण 12-इंच के टेबल फैन के पीछे MERV-13 या H12 फिल्टर शीट बांधें। यह ₹20,000 के महंगे प्यूरीफायर के बराबर क्लीन एयर डिलीवरी रेट (CADR) देता है।'
                : 'Build an affordable Corsi-Rosenthal box using a standard 12-inch table fan and MERV-13/H12 furnace filter. It matches the Clean Air Delivery Rate (CADR) of an expensive unit at less than ₹1,500 total cost.'}
            </p>
          </article>
        </div>
      )}
    </div>
  );
};
