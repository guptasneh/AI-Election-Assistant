import React from 'react';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';
import { VoiceChatbot } from '../VoiceChatbot';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#121212] text-white">
      <Navbar />
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <VoiceChatbot />
    </div>
  );
};
