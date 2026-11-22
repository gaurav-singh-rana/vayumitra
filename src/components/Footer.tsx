'use client';

import React from 'react';
import Link from 'next/link';
import { Language } from '@/lib/translations';
import { NavTab } from '@/components/BottomNav';

interface FooterProps {
  lang: Language;
  onSelectCity?: (cityId: string) => void;
  onNavigateSection?: (tab: NavTab, anchorId?: string) => void;
  onOpenCopilot?: (question?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onSelectCity,
  onNavigateSection,
  onOpenCopilot,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToolClick = (e: React.MouseEvent, tab: NavTab, anchorId?: string) => {
    e.preventDefault();
    if (onNavigateSection) {
      onNavigateSection(tab, anchorId);
    } else {
      if (anchorId) {
        document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white text-slate-800 pt-12 pb-24 sm:pb-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Logo (Exact Match to Header Logo) */}
          <div className="space-y-3 sm:col-span-2 md:col-span-1">
            <Link
              href="/"
              onClick={scrollToTop}
              className="flex items-center gap-2.5 group inline-flex"
            >
              {/* Identical Header Logo Mark Icon */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 via-teal-500 to-emerald-500 p-0.5 shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <circle cx="16" cy="16" r="12" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6" />
                    <path
                      d="M8 14 C12 9, 22 9, 25 13 C 27 16, 26 21, 22 23 C 18 25, 12 24, 11 20 C 10 17, 13 14, 16 14 C 19 14, 21 16, 20 18"
                      stroke="#34d399"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
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
                  <span className="text-[11px] text-slate-500 font-semibold tracking-wide">
                    CPCB Continuous Telemetry Hub
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {lang === 'hi'
                ? 'भारत का पहला वैज्ञानिक रूप से ग्राउंडेड वायु गुणवत्ता और परिवार सुरक्षा पोर्टल। CPCB CAAQMS टेलीमेट्री और एरोसोल फिजिक्स द्वारा संचालित।'
                : 'India’s grounded urban air quality and household clean-air protection platform. Powered by verified CPCB CAAQMS telemetry and aerosol physics.'}
            </p>

            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                ✓ 100% CPCB Grounded
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold">
                PromptWars Challenge 6
              </span>
            </div>
          </div>

          {/* Col 2: Major Monitoring Stations (Working City Switchers) */}
          <div className="space-y-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1.5">
              {lang === 'hi' ? 'प्रमुख CPCB स्टेशन्स' : 'Major CPCB Stations'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => onSelectCity?.('gurugram-cyberhub')}
                  className="hover:text-sky-600 transition-colors text-left font-medium flex items-center gap-1.5 group w-full"
                  type="button"
                >
                  <span className="text-sky-600 group-hover:scale-110 transition-transform">📍</span>
                  <span className="group-hover:underline">Gurugram (Vikas Sadan / Cyber City)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCity?.('delhi-anand-vihar')}
                  className="hover:text-sky-600 transition-colors text-left font-medium flex items-center gap-1.5 group w-full"
                  type="button"
                >
                  <span className="text-sky-600 group-hover:scale-110 transition-transform">📍</span>
                  <span className="group-hover:underline">Delhi (Anand Vihar CAAQMS)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCity?.('mumbai-bkc')}
                  className="hover:text-sky-600 transition-colors text-left font-medium flex items-center gap-1.5 group w-full"
                  type="button"
                >
                  <span className="text-sky-600 group-hover:scale-110 transition-transform">📍</span>
                  <span className="group-hover:underline">Mumbai (Bandra Kurla MPCB)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCity?.('bengaluru-btm')}
                  className="hover:text-sky-600 transition-colors text-left font-medium flex items-center gap-1.5 group w-full"
                  type="button"
                >
                  <span className="text-sky-600 group-hover:scale-110 transition-transform">📍</span>
                  <span className="group-hover:underline">Bengaluru (BTM Layout KSPCB)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCity?.('kolkata-victoria')}
                  className="hover:text-sky-600 transition-colors text-left font-medium flex items-center gap-1.5 group w-full"
                  type="button"
                >
                  <span className="text-sky-600 group-hover:scale-110 transition-transform">📍</span>
                  <span className="group-hover:underline">Kolkata (Victoria Memorial WBPCB)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCity?.('hyderabad-hitec-city')}
                  className="hover:text-sky-600 transition-colors text-left font-medium flex items-center gap-1.5 group w-full"
                  type="button"
                >
                  <span className="text-sky-600 group-hover:scale-110 transition-transform">📍</span>
                  <span className="group-hover:underline">Hyderabad (HITEC City TSPCB)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Protection Tools & Guides (Working Navigators) */}
          <div className="space-y-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1.5">
              {lang === 'hi' ? 'सुरक्षा टूल्स व गाइड' : 'Protection Tools & Guides'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={(e) => handleToolClick(e, 'today', 'mask-guide')}
                  className="hover:text-sky-600 transition-colors text-left font-medium flex items-center gap-1.5 group w-full"
                  type="button"
                >
                  <span>🛡️</span>
                  <span className="group-hover:underline">N95 vs Surgical Mask Benchmark</span>
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleToolClick(e, 'today', 'hourly-forecast')}
                  className="hover:text-sky-600 transition-colors text-left font-medium flex items-center gap-1.5 group w-full"
                  type="button"
                >
                  <span>⏳</span>
                  <span className="group-hover:underline">24-Hour Diurnal Breathing Curve</span>
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleToolClick(e, 'today', 'recommendations')}
                  className="hover:text-sky-600 transition-colors text-left font-medium flex items-center gap-1.5 group w-full"
                  type="button"
                >
                  <span>🍳</span>
                  <span className="group-hover:underline">3-Minute Kitchen Tadka Protocol</span>
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleToolClick(e, 'today', 'recommendations')}
                  className="hover:text-sky-600 transition-colors text-left font-medium flex items-center gap-1.5 group w-full"
                  type="button"
                >
                  <span>🪟</span>
                  <span className="group-hover:underline">Midday Solar Window Ventilation</span>
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleToolClick(e, 'indoor')}
                  className="hover:text-sky-600 transition-colors text-left font-medium flex items-center gap-1.5 group w-full"
                  type="button"
                >
                  <span>🌬️</span>
                  <span className="group-hover:underline">DIY ₹1,200 Corsi-Rosenthal Fan</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCopilot?.('What are the key clean air protections for today?')}
                  className="hover:text-sky-600 transition-colors text-left font-medium flex items-center gap-1.5 group w-full text-indigo-700 font-bold"
                  type="button"
                >
                  <span>✨</span>
                  <span className="group-hover:underline">Ask Vayu AI Copilot</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust, Ethics & Legal */}
          <div className="space-y-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1.5">
              {lang === 'hi' ? 'पारदर्शिता व नीति' : 'Transparency & Legal'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-sky-600 transition-colors font-semibold text-emerald-700 flex items-center gap-1.5"
                >
                  <span>🔒</span>
                  <span className="hover:underline">Privacy Policy &amp; Data Ethics</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://cpcb.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-600 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>🏛️</span>
                  <span className="group-hover:underline">CPCB Official Portal</span>
                  <span className="material-symbols-outlined text-[13px] text-slate-400">open_in_new</span>
                </a>
              </li>
              <li>
                <a
                  href="https://open-meteo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-600 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>🌐</span>
                  <span className="group-hover:underline">Open-Meteo Telemetry</span>
                  <span className="material-symbols-outlined text-[13px] text-slate-400">open_in_new</span>
                </a>
              </li>
              <li>
                <button
                  onClick={scrollToTop}
                  className="hover:text-sky-700 transition-colors inline-flex items-center gap-1 font-bold text-sky-600 pt-2 group"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] group-hover:-translate-y-0.5 transition-transform">
                    arrow_upward
                  </span>
                  <span>Back to Top (ऊपर जाएं)</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright ribbon */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© 2026 AQI VayuMitra (वायुमित्र) .IN — PromptWars Challenge 6. Grounded in CPCB CAAQMS Telemetry.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/privacy" className="hover:underline hover:text-slate-700">
              Privacy Policy
            </Link>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">Zero-Cookie Tracking</span>
            <span>•</span>
            <span>100% Verifiable Provenance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
