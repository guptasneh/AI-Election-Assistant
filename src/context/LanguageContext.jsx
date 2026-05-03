import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState('en'); // 'en', 'hi'

  const setLanguage = (lang) => {
    setLanguageState(lang);
    
    // Set the Google Translate cookie so translation persists on reload
    // googtrans format: /en/hi
    document.cookie = `googtrans=/en/${lang}; path=/`;
    document.cookie = `googtrans=/en/${lang}; domain=${window.location.hostname}; path=/`;
    // Note: Do NOT reload the page here - the AI assistant syncs this on mount
    // and a reload would cause an infinite loop. Google Translate picks up the
    // cookie on next manual reload if the user wants full-page translation.
  };

  useEffect(() => {
    // Check if there's already a googtrans cookie
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
    if (match && match[1]) {
      setLanguageState(match[1]);
    }
  }, []);

  const t = (key) => {
    // We are no longer using manual translation because Google Translate is handling the full DOM.
    // However, some components might still be calling this function with keys.
    // To prevent the app from breaking and showing things like "hero.title", 
    // we return empty or just wait for Google Translate to overwrite it.
    // Since we've replaced the usage of `t` with raw strings in some places, this is just a fallback.
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

