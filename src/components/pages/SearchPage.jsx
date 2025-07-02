import React, { useState, useEffect } from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '@/components/molecules/SearchBar';
import HadithCard from '@/components/organisms/HadithCard';
import FontSizeControl from '@/components/molecules/FontSizeControl';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { hadithService } from '@/services/api/hadithService';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useOutletContext();
  
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [fontSize, setFontSize] = useState(16);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  
  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      
      const searchResults = await hadithService.search(searchQuery);
      setResults(searchResults);
      
      // Update URL
      setSearchParams({ q: searchQuery });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Search on component mount if query exists
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      setQuery(urlQuery);
      performSearch(urlQuery);
    }
  }, []);
  
  // Get font size from localStorage
  useEffect(() => {
    const savedFontSize = localStorage.getItem('hadith-font-size');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
    }
  }, []);
  
  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
    localStorage.setItem('hadith-font-size', newSize.toString());
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Search Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-cream-200 px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl font-bold text-islamic-700 font-display mb-2">
              Search Hadith
            </h1>
            <p className="text-islamic-600 arabic-text text-lg">
              احادیث میں تلاش کریں
            </p>
            <p className="text-islamic-500 mt-2">
              Search across all Hadith collections in Arabic and Urdu
            </p>
          </motion.div>
          
          <SearchBar
            onSearch={performSearch}
            placeholder="Search Hadith by keywords, narrator, or topic..."
          />
          
          {hasSearched && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 gap-4">
              <div className="flex items-center space-x-2 text-sm text-islamic-600">
                <ApperIcon name="Search" size={16} />
                <span>
                  {loading ? 'Searching...' : `${results.length} results for "${query}"`}
                </span>
              </div>
              
              <div className="w-full sm:w-64">
                <FontSizeControl
                  value={fontSize}
                  onChange={handleFontSizeChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Results */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6">
          {loading && <Loading />}
          
          {error && (
            <Error
              message={error}
              onRetry={() => performSearch(query)}
            />
          )}
          
          {!loading && !error && hasSearched && results.length === 0 && (
            <Empty
              title="No Results Found"
              message={`No Hadith found matching "${query}". Try different keywords or check your spelling.`}
              icon="SearchX"
            />
          )}
          
          {!loading && !error && !hasSearched && (
            <div className="text-center py-16">
              <div className="bg-gradient-to-br from-islamic-50 to-islamic-100 rounded-full p-8 mx-auto w-fit mb-6">
                <ApperIcon name="Search" size={64} className="text-islamic-400" />
              </div>
              
              <h3 className="text-2xl font-semibold text-islamic-700 mb-3 font-display">
                Start Your Search
              </h3>
              
              <p className="text-islamic-500 mb-8 max-w-md mx-auto leading-relaxed">
                Enter keywords, topics, or narrator names to search through thousands of authentic Hadith
              </p>
              
              <div className="bg-white rounded-xl p-6 max-w-md mx-auto border border-cream-200">
                <h4 className="font-semibold text-islamic-700 mb-3">Search Tips:</h4>
                <ul className="text-sm text-islamic-600 space-y-2 text-left">
                  <li className="flex items-center space-x-2">
                    <ApperIcon name="CheckCircle" size={14} className="text-green-500" />
                    <span>Use specific keywords</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ApperIcon name="CheckCircle" size={14} className="text-green-500" />
                    <span>Search in Arabic or Urdu</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ApperIcon name="CheckCircle" size={14} className="text-green-500" />
                    <span>Try narrator names</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          
          {!loading && !error && results.length > 0 && (
            <div className="space-y-6">
              {results.map((hadith, index) => (
                <motion.div
                  key={hadith.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <HadithCard
                    hadith={hadith}
                    language={language}
                    fontSize={fontSize}
                    searchQuery={query}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;