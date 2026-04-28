import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Clock, ArrowRight } from 'lucide-react';

export const AssignedBoothCard = ({ booth }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl border-blue-500/20 relative overflow-hidden">
      <div className="absolute -bottom-6 -right-6 text-blue-500/10">
        <MapPin className="w-48 h-48" />
      </div>
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="text-blue-400" />
        <h3 className="text-lg font-bold text-white">Assigned Booth</h3>
      </div>
      
      <h4 className="text-xl text-blue-300 font-semibold mb-2">{booth?.name || "Greenwood High School"}</h4>
      <p className="text-sm text-gray-400 mb-6">Booth ID: {booth?.id || "B-101"}</p>

      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-gray-300">{booth?.queueWaitTime || 15} Min Wait</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-400" />
          <span className="text-sm border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wider text-xs">
            {booth?.crowdDensity || "Low"} Crowd
          </span>
        </div>
      </div>

      <Link to="/booth-locator" className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
        Open BoothNav™ 
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};
