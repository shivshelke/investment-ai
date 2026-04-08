# 💰 Smart Investment Planner

A modern, full-stack web application that helps users plan investments, calculate returns, and optimize portfolios using AI-powered recommendations.

![React](https://img.shields.io/badge/React-18-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 1. **User Profile & Risk Assessment**
- Input age, income, savings, and financial goals
- AI-powered risk tolerance calculation (Low, Medium, High)
- Personalized investor profile summary

### 2. **Goal-Based Corpus Calculator**
- Plan for retirement, education, home purchase, and more
- Inflation-adjusted future value calculation
- Monthly investment requirement estimation

### 3. **SIP Calculator**
- Calculate Systematic Investment Plan returns
- Animated compound growth visualization
- Interactive charts showing investment vs. returns

### 4. **Investment Instruments Library**
- **16+ Investment Options:**
  - Equity Stocks
  - Mutual Funds
  - Fixed Deposits
  - Gold & Sovereign Gold Bonds
  - Real Estate & REITs
  - PPF, NPS, ELSS
  - Corporate & Government Bonds
  - Cryptocurrency
  - Index Funds, Debt Funds, ULIPs
  
- **Comprehensive Comparison:**
  - Risk levels
  - Expected returns
  - Liquidity ratings
  - Tax benefits
  - Lock-in periods
  - Minimum investment

### 5. **AI Asset Allocation**
- Personalized portfolio recommendations
- Risk-based allocation strategies
- Interactive pie charts
- Suggested investment instruments
- No API key required (uses intelligent mock AI)

### 6. **Tax Saving Guide**
- Section 80C instruments (ELSS, PPF, Life Insurance)
- Section 80CCD(1B) for NPS
- Tax savings calculator
- Detailed benefits comparison
- Investment strategies for different tax brackets

### 7. **Portfolio Stress Test**
- **3 Scenario Analysis:**
  - Market Crash (-30%)
  - Normal Growth (8-12%)
  - High Growth (15-20%)
- Visual impact comparison
- Downside protection analysis
- Risk mitigation recommendations

## 🎨 UI/UX Features

- **Glassmorphism Design** - Modern frosted glass effect cards
- **Dark/Light Mode** - Full theme support with smooth transitions
- **Responsive Layout** - Mobile, tablet, and desktop optimized
- **Smooth Animations** - Framer Motion powered transitions
- **Interactive Charts** - Recharts for beautiful data visualization
- **Sidebar Navigation** - Easy access to all features

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Interactive chart library
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin support

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd investment-planner
```

2. **Install Frontend Dependencies**
```bash
cd client
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../server
npm install
```

### Running the Application

1. **Start the Backend Server**
```bash
cd server
npm start
```
Server runs on: `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**
```bash
cd client
npm run dev
```
App runs on: `http://localhost:3000`

3. **Open your browser**
Navigate to `http://localhost:3000`

## 📁 Project Structure

```
investment-planner/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── GlassCard.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Slider.jsx
│   │   │   └── Layout.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── UserProfile.jsx
│   │   │   ├── SIPCalculator.jsx
│   │   │   ├── CorpusCalculator.jsx
│   │   │   ├── InvestmentLibrary.jsx
│   │   │   ├── AIAssetAllocation.jsx
│   │   │   ├── TaxSavingGuide.jsx
│   │   │   └── PortfolioStressTest.jsx
│   │   ├── context/          # React Context
│   │   │   ├── ThemeContext.jsx
│   │   │   └── UserContext.jsx
│   │   ├── utils/            # Utility functions
│   │   │   └── calculations.js
│   │   ├── data/             # Static data
│   │   │   └── investments.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/                    # Node.js backend
│   ├── routes/
│   │   └── ai.js             # AI recommendation endpoint
│   ├── server.js
│   └── package.json
└── README.md
```

## 🧮 Calculation Formulas

### SIP Calculator
```javascript
FV = P × (((1 + r)^n - 1) / r) × (1 + r)
where:
  P = Monthly investment
  r = Monthly interest rate (annual rate / 12)
  n = Number of months
```

### Corpus Calculator
```javascript
Future Value = Present Value × (1 + inflation_rate)^years
```

### Risk Tolerance
Calculated based on:
- Age (younger = higher risk tolerance)
- Income level
- Savings amount
- Investment time horizon
- Financial goals

## 🎯 Use Cases

1. **Young Professionals** - Start SIP planning for wealth creation
2. **Parents** - Plan education corpus for children
3. **Pre-Retirees** - Optimize portfolio allocation
4. **Tax Planners** - Maximize 80C and 80CCD benefits
5. **Investors** - Compare investment instruments
6. **Risk Managers** - Stress test portfolio resilience

## 🔐 Security & Privacy

- No user data is stored permanently
- All calculations happen client-side
- Backend only provides AI recommendations
- No external API calls (fully self-contained)

## 🎨 Customization

### Changing Theme Colors
Edit `client/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color',
      }
    }
  }
}
```

### Adding Investment Instruments
Edit `client/src/data/investments.js`:
```javascript
{
  id: 17,
  name: 'Your Investment',
  category: 'Category',
  risk: 'Medium',
  // ... add properties
}
```

## 📱 Screenshots

### Dashboard
Modern glassmorphism design with quick stats and feature cards

### SIP Calculator
Interactive sliders with animated compound growth charts

### Investment Library
Filterable grid of 16+ investment instruments

### AI Asset Allocation
Personalized pie chart with risk-based recommendations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React Team for the amazing framework
- Tailwind CSS for the utility-first approach
- Recharts for beautiful visualizations
- Lucide for clean icons

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for better financial planning**

🚀 **Perfect for hackathons, portfolios, and learning React!**
