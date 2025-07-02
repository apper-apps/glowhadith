import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const menuItems = [
    {
      path: '/',
      label: 'Browse Books',
      labelUrdu: 'کتابیں',
      icon: 'BookOpen',
      description: 'Explore Hadith collections'
    },
    {
      path: '/search',
      label: 'Search',
      labelUrdu: 'تلاش',
      icon: 'Search',
      description: 'Find specific Hadith'
    },
{
      path: '/bookmarks',
      label: 'Bookmarks',
      labelUrdu: 'نشان زدہ',
      icon: 'Bookmark',
      description: 'Saved Hadith'
    },
    {
      path: '/timer',
      label: 'Timer',
      labelUrdu: 'ٹائمر',
      icon: 'Clock',
      description: 'Study Timer'
    },
    {
      path: '/settings',
      label: 'Settings',
      labelUrdu: 'ترتیبات',
      icon: 'Settings',
      description: 'Preferences'
    }
  ];
  
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };
  
  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      opacity: 0,
      x: -20
    }
  };
  
  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-islamic-700 via-islamic-800 to-islamic-900 text-white shadow-2xl lg:shadow-none sidebar-pattern lg:transform-none"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-islamic-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center">
                  <ApperIcon name="BookOpen" size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-display">Hadith Hub</h2>
                  <p className="text-xs text-islamic-300 font-urdu">
                    احادیث کا ڈیجیٹل خزانہ
                  </p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="lg:hidden p-2 rounded-lg text-islamic-300 hover:text-white hover:bg-islamic-600 transition-colors"
              >
                <ApperIcon name="X" size={18} />
              </motion.button>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                variants={itemVariants}
                initial="closed"
                animate="open"
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && onClose()}
                  className={({ isActive }) => `
                    flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg' 
                      : 'text-islamic-200 hover:text-white hover:bg-islamic-600/50'
                    }
                  `}
                >
                  <div className={`
                    p-2 rounded-lg transition-colors
                    ${location.pathname === item.path
                      ? 'bg-white/20'
                      : 'bg-islamic-600/50 group-hover:bg-islamic-500/50'
                    }
                  `}>
                    <ApperIcon name={item.icon} size={18} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-xs font-urdu opacity-75">
                        {item.labelUrdu}
                      </span>
                    </div>
                    <p className="text-xs opacity-75 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </NavLink>
              </motion.div>
            ))}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-islamic-600">
            <div className="bg-islamic-600/30 rounded-lg p-3 text-center">
              <ApperIcon name="Heart" size={16} className="mx-auto mb-2 text-gold-400" />
              <p className="text-xs text-islamic-300 font-urdu">
                "طلب العلم فریضة على کل مسلم"
              </p>
              <p className="text-xs text-islamic-400 mt-1">
                Seeking knowledge is obligatory upon every Muslim
              </p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;