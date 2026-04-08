// Financial calculation utilities

export const calculateSIP = (monthlyInvestment, annualRate, years) => {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  
  const futureValue = monthlyInvestment * 
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  
  const invested = monthlyInvestment * months;
  const returns = futureValue - invested;
  
  return {
    futureValue: Math.round(futureValue),
    invested: Math.round(invested),
    returns: Math.round(returns)
  };
};

export const calculateCorpus = (goalAmount, inflationRate, years) => {
  const futureValue = goalAmount * Math.pow(1 + inflationRate / 100, years);
  return Math.round(futureValue);
};

export const calculateMonthlyInvestment = (targetAmount, annualRate, years) => {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  
  const monthlyInvestment = targetAmount / 
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  
  return Math.round(monthlyInvestment);
};

export const calculateTaxSavings = (investments) => {
  const section80C = Math.min(investments.section80C || 0, 150000);
  const section80CCD1B = Math.min(investments.nps || 0, 50000);
  
  const totalDeduction = section80C + section80CCD1B;
  
  // Assuming 30% tax bracket
  const taxSaved = totalDeduction * 0.30;
  
  return {
    totalDeduction,
    taxSaved: Math.round(taxSaved),
    section80C,
    section80CCD1B
  };
};

export const calculateRiskTolerance = (age, income, savings, timeHorizon, goals) => {
  let score = 0;
  
  // Age factor (younger = higher risk tolerance)
  if (age < 30) score += 30;
  else if (age < 40) score += 20;
  else if (age < 50) score += 10;
  else score += 5;
  
  // Income factor
  if (income > 1000000) score += 25;
  else if (income > 500000) score += 15;
  else score += 10;
  
  // Savings factor
  if (savings > 1000000) score += 20;
  else if (savings > 500000) score += 15;
  else score += 10;
  
  // Time horizon
  if (timeHorizon > 15) score += 15;
  else if (timeHorizon > 10) score += 10;
  else if (timeHorizon > 5) score += 5;
  
  // Goals factor
  if (goals.includes('wealth-creation')) score += 10;
  if (goals.includes('retirement') && age < 40) score += 5;
  
  // Determine risk level
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
};

export const simulatePortfolioStress = (portfolio, scenario) => {
  const scenarios = {
    crash: {
      equity: -0.30,
      debt: -0.05,
      gold: 0.15,
      cash: 0
    },
    normal: {
      equity: 0.12,
      debt: 0.07,
      gold: 0.08,
      cash: 0.04
    },
    high: {
      equity: 0.18,
      debt: 0.08,
      gold: 0.10,
      cash: 0.04
    }
  };
  
  const changes = scenarios[scenario];
  const newPortfolio = {};
  let totalValue = 0;
  
  Object.keys(portfolio).forEach(asset => {
    const change = changes[asset] || 0;
    newPortfolio[asset] = portfolio[asset] * (1 + change);
    totalValue += newPortfolio[asset];
  });
  
  const originalValue = Object.values(portfolio).reduce((a, b) => a + b, 0);
  const changePercent = ((totalValue - originalValue) / originalValue) * 100;
  
  return {
    newPortfolio,
    totalValue: Math.round(totalValue),
    originalValue: Math.round(originalValue),
    changePercent: changePercent.toFixed(2),
    changeAmount: Math.round(totalValue - originalValue)
  };
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};
