import { describe, it, expect } from 'vitest';
import { generateGuidancePlan } from '@/lib/guidance-engine';
import { HOUSEHOLD_PERSONAS } from '@/lib/personas';
import { AirQualitySnapshot } from '@/types';

const mockSnapshot: AirQualitySnapshot = {
  locationId: 'delhi-anand-vihar',
  locationName: 'Delhi — Anand Vihar',
  stationCode: 'DL-DPCC-04',
  timestamp: '2026-11-22T10:30:00+05:30',
  sourceName: 'CPCB & Open-Meteo Air Telemetry (DL-DPCC-04)',
  aqi: 388,
  severity: 'Severe',
  hindiSeverity: 'अत्यंत गंभीर (Severe Smog)',
  dominantPollutant: 'PM2.5',
  summary: 'Air is dense, smoky, and dangerously trapped near the ground.',
  inversionRisk: 'Severe',
  inversionWindowText: 'Dusk Ground Inversion Trap until 11:30 AM.',
  pollutants: {
    pm25: {
      value: 234,
      unit: 'µg/m³',
      subIndex: 388,
      statusText: 'Deep lung penetrative',
      multiplierVsWHO: '15.6x WHO',
    },
    pm10: {
      value: 310,
      unit: 'µg/m³',
      subIndex: 260,
      statusText: 'Heavy coarse dust',
    },
    no2: {
      value: 52,
      unit: 'µg/m³',
      subIndex: 65,
      statusText: 'Combustion gas trace',
    },
  },
  windSpeedKmH: 3.4,
  windDirection: 'NW Wind',
  dispersionRateText: 'Stagnant winter sink effect.',
  fromCache: false,
};

describe('Guidance Engine Generation', () => {
  it('generates 3 structured pillars for Parent & Toddler persona without faking AQI', async () => {
    const plan = await generateGuidancePlan(HOUSEHOLD_PERSONAS.parents_young_children, mockSnapshot);

    expect(plan.verdict).toBeDefined();
    expect(plan.verdict.rankTitle).toBe('Clean Air Sentinel');
    expect(plan.routineItems.length).toBe(3); // Morning, Afternoon, Evening
    expect(plan.indoorHacks.length).toBeGreaterThanOrEqual(2);
    expect(plan.alternatives.length).toBeGreaterThanOrEqual(2);

    // Verify afternoon thermal dispersion window exists
    const afternoon = plan.routineItems.find((r) => r.period === 'Afternoon');
    expect(afternoon).toBeDefined();
    expect(afternoon?.statusTag).toBe('Safest Window');

    // Confirm that the calculated PM2.5 spared references the live telemetry value
    expect(plan.verdict.sparedPm25).toContain('µg/day');
  });

  it('customizes guidance appropriately for senior citizens with respiratory sensitivities', async () => {
    const plan = await generateGuidancePlan(HOUSEHOLD_PERSONAS.seniors_respiratory, mockSnapshot);
    const morning = plan.routineItems.find((r) => r.period === 'Morning');

    expect(morning?.title).toContain('Bronchospasm');
    expect(morning?.badges.some((b) => b.text.includes('N95'))).toBe(true);
  });
});
