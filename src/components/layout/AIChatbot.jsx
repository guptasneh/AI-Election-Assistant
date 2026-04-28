import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your Multilingual AI Assistant. How can I help you regarding the elections today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { id: Date.now(), text: input, sender: 'user' }]);
    setInput('');
    
    // Mock response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "I can help you locate your booth, check candidate manifestos, or verify news through TruthShield™. What would you like to explore?", 
        sender: 'bot' 
      }]);
    }, 1000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all z-40 text-white"
      >
        <MessageSquare />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 glass-panel border border-white/10 rounded-2xl overflow-hidden z-50 flex flex-col shadow-2xl"
          >
            <div className="bg-gradient-to-r from-emerald-900/50 to-blue-900/50 p-4 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-semibold">AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 h-80 overflow-y-auto flex flex-col gap-3 bg-black/40">
              {messages.map((m) => (
                <div key={m.id} className={`max-w-[85%] rounded-xl p-3 text-sm ${m.sender === 'user' ? 'bg-emerald-600/20 border border-emerald-500/20 text-emerald-50 self-end rounded-tr-sm' : 'bg-white/5 border border-white/5 text-gray-200 self-start rounded-tl-sm'}`}>
                  {m.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-3 bg-black/60 border-t border-white/5 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..." 
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 placeholder-gray-500"
              />
              <button type="submit" className="w-10 h-10 rounded-full bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 flex items-center justify-center transition-colors">
                <Send className="w-4 h-4 ml-1" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
