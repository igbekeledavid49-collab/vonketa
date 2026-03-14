import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ShoppingCart, User, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Header3DProps {
  onCartClick: () => void;
  onLoginClick: () => void;
}

const Header3D: React.FC<Header3DProps> = ({ onCartClick, onLoginClick }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-40 bg-(--color-bg-card) border-b-2 neon-border backdrop-blur-lg bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative"
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <ShoppingBag size={44} color="#7DF9FF" strokeWidth={2.5} />
              <Zap
                size={16}
                color="#00FF40"
                fill="#00FF40"
                className="absolute -top-1 -right-1"
              />
            </motion.div>
            <div>
              <h1
                className="text-3xl sm:text-4xl font-black"
                style={{
                  background: 'linear-gradient(45deg, #7DF9FF, #DF00FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                DavsWebMarket Project
              </h1>
              <p className="text-sm text-(--color-text-secondary) hidden sm:block">
                Practicing an engaging website design
              </p>
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={onCartClick}
              className="relative p-3 rounded-full bg-(--color-bg-secondary) hover:bg-(--color-electric-cyan) transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart size={24} color="#7DF9FF" />
              {totalItems > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 w-6 h-6 bg-(--color-neon-violet) text-white rounded-full flex items-center justify-center text-xs font-bold pulse-glow"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>

            <motion.button
              onClick={onLoginClick}
              className="p-3 rounded-full bg-(--color-bg-secondary) hover:bg-(--color-neon-violet) transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <User size={24} color="#DF00FF" />
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header3D;