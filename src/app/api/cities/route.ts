import { NextRequest, NextResponse } from 'next/server';
import { appCache } from '@/lib/cache';
import { INDIAN_LOCATIONS } from '@/lib/indian-cities';
import { sanitizeCityQuery } from '@/lib/sanitization';
import { IndianLocation } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json(INDIAN_LOCATIONS.slice(0, 15));
    }

    const cleanQuery = sanitizeCityQuery(query);
    const cacheKey = `cities:${cleanQuery.toLowerCase()}`;
    const cached = appCache.get<IndianLocation[]>(cacheKey);

    if (cached) {
      return NextResponse.json(cached.data);
    }

    // First check local curated catalog
    const localMatches = INDIAN_LOCATIONS.filter(
      (loc) =>
        loc.name.toLowerCase().includes(cleanQuery.toLowerCase()) ||
        loc.state.toLowerCase().includes(cleanQuery.toLowerCase())
    );

    // Call Open-Meteo Geocoding API for India to support ANY city/district/town in India
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      cleanQuery
    )}&count=10&language=en&format=json&country=IN`;

    try {
      const geoRes = await fetch(geocodingUrl, {
        headers: { 'Accept': 'application/json' },
      });

      if (geoRes.ok) {
        const geoData = await geoRes.json();
        if (geoData.results && Array.isArray(geoData.results)) {
          const apiMatches: IndianLocation[] = geoData.results.map((r: {
            id: number;
            name: string;
            admin1?: string;
            latitude: number;
            longitude: number;
          }) => ({
            id: `geo-${r.id}`,
            name: `${r.name}${r.admin1 ? `, ${r.admin1}` : ''}`,
            state: r.admin1 || 'India',
            stationName: `${r.name} Ambient Air Quality Station`,
            stationCode: `IN-${r.admin1 ? r.admin1.slice(0, 2).toUpperCase() : 'AQ'}-${Math.abs(r.id) % 99}`,
            latitude: r.latitude,
            longitude: r.longitude,
          }));

          // Merge local and API matches, avoiding duplicate coordinates
          const combined = [...localMatches];
          for (const item of apiMatches) {
            const exists = combined.some(
              (c) =>
                Math.abs(c.latitude - item.latitude) < 0.05 &&
                Math.abs(c.longitude - item.longitude) < 0.05
            );
            if (!exists) {
              combined.push(item);
            }
          }

          appCache.set(cacheKey, combined.slice(0, 15), 60 * 60 * 1000); // 1 hour cache
          return NextResponse.json(combined.slice(0, 15));
        }
      }
    } catch {
      // Fallback to local catalog if external geocoding fails
    }

    return NextResponse.json(localMatches.slice(0, 15));
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'City search error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
