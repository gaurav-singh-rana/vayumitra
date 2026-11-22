# VayuMitra (वायुमित्र) — Urban Air Quality Assistant
> **PromptWars: Virtual — Challenge 6 Prototype**  
> An empathetic, GenAI-powered urban air quality companion for Indian households that pairs real-time outdoor pollution data with personalized daily routines, indoor air quality actions, and quantified impact explanations.

---

## 🌟 Executive Summary & Core Value Proposition

Urban families across India face acute, fluctuating smog episodes—particularly during post-monsoon and winter inversions. Standard AQI dashboards display raw numbers without telling a household **what to do right now**. Generic chatbots often hallucinate air quality numbers or dispense one-size-fits-all advice.

**VayuMitra** bridges environmental telemetry and household daily life:
1. **Truth Over Hallucination**: Strictly grounded in verified real-time CPCB / Open-Meteo telemetry with explicit station provenance and timestamps. **0% LLM-fabricated AQI numbers.**
2. **Household Personalization**: 4 distinct urban personas (Parents with young children, Senior citizens & respiratory-sensitive individuals, Daily office commuters, and WFH / homemakers).
3. **Three Structured Action Pillars**:
   - **Low-Emission Daily Routine**: Time-aware morning, afternoon (solar thermal dispersion window), and evening guidance.
   - **Indoor Air Quality (IAQ) Hacks**: Budget zero-cost ($0/₹0) behavioral steps (solar window venting, door draft towels, kitchen exhaust discipline) vs. Purifier Smart Mode.
   - **Sustainable Alternatives & Direct Impact**: Route smog shielding (e.g. Metro vs. solo sedan), PM2.5 lung load spared, and CO2 averted.
4. **Ask VayuMitra Grounded Copilot**: Follow-up Q&A assistant strictly grounded in the selected station's live AQI and the user's specific household profile.

---

## 🎨 Visual Design & UI System

Crafted to match the **Soft Institutional Minimalism with Calibrated Glassmorphism** design specification:
- **Palette**: Deep Teal (`#003441` / `#0F4C5C`) & Deep Spruce (`#0D3534`), Clean Mint / Sky Accents (`#70F8E8`, `#006A62`), Soft Surface (`#F8F9FF`), with WCAG 2.1 AA contrast compliance.
- **CPCB-Compliant NAQI Severity Scale**: Emerald Green (Good), Warm Amber (Moderate), Ochre Orange (Poor), Vivid Crimson (Very Poor), and Deep Burgundy-Plum (Severe Smog) always paired with clear text labels and icons (never relying on color alone).
- **Typography**: Display & headlines set in **Plus Jakarta Sans**, operational copy in **Inter**, accompanied by bilingual micro-accents (*वायुमित्र / वायु गुणवत्ता सूचकांक*).
- **Responsive Layout**: Designed mobile-first (360px+) scaling up cleanly to desktop (1280px+) with zero horizontal scrolling.

---

## 🛡️ Security, Quality & Efficiency Pillars

| Area | Implementation Highlights |
| :--- | :--- |
| **Zero Exposed Secrets** | API keys (e.g. `GEMINI_API_KEY`) run **exclusively server-side** via Next.js Route Handlers. Client bundles and repository contain zero credentials. `.env.example` provided. |
| **API Caching & Efficiency** | In-memory **15-minute TTL Cache** (`src/lib/cache.ts`) prevents endpoint spamming for free public AQI APIs and LLM inference. Subsequent visits within 15 mins respond in under 5ms. |
| **Debounced Search** | Indian city and station search is debounced at **300ms** to prevent rapid-fire query lag. |
| **Input Sanitization** | Comprehensive sanitization (`src/lib/sanitization.ts`) guards against XSS, input length overflows, and prompt injection attacks (blocking override commands and key-leak attempts). |
| **Accessibility (a11y)** | Semantic HTML5 (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`), ARIA live regions (`aria-live="polite"`), high-contrast focus rings, and full keyboard navigation (Tab/Shift+Tab, Enter, Escape). |
| **No-Hallucination Guardrail** | External AQI failures trigger an honest error state and retry button. The system **never** passes AQI estimation to the LLM. |

---

## 🧪 Evaluator Verification Guide & Sample Test Inputs

Evaluators can verify the entire end-to-end functionality using the following test inputs:

### Scenario 1: One-Click Evaluator Presets
- Click the top location title to open the **Indian City / Station Switcher**.
- Test each of the one-click evaluator presets:
  1. **Delhi — Anand Vihar** (`DL-DPCC-04`): Severe winter smog baseline, paired with *Parent & Toddler (Aarav, 3y)*.
  2. **Kolkata — Victoria Memorial** (`WB-PCB-02`): Humid winter particulate hotspot, paired with *Senior & Asthma*.
  3. **Mumbai — Bandra Kurla Complex** (`MH-MPCB-09`): High traffic coastal corridor, paired with *Daily Commuter*.
  4. **Delhi — Dwarka Sec 14** (`DL-CPCB-18`): Residential sub-city, paired with *WFH & Homemaker*.
- **Expected Outcome**: Instant switch of telemetry station, live timestamp update, and real-time CPCB AQI calculation.

### Scenario 2: Provenance & Verified Live Data
- Check the Live Station badge in the top-right header and location bar.
- Note the source label: `CPCB & Open-Meteo Air Telemetry (DL-DPCC-04) • <Live Timestamp>`.
- The live pollutant cards display actual telemetry values: PM2.5 with WHO multiplier, PM10, NO2, and dispersion wind speed.

### Scenario 3: Persona Switching
- Click between the 4 persona pills:
  - `Parent & Toddler (Aarav, 3y)`: Recommends shifting morning play indoors, highlights Aarav's safe afternoon play window (12:00–4:00 PM), and suggests low-cardio indoor play.
  - `Senior & Asthma (Kolkata)`: Recommends avoiding early morning walks to prevent bronchospasm, emphasizes bedroom sanctuary sealing.
  - `Daily Commuter (Mumbai)`: Highlights avoiding peak morning underpass congestion and switching to metro transit.
  - `WFH & Homemaker (Delhi)`: Highlights airtight cooking discipline and midday thermal venting.

### Scenario 4: Indoor Hacks (Budget ₹0 vs. Purifier Smart Mode)
- Click the **Indoor** tab on the bottom navigation bar.
- Review the **Microclimate Delta**: Outdoor AQI (e.g. 388) vs. Living Room Microclimate (e.g. 142 AQI • Shielding 63% toxic load).
- Toggle between **🌿 Budget Hacks (₹0)** and **⚡ Purifier Smart Mode**:
  - *Budget Hacks*: Solar Window Cross-Venting locked until afternoon; Pro Jugaad Shield (rolled damp cotton towel blocking 18% hallway soot); Kitchen Tadka 3-minute pre-ignition exhaust discipline.
  - *Purifier Mode*: Avoiding auto-mode on smog nights (setting Continuous Medium) and Corsi-Rosenthal DIY filter instructions.

### Scenario 5: Direct Impact & Route Smog Shield
- Click the **Impact** tab on the bottom navigation bar.
- Review the **Household Impact Status Card**: Clean Air Sentinel score (84/100), PM2.5 spared (e.g. 148 µg/day ≈ 7 passive cigarettes spared), and 4.2 kg CO2 averted.
- Review the **Route Smog Shield Comparison**:
  - *Solo Petrol Sedan (AC on)*: 68 mins, ₹340, +14.2 kg emissions, underpass PM2.5 leaks.
  - *Blue Line Metro + E-Rickshaw*: 42 mins, ₹55, -4.2 kg CO2, sealed pressurized carriages.

### Scenario 6: Ask VayuMitra Grounded Copilot Q&A
- Click the floating action button or **Ask Vayu** in the bottom navigation.
- Verify the active context ribbon: `Grounded in Live CPCB & Open-Meteo`.
- Click any of the quick prompt chips or type your own question:
  - Input: `"Can Aarav play cricket at 5 PM today?"`
  - Input: `"What is the bedtime protection protocol for mild wheezing?"`
  - Input: `"When is grocery run safe today?"`
  - Input: `"DIY fan + HEPA purifier tutorial"`
- **Expected Outcome**: Empathetic, grounded response with a Clear Health Verdict card, Grounded Alternate Action card, and particulate lung load shielding stat.
- Click **Listen** to trigger audio speech synthesis narration (`Suno`).

### Scenario 7: Honest Error & Recovery Handling
- In the city search box, type an unsupported or invalid query (e.g., `Atlantis999`).
- **Expected Outcome**: Clean, friendly "No matching Indian location found" state without crashing.
- Try auto-detect location when GPS permission is denied: cleanly falls back to manual selection.

---

## 💻 Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router) + React 18
- **Language**: Strict TypeScript with complete domain types (`src/types/index.ts`)
- **Styling**: Tailwind CSS configured with the VayuMitra design token system
- **Air Telemetry Ingestion**: Open-Meteo Air Quality Telemetry + Indian CPCB Breakpoint NAQI algorithm
- **GenAI Integration**: Google Gemini API (`gemini-1.5-flash`) via server-side Route Handlers with grounded local environmental fallback
- **Testing**: Vitest + JSDOM (`npm run test`)

---

## 🚀 Quickstart & Local Installation

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation Steps
```bash
# 1. Navigate to project folder
cd vayumitra

# 2. Install dependencies
npm install

# 3. Configure environment variables (optional for Gemini AI features)
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY if desired

# 4. Run automated unit tests
npm run test

# 5. Build production bundle
npm run build

# 6. Start the local server
npm run start
# Or for local development with hot reload:
npm run dev
```

The application will be live at `http://localhost:3000`.

---

## 🏛️ Project Directory Structure

```
vayumitra/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── aqi/route.ts          # Live AQI telemetry + 15-min TTL cache
│   │   │   ├── guidance/route.ts     # Personalized 3-pillar action generation
│   │   │   └── chat/route.ts         # Grounded Ask VayuMitra Copilot
│   │   ├── globals.css               # Design system styles & a11y focus rings
│   │   ├── layout.tsx                # Typography, meta tags & viewport setup
│   │   └── page.tsx                  # Main VayuMitra workspace & tab router
│   ├── components/
│   │   ├── Header.tsx                # Top header, live status, audio 'Suno'
│   │   ├── LocationBar.tsx           # City search, 300ms debounce, evaluator presets
│   │   ├── PersonaSwitcher.tsx       # 4 household persona pills
│   │   ├── AqiHeroCard.tsx           # Severe smog gauge, NAQI score & inversion alert
│   │   ├── TelemetryGrid.tsx         # PM2.5, PM10, NO2, dispersion wind cards
│   │   ├── TodayRoutine.tsx          # Low-Emission Routine (morning/afternoon/evening)
│   │   ├── IndoorHacks.tsx           # IAQ hacks: Budget ₹0 vs. Purifier Smart Mode
│   │   ├── DirectImpact.tsx          # PM2.5 spared, CO2 averted, route comparison
│   │   ├── AskVayuCopilot.tsx        # Grounded Q&A assistant drawer
│   │   └── BottomNav.tsx             # Accessible sticky navigation tabs
│   ├── lib/
│   │   ├── cache.ts                  # In-memory TTL cache manager (15-min TTL)
│   │   ├── cpcb-aqi.ts               # Official CPCB NAQI calculation & breakpoints
│   │   ├── indian-cities.ts          # Curated Indian cities, coordinates & stations
│   │   ├── personas.ts               # 4 Target household profiles & sensitivities
│   │   ├── sanitization.ts           # Input sanitization & prompt injection shield
│   │   └── guidance-engine.ts        # Gemini API client & grounded rule fallback
│   ├── types/
│   │   └── index.ts                  # Strict TypeScript interfaces matching PRD
│   └── __tests__/
│       ├── cpcb-aqi.test.ts          # Unit tests for CPCB math & sub-indices
│       ├── cache.test.ts             # Unit tests for TTL caching & expiration
│       ├── sanitization.test.ts      # Unit tests for security & sanitization
│       └── guidance.test.ts          # Integration tests for personalized guidance
├── .env.example                      # Documented server environment variables
├── package.json                      # Project manifest & scripts
├── tailwind.config.js                # Design token mapping from stitch specifications
├── tsconfig.json                     # Strict TypeScript configuration
└── vitest.config.ts                  # Vitest test runner configuration
```

---

## ⚖️ Non-Medical Informational Disclaimer
VayuMitra is an environmental decision-support tool. Recommendations are modeled from real-time ambient telemetry and published public health studies. They do not constitute formal medical diagnoses or clinical prescriptions. For acute respiratory emergencies, please consult certified medical professionals or emergency services immediately.
