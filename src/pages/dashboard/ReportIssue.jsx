import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { AlertTriangle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReportIssue() {
  const { addComplaint } = useData();
  const [type, setType] = useState('EVM Malfunction');
  const [desc, setDesc] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc) return;
    
    addComplaint({ type, description: desc });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDesc('');
    }, 4000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-2">Report an Issue</h1>
        <p className="text-gray-400">Secure and anonymous grievance portal sent directly to the Election Officer Dashboard.</p>
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-panel p-8 rounded-3xl border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Issue Type</label>
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 py-3 px-4 rounded-xl text-white focus:outline-none focus:border-yellow-500/50"
                  required
                >
                  <option value="EVM Malfunction">EVM Malfunction</option>
                  <option value="Voter Intimidation">Voter Intimidation</option>
                  <option value="Missing Name in Roll">Missing Name in Electoral Roll</option>
                  <option value="Fake Content / Misinformation">Misinformation / Fake Content</option>
                  <option value="Other">Other Issues</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Description (Please provide booth details if applicable)</label>
                <textarea 
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Describe the incident securely..."
                  className="w-full h-32 resize-none bg-black/40 border border-white/10 py-3 px-4 rounded-xl text-white focus:outline-none focus:border-yellow-500/50"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] flex items-center justify-center gap-2"
              >
                Submit Grievance Securely <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-10 rounded-3xl border border-emerald-500/30 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Report Logged Successfully</h2>
            <p className="text-gray-400">Your grievance has been securely transmitted to the nearest Election Officer portal via our encrypted channels.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Quick fallback for CheckCircle
const CheckCircle = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
