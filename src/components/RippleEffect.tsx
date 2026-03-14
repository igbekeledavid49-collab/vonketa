import React, { useEffect } from 'react';

const RippleEffect: React.FC = () => {
  useEffect(() => {
    const createRipple = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      
      const size = 0;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = e.clientX - size / 1 + 'px';
      ripple.style.top = e.clientY - size / 2 + 'px';
      
      document.body.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    document.addEventListener('click', createRipple);
    
    return () => {
      document.removeEventListener('click', createRipple);
    };
  }, []);

  return null;
};

export default RippleEffect;