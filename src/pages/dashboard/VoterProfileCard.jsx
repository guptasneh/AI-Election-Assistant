import React from 'react';
import { User, ShieldCheck } from 'lucide-react';

export const VoterProfileCard = ({ user }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-emerald-500/30">
          <ShieldCheck className="w-4 h-4" />
          Verified
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{user?.name || "Voter Name"}</h3>
          <p className="text-sm text-gray-400">Aadhaar: **** **** {user?.aadhaarRef || "1234"}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
          <p className="text-xs text-gray-500">Constituency</p>
          <p className="font-semibold text-gray-200">{user?.constituency || "New Delhi Urban"}</p>
        </div>
        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
          <p className="text-xs text-gray-500">Status</p>
          <p className="font-semibold text-emerald-400">Active Voter</p>
        </div>
      </div>
    </div>
  );
};
