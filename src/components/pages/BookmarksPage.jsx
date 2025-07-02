import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import HadithCard from '@/components/organisms/HadithCard';
import FontSizeControl from '@/components/molecules/FontSizeControl';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { bookmarkService } from '@/services/api/bookmarkService';
import { hadithService } from '@/services/api/hadithService';

const BookmarksPage = () => {
  const { language } = useOutletContext();
  
  const [bookmarks, setBookmarks] = useState([]);
  const [hadithList, setHadithList] = useState([]);
  const [fontSize, setFontSize] = useState(16);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const loadBookmarks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const bookmarkData = await bookmarkService.getAll();
      setBookmarks(bookmarkData);
      
      // Load hadith details for each bookmark
      const hadithPromises = bookmarkData.map(bookmark => 
        hadithService.getById(bookmark.hadithId)
      );
      
      const hadithResults = await Promise.all(hadithPromises);
      setHadithList(hadithResults.filter(hadith => hadith !== null));
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadBookmarks();
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
  
  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to remove all bookmarks?')) {
      try {
        await bookmarkService.clearAll();
        setBookmarks([]);
        setHadithList([]);
        toast.success('All bookmarks cleared');
      } catch (err) {
        toast.error('Failed to clear bookmarks');
      }
    }
  };
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadBookmarks} />;
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-cream-200 px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl font-bold text-islamic-700 font-display mb-2">
              Bookmarked Hadith
            </h1>
            <p className="text-islamic-600 arabic-text text-lg">
              نشان زدہ احادیث
            </p>
            <p className="text-islamic-500 mt-2">
              Your saved Hadith collection for easy reference
            </p>
          </motion.div>
          
          {hadithList.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-islamic-600">
                  <ApperIcon name="Bookmark" size={16} />
                  <span>{hadithList.length} saved Hadith</span>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  icon="Trash2"
                  onClick={handleClearAll}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Clear All
                </Button>
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
      
      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6">
          {hadithList.length === 0 ? (
            <Empty
              title="No Bookmarks Yet"
              message="Start bookmarking Hadith to build your personal collection. Click the bookmark icon on any Hadith to save it here."
              icon="BookmarkPlus"
              actionText="Browse Hadith"
              onAction={() => window.location.href = '/'}
            />
          ) : (
            <div className="space-y-6">
              {hadithList.map((hadith, index) => (
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

export default BookmarksPage;