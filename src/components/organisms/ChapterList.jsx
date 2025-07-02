import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const ChapterList = ({ chapters, bookId, selectedChapterId = null, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {chapters.map((chapter, index) => (
        <motion.div
          key={chapter.Id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Link
            to={`/book/${bookId}/chapter/${chapter.Id}`}
            className={`
              flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group
              ${selectedChapterId === chapter.Id 
                ? 'bg-gradient-to-r from-islamic-50 to-islamic-100 border border-islamic-200' 
                : 'hover:bg-cream-100 border border-transparent'
              }
            `}
          >
            <div className={`
              w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors
              ${selectedChapterId === chapter.Id
                ? 'bg-islamic-600 text-white'
                : 'bg-cream-200 text-islamic-600 group-hover:bg-islamic-100'
              }
            `}>
              {chapter.numberInBook}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className={`font-medium truncate ${
                selectedChapterId === chapter.Id ? 'text-islamic-700' : 'text-islamic-600'
              }`}>
                {chapter.titleUrdu}
              </h4>
              
              {chapter.titleArabic && (
                <p className={`arabic-text text-sm mt-1 truncate ${
                  selectedChapterId === chapter.Id ? 'text-islamic-600' : 'text-islamic-500'
                }`}>
                  {chapter.titleArabic}
                </p>
              )}
            </div>
            
            <ApperIcon 
              name="ChevronRight" 
              size={16} 
              className={`transition-colors ${
                selectedChapterId === chapter.Id ? 'text-islamic-600' : 'text-islamic-400'
              }`}
            />
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ChapterList;