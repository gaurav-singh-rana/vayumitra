import { IndianLocation } from '@/types';

export const INDIAN_LOCATIONS: IndianLocation[] = [
  // --- Delhi-NCR ---
  {
    id: 'delhi-anand-vihar',
    name: 'Delhi — Anand Vihar',
    state: 'Delhi-NCR',
    stationName: 'Anand Vihar DPCC Continuous Telemetry #04',
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
    id: 'delhi-ito',
    name: 'Delhi — ITO Junction',
    state: 'Delhi-NCR',
    stationName: 'ITO Traffic Intersection DPCC Station',
    stationCode: 'DL-DPCC-01',
    latitude: 28.6294,
    longitude: 77.2405,
  },
  {
    id: 'noida-sec62',
    name: 'Noida — Sector 62',
    state: 'Uttar Pradesh (NCR)',
    stationName: 'Sector 62 UPPCB Ambient Air Station',
    stationCode: 'UP-NOI-01',
    latitude: 28.6270,
    longitude: 77.3686,
  },
  {
    id: 'gurugram-cyberhub',
    name: 'Gurugram — Cyber City / DLF',
    state: 'Haryana (NCR)',
    stationName: 'Gwal Pahari / Cyber City HSPCB Station',
    stationCode: 'HR-GUR-02',
    latitude: 28.4900,
    longitude: 77.0900,
  },
  {
    id: 'ghaziabad-vasundhara',
    name: 'Ghaziabad — Vasundhara',
    state: 'Uttar Pradesh (NCR)',
    stationName: 'Vasundhara UPPCB Continuous Station',
    stationCode: 'UP-GZB-03',
    latitude: 28.6600,
    longitude: 77.3700,
  },
  {
    id: 'faridabad-sec16a',
    name: 'Faridabad — Sector 16A',
    state: 'Haryana (NCR)',
    stationName: 'Sector 16A HSPCB Station',
    stationCode: 'HR-FBD-01',
    latitude: 28.4100,
    longitude: 77.3200,
  },

  // --- Maharashtra ---
  {
    id: 'mumbai-bkc',
    name: 'Mumbai — Bandra Kurla Complex',
    state: 'Maharashtra',
    stationName: 'BKC MPCB Environmental Monitoring Station',
    stationCode: 'MH-MPCB-09',
    latitude: 19.0662,
    longitude: 72.8687,
    isPreset: true,
    presetPersona: 'daily_commuter',
  },
  {
    id: 'mumbai-colaba',
    name: 'Mumbai — Colaba',
    state: 'Maharashtra',
    stationName: 'Colaba Coastal MPCB Station',
    stationCode: 'MH-MPCB-02',
    latitude: 18.9067,
    longitude: 72.8147,
  },
  {
    id: 'pune-shivajinagar',
    name: 'Pune — Shivajinagar',
    state: 'Maharashtra',
    stationName: 'Shivajinagar IITM-SAFAR Air Station',
    stationCode: 'MH-IITM-01',
    latitude: 18.5314,
    longitude: 73.8446,
  },
  {
    id: 'nagpur-civil-lines',
    name: 'Nagpur — Civil Lines',
    state: 'Maharashtra',
    stationName: 'Civil Lines MPCB Station',
    stationCode: 'MH-NAG-01',
    latitude: 21.1458,
    longitude: 79.0882,
  },
  {
    id: 'nashik-cidco',
    name: 'Nashik — CIDCO',
    state: 'Maharashtra',
    stationName: 'CIDCO MPCB Telemetry Node',
    stationCode: 'MH-NSK-02',
    latitude: 19.9975,
    longitude: 73.7898,
  },

  // --- West Bengal ---
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
    id: 'kolkata-jadavpur',
    name: 'Kolkata — Jadavpur',
    state: 'West Bengal',
    stationName: 'Jadavpur WBPCB Air Lab',
    stationCode: 'WB-PCB-05',
    latitude: 22.4988,
    longitude: 88.3716,
  },
  {
    id: 'howrah-ghusuri',
    name: 'Howrah — Ghusuri',
    state: 'West Bengal',
    stationName: 'Ghusuri Industrial WBPCB Station',
    stationCode: 'WB-HWH-01',
    latitude: 22.6100,
    longitude: 88.3500,
  },

  // --- Uttar Pradesh ---
  {
    id: 'lucknow-talkatora',
    name: 'Lucknow — Talkatora / Lalbagh',
    state: 'Uttar Pradesh',
    stationName: 'Lalbagh UPPCB Ambient Air Monitoring',
    stationCode: 'UP-LKO-02',
    latitude: 26.8467,
    longitude: 80.9462,
  },
  {
    id: 'kanpur-kalyanpur',
    name: 'Kanpur — Kalyanpur',
    state: 'Uttar Pradesh',
    stationName: 'IIT Kanpur / Kalyanpur UPPCB Station',
    stationCode: 'UP-KNP-01',
    latitude: 26.4950,
    longitude: 80.2850,
  },
  {
    id: 'varanasi-bhu',
    name: 'Varanasi — BHU / Ardhali Bazar',
    state: 'Uttar Pradesh',
    stationName: 'Bhelupur / BHU UPPCB Telemetry',
    stationCode: 'UP-VNS-03',
    latitude: 25.2800,
    longitude: 82.9900,
  },
  {
    id: 'agra-sanjay-place',
    name: 'Agra — Sanjay Place',
    state: 'Uttar Pradesh',
    stationName: 'Sanjay Place UPPCB Taj Trapezium Station',
    stationCode: 'UP-AGR-01',
    latitude: 27.2000,
    longitude: 78.0100,
  },
  {
    id: 'prayagraj-civil-lines',
    name: 'Prayagraj — Civil Lines',
    state: 'Uttar Pradesh',
    stationName: 'Civil Lines UPPCB Monitoring Station',
    stationCode: 'UP-PRY-01',
    latitude: 25.4358,
    longitude: 81.8463,
  },
  {
    id: 'meerut-ganga-nagar',
    name: 'Meerut — Ganga Nagar',
    state: 'Uttar Pradesh',
    stationName: 'Ganga Nagar UPPCB Station',
    stationCode: 'UP-MRT-01',
    latitude: 28.9845,
    longitude: 77.7064,
  },

  // --- Karnataka ---
  {
    id: 'bengaluru-btm',
    name: 'Bengaluru — BTM Layout',
    state: 'Karnataka',
    stationName: 'BTM Layout KSPCB Telemetry Station',
    stationCode: 'KA-BLR-03',
    latitude: 12.9166,
    longitude: 77.6101,
  },
  {
    id: 'bengaluru-peenya',
    name: 'Bengaluru — Peenya Industrial',
    state: 'Karnataka',
    stationName: 'Peenya KSPCB Station',
    stationCode: 'KA-BLR-01',
    latitude: 13.0300,
    longitude: 77.5100,
  },
  {
    id: 'mysuru-kuvempu-nagar',
    name: 'Mysuru — Kuvempu Nagar',
    state: 'Karnataka',
    stationName: 'Kuvempu Nagar KSPCB Station',
    stationCode: 'KA-MYS-01',
    latitude: 12.2958,
    longitude: 76.6394,
  },

  // --- Tamil Nadu ---
  {
    id: 'chennai-velachery',
    name: 'Chennai — Velachery / Alandur',
    state: 'Tamil Nadu',
    stationName: 'Alandur Bus Depot TNPCB Station',
    stationCode: 'TN-CHN-02',
    latitude: 12.9975,
    longitude: 80.2014,
  },
  {
    id: 'coimbatore-sidco',
    name: 'Coimbatore — SIDCO Industrial',
    state: 'Tamil Nadu',
    stationName: 'SIDCO TNPCB Telemetry Station',
    stationCode: 'TN-CBE-01',
    latitude: 11.0168,
    longitude: 76.9558,
  },
  {
    id: 'madurai-anna-nagar',
    name: 'Madurai — Anna Nagar',
    state: 'Tamil Nadu',
    stationName: 'Anna Nagar TNPCB Ambient Station',
    stationCode: 'TN-MDU-01',
    latitude: 9.9252,
    longitude: 78.1198,
  },

  // --- Telangana & Andhra Pradesh ---
  {
    id: 'hyderabad-sanathnagar',
    name: 'Hyderabad — Sanathnagar',
    state: 'Telangana',
    stationName: 'Sanathnagar TSPCB Telemetry Station',
    stationCode: 'TS-HYD-04',
    latitude: 17.4566,
    longitude: 78.4418,
  },
  {
    id: 'hyderabad-hitec-city',
    name: 'Hyderabad — HITEC City / Gachibowli',
    state: 'Telangana',
    stationName: 'Central University / Gachibowli TSPCB Station',
    stationCode: 'TS-HYD-07',
    latitude: 17.4400,
    longitude: 78.3489,
  },
  {
    id: 'visakhapatnam-gajuwaka',
    name: 'Visakhapatnam — Gajuwaka',
    state: 'Andhra Pradesh',
    stationName: 'Gajuwaka Industrial APPCB Station',
    stationCode: 'AP-VIZ-01',
    latitude: 17.6900,
    longitude: 83.2100,
  },
  {
    id: 'vijayawada-benz-circle',
    name: 'Vijayawada — Benz Circle',
    state: 'Andhra Pradesh',
    stationName: 'Benz Circle APPCB Station',
    stationCode: 'AP-VJA-02',
    latitude: 16.5062,
    longitude: 80.6480,
  },

  // --- Gujarat ---
  {
    id: 'ahmedabad-maninagar',
    name: 'Ahmedabad — Maninagar',
    state: 'Gujarat',
    stationName: 'Maninagar GPCB Ambient Air Station',
    stationCode: 'GJ-AHM-02',
    latitude: 22.9978,
    longitude: 72.6033,
  },
  {
    id: 'surat-athwa',
    name: 'Surat — Athwa Lines',
    state: 'Gujarat',
    stationName: 'Athwa GPCB Monitoring Hub',
    stationCode: 'GJ-SRT-01',
    latitude: 21.1702,
    longitude: 72.8311,
  },
  {
    id: 'vadodara-alkapuri',
    name: 'Vadodara — Alkapuri',
    state: 'Gujarat',
    stationName: 'Alkapuri GPCB Telemetry',
    stationCode: 'GJ-VAD-01',
    latitude: 22.3072,
    longitude: 73.1812,
  },

  // --- Bihar & Jharkhand ---
  {
    id: 'patna-samanpura',
    name: 'Patna — Samanpura / Raja Bazar',
    state: 'Bihar',
    stationName: 'Samanpura BSPCB Ambient Air Station',
    stationCode: 'BR-PAT-01',
    latitude: 25.6154,
    longitude: 85.1010,
  },
  {
    id: 'gaya-civil-lines',
    name: 'Gaya — Collectorate / Civil Lines',
    state: 'Bihar',
    stationName: 'Collectorate BSPCB Station',
    stationCode: 'BR-GAY-01',
    latitude: 24.7955,
    longitude: 85.0002,
  },
  {
    id: 'muzaffarpur-gobarsahi',
    name: 'Muzaffarpur — Gobarsahi',
    state: 'Bihar',
    stationName: 'Gobarsahi BSPCB Station',
    stationCode: 'BR-MUZ-01',
    latitude: 26.1209,
    longitude: 85.3647,
  },
  {
    id: 'ranchi-doranda',
    name: 'Ranchi — Doranda',
    state: 'Jharkhand',
    stationName: 'Doranda JSPCB Station',
    stationCode: 'JH-RAN-01',
    latitude: 23.3441,
    longitude: 85.3096,
  },
  {
    id: 'jamshedpur-bistupur',
    name: 'Jamshedpur — Bistupur',
    state: 'Jharkhand',
    stationName: 'Bistupur JSPCB Industrial Node',
    stationCode: 'JH-JSR-02',
    latitude: 22.8046,
    longitude: 86.2029,
  },

  // --- Rajasthan ---
  {
    id: 'jaipur-adash-nagar',
    name: 'Jaipur — Adarsh Nagar',
    state: 'Rajasthan',
    stationName: 'Adarsh Nagar RSPCB Station',
    stationCode: 'RJ-JAI-02',
    latitude: 26.9000,
    longitude: 75.8200,
  },
  {
    id: 'jodhpur-soor-sagar',
    name: 'Jodhpur — Soor Sagar',
    state: 'Rajasthan',
    stationName: 'Soor Sagar RSPCB Telemetry',
    stationCode: 'RJ-JOD-01',
    latitude: 26.2900,
    longitude: 73.0000,
  },
  {
    id: 'kota-anantpura',
    name: 'Kota — Anantpura',
    state: 'Rajasthan',
    stationName: 'Anantpura RSPCB Industrial Station',
    stationCode: 'RJ-KOT-01',
    latitude: 25.1800,
    longitude: 75.8300,
  },

  // --- Punjab, Haryana & Chandigarh ---
  {
    id: 'chandigarh-sector22',
    name: 'Chandigarh — Sector 22',
    state: 'Chandigarh (UT)',
    stationName: 'Sector 22 CPCC Monitoring Station',
    stationCode: 'CH-CHD-01',
    latitude: 30.7333,
    longitude: 76.7794,
  },
  {
    id: 'ludhiana-punjab-agri',
    name: 'Ludhiana — PAU Campus',
    state: 'Punjab',
    stationName: 'PAU Campus PPCB Continuous Station',
    stationCode: 'PB-LDH-01',
    latitude: 30.9010,
    longitude: 75.8573,
  },
  {
    id: 'amritsar-golden-temple',
    name: 'Amritsar — Heritage Street',
    state: 'Punjab',
    stationName: 'Golden Temple Vicinity PPCB Station',
    stationCode: 'PB-ASR-02',
    latitude: 31.6200,
    longitude: 74.8765,
  },

  // --- Madhya Pradesh & Chhattisgarh ---
  {
    id: 'bhopal-t-t-nagar',
    name: 'Bhopal — T.T. Nagar',
    state: 'Madhya Pradesh',
    stationName: 'T.T. Nagar MPPCB Continuous Station',
    stationCode: 'MP-BHO-01',
    latitude: 23.2300,
    longitude: 77.4000,
  },
  {
    id: 'indore-vijay-nagar',
    name: 'Indore — Vijay Nagar',
    state: 'Madhya Pradesh',
    stationName: 'Vijay Nagar MPPCB Air Station',
    stationCode: 'MP-IND-02',
    latitude: 22.7533,
    longitude: 75.8937,
  },
  {
    id: 'gwalior-maharaj-bada',
    name: 'Gwalior — Maharaj Bada',
    state: 'Madhya Pradesh',
    stationName: 'City Center MPPCB Station',
    stationCode: 'MP-GWL-01',
    latitude: 26.2183,
    longitude: 78.1828,
  },
  {
    id: 'raipur-telibandha',
    name: 'Raipur — Telibandha',
    state: 'Chhattisgarh',
    stationName: 'Telibandha CECB Station',
    stationCode: 'CG-RPR-01',
    latitude: 21.2400,
    longitude: 81.6600,
  },

  // --- Kerala, Odisha, Assam & Uttarakhand ---
  {
    id: 'kochi-vytilla',
    name: 'Kochi — Vyttila Junction',
    state: 'Kerala',
    stationName: 'Vyttila Hub KSPCB Station',
    stationCode: 'KL-KOC-01',
    latitude: 9.9675,
    longitude: 76.3197,
  },
  {
    id: 'thiruvananthapuram-palayam',
    name: 'Thiruvananthapuram — Palayam',
    state: 'Kerala',
    stationName: 'Palayam KSPCB Telemetry',
    stationCode: 'KL-TRV-01',
    latitude: 8.5061,
    longitude: 76.9558,
  },
  {
    id: 'bhubaneswar-patia',
    name: 'Bhubaneswar — Patia / Saheed Nagar',
    state: 'Odisha',
    stationName: 'Patia OSPCB Monitoring Station',
    stationCode: 'OD-BBS-02',
    latitude: 20.3588,
    longitude: 85.8175,
  },
  {
    id: 'guwahati-pan-bazar',
    name: 'Guwahati — Pan Bazar',
    state: 'Assam',
    stationName: 'Pan Bazar PCBA Continuous Station',
    stationCode: 'AS-GUW-01',
    latitude: 26.1850,
    longitude: 91.7450,
  },
  {
    id: 'dehradun-isbt',
    name: 'Dehradun — Haridwar Road / ISBT',
    state: 'Uttarakhand',
    stationName: 'ISBT UEPPCB Ambient Air Station',
    stationCode: 'UK-DDN-01',
    latitude: 30.2800,
    longitude: 78.0100,
  },
];

export function findLocationById(id: string): IndianLocation {
  const match = INDIAN_LOCATIONS.find((loc) => loc.id === id);
  return match || INDIAN_LOCATIONS[0];
}

export function getPresetByCityName(cityName: string): IndianLocation | undefined {
  const clean = cityName.trim().toLowerCase();
  if (!clean) return undefined;
  return INDIAN_LOCATIONS.find(
    (loc) =>
      loc.name.toLowerCase().includes(clean) ||
      loc.state.toLowerCase().includes(clean) ||
      (clean === 'gurgaon' && loc.name.toLowerCase().includes('gurugram'))
  );
}

export function searchLocations(query: string): IndianLocation[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return INDIAN_LOCATIONS.slice(0, 8);
  return INDIAN_LOCATIONS.filter(
    (loc) =>
      loc.name.toLowerCase().includes(clean) ||
      loc.state.toLowerCase().includes(clean) ||
      loc.stationName.toLowerCase().includes(clean)
  );
}
