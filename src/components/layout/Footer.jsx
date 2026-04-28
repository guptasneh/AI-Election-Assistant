import React from 'react';
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/80 backdrop-blur-md pt-16 pb-8 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500" />
            <span className="font-heading font-bold text-lg text-white">
              AI Election <span className="text-emerald-500">Assistant</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm max-w-sm">
            Empowering democratic transparency through artificial intelligence, smart navigation, and verified data visualization.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Features</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">TrustIndex™</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">BoothNav™</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">PromisePulse™</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">TruthShield™</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Accessibility Statement</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} AI Election Assistant. Built for Innovation.
      </div>
    </footer>
  );
};
