import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ShieldAlert, TrendingUp, HandCoins, Building2, ArrowLeft } from 'lucide-react';

export default function CandidateProfile() {
  const { id } = useParams();
  const { candidates } = useData();
  const candidate = candidates.find(c => c.id === id) || candidates[0]; // fallback

  if (!candidate) return <div className="p-20 text-center text-white">Candidate not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/compare-manifesto" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Compare
      </Link>

      <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
          <img src={candidate.image} alt={candidate.name} className="w-32 h-32 rounded-full border-4 border-emerald-500/30 object-cover shadow-[0_0_20px_rgba(16,185,129,0.3)]" />
          <div className="flex-1">
            <h1 className="text-4xl font-heading font-bold text-white mb-2">{candidate.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 font-medium">
                {candidate.party}
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full text-sm font-semibold flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                TrustIndex™ {candidate.trustIndex}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-red-500 flex items-center gap-4">
          <ShieldAlert className="w-10 h-10 text-red-500/50" />
          <div>
            <p className="text-sm text-gray-400">Criminal Cases</p>
            <h3 className="text-2xl font-bold text-white mb-1">{candidate.criminalRecords}</h3>
            <p className="text-xs text-emerald-400">Clean Record</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-blue-500 flex items-center gap-4">
          <Building2 className="w-10 h-10 text-blue-500/50" />
          <div>
            <p className="text-sm text-gray-400">Declared Assets</p>
            <h3 className="text-2xl font-bold text-white mb-1">{candidate.assets}</h3>
            <p className="text-xs text-gray-500">Verified by Affidavit</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-emerald-500 flex items-center gap-4">
          <HandCoins className="w-10 h-10 text-emerald-500/50" />
          <div>
            <p className="text-sm text-gray-400">Promises Kept</p>
            <h3 className="text-2xl font-bold text-white mb-1">{candidate.promisesKept}%</h3>
            <p className="text-xs text-emerald-400 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 font-semibold">Via PromisePulse™</p>
          </div>
        </div>
      </div>
    </div>
  );
}
