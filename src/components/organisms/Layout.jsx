import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState('both');
  
  // Close sidebar on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <div className="flex h-screen">
        {/* Sidebar - Always visible on desktop, toggleable on mobile */}
        <div className="hidden lg:block">
          <Sidebar isOpen={true} onClose={() => {}} />
        </div>
        
        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            onToggleSidebar={toggleSidebar}
            language={language}
            onLanguageChange={setLanguage}
            isSidebarOpen={isSidebarOpen}
          />
          
          <main className="flex-1 overflow-auto bg-islamic-pattern">
            <div className="h-full">
              <Outlet context={{ language, setLanguage }} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;