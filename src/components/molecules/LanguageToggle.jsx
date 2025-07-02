import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const LanguageToggle = ({ 
  value = 'both', 
  onChange,
  className = '' 
}) => {
  const options = [
    { value: 'arabic', label: 'عربي', icon: 'Languages' },
    { value: 'both', label: 'Both', icon: 'Globe' },
    { value: 'urdu', label: 'اردو', icon: 'Type' }
  ];
  
  return (
    <div className={`inline-flex bg-cream-100 rounded-lg p-1 ${className}`}>
      {options.map((option) => (
        <motion.button
          key={option.value}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChange(option.value)}
          className={`
            flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
            ${value === option.value 
              ? 'bg-white text-islamic-700 shadow-sm' 
              : 'text-islamic-500 hover:text-islamic-700'
            }
          `}
        >
          <ApperIcon name={option.icon} size={14} />
          <span>{option.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default LanguageToggle;