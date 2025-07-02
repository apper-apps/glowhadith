import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const FontSizeControl = ({ 
  value = 16, 
  onChange,
  min = 12,
  max = 24,
  className = '' 
}) => {
  const sizes = [
    { value: 12, label: 'Small', icon: 'Minus' },
    { value: 16, label: 'Medium', icon: 'Type' },
    { value: 20, label: 'Large', icon: 'Plus' },
    { value: 24, label: 'X-Large', icon: 'Plus' }
  ];
  
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-islamic-700">Font Size</span>
        <span className="text-sm text-islamic-500">{value}px</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(Math.max(min, value - 2))}
          disabled={value <= min}
          className="p-2 rounded-lg bg-cream-100 text-islamic-600 hover:bg-cream-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ApperIcon name="Minus" size={16} />
        </motion.button>
        
        <input
          type="range"
          min={min}
          max={max}
          step={2}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="flex-1 h-2 bg-cream-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #2D6A4F 0%, #2D6A4F ${((value - min) / (max - min)) * 100}%, #F1EBE0 ${((value - min) / (max - min)) * 100}%, #F1EBE0 100%)`
          }}
        />
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(Math.min(max, value + 2))}
          disabled={value >= max}
          className="p-2 rounded-lg bg-cream-100 text-islamic-600 hover:bg-cream-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ApperIcon name="Plus" size={16} />
        </motion.button>
      </div>
      
      <div className="flex justify-between text-xs text-islamic-400">
        {sizes.map((size) => (
          <button
            key={size.value}
            onClick={() => onChange(size.value)}
            className={`px-2 py-1 rounded transition-colors ${
              value === size.value ? 'text-islamic-600 bg-cream-200' : 'hover:text-islamic-600'
            }`}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontSizeControl;