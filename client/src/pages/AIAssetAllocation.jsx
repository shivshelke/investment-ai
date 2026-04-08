import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { riskProfiles } from '../data/investments';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Sparkles, TrendingUp, Shield } from 'lucide-react';

const AIAssetAllocation = () => {
  const { userProfile } = useUser();
  const [loading, setLoading] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState(null);

  const getAIRecommendation = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/ai/asset-allocation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userProfile)
      });
      
      const data = await response.json();
      setAiRecommendation(data);
    } catch (error) {
      console.error('Error fetching AI recommendation:', error);
      // Fallback to local calculation
      const profile = riskProfiles[userProfile.riskTolerance] || riskProfiles.medium;
      setAiRecommendation({
        allocation: profile.allocation,
        recommendations: [
          `Focus on ${profile.name.toLowerCase()} investment strategy`,
          'Diversify across multiple asset classes',
          'Review and rebalance quarterly',
          'Consider tax-efficient instruments'
        ],
        summary: profile.description,
        instruments: []
      });
    }
    
    setLoading(false);
  };

  const COLORS = {
    equity: '#3b82f6',
    debt: '#10b981',
    gold: '#f59e0b',
    cash: '#6b7280'
  };

  const chartData = aiRecommendation 
    ? Object.entries(aiRecommendation.allocation).map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value,
        color: COLORS[key]
      }))
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          AI Asset Allocation
        </h1>
      </div>

      {!aiRecommendation ? (
        <GlassCard className="p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-blue-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Get Personalized Asset Allocation
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Our AI will analyze your risk profile, investment goals, and time horizon to 
              recommend the optimal asset allocation strategy for your portfolio.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white/10 dark:bg-white/5">
                <Shield className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Risk Level</p>
                <p className="font-bold text-gray-800 dark:text-white capitalize">
                  {userProfile.riskTolerance}
                </p>
              </div>
              
              <div className="p-4 rounded-xl bg-white/10 dark:bg-white/5">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Age</p>
                <p className="font-bold text-gray-800 dark:text-white">
                  {userProfile.age} years
                </p>
              </div>
              
              <div className="p-4 rounded-xl bg-white/10 dark:bg-white/5">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Goals</p>
                <p className="font-bold text-gray-800 dark:text-white">
                  {userProfile.goals.length}
                </p>
              </div>
            </div>

            <Button 
              variant="primary" 
              size="lg"
              onClick={getAIRecommendation}
              disabled={loading}
              className="mx-auto"
            >
              {loading ? 'Analyzing...' : 'Generate AI Recommendation'}
            </Button>
          </div>
        </GlassCard>
      ) : (
        <>
          <GlassCard className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Recommended Asset Allocation
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                {Object.entries(aiRecommendation.allocation).map(([asset, percentage]) => (
                  <div key={asset} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300 capitalize font-medium">
                        {asset}
                      </span>
                      <span className="text-xl font-bold" style={{ color: COLORS[asset] }}>
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: COLORS[asset]
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              💡 AI Recommendations
            </h3>
            <div className="space-y-3">
              {aiRecommendation.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-white/10 dark:bg-white/5">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{rec}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {aiRecommendation.instruments && aiRecommendation.instruments.length > 0 && (
            <GlassCard className="p-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                Suggested Instruments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiRecommendation.instruments.map((instrument, index) => (
                  <div key={index} className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-800 dark:text-white">
                        {instrument.name}
                      </h4>
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-semibold">
                        {instrument.allocation}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {instrument.reason}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          <div className="flex justify-center">
            <Button 
              variant="secondary"
              onClick={() => setAiRecommendation(null)}
            >
              Generate New Recommendation
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAssetAllocation;
