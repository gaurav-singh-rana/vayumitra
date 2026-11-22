import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found (404)',
  description: 'The requested air quality monitor page could not be found on AQI VayuMitra.',
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-3xl p-8 shadow-xl border border-surface-container space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Animated Vortex Icon */}
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-sky-400 p-0.5 shadow-lg shadow-teal-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-surface-container-lowest rounded-[14px] flex items-center justify-center">
            <span className="material-symbols-outlined text-[42px] text-primary animate-pulse">
              air
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-error-container text-error font-heading text-xs font-bold uppercase tracking-wider">
            Error 404 • Missing Air Corridor
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-on-surface">
            Air Stream Not Found
          </h1>
          <p className="font-heading text-sm text-secondary font-medium">
            (वायु मार्ग उपलब्ध नहीं है)
          </p>
          <p className="text-sm text-on-surface-variant leading-relaxed max-w-md mx-auto pt-1">
            The page, monitoring station, or health advisory you requested does not exist or has been shifted to a clean corridor.
          </p>
        </div>

        {/* Quick Links to Major Stations */}
        <div className="pt-2 border-t border-surface-container">
          <p className="text-xs font-heading font-semibold text-on-surface-variant mb-3">
            Quickly jump to Live CPCB Stations:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-xs font-heading font-medium transition-all"
            >
              📍 Gurugram (Vikas Sadan)
            </Link>
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-xs font-heading font-medium transition-all"
            >
              📍 Delhi (Anand Vihar)
            </Link>
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-xs font-heading font-medium transition-all"
            >
              📍 Mumbai (Bandra)
            </Link>
          </div>
        </div>

        {/* Primary Return Action */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-heading text-sm font-bold shadow-md hover:bg-primary-container transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            Return to Live AQI Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
