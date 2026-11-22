import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Provenance',
  description:
    'Read about AQI VayuMitra’s strict privacy commitment: zero tracking cookies, 100% CPCB data provenance, and client-side persona storage.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col justify-between">
      {/* Header Bar */}
      <header className="border-b border-surface-container bg-surface/90 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-sky-400 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-cyan-400">
                air
              </span>
            </div>
          </div>
          <span className="font-heading font-extrabold text-base tracking-tight text-on-surface">
            AQI <span className="text-secondary font-black">VayuMitra</span> .IN
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-xs font-heading font-semibold transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Live Dashboard
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8 flex-1">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-heading text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px]">shield_check</span>
            Strict Privacy &amp; Data Ethics
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Privacy Policy &amp; Data Provenance
          </h1>
          <p className="text-sm text-on-surface-variant font-medium">
            Effective Date: November 2026 • Aligned with Indian Digital Personal Data Protection (DPDP) Act
          </p>
        </div>

        {/* Section 1: Zero Tracking Commitment */}
        <section className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-surface-container shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-primary font-heading font-bold text-lg">
            <span className="material-symbols-outlined text-secondary">cookie_off</span>
            <h2>1. Zero Cookie Tracking &amp; No Commercial Profiling</h2>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            AQI VayuMitra (वायुमित्र) was built on the fundamental principle that clean air information is a public human right, not a vector for surveillance capitalism. We do <strong>not</strong> use advertising cookies, third-party user tracking pixels (e.g. Meta Pixel, TikTok tracking), or cross-site identity graphs.
          </p>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Your location coordinates, when requested via browser geolocation, are solely used on-device in real-time to locate the nearest CPCB monitoring station. They are <strong>never logged, never stored on our database servers, and never sold to data brokers</strong>.
          </p>
        </section>

        {/* Section 2: Sensor Provenance & Telemetry */}
        <section className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-surface-container shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-primary font-heading font-bold text-lg">
            <span className="material-symbols-outlined text-secondary">sensors</span>
            <h2>2. Sensor Provenance &amp; Mathematical Transparency</h2>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            All air quality metrics displayed on this portal originate from verifiable scientific data pipelines:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-on-surface-variant">
            <li>
              <strong>Central Pollution Control Board (CPCB) CAAQMS Stations:</strong> Verified Continuous Ambient Air Quality Monitoring Stations across India (e.g., Station <code>HR-HSPCB-01</code> at Vikas Sadan, Gurugram).
            </li>
            <li>
              <strong>Open-Meteo Air Quality &amp; Atmospheric Boundary Layer Telemetry:</strong> High-resolution boundary layer convective dispersion modeling, planetary boundary height calculation, and meteorological variables (temperature, relative humidity, wind velocity).
            </li>
            <li>
              <strong>Official CPCB NAQI Math:</strong> Sub-indices are computed using the official piecewise linear interpolation equation mandated by the Ministry of Environment, Forest and Climate Change (MoEFCC). Zero numbers are fabricated.
            </li>
          </ul>
        </section>

        {/* Section 3: Client-Side Storage */}
        <section className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-surface-container shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-primary font-heading font-bold text-lg">
            <span className="material-symbols-outlined text-secondary">devices</span>
            <h2>3. Client-Side Browser Storage</h2>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            To provide a seamless user experience, VayuMitra stores your selected household persona (e.g., Parents with Young Children, Senior Citizens) and language toggle (English or Hindi) strictly in your local browser’s <code>localStorage</code>. This data never leaves your device.
          </p>
        </section>

        {/* Section 4: Clinical Advisory Disclaimer */}
        <section className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-error/20 bg-error-container/20 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-error font-heading font-bold text-lg">
            <span className="material-symbols-outlined">health_and_safety</span>
            <h2>4. Preventative Health Disclaimer</h2>
          </div>
          <p className="text-sm text-on-surface leading-relaxed">
            VayuMitra’s household protection routines, N95 mask fit guides, kitchen tadka protocols, and Ask Vayu Copilot recommendations are preventative behavioral guidelines derived from peer-reviewed aerosol physics and clinical pulmonary literature.
          </p>
          <p className="text-sm text-on-surface leading-relaxed font-semibold">
            They are NOT a replacement for personalized clinical medical advice, prescription inhalers, or emergency healthcare services. If you or your family members experience acute wheezing, shortness of breath, chest constriction, or severe oxygen desaturation, consult a certified pulmonologist or visit the nearest hospital emergency room immediately.
          </p>
        </section>

        {/* Return Button */}
        <div className="pt-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-heading text-sm font-bold shadow-md hover:bg-primary-container transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Return to Live Gurugram AQI Dashboard
          </Link>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-surface-container py-6 text-center text-xs text-on-surface-variant">
        <p>© 2026 AQI VayuMitra (वायुमित्र) — PromptWars Challenge 6. Grounded in CPCB CAAQMS Telemetry.</p>
      </footer>
    </div>
  );
}
