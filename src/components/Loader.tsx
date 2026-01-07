import { useEffect, useState } from 'react';

interface LoaderProps {
  onLoadComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loader after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onLoadComplete) {
        onLoadComplete();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500">
      <div className="text-center">
        {/* Pulsing Logo */}
        <div className="relative inline-block">
          {/* Outer pulsing ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-gold/30 animate-ping"></div>
          </div>
          
          {/* Middle pulsing ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-gold/50 animate-pulse"></div>
          </div>

          {/* Logo */}
          <div className="relative w-20 h-20 bg-navy rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
            <span className="text-gold text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>V</span>
          </div>
        </div>

        {/* Company name */}
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-navy mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Vonketa
          </h1>
          <p className="text-black text-lg font-bold">Welcome to Vonketa...</p>
        </div>

        {/* Loading dots animation */}
        <div className="flex gap-2 justify-center mt-6">
          <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;