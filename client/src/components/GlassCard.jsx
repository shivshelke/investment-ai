import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hover = false, ...props }) => {
  const baseClasses = `
    backdrop-blur-md bg-white/10 dark:bg-white/5
    border border-white/20 dark:border-white/10
    rounded-2xl shadow-xl
    transition-all duration-300
  `;
  
  const hoverClasses = hover ? 'hover:bg-white/20 dark:hover:bg-white/10 hover:shadow-2xl hover:scale-105' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
