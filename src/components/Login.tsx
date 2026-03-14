import React, { useState } from 'react';
import { LogIn, X } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string) => void;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simple validation (in production, use proper authentication)
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Demo login - accept any valid email/password combination
    onLogin(email);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-(--color-bg-secondary) rounded-(--radius-xl) shadow-2xl max-w-md w-full p-8 relative slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-(--color-accent-light) mb-4">
            <LogIn size={32} color="var(--color-primary)" strokeWidth={2} />
          </div>
          <h2 className="text-2xl font-bold text-(--color-primary)">Admin Login</h2>
          <p className="text-(--color-text-secondary) mt-2">
            Access the dashboard to manage products
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-(--color-text) mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="admin@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-(--color-text) mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-(--radius-md)">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full btn-primary text-lg"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-(--color-text-secondary) mt-6">
          Demo: Use any email and password (min 6 chars)
        </p>
      </div>
    </div>
  );
};

export default Login;