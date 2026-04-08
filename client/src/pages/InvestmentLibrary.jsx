import React, { useState } from 'react';
import { investmentInstruments } from '../data/investments';
import GlassCard from '../components/GlassCard';
import { Search, Filter, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const InvestmentLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [selectedInstrument, setSelectedInstrument] = useState(null);

  const categories = ['all', ...new Set(investmentInstruments.map(i => i.category))];
  const riskLevels = ['all', 'Very Low', 'Low', 'Low-Medium', 'Medium', 'Medium-High', 'High', 'Very High'];

  const filteredInstruments = investmentInstruments.filter(instrument => {
    const matchesSearch = instrument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instrument.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || instrument.category === categoryFilter;
    const matchesRisk = riskFilter === 'all' || instrument.risk === riskFilter;
    return matchesSearch && matchesCategory && matchesRisk;
  });

  const getRiskColor = (risk) => {
    const colors = {
      'Very Low': 'bg-green-500',
      'Low': 'bg-green-400',
      'Low-Medium': 'bg-yellow-400',
      'Medium': 'bg-yellow-500',
      'Medium-High': 'bg-orange-400',
      'High': 'bg-orange-500',
      'Very High': 'bg-red-500'
    };
    return colors[risk] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Investment Instruments Library
        </h1>
      </div>

      <GlassCard className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search instruments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl 
                       bg-white/50 dark:bg-white/5 
                       backdrop-blur-sm
                       border border-gray-300 dark:border-white/10
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       text-gray-800 dark:text-white"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 rounded-xl 
                     bg-white/50 dark:bg-white/5 
                     backdrop-blur-sm
                     border border-gray-300 dark:border-white/10
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     text-gray-800 dark:text-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-gray-800">
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-4 py-3 rounded-xl 
                     bg-white/50 dark:bg-white/5 
                     backdrop-blur-sm
                     border border-gray-300 dark:border-white/10
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     text-gray-800 dark:text-white"
          >
            {riskLevels.map(risk => (
              <option key={risk} value={risk} className="bg-gray-800">
                {risk === 'all' ? 'All Risk Levels' : risk}
              </option>
            ))}
          </select>
        </div>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Found {filteredInstruments.length} instruments
        </p>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInstruments.map(instrument => (
          <GlassCard 
            key={instrument.id} 
            className="p-6 cursor-pointer"
            hover
            onClick={() => setSelectedInstrument(instrument)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                  {instrument.name}
                </h3>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400">
                  {instrument.category}
                </span>
              </div>
              <div className={`w-3 h-3 rounded-full ${getRiskColor(instrument.risk)}`}></div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {instrument.description}
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Expected Return</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {instrument.expectedReturn}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Risk Level</span>
                <span className="font-semibold text-gray-800 dark:text-white">
                  {instrument.risk}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Liquidity</span>
                <span className="font-semibold text-gray-800 dark:text-white">
                  {instrument.liquidity}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Min Investment</span>
                <span className="font-semibold text-gray-800 dark:text-white">
                  {instrument.minInvestment}
                </span>
              </div>
            </div>

            {instrument.taxBenefit !== 'None' && (
              <div className="mt-3 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-xs text-green-600 dark:text-green-400">
                  💰 {instrument.taxBenefit}
                </p>
              </div>
            )}
          </GlassCard>
        ))}
      </div>

      {selectedInstrument && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedInstrument(null)}
        >
          <GlassCard 
            className="max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {selectedInstrument.name}
                </h2>
                <span className="px-4 py-1 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 text-sm">
                  {selectedInstrument.category}
                </span>
              </div>
              <button
                onClick={() => setSelectedInstrument(null)}
                className="text-2xl text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                ×
              </button>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {selectedInstrument.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white/10 dark:bg-white/5">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Expected Return</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {selectedInstrument.expectedReturn}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 dark:bg-white/5">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Risk Level</p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  {selectedInstrument.risk}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 dark:bg-white/5">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Liquidity</p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  {selectedInstrument.liquidity}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 dark:bg-white/5">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Lock-in Period</p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  {selectedInstrument.lockIn}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Tax Benefits
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedInstrument.taxBenefit}
              </p>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white/10 dark:bg-white/5">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Minimum Investment
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {selectedInstrument.minInvestment}
              </p>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default InvestmentLibrary;
