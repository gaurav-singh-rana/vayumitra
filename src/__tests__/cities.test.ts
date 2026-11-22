import { describe, it, expect } from 'vitest';
import { INDIAN_LOCATIONS, getPresetByCityName, searchLocations } from '@/lib/indian-cities';

describe('Indian Cities & Geocoding Dataset', () => {
  it('has Gurugram as the default selection at index 0', () => {
    expect(INDIAN_LOCATIONS[0].id).toBe('gurugram-cyberhub');
    expect(INDIAN_LOCATIONS[0].name).toContain('Gurugram');
  });

  it('contains comprehensive major Indian metro and tier-2 presets', () => {
    expect(INDIAN_LOCATIONS.length).toBeGreaterThanOrEqual(15);
    
    const delhi = INDIAN_LOCATIONS.find((c) => c.name.toLowerCase().includes('delhi'));
    expect(delhi).toBeDefined();
    expect(delhi?.latitude).toBeCloseTo(28.65, 1);

    const gurugram = INDIAN_LOCATIONS.find((c) => c.name.toLowerCase().includes('gurugram'));
    expect(gurugram).toBeDefined();
    expect(gurugram?.latitude).toBeCloseTo(28.49, 1);

    const mumbai = INDIAN_LOCATIONS.find((c) => c.name.toLowerCase().includes('mumbai'));
    expect(mumbai).toBeDefined();

    const patna = INDIAN_LOCATIONS.find((c) => c.name.toLowerCase().includes('patna'));
    expect(patna).toBeDefined();
  });

  it('matches presets case-insensitively using getPresetByCityName (including Gurgaon alias)', () => {
    const preset = getPresetByCityName('GURGAON');
    expect(preset).toBeDefined();
    expect(preset?.name).toContain('Gurugram');

    const delhi = getPresetByCityName('delhi');
    expect(delhi).toBeDefined();

    const unknown = getPresetByCityName('NonExistentCityXYZ123');
    expect(unknown).toBeUndefined();
  });

  it('filters locations accurately using searchLocations query', () => {
    const results = searchLocations('patna');
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].name.toLowerCase()).toContain('patna');

    const emptyQuery = searchLocations('');
    expect(emptyQuery.length).toBe(8);
  });

  it('verifies all preset locations have valid coordinates and station codes', () => {
    for (const loc of INDIAN_LOCATIONS) {
      expect(loc.id).toBeTruthy();
      expect(loc.stationCode).toBeTruthy();
      expect(loc.latitude).toBeGreaterThan(6); // South India tip ~8 deg
      expect(loc.latitude).toBeLessThan(38);  // North tip ~37 deg
      expect(loc.longitude).toBeGreaterThan(68); // West tip ~68 deg
      expect(loc.longitude).toBeLessThan(98); // East tip ~97 deg
    }
  });
});
