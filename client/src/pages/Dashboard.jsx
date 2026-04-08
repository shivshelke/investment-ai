import React from 'react';
import { useUser } from '../context/UserContext';
import GlassCard from '../components/GlassCard';
import { formatCurrency } from '../utils/calculations';
import { TrendingUp, Target, Shield, PieChart, Receipt, AlertTriangle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { userProfile, portfolio } = useUser();

  const totalPortfolio = Object.values(portfolio).reduce((a, b) => a + b, 0);

  const features = [
    {
      title: 'User Profile & Risk Assessment',
      description: 'Analyze your risk tolerance based on age, income, and goals',
      icon: Shield,
      color: 'from-blue-500 to-purple-600',
      link: '/profile'
    },
    {
      title: 'SIP Calculator',
      description: 'Calculate returns on systematic investment plans with charts',
      icon: TrendingUp,
      color: 'from-green-500 to-teal-600',
      link: '/sip-calculator'
    },
    {
      title: 'Corpus Calculator',
      description: 'Plan for retirement, education, home and other financial goals',
      icon: Target,
      color: 'from-orange-500 to-red-600',
      link: '/corpus-calculator'
    },
    {
      title: 'Investment Library',
      description: 'Explore 16 investment instruments with detailed comparisons',
      icon: PieChart,
      color: 'from-purple-500 to-pink-600',
      link: '/investments'
    },
    {
      title: 'AI Asset Allocation',
      description: 'Get personalized portfolio recommendations based on your profile',
      icon: TrendingUp,
      color: 'from-cyan-500 to-blue-600',
      link: '/ai-allocation'
    },
    {
      title: 'Tax Saving Guide',
      description: 'Maximize tax benefits with ELSS, PPF, NPS and other instruments',
      icon: Receipt,
      color: 'from-yellow-500 to-orange-600',
      link: '/tax-guide'
    },
    {
      title: 'Portfolio Stress Test',
      description: 'Simulate market scenarios and test portfolio resilience',
      icon: AlertTriangle,
      color: 'from-red-500 to-rose-600',
      link: '/stress-test'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Home className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-blue-500/20">
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Risk Tolerance</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white capitalize">
                {userProfile.riskTolerance}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Based on your age ({userProfile.age}) and investment goals
          </p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-green-500/20">
              <PieChart className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Portfolio Value</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {totalPortfolio > 0 ? formatCurrency(totalPortfolio) : '₹0'}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Total investment across all assets
          </p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-purple-500/20">
              <Target className="w-8 h-8 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Goals</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {userProfile.goals.length}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Financial goals being tracked
          </p>
        </GlassCard>
      </div>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Welcome to Smart Investment Planner 🚀
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          Your AI-powered companion for intelligent investment planning and portfolio optimization.
          Explore our comprehensive suite of tools designed to help you achieve your financial goals.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
              ✨ AI-Powered Recommendations
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Get personalized asset allocation strategies based on your unique financial profile
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-teal-500/10">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
              📊 Advanced Calculators
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Plan your SIPs, calculate future corpus, and optimize tax savings
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
              🎯 Portfolio Analysis
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Stress test your portfolio against different market scenarios
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
              💰 Investment Library
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Compare 16+ investment instruments across risk, return, and liquidity
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Link key={index} to={feature.link}>
            <GlassCard className="p-6 h-full" hover>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} 
                             flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
              
              <div className="mt-4 text-blue-500 dark:text-blue-400 text-sm font-semibold">
                Explore →
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
