import React, { useState } from 'react';
import { calculateSIP, formatCurrency } from '../utils/calculations';
import GlassCard from '../components/GlassCard';
import Slider from '../components/Slider';
import Button from '../components/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Calendar, DollarSign, Percent } from 'lucide-react';

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [annualRate, setAnnualRate] = useState(12);
  const [years, setYears] = useState(10);
  const [showChart, setShowChart] = useState(false);

  const results = calculateSIP(monthlyInvestment, annualRate, years);

  const generateChartData = () => {
    const data = [];
    for (let year = 1; year <= years; year++) {
      const yearResult = calculateSIP(monthlyInvestment, annualRate, year);
      data.push({
        year: year,
        invested: yearResult.invested,
        value: yearResult.futureValue,
        returns: yearResult.returns
      });
    }
    return data;
  };

  const chartData = generateChartData();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          SIP Calculator
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            Investment Parameters
          </h2>

          <div className="space-y-6">
            <Slider
              label="Monthly Investment"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              min={500}
              max={100000}
              step={500}
              formatValue={(val) => formatCurrency(val)}
            />

            <Slider
              label="Expected Annual Return"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              min={1}
              max={20}
              step={0.5}
              unit="%"
            />

            <Slider
              label="Investment Period"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              min={1}
              max={30}
              step={1}
              unit=" years"
            />

            <Button 
              variant="primary" 
              className="w-full"
              onClick={() => setShowChart(true)}
            >
              Show Growth Chart
            </Button>
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            Results
          </h2>

          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-blue-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Invested</p>
              </div>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                {formatCurrency(results.invested)}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-green-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Returns</p>
              </div>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                {formatCurrency(results.returns)}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-purple-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Future Value</p>
              </div>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                {formatCurrency(results.futureValue)}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/10 dark:bg-white/5">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your investment of <strong>{formatCurrency(monthlyInvestment)}/month</strong> for{' '}
                <strong>{years} years</strong> at <strong>{annualRate}%</strong> annual return will grow to{' '}
                <strong className="text-green-500">{formatCurrency(results.futureValue)}</strong>!
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {showChart && (
        <GlassCard className="p-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            Compound Growth Over Time
          </h2>
          
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis 
                dataKey="year" 
                stroke="#9ca3af"
                label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
              />
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
              <Legend />
              <Area 
                type="monotone" 
                dataKey="invested" 
                stackId="1"
                stroke="#3b82f6" 
                fill="url(#colorInvested)" 
                name="Invested Amount"
              />
              <Area 
                type="monotone" 
                dataKey="returns" 
                stackId="1"
                stroke="#10b981" 
                fill="url(#colorValue)" 
                name="Returns"
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {chartData.filter((_, i) => i === 0 || i === Math.floor(years/3) || i === Math.floor(2*years/3) || i === years-1).map((data, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/10 dark:bg-white/5">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Year {data.year}</p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {formatCurrency(data.value)}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default SIPCalculator;
