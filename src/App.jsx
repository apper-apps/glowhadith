import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import BrowsePage from '@/components/pages/BrowsePage';
import SearchPage from '@/components/pages/SearchPage';
import BookmarksPage from '@/components/pages/BookmarksPage';
import SettingsPage from '@/components/pages/SettingsPage';
import HadithDetailsPage from '@/components/pages/HadithDetailsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<BrowsePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="bookmarks" element={<BookmarksPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="hadith/:id" element={<HadithDetailsPage />} />
            <Route path="book/:bookId" element={<BrowsePage />} />
            <Route path="book/:bookId/chapter/:chapterId" element={<BrowsePage />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;