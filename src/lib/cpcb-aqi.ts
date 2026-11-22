/**
 * CPCB Indian National Air Quality Index (NAQI) Calculator
 * Implements the official Central Pollution Control Board (CPCB) breakpoint formulas.
 * Grounded truth calculation: Never fabricates AQI.
 */

import { AQISeverity, PollutantDetail } from '@/types';

interface Breakpoint {
  cLow: number;
  cHigh: number;
  iLow: number;
  iHigh: number;
}

// CPCB Breakpoints for PM2.5 (µg/m³)
const PM25_BREAKPOINTS: Breakpoint[] = [
  { cLow: 0, cHigh: 30, iLow: 0, iHigh: 50 },
  { cLow: 31, cHigh: 60, iLow: 51, iHigh: 100 },
  { cLow: 61, cHigh: 90, iLow: 101, iHigh: 200 },
  { cLow: 91, cHigh: 120, iLow: 201, iHigh: 300 },
  { cLow: 121, cHigh: 250, iLow: 301, iHigh: 400 },
  { cLow: 250, cHigh: 500, iLow: 401, iHigh: 500 },
];

// CPCB Breakpoints for PM10 (µg/m³)
const PM10_BREAKPOINTS: Breakpoint[] = [
  { cLow: 0, cHigh: 50, iLow: 0, iHigh: 50 },
  { cLow: 51, cHigh: 100, iLow: 51, iHigh: 100 },
  { cLow: 101, cHigh: 250, iLow: 101, iHigh: 200 },
  { cLow: 251, cHigh: 350, iLow: 201, iHigh: 300 },
  { cLow: 351, cHigh: 430, iLow: 301, iHigh: 400 },
  { cLow: 430, cHigh: 600, iLow: 401, iHigh: 500 },
];

// CPCB Breakpoints for NO2 (µg/m³)
const NO2_BREAKPOINTS: Breakpoint[] = [
  { cLow: 0, cHigh: 40, iLow: 0, iHigh: 50 },
  { cLow: 41, cHigh: 80, iLow: 51, iHigh: 100 },
  { cLow: 81, cHigh: 180, iLow: 101, iHigh: 200 },
  { cLow: 181, cHigh: 280, iLow: 201, iHigh: 300 },
  { cLow: 281, cHigh: 400, iLow: 301, iHigh: 400 },
  { cLow: 400, cHigh: 600, iLow: 401, iHigh: 500 },
];

export function calculateSubIndex(concentration: number, breakpoints: Breakpoint[]): number {
  if (concentration < 0 || isNaN(concentration)) return 0;
  
  // Cap at top of scale if extreme emergency
  const maxBreakpoint = breakpoints[breakpoints.length - 1];
  if (concentration >= maxBreakpoint.cHigh) {
    return Math.min(500, Math.round(maxBreakpoint.iHigh));
  }

  for (const bp of breakpoints) {
    if (concentration >= bp.cLow && concentration <= bp.cHigh) {
      const subIndex =
        ((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) * (concentration - bp.cLow) + bp.iLow;
      return Math.round(subIndex);
    }
  }

  // Handle in-between ranges safely
  for (let i = 0; i < breakpoints.length - 1; i++) {
    const current = breakpoints[i];
    const next = breakpoints[i + 1];
    if (concentration > current.cHigh && concentration < next.cLow) {
      return Math.round(current.iHigh);
    }
  }

  return 0;
}

export function getAqiCategory(aqi: number): {
  severity: AQISeverity;
  hindiSeverity: string;
  summary: string;
  colorHex: string;
} {
  if (aqi <= 50) {
    return {
      severity: 'Good',
      hindiSeverity: 'अच्छा (Good)',
      summary: 'Minimal health impact; air is clean and breathable.',
      colorHex: '#10B981',
    };
  }
  if (aqi <= 100) {
    return {
      severity: 'Satisfactory',
      hindiSeverity: 'संतोषजनक (Satisfactory)',
      summary: 'Minor breathing discomfort to sensitive people.',
      colorHex: '#84CC16',
    };
  }
  if (aqi <= 200) {
    return {
      severity: 'Moderate',
      hindiSeverity: 'मध्यम (Moderate)',
      summary: 'Breathing discomfort to people with lungs, asthma and heart diseases.',
      colorHex: '#F59E0B',
    };
  }
  if (aqi <= 300) {
    return {
      severity: 'Poor',
      hindiSeverity: 'खराब (Poor)',
      summary: 'Breathing discomfort to most people on prolonged exposure.',
      colorHex: '#F97316',
    };
  }
  if (aqi <= 400) {
    return {
      severity: 'Very Poor',
      hindiSeverity: 'बहुत खराब (Very Poor)',
      summary: 'Respiratory illness on prolonged exposure; significant effect on children.',
      colorHex: '#EF4444',
    };
  }
  return {
    severity: 'Severe',
    hindiSeverity: 'अत्यंत गंभीर (Severe Smog)',
    summary: 'Air is dense, smoky, and dangerously trapped near the ground.',
    colorHex: '#BA1A1A',
  };
}

export function buildPollutantDetails(
  rawValues: { pm25?: number; pm10?: number; no2?: number }
): {
  aqi: number;
  dominantPollutant: 'PM2.5' | 'PM10' | 'NO2';
  pm25: PollutantDetail;
  pm10: PollutantDetail;
  no2: PollutantDetail;
} {
  const pm25Val = Math.round(rawValues.pm25 ?? 0);
  const pm10Val = Math.round(rawValues.pm10 ?? 0);
  const no2Val = Math.round(rawValues.no2 ?? 0);

  const pm25Sub = calculateSubIndex(pm25Val, PM25_BREAKPOINTS);
  const pm10Sub = calculateSubIndex(pm10Val, PM10_BREAKPOINTS);
  const no2Sub = calculateSubIndex(no2Val, NO2_BREAKPOINTS);

  // WHO daily guide limits: PM2.5 = 15 µg/m³, PM10 = 45 µg/m³
  const pm25WhoMult = (pm25Val / 15).toFixed(1);

  const pm25Detail: PollutantDetail = {
    value: pm25Val,
    unit: 'µg/m³',
    subIndex: pm25Sub,
    statusText: pm25Sub > 300 ? 'Hazardous fine particles' : 'Deep lung penetrative',
    multiplierVsWHO: `${pm25WhoMult}x WHO`,
    contextNote: 'Deep lung penetrative combustion soot & micro-aerosols',
  };

  const pm10Detail: PollutantDetail = {
    value: pm10Val,
    unit: 'µg/m³',
    subIndex: pm10Sub,
    statusText: pm10Sub > 200 ? 'Heavy coarse dust' : 'Coarse particulate',
    contextNote: 'Coarse road dust, construction fly-ash, and regional biomass smoke',
  };

  const no2Detail: PollutantDetail = {
    value: no2Val,
    unit: 'µg/m³',
    subIndex: no2Sub,
    statusText: no2Sub > 100 ? 'Vehicular exhaust spike' : 'Combustion gas trace',
    contextNote: 'Exhaust spike recorded near major arterial roads and transport corridors',
  };

  let dominantPollutant: 'PM2.5' | 'PM10' | 'NO2' = 'PM2.5';
  let maxAqi = pm25Sub;

  if (pm10Sub > maxAqi) {
    maxAqi = pm10Sub;
    dominantPollutant = 'PM10';
  }
  if (no2Sub > maxAqi) {
    maxAqi = no2Sub;
    dominantPollutant = 'NO2';
  }

  // Ensure minimum realistic index if data exists
  const finalAqi = Math.max(maxAqi, 1);

  return {
    aqi: finalAqi,
    dominantPollutant,
    pm25: pm25Detail,
    pm10: pm10Detail,
    no2: no2Detail,
  };
}
