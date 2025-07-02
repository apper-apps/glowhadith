import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ onSearch, placeholder = "Search Hadith in Arabic or Urdu...", className = '' }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };
  
  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSearch}
      className={`flex items-center space-x-2 ${className}`}
    >
      <div className="flex-1 relative">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          leftIcon="Search"
          className="bg-white/80 backdrop-blur-sm border-cream-200 focus:bg-white"
        />
      </div>
      
      <Button
        type="submit"
        disabled={!query.trim()}
        icon="Search"
        className="px-4"
      >
        <span className="hidden sm:inline">Search</span>
      </Button>
    </motion.form>
  );
};

export default SearchBar;