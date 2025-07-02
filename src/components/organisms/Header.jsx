import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SearchBar from '@/components/molecules/SearchBar';
import LanguageToggle from '@/components/molecules/LanguageToggle';
import ApperIcon from '@/components/ApperIcon';

const Header = ({ 
  onToggleSidebar, 
  language, 
  onLanguageChange,
  isSidebarOpen 
}) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/95 backdrop-blur-sm border-b border-cream-200 sticky top-0 z-40"
    >
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-islamic-600 hover:bg-islamic-50 transition-colors"
            >
              <ApperIcon name={isSidebarOpen ? "X" : "Menu"} size={20} />
            </motion.button>
            
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-islamic-600 to-islamic-700 rounded-lg flex items-center justify-center">
                <ApperIcon name="BookOpen" size={18} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold font-display text-islamic-700">
                  Hadith Hub
                </h1>
                <p className="text-xs text-islamic-500 font-urdu">
                  احادیث کا ڈیجیٹل خزانہ
                </p>
              </div>
            </Link>
          </div>
          
          {/* Center - Search (Desktop) */}
          <div className="hidden md:block flex-1 max-w-lg mx-6">
            <SearchBar />
          </div>
          
          {/* Right section */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <div className="hidden sm:block">
              <LanguageToggle
                value={language}
                onChange={onLanguageChange}
              />
            </div>
            
            {/* Mobile Search Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="md:hidden p-2 rounded-lg text-islamic-600 hover:bg-islamic-50 transition-colors"
            >
              <ApperIcon name="Search" size={20} />
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-3 pt-3 border-t border-cream-200"
          >
            <SearchBar />
            <div className="mt-3 sm:hidden">
              <LanguageToggle
                value={language}
                onChange={onLanguageChange}
                className="w-full justify-center"
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;