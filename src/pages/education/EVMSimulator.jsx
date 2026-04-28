import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Fingerprint, Volume2, Info } from 'lucide-react';

export default function EVMSimulator() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isCasting, setIsCasting] = useState(false);
  const [vvpatSlip, setVvpatSlip] = useState(null);
  const [voteCount, setVoteCount] = useState(0);

  const mockCandidates = [
    { id: 1, name: 'Arjun Mehta', party: 'Progressive Alliance', symbol: '🌻' },
    { id: 2, name: 'Priya Sharma', party: 'National Democratic Front', symbol: '🕊️' },
    { id: 3, name: 'Rahul Desai', party: 'Independent', symbol: '⚖️' },
    { id: 4, name: 'NOTA', party: 'None of the Above', symbol: '❌' },
  ];

  const handleVote = (candidate) => {
    if (isCasting) return;
    
    setSelectedCandidate(candidate.id);
    setIsCasting(true);
    
    // Play beep sound (simulated)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // Beep frequency
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    
    // Stop beep after 2 seconds
    setTimeout(() => {
      oscillator.stop();
    }, 2000);

    // Show VVPAT
    setTimeout(() => {
      setVvpatSlip(candidate);
      
      // Hide VVPAT after 7 seconds (ECI standard)
      setTimeout(() => {
        setVvpatSlip(null);
        setIsCasting(false);
        setSelectedCandidate(null);
        setVoteCount(prev => prev + 1);
      }, 7000);
      
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 flex justify-center items-center gap-3">
          <Fingerprint className="text-emerald-500 w-10 h-10" />
          Interactive EVM Simulator
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Experience the official voting process. Cast a mock vote on our digital Electronic Voting Machine and verify your choice via the VVPAT simulator.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* EVM Ballot Unit */}
        <div className="bg-[#e5e7eb] rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-gray-400 relative">
          <div className="absolute top-2 right-4 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
            <span className="text-xs font-bold text-gray-700 uppercase">Ready</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b-2 border-gray-400 pb-2">BALLOT UNIT</h2>
          
          <div className="space-y-3 bg-white p-4 rounded-xl border-2 border-gray-300">
            {mockCandidates.map((candidate, idx) => (
              <div key={candidate.id} className="flex items-center justify-between p-3 border-b border-gray-200 last:border-0 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4 w-1/2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-700">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{candidate.name}</h3>
                  </div>
                </div>
                
                <div className="flex items-center justify-between w-1/2 pl-4">
                  <div className="text-3xl">{candidate.symbol}</div>
                  
                  <div className="flex items-center gap-4">
                    {/* Red LED Indicator */}
                    <div className={`w-4 h-4 rounded-full border-2 border-gray-400 transition-all duration-300 ${
                      selectedCandidate === candidate.id ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,1)] border-red-800' : 'bg-red-900/20'
                    }`}></div>
                    
                    {/* Blue Button */}
                    <button 
                      onClick={() => handleVote(candidate)}
                      disabled={isCasting}
                      className={`w-12 h-12 rounded-full border-4 shadow-inner transition-transform ${
                        isCasting ? 'bg-blue-300 border-blue-400 cursor-not-allowed' : 'bg-blue-600 border-blue-800 hover:bg-blue-500 active:scale-95'
                      }`}
                    ></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between items-center bg-gray-200 p-3 rounded-lg border border-gray-300">
            <span className="text-xs font-mono text-gray-500">S/N: BU-2024-89X2</span>
            <div className="flex gap-2 text-gray-400">
              <Shield className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* VVPAT Unit */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-sm relative">
            
            {/* Educational Tooltip */}
            <div className="absolute -right-16 top-0 bg-blue-500/20 border border-blue-500/50 p-4 rounded-xl max-w-[200px] hidden md:block">
              <div className="flex items-start gap-2 text-blue-400 text-sm">
                <Info className="w-5 h-5 shrink-0" />
                <p>The VVPAT slip stays visible for 7 seconds so you can verify your vote.</p>
              </div>
            </div>

            <div className="bg-[#2d3748] rounded-t-3xl p-6 border-4 border-b-0 border-gray-600 shadow-2xl relative z-10">
              <h2 className="text-xl font-bold text-white mb-2 text-center flex items-center justify-center gap-2">
                <Volume2 className={`w-5 h-5 ${isCasting ? 'text-red-500 animate-pulse' : 'text-gray-500'}`} />
                VVPAT
              </h2>
              <p className="text-xs text-gray-400 text-center mb-6">Voter Verifiable Paper Audit Trail</p>
              
              {/* VVPAT Window */}
              <div className="bg-[#1a202c] border-4 border-gray-800 h-48 w-full rounded-lg relative overflow-hidden flex flex-col items-center justify-start shadow-inner">
                {/* Glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent z-20 pointer-events-none"></div>
                
                <AnimatePresence>
                  {vvpatSlip && (
                    <motion.div 
                      initial={{ y: -200, opacity: 0 }}
                      animate={{ y: 20, opacity: 1 }}
                      exit={{ y: 200, opacity: 0, transition: { duration: 1, ease: "easeIn" } }}
                      transition={{ duration: 1.5, type: 'spring' }}
                      className="bg-gray-100 w-4/5 h-36 rounded shadow-md z-10 p-4 flex flex-col items-center justify-center text-center border border-gray-300"
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{vvpatSlip.name}</h3>
                      <div className="text-4xl mb-2">{vvpatSlip.symbol}</div>
                      <p className="text-xs text-gray-500 font-mono">SN: {vvpatSlip.id} • {new Date().toLocaleTimeString()}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* VVPAT Drop Box */}
            <div className="bg-[#1a202c] h-32 w-full rounded-b-3xl border-4 border-t-0 border-gray-600 shadow-2xl relative z-0 flex items-center justify-center">
              <div className="absolute top-0 w-3/4 h-2 bg-black"></div>
              <div className="text-gray-600 font-bold uppercase tracking-widest opacity-30">Drop Box</div>
            </div>
          </div>
          
          <div className="mt-8 text-center glass-panel p-4 rounded-xl">
             <p className="text-gray-300 text-sm">
               You have successfully cast <span className="text-emerald-400 font-bold text-lg">{voteCount}</span> mock votes in this session.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}
