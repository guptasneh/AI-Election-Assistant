import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useData } from '../../context/DataContext';
import { MapPin, Navigation, Navigation2, Search, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

// Fix for default marker icons in React Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function BoothNavMap() {
  const { booths } = useData();
  const [filter, setFilter] = useState('all'); // 'all', 'low-crowd', 'accessible'
  const center = [28.6139, 77.2090]; // New Delhi center

  const filteredBooths = booths.filter(b => {
    if (filter === 'low-crowd') return b.crowdDensity === 'low';
    if (filter === 'accessible') return b.accessibility.length > 0;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-2 flex items-center gap-3">
            BoothNav™ <Navigation className="text-blue-500 w-8 h-8" />
          </h1>
          <p className="text-gray-400">Interactive Booth Locator & QueueSense™ Real-time wait estimation.</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => setFilter('all')} 
             className={`px-4 py-2 ${filter === 'all' ? 'bg-blue-600 text-white border-blue-500' : 'bg-white/5 border-white/10 text-gray-300'} border rounded-xl text-sm font-semibold transition-colors`}
           >
             All Booths
           </button>
           <button 
             onClick={() => setFilter('low-crowd')} 
             className={`px-4 py-2 ${filter === 'low-crowd' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-white/5 border-white/10 text-emerald-400'} border rounded-xl text-sm font-semibold transition-colors`}
           >
             Low Crowd First
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-panel p-4 rounded-2xl relative overflow-hidden group">
             <h3 className="font-bold text-white mb-2 flex items-center gap-2"><Navigation2 className="text-blue-400 w-5 h-5"/> Find My Booth</h3>
             <div className="flex items-center bg-black/50 border border-white/10 rounded-xl px-3 py-2">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input placeholder="Enter Voter ID..." className="bg-transparent text-white text-sm focus:outline-none w-full" />
             </div>
          </div>
          
          <div className="glass-panel p-4 rounded-2xl relative overflow-hidden border-orange-500/20">
             <div className="absolute top-0 right-0 p-2"><PhoneCall className="text-orange-500 opacity-50 w-16 h-16"/></div>
             <h3 className="font-bold text-orange-400 mb-2 relative z-10">BoothNav Assist™</h3>
             <p className="text-xs text-gray-400 mb-4 relative z-10">Lost? Tap for immediate assistance or emergency routing.</p>
             <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 rounded-xl text-sm relative z-10 shadow-[0_0_10px_rgba(234,88,12,0.3)]">
                I'm Lost / Emergency
             </button>
          </div>

          <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredBooths.map(b => (
              <div key={b.id} className="bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 cursor-pointer transition-colors block">
                 <h4 className="font-semibold text-white text-sm mb-1">{b.name}</h4>
                 <div className="flex justify-between items-center">
                    <span className={`text-xs ${b.crowdDensity === 'high' ? 'text-red-400' : 'text-emerald-400'}`}>
                      {b.queueWaitTime} min wait
                    </span>
                 </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-3 h-[600px] rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.15)] border border-white/10 relative z-0">
          <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {filteredBooths.map(booth => (
              <React.Fragment key={booth.id}>
                {/* QueueSense Heatmap visualization for Crowd Density */}
                <Circle 
                  center={[booth.lat, booth.lng]}
                  pathOptions={{ 
                    color: booth.crowdDensity === 'high' ? '#ef4444' : '#10b981', 
                    fillColor: booth.crowdDensity === 'high' ? '#ef4444' : '#10b981',
                    fillOpacity: 0.2 
                  }}
                  radius={booth.crowdDensity === 'high' ? 300 : 150}
                />
                <Marker position={[booth.lat, booth.lng]}>
                  <Popup className="custom-popup">
                    <div className="font-sans">
                      <h3 className="font-bold text-gray-900 border-b pb-1 mb-2">{booth.name}</h3>
                      <p className="text-sm font-semibold text-blue-600 mb-1">QueueSense™ Estimate:</p>
                      <p className={`text-sm mb-2 ${booth.crowdDensity === 'high' ? 'text-red-500 font-bold' : 'text-emerald-500 font-bold'}`}>
                         ~{booth.queueWaitTime} min ({booth.crowdDensity} crowd)
                      </p>
                      {booth.accessibility.length > 0 && (
                        <p className="text-xs text-gray-600">Access: {booth.accessibility.join(', ')}</p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
