import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    age: 30,
    income: 800000,
    savings: 500000,
    goals: [],
    riskTolerance: 'medium',
    timeHorizon: 10
  });

  const [portfolio, setPortfolio] = useState({
    equity: 0,
    debt: 0,
    gold: 0,
    cash: 0
  });

  const updateProfile = (updates) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const updatePortfolio = (updates) => {
    setPortfolio(prev => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{ 
      userProfile, 
      updateProfile, 
      portfolio, 
      updatePortfolio 
    }}>
      {children}
    </UserContext.Provider>
  );
};
