import React from 'react';
import type { Product } from '../types';
import ProductCard3D from './ProductCard3D';

interface ProductGrid3DProps {
  products: Product[];
}

const ProductGrid3D: React.FC<ProductGrid3DProps> = ({ products }) => {
  const availableProducts = products.filter((p) => p.available);

  if (availableProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl text-(--color-text-secondary)">
          No products available at the moment. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {availableProducts.map((product, index) => (
        <ProductCard3D key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductGrid3D;