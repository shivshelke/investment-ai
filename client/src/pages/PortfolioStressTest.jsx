import React, { useState } from 'react';
import { simulatePortfolioStress, formatCurrency } from '../utils/calculations';
import { useUser } from '../context/UserContext';
import GlassCard from '../components/GlassCard';
import Slider from '../components/Slider';
import Button from '../components/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown, Activity } from 'lucide-react';

const PortfolioStressTest = () => {
  const { portfolio, updatePortfolio } = useUser();
  const [investmentAmounts, setInvestmentAmounts] = useState({
    equity: 500000,
    debt: 300000,
    gold: 150000,
    cash: 50000
  });
  const [results, setResults] = useState(null);

  const handleSliderChange = (asset, value) => {
    setInvestmentAmounts(prev => ({
      ...prev,
      [asset]: value
    }));
  };

  const runStressTest = () => {
    const scenarios = ['crash', 'normal', 'high'];
    const scenarioResults = {};

    scenarios.forEach(scenario => {
      scenarioResults[scenario] = simulatePortfolioStress(investmentAmounts, scenario);
    });

    setResults(scenarioResults);
    updatePortfolio(investmentAmounts);
  };

  const totalInvestment = Object.values(investmentAmounts).reduce((a, b) => a + b, 0);

  const scenarioData = results ? [
    {
      name: 'Market Crash',
      value: results.crash.totalValue,
      change: results.crash.changePercent,
      color: '#ef4444',
      icon: '📉'
    },
    {
      name: 'Normal Growth',
      value: results.normal.totalValue,
      change: results.normal.changePercent,
      color: '#3b82f6',
      icon: '📊'
    },
    {
      name: 'High Growth',
      value: results.high.totalValue,
      change: results.high.changePercent,
      color: '#10b981',
      icon: '🚀'
    }
  ] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Portfolio Stress Test
        </h1>
      </div>

      <GlassCard className="p-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          Set Your Portfolio Allocation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Slider
            label="Equity Investments"
            value={investmentAmounts.equity}
            onChange={(e) => handleSliderChange('equity', Number(e.target.value))}
            min={0}
            max={2000000}
            step={10000}
            formatValue={formatCurrency}
          />

          <Slider
            label="Debt Investments"
            value={investmentAmounts.debt}
            onChange={(e) => handleSliderChange('debt', Number(e.target.value))}
            min={0}
            max={2000000}
            step={10000}
            formatValue={formatCurrency}
          />

          <Slider
            label="Gold Investments"
            value={investmentAmounts.gold}
            onChange={(e) => handleSliderChange('gold', Number(e.target.value))}
            min={0}
            max={500000}
            step={10000}
            formatValue={formatCurrency}
          />

          <Slider
            label="Cash & Liquid Funds"
            value={investmentAmounts.cash}
            onChange={(e) => handleSliderChange('cash', Number(e.target.value))}
            min={0}
            max={500000}
            step={5000}
            formatValue={formatCurrency}
          />
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Total Portfolio Value
            </span>
            <span className="text-3xl font-bold text-gray-800 dark:text-white">
              {formatCurrency(totalInvestment)}
            </span>
          </div>
        </div>

        <Button variant="primary" className="w-full" onClick={runStressTest}>
          Run Stress Test Analysis
        </Button>
      </GlassCard>

      {results && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scenarioData.map((scenario, index) => (
              <GlassCard key={index} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{scenario.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {scenario.name}
                    </h3>
                    <p className={`text-sm ${
                      parseFloat(scenario.change) >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {parseFloat(scenario.change) >= 0 ? '+' : ''}{scenario.change}%
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Portfolio Value
                    </p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {formatCurrency(scenario.value)}
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Change from Original
                    </p>
                    <p className={`text-xl font-bold ${
                      parseFloat(scenario.change) >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {formatCurrency(scenario.value - totalInvestment)}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="p-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Scenario Comparison
            </h3>
            
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={scenarioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis 
                  stroke="#9ca3af"
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px'
                  }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {scenarioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 p-6 rounded-xl bg-white/10 dark:bg-white/5">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Original Investment:</strong> {formatCurrency(totalInvestment)}
              </p>
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              📊 Scenario Analysis Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingDown className="w-6 h-6 text-red-500" />
                  <h4 className="font-bold text-red-600 dark:text-red-400">Market Crash (-30%)</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Equity drops 30%</li>
                  <li>• Debt stable, minor loss 5%</li>
                  <li>• Gold gains 15% (safe haven)</li>
                  <li>• Cash remains unchanged</li>
                </ul>
                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  Simulates severe market correction or crisis
                </p>
              </div>

              <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-6 h-6 text-blue-500" />
                  <h4 className="font-bold text-blue-600 dark:text-blue-400">Normal Growth (8-12%)</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Equity gains 12%</li>
                  <li>• Debt grows 7%</li>
                  <li>• Gold appreciates 8%</li>
                  <li>• Cash earns 4%</li>
                </ul>
                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  Typical market conditions with steady growth
                </p>
              </div>

              <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <h4 className="font-bold text-green-600 dark:text-green-400">High Growth (15-20%)</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Equity surges 18%</li>
                  <li>• Debt grows 8%</li>
                  <li>• Gold gains 10%</li>
                  <li>• Cash earns 4%</li>
                </ul>
                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  Bull market with strong economic growth
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              💡 Key Insights
            </h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Worst Case Scenario:</strong> In a market crash, your portfolio would be worth{' '}
                <strong className="text-red-600 dark:text-red-400">
                  {formatCurrency(results.crash.totalValue)}
                </strong>, a loss of{' '}
                <strong>{results.crash.changePercent}%</strong>.
              </p>
              <p>
                <strong>Best Case Scenario:</strong> With high growth, your portfolio could reach{' '}
                <strong className="text-green-600 dark:text-green-400">
                  {formatCurrency(results.high.totalValue)}
                </strong>, a gain of{' '}
                <strong>{results.high.changePercent}%</strong>.
              </p>
              <p>
                <strong>Recommendation:</strong> {
                  parseFloat(results.crash.changePercent) < -20 
                    ? 'Consider increasing debt allocation for better downside protection.'
                    : 'Your portfolio shows good resilience to market volatility.'
                }
              </p>
            </div>
          </GlassCard>
        </>
      )}
    </div>
  );
};

export default PortfolioStressTest;
