import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Target } from 'lucide-react';

export default function VoteMatchAI() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [matching, setMatching] = useState(false);
  const [result, setResult] = useState(null);

  const questions = [
    { id: 'q1', text: 'How important is aggressive transition to green energy in the next 5 years?' },
    { id: 'q2', text: 'Should local governments subsidize healthcare for all citizens?' },
    { id: 'q3', text: 'Do you prioritize new tech infrastructure over traditional agricultural support?' }
  ];

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setMatching(true);
      setTimeout(() => {
        setMatching(false);
        setResult({ candidate: 'Arjun Mehta', match: 85 });
      }, 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Target className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-2">VoteMatch AI™</h1>
        <p className="text-gray-400">Discover which candidate best aligns with your personal policies.</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl min-h-[300px] flex items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!matching && !result && (
            <motion.div key="question" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
              <p className="text-sm text-blue-400 mb-4 font-bold tracking-widest uppercase">Question {currentQuestion + 1} of {questions.length}</p>
              <h2 className="text-2xl text-white font-medium mb-8 leading-relaxed">
                {questions[currentQuestion].text}
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => handleAnswer('agree')} className="p-4 border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-2xl text-emerald-400 font-bold flex items-center justify-center gap-2 transition-all">
                  <Check className="w-5 h-5" /> Strongly Agree
                </button>
                <button onClick={() => handleAnswer('disagree')} className="p-4 border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 rounded-2xl text-red-400 font-bold flex items-center justify-center gap-2 transition-all">
                  <X className="w-5 h-5" /> Disagree
                </button>
              </div>
            </motion.div>
          )}

          {matching && (
            <motion.div key="matching" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-6" />
              <h3 className="text-xl text-white font-semibold mb-2">Analyzing Policy Matrix...</h3>
              <p className="text-gray-400 text-sm">Comparing your priorities against verified candidate manifestos.</p>
            </motion.div>
          )}

          {result && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center w-full">
              <div className="w-32 h-32 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center border-4 border-blue-500/50 mb-6 relative shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <h2 className="text-4xl font-bold text-white">{result.match}%</h2>
              </div>
              <p className="text-gray-400 uppercase tracking-widest text-sm mb-2">Top Match</p>
              <h1 className="text-4xl font-heading font-bold text-white mb-6">{result.candidate}</h1>
              
              <button onClick={() => window.location.href = `/compare-manifesto`} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all">
                View Manifesto Comparison
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
