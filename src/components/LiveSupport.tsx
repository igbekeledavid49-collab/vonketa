import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User } from 'lucide-react';

const LiveSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'support' }[]>([
    { text: 'Hello! How can I help you today? 👋', sender: 'support' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    setMessages([...messages, { text: inputValue, sender: 'user' }]);
    setInputValue('');

    // Simulate support response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: 'Thank you for reaching out! Our team will assist you shortly.', sender: 'support' },
      ]);
    }, 1000);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 p-4 bg-(--color-neon-violet) rounded-full shadow-xl z-40 pulse-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <MessageCircle size={32} color="white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed bottom-6 left-6 w-80 sm:w-96 bg-(--color-bg-card) rounded-(--radius-xl) overflow-hidden z-50 neon-border"
              initial={{ scale: 0, originX: 0, originY: 1 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              {/* Header */}
              <div className="bg-(--color-neon-violet) p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <User size={24} color="#DF00FF" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Live Support</h3>
                    <p className="text-xs text-white opacity-80">Online now</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1">
                  <X size={20} color="white" />
                </button>
              </div>

              {/* Messages */}
              <div className="h-64 overflow-y-auto p-4 space-y-3 bg-(--color-bg-secondary)">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-(--radius-md) ${
                        msg.sender === 'user'
                          ? 'bg-(--color-electric-cyan) text-(--color-bg)'
                          : 'bg-(--color-bg-card) text-(--color-text)'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 bg-(--color-bg-card) flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-(--color-bg-secondary) rounded-(--radius-md) text-(--color-text) border-2 border-(--color-electric-cyan) focus:outline-none"
                />
                <motion.button
                  onClick={handleSend}
                  className="p-2 bg-(--color-electric-cyan) rounded-(--radius-md)"
                  whileTap={{ scale: 0.9 }}
                >
                  <Send size={20} color="#0a0a0f" />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveSupport;