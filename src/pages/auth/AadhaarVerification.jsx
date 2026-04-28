import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { EligibilityCheck } from './EligibilityCheck';
import { Fingerprint, Smartphone, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AadhaarVerification() {
  const [step, setStep] = useState(1); // 1: UID, 2: OTP, 3: Eligibility
  const [uid, setUid] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();
  const { loginVoter } = useAuth();

  const handleUidSubmit = (e) => {
    e.preventDefault();
    if (uid.length >= 12) {
      setStep(2);
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setStep(3);
    }
  };

  const onEligibilityComplete = (isEligible) => {
    if (isEligible) {
      // Generate a mock demographic profile
      loginVoter({
        aadhaarRef: uid.substring(8),
        assignedBooth: 'B-101',
        constituency: 'Greenwood District'
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-panel p-8 rounded-3xl relative overflow-hidden"
      >
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/20 blur-[50px] rounded-full pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <Fingerprint className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl font-heading font-bold text-white mb-2">Voter Verification</h2>
          <p className="text-sm text-gray-400">Simulated Aadhaar eKYC Flow</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form 
              key="step1"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              onSubmit={handleUidSubmit} className="relative z-10"
            >
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Aadhaar Number (UID)</label>
                <div className="relative">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input 
                    type="text" 
                    value={uid}
                    onChange={(e) => setUid(e.target.value.replace(/\D/g, '').slice(0, 12))}
                    placeholder="Enter 12-digit UID"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white text-lg tracking-widest focus:outline-none focus:border-emerald-500/50" 
                    required 
                  />
                </div>
              </div>
              <button 
                type="submit"
                disabled={uid.length < 12}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex justify-center items-center"
              >
                Request OTP
              </button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form 
              key="step2"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              onSubmit={handleOtpSubmit} className="relative z-10 text-center"
            >
              <KeyRound className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
              <p className="text-sm text-gray-400 mb-6">Enter the 6-digit OTP sent to your registered mobile number ending in ****43</p>
              
              <div className="flex justify-center gap-2 mb-8">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value.replace(/\D/g, '');
                      setOtp(newOtp);
                      if (e.target.value && idx < 5) {
                        document.getElementById(`otp-${idx + 1}`).focus();
                      }
                    }}
                    className="w-12 h-14 bg-white/5 border border-white/10 rounded-xl text-center text-xl text-white font-bold focus:outline-none focus:border-emerald-500"
                  />
                ))}
              </div>

              <button 
                type="submit"
                disabled={otp.join('').length < 6}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                Verify & Continue
              </button>
            </motion.form>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
              <EligibilityCheck uid={uid} onComplete={onEligibilityComplete} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
