import { IndianLocation } from '@/types';

export const INDIAN_LOCATIONS: IndianLocation[] = [
  {
    id: 'delhi-anand-vihar',
    name: 'Delhi — Anand Vihar',
    state: 'Delhi-NCR',
    stationName: 'Anand Vihar, Delhi DPCC Station #04',
    stationCode: 'DL-DPCC-04',
    latitude: 28.6469,
    longitude: 77.3161,
    isPreset: true,
    presetPersona: 'parents_young_children',
  },
  {
    id: 'delhi-dwarka',
    name: 'Delhi — Dwarka Sec 14',
    state: 'Delhi-NCR',
    stationName: 'Dwarka Sector 8/14 CPCB Station',
    stationCode: 'DL-CPCB-18',
    latitude: 28.5921,
    longitude: 77.0460,
    isPreset: true,
    presetPersona: 'wfh_homemaker',
  },
  {
    id: 'kolkata-victoria',
    name: 'Kolkata — Victoria Memorial',
    state: 'West Bengal',
    stationName: 'Victoria Memorial Hall WBPCB Station',
    stationCode: 'WB-PCB-02',
    latitude: 22.5448,
    longitude: 88.3426,
    isPreset: true,
    presetPersona: 'seniors_respiratory',
  },
  {
    id: 'mumbai-bkc',
    name: 'Mumbai — Bandra Kurla Complex',
    state: 'Maharashtra',
    stationName: 'BKC MPCB Environmental Station',
    stationCode: 'MH-MPCB-09',
    latitude: 19.0662,
    longitude: 72.8687,
    isPreset: true,
    presetPersona: 'daily_commuter',
  },
  {
    id: 'lucknow-talkatora',
    name: 'Lucknow — Talkatora District',
    state: 'Uttar Pradesh',
    stationName: 'Talkatora Industrial Area UPPCB Station',
    stationCode: 'UP-PCB-05',
    latitude: 26.8310,
    longitude: 80.9020,
  },
  {
    id: 'bengaluru-btm',
    name: 'Bengaluru — BTM Layout',
    state: 'Karnataka',
    stationName: 'BTM Layout KSPCB Telemetry Station',
    stationCode: 'KA-PCB-03',
    latitude: 12.9166,
    longitude: 77.6101,
  },
  {
    id: 'patna-samanpura',
    name: 'Patna — Samanpura',
    state: 'Bihar',
    stationName: 'Samanpura BSPCB Ambient Air Station',
    stationCode: 'BR-PCB-01',
    latitude: 25.6154,
    longitude: 85.1010,
  },
  {
    id: 'hyderabad-sanathnagar',
    name: 'Hyderabad — Sanathnagar',
    state: 'Telangana',
    stationName: 'Sanathnagar TSPCB Station',
    stationCode: 'TS-PCB-04',
    latitude: 17.4566,
    longitude: 78.4418,
  },
  {
    id: 'pune-shivajinagar',
    name: 'Pune — Shivajinagar',
    state: 'Maharashtra',
    stationName: 'Shivajinagar IITM SAFAR Station',
    stationCode: 'MH-IITM-01',
    latitude: 18.5314,
    longitude: 73.8446,
  },
  {
    id: 'ahmedabad-maninagar',
    name: 'Ahmedabad — Maninagar',
    state: 'Gujarat',
    stationName: 'Maninagar GPCB Ambient Air Monitoring',
    stationCode: 'GJ-PCB-02',
    latitude: 22.9978,
    longitude: 72.6033,
  },
];

export function findLocationById(id: string): IndianLocation {
  const match = INDIAN_LOCATIONS.find((loc) => loc.id === id);
  return match || INDIAN_LOCATIONS[0];
}

export function searchLocations(query: string): IndianLocation[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return INDIAN_LOCATIONS.slice(0, 6);
  return INDIAN_LOCATIONS.filter(
    (loc) =>
      loc.name.toLowerCase().includes(clean) ||
      loc.state.toLowerCase().includes(clean) ||
      loc.stationName.toLowerCase().includes(clean)
  );
}
