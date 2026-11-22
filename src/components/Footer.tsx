import React from 'react';
import Link from 'next/link';
import { Language } from '@/lib/translations';

interface FooterProps {
  lang: Language;
  onSelectCity?: (cityId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onSelectCity }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-surface-container bg-surface-container-lowest text-on-surface pt-12 pb-24 sm:pb-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-sky-400 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px] text-cyan-400">
                    air
                  </span>
                </div>
              </div>
              <span className="font-heading font-extrabold text-base tracking-tight">
                AQI <span className="text-secondary font-black">VayuMitra</span> .IN
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {lang === 'hi'
                ? 'भारत का पहला वैज्ञानिक रूप से ग्राउंडेड वायु गुणवत्ता और परिवार सुरक्षा पोर्टल। CPCB CAAQMS टेलीमेट्री और एरोसोल फिजिक्स द्वारा संचालित।'
                : 'India’s grounded urban air quality and household clean-air protection platform. Powered by verified CPCB CAAQMS telemetry and aerosol physics.'}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
                CPCB Grounded
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary text-[10px] font-bold">
                PromptWars 6
              </span>
            </div>
          </div>

          {/* Col 2: Major Monitoring Stations */}
          <div className="space-y-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-primary">
              {lang === 'hi' ? 'प्रमुख CPCB स्टेशन्स' : 'Major CPCB Stations'}
            </h3>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li>
                <button
                  onClick={() => onSelectCity?.('gurugram-cyberhub')}
                  className="hover:text-primary transition-colors text-left font-medium"
                  type="button"
                >
                  📍 Gurugram (Vikas Sadan / Cyber City)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCity?.('delhi-anandvihar')}
                  className="hover:text-primary transition-colors text-left font-medium"
                  type="button"
                >
                  📍 Delhi (Anand Vihar CAAQMS)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCity?.('mumbai-bandra')}
                  className="hover:text-primary transition-colors text-left font-medium"
                  type="button"
                >
                  📍 Mumbai (Bandra Kurla MPCB)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCity?.('bengaluru-btm')}
                  className="hover:text-primary transition-colors text-left font-medium"
                  type="button"
                >
                  📍 Bengaluru (BTM Layout KSPCB)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCity?.('kolkata-victoria')}
                  className="hover:text-primary transition-colors text-left font-medium"
                  type="button"
                >
                  📍 Kolkata (Victoria WBPCB)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Protection Pillars & Tools */}
          <div className="space-y-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-primary">
              {lang === 'hi' ? 'सुरक्षा टूल्स व गाइड' : 'Protection Tools & Guides'}
            </h3>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li>
                <a href="#mask-guide" className="hover:text-primary transition-colors">
                  🛡️ N95 vs Surgical Mask Benchmark
                </a>
              </li>
              <li>
                <a href="#hourly-forecast" className="hover:text-primary transition-colors">
                  ⏳ 24-Hour Diurnal Breathing Curve
                </a>
              </li>
              <li>
                <a href="#recommendations" className="hover:text-primary transition-colors">
                  🍳 3-Minute Kitchen Tadka Protocol
                </a>
              </li>
              <li>
                <a href="#recommendations" className="hover:text-primary transition-colors">
                  🪟 Midday Solar Window Ventilation
                </a>
              </li>
              <li>
                <a href="#recommendations" className="hover:text-primary transition-colors">
                  🌬️ DIY ₹1,200 Corsi-Rosenthal Fan
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust, Ethics & Legal */}
          <div className="space-y-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-primary">
              {lang === 'hi' ? 'पारदर्शिता व नीति' : 'Transparency & Legal'}
            </h3>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors font-semibold text-secondary">
                  🔒 Privacy Policy &amp; Data Ethics
                </Link>
              </li>
              <li>
                <a
                  href="https://cpcb.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  <span>CPCB Official Portal</span>
                  <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                </a>
              </li>
              <li>
                <a
                  href="https://open-meteo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  <span>Open-Meteo Telemetry</span>
                  <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                </a>
              </li>
              <li>
                <button
                  onClick={scrollToTop}
                  className="hover:text-primary transition-colors inline-flex items-center gap-1 font-semibold text-primary pt-2"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                  Back to Top
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright ribbon */}
        <div className="pt-6 border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-on-surface-variant">
          <p>© 2026 AQI VayuMitra (वायुमित्र). Built with Next.js 14, Tailwind CSS, &amp; CPCB NAQI Engine.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <span className="text-secondary font-semibold">Zero-Cookie Tracking</span>
            <span>•</span>
            <span>100% Verifiable Provenance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
