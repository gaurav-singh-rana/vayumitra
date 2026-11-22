import { HouseholdProfile, PersonaType } from '@/types';

export const HOUSEHOLD_PERSONAS: Record<PersonaType, HouseholdProfile> = {
  parents_young_children: {
    id: 'parents_young_children',
    label: 'Parent & Toddler (Aarav, 3y)',
    hindiLabel: 'अभिभावक एवं नन्हे बच्चे',
    name: 'Aarav (3y) & Family',
    ageContext: 'Active 3-year-old toddler with developing alveolar lung capacity',
    description: 'Managing school travel, outdoor park play, and indoor active hours in urban smog.',
    icon: 'child_care',
    sensitivities: ['High respiratory rate (2.4x adult air intake per kg)', 'Immature airway defenses'],
    defaultCityId: 'delhi-anand-vihar',
  },
  seniors_respiratory: {
    id: 'seniors_respiratory',
    label: 'Senior & Asthma (Kolkata)',
    hindiLabel: 'वरिष्ठ नागरिक एवं संवेदनशील',
    name: 'Mrs. Sen (68y, Wheeze History)',
    ageContext: 'Senior citizen with mild bronchial wheezing and COPD sensitivity',
    description: 'Cautious daily activity timing, bedtime protection protocol, and indoor air purification.',
    icon: 'elderly',
    sensitivities: ['Cardiopulmonary vulnerability', 'Severe early morning cold smog trigger'],
    defaultCityId: 'kolkata-victoria',
  },
  daily_commuter: {
    id: 'daily_commuter',
    label: 'Daily Commuter (Mumbai)',
    hindiLabel: 'दैनिक यात्री (ऑफिस कम्यूटर)',
    name: 'Rohan (Daily Peak Commuter)',
    ageContext: 'Office professional commuting 28 km round-trip in heavy urban traffic',
    description: 'Metro vs. car route exposure comparison, trip chaining, and transit cabin shielding.',
    icon: 'directions_subway',
    sensitivities: ['Underpass NO2 exhaust peaks', 'Stop-and-go diesel particulate inhalation'],
    defaultCityId: 'mumbai-bkc',
  },
  wfh_homemaker: {
    id: 'wfh_homemaker',
    label: 'WFH & Homemaker (Delhi)',
    hindiLabel: 'वर्क-फ्रॉम-होम एवं गृहणी',
    name: 'Pooja & Household',
    ageContext: 'Home-based professional balancing remote work and family kitchen management',
    description: 'Solar window ventilation timing, kitchen tadka containment, and ₹0 DIY hacks.',
    icon: 'home',
    sensitivities: ['Indoor cooking aerosol accumulation', 'Stagnant living room particulate drift'],
    defaultCityId: 'delhi-dwarka',
  },
};

export const PERSONA_LIST = Object.values(HOUSEHOLD_PERSONAS);
