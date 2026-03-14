import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-96 lg:w-[450px] bg-(--color-bg-secondary) z-50 overflow-y-auto"
            style={{ boxShadow: 'var(--shadow-elevated)' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-(--color-bg-card) p-6 flex items-center justify-between neon-border border-b-2 z-10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={28} color="#7DF9FF" />
                <div>
                  <h2 className="text-2xl font-bold text-(--color-text)">Your Cart</h2>
                  <p className="text-sm text-(--color-text-secondary)">{getTotalItems()} items</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-(--color-bg-secondary) rounded-full transition-colors"
              >
                <X size={24} color="#7DF9FF" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag size={64} color="#7DF9FF" className="mx-auto mb-4 opacity-50" />
                  <p className="text-(--color-text-secondary) text-lg">Your cart is empty</p>
                  <p className="text-(--color-text-muted) text-sm mt-2">Add some items to get started!</p>
                </div>
              ) : (
                <>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      className="card-3d p-4 flex gap-4"
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-(--radius-md)"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-(--color-text) mb-1">{item.name}</h3>
                        <p className="text-(--color-electric-cyan) font-semibold">
                          ₦{item.price.toLocaleString()}
                        </p>
                        
                        <div className="flex items-center gap-3 mt-3">
                          <motion.button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-(--color-bg-secondary) flex items-center justify-center hover:bg-(--color-electric-cyan) transition-colors"
                            whileTap={{ scale: 0.9 }}
                          >
                            <Minus size={16} />
                          </motion.button>
                          
                          <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                          
                          <motion.button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-(--color-bg-secondary) flex items-center justify-center hover:bg-(--color-electric-cyan) transition-colors"
                            whileTap={{ scale: 0.9 }}
                          >
                            <Plus size={16} />
                          </motion.button>
                          
                          <motion.button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto p-2 hover:bg-red-500 rounded-full transition-colors"
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="sticky bottom-0 bg-(--color-bg-card) p-6 neon-border border-t-2">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-semibold text-(--color-text)">Total:</span>
                  <span className="text-3xl font-bold text-(--color-electric-cyan)">
                    ₦{getTotalPrice().toLocaleString()}
                  </span>
                </div>
                
                <motion.button
                  onClick={onCheckout}
                  className="w-full btn-primary py-4 text-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;