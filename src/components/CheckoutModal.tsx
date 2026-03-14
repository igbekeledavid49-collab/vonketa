import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, MapPin, User, Phone, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'card',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    setTimeout(() => {
      clearCart();
      onClose();
      setStep('form');
      setFormData({ name: '', phone: '', address: '', city: '', paymentMethod: 'card' });
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-(--color-bg-card) rounded-(--radius-xl) max-w-2xl w-full max-h-[90vh] overflow-y-auto neon-border"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {step === 'form' ? (
                <>
                  {/* Header */}
                  <div className="sticky top-0 bg-(--color-bg-card) p-6 flex items-center justify-between border-b-2 neon-border z-10">
                    <h2 className="text-3xl font-bold text-(--color-electric-cyan)">Checkout</h2>
                    <button onClick={onClose} className="p-2 hover:bg-(--color-bg-secondary) rounded-full">
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Customer Info */}
                    <div>
                      <label className="flex items-center gap-2 text-lg font-semibold mb-3">
                        <User size={20} color="#7DF9FF" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-(--color-bg-secondary) text-(--color-text) rounded-(--radius-md) border-2 border-(--color-electric-cyan) focus:outline-none focus:border-(--color-neon-violet) transition-colors"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                     <div>
                      <label className="flex items-center gap-2 text-lg font-semibold mb-3">
                        <User size={20} color="#7DF9FF" />
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-(--color-bg-secondary) text-(--color-text) rounded-(--radius-md) border-2 border-(--color-electric-cyan) focus:outline-none focus:border-(--color-neon-violet) transition-colors"
                        placeholder="Last name (optional)"
                        required
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-lg font-semibold mb-3">
                        <Phone size={20} color="#7DF9FF" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-(--color-bg-secondary) text-(--color-text) rounded-(--radius-md) border-2 border-(--color-electric-cyan) focus:outline-none focus:border-(--color-neon-violet) transition-colors"
                        placeholder="+234"
                        required
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-lg font-semibold mb-3">
                        <MapPin size={20} color="#7DF9FF" />
                        Delivery Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-(--color-bg-secondary) text-(--color-text) rounded-(--radius-md) border-2 border-(--color-electric-cyan) focus:outline-none focus:border-(--color-neon-violet) transition-colors resize-none"
                        rows={3}
                        placeholder="Enter your delivery address"
                        required
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-lg font-semibold mb-3">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-(--color-bg-secondary) text-(--color-text) rounded-(--radius-md) border-2 border-(--color-electric-cyan) focus:outline-none focus:border-(--color-neon-violet) transition-colors"
                        placeholder="Enter city"
                        required
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-lg font-semibold mb-3">
                        <CreditCard size={20} color="#7DF9FF" />
                        Payment Method
                      </label>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-(--color-bg-secondary) text-(--color-text) rounded-(--radius-md) border-2 border-(--color-electric-cyan) focus:outline-none focus:border-(--color-neon-violet) transition-colors"
                        required
                      >
                        <option value="card">Credit/Debit Card</option>
                        <option value="transfer">Bank Transfer</option>
                        <option value="cash">Cash on Delivery</option>
                      </select>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-(--color-bg-secondary) p-4 rounded-(--radius-md) neon-border">
                      <h3 className="font-bold text-xl mb-3">Order Summary</h3>
                      <div className="space-y-2 mb-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.name} × {item.quantity}</span>
                            <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t-2 border-(--color-electric-cyan) pt-3 flex justify-between items-center">
                        <span className="text-xl font-bold">Total:</span>
                        <span className="text-2xl font-bold text-(--color-electric-cyan)">
                          ₦{getTotalPrice().toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full btn-primary py-4 text-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Click to Place Order
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  className="p-12 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360],
                    }}
                    transition={{ duration: 1 }}
                  >
                    <CheckCircle size={96} color="#00FF40" className="mx-auto mb-6" />
                  </motion.div>
                  <h2 className="text-4xl font-bold text-(--color-electric-cyan) mb-4">Order Confirmed</h2>
                  <p className="text-xl text-(--color-text-secondary) mb-2">Thank you, {formData.name}</p>
                  <p className="text-(--color-text-muted)">
                    Your order will be delivered to {formData.city} soon.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;