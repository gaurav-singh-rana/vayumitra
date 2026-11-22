/**
 * VayuMitra Type Definitions
 * Strictly aligned with the PRD Data Model and Acceptance Criteria
 */

export type PersonaType =
  | 'parents_young_children'
  | 'seniors_respiratory'
  | 'daily_commuter'
  | 'wfh_homemaker';

export interface HouseholdProfile {
  id: PersonaType;
  label: string;
  hindiLabel: string;
  name: string;
  ageContext: string;
  description: string;
  icon: string;
  sensitivities: string[];
  defaultCityId: string;
}

export interface IndianLocation {
  id: string;
  name: string;
  state: string;
  stationName: string;
  stationCode: string;
  latitude: number;
  longitude: number;
  isPreset?: boolean;
  presetPersona?: PersonaType;
}

export type AQISeverity =
  | 'Good'
  | 'Satisfactory'
  | 'Moderate'
  | 'Poor'
  | 'Very Poor'
  | 'Severe';

export interface PollutantDetail {
  value: number;
  unit: string;
  subIndex: number;
  statusText: string;
  multiplierVsWHO?: string;
  contextNote?: string;
}

export interface AirQualitySnapshot {
  locationId: string;
  locationName: string;
  stationCode: string;
  timestamp: string; // ISO 8601 string from data source
  sourceName: string; // e.g., "CPCB / Open-Meteo Air Telemetry"
  aqi: number;
  severity: AQISeverity;
  hindiSeverity: string;
  dominantPollutant: 'PM2.5' | 'PM10' | 'NO2' | 'SO2' | 'CO' | 'O3';
  summary: string;
  inversionRisk: 'Low' | 'Moderate' | 'High' | 'Severe';
  inversionWindowText: string;
  pollutants: {
    pm25: PollutantDetail;
    pm10: PollutantDetail;
    no2: PollutantDetail;
    so2?: PollutantDetail;
    co?: PollutantDetail;
    o3?: PollutantDetail;
  };
  windSpeedKmH: number;
  windDirection: string;
  dispersionRateText: string;
  temperatureC?: number;
  humidityPct?: number;
  weatherCondition?: string;
  uvIndex?: number;
  rankInIndia?: number;
  fromCache?: boolean;
  hourlyForecast?: HourlyForecastItem[];
}

export interface HourlyForecastItem {
  time: string;
  hour: number;
  aqi: number;
  pm25: number;
  severity: AQISeverity;
  isSafeWindow?: boolean;
}

export interface RoutineItem {
  id: string;
  timeWindow: string; // e.g. "07:00 – 11:00 AM"
  period: 'Morning' | 'Afternoon' | 'Evening';
  statusTag: string; // e.g. "Hazardous Peak", "Safest Window", "Resettling"
  severityClass: 'error' | 'secondary' | 'primary' | 'warning';
  title: string;
  description: string;
  badges: Array<{
    icon: string;
    text: string;
    variant: 'error' | 'secondary' | 'primary' | 'neutral';
  }>;
  highlightAction?: {
    icon: string;
    text: string;
    aqiEstimate: string;
  };
}

export interface IndoorHack {
  step: string; // e.g. "01"
  title: string;
  subtitle: string;
  category: 'budget' | 'purifier';
  statusBadge: {
    text: string;
    variant: 'locked' | 'active' | 'warning';
  };
  highlightBanner: {
    title: string;
    subtitle: string;
  };
  absoluteRule: {
    rule: string;
    explanation: string;
  };
  jugaadShield?: {
    title: string;
    content: string;
  };
  rulesList?: Array<{
    icon: string;
    title: string;
    desc: string;
  }>;
}

export interface SustainableAlternative {
  mode: string;
  type: 'unshielded' | 'recommended';
  title: string;
  badge: string;
  duration: string;
  cost: string;
  emissions: string;
  emissionsHighlight: boolean;
  notes: string;
}

export interface RecommendationPlan {
  verdict: {
    headline: string;
    subline: string;
    score: number; // 0-100 Clean Air Shield score
    rankTitle: string; // e.g. "Clean Air Sentinel", "Vayu Rishi"
    rankPercentile: string; // e.g. "Top 14% Dwarka"
    pointsToNextRank: number;
    sparedPm25: string; // e.g. "148 µg/day"
    sparedCigarettesEquiv: string; // e.g. "≈ 7 passive cigarettes spared"
    avertedCo2: string; // e.g. "4.2 kg"
  };
  routineItems: RoutineItem[];
  indoorHacks: IndoorHack[];
  alternatives: SustainableAlternative[];
  generatedAt: string;
  source: 'gemini' | 'grounded_rules';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  groundedSource?: string;
  healthVerdict?: string;
  indoorAlternate?: string;
  shieldingStat?: string;
  protocolSteps?: Array<{ step: number; title: string; desc: string }>;
  audioDuration?: string;
}
