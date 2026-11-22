export type Language = 'hi' | 'en';

export const TRANSLATIONS = {
  hi: {
    appTitle: 'VayuMitra',
    appSubtitle: 'वायुमित्र — स्वच्छ हवा साथी',
    tagline: 'भारत के आम परिवारों के लिए सरल और सच्ची वायु सलाह',
    liveBadge: 'CPCB लाइव टेलीमेट्री',
    sunoBtn: 'सुनो (आवाज़ में)',
    sunoPlaying: 'सुनाई दे रहा है...',
    switchCity: 'शहर / स्टेशन बदलें',
    detectGps: 'मेरी वर्तमान लोकेशन पहचानें (GPS)',
    searchCityPlaceholder: 'भारत का कोई भी शहर, कस्बा या जिला खोजें (उदा. वाराणसी, इंदौर, कानपुर)...',
    quickPresets: 'त्वरित चुनिंदा शहर:',
    
    // Quick 4 Decision Cards
    quickDecisionHeading: 'आपके रोज़मर्रा के 4 बड़े फैसले',
    quickDecisionSub: 'बिना किसी उलझन के 3 सेकंड में जानिए कि अभी क्या करना है',

    decisionPlayTitle: '🏃 बच्चों का खेलना / वॉक',
    decisionPlaySafe: 'दोपहर में सुरक्षित (1:00 – 4:00 PM)',
    decisionPlayUnsafe: 'सुबह और शाम बिल्कुल बंद',
    decisionPlayDesc: 'सुबह ज़मीनी स्मॉग फेफड़ों में चिपकता है। आउटडोर खेल केवल दोपहर की खिली धूप में रखें।',

    decisionWindowTitle: '🪟 घर की खिड़कियां',
    decisionWindowSafe: 'दोपहर 1:30 बजे खोलें (20 मिनट)',
    decisionWindowUnsafe: 'सुबह 6 से 11 बजे बंद रखें',
    decisionWindowDesc: 'सुबह की बर्फीली हवा में प्रदूषण भरा होता है। दोपहर में जब धूप तेज हो, तब 20 मिनट के लिए ताज़ी हवा बदलें।',

    decisionKitchenTitle: '🍳 किचन तड़का और धुआं',
    decisionKitchenSafe: '3 मिनट पहले एग्जॉस्ट चालू करें',
    decisionKitchenDesc: 'तड़का लगाने से 3 मिनट पहले चिमनी चलाएं और कमरे के दरवाजे बंद रखें। तेल का धुआं 4 घंटे घर में तैरता है।',

    decisionTravelTitle: '🚗 बाहर निकलना / ऑफिस',
    decisionTravelSafe: 'मेट्रो / एसी बस चुनें (N95 मास्क)',
    decisionTravelDesc: 'बाइक या खुले ऑटो में 3 गुना जहरीला धुआं सांस में जाता है। अंडरपास और रेडलाइट पर मास्क न उतारें।',

    // Personas
    personaHeading: 'घर में कौन है? (अपनी स्थिति चुनें)',
    personaToddler: 'छोटे बच्चे (Toddler)',
    personaSenior: 'बुजुर्ग / दमा (Asthma)',
    personaCommuter: 'रोज़ ऑफिस जाने वाले',
    personaHome: 'घर पर रहने वाले (WFH)',

    // Tabs
    tabToday: 'आज का दिन',
    tabDecisions: 'त्वरित फैसले',
    tabIndoor: 'घर की सुरक्षा (₹0)',
    tabImpact: 'बचत व प्रभाव',
    tabCopilot: 'वायुमित्र से पूछें',

    // Desi Jugaad
    jugaadHeading: 'बिना महंगे प्यूरीफायर के घर की हवा साफ रखें',
    jugaadTowelTitle: 'देसी तौलिया शील्ड (₹0 खर्च)',
    jugaadTowelDesc: 'दरवाजे के नीचे एक हल्का गीला सूती तौलिया लपेटकर लगाने से बाहर की 18% काली कालिख कमरे में आने से रुक जाती है।',
    jugaadMopTitle: 'सूखे झाड़ू की जगह गीला पोछा',
    jugaadMopDesc: 'सूखा झाड़ू लगाने से धूल हवा में 6 घंटे तैरती रहती है। गुनगुने पानी का पोछा लगाने से धूल जमीन पर चिपककर साफ होती है।',
    jugaadDiyTitle: '₹1,200 में घर पर बना एयर प्यूरीफायर',
    jugaadDiyDesc: 'किसी भी साधारण टेबल फैन के पीछे MERV-13 या HEPA फिल्टर शीट बांधें। यह ₹20,000 के महंगे प्यूरीफायर जैसी साफ हवा देता है।',

    // Impact
    impactHeading: 'आपकी सावधानी का असर',
    impactSpared: 'फेफड़ों में जाने से बचा जहर',
    impactCigarettes: 'सिगरेट के बराबर नुकसान से बचाव',
    impactCo2: 'कार्बन उत्सर्जन में कमी',
    nextRank: 'अगला स्तर: वायु ऋषि',

    // Disclaimer
    disclaimer: 'यह सुझाव केंद्रीय प्रदूषण नियंत्रण बोर्ड (CPCB) और ओपन-मेटियो के वास्तविक वायु डेटा पर आधारित हैं। आपातकालीन स्वास्थ्य समस्या होने पर तुरंत नजदीकी डॉक्टर से संपर्क करें।',
  },
  en: {
    appTitle: 'VayuMitra',
    appSubtitle: 'Clean Air Companion',
    tagline: 'Calm, actionable air quality guidance for Indian households',
    liveBadge: 'CPCB Real-Time Telemetry',
    sunoBtn: 'Listen (Audio)',
    sunoPlaying: 'Speaking...',
    switchCity: 'Switch City / Station',
    detectGps: 'Auto-Detect My Location (GPS)',
    searchCityPlaceholder: 'Search any Indian city, town, or district (e.g. Varanasi, Indore, Kanpur)...',
    quickPresets: 'Featured Cities:',

    // Quick 4 Decision Cards
    quickDecisionHeading: '4 Everyday Health Decisions',
    quickDecisionSub: 'Instant clarity in 3 seconds—what you should do right now',

    decisionPlayTitle: '🏃 Outdoor Play & Morning Walk',
    decisionPlaySafe: 'Safe Window: 1:00 – 4:00 PM',
    decisionPlayUnsafe: 'Avoid Early Morning & Dusk',
    decisionPlayDesc: 'Ground-level temperature inversion traps soot. Shift cardio runs and child play to midday sunshine.',

    decisionWindowTitle: '🪟 Windows & Home Ventilation',
    decisionWindowSafe: 'Open at 1:30 PM for 20 mins',
    decisionWindowUnsafe: 'Keep Sealed 6:00 – 11:00 AM',
    decisionWindowDesc: 'Cold morning air traps vehicle soot. Flush indoor CO2 only during warm midday thermal dispersion.',

    decisionKitchenTitle: '🍳 Kitchen Tadka & Smoke',
    decisionKitchenSafe: '3-Min Pre-Ignition Exhaust Rule',
    decisionKitchenDesc: 'Start exhaust chimney 3 minutes before lighting the flame and seal doors. Oil aerosols linger for 4 hours.',

    decisionTravelTitle: '🚗 Commute & Transit Choice',
    decisionTravelSafe: 'Choose Metro / Sealed AC (N95)',
    decisionTravelDesc: 'Open two-wheelers inhale 3x more toxic exhaust. Never remove N95 mask near underpass bottlenecks.',

    // Personas
    personaHeading: 'Who is at home? (Select Household Profile)',
    personaToddler: 'Parents with Toddler (3y)',
    personaSenior: 'Seniors & Asthma Care',
    personaCommuter: 'Daily Office Commuter',
    personaHome: 'WFH & Homemaker',

    // Tabs
    tabToday: 'Today',
    tabDecisions: 'Direct Choices',
    tabIndoor: 'Home Shield (₹0)',
    tabImpact: 'Impact & Shield',
    tabCopilot: 'Ask Vayu',

    // Desi Jugaad
    jugaadHeading: 'Clean Indoor Air Without Expensive Purifiers',
    jugaadTowelTitle: 'Damp Towel Door Draft Shield (₹0 Cost)',
    jugaadTowelDesc: 'A rolled damp cotton towel wedged under corridor doors stops up to 18% of hallway soot infiltration.',
    jugaadMopTitle: 'Warm Wet Mopping Over Dry Sweeping',
    jugaadMopDesc: 'Dry brooming keeps dust suspended for 6 hours. Warm wet mopping traps particulate directly on the floor.',
    jugaadDiyTitle: '₹1,200 DIY Table Fan Purifier',
    jugaadDiyDesc: 'Strap an H12/MERV-13 filter sheet to a standard 12-inch table fan for hospital-grade clean air delivery.',

    // Impact
    impactHeading: 'Your Shielding Impact',
    impactSpared: 'Toxic Particulate Spared',
    impactCigarettes: 'Passive Cigarette Equivalent Avoided',
    impactCo2: 'Carbon Footprint Averted',
    nextRank: 'Next Level: Vayu Rishi',

    // Disclaimer
    disclaimer: 'Guidance modeled from official CPCB & Open-Meteo environmental telemetry. Not an individual medical prescription. Consult certified medical professionals for acute distress.',
  },
};
