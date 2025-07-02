import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookCard from '@/components/organisms/BookCard';
import ChapterList from '@/components/organisms/ChapterList';
import HadithCard from '@/components/organisms/HadithCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import FontSizeControl from '@/components/molecules/FontSizeControl';
import ApperIcon from '@/components/ApperIcon';
import { bookService } from '@/services/api/bookService';
import { chapterService } from '@/services/api/chapterService';
import { hadithService } from '@/services/api/hadithService';

const BrowsePage = () => {
  const { bookId, chapterId } = useParams();
  const { language } = useOutletContext();
  
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [hadithList, setHadithList] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [fontSize, setFontSize] = useState(16);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookService.getAll();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const loadChapters = async (selectedBookId) => {
    try {
      setLoading(true);
      setError(null);
      const [bookData, chaptersData] = await Promise.all([
        bookService.getById(selectedBookId),
        chapterService.getByBookId(selectedBookId)
      ]);
      setCurrentBook(bookData);
      setChapters(chaptersData);
      setHadithList([]);
      setCurrentChapter(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const loadHadith = async (selectedBookId, selectedChapterId) => {
    try {
      setLoading(true);
      setError(null);
      const [bookData, chapterData, hadithData] = await Promise.all([
        bookService.getById(selectedBookId),
        chapterService.getById(selectedChapterId),
        hadithService.getByChapterId(selectedChapterId)
      ]);
      setCurrentBook(bookData);
      setCurrentChapter(chapterData);
      setHadithList(hadithData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (bookId && chapterId) {
      loadHadith(bookId, chapterId);
    } else if (bookId) {
      loadChapters(bookId);
    } else {
      loadBooks();
    }
  }, [bookId, chapterId]);
  
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
  
  if (loading) return <Loading type={bookId && chapterId ? 'hadith' : bookId ? 'chapters' : 'books'} />;
  if (error) return <Error message={error} onRetry={() => window.location.reload()} />;
  
  return (
    <div className="h-full flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-cream-200 px-6 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-1 text-islamic-500 hover:text-islamic-700 transition-colors"
          >
            <ApperIcon name="ArrowLeft" size={16} />
            <span>Back</span>
          </button>
          
          <ApperIcon name="ChevronRight" size={14} className="text-islamic-400" />
          
          {!bookId && (
            <span className="text-islamic-700 font-medium">All Books</span>
          )}
          
          {bookId && !chapterId && currentBook && (
            <>
              <span className="text-islamic-500">Books</span>
              <ApperIcon name="ChevronRight" size={14} className="text-islamic-400" />
              <span className="text-islamic-700 font-medium">{currentBook.nameUrdu}</span>
            </>
          )}
          
          {bookId && chapterId && currentBook && currentChapter && (
            <>
              <span className="text-islamic-500">Books</span>
              <ApperIcon name="ChevronRight" size={14} className="text-islamic-400" />
              <span className="text-islamic-500">{currentBook.nameUrdu}</span>
              <ApperIcon name="ChevronRight" size={14} className="text-islamic-400" />
              <span className="text-islamic-700 font-medium">{currentChapter.titleUrdu}</span>
            </>
          )}
        </nav>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          {/* Books View */}
          {!bookId && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl font-bold text-islamic-700 font-display mb-2">
                  Hadith Collections
                </h1>
                <p className="text-islamic-600 arabic-text text-lg">
                  مجموعہ احادیث
                </p>
                <p className="text-islamic-500 mt-2">
                  Explore authentic Hadith from major collections
                </p>
              </motion.div>
              
              {books.length === 0 ? (
                <Empty
                  title="No Books Available"
                  message="There are no Hadith books available at the moment."
                  icon="BookOpen"
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {books.map((book, index) => (
                    <motion.div
                      key={book.Id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <BookCard book={book} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Chapters View */}
          {bookId && !chapterId && currentBook && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="bg-white rounded-xl p-6 shadow-sm border border-cream-200">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-islamic-600 to-islamic-700 rounded-xl flex items-center justify-center">
                      <ApperIcon name="BookOpen" size={32} className="text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-islamic-700 font-display">
                        {currentBook.nameUrdu}
                      </h1>
                      <p className="arabic-text text-islamic-600 text-lg mt-1">
                        {currentBook.nameArabic}
                      </p>
                      <p className="text-islamic-500 mt-1">
                        By {currentBook.author} • {currentBook.totalHadith} Hadith
                      </p>
                    </div>
                  </div>
                  
                  {currentBook.description && (
                    <p className="text-islamic-600 leading-relaxed">
                      {currentBook.description}
                    </p>
                  )}
                </div>
              </motion.div>
              
              {chapters.length === 0 ? (
                <Empty
                  title="No Chapters Available"
                  message="There are no chapters available for this book."
                  icon="FileText"
                />
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-cream-200 p-6">
                  <h2 className="text-xl font-semibold text-islamic-700 mb-4 font-display">
                    Chapters
                  </h2>
                  <ChapterList chapters={chapters} bookId={bookId} />
                </div>
              )}
            </div>
          )}
          
          {/* Hadith View */}
          {bookId && chapterId && (
            <div>
              {/* Chapter Header */}
              {currentBook && currentChapter && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-cream-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h1 className="text-2xl font-bold text-islamic-700 font-display">
                          {currentChapter.titleUrdu}
                        </h1>
                        <p className="arabic-text text-islamic-600 text-lg mt-1">
                          {currentChapter.titleArabic}
                        </p>
                        <p className="text-islamic-500 mt-1">
                          {currentBook.nameUrdu} • Chapter {currentChapter.numberInBook}
                        </p>
                      </div>
                      
                      <div className="w-full sm:w-64">
                        <FontSizeControl
                          value={fontSize}
                          onChange={handleFontSizeChange}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {hadithList.length === 0 ? (
                <Empty
                  title="No Hadith Available"
                  message="There are no Hadith available for this chapter."
                  icon="FileText"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;