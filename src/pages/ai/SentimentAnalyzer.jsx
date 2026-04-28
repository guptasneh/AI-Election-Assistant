import React, { useState } from 'react';
import { Mic, Activity, LineChart, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SentimentAnalyzer() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const startAnalysis = () => {
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        overall: 'Positive',
        score: 76,
        keywords: ['Development', 'Green Energy', 'Healthcare', 'Unity'],
        emotion: 'Optimistic'
      });
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <Activity className="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Speech Sentiment Analyzer</h1>
        <p className="text-gray-400 text-lg">AI-powered trust analysis on candidate speeches and debate transcripts.</p>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/10 mb-8 max-w-2xl mx-auto">
        <textarea 
          placeholder="Paste speech transcript here for real-time sentiment analysis..."
          className="w-full bg-black/40 border border-white/5 rounded-xl block p-4 text-white focus:outline-none focus:border-purple-500/50 resize-none h-32 mb-4"
          disabled={analyzing}
        />
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500 flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Minimum 50 words recommended</p>
          <button 
            onClick={startAnalysis}
            disabled={analyzing}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
          >
            {analyzing ? <Activity className="animate-pulse w-5 h-5" /> : <Mic className="w-5 h-5" />}
            Analyze Speech
          </button>
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-emerald-500 text-center">
              <p className="text-gray-400 text-sm mb-1">Emotion Detected</p>
              <h3 className="text-2xl font-bold text-white mb-2">{result.emotion}</h3>
              <p className="text-xs text-emerald-400">High Confidence</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-blue-500 text-center">
              <p className="text-gray-400 text-sm mb-1">Trust Score</p>
              <h3 className="text-3xl font-bold text-white mb-2">{result.score}/100</h3>
            </div>
             <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-purple-500">
              <p className="text-gray-400 text-sm mb-2 text-center">Key Themes</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {result.keywords.map(kw => (
                  <span key={kw} className="bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs px-2 py-1 rounded">{kw}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
