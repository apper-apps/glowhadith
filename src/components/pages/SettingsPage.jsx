import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import LanguageToggle from '@/components/molecules/LanguageToggle';
import FontSizeControl from '@/components/molecules/FontSizeControl';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const SettingsPage = () => {
  const { language, setLanguage } = useOutletContext();
  
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('light');
  const [autoBookmark, setAutoBookmark] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(false);
  
  // Load settings from localStorage
  useEffect(() => {
    const savedFontSize = localStorage.getItem('hadith-font-size');
    const savedTheme = localStorage.getItem('hadith-theme');
    const savedAutoBookmark = localStorage.getItem('hadith-auto-bookmark');
    const savedTransliteration = localStorage.getItem('hadith-transliteration');
    
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
    if (savedTheme) setTheme(savedTheme);
    if (savedAutoBookmark) setAutoBookmark(savedAutoBookmark === 'true');
    if (savedTransliteration) setShowTransliteration(savedTransliteration === 'true');
  }, []);
  
  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
    localStorage.setItem('hadith-font-size', newSize.toString());
    toast.success('Font size updated');
  };
  
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('hadith-language', newLanguage);
    toast.success('Language preference updated');
  };
  
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('hadith-theme', newTheme);
    toast.success('Theme updated');
  };
  
  const handleAutoBookmarkChange = (enabled) => {
    setAutoBookmark(enabled);
    localStorage.setItem('hadith-auto-bookmark', enabled.toString());
    toast.success(`Auto-bookmark ${enabled ? 'enabled' : 'disabled'}`);
  };
  
  const handleTransliterationChange = (enabled) => {
    setShowTransliteration(enabled);
    localStorage.setItem('hadith-transliteration', enabled.toString());
    toast.success(`Transliteration ${enabled ? 'enabled' : 'disabled'}`);
  };
  
  const resetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setFontSize(16);
      setLanguage('both');
      setTheme('light');
      setAutoBookmark(false);
      setShowTransliteration(false);
      
      localStorage.removeItem('hadith-font-size');
      localStorage.removeItem('hadith-language');
      localStorage.removeItem('hadith-theme');
      localStorage.removeItem('hadith-auto-bookmark');
      localStorage.removeItem('hadith-transliteration');
      
      toast.success('Settings reset to default');
    }
  };
  
  const settingSections = [
    {
      title: 'Display Settings',
      titleUrdu: 'ڈسپلے کی ترتیبات',
      icon: 'Monitor',
      settings: [
        {
          label: 'Language Display',
          labelUrdu: 'زبان',
          description: 'Choose how to display Arabic and Urdu text',
          component: (
            <LanguageToggle
              value={language}
              onChange={handleLanguageChange}
            />
          )
        },
        {
          label: 'Font Size',
          labelUrdu: 'خط کا سائز',
          description: 'Adjust text size for comfortable reading',
          component: (
            <FontSizeControl
              value={fontSize}
              onChange={handleFontSizeChange}
            />
          )
        },
        {
          label: 'Theme',
          labelUrdu: 'تھیم',
          description: 'Choose your preferred color theme',
          component: (
            <div className="flex space-x-2">
              {['light', 'dark'].map((themeOption) => (
                <motion.button
                  key={themeOption}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleThemeChange(themeOption)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all
                    ${theme === themeOption 
                      ? 'bg-islamic-600 text-white border-islamic-600' 
                      : 'bg-white text-islamic-700 border-cream-300 hover:border-islamic-300'
                    }
                  `}
                >
                  <ApperIcon 
                    name={themeOption === 'light' ? 'Sun' : 'Moon'} 
                    size={16} 
                  />
                  <span className="capitalize">{themeOption}</span>
                </motion.button>
              ))}
            </div>
          )
        }
      ]
    },
    {
      title: 'Reading Preferences',
      titleUrdu: 'پڑھنے کی ترجیحات',
      icon: 'BookOpen',
      settings: [
        {
          label: 'Show Transliteration',
          labelUrdu: 'نقل حروف',
          description: 'Display Arabic text in Roman letters',
          component: (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTransliterationChange(!showTransliteration)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${showTransliteration ? 'bg-islamic-600' : 'bg-cream-300'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${showTransliteration ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </motion.button>
          )
        },
        {
          label: 'Auto-bookmark on Read',
          labelUrdu: 'خودکار نشان زدہ',
          description: 'Automatically bookmark Hadith when you read them',
          component: (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAutoBookmarkChange(!autoBookmark)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${autoBookmark ? 'bg-islamic-600' : 'bg-cream-300'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${autoBookmark ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </motion.button>
          )
        }
      ]
    }
  ];
  
  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-islamic-700 font-display mb-2">
            Settings
          </h1>
          <p className="text-islamic-600 arabic-text text-lg">
            ترتیبات
          </p>
          <p className="text-islamic-500 mt-2">
            Customize your reading experience
          </p>
        </motion.div>
        
        {/* Settings Sections */}
        <div className="space-y-8">
          {settingSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-cream-200 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-islamic-50 to-islamic-100 px-6 py-4 border-b border-cream-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-islamic-600 rounded-lg flex items-center justify-center">
                    <ApperIcon name={section.icon} size={18} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-islamic-700 font-display">
                      {section.title}
                    </h2>
                    <p className="text-sm text-islamic-500 arabic-text">
                      {section.titleUrdu}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {section.settings.map((setting, settingIndex) => (
                  <motion.div
                    key={setting.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (sectionIndex * 0.1) + (settingIndex * 0.05) }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-islamic-700">
                          {setting.label}
                        </h3>
                        <span className="text-sm text-islamic-500 arabic-text">
                          {setting.labelUrdu}
                        </span>
                      </div>
                      <p className="text-sm text-islamic-500">
                        {setting.description}
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0">
                      {setting.component}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Reset Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-cream-200 p-6 mt-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-islamic-700 mb-1">
                Reset Settings
              </h3>
              <p className="text-sm text-islamic-500">
                Restore all settings to their default values
              </p>
            </div>
            
            <Button
              variant="outline"
              icon="RotateCcw"
              onClick={resetSettings}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Reset to Default
            </Button>
          </div>
        </motion.div>
        
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-islamic-50 to-islamic-100 rounded-xl p-6 mt-8 text-center"
        >
          <ApperIcon name="Heart" size={24} className="mx-auto mb-3 text-gold-600" />
          <h3 className="font-semibold text-islamic-700 mb-2 font-display">
            Hadith Hub
          </h3>
          <p className="text-sm text-islamic-600 mb-2 arabic-text">
            "طلب العلم فریضة على کل مسلم"
          </p>
          <p className="text-xs text-islamic-500">
            Seeking knowledge is obligatory upon every Muslim
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;