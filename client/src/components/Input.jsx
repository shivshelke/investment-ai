import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder = '',
  required = false,
  min,
  max,
  step,
  className = '',
  ...props 
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        className="w-full px-4 py-3 rounded-xl 
                   bg-white/50 dark:bg-white/5 
                   backdrop-blur-sm
                   border border-gray-300 dark:border-white/10
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   text-gray-800 dark:text-white
                   placeholder-gray-400 dark:placeholder-gray-500
                   transition-all duration-300"
        {...props}
      />
    </div>
  );
};

export default Input;
