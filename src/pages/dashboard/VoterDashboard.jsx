import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Navigate, Link } from 'react-router-dom';
import { VoterProfileCard } from './VoterProfileCard';
import { AssignedBoothCard } from './AssignedBoothCard';
import { ShieldCheck, BookOpen, Clock, Activity, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VoterDashboard() {
  const { user, role, isAuthenticated } = useAuth();
  const { booths } = useData();

  if (!isAuthenticated || role !== 'voter') {
    return <Navigate to="/auth" />;
  }

  const assignedBooth = booths.find(b => b.id === user?.assignedBooth) || booths[0];

  const quickLinks = [
    { title: 'TruthShield™', desc: 'Fact-check election news', icon: ShieldCheck, link: '/fact-check', color: 'emerald' },
    { title: 'VoteMatch AI™', desc: 'Find your candidate match', icon: Activity, link: '/quiz', color: 'blue' },
    { title: 'Compare Manifestos', desc: 'Side-by-side analysis', icon: BookOpen, link: '/compare-manifesto', color: 'purple' },
    { title: 'Report Issue', desc: 'Grievance portal', icon: AlertTriangle, link: '/report-issue', color: 'red' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 pl-2">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">Welcome Back, {user?.name?.split(' ')[0]}</h1>
        <p className="text-gray-400">Your personalized election intelligence hub.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <VoterProfileCard user={user} />
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <AssignedBoothCard booth={assignedBooth} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-purple-400" />
              <h3 className="text-lg font-bold text-white">Election Reminders</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-2 h-2 mt-2 bg-emerald-400 rounded-full shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-200">Voting Day Tomorrow</p>
                  <p className="text-xs text-gray-500">7:00 AM to 6:00 PM</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-2 h-2 mt-2 bg-blue-400 rounded-full shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-200">Bring ID</p>
                  <p className="text-xs text-gray-500">Aadhaar or Voter ID Card required</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      <h3 className="text-xl font-bold text-white mb-4 pl-2">Intelligence & Tools</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + (idx * 0.1) }}>
              <Link 
                to={item.link} 
                className={`block p-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)]`}
              >
                <div className={`w-10 h-10 rounded-full bg-${item.color}-500/20 text-${item.color}-400 flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-gray-100">{item.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}
