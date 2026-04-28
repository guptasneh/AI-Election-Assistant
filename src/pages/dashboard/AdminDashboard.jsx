import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Navigate } from 'react-router-dom';
import { Database, Shield, Server, Activity, Users, MapPin, TrendingUp, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';

export default function AdminDashboard() {
  const { role, isAuthenticated } = useAuth();
  const { booths, electionStats } = useData();

  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to="/auth" />;
  }

  // Mock data for the dashboard
  const turnoutData = [
    { time: '08:00', voters: 120000 },
    { time: '10:00', voters: 350000 },
    { time: '12:00', voters: 680000 },
    { time: '14:00', voters: 920000 },
    { time: '16:00', voters: 1250000 },
    { time: '18:00', voters: electionStats.totalVotersVoted }
  ];

  const regionData = [
    { region: 'North District', turnout: 78 },
    { region: 'South District', turnout: 65 },
    { region: 'East District', turnout: 82 },
    { region: 'West District', turnout: 59 },
    { region: 'Central Area', turnout: 88 }
  ];

  // Identify highly busy areas
  const highlyBusyBooths = booths.filter(b => b.crowdDensity === 'high' || b.queueWaitTime > 30);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
            <Shield className="text-blue-500" />
            General Election Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Live operational overview of election proceedings across all constituencies.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/50 rounded-full text-red-500 font-bold uppercase tracking-widest text-sm animate-pulse w-max">
          <span className="w-2 h-2 rounded-full bg-red-500"></span> Live Updates
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-emerald-500 transition-all hover:scale-[1.02]">
          <div className="flex justify-between items-start mb-2">
             <p className="text-sm text-gray-400">Total Voters Voted</p>
             <Users className="w-6 h-6 text-emerald-400/50" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{electionStats.totalVotersVoted.toLocaleString()}</h3>
          <p className="text-xs text-emerald-400 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {electionStats.turnoutPercentage}% Overall Turnout</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-orange-500 transition-all hover:scale-[1.02]">
           <div className="flex justify-between items-start mb-2">
             <p className="text-sm text-gray-400">Highly Busy Areas</p>
             <MapPin className="w-6 h-6 text-orange-400/50" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{highlyBusyBooths.length + 12}</h3>
          <p className="text-xs text-orange-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Requires Officer Attention</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-blue-500 transition-all hover:scale-[1.02]">
           <div className="flex justify-between items-start mb-2">
             <p className="text-sm text-gray-400">Active Polling Stations</p>
             <Database className="w-6 h-6 text-blue-400/50" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{electionStats.activeBooths.toLocaleString()}</h3>
          <p className="text-xs text-blue-400">100% Operational Status</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-purple-500 transition-all hover:scale-[1.02]">
           <div className="flex justify-between items-start mb-2">
             <p className="text-sm text-gray-400">Anomalies Detected</p>
             <Activity className="w-6 h-6 text-purple-400/50" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">3</h3>
          <p className="text-xs text-purple-400 flex items-center gap-1">Flagged by TruthShield™</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/5">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Live Turnout Timeline</h2>
              <span className="text-sm text-emerald-400 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">Updated just now</span>
           </div>
           <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={turnoutData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorVoters" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip 
                       contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}
                       formatter={(value) => new Intl.NumberFormat('en-US').format(value)}
                    />
                    <Area type="monotone" dataKey="voters" stroke="#10b981" fillOpacity={1} fill="url(#colorVoters)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/5">
           <h2 className="text-xl font-bold text-white mb-6">Regional Turnout (%)</h2>
           <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={regionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis type="number" stroke="#6b7280" domain={[0, 100]} />
                    <YAxis dataKey="region" type="category" stroke="#6b7280" width={100} tick={{fontSize: 12}} />
                    <Tooltip 
                       cursor={{fill: 'rgba(255,255,255,0.05)'}}
                       contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }} 
                    />
                    <Bar dataKey="turnout" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-white/5">
         <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="text-orange-500 w-5 h-5" /> Highly Busy Polling Stations (Live Action Required)
         </h2>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-white/10 text-gray-400 text-sm">
                     <th className="py-3 px-4">Station ID</th>
                     <th className="py-3 px-4">Name & Location</th>
                     <th className="py-3 px-4">Current Est. Wait</th>
                     <th className="py-3 px-4">Crowd Density</th>
                     <th className="py-3 px-4">Action</th>
                  </tr>
               </thead>
               <tbody>
                  {highlyBusyBooths.map((booth, idx) => (
                     <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 text-white font-mono text-sm">{booth.id}</td>
                        <td className="py-3 px-4 text-white font-medium">{booth.name}</td>
                        <td className="py-3 px-4 text-orange-400 font-bold">{booth.queueWaitTime} Mins</td>
                        <td className="py-3 px-4">
                           <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/20 text-red-500 border border-red-500/30">
                              {booth.crowdDensity}
                           </span>
                        </td>
                        <td className="py-3 px-4">
                           <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">Dispatch Officers</button>
                        </td>
                     </tr>
                  ))}
                  {/* Mock extra data to show a full table */}
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                     <td className="py-3 px-4 text-white font-mono text-sm">B-984</td>
                     <td className="py-3 px-4 text-white font-medium">City Hall Primary School</td>
                     <td className="py-3 px-4 text-orange-400 font-bold">55 Mins</td>
                     <td className="py-3 px-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/20 text-red-500 border border-red-500/30">
                           CRITICAL
                        </span>
                     </td>
                     <td className="py-3 px-4">
                        <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">Dispatch Officers</button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
