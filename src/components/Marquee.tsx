import React from 'react';

const Marquee: React.FC = () => {
  return (
    <div className="bg-(--color-accent) text-(--color-text) py-3 overflow-hidden">
      <div className="flex whitespace-nowrap marquee">
        <div className="flex items-center gap-8 px-4">
          <span className="text-lg font-semibold">🔥 Fresh yams in stock! Order now!</span>
          <span className="text-lg font-semibold">📦 Free delivery on orders above ₦20,000</span>
          <span className="text-lg font-semibold">🌾 New premium rice just arrived!</span>
          <span className="text-lg font-semibold">💚 Support local farmers - Buy Nigerian!</span>
        </div>
        <div className="flex items-center gap-8 px-4">
          <span className="text-lg font-semibold">🔥 Fresh yams in stock! Order now!</span>
          <span className="text-lg font-semibold">📦 Free delivery on orders above ₦20,000</span>
          <span className="text-lg font-semibold">🌾 New premium rice just arrived!</span>
          <span className="text-lg font-semibold">💚 Support local farmers - Buy Nigerian!</span>
        </div>
      </div>
    </div>
  );
};

export default Marquee;