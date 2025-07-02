import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "No Items Found",
  message = "There are no items to display at the moment.",
  actionText = null,
  onAction = null,
  icon = "BookOpen"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="bg-gradient-to-br from-islamic-50 to-islamic-100 rounded-full p-6 mb-6">
        <ApperIcon 
          name={icon} 
          size={64} 
          className="text-islamic-400"
        />
      </div>
      
      <h3 className="text-2xl font-semibold text-islamic-700 mb-3 font-display">
        {title}
      </h3>
      
      <p className="text-islamic-500 mb-8 max-w-md leading-relaxed">
        {message}
      </p>
      
      {actionText && onAction && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAction}
          className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-3 rounded-lg font-medium hover:from-gold-600 hover:to-gold-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
        >
          <ApperIcon name="Plus" size={16} />
          <span>{actionText}</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;