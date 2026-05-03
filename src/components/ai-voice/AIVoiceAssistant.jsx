import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { VoiceVisualizer } from './VoiceVisualizer';
import { MessageBubble } from './MessageBubble';

// Mock AI logic for demonstration
const generateMockResponse = (input, context) => {
  const lowerInput = input.toLowerCase();
  const isHindi = context.language === 'hi-IN';
  
  if (lowerInput.includes('candidate') || lowerInput.includes('who') || lowerInput.includes('उम्मीदवार')) {
    if (isHindi) {
        return {
          text: "आपके स्थान (मुंबई दक्षिण) के आधार पर, आपके मुख्य उम्मीदवार अरविंद सावंत (एसएस-यूबीटी) और यामिनी जाधव (एसएस) हैं। क्या आप चाहते हैं कि मैं उनके घोषणापत्रों की तुलना करूँ?",
          quickReplies: ["घोषणापत्रों की तुलना करें", "अरविंद के बारे में बताएं", "यामिनी के बारे में बताएं"]
        };
    }
    return {
      text: "Based on your location (Mumbai South), your key candidates are Arvind Sawant (SS-UBT) and Yamini Jadhav (SS). Would you like me to compare their manifestos?",
      quickReplies: ["Compare manifestos", "Tell me about Arvind", "Tell me about Yamini"]
    };
  }
  if (lowerInput.includes('booth') || lowerInput.includes('where') || lowerInput.includes('बूथ')) {
    if (isHindi) {
        return {
            text: "आपका निर्धारित मतदान केंद्र सेंट जेवियर्स हाई स्कूल, फोर्ट में है। QueueSense™ के अनुसार, वर्तमान प्रतीक्षा समय लगभग 15 मिनट है। क्या मुझे दिशा-निर्देशों के लिए BoothNav खोलना चाहिए?",
            quickReplies: ["BoothNav खोलें", "फोन पर भेजें"]
        };
    }
    return {
      text: "Your designated polling booth is at St. Xavier's High School, Fort. According to QueueSense™, the current wait time is around 15 minutes. Should I open BoothNav for directions?",
      quickReplies: ["Open BoothNav", "Send to phone"]
    };
  }
  if (lowerInput.includes('nota') || lowerInput.includes('what is nota') || lowerInput.includes('नोटा')) {
    if (isHindi) {
        let text = "नोटा (NOTA) का अर्थ है 'उपरोक्त में से कोई नहीं'। यह आपको अपने निर्वाचन क्षेत्र के सभी उम्मीदवारों के प्रति अपनी अस्वीकृति व्यक्त करने की अनुमति देता है।";
        if (context.eli5) {
          text = "कल्पना करें कि आप एक आइसक्रीम की दुकान पर जाते हैं और आपको कोई भी फ्लेवर पसंद नहीं आता। नोटा दुकानदार को यह बताने जैसा है, 'मुझे इनमें से कोई नहीं चाहिए!'";
        }
        return { text, quickReplies: ["मतदान कैसे काम करता है?", "अगर नोटा जीत जाए तो?"] };
    }
    let text = "NOTA stands for 'None of the Above'. It allows you to express your disapproval of all candidates in your constituency without casting a blank vote.";
    if (context.eli5) {
      text = "Imagine you go to an ice cream shop and you don't like any flavor. NOTA is like telling the shopkeeper, 'I don't want any of these!' It shows you came to the shop but didn't choose any flavor.";
    }
    return {
      text,
      quickReplies: ["How does voting work?", "What if NOTA wins?"]
    };
  }
  
  if (isHindi) {
      return {
          text: "मैं आपका एआई चुनाव गाइड हूँ। मैं आपको अपना मतदान केंद्र खोजने, उम्मीदवारों के बारे में जानने या मतदान कैसे काम करता है, यह समझाने में मदद कर सकता हूँ। आप क्या जानना चाहेंगे?",
          quickReplies: ["मेरा बूथ कहाँ है?", "ईवीएम के बारे में बताएं", "समाचार की पुष्टि करें"]
      };
  }
  return {
    text: "I'm your AI Election Guide. I can help you find your polling booth, learn about candidates, or explain how voting works. What would you like to know?",
    quickReplies: ["Where is my booth?", "Explain EVM to me", "Verify a news claim"]
  };
};

export const AIVoiceAssistant = () => {
  const { language: globalLang, setLanguage: setGlobalLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your Voice AI Guide. Tap the microphone and say something like 'Where is my polling booth?'", sender: 'bot', quickReplies: ["Where is my booth?", "Who is my candidate?"] }
  ]);
  const [inputText, setInputText] = useState('');
  const [eli5Mode, setEli5Mode] = useState(false);
  
  const messagesEndRef = useRef(null);
  // Ref to always call the latest version of handleSend from a memoized callback
  const handleSendRef = useRef(null);

  // Hooks
  const { speak, stop: stopSpeaking, isSpeaking } = useSpeechSynthesis();

  // handleVoiceResult is stable (useCallback with []) so it won't re-create the recognition object
  const handleVoiceResult = useCallback((transcript) => {
    setInputText(transcript);
    handleSendRef.current?.(transcript);
  }, []);

  const { 
    isListening, 
    startListening, 
    stopListening, 
    error: sttError,
    language,
    setLanguage
  } = useSpeechRecognition(handleVoiceResult);

  // Sync the speech recognition language whenever the global language changes
  useEffect(() => {
    const speechLang = globalLang === 'hi' ? 'hi-IN' : 'en-US';
    setLanguage(speechLang);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalLang]);

  const handleLanguageToggle = () => {
    setGlobalLang(globalLang === 'en' ? 'hi' : 'en');
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text) => {
    const messageText = typeof text === 'string' ? text : inputText;
    if (!messageText.trim()) return;
    
    // Stop any ongoing speech
    stopSpeaking();

    // Add user message
    const newUserMsg = { id: Date.now(), text: messageText, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    
    // Simulate thinking delay then mock response
    setTimeout(() => {
      const response = generateMockResponse(messageText, { eli5: eli5Mode, language: language });
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: response.text, 
        sender: 'bot',
        quickReplies: response.quickReplies
      }]);
      
      // Auto-speak the response
      speak(response.text, language);
    }, 1000);
  };

  // Keep the ref pointing at the latest handleSend so the memoized voice callback can use it
  handleSendRef.current = handleSend;

  const toggleListen = () => {
    if (isListening) {
      stopListening();
    } else {
      stopSpeaking(); // Stop any ongoing TTS before listening
      startListening();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all z-40 text-white"
      >
        <Mic className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[340px] sm:w-[400px] h-[600px] max-h-[80vh] glass-panel border border-white/10 rounded-3xl overflow-hidden z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-900/80 to-blue-900/80 p-4 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-500 opacity-20" />
                   <Mic className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    AI Voice Guide
                    {isSpeaking && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                  </h3>
                  <p className="text-xs text-emerald-300">Online | Locale: Mumbai</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Language Selector */}
                <button 
                  onClick={handleLanguageToggle}
                  className="text-xs px-2 py-1 rounded-md border border-white/10 text-emerald-400 font-bold hover:bg-white/5 transition-colors"
                >
                  {globalLang === 'en' ? 'ENG' : 'हिंदी'}
                </button>
                {/* ELI5 Toggle */}
                <button 
                  onClick={() => setEli5Mode(!eli5Mode)}
                  className={`text-xs px-2 py-1 rounded-md border ${eli5Mode ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'border-white/10 text-gray-400'}`}
                  title="Explain Like I'm 10 Mode"
                >
                  ELI5
                </button>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1 bg-black/20 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-black/40 scrollbar-hide">
              {messages.map((m) => (
                <MessageBubble 
                  key={m.id} 
                  message={m} 
                  onSpeak={(text) => speak(text, language)}
                  onQuickReply={handleSend}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/60 border-t border-white/5 flex flex-col gap-3">
              {/* Voice Visualizer Area */}
              <div className="h-10 flex items-center justify-center">
                {isListening ? (
                  <VoiceVisualizer isListening={isListening} />
                ) : (
                   <span className="text-xs text-gray-500 font-medium tracking-wide">
                     {sttError ? <span className="text-red-400">{sttError}</span> : "Tap the mic to speak"}
                   </span>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleListen}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isListening 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
                  className="flex-1 relative"
                >
                  <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Or type a message..." 
                    className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 placeholder-gray-500"
                  />
                  <button 
                    type="submit" 
                    disabled={!inputText.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-gray-700 disabled:text-gray-500 text-white flex items-center justify-center transition-colors"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
