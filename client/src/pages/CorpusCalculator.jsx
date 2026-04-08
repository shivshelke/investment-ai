import React, { useState } from 'react';
import { calculateCorpus, calculateMonthlyInvestment, formatCurrency } from '../utils/calculations';
import GlassCard from '../components/GlassCard';
import Input from '../components/Input';
import Slider from '../components/Slider';
import Button from '../components/Button';
import { Target, TrendingUp, Calendar } from 'lucide-react';

const CorpusCalculator = () => {
  const [goalType, setGoalType] = useState('retirement');
  const [goalAmount, setGoalAmount] = useState(5000000);
  const [years, setYears] = useState(20);
  const [inflationRate, setInflationRate] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [calculated, setCalculated] = useState(false);

  const goals = [
    { id: 'retirement', label: 'Retirement', icon: '🏖️', defaultAmount: 5000000 },
    { id: 'education', label: 'Child Education', icon: '🎓', defaultAmount: 2000000 },
    { id: 'home', label: 'Buy Home', icon: '🏠', defaultAmount: 10000000 },
    { id: 'wedding', label: 'Wedding', icon: '💍', defaultAmount: 1500000 },
    { id: 'vacation', label: 'Dream Vacation', icon: '✈️', defaultAmount: 500000 }
  ];

  const requiredCorpus = calculateCorpus(goalAmount, inflationRate, years);
  const monthlyInvestment = calculateMonthlyInvestment(requiredCorpus, expectedReturn, years);

  const handleGoalChange = (goal) => {
    setGoalType(goal.id);
    setGoalAmount(goal.defaultAmount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Goal-Based Corpus Calculator
        </h1>
      </div>

      <GlassCard className="p-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          Select Your Goal
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {goals.map(goal => (
            <button
              key={goal.id}
              onClick={() => handleGoalChange(goal)}
              className={`p-4 rounded-xl transition-all duration-300 ${
                goalType === goal.id
                  ? 'bg-blue-500/30 border-2 border-blue-500 scale-105'
                  : 'bg-white/10 border border-white/20 hover:bg-white/20'
              }`}
            >
              <div className="text-4xl mb-2">{goal.icon}</div>
              <div className="text-sm font-medium text-gray-800 dark:text-white">
                {goal.label}
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Input
              label="Goal Amount (Today's Value)"
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(Number(e.target.value))}
              min="10000"
              step="10000"
            />

            <Slider
              label="Time to Goal"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              min={1}
              max={40}
              step={1}
              unit=" years"
            />
          </div>

          <div className="space-y-6">
            <Slider
              label="Expected Inflation Rate"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              min={3}
              max={10}
              step={0.5}
              unit="%"
            />

            <Slider
              label="Expected Return Rate"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              min={6}
              max={18}
              step={0.5}
              unit="%"
            />
          </div>
        </div>

        <Button 
          variant="primary" 
          className="w-full mt-6"
          onClick={() => setCalculated(true)}
        >
          Calculate Required Corpus
        </Button>
      </GlassCard>

      {calculated && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-blue-500/20">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Today's Goal</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {formatCurrency(goalAmount)}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Current value of your {goals.find(g => g.id === goalType)?.label.toLowerCase()}
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-orange-500/20">
                <TrendingUp className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Future Corpus Needed</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {formatCurrency(requiredCorpus)}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Adjusted for {inflationRate}% inflation over {years} years
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-green-500/20">
                <Target className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Investment</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {formatCurrency(monthlyInvestment)}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              At {expectedReturn}% annual return for {years} years
            </p>
          </GlassCard>
        </div>
      )}

      {calculated && (
        <GlassCard className="p-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            💡 Investment Recommendation
          </h3>
          <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To achieve your <strong>{goals.find(g => g.id === goalType)?.label}</strong> goal of{' '}
              <strong className="text-blue-500">{formatCurrency(goalAmount)}</strong> in{' '}
              <strong>{years} years</strong>, you'll need a corpus of{' '}
              <strong className="text-orange-500">{formatCurrency(requiredCorpus)}</strong> accounting 
              for inflation.
              <br/><br/>
              Start investing <strong className="text-green-500">{formatCurrency(monthlyInvestment)}</strong>{' '}
              per month in instruments that can generate {expectedReturn}% annual returns. Consider a mix 
              of equity mutual funds, index funds, and balanced funds based on your risk tolerance.
            </p>
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default CorpusCalculator;
