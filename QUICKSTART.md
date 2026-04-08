# 🚀 Quick Start Guide

## Prerequisites
- Node.js v16+ installed
- npm or yarn

## Installation (First Time)

```bash
# Navigate to project directory
cd "investment ai"

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

## Running the Application

### Option 1: Using the start script (Recommended)
```bash
./start.sh
```

### Option 2: Manual start

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

## Access the Application

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

## Features Overview

### 📊 Navigation Menu

1. **Dashboard** - Overview and quick access to all features
2. **User Profile** - Set up your investment profile and risk assessment
3. **SIP Calculator** - Calculate SIP returns with animated charts
4. **Corpus Calculator** - Plan for financial goals (retirement, education, etc.)
5. **Investments** - Browse 16+ investment instruments
6. **AI Allocation** - Get personalized asset allocation recommendations
7. **Tax Guide** - Maximize tax savings with 80C and 80CCD instruments
8. **Stress Test** - Test portfolio resilience across market scenarios

### 🎯 Recommended Workflow

1. **Start with User Profile**
   - Enter your age, income, savings
   - Select investment goals
   - Get your risk tolerance

2. **Use Calculators**
   - SIP Calculator for regular investments
   - Corpus Calculator for specific goals

3. **Explore Investments**
   - Browse the library
   - Filter by risk/category
   - Compare instruments

4. **Get AI Recommendations**
   - Generate personalized allocation
   - Review suggested instruments

5. **Plan Tax Savings**
   - Input investments in 80C instruments
   - Calculate tax savings

6. **Test Portfolio**
   - Set your allocation
   - Run stress test scenarios
   - Assess risk exposure

### 🎨 UI Features

- **Theme Toggle** - Click the sun/moon icon to switch dark/light mode
- **Mobile Menu** - Tap the menu icon on mobile devices
- **Interactive Cards** - Click on any investment to see details
- **Sliders** - Drag to adjust values in real-time

### 💡 Pro Tips

1. **Start with your profile** for personalized recommendations
2. **Use realistic values** for accurate calculations
3. **Compare instruments** before investing
4. **Test different scenarios** in the stress test
5. **Check tax guide** before making investments

### 🔧 Troubleshooting

**Port already in use:**
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Dependencies not installing:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
# Make sure you're using Node.js v16+
node --version

# Update npm
npm install -g npm@latest
```

## Customization

### Change Theme Colors
Edit `client/tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#your-color'
  }
}
```

### Add Investment Instruments
Edit `client/src/data/investments.js`

### Modify Risk Algorithm
Edit `client/src/utils/calculations.js` - `calculateRiskTolerance()`

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Recharts, Framer Motion
- **Backend:** Node.js, Express
- **State:** React Context API
- **Routing:** React Router v6

## Support

For issues or questions:
1. Check the README.md
2. Review FEATURES.md for detailed feature list
3. Check browser console for errors

---

**Happy Investing! 💰**
