import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, MessageSquare, X, Send } from 'lucide-react';
import axios from 'axios';
import { useShopStore } from '../context/ShopContext';

export const VoiceChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your AI Shopping Assistant. How can I help you today?", isBot: true }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  
  const { userId } = useShopStore();
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleSend(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleSend = async (text = inputText) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), text, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    try {
      const res = await axios.post('/api/chat', { message: text, userId });
      const botReply = res.data.reply;
      
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botReply, isBot: true }]);
      
      // Text-to-speech
      if (synthRef.current) {
        synthRef.current.cancel(); // Stop current
        const utterance = new SpeechSynthesisUtterance(botReply);
        synthRef.current.speak(utterance);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting to the server.", isBot: true }]);
    }
  };

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      synthRef.current?.cancel(); // Stop talking if listening
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="glass-panel w-80 sm:w-96 h-[500px] flex flex-col rounded-2xl shadow-2xl border border-emerald-500/30 overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-emerald-900/40 to-blue-900/40">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <h3 className="font-heading font-medium text-white">AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.isBot ? 'bg-white/10 text-gray-200 rounded-tl-none' : 'bg-emerald-600 text-white rounded-tr-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-white/10 bg-black/40 flex items-center gap-2">
            <button 
              onClick={toggleListen}
              className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm px-2"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
              className="p-2 rounded-full bg-emerald-500 text-white disabled:opacity-50 disabled:bg-gray-600 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-110 flex items-center justify-center group relative"
        >
          <MessageSquare className="w-6 h-6" />
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400 opacity-0 group-hover:animate-ping"></div>
        </button>
      )}
    </div>
  );
};
