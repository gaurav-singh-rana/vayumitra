import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vayumitra.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AQI VayuMitra (वायुमित्र) — Real-Time Indian Air Quality Index & Protection',
    template: '%s | AQI VayuMitra',
  },
  description:
    'Real-time Indian Air Quality Index (AQI), PM2.5 & PM10 monitoring, CPCB-grounded station telemetry, and personalized household clean-air protection protocols.',
  keywords: [
    'AQI India',
    'Air Quality Index Gurugram',
    'Delhi AQI',
    'PM2.5 Realtime',
    'CPCB CAAQMS',
    'VayuMitra',
    'Air Pollution Protection',
    'N95 Mask Guide',
    'Inversion Safe Window',
    'PromptWars Challenge 6',
  ],
  authors: [{ name: 'VayuMitra Engineering Team' }],
  creator: 'VayuMitra',
  publisher: 'VayuMitra Clean Air Initiative',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    title: 'AQI VayuMitra — Real-Time Indian Air Quality Index & Protection Plan',
    description:
      'Grounded CPCB CAAQMS air quality telemetry, diurnal inversion forecasting, and family clean-air routines for Indian households.',
    siteName: 'VayuMitra (वायुमित्र)',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AQI VayuMitra Dashboard — Real-time Indian Air Quality Index and Household Protection Plan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AQI VayuMitra — Real-Time Indian Air Quality Index & Clean-Air Plan',
    description:
      'Live Indian CPCB station telemetry, PM2.5 tracking, and personalized family air protection plans.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#003441',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface font-sans text-on-surface flex flex-col min-h-screen antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
        {children}
      </body>
    </html>
  );
}
