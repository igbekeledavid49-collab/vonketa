import React, { useState } from 'react';
import type { Product } from '../types';
import { Edit, Save, X, Eye, EyeOff } from 'lucide-react';

interface ProductEditCardProps {
  product: Product;
  onUpdate: (product: Product) => void;
}

const ProductEditCard: React.FC<ProductEditCardProps> = ({ product, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleSave = () => {
    const updatedProduct = {
      ...editedProduct,
      lastUpdated: new Date().toISOString(),
    };
    onUpdate(updatedProduct);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProduct(product);
    setIsEditing(false);
  };

  const toggleAvailability = () => {
    const updatedProduct = {
      ...product,
      available: !product.available,
      lastUpdated: new Date().toISOString(),
    };
    onUpdate(updatedProduct);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-bold shadow-md ${
          product.available ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
        }`}>
          {product.available ? 'Available' : 'Hidden'}
        </div>
      </div>

      <div className="p-5">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-(--color-text) mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={editedProduct.name}
                onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-(--color-text) mb-1">
                Description
              </label>
              <textarea
                value={editedProduct.description}
                onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                className="input-field resize-none"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-(--color-text) mb-1">
                Price (₦)
              </label>
              <input
                type="number"
                value={editedProduct.price}
                onChange={(e) => setEditedProduct({ ...editedProduct, price: Number(e.target.value) })}
                className="input-field"
                min="0"
                step="100"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-(--color-success) text-white rounded-(--radius-md) font-semibold hover:opacity-90 transition-opacity"
              >
                <Save size={18} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-(--radius-md) font-semibold hover:opacity-90 transition-opacity"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold text-(--color-text) mb-2">
              {product.name}
            </h3>
            <p className="text-sm text-(--color-text-secondary) mb-3">
              {product.description}
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-(--color-accent)">
                ₦{product.price.toLocaleString()}
              </span>
            </div>

            <div className="text-xs text-(--color-text-secondary) mb-4">
              Last updated: {formatDate(product.lastUpdated)}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-(--color-primary) text-white rounded-(--radius-md) font-semibold hover:bg-(--color-primary-dark) transition-colors"
              >
                <Edit size={18} />
                Edit
              </button>
              <button
                onClick={toggleAvailability}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-(--radius-md) font-semibold transition-colors ${
                  product.available
                    ? 'bg-gray-200 text-(--color-text) hover:bg-gray-300'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {product.available ? <EyeOff size={18} /> : <Eye size={18} />}
                {product.available ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductEditCard;