import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import SIPCalculator from './pages/SIPCalculator';
import CorpusCalculator from './pages/CorpusCalculator';
import InvestmentLibrary from './pages/InvestmentLibrary';
import AIAssetAllocation from './pages/AIAssetAllocation';
import TaxSavingGuide from './pages/TaxSavingGuide';
import PortfolioStressTest from './pages/PortfolioStressTest';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="sip-calculator" element={<SIPCalculator />} />
              <Route path="corpus-calculator" element={<CorpusCalculator />} />
              <Route path="investments" element={<InvestmentLibrary />} />
              <Route path="ai-allocation" element={<AIAssetAllocation />} />
              <Route path="tax-guide" element={<TaxSavingGuide />} />
              <Route path="stress-test" element={<PortfolioStressTest />} />
              <Route path="about-us" element={<AboutUs />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
