import React from 'react';
import { motion } from 'framer-motion';

export const VoiceVisualizer = ({ isListening }) => {
  if (!isListening) return null;

  return (
    <div className="flex items-center justify-center gap-1 h-10">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 bg-emerald-400 rounded-full"
          animate={{
            height: ["8px", "24px", "8px"],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};
