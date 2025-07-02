import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ type = 'hadith' }) => {
  if (type === 'books') {
    return (
      <div className="space-y-4 p-4">
        {[...Array(4)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-cream-200 rounded-lg p-4 space-y-3"
          >
            <div className="h-6 bg-cream-300 rounded animate-pulse"></div>
            <div className="h-4 bg-cream-300 rounded w-3/4 animate-pulse"></div>
            <div className="h-3 bg-cream-300 rounded w-1/2 animate-pulse"></div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'chapters') {
    return (
      <div className="space-y-3 p-4">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center space-x-3 p-3 bg-cream-100 rounded-md"
          >
            <div className="w-8 h-8 bg-cream-300 rounded animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-cream-300 rounded animate-pulse"></div>
              <div className="h-3 bg-cream-300 rounded w-2/3 animate-pulse"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-cream-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-16 h-6 bg-gold-200 rounded animate-pulse"></div>
            <div className="w-6 h-6 bg-cream-300 rounded animate-pulse"></div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-6 bg-cream-300 rounded animate-pulse"></div>
              <div className="h-6 bg-cream-300 rounded w-4/5 animate-pulse"></div>
              <div className="h-6 bg-cream-300 rounded w-3/4 animate-pulse"></div>
            </div>
            
            <div className="border-t border-cream-200 pt-4 space-y-2">
              <div className="h-5 bg-cream-300 rounded animate-pulse"></div>
              <div className="h-5 bg-cream-300 rounded w-5/6 animate-pulse"></div>
              <div className="h-5 bg-cream-300 rounded w-4/5 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;