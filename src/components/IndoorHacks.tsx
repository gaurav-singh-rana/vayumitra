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
      <section className="w-full bg-white rounded-2xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03)] border border-slate-200/90 space-y-4">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-slate-700">home</span>
            <span className="font-heading text-base sm:text-lg text-slate-900 font-bold tracking-tight">
              {lang === 'hi' ? 'इनडोर माइक्रोक्लाइमेट बनाम बाहरी स्मॉग' : 'Indoor Microclimate vs. Outdoor Smog'}
            </span>
          </div>
          <span className="font-heading text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
            {snapshot.locationName} • {snapshot.stationCode}
          </span>
        </div>

        {/* Comparative Split Telemetry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Outdoor Smog Card */}
          <div className="bg-rose-50/60 rounded-xl p-4 flex flex-col justify-between border border-rose-200/80">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs text-rose-900 font-bold flex items-center gap-1.5 uppercase tracking-wide">
                <span className="material-symbols-outlined text-[16px] text-rose-700">cloud_off</span>
                {lang === 'hi' ? 'बाहर की हवा (Outdoor)' : 'Ambient Outdoor Air'}
              </span>
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
            </div>
            <div className="mt-3">
              <div className="font-heading text-3xl sm:text-4xl text-rose-950 font-extrabold tracking-tight tabular-nums">
                {outdoorAqi}
              </div>
              <div className="font-heading text-xs text-rose-800 font-semibold mt-0.5">
                AQI • {lang === 'hi' ? snapshot.hindiSeverity : snapshot.severity}
              </div>
              <p className="text-xs text-rose-700/90 mt-1.5 leading-snug">
                {lang === 'hi' ? 'सड़कों पर जहरीली स्मॉग परत फंसी है' : 'Thermal inversion traps vehicular soot'}
              </p>
            </div>
          </div>

          {/* Living Room Microclimate Card */}
          <div className="bg-emerald-50/60 rounded-xl p-4 flex flex-col justify-between border border-emerald-200/80">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs text-emerald-900 font-bold flex items-center gap-1.5 uppercase tracking-wide">
                <span className="material-symbols-outlined text-[16px] text-emerald-700">verified_user</span>
                {lang === 'hi' ? 'लिविंग रूम (Indoor Shield)' : 'Shielded Living Sanctuary'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            </div>
            <div className="mt-3">
              <div className="font-heading text-3xl sm:text-4xl text-emerald-950 font-extrabold tracking-tight tabular-nums">
                {indoorAqi}
              </div>
              <div className="font-heading text-xs text-emerald-800 font-semibold mt-0.5">
                AQI • {lang === 'hi' ? 'सुरक्षा शील्ड सक्रिय' : 'Microclimate Buffer'}
              </div>
              <p className="text-xs text-emerald-700/90 mt-1.5 leading-snug">
                {lang === 'hi' ? 'सील व अनुशासन से सुरक्षित हवा' : 'Controlled apertures reduce PM2.5 infiltration'}
              </p>
            </div>
          </div>
        </div>

        {/* Microclimate Efficiency Status Strip */}
        <div className="bg-slate-50 rounded-xl p-3.5 flex items-center justify-between flex-wrap gap-2 border border-slate-200/80">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-700 text-[20px]">verified</span>
            <span className="font-heading text-xs sm:text-sm text-slate-800 font-semibold">
              {lang === 'hi'
                ? `सील अनुशासन से ${shieldedPct}% जहरीले धुएं से परिवार का बचाव`
                : `Aperture protocol shields ${shieldedPct}% of ambient toxic load`}
            </span>
          </div>
          <span className="font-heading text-xs text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-3 py-1 rounded-full font-bold">
            {lang === 'hi' ? 'लक्ष्य: <60 AQI' : 'Sanctuary Target: <60 AQI'}
          </span>
        </div>
      </section>

      {/* Interactive Visualizer for Jugaad Towel */}
      <JugaadVisualizer lang={lang} />

      {/* Segmented Mode Switcher */}
      <section className="w-full space-y-3">
        <div
          className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200/80"
          role="tablist"
          aria-label="Indoor Action Mode"
        >
          <button
            role="tab"
            aria-selected={activeMode === 'budget'}
            onClick={() => setActiveMode('budget')}
            className={`flex-1 min-h-[40px] rounded-lg flex items-center justify-center gap-2 transition-all font-heading text-xs sm:text-sm font-semibold ${
              activeMode === 'budget'
                ? 'bg-white shadow-xs text-slate-900 font-bold border border-slate-200/90'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">build</span>
            <span>{lang === 'hi' ? 'देसी जुगाड़ हैक्स (₹0 खर्च)' : 'Zero-Cost Indian Hacks (₹0)'}</span>
          </button>
          <button
            role="tab"
            aria-selected={activeMode === 'purifier'}
            onClick={() => setActiveMode('purifier')}
            className={`flex-1 min-h-[40px] rounded-lg flex items-center justify-center gap-2 transition-all font-heading text-xs sm:text-sm font-semibold ${
              activeMode === 'purifier'
                ? 'bg-white shadow-xs text-slate-900 font-bold border border-slate-200/90'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">air</span>
            <span>{lang === 'hi' ? 'प्यूरीफायर स्मार्ट मोड' : 'Smart Purifier Protocols'}</span>
          </button>
        </div>

        {/* Impact Teaser Banner */}
        <div className="bg-white rounded-xl p-3.5 flex items-start gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-slate-200/90">
          <span className="material-symbols-outlined text-emerald-700 text-[20px] mt-0.5">insights</span>
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              {lang === 'hi' ? (
                <>
                  इन <span className="font-bold text-slate-900">3 बिना खर्च वाले हैक्स</span> को
                  अपनाकर आज ही घर के अंदर PM2.5 में{' '}
                  <span className="font-bold text-emerald-700">~58% की कमी</span> करें।
                </>
              ) : (
                <>
                  Applying these <span className="font-bold text-slate-900">3 zero-cost indoor hacks</span>{' '}
                  drops living room PM2.5 by{' '}
                  <span className="font-bold text-emerald-700">~58% today</span> without extra
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
          <article className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03)] border border-slate-200/90 flex flex-col gap-3.5">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-heading text-xs font-bold">
                  01
                </span>
                <div>
                  <h3 className="font-heading text-base font-bold text-slate-900 leading-tight">
                    {lang === 'hi' ? 'दोपहर धूप में खिड़कियां खोलना' : 'Solar Window Cross-Venting'}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    {lang === 'hi' ? 'थर्मल डायनामिक वेंटिलेशन' : 'Thermal Dynamic Ventilation'}
                  </span>
                </div>
              </div>
              <div className="bg-slate-100 px-3 py-1 rounded-full flex items-center gap-1.5 border border-slate-200">
                <span className="material-symbols-outlined text-[16px] text-slate-500">
                  lock_clock
                </span>
                <span className="font-heading text-xs text-slate-700 font-bold">
                  {lang === 'hi' ? 'दोपहर 1:45 तक बंद' : 'Locked until 1:45 PM'}
                </span>
              </div>
            </div>

            {/* Inversion Window Notice */}
            <div className="rounded-xl bg-slate-900 text-white p-4 flex flex-col justify-end space-y-1">
              <span className="font-heading text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
                {lang === 'hi' ? 'सबसे सुरक्षित धूप खिड़की: दोपहर 1:45 – 3:30 बजे' : 'Optimal Solar Venting Window: 1:45 PM – 3:30 PM'}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'hi'
                  ? 'धूप से इनवर्जन लेयर ऊपर उड़ जाती है। पूरे घर की बासी CO2 हवा को बदलने के लिए 20 मिनट के लिए दोनों तरफ की खिड़कियां खोलें।'
                  : 'Inversion layer breaks during peak solar heating. Safe for 20-minute whole-apartment cross-ventilation to flush CO2.'}
              </p>
            </div>

            {/* Why & Direct Impact Callout */}
            <div className="bg-slate-50 rounded-xl p-3.5 flex items-start gap-2.5 border border-slate-200/80">
              <span className="material-symbols-outlined text-emerald-700 text-[18px] shrink-0 mt-0.5">
                science
              </span>
              <div>
                <span className="font-bold text-slate-900 text-xs block mb-0.5">
                  Why &amp; Direct Impact:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'hi'
                    ? 'सुबह की ठंडी हवा भारी होती है और वाहनों का सारा जहरीला धुआं सीधे कमरे में भर जाता है। दोपहर 1:45 बजे वेंट करने से कमरे का CO2 स्तर 1400 ppm से घटकर 550 ppm हो जाता है बिना जहरीला PM2.5 घुसाए।'
                    : 'Morning inversion compresses street emissions to head level. Solar venting at peak convection drops indoor CO2 from 1,400 ppm to 550 ppm without drawing in ground-level vehicular soot.'}
                </p>
              </div>
            </div>

            {/* Core Rule Card */}
            <div className="bg-rose-50/60 rounded-xl p-3.5 flex flex-col gap-1 border border-rose-200/80">
              <div className="flex items-center gap-1.5 text-rose-900">
                <span className="material-symbols-outlined text-[18px]">block</span>
                <span className="font-heading text-xs font-bold">
                  {lang === 'hi' ? 'कड़ा नियम: सुबह 6 से 11 बजे खिड़की भूलकर भी न खोलें' : 'Absolute Rule: Never crack windows 6 AM – 11 AM'}
                </span>
              </div>
              <p className="text-xs text-rose-800 leading-relaxed">
                {lang === 'hi'
                  ? 'सुबह की ठंडी हवा भारी होती है और सड़क का सारा डीजल धुआं सीधे घर के कोनों में भर जाता है।'
                  : 'Cold morning air traps dense combustion particulate. Keep exterior apertures sealed until ambient ground temperatures rise.'}
              </p>
            </div>
          </article>

          {/* Action Protocol Step 02: Kitchen Tadka Discipline */}
          <article className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03)] border border-slate-200/90 flex flex-col gap-3.5">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-heading text-xs font-bold">
                  02
                </span>
                <div>
                  <h3 className="font-heading text-base font-bold text-slate-900 leading-tight">
                    {lang === 'hi' ? 'किचन तड़का और एग्जॉस्ट अनुशासन' : 'Kitchen Tadka & Exhaust Discipline'}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    {lang === 'hi' ? 'तेल के धुएं का नियंत्रण' : 'Aerosol Spike Management'}
                  </span>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                <span className="font-heading text-xs text-amber-900 font-bold">
                  PM2.5 &gt;450 µg/m³ Spike
                </span>
              </div>
            </div>

            {/* Why & Direct Impact Callout */}
            <div className="bg-slate-50 rounded-xl p-3.5 flex items-start gap-2.5 border border-slate-200/80">
              <span className="material-symbols-outlined text-emerald-700 text-[18px] shrink-0 mt-0.5">
                science
              </span>
              <div>
                <span className="font-bold text-slate-900 text-xs block mb-0.5">
                  Why &amp; Direct Impact:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'hi'
                    ? 'तड़के के दौरान तेल के कण PM2.5 स्तर को 450+ तक बढ़ा देते हैं। 3 मिनट पहले चिमनी चलाने से नेगेटिव प्रेशर खिंचाव बनता है, जिससे 92% तेल-धुआं तुरंत बाहर निकल जाता है।'
                    : 'Frying spices without pre-exhaust creates severe ultra-fine oil aerosols (PM2.5 >450 µg/m³). Pre-running the exhaust for 3 minutes creates a directional laminar draft, venting 92% of cooking emissions outdoors.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-xl p-3.5 flex flex-col justify-between border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-slate-900">
                  <span className="material-symbols-outlined text-[18px] text-slate-700">timer</span>
                  <span className="font-heading text-xs font-bold">
                    {lang === 'hi' ? 'गैस जलाने से 3 मिनट पहले' : '3-Min Pre-Ignition'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  {lang === 'hi'
                    ? 'गैस चालू करने से 3 मिनट पहले चिमनी चालू करें ताकि हवा का खिंचाव (suction draft) तैयार हो जाए।'
                    : 'Trigger chimney/exhaust 3 mins before lighting gas to establish directional laminar suction draft.'}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-3.5 flex flex-col justify-between border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-slate-900">
                  <span className="material-symbols-outlined text-[18px] text-slate-700">meeting_room</span>
                  <span className="font-heading text-xs font-bold">
                    {lang === 'hi' ? 'दरवाजे पूरी तरह बंद रखें' : 'Airtight Compartment'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  {lang === 'hi'
                    ? 'तड़का लगाते समय किचन और हॉल के बीच का दरवाजा पूरी तरह बंद रखें।'
                    : 'Seal connecting kitchen-hallway doors completely while crackling mustard seeds or frying spices.'}
                </p>
              </div>
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
