import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { bookmarkService } from '@/services/api/bookmarkService';

const HadithCard = ({ 
  hadith, 
  language = 'both', 
  fontSize = 16,
  searchQuery = null,
  className = '' 
}) => {
  const [isBookmarked, setIsBookmarked] = useState(
    bookmarkService.isBookmarked(hadith.Id)
  );
  
  const highlightText = (text, query) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="search-highlight">
          {part}
        </span>
      ) : part
    );
  };
  
  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (isBookmarked) {
        await bookmarkService.removeBookmark(hadith.Id);
        setIsBookmarked(false);
        toast.success('Bookmark removed');
      } else {
        await bookmarkService.addBookmark({
          hadithId: hadith.Id,
          dateAdded: new Date().toISOString(),
          note: ''
        });
        setIsBookmarked(true);
        toast.success('Hadith bookmarked');
      }
    } catch (error) {
      toast.error('Failed to update bookmark');
    }
  };
  
  const showArabic = language === 'both' || language === 'arabic';
  const showUrdu = language === 'both' || language === 'urdu';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`bg-white rounded-xl shadow-sm border border-cream-200 hadith-card-shadow transition-all duration-200 ${className}`}
    >
      <Link to={`/hadith/${hadith.Id}`} className="block">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-gold-400 to-gold-600 text-white px-3 py-1 rounded-full text-sm font-bold font-display">
                {hadith.number}
              </div>
              <div className="text-sm text-islamic-500">
                <span className="font-medium">{hadith.bookName}</span>
                {hadith.chapterTitle && (
                  <span className="mx-2">•</span>
                )}
                {hadith.chapterTitle && (
                  <span>{hadith.chapterTitle}</span>
                )}
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleBookmark}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked 
                  ? 'text-gold-600 bg-gold-50 hover:bg-gold-100' 
                  : 'text-islamic-400 hover:text-gold-600 hover:bg-gold-50'
              }`}
            >
              <ApperIcon 
                name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
                size={18}
                className={isBookmarked ? "fill-current" : ""}
              />
            </motion.button>
          </div>
          
          {/* Arabic Text */}
          {showArabic && (
            <div className="mb-4">
              <p 
                className="arabic-text text-islamic-700 leading-loose"
                style={{ fontSize: fontSize + 2 }}
              >
                {searchQuery ? highlightText(hadith.arabicText, searchQuery) : hadith.arabicText}
              </p>
            </div>
          )}
          
          {/* Separator */}
          {showArabic && showUrdu && (
            <div className="border-t border-cream-200 my-4"></div>
          )}
          
          {/* Urdu Translation */}
          {showUrdu && (
            <div className="mb-4">
              <p 
                className="urdu-text text-islamic-600 leading-relaxed"
                style={{ fontSize: fontSize }}
              >
                {searchQuery ? highlightText(hadith.urduText, searchQuery) : hadith.urduText}
              </p>
            </div>
          )}
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-cream-100">
            <div className="flex items-center space-x-4 text-sm text-islamic-500">
              {hadith.narrator && (
                <div className="flex items-center space-x-1">
                  <ApperIcon name="User" size={14} />
                  <span>Narrator: {hadith.narrator}</span>
                </div>
              )}
              
              {hadith.authenticity && (
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Shield" size={14} />
                  <span className={`font-medium ${
                    hadith.authenticity === 'Sahih' ? 'text-green-600' :
                    hadith.authenticity === 'Hasan' ? 'text-yellow-600' :
                    'text-gray-600'
                  }`}>
                    {hadith.authenticity}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-1 text-islamic-400">
              <ApperIcon name="ArrowRight" size={14} />
              <span className="text-sm">Read more</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default HadithCard;