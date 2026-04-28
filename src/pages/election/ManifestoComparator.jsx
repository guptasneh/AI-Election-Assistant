import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { motion } from 'framer-motion';
import { Scale, Check, X, ArrowRightLeft } from 'lucide-react';

export default function ManifestoComparator() {
  const { candidates } = useData();
  const [cand1, setCand1] = useState(candidates[0]?.id);
  const [cand2, setCand2] = useState(candidates[1]?.id);

  const c1Data = candidates.find(c => c.id === cand1);
  const c2Data = candidates.find(c => c.id === cand2);

  // Common issues list to structure the comparison
  const issues = ['Healthcare', 'Economy & Jobs', 'Infrastructure', 'Education', 'Technology'];

  // Mock mapped manifesto logic
  const getStance = (candidate, issue) => {
    if (!candidate) return "No data";
    if (issue === 'Healthcare') return candidate.manifesto.find(m => m.includes('Health')) || "Generic healthcare improvement";
    if (issue === 'Economy & Jobs') return candidate.manifesto.find(m => m.includes('Hub') || m.includes('Support')) || "Standard economic policies";
    return `Plan for ${issue.toLowerCase()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <Scale className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">Manifesto Comparator</h1>
        <p className="text-gray-400">Side-by-side analysis of candidate promises and policies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <select 
          value={cand1} 
          onChange={(e) => setCand1(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
        >
          {candidates.map(c => <option key={c.id} value={c.id} className="text-gray-900">{c.name} ({c.party})</option>)}
        </select>
        
        <select 
          value={cand2} 
          onChange={(e) => setCand2(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
        >
          {candidates.map(c => <option key={c.id} value={c.id} className="text-gray-900">{c.name} ({c.party})</option>)}
        </select>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div className="grid grid-cols-3 bg-black/40 p-4 border-b border-white/10 text-sm font-semibold text-gray-400">
          <div>Key Issue</div>
          <div className="text-center text-purple-300">{c1Data?.name}</div>
          <div className="text-center text-purple-300">{c2Data?.name}</div>
        </div>

        <div className="divide-y divide-white/5">
          {issues.map((issue, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              className="grid grid-cols-3 p-4 items-center hover:bg-white/5 transition-colors"
            >
              <div className="font-semibold text-gray-200">{issue}</div>
              <div className="text-sm text-gray-400 px-4 text-center">{getStance(c1Data, issue)}</div>
              <div className="text-sm text-gray-400 px-4 text-center">{getStance(c2Data, issue)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
