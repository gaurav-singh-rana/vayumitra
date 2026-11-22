import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/chat/route';
import { NextRequest } from 'next/server';
import { AirQualitySnapshot } from '@/types';

const mockSnapshot: AirQualitySnapshot = {
  locationId: 'gurugram-cyberhub',
  locationName: 'Gurugram (Cyber Hub)',
  stationCode: 'HR-HSPCB-01',
  timestamp: new Date().toISOString(),
  sourceName: 'CPCB / CAAQMS Telemetry',
  aqi: 183,
  usAqi: 281,
  severity: 'Moderate',
  hindiSeverity: 'मध्यम',
  dominantPollutant: 'PM2.5',
  summary: 'Midday solar convective dispersion active',
  inversionRisk: 'Low',
  inversionWindowText: '1:00 PM – 3:30 PM (Solar Convection Window)',
  pollutants: {
    pm25: { value: 85, unit: 'µg/m³', subIndex: 183, statusText: 'Moderate', multiplierVsWHO: '17x WHO Limit' },
    pm10: { value: 168, unit: 'µg/m³', subIndex: 145, statusText: 'Moderate' },
    no2: { value: 38, unit: 'µg/m³', subIndex: 48, statusText: 'Good' },
  },
  windSpeedKmH: 3.6,
  windDirection: 'NW',
  dispersionRateText: 'Moderate',
  temperatureC: 25,
  humidityPct: 41,
};

function createRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('Ask Vayu Grounded Chat Copilot', () => {
  it('rejects empty or missing air quality context', async () => {
    const req = createRequest({ message: 'Can I play cricket?' });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('rejects sanitized input exceeding limit or blank', async () => {
    const req = createRequest({ message: '   ', snapshot: mockSnapshot });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('answers outdoor sports/cricket question with grounded solar window and protocols', async () => {
    const req = createRequest({
      message: 'Can Aarav play cricket in the park today?',
      personaId: 'parents_young_children',
      snapshot: mockSnapshot,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.role).toBe('assistant');
    expect(data.content).toContain('183');
    expect(data.protocolSteps).toBeDefined();
    expect(data.protocolSteps.length).toBe(3);
    expect(data.healthVerdict).toBeDefined();
    expect(data.shieldingStat).toBeDefined();
  });

  it('answers window ventilation question with midday timing advice', async () => {
    const req = createRequest({
      message: 'When should I open windows for fresh air?',
      personaId: 'wfh_homemaker',
      snapshot: mockSnapshot,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.content).toContain('1:00 PM – 3:30 PM');
    expect(data.protocolSteps[1].title).toContain('Cross');
  });

  it('answers kitchen tadka smoke question with 3-minute pre-exhaust rule', async () => {
    const req = createRequest({
      message: 'How to do kitchen tadka without making indoor air toxic?',
      personaId: 'wfh_homemaker',
      snapshot: mockSnapshot,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.content).toContain('3-Minute');
    expect(data.protocolSteps[0].title).toContain('Pre-Exhaust');
  });

  it('answers mask question distinguishing N95 from cloth masks', async () => {
    const req = createRequest({
      message: 'Which mask to wear: N95 or cloth mask?',
      personaId: 'daily_commuter',
      snapshot: mockSnapshot,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.content).toContain('N95');
    expect(data.shieldingStat).toBeDefined();
  });

  it('answers senior asthma wheezing question with clinical protocol', async () => {
    const req = createRequest({
      message: 'Dadaji is wheezing at night, what bedtime protocol to follow?',
      personaId: 'seniors_respiratory',
      snapshot: mockSnapshot,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.content).toContain('Sharma');
    expect(data.protocolSteps[0].title).toContain('Sleep Sanctuary');
  });

  it('answers commute question advising car recirculation and metro', async () => {
    const req = createRequest({
      message: 'How to commute safely to office in car on NH-48?',
      personaId: 'daily_commuter',
      snapshot: mockSnapshot,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.content).toContain('Recirculation Mode');
  });

  it('answers in Hindi/Hinglish when user asks in Hindi', async () => {
    const req = createRequest({
      message: 'kya aarav bahar khel sakta hai?',
      personaId: 'parents_young_children',
      snapshot: mockSnapshot,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.content).toContain('CPCB AQI');
  });

  it('explains project alignment and PromptWars Challenge 6 methodology', async () => {
    const req = createRequest({
      message: 'What is VayuMitra project and how does it solve PromptWars Challenge 6?',
      personaId: 'parents_young_children',
      snapshot: mockSnapshot,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.content).toContain('PromptWars Challenge 6');
  });
});
