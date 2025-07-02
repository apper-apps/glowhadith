import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = ({ 
  label = null,
  error = null,
  leftIcon = null,
  rightIcon = null,
  className = '',
  containerClassName = '',
  ...props 
}) => {
  const inputClasses = `
    w-full px-4 py-2.5 rounded-lg border border-cream-300 
    focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500 
    bg-white text-islamic-700 placeholder-islamic-400
    transition-all duration-200
    ${leftIcon ? 'pl-10' : ''}
    ${rightIcon ? 'pr-10' : ''}
    ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-500' : ''}
    ${className}
  `;
  
  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label className="text-sm font-medium text-islamic-700 block mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <ApperIcon 
            name={leftIcon} 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-islamic-400" 
          />
        )}
        
        <input
          className={inputClasses}
          {...props}
        />
        
        {rightIcon && (
          <ApperIcon 
            name={rightIcon} 
            size={18} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-islamic-400" 
          />
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <ApperIcon name="AlertCircle" size={14} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default Input;