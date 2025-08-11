'use client';

import React, { useState } from 'react';
import { X, Plus, Minus, Heart, ShoppingCart } from 'lucide-react';
import { Product, CartItem } from '@/types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (item: CartItem) => void;
  onUpdateCartQuantity: (productId: string, quantity: number) => void;
  cartItems: CartItem[];
  onPlaceOrder: () => void;
}

export default function WishlistModal({
  isOpen,
  onClose,
  wishlistItems,
  onToggleWishlist,
  onAddToCart,
  onUpdateCartQuantity,
  cartItems,
  onPlaceOrder
}: WishlistModalProps) {
  // Get cart quantity for a product
  const getCartQuantity = (productId: string) => {
    const cartItem = cartItems.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Handle quantity change
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 0 && newQuantity <= 10) {
      if (newQuantity === 0) {
        onUpdateCartQuantity(productId, 0);
      } else {
        onUpdateCartQuantity(productId, newQuantity);
      }
    }
  };

  // Remove from wishlist
  const handleRemoveFromWishlist = (productId: string) => {
    onToggleWishlist(productId);
    // Also remove from cart if it's there
    if (getCartQuantity(productId) > 0) {
      onUpdateCartQuantity(productId, 0);
    }
  };

  // Calculate totals
  const totalItems = wishlistItems.length;
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const minOrderAmount = 2500;
  const isBelowMinimum = totalAmount > 0 && totalAmount < minOrderAmount;

  // Handle place order
  const handlePlaceOrder = () => {
    onPlaceOrder();
    onClose(); // Close the wishlist modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <Heart className="text-red-500" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium">
              {totalItems} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content - Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="text-gray-300 mx-auto mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-6">Start adding products to your wishlist to see them here!</p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistItems.map((product) => {
                const cartQuantity = getCartQuantity(product.id);
                const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                
                return (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-2xl">🎆</div>
                        {discountPercentage > 0 && (
                          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded">
                            {discountPercentage}%
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-lg mb-1">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="text-lg font-bold text-gray-900">
                                ₹{product.price.toLocaleString()}
                              </span>
                              {product.originalPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through">
                                  ₹{product.originalPrice.toLocaleString()}
                                </span>
                              )}
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {product.category}
                              </span>
                            </div>
                          </div>
                          
                          {/* Remove from wishlist button */}
                          <button
                            onClick={() => handleRemoveFromWishlist(product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                            title="Remove from wishlist"
                          >
                            <Heart size={20} fill="currentColor" className="text-red-500" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => handleQuantityChange(product.id, cartQuantity - 1)}
                                disabled={cartQuantity <= 0 || !product.inStock}
                                className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-3 py-1 text-gray-900 font-medium min-w-[2rem] text-center">
                                {cartQuantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(product.id, cartQuantity + 1)}
                                disabled={cartQuantity >= 10 || !product.inStock}
                                className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            {cartQuantity > 0 && (
                              <span className="text-sm text-green-600 font-medium">
                                {cartQuantity} in cart
                              </span>
                            )}
                          </div>
                          
                          {/* Stock Status */}
                          <div className="text-right">
                            {product.inStock ? (
                              <span className="text-sm text-green-600 font-medium">In Stock</span>
                            ) : (
                              <span className="text-sm text-red-600 font-medium">Out of Stock</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{totalItems}</span> wishlist items
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{totalCartItems}</span> items in cart
                </div>
                {totalAmount > 0 && (
                  <div className="text-lg font-bold text-gray-900">
                    Total: ₹{totalAmount.toLocaleString()}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Continue Shopping
                </button>
                {totalCartItems > 0 && (
                  <>
                    <button
                      onClick={onClose}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <ShoppingCart size={20} />
                      <span>View Cart</span>
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isBelowMinimum}
                      className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                        isBelowMinimum
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      <span>🚀</span>
                      <span>Place Order</span>
                    </button>
                  </>
                )}
              </div>
            </div>
            {isBelowMinimum && totalCartItems > 0 && (
              <div className="mt-3 text-center">
                <div className="text-xs text-gray-600">
                  Minimum order amount: ₹{minOrderAmount.toLocaleString()}
                </div>
                <div className="text-xs text-red-600 font-medium">
                  Add ₹{(minOrderAmount - totalAmount).toLocaleString()} more to place order
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 