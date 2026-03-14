import React from 'react';
import { ShoppingBag, User } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  return (
    <header className="bg-(--color-bg-secondary) shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag 
              size={36} 
              color="var(--color-primary)" 
              strokeWidth={2.5}
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-(--color-primary)">
                DavsProvisions Project
              </h1>
              <p className="text-sm text-(--color-text-secondary) hidden sm:block">
                Fresh Quality, Local Trust
              </p>
            </div>
          </div>
          
          <button
            onClick={onLoginClick}
            className="flex items-center gap-2 px-4 py-2 text-(--color-primary) hover:bg-(--color-bg-dark) rounded-(--radius-md) transition-colors duration-200"
            aria-label="Admin Login"
          >
            <User size={20} />
            <span className="hidden sm:inline font-medium">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;