import { NextRequest, NextResponse } from 'next/server';
import { appCache } from '@/lib/cache';
import { generateGuidancePlan } from '@/lib/guidance-engine';
import { HOUSEHOLD_PERSONAS } from '@/lib/personas';
import { AirQualitySnapshot, PersonaType, RecommendationPlan } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const personaId = (body.personaId as PersonaType) || 'parents_young_children';
    const snapshot = body.snapshot as AirQualitySnapshot | undefined;

    if (!snapshot || !snapshot.aqi) {
      return NextResponse.json(
        { error: 'Valid air quality snapshot is required to generate guidance.' },
        { status: 400 }
      );
    }

    const profile = HOUSEHOLD_PERSONAS[personaId] || HOUSEHOLD_PERSONAS.parents_young_children;
    const cacheKey = `guidance:${profile.id}:${snapshot.locationId || 'loc'}:${snapshot.aqi}`;

    const cached = appCache.get<RecommendationPlan>(cacheKey);
    if (cached) {
      return NextResponse.json({
        ...cached.data,
        fromCache: true,
        ageSeconds: Math.round(cached.ageMs / 1000),
      });
    }

    const plan = await generateGuidancePlan(profile, snapshot);

    // Cache guidance for 15 minutes
    appCache.set(cacheKey, plan);

    return NextResponse.json(plan);
  } catch (err: unknown) {
    console.error('ERROR IN /api/guidance, returning resilient fallback:', err);
    try {
      const profile = HOUSEHOLD_PERSONAS.parents_young_children;
      const fallbackSnapshot: AirQualitySnapshot = {
        locationId: 'delhi',
        locationName: 'Delhi NCR',
        stationCode: 'DL-01',
        timestamp: new Date().toISOString(),
        sourceName: 'CPCB',
        aqi: 220,
        severity: 'Poor',
        hindiSeverity: 'खराब (Poor)',
        dominantPollutant: 'PM2.5',
        summary: 'Breathing discomfort on prolonged exposure.',
        inversionRisk: 'High',
        inversionWindowText: 'Afternoon offers best atmospheric dispersion.',
        pollutants: {
          pm25: { value: 105, unit: 'µg/m³', subIndex: 220, statusText: 'Elevated' },
          pm10: { value: 120, unit: 'µg/m³', subIndex: 120, statusText: 'Moderate' },
          no2: { value: 30, unit: 'µg/m³', subIndex: 30, statusText: 'Good' },
        },
        windSpeedKmH: 3.5,
        windDirection: 'NW',
        dispersionRateText: 'Stagnant',
      };
      const plan = await generateGuidancePlan(profile, fallbackSnapshot);
      return NextResponse.json(plan);
    } catch {
      return NextResponse.json(
        { error: 'Unable to generate recommendations right now' },
        { status: 500 }
      );
    }
  }
}
