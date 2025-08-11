'use client';

import { motion } from 'framer-motion';
import { Plus, Minus, Play } from 'lucide-react';
import { Product, CartItem } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  onUpdateCartQuantity: (productId: number, quantity: number) => void;
  cartQuantity: number;
}

export default function ProductCard({ product, onAddToCart, onUpdateCartQuantity, cartQuantity }: ProductCardProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0 && newQuantity <= 10) {
      if (newQuantity === 0) {
        onUpdateCartQuantity(product.id, 0);
      } else {
        onUpdateCartQuantity(product.id, newQuantity);
      }
    }
  };

  const discountPercentage = Math.round(((parseFloat(product.original_price) - parseFloat(product.price)) / parseFloat(product.original_price)) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img 
            src={`http://localhost:3000${product.image}`} 
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to emoji if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.parentElement?.querySelector('.fallback-emoji') as HTMLElement;
              if (fallback) fallback.style.display = 'block';
            }}
          />
        ) : (
          <div className="text-6xl fallback-emoji">🎆</div>
        )}
        
        {/* YouTube Button - Top Left */}
        {product.youtube && (
          <button
            onClick={() => window.open(product.youtube, '_blank')}
            className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 z-10"
            title="Watch on YouTube"
          >
            <Play size={16} className="fill-current" />
          </button>
        )}
        
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercentage}% OFF
          </div>
        )}
        {product.current_stock <= 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
            {product.name}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{parseFloat(product.price).toLocaleString()}
            </span>
            {parseFloat(product.original_price) > parseFloat(product.price) && (
              <span className="text-sm text-gray-500 line-through">
                ₹{parseFloat(product.original_price).toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => handleQuantityChange(cartQuantity - 1)}
              disabled={cartQuantity <= 0 || product.current_stock <= 0}
              className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus size={16} />
            </button>
            <span className="px-3 py-1 text-gray-900 font-medium min-w-[2rem] text-center">
              {cartQuantity}
            </span>
            <button
              onClick={() => handleQuantityChange(cartQuantity + 1)}
              disabled={cartQuantity >= 10 || product.current_stock <= 0 || cartQuantity >= product.current_stock}
              className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
            </button>
          </div>
          {cartQuantity > 0 && (
            <span className="text-xs text-green-600 font-medium">
              {cartQuantity} in cart
            </span>
          )}
        </div>

        {/* Stock Information */}
        <div className="flex justify-center">
          <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">
            Stock: {product.current_stock}
          </span>
        </div>
      </div>
    </motion.div>
  );
} 