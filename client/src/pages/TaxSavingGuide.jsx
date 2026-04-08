import React, { useState } from 'react';
import { calculateTaxSavings, formatCurrency } from '../utils/calculations';
import GlassCard from '../components/GlassCard';
import Input from '../components/Input';
import Slider from '../components/Slider';
import { Receipt, TrendingDown, Shield, PiggyBank } from 'lucide-react';

const TaxSavingGuide = () => {
  const [investments, setInvestments] = useState({
    elss: 0,
    ppf: 0,
    nps: 0,
    lifeInsurance: 0,
    homeLoan: 0
  });

  const section80C = investments.elss + investments.ppf + investments.lifeInsurance + investments.homeLoan;
  const section80CLimit = Math.min(section80C, 150000);
  const section80CCD1B = Math.min(investments.nps, 50000);
  const totalDeduction = section80CLimit + section80CCD1B;
  const taxSaved30 = totalDeduction * 0.30;
  const taxSaved20 = totalDeduction * 0.20;

  const taxInstruments = [
    {
      name: 'ELSS (Equity Linked Savings Scheme)',
      icon: '📈',
      section: '80C',
      limit: '₹1.5 Lakh',
      lockIn: '3 years',
      returns: '11-14%',
      risk: 'High',
      benefits: [
        'Shortest lock-in period among 80C options',
        'Market-linked returns with high growth potential',
        'LTCG tax benefit after 3 years',
        'SIP option available'
      ]
    },
    {
      name: 'Public Provident Fund (PPF)',
      icon: '🏦',
      section: '80C',
      limit: '₹1.5 Lakh',
      lockIn: '15 years',
      returns: '7-7.5%',
      risk: 'Very Low',
      benefits: [
        'Government-backed, completely safe',
        'EEE status - tax-free returns',
        'Partial withdrawal after 7 years',
        'Loan facility available'
      ]
    },
    {
      name: 'National Pension System (NPS)',
      icon: '🎯',
      section: '80C + 80CCD(1B)',
      limit: '₹1.5L + ₹50K',
      lockIn: 'Till 60 years',
      returns: '9-12%',
      risk: 'Medium',
      benefits: [
        'Additional ₹50,000 deduction under 80CCD(1B)',
        'Choice of investment options',
        'Retirement-focused planning',
        'Low expense ratio'
      ]
    },
    {
      name: 'Life Insurance Premium',
      icon: '🛡️',
      section: '80C',
      limit: '₹1.5 Lakh',
      lockIn: 'Policy term',
      returns: 'Varies',
      risk: 'Low',
      benefits: [
        'Life cover + tax savings',
        'Family protection',
        'Maturity benefits',
        'Loan facility available'
      ]
    },
    {
      name: 'Home Loan Principal',
      icon: '🏠',
      section: '80C',
      limit: '₹1.5 Lakh',
      lockIn: 'NA',
      returns: 'Asset appreciation',
      risk: 'Medium',
      benefits: [
        'Build own asset',
        'Interest also deductible under 24(b)',
        'Property appreciation',
        'Rental income potential'
      ]
    },
    {
      name: 'Tax Saver FD',
      icon: '💰',
      section: '80C',
      limit: '₹1.5 Lakh',
      lockIn: '5 years',
      returns: '6-7%',
      risk: 'Very Low',
      benefits: [
        'Guaranteed returns',
        'Bank safety',
        'Fixed interest rate',
        'Easy to understand'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Receipt className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Tax Saving Guide
        </h1>
      </div>

      <GlassCard className="p-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          Calculate Your Tax Savings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Slider
            label="ELSS Mutual Funds"
            value={investments.elss}
            onChange={(e) => setInvestments({...investments, elss: Number(e.target.value)})}
            min={0}
            max={150000}
            step={5000}
            formatValue={formatCurrency}
          />

          <Slider
            label="PPF Contribution"
            value={investments.ppf}
            onChange={(e) => setInvestments({...investments, ppf: Number(e.target.value)})}
            min={0}
            max={150000}
            step={5000}
            formatValue={formatCurrency}
          />

          <Slider
            label="NPS Contribution"
            value={investments.nps}
            onChange={(e) => setInvestments({...investments, nps: Number(e.target.value)})}
            min={0}
            max={200000}
            step={5000}
            formatValue={formatCurrency}
          />

          <Slider
            label="Life Insurance Premium"
            value={investments.lifeInsurance}
            onChange={(e) => setInvestments({...investments, lifeInsurance: Number(e.target.value)})}
            min={0}
            max={150000}
            step={5000}
            formatValue={formatCurrency}
          />

          <Slider
            label="Home Loan Principal"
            value={investments.homeLoan}
            onChange={(e) => setInvestments({...investments, homeLoan: Number(e.target.value)})}
            min={0}
            max={150000}
            step={5000}
            formatValue={formatCurrency}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20">
            <PiggyBank className="w-8 h-8 mb-2 text-blue-500" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Section 80C</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {formatCurrency(section80CLimit)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Max ₹1.5L</p>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20">
            <Shield className="w-8 h-8 mb-2 text-purple-500" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">80CCD(1B) NPS</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {formatCurrency(section80CCD1B)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Max ₹50K</p>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20">
            <TrendingDown className="w-8 h-8 mb-2 text-green-500" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tax Saved (30%)</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {formatCurrency(taxSaved30)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Highest bracket</p>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20">
            <Receipt className="w-8 h-8 mb-2 text-orange-500" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tax Saved (20%)</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {formatCurrency(taxSaved20)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Middle bracket</p>
          </div>
        </div>

        <div className="mt-6 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <p className="text-gray-700 dark:text-gray-300">
            💡 <strong>Pro Tip:</strong> Maximize NPS contribution to get an additional ₹50,000 
            deduction over and above the ₹1.5 lakh limit under Section 80C. This can save you up 
            to ₹{formatCurrency(15000)} in taxes (30% bracket)!
          </p>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {taxInstruments.map((instrument, index) => (
          <GlassCard key={index} className="p-6" hover>
            <div className="text-4xl mb-4">{instrument.icon}</div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
              {instrument.name}
            </h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Section</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {instrument.section}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Limit</span>
                <span className="font-semibold text-gray-800 dark:text-white">
                  {instrument.limit}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Lock-in</span>
                <span className="font-semibold text-gray-800 dark:text-white">
                  {instrument.lockIn}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Returns</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {instrument.returns}
                </span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Key Benefits:
              </p>
              <ul className="space-y-1">
                {instrument.benefits.slice(0, 3).map((benefit, i) => (
                  <li key={i} className="text-xs text-gray-600 dark:text-gray-300 flex items-start gap-2">
                    <span className="text-green-500 flex-shrink-0">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          📊 Tax Saving Strategy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">For Aggressive Investors:</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• ELSS: ₹1,50,000 (80C) - High returns + tax benefits</li>
              <li>• NPS: ₹50,000 (80CCD1B) - Additional deduction</li>
              <li>• <strong>Total Tax Saving: ₹60,000 (30% bracket)</strong></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">For Conservative Investors:</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• PPF: ₹1,00,000 (80C) - Safe + tax-free returns</li>
              <li>• NPS: ₹50,000 (80C) - Retirement planning</li>
              <li>• NPS: ₹50,000 (80CCD1B) - Extra deduction</li>
              <li>• <strong>Total Tax Saving: ₹60,000 (30% bracket)</strong></li>
            </ul>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default TaxSavingGuide;
