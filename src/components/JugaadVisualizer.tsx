'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/translations';

interface JugaadVisualizerProps {
  lang: Language;
}

export const JugaadVisualizer: React.FC<JugaadVisualizerProps> = ({ lang }) => {
  const [hasTowel, setHasTowel] = useState<boolean>(true);

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-sm border border-surface-container space-y-3.5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <span className="font-heading text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            {lang === 'hi' ? 'देसी इंजीनियरिंग (₹0 खर्च)' : 'Zero-Cost Indian Jugaad'}
          </span>
          <h3 className="font-heading text-base font-bold text-primary mt-0.5">
            {lang === 'hi'
              ? 'दरवाजे के नीचे गीला तौलिया: यह काम कैसे करता है?'
              : 'Damp Towel Door Shield: The Physics'}
          </h3>
        </div>

        {/* Interactive toggle */}
        <button
          onClick={() => setHasTowel((prev) => !prev)}
          className={`px-3.5 py-1.5 rounded-full font-heading text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
            hasTowel
              ? 'bg-secondary text-on-secondary'
              : 'bg-error-container text-error border border-error/20'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">
            {hasTowel ? 'shield' : 'shield_with_heart'}
          </span>
          <span>
            {hasTowel
              ? lang === 'hi'
                ? 'तौलिया लगा है (सुरक्षित)'
                : 'Towel Placed (Shielded)'
              : lang === 'hi'
              ? 'तौलिया हटाएँ (धुआं रिसाव)'
              : 'Towel Removed (Leak)'}
          </span>
        </button>
      </div>

      {/* Visual Animation Box */}
      <div className="w-full bg-slate-900 rounded-xl p-4 text-white relative overflow-hidden min-h-[140px] flex items-center justify-between gap-4">
        {/* Corridor Side (Smoky Hallway) */}
        <div className="flex-1 flex flex-col items-center justify-center border-r border-slate-700/60 pr-3">
          <span className="text-[11px] font-bold text-red-400 mb-1">
            {lang === 'hi' ? 'बाहरी गलियारा (धुआं भरा)' : 'Outer Corridor (High Soot)'}
          </span>
          <div className="flex gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
            <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-1">AQI 350+</span>
        </div>

        {/* Door Threshold Barrier */}
        <div className="flex flex-col items-center justify-center shrink-0 w-16">
          <div className="w-4 h-16 bg-amber-800 rounded-t-sm shadow-md flex items-center justify-center">
            <span className="text-[8px] text-amber-200 rotate-90 whitespace-nowrap font-bold">DOOR</span>
          </div>
          {/* Towel Slot */}
          <div
            className={`w-12 h-5 rounded-md transition-all flex items-center justify-center text-[9px] font-bold ${
              hasTowel
                ? 'bg-teal-400 text-teal-950 shadow-[0_0_10px_#2dd4bf]'
                : 'bg-transparent border border-dashed border-red-500 text-red-400'
            }`}
          >
            {hasTowel ? 'TOWEL' : 'GAP'}
          </div>
        </div>

        {/* Bedroom Sanctuary Side */}
        <div className="flex-1 flex flex-col items-center justify-center pl-3">
          <span
            className={`text-[11px] font-bold mb-1 ${
              hasTowel ? 'text-teal-300' : 'text-red-400'
            }`}
          >
            {hasTowel
              ? lang === 'hi'
                ? 'अंदर का कमरा (सुरक्षित)'
                : 'Sanctuary (Protected)'
              : lang === 'hi'
              ? 'अंदर का कमरा (प्रदूषित)'
              : 'Sanctuary (Polluted)'}
          </span>
          {hasTowel ? (
            <div className="flex items-center gap-1.5 text-teal-300">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="text-xs font-bold font-mono">AQI 85</span>
            </div>
          ) : (
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-[10px] text-red-300 font-mono">AQI 280</span>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-on-surface-variant leading-relaxed">
        {hasTowel
          ? lang === 'hi'
            ? '✓ हल्का नम सूती तौलिया दरवाजे के नीचे के 1.5 इंच के गैप को सील कर देता है और बाहर के एरोसोल व भारी कणों को 82% तक रोक देता है।'
            : '✓ A slightly damp cotton towel seals the 1.5-inch undercut threshold, electrostatically and physically trapping ~82% of hallway convective soot.'
          : lang === 'hi'
            ? '✕ दरवाजे के नीचे का खुला गैप रातभर कमरे के अंदर जहरीला धुआं खींचता रहता है, जिससे सुबह गले में खराश और खांसी होती है।'
            : '✕ An open door undercut acts as a thermal chimney, siphoning cold corridor soot into the warm bedroom throughout the night.'}
      </p>
    </div>
  );
};
