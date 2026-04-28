import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Users, TrendingUp } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function LiveElectionInsights() {
  const [turnoutData, setTurnoutData] = useState([]);
  const { electionStats } = useData();
  
  useEffect(() => {
    // Generate mock graph data
    setTurnoutData([
      { time: '08:00', default: 12, youth: 18, senior: 8 },
      { time: '10:00', default: 25, youth: 35, senior: 20 },
      { time: '12:00', default: 42, youth: 50, senior: 45 },
      { time: '14:00', default: 58, youth: 65, senior: 52 },
      { time: '16:00', default: electionStats.turnoutPercentage, youth: 75, senior: 65 }
    ]);
  }, [electionStats.turnoutPercentage]);

  const issueData = [
    { name: 'Economy', value: 400, color: '#3b82f6' },
    { name: 'Healthcare', value: 300, color: '#10b981' },
    { name: 'Infrastructure', value: 300, color: '#8b5cf6' },
    { name: 'Education', value: 200, color: '#f59e0b' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-2 flex items-center gap-4">
          LiveElectionInsights™
          <div className="flex items-center gap-2 text-sm bg-red-500/20 text-red-500 border border-red-500/50 px-3 py-1 rounded-full font-sans uppercase font-bold tracking-widest animate-pulse">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span> Live
          </div>
        </h1>
        <p className="text-gray-400 text-lg">Real-time constituency analytics, turnout metrics, and issue sentiment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-blue-500">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-gray-400">Total Est. Turnout</p>
              <h3 className="text-3xl font-bold text-white">{electionStats.turnoutPercentage}%</h3>
            </div>
            <Users className="text-blue-500/50 w-8 h-8" />
          </div>
          <p className="text-xs text-emerald-400 flex flex-center gap-1"><TrendingUp className="w-3 h-3" /> +2.4% vs last election</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-emerald-500">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-gray-400">Youth Polling Rate</p>
              <h3 className="text-3xl font-bold text-white">58.2%</h3>
            </div>
            <Activity className="text-emerald-500/50 w-8 h-8" />
          </div>
          <p className="text-xs text-emerald-400 flex flex-center gap-1"><TrendingUp className="w-3 h-3" /> Highest recorded</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-purple-500">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-gray-400">Issue Sentiment Index</p>
              <h3 className="text-3xl font-bold text-white">Stable</h3>
            </div>
          </div>
          <p className="text-xs text-purple-400 flex flex-center gap-1">Top focus: Economy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-6 rounded-2xl border border-white/5">
          <h3 className="text-xl font-bold text-white mb-6">Turnout Timeline (Mock)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={turnoutData}>
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }} 
                />
                <Line type="monotone" dataKey="default" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} name="Total Baseline" />
                <Line type="monotone" dataKey="youth" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} name="Youth (18-25)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-6 rounded-2xl border border-white/5">
          <h3 className="text-xl font-bold text-white mb-6">Key Issues Discussed (Social Sentiment)</h3>
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={issueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelStyle={{ fill: "#fff", fontSize: '12px' }}
                >
                  {issueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

