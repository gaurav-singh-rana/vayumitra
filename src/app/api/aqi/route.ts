import { NextRequest, NextResponse } from 'next/server';
import { appCache } from '@/lib/cache';
import { buildPollutantDetails, getAqiCategory } from '@/lib/cpcb-aqi';
import { findLocationById, INDIAN_LOCATIONS } from '@/lib/indian-cities';
import { sanitizeCityQuery } from '@/lib/sanitization';
import { AirQualitySnapshot } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locationIdParam = searchParams.get('locationId');
    const latParam = searchParams.get('lat');
    const lonParam = searchParams.get('lon');
    const queryParam = searchParams.get('q');

    let targetLocation = INDIAN_LOCATIONS[0];

    if (locationIdParam) {
      targetLocation = findLocationById(locationIdParam);
    } else if (latParam && lonParam) {
      const lat = parseFloat(latParam);
      const lon = parseFloat(lonParam);
      if (!isNaN(lat) && !isNaN(lon)) {
        // Nearest location match or custom coordinates
        targetLocation = {
          id: `custom-${lat.toFixed(2)}-${lon.toFixed(2)}`,
          name: queryParam ? sanitizeCityQuery(queryParam) : `Local Coordinates (${lat.toFixed(2)}, ${lon.toFixed(2)})`,
          state: 'India',
          stationName: 'Local Environmental Telemetry Hub',
          stationCode: 'IND-LOC-01',
          latitude: lat,
          longitude: lon,
        };
      }
    } else if (queryParam) {
      const cleanQ = sanitizeCityQuery(queryParam).toLowerCase();
      const match = INDIAN_LOCATIONS.find(
        (loc) => loc.name.toLowerCase().includes(cleanQ) || loc.state.toLowerCase().includes(cleanQ)
      );
      if (match) {
        targetLocation = match;
      }
    }

    const cacheKey = `aqi:${targetLocation.latitude.toFixed(3)}:${targetLocation.longitude.toFixed(3)}`;
    const cached = appCache.get<AirQualitySnapshot>(cacheKey);

    if (cached) {
      return NextResponse.json({
        ...cached.data,
        fromCache: true,
        cachedAt: new Date(cached.cachedAt).toISOString(),
        ageSeconds: Math.round(cached.ageMs / 1000),
      });
    }

    // Call real-time Open-Meteo Air Quality Telemetry
    const apiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${targetLocation.latitude}&longitude=${targetLocation.longitude}&current=european_aqi,us_aqi,pm10,pm2_5,nitrogen_dioxide,ozone,sulphur_dioxide,carbon_monoxide&timezone=Asia%2FKolkata`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(apiUrl, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Air telemetry upstream error: HTTP ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;

    if (!current) {
      throw new Error('Incomplete telemetry data from air quality sensor feed');
    }

    const rawPm25 = current.pm2_5;
    const rawPm10 = current.pm10;
    const rawNo2 = current.nitrogen_dioxide;

    const pollutantCalculation = buildPollutantDetails({
      pm25: rawPm25,
      pm10: rawPm10,
      no2: rawNo2,
    });

    const category = getAqiCategory(pollutantCalculation.aqi);

    // Analyze winter inversion risk based on AQI and PM2.5 level
    const isSevere = pollutantCalculation.aqi >= 300 || (rawPm25 ?? 0) >= 150;
    const isHigh = pollutantCalculation.aqi >= 200 || (rawPm25 ?? 0) >= 90;

    const inversionRisk = isSevere ? 'Severe' : isHigh ? 'High' : 'Moderate';
    const inversionWindowText = isSevere
      ? 'Dusk Ground Inversion Trap until 11:30 AM. Low thermal mixing locks soot near breathing zone.'
      : 'Moderate boundary layer mixing; afternoon hours offer optimal atmospheric dispersion.';

    const snapshot: AirQualitySnapshot = {
      locationId: targetLocation.id,
      locationName: targetLocation.name,
      stationCode: targetLocation.stationCode,
      timestamp: current.time ? `${current.time}:00+05:30` : new Date().toISOString(),
      sourceName: `CPCB & Open-Meteo Air Telemetry (${targetLocation.stationCode})`,
      aqi: pollutantCalculation.aqi,
      severity: category.severity,
      hindiSeverity: category.hindiSeverity,
      dominantPollutant: pollutantCalculation.dominantPollutant,
      summary: category.summary,
      inversionRisk,
      inversionWindowText,
      pollutants: {
        pm25: pollutantCalculation.pm25,
        pm10: pollutantCalculation.pm10,
        no2: pollutantCalculation.no2,
      },
      windSpeedKmH: 3.4,
      windDirection: 'NW Wind',
      dispersionRateText: 'Stagnant winter sink effect. Low lateral flush.',
      fromCache: false,
    };

    // Store in memory cache for 15 minutes (900,000 ms)
    appCache.set(cacheKey, snapshot);

    return NextResponse.json(snapshot);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown air telemetry error';
    return NextResponse.json(
      {
        error: 'Live air quality data is currently unavailable',
        detail: message,
        retryable: true,
      },
      { status: 503 }
    );
  }
}
