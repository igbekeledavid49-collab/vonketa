import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center animated-gradient"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center px-6">
          <motion.div
            className="inline-flex items-center justify-center w-32 h-32 rounded-full mb-8 pulse-glow"
            style={{ background: 'rgba(125, 249, 255, 0.1)' }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ShoppingBag size={64} color="#7DF9FF" strokeWidth={2.5} />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4 glow-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to
          </motion.h1>

          <motion.h2
            className="text-6xl md:text-7xl font-black mb-6"
            style={{
              background: 'linear-gradient(45deg, #7DF9FF, #DF00FF, #00FF40)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            NaijaProvisions
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-(--color-text-secondary) mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
          </motion.p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="h-2 bg-(--color-bg-secondary) rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full animated-gradient"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <motion.p
              className="text-sm text-(--color-electric-cyan) font-mono"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading {progress}%
            </motion.p>
          </div>
        </div>

        {/* Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;