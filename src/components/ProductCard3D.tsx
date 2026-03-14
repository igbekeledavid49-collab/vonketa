import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Sparkles } from 'lucide-react';

interface ProductCard3DProps {
  product: Product;
  index: number;
}

const ProductCard3D: React.FC<ProductCard3DProps> = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    setIsHovered(false);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  if (!product.available) {
    return null;
  }

  return (
    <motion.div
      ref={cardRef}
      className="card-3d group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div className="relative overflow-hidden rounded-t-(--radius-xl)">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-(--color-bg-secondary) to-(--color-bg-card)">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Glow Overlay */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-(--color-electric-cyan) via-transparent to-transparent opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
          />
        )}

        {/* Price Tag */}
        <motion.div
          className="absolute top-4 right-4 px-4 py-2 rounded-full font-bold text-lg neon-border bg-(--color-bg-card)"
          animate={{
            scale: isHovered ? 1.1 : 1,
            boxShadow: isHovered ? 'var(--glow-primary)' : 'none',
          }}
        >
          <span className="text-(--color-electric-cyan)">₦{product.price.toLocaleString()}</span>
        </motion.div>

        {/* Sparkle Effect */}
        {isHovered && (
          <motion.div
            className="absolute top-4 left-4"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={24} color="#7DF9FF" fill="#7DF9FF" />
          </motion.div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-(--color-text) mb-2 group-hover:text-(--color-electric-cyan) transition-colors">
          {product.name}
        </h3>
        <p className="text-(--color-text-secondary) mb-4 line-clamp-2">
          {product.description}
        </p>

        <motion.button
          onClick={handleAddToCart}
          className="w-full btn-primary flex items-center justify-center gap-3 text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingCart size={22} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard3D;