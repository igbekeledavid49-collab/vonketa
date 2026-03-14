import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { AppState } from './types';
import { initialProducts } from './data/initialProducts';
import { loadProducts, saveProducts } from './utils/storage';
import { CartProvider } from './context/CartContext';

// Components
import LoadingScreen from './components/LoadingScreen';
import RippleEffect from './components/RippleEffect';
import Header3D from './components/Header3D';
import ProductGrid3D from './components/ProductGrid3D';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import LiveSupport from './components/LiveSupport';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [state, setState] = useState<AppState>({
    products: loadProducts() || initialProducts,
    user: null,
    view: 'public',
  });

  useEffect(() => {
    saveProducts(state.products);
  }, [state.products]);

  const handleLogin = (email: string) => {
    setState({
      ...state,
      user: { email, isAdmin: true },
      view: 'dashboard',
    });
  };

  const handleLogout = () => {
    setState({
      ...state,
      user: null,
      view: 'public',
    });
  };

  const handleUpdateProduct = (updatedProduct: typeof state.products[0]) => {
    setState({
      ...state,
      products: state.products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      ),
    });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  // Login View
  if (state.view === 'login') {
    return (
      <Login
        onLogin={handleLogin}
        onClose={() => setState({ ...state, view: 'public' })}
      />
    );
  }

  // Admin Dashboard View
  if (state.view === 'dashboard' && state.user) {
    return (
      <Dashboard
        products={state.products}
        onUpdateProduct={handleUpdateProduct}
        onLogout={handleLogout}
        userEmail={state.user.email}
      />
    );
  }

  // Public Store View
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        <RippleEffect />
        
        {/* Particle Background */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}

        <Header3D
          onCartClick={() => setIsCartOpen(true)}
          onLoginClick={() => setState({ ...state, view: 'login' })}
        />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-5xl sm:text-6xl md:text-7xl font-black mb-6"
              style={{
                background: 'linear-gradient(45deg, #7DF9FF, #DF00FF, #00FF40, #7DF9FF)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-shift 8s ease infinite',
              }}
            >
              Step Into Our Virtual Store
            </motion.h2>
            <motion.p
              className="text-xl sm:text-2xl text-(--color-text-secondary) max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Experience shopping like never before with our immersive 3D product showcase
            </motion.p>
          </motion.div>

          <ProductGrid3D products={state.products} />
        </main>

        <Footer />
        
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={handleCheckout}
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />

        <LiveSupport />
      </div>
    </CartProvider>
  );
}

export default App;