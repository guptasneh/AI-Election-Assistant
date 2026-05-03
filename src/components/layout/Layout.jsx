import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AIVoiceAssistant } from '../ai-voice/AIVoiceAssistant';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
      <Navbar />
      <main className="flex-grow flex flex-col mt-20">
        {children}
      </main>
      <Footer />
      {/* Replaced legacy AIChatbot with the new AIVoiceAssistant */}
      <AIVoiceAssistant />
    </div>
  );
};
