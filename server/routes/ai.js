import express from 'express';

const router = express.Router();

// Mock AI asset allocation (replaces OpenAI API)
router.post('/asset-allocation', (req, res) => {
  const { age, income, savings, goals, riskTolerance, timeHorizon } = req.body;

  // Smart allocation logic based on user profile
  let allocation = {};
  let recommendations = [];

  if (riskTolerance === 'low') {
    allocation = {
      equity: 20,
      debt: 60,
      gold: 15,
      cash: 5
    };
    recommendations = [
      'Focus on debt instruments like PPF, FDs, and government bonds',
      'Consider investing in debt mutual funds for tax efficiency',
      'Allocate 15% to gold as a hedge against inflation',
      'Keep emergency fund in liquid funds or savings account'
    ];
  } else if (riskTolerance === 'medium') {
    allocation = {
      equity: 50,
      debt: 35,
      gold: 10,
      cash: 5
    };
    recommendations = [
      'Balance your portfolio with 50% equity through index funds and mutual funds',
      'Use debt instruments for stability - consider corporate bonds',
      'Invest in ELSS for tax benefits under 80C',
      'Maintain diversification across multiple asset classes'
    ];
  } else {
    allocation = {
      equity: 75,
      debt: 15,
      gold: 8,
      cash: 2
    };
    recommendations = [
      'Maximize equity exposure through diversified mutual funds and stocks',
      'Consider growth-oriented sectors like technology and healthcare',
      'Use debt only for short-term stability',
      'Invest through SIPs to benefit from rupee cost averaging'
    ];
  }

  // Adjust based on age
  if (age < 30) {
    recommendations.push('Your young age allows for aggressive growth-oriented investments');
  } else if (age > 50) {
    allocation.equity = Math.max(allocation.equity - 10, 20);
    allocation.debt += 10;
    recommendations.push('Shift gradually towards safer debt instruments as you near retirement');
  }

  // Goal-based recommendations
  if (goals.includes('retirement')) {
    recommendations.push('Consider NPS for retirement with additional tax benefits under 80CCD(1B)');
  }
  if (goals.includes('tax-saving')) {
    recommendations.push('Maximize 80C benefits through ELSS, PPF, and NPS contributions');
  }

  const response = {
    allocation,
    recommendations,
    summary: `Based on your ${riskTolerance} risk profile, we recommend a balanced approach with ${allocation.equity}% in equity and ${allocation.debt}% in debt instruments.`,
    instruments: getSuggestedInstruments(allocation, riskTolerance)
  };

  res.json(response);
});

function getSuggestedInstruments(allocation, risk) {
  const instruments = [];

  if (allocation.equity >= 50) {
    instruments.push(
      { name: 'Index Funds', allocation: '30%', reason: 'Low cost, diversified equity exposure' },
      { name: 'Large Cap Mutual Funds', allocation: '20%', reason: 'Stable growth with lower volatility' }
    );
    if (risk === 'high') {
      instruments.push(
        { name: 'Mid/Small Cap Funds', allocation: '15%', reason: 'Higher growth potential' },
        { name: 'Direct Equity', allocation: '10%', reason: 'Maximum control and returns' }
      );
    }
  } else if (allocation.equity >= 20) {
    instruments.push(
      { name: 'Balanced Funds', allocation: '25%', reason: 'Mix of equity and debt' },
      { name: 'ELSS', allocation: '15%', reason: 'Tax savings with equity returns' }
    );
  }

  if (allocation.debt >= 30) {
    instruments.push(
      { name: 'PPF', allocation: '20%', reason: 'Tax-free returns, government backed' },
      { name: 'Debt Mutual Funds', allocation: '15%', reason: 'Better than FDs with tax efficiency' }
    );
    if (allocation.debt >= 50) {
      instruments.push(
        { name: 'Corporate Bonds', allocation: '15%', reason: 'Higher returns than government bonds' },
        { name: 'Fixed Deposits', allocation: '10%', reason: 'Capital protection with guaranteed returns' }
      );
    }
  }

  if (allocation.gold >= 10) {
    instruments.push(
      { name: 'Sovereign Gold Bonds', allocation: `${allocation.gold}%`, reason: 'Gold appreciation + 2.5% interest' }
    );
  }

  return instruments;
}

export default router;
