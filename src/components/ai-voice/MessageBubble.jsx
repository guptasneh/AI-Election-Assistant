import React from 'react';
import { Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const MessageBubble = ({ message, onSpeak, onQuickReply }) => {
  const isUser = message.sender === 'user';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}
    >
      <div className={`max-w-[85%] rounded-xl p-3 text-sm relative group
        ${isUser 
          ? 'bg-emerald-600/20 border border-emerald-500/20 text-emerald-50 rounded-tr-sm' 
          : 'bg-white/5 border border-white/5 text-gray-200 rounded-tl-sm'
        }`}
      >
        {message.text}
        
        {/* Play Audio Button for Bot Messages */}
        {!isUser && onSpeak && (
          <button 
            onClick={() => onSpeak(message.text)}
            className="absolute -right-8 bottom-1 p-1.5 text-gray-400 hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-full border border-white/10"
            title="Listen"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Quick Replies */}
      {!isUser && message.quickReplies && message.quickReplies.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {message.quickReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => onQuickReply && onQuickReply(reply)}
              className="text-xs px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};
