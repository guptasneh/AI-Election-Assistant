import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Briefcase } from 'lucide-react';

export const RoleSelector = ({ selectedRole, onSelectRole }) => {
  const roles = [
    { id: 'voter', label: 'Voter', icon: User, desc: 'Access your voting dashboard' },
    { id: 'admin', label: 'System Admin', icon: Shield, desc: 'Platform configuration' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {roles.map((role) => {
        const Icon = role.icon;
        const isSelected = selectedRole === role.id;
        
        return (
          <motion.div
            key={role.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectRole(role.id)}
            className={`cursor-pointer p-4 rounded-2xl border transition-all ${
              isSelected 
                ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                : 'glass-card hover:bg-white/10 hover:border-white/20'
            } flex flex-col items-center text-center`}
          >
            <div className={`p-3 rounded-full mb-3 ${isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-gray-400'}`}>
              <Icon className="w-6 h-6" />
            </div>
            <h3 className={`font-semibold ${isSelected ? 'text-emerald-400' : 'text-gray-200'}`}>{role.label}</h3>
            <p className="text-xs text-gray-500 mt-1">{role.desc}</p>
          </motion.div>
        );
      })}
    </div>
  );
};
