'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/translations';

interface MaskDefenseCardProps {
  lang: Language;
}

export const MaskDefenseCard: React.FC<MaskDefenseCardProps> = ({ lang }) => {
  const [selectedMask, setSelectedMask] = useState<'n95' | 'surgical' | 'cloth'>('n95');

  const maskData = {
    cloth: {
      name: lang === 'hi' ? 'कपड़े का मास्क / रुमाल' : 'Cloth Mask / Bandana',
      filtration: '18% – 25%',
      leakage: '75% – 82%',
      status: lang === 'hi' ? 'स्मॉग में अप्रभावी' : 'Ineffective in Severe Smog',
      statusClass: 'bg-rose-100 text-rose-800 border-rose-300',
      desc: lang === 'hi'
        ? 'कपड़े के रेशों के बीच 50–100 माइक्रोन का गैप होता है। PM2.5 (2.5 माइक्रोन) जहरीले कण सीधे फेफड़ों में चले जाते हैं।'
        : 'Woven cloth pores are 50–100 µm wide. Microscopic PM2.5 particles (2.5 µm) pass directly into deep alveolar lung sacs.',
      rating: 1,
    },
    surgical: {
      name: lang === 'hi' ? '3-प्लाई सर्जिकल मास्क' : '3-Ply Surgical Mask',
      filtration: '45% – 55%',
      leakage: '45% – 55%',
      status: lang === 'hi' ? 'आंशिक बचाव (साइड से लीक)' : 'Partial (Side-Gap Leakage)',
      statusClass: 'bg-amber-100 text-amber-800 border-amber-300',
      desc: lang === 'hi'
        ? 'सामने का फिल्टर ठीक है पर गालों और नाक के किनारों से अनफिल्टर्ड हवा अंदर खिंचती है। केवल बड़े धूल कण रोकता है।'
        : 'Good frontal filter, but loose side perimeters allow unshielded ambient bypass during normal inhalation.',
      rating: 2,
    },
    n95: {
      name: lang === 'hi' ? 'N95 / FFP2 इलेक्ट्रोस्टैटिक मास्क' : 'N95 / FFP2 Certified Respirator',
      filtration: '95% – 99%',
      leakage: '< 5%',
      status: lang === 'hi' ? 'गोल्ड स्टैंडर्ड सुरक्षा' : 'Gold Standard Smog Defense',
      statusClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      desc: lang === 'hi'
        ? 'इलेक्ट्रोस्टैटिक मेल्टब्लोन लेयर और टाइट फेशियल सील। बारीक से बारीक दहन धुएं (soot) को भी फेफड़ों में जाने से रोकता है।'
        : 'Electrostatic meltblown microfibers trap sub-micron soot with airtight facial perimeter seal.',
      rating: 3,
    },
  };

  const current = maskData[selectedMask];

  return (
    <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 space-y-4" aria-labelledby="mask-defense-heading">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <span className="font-heading text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">masks</span>
            {lang === 'hi' ? 'मास्क सुरक्षा गाइड' : 'Mask Filtration & Penetration Guide'}
          </span>
          <h3 id="mask-defense-heading" className="font-heading text-base sm:text-lg font-bold text-slate-800 mt-0.5">
            {lang === 'hi' ? 'कौन सा मास्क जहरीला धुआं रोकता है?' : 'Which Mask Actually Filters Winter Smog?'}
          </h3>
        </div>

        {/* 3 Mask Selector Pills */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1 text-xs font-bold">
          <button
            onClick={() => setSelectedMask('n95')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedMask === 'n95'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            type="button"
          >
            N95 / FFP2
          </button>
          <button
            onClick={() => setSelectedMask('surgical')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedMask === 'surgical'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            type="button"
          >
            Surgical
          </button>
          <button
            onClick={() => setSelectedMask('cloth')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedMask === 'cloth'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            type="button"
          >
            Cloth
          </button>
        </div>
      </div>

      {/* Selected Mask Detailed Card */}
      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="font-heading text-base font-bold text-slate-800">{current.name}</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${current.statusClass}`}>
              {current.status}
            </span>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: `'FILL' ${i < current.rating ? 1 : 0}` }}
              >
                star
              </span>
            ))}
          </div>
        </div>

        {/* Filtration Bar Visualizer */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-emerald-700 font-bold">
              {lang === 'hi' ? 'रोका गया धुआं (Filtration):' : 'Particulate Filtered:'} {current.filtration}
            </span>
            <span className="text-rose-600 font-bold">
              {lang === 'hi' ? 'फेफड़ों में जाने वाला धुआं (Leakage):' : 'Lung Leakage:'} {current.leakage}
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-rose-200 overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{ width: selectedMask === 'n95' ? '95%' : selectedMask === 'surgical' ? '50%' : '20%' }}
            />
            <div
              className="bg-rose-500 h-full transition-all duration-500"
              style={{ width: selectedMask === 'n95' ? '5%' : selectedMask === 'surgical' ? '50%' : '80%' }}
            />
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {current.desc}
        </p>

        {/* Rapid 3-Step Fit Test Tip */}
        <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between flex-wrap gap-2 text-xs">
          <span className="text-indigo-700 font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">check_box</span>
            {lang === 'hi' ? 'फिट टेस्ट:' : 'Quick Fit Test:'}
          </span>
          <span className="text-slate-600">
            {lang === 'hi'
              ? 'मास्क पहनकर गहरी सांस लें — अगर किनारे से हवा छूती महसूस हो, तो नोज़ क्लिप को दोनों उंगलियों से टाइट दबाएं।'
              : 'Inhale deeply — if air flows along cheeks or nose bridge, pinch metallic nose clip with both hands.'}
          </span>
        </div>
      </div>
    </section>
  );
};
