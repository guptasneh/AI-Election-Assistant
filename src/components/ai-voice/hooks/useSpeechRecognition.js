import { useState, useEffect, useCallback, useRef } from 'react';

export const useSpeechRecognition = (onResult) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en-US'); // Default to English, can be 'hi-IN'

  // Store onResult in a ref so changing the callback doesn't re-create the recognition object
  const onResultRef = useRef(onResult);
  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recog = new SpeechRecognition();
      
      recog.continuous = false;
      recog.interimResults = false;
      
      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (onResultRef.current) {
          onResultRef.current(transcript);
        }
        setIsListening(false);
      };

      recog.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setError(event.error);
        setIsListening(false);
      };

      recog.onend = () => {
        setIsListening(false);
      };

      setRecognition(recog);
    } else {
      setError("Speech Recognition is not supported in this browser.");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  useEffect(() => {
    if (recognition) {
        recognition.lang = language;
    }
  }, [language, recognition]);

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      try {
        setError(null);
        recognition.start();
        setIsListening(true);
      } catch (err) {
        console.error("Could not start recognition:", err);
        setIsListening(false);
      }
    }
  }, [recognition, isListening]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition, isListening]);

  return {
    isListening,
    startListening,
    stopListening,
    error,
    language,
    setLanguage
  };
};
