import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RoleSelector } from './RoleSelector';
import { Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [role, setRole] = useState('voter');
  const navigate = useNavigate();
  const { loginAdmin } = useAuth();
  
  // Dummy form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminOfficerLogin = (e) => {
    e.preventDefault();
    if (role === 'admin') {
      loginAdmin();
      navigate('/admin-dashboard');
    }
  };

  const handleVoterProceed = () => {
    // For voter, we don't login directly via username/pass.
    // They must verify via Aadhaar simulation.
    navigate('/verify-aadhaar');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl glass-panel p-8 rounded-3xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-white mb-2">Platform Access</h2>
          <p className="text-gray-400">Select your role to continue securely</p>
        </div>

        <RoleSelector selectedRole={role} onSelectRole={setRole} />

        <motion.div 
          key={role}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-black/40 border border-white/5 rounded-2xl p-6"
        >
          {role === 'voter' ? (
            <div className="text-center py-4">
              <h3 className="text-xl font-semibold text-emerald-400 mb-2">Voter Verification</h3>
              <p className="text-gray-400 mb-6 text-sm max-w-sm mx-auto">
                Securely authenticate using your Aadhaar credentials to access your personalized election dashboard and BoothNav™.
              </p>
              <button 
                onClick={handleVoterProceed}
                className="w-full max-w-xs mx-auto py-3 px-6 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              >
                Proceed with Aadhaar Verification
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleAdminOfficerLogin} className="space-y-4 max-w-sm mx-auto py-2">
              <h3 className="text-xl font-semibold text-blue-400 mb-4 text-center">
                System Portal
              </h3>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Badge ID / Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Access Token</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50" 
                  required 
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)]"
              >
                Secure Login
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
