import React from 'react';
import type { Product } from '../types';
import { LogOut, Plus } from 'lucide-react';
import ProductEditCard from './ProductEditCard';

interface DashboardProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onLogout: () => void;
  userEmail: string;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  products, 
  onUpdateProduct, 
  onLogout,
  userEmail 
}) => {
  return (
    <div className="min-h-screen bg-(--color-bg)">
      {/* Dashboard Header */}
      <header className="bg-(--color-bg-secondary) shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-(--color-primary)">
                Admin Dashboard
              </h1>
              <p className="text-sm text-(--color-text-secondary) mt-1">
                Logged in as: {userEmail}
              </p>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-(--color-error) hover:bg-red-50 rounded-(--radius-md) transition-colors duration-200"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-(--color-text) mb-2">
            Manage Products
          </h2>
          <p className="text-(--color-text-secondary)">
            Update prices, descriptions, and availability. Changes are saved automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductEditCard
              key={product.id}
              product={product}
              onUpdate={onUpdateProduct}
            />
          ))}
        </div>

        <div className="mt-8 p-6 bg-(--color-bg-secondary) rounded-(--radius-lg) shadow-md border-2 border-dashed border-(--color-primary) text-center">
          <Plus size={48} color="var(--color-primary)" className="mx-auto mb-3" />
          <h3 className="text-xl font-bold text-(--color-primary) mb-2">
            Add New Product
          </h3>
          <p className="text-(--color-text-secondary)">
            Feature coming soon - Contact developer to add new products
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;