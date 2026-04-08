import React, { useState } from 'react';

const Slider = ({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1,
  unit = '',
  formatValue,
  className = ''
}) => {
  const displayValue = formatValue ? formatValue(value) : `${value}${unit}`;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer
                   bg-gray-200 dark:bg-gray-700
                   slider"
        style={{
          background: `linear-gradient(to right, 
            rgb(59, 130, 246) 0%, 
            rgb(59, 130, 246) ${((value - min) / (max - min)) * 100}%, 
            rgb(229, 231, 235) ${((value - min) / (max - min)) * 100}%, 
            rgb(229, 231, 235) 100%)`
        }}
      />
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{formatValue ? formatValue(min) : `${min}${unit}`}</span>
        <span>{formatValue ? formatValue(max) : `${max}${unit}`}</span>
      </div>
    </div>
  );
};

export default Slider;
