import { describe, it, expect } from 'vitest';
import { calculateSubIndex, getAqiCategory, buildPollutantDetails } from '@/lib/cpcb-aqi';

describe('CPCB Indian NAQI Calculator', () => {
  it('correctly calculates sub-indices for PM2.5 breakpoints', () => {
    // 0-30 -> 0-50
    expect(calculateSubIndex(15, [
      { cLow: 0, cHigh: 30, iLow: 0, iHigh: 50 },
    ])).toBe(25);

    // Extreme high value capped safely
    expect(calculateSubIndex(550, [
      { cLow: 250, cHigh: 500, iLow: 401, iHigh: 500 },
    ])).toBe(500);
  });

  it('correctly categorizes CPCB AQI severity levels with bilingual labels', () => {
    expect(getAqiCategory(35).severity).toBe('Good');
    expect(getAqiCategory(75).severity).toBe('Satisfactory');
    expect(getAqiCategory(150).severity).toBe('Moderate');
    expect(getAqiCategory(250).severity).toBe('Poor');
    expect(getAqiCategory(350).severity).toBe('Very Poor');
    expect(getAqiCategory(450).severity).toBe('Severe');
    expect(getAqiCategory(450).hindiSeverity).toContain('अत्यंत गंभीर');
  });

  it('identifies dominant pollutant and builds WHO comparative multipliers', () => {
    const result = buildPollutantDetails({
      pm25: 120, // subindex: 300
      pm10: 100, // subindex: 100
      no2: 40,   // subindex: 50
    });

    expect(result.dominantPollutant).toBe('PM2.5');
    expect(result.aqi).toBe(300);
    expect(result.pm25.multiplierVsWHO).toBe('8.0x WHO');
  });
});
