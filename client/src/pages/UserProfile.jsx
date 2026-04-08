import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { calculateRiskTolerance } from '../utils/calculations';
import GlassCard from '../components/GlassCard';
import Input from '../components/Input';
import Button from '../components/Button';
import { User, TrendingUp, Target, Clock } from 'lucide-react';

const UserProfile = () => {
  const { userProfile, updateProfile } = useUser();
  const [formData, setFormData] = useState(userProfile);
  const [showResults, setShowResults] = useState(false);

  const goalOptions = [
    { id: 'retirement', label: 'Retirement Planning' },
    { id: 'education', label: 'Children Education' },
    { id: 'home', label: 'Buy Home' },
    { id: 'wealth-creation', label: 'Wealth Creation' },
    { id: 'tax-saving', label: 'Tax Saving' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalToggle = (goalId) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const riskTolerance = calculateRiskTolerance(
      formData.age,
      formData.income,
      formData.savings,
      formData.timeHorizon,
      formData.goals
    );
    
    updateProfile({ ...formData, riskTolerance });
    setShowResults(true);
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'low': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          User Profile & Risk Assessment
        </h1>
      </div>

      <GlassCard className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Age"
              type="number"
              value={formData.age}
              onChange={(e) => handleChange('age', Number(e.target.value))}
              min="18"
              max="100"
              required
            />
            
            <Input
              label="Annual Income (₹)"
              type="number"
              value={formData.income}
              onChange={(e) => handleChange('income', Number(e.target.value))}
              min="0"
              step="10000"
              required
            />
            
            <Input
              label="Current Savings (₹)"
              type="number"
              value={formData.savings}
              onChange={(e) => handleChange('savings', Number(e.target.value))}
              min="0"
              step="10000"
              required
            />
            
            <Input
              label="Investment Time Horizon (Years)"
              type="number"
              value={formData.timeHorizon}
              onChange={(e) => handleChange('timeHorizon', Number(e.target.value))}
              min="1"
              max="50"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Investment Goals
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {goalOptions.map(goal => (
                <label
                  key={goal.id}
                  className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer
                             backdrop-blur-sm border transition-all duration-300
                             ${formData.goals.includes(goal.id)
                               ? 'bg-blue-500/20 border-blue-500'
                               : 'bg-white/10 border-white/20 hover:bg-white/20'
                             }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.goals.includes(goal.id)}
                    onChange={() => handleGoalToggle(goal.id)}
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-gray-800 dark:text-white">{goal.label}</span>
                </label>
              ))}
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Calculate Risk Profile
          </Button>
        </form>
      </GlassCard>

      {showResults && (
        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Your Investor Profile
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 text-blue-500" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Risk Tolerance</p>
              <p className={`text-2xl font-bold capitalize ${getRiskColor(userProfile.riskTolerance)}`}>
                {userProfile.riskTolerance}
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-500/20 to-teal-500/20">
              <Target className="w-12 h-12 mx-auto mb-3 text-green-500" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Goals</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {userProfile.goals.length}
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20">
              <Clock className="w-12 h-12 mx-auto mb-3 text-orange-500" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Time Horizon</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {userProfile.timeHorizon} Years
              </p>
            </div>
          </div>

          <div className="mt-6 p-6 rounded-xl bg-white/10 dark:bg-white/5">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Profile Summary</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Based on your age ({userProfile.age}), annual income (₹{userProfile.income.toLocaleString()}), 
              and investment goals, you have a <strong className={getRiskColor(userProfile.riskTolerance)}>
              {userProfile.riskTolerance} risk tolerance</strong>. This means you should focus on a 
              {userProfile.riskTolerance === 'high' ? ' growth-oriented' : 
               userProfile.riskTolerance === 'medium' ? ' balanced' : ' conservative'} investment strategy.
            </p>
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default UserProfile;
