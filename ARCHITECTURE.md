# 🏗️ Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Browser (Client)                       │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         React Application (Port 3000)          │    │
│  │                                                 │    │
│  │  ┌──────────────┐  ┌─────────────────────┐   │    │
│  │  │   Router     │  │   Context Providers │   │    │
│  │  │  (8 routes)  │  │  - Theme            │   │    │
│  │  │              │  │  - User             │   │    │
│  │  └──────────────┘  └─────────────────────┘   │    │
│  │                                                 │    │
│  │  ┌──────────────────────────────────────────┐ │    │
│  │  │           Page Components                 │ │    │
│  │  │  • Dashboard                             │ │    │
│  │  │  • UserProfile                           │ │    │
│  │  │  • SIPCalculator                         │ │    │
│  │  │  • CorpusCalculator                      │ │    │
│  │  │  • InvestmentLibrary                     │ │    │
│  │  │  • AIAssetAllocation                     │ │    │
│  │  │  • TaxSavingGuide                        │ │    │
│  │  │  • PortfolioStressTest                   │ │    │
│  │  └──────────────────────────────────────────┘ │    │
│  │                                                 │    │
│  │  ┌──────────────────────────────────────────┐ │    │
│  │  │      Reusable Components                  │ │    │
│  │  │  • GlassCard  • Button  • Input          │ │    │
│  │  │  • Slider     • Layout                   │ │    │
│  │  └──────────────────────────────────────────┘ │    │
│  │                                                 │    │
│  │  ┌──────────────────────────────────────────┐ │    │
│  │  │         Utilities & Data                  │ │    │
│  │  │  • calculations.js (formulas)            │ │    │
│  │  │  • investments.js (16 instruments)       │ │    │
│  │  └──────────────────────────────────────────┘ │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                          ↕ HTTP (fetch)
┌─────────────────────────────────────────────────────────┐
│              Express Server (Port 5000)                  │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │              API Endpoints                      │    │
│  │                                                 │    │
│  │  GET  /api/health                              │    │
│  │  POST /api/ai/asset-allocation                 │    │
│  │       ↳ Mock AI Logic (no external API)       │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
App
 ├─ ThemeProvider (Dark/Light mode)
 └─ UserProvider (Profile & Portfolio state)
     └─ Router
         └─ Layout
             ├─ Sidebar Navigation
             ├─ Theme Toggle
             └─ Outlet (Page Content)
                 ├─ Dashboard
                 ├─ UserProfile
                 ├─ SIPCalculator
                 ├─ CorpusCalculator
                 ├─ InvestmentLibrary
                 ├─ AIAssetAllocation
                 ├─ TaxSavingGuide
                 └─ PortfolioStressTest
```

---

## Data Flow

### 1. User Profile Flow
```
User Input → Form State → calculateRiskTolerance() → UserContext
                                                          ↓
                                      Other components can access
```

### 2. SIP Calculator Flow
```
Slider Values → calculateSIP() → Display Results + Chart Data → Recharts
```

### 3. AI Allocation Flow
```
User Profile → API Request → Mock AI Logic → Response → Display
   (Context)      (fetch)      (server)       (JSON)    (Pie Chart)
```

### 4. Theme Flow
```
Toggle Click → ThemeContext → localStorage → CSS class → Re-render
```

---

## State Management

### ThemeContext
```javascript
{
  isDark: boolean,
  toggleTheme: function
}
```

### UserContext
```javascript
{
  userProfile: {
    age: number,
    income: number,
    savings: number,
    goals: array,
    riskTolerance: string,
    timeHorizon: number
  },
  portfolio: {
    equity: number,
    debt: number,
    gold: number,
    cash: number
  },
  updateProfile: function,
  updatePortfolio: function
}
```

---

## Key Algorithms

### Risk Tolerance Calculation
```javascript
Score = Age Factor (30pts)
      + Income Factor (25pts)
      + Savings Factor (20pts)
      + Time Horizon (15pts)
      + Goals Factor (10pts)

if (score >= 70) → "high"
if (score >= 40) → "medium"
else → "low"
```

### SIP Future Value
```javascript
FV = P × (((1 + r)^n - 1) / r) × (1 + r)

Where:
  P = Monthly investment
  r = Monthly rate (annual / 12 / 100)
  n = Total months (years × 12)
```

### Corpus with Inflation
```javascript
Future Corpus = Present Value × (1 + inflation)^years
```

### Portfolio Stress Test
```javascript
For each asset:
  New Value = Current Value × (1 + scenario_return)

Scenarios:
  crash:  { equity: -30%, debt: -5%, gold: +15%, cash: 0% }
  normal: { equity: +12%, debt: +7%, gold: +8%, cash: +4% }
  high:   { equity: +18%, debt: +8%, gold: +10%, cash: +4% }
```

---

## Styling Architecture

### Tailwind Configuration
```javascript
theme: {
  extend: {
    colors: {
      primary: { 50, 100, 500, 600, 700 },
      dark: { bg, card, border }
    },
    backdropBlur: { xs }
  }
}
```

### Glassmorphism Pattern
```css
backdrop-blur-md
bg-white/10 (light) or bg-white/5 (dark)
border border-white/20 (light) or border-white/10 (dark)
rounded-2xl
shadow-xl
```

---

## Chart Configurations

### Area Chart (SIP)
- Type: Stacked Area
- Data: Year-by-year growth
- Colors: Blue (invested), Green (returns)
- Features: Gradients, tooltips, legend

### Pie Chart (Allocation)
- Type: Pie with labels
- Data: Asset allocation percentages
- Colors: Blue, Green, Orange, Gray
- Features: Interactive tooltips

### Bar Chart (Stress Test)
- Type: Bar comparison
- Data: 3 scenarios
- Colors: Red, Blue, Green
- Features: Formatted axis, tooltips

---

## API Design

### POST /api/ai/asset-allocation

**Request:**
```json
{
  "age": 30,
  "income": 800000,
  "savings": 500000,
  "goals": ["retirement"],
  "riskTolerance": "medium",
  "timeHorizon": 20
}
```

**Response:**
```json
{
  "allocation": {
    "equity": 50,
    "debt": 35,
    "gold": 10,
    "cash": 5
  },
  "recommendations": [
    "Balance portfolio with 50% equity...",
    "Use debt instruments for stability...",
    ...
  ],
  "summary": "Based on your medium risk profile...",
  "instruments": [
    {
      "name": "Index Funds",
      "allocation": "30%",
      "reason": "Low cost, diversified..."
    },
    ...
  ]
}
```

---

## Performance Optimizations

1. **Vite Build Tool**
   - Instant HMR
   - Optimized bundling
   - Code splitting ready

2. **React Best Practices**
   - Context for global state
   - Minimal re-renders
   - Memoization ready

3. **Lazy Loading**
   - Routes ready for code splitting
   - Images optimized
   - Charts load on demand

4. **CSS Optimization**
   - Tailwind purge in production
   - Minimal custom CSS
   - Utility-first approach

---

## Security Considerations

1. **No sensitive data storage**
2. **Client-side calculations** (privacy)
3. **CORS configured** properly
4. **Input validation** on forms
5. **No external API calls** (self-contained)

---

## Deployment Architecture

### Frontend (Vercel/Netlify)
```
Build: npm run build
Output: dist/
Deploy: Static files
Env: VITE_API_URL
```

### Backend (Render/Railway)
```
Start: npm start
Port: 5000
Env: PORT, CORS_ORIGIN
```

---

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile: ✅ Responsive design

---

## Technology Decisions

| Choice | Reason |
|--------|--------|
| Vite | Fast dev server, HMR |
| Tailwind | Rapid styling, consistency |
| Recharts | React-native charts |
| Framer Motion | Smooth animations |
| Context API | Simple state needs |
| Express | Minimal backend |
| Mock AI | No API key dependency |

---

## Folder Organization

```
├── client/src/
│   ├── components/    # Reusable UI
│   ├── pages/         # Route components
│   ├── context/       # Global state
│   ├── utils/         # Helper functions
│   └── data/          # Static data
│
├── server/
│   └── routes/        # API endpoints
│
└── docs/              # Documentation
```

---

**Architecture designed for scalability and maintainability! 🏗️**
