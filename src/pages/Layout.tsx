import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<'ar' | 'fr'>('fr');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLanguageChange = (lang: 'ar' | 'fr') => {
    setLanguage(lang);
    // In a real app, you would also persist this preference
    localStorage.setItem('language', lang);
  };

  return (
    <div className={`min-h-screen bg-background ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header 
        onToggleSidebar={toggleSidebar}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      
      <div className="flex w-full">
        <Sidebar 
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          language={language}
        />
        
        <main className="flex-1 min-h-[calc(100vh-4rem)] overflow-x-hidden">
          <Outlet context={{ language }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;