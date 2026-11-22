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
    const cacheKey = `guidance:${profile.id}:${snapshot.locationId}:${snapshot.aqi}`;

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
    const message = err instanceof Error ? err.message : 'Failed to generate guidance plan';
    return NextResponse.json(
      { error: 'Unable to generate recommendations right now', detail: message },
      { status: 500 }
    );
  }
}
