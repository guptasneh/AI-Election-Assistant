import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

export const EligibilityCheck = ({ uid, onComplete }) => {
  const [status, setStatus] = useState('checking'); // checking, eligible, ineligible

  useEffect(() => {
    // Simulate database lookup based on UID
    const timer = setTimeout(() => {
      // Dummy rule: if uid ends in '0', ineligible. Else eligible.
      if (uid.endsWith('0')) {
        setStatus('ineligible');
      } else {
        setStatus('eligible');
        setTimeout(() => onComplete(true), 2000);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [uid, onComplete]);

  return (
    <div className="p-4 border border-white/10 rounded-xl bg-black/50 backdrop-blur-sm mt-6">
      <h4 className="text-sm font-semibold text-gray-300 xl:mb-2 text-center">Electoral Roll Verification</h4>
      
      {status === 'checking' && (
        <div className="flex flex-col items-center py-4">
          <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-3"></div>
          <p className="text-xs text-emerald-400 animate-pulse">Cross-referencing demographic records...</p>
        </div>
      )}

      {status === 'eligible' && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-4 text-emerald-400">
          <CheckCircle className="w-10 h-10 mb-2 shadow-[0_0_10px_rgba(16,185,129,0.3)] rounded-full" />
          <p className="font-semibold">Verification Successful!</p>
          <p className="text-xs text-gray-400 text-center mt-1">You are registered in the current constituency. Redirecting to dashboard...</p>
        </motion.div>
      )}

      {status === 'ineligible' && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-4 text-red-400">
          <AlertCircle className="w-10 h-10 mb-2" />
          <p className="font-semibold">Record Mismatch</p>
          <p className="text-xs text-gray-400 text-center mt-1">We could not find an active electoral roll entry for this Aadhaar number.</p>
        </motion.div>
      )}
    </div>
  );
};
