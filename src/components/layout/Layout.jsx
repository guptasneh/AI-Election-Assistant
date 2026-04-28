import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AIChatbot } from './AIChatbot';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 font-sans text-gray-100 selection:bg-emerald-500/30">
      <Navbar />
      <main className="flex-1 mt-20"> {/* Margin to account for fixed navbar */}
        {children}
      </main>
      <AIChatbot />
      <Footer />
    </div>
  );
};
