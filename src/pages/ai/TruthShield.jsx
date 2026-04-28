import React, { useState } from 'react';
import { ShieldCheck, Search, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TruthShield() {
  const [query, setQuery] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!query) return;
    
    setIsChecking(true);
    setResult(null);

    // Mock AI verification delay
    setTimeout(() => {
      setIsChecking(false);
      // Dummy logic to mock varying results
      if (query.toLowerCase().includes('free') || query.toLowerCase().includes('scam')) {
        setResult({
          status: 'fake',
          confidence: 96,
          summary: 'This claim has been debunked by multiple verified news outlets. It is part of a known misinformation campaign.',
          sources: ['FactCheck India', 'AltNews']
        });
      } else if (query.toLowerCase().includes('hospital') || query.toLowerCase().includes('road')) {
        setResult({
          status: 'true',
          confidence: 88,
          summary: 'This project is indeed part of the official constituency development plan and has been allocated budget.',
          sources: ['Govt Gazette', 'Local Municipality Record']
        });
      } else {
        setResult({
          status: 'unverified',
          confidence: 45,
          summary: 'Not enough data available to verify this claim. Proceed with caution and await official announcements.',
          sources: []
        });
      }
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <ShieldCheck className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 shadow-emerald-500/20">TruthShield™</h1>
        <p className="text-gray-400 text-lg">AI-powered fact checking for election news and claims.</p>
      </div>

      <form onSubmit={handleCheck} className="mb-10 relative max-w-2xl mx-auto">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-black/80 border border-white/10 rounded-2xl p-2 shadow-2xl">
            <Search className="w-6 h-6 ml-3 text-gray-400" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Paste a news headline, WhatsApp forward, or claim..."
              className="flex-1 bg-transparent border-none text-white px-4 py-3 focus:outline-none"
            />
            <button 
              type="submit"
              disabled={isChecking || !query}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all"
            >
              Verify
            </button>
          </div>
        </div>
      </form>

      <AnimatePresence>
        {isChecking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-10">
            <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
            <p className="text-emerald-400 animate-pulse font-semibold">Running multi-source semantic verification...</p>
          </motion.div>
        )}

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
            className={`glass-panel p-8 rounded-3xl border-t-4 shadow-2xl ${
              result.status === 'fake' ? 'border-t-red-500' : result.status === 'true' ? 'border-t-emerald-500' : 'border-t-yellow-500'
            }`}
          >
            <div className="flex items-start gap-6">
              <div className="shrink-0 mt-1">
                {result.status === 'fake' && <AlertTriangle className="w-12 h-12 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />}
                {result.status === 'true' && <CheckCircle className="w-12 h-12 text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />}
                {result.status === 'unverified' && <Info className="w-12 h-12 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                  {result.status === 'fake' ? 'Misinformation Detected' : result.status === 'true' ? 'Verified True' : 'Inconclusive'}
                </h3>
                <div className="inline-block bg-white/10 px-3 py-1 rounded-full text-sm font-semibold text-gray-300 mb-4">
                  AI Confidence Score: <span className={result.confidence > 80 ? 'text-emerald-400' : 'text-yellow-400'}>{result.confidence}%</span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {result.summary}
                </p>
                {result.sources.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Cross-Referenced Sources</h4>
                    <div className="flex gap-2">
                      {result.sources.map(src => (
                        <span key={src} className="text-xs bg-white/5 border border-white/10 text-gray-400 px-3 py-1 rounded-md">{src}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
