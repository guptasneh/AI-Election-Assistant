import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Globe, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const { isAuthenticated, user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const getDashboardLink = () => {
    if (role === 'admin') return '/admin-dashboard';
    if (role === 'officer') return '/officer-dashboard';
    return '/dashboard';
  };

  return (
    <nav className="fixed w-full z-50 glass-panel border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <motion.div 
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.5 }}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]"
        >
          <span className="text-white font-bold text-lg">AI</span>
        </motion.div>
        <span className="font-heading font-bold text-xl text-white tracking-wide">
          Election <span className="text-emerald-500">Assistant</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
        <Link to="/education" className="text-gray-300 hover:text-white transition-colors">Education</Link>
        <Link to="/booth-locator" className="text-gray-300 hover:text-white transition-colors">Booth Locator</Link>
        <Link to="/fact-check" className="text-gray-300 hover:text-white transition-colors">Fact Check</Link>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={handleLanguageToggle}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          title="Switch Language"
        >
          <Globe className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-medium uppercase">{language}</span>
        </button>

        {isAuthenticated ? (
          <div className="flex items-center gap-4 ml-4">
            <Link to={getDashboardLink()} className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">{user?.name || 'Dashboard'}</span>
            </Link>
            <button onClick={() => { logout(); navigate('/'); }} className="text-gray-400 hover:text-red-400 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <Link 
            to="/auth" 
            className="ml-4 px-5 py-2 rounded-full border border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-400 font-medium transition-all shadow-[0_0_10px_rgba(16,185,129,0.2)] hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          >
            Login / Verify
          </Link>
        )}
      </div>
    </nav>
  );
};

