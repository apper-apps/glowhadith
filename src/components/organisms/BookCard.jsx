import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const BookCard = ({ book, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`bg-white rounded-xl shadow-sm border border-cream-200 hadith-card-shadow transition-all duration-200 ${className}`}
    >
      <Link to={`/book/${book.Id}`} className="block h-full">
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-islamic-600 to-islamic-700 rounded-xl flex items-center justify-center">
              <ApperIcon name="BookOpen" size={24} className="text-white" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-islamic-700 font-display">
                {book.nameUrdu}
              </h3>
              <p className="arabic-text text-islamic-600 text-sm mt-1">
                {book.nameArabic}
              </p>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center space-x-2 text-sm text-islamic-500">
              <ApperIcon name="User" size={14} />
              <span>Author: {book.author}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-islamic-500">
              <ApperIcon name="FileText" size={14} />
              <span>{book.totalHadith} Hadith</span>
            </div>
            
            {book.description && (
              <p className="text-sm text-islamic-600 leading-relaxed">
                {book.description}
              </p>
            )}
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-cream-100 mt-4">
            <div className="flex items-center space-x-2 text-sm text-islamic-500">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Available</span>
            </div>
            
            <div className="flex items-center space-x-1 text-islamic-400">
              <span className="text-sm">Browse</span>
              <ApperIcon name="ArrowRight" size={14} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BookCard;