import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ 
  message = "Something went wrong", 
  onRetry = null,
  title = "Error Loading Content"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
    >
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-full p-4 mb-6">
        <ApperIcon 
          name="AlertTriangle" 
          size={48} 
          className="text-red-500"
        />
      </div>
      
      <h3 className="text-xl font-semibold text-islamic-700 mb-2 font-display">
        {title}
      </h3>
      
      <p className="text-islamic-500 mb-6 max-w-md leading-relaxed">
        {message}
      </p>
      
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRetry}
          className="bg-gradient-to-r from-islamic-600 to-islamic-700 text-white px-6 py-3 rounded-lg font-medium hover:from-islamic-700 hover:to-islamic-800 transition-all duration-200 flex items-center space-x-2 shadow-lg"
        >
          <ApperIcon name="RefreshCw" size={16} />
          <span>Try Again</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Error;