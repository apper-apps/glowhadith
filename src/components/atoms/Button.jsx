import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon = null,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-islamic-600 to-islamic-700 text-white hover:from-islamic-700 hover:to-islamic-800 focus:ring-islamic-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-600 hover:to-gold-700 focus:ring-gold-500 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-islamic-300 text-islamic-700 hover:bg-islamic-50 focus:ring-islamic-500 hover:border-islamic-400',
    ghost: 'text-islamic-600 hover:bg-islamic-50 focus:ring-islamic-500',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm space-x-1.5',
    md: 'px-4 py-2.5 text-sm space-x-2',
    lg: 'px-6 py-3 text-base space-x-2.5'
  };
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" size={16} className="animate-spin mr-1" />
      )}
      {!loading && icon && iconPosition === 'left' && (
        <ApperIcon name={icon} size={16} />
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <ApperIcon name={icon} size={16} />
      )}
    </motion.button>
  );
};

export default Button;