import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import FontSizeControl from '@/components/molecules/FontSizeControl';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { hadithService } from '@/services/api/hadithService';
import { bookmarkService } from '@/services/api/bookmarkService';

const HadithDetailsPage = () => {
  const { id } = useParams();
  const { language } = useOutletContext();
  
  const [hadith, setHadith] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const loadHadith = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const hadithData = await hadithService.getById(id);
      if (!hadithData) {
        throw new Error('Hadith not found');
      }
      
      setHadith(hadithData);
      setIsBookmarked(bookmarkService.isBookmarked(hadithData.Id));
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadHadith();
  }, [id]);
  
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
  
  const handleBookmark = async () => {
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
  
  const copyToClipboard = () => {
    const text = `${hadith.arabicText}\n\n${hadith.urduText}\n\n- ${hadith.bookName} #${hadith.number}`;
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Hadith copied to clipboard');
    }).catch(() => {
      toast.error('Failed to copy text');
    });
  };
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadHadith} />;
  if (!hadith) return <Error message="Hadith not found" />;
  
  const showArabic = language === 'both' || language === 'arabic';
  const showUrdu = language === 'both' || language === 'urdu';
  
  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm mb-6"
        >
          <Link
            to="/"
            className="flex items-center space-x-1 text-islamic-500 hover:text-islamic-700 transition-colors"
          >
            <ApperIcon name="Home" size={16} />
            <span>Home</span>
          </Link>
          
          <ApperIcon name="ChevronRight" size={14} className="text-islamic-400" />
          
          {hadith.bookId && (
            <>
              <Link
                to={`/book/${hadith.bookId}`}
                className="text-islamic-500 hover:text-islamic-700 transition-colors"
              >
                {hadith.bookName}
              </Link>
              <ApperIcon name="ChevronRight" size={14} className="text-islamic-400" />
            </>
          )}
          
          <span className="text-islamic-700 font-medium">
            Hadith #{hadith.number}
          </span>
        </motion.nav>
        
        {/* Main Content */}
        <div className="space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-cream-200 p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-gold-400 to-gold-600 text-white px-4 py-2 rounded-xl text-lg font-bold font-display">
                  {hadith.number}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-islamic-700 font-display">
                    {hadith.bookName}
                  </h1>
                  {hadith.chapterTitle && (
                    <p className="text-islamic-600 mt-1">
                      {hadith.chapterTitle}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  icon="Copy"
                  onClick={copyToClipboard}
                  size="sm"
                >
                  Copy
                </Button>
                
                <Button
                  variant={isBookmarked ? "secondary" : "outline"}
                  icon={isBookmarked ? "Bookmark" : "BookmarkPlus"}
                  onClick={handleBookmark}
                  size="sm"
                >
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
              </div>
            </div>
            
            <FontSizeControl
              value={fontSize}
              onChange={handleFontSizeChange}
              className="max-w-sm"
            />
          </motion.div>
          
          {/* Hadith Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-cream-200 p-8"
          >
            {/* Arabic Text */}
            {showArabic && (
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-islamic-600 rounded-full flex items-center justify-center">
                    <ApperIcon name="Languages" size={12} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-islamic-700">Arabic Text</h3>
                </div>
                
                <div className="bg-gradient-to-br from-islamic-50 to-islamic-100 rounded-xl p-6">
                  <p 
                    className="arabic-text text-islamic-700 leading-loose"
                    style={{ fontSize: fontSize + 4 }}
                  >
                    {hadith.arabicText}
                  </p>
                </div>
              </div>
            )}
            
            {/* Urdu Translation */}
            {showUrdu && (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-gold-600 rounded-full flex items-center justify-center">
                    <ApperIcon name="Type" size={12} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-islamic-700">Urdu Translation</h3>
                </div>
                
                <div className="bg-gradient-to-br from-cream-50 to-cream-100 rounded-xl p-6">
                  <p 
                    className="urdu-text text-islamic-600 leading-relaxed"
                    style={{ fontSize: fontSize }}
                  >
                    {hadith.urduText}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Hadith Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-cream-200 p-6"
          >
            <h3 className="font-semibold text-islamic-700 mb-4 font-display">
              Hadith Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hadith.narrator && (
                <div className="flex items-center space-x-3 p-4 bg-cream-50 rounded-lg">
                  <ApperIcon name="User" size={20} className="text-islamic-600" />
                  <div>
                    <p className="text-sm text-islamic-500">Narrator</p>
                    <p className="font-medium text-islamic-700">{hadith.narrator}</p>
                  </div>
                </div>
              )}
              
              {hadith.authenticity && (
                <div className="flex items-center space-x-3 p-4 bg-cream-50 rounded-lg">
                  <ApperIcon name="Shield" size={20} className="text-islamic-600" />
                  <div>
                    <p className="text-sm text-islamic-500">Authenticity</p>
                    <p className={`font-medium ${
                      hadith.authenticity === 'Sahih' ? 'text-green-600' :
                      hadith.authenticity === 'Hasan' ? 'text-yellow-600' :
                      'text-gray-600'
                    }`}>
                      {hadith.authenticity}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-3 p-4 bg-cream-50 rounded-lg">
                <ApperIcon name="BookOpen" size={20} className="text-islamic-600" />
                <div>
                  <p className="text-sm text-islamic-500">Source</p>
                  <p className="font-medium text-islamic-700">{hadith.bookName}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-cream-50 rounded-lg">
                <ApperIcon name="Hash" size={20} className="text-islamic-600" />
                <div>
                  <p className="text-sm text-islamic-500">Hadith Number</p>
                  <p className="font-medium text-islamic-700">#{hadith.number}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center space-x-4"
          >
            <Button
              variant="outline"
              icon="ArrowLeft"
              onClick={() => window.history.back()}
            >
              Back to Browse
            </Button>
            
            <Link to="/search">
              <Button icon="Search">
                Search More
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HadithDetailsPage;