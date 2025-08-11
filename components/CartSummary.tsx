'use client';

import { CartItem } from '@/types';
import { ShoppingCart } from 'lucide-react';

interface CartSummaryProps {
  cartItems: CartItem[];
}

export default function CartSummary({ cartItems }: CartSummaryProps) {
  console.log('CartSummary cartItems:', cartItems);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalProducts = cartItems.length;
  
  // Calculate totals consistently
  const { subtotal, discount, total } = cartItems.reduce((acc, item) => {
    const originalPrice = parseFloat(item.product.original_price);
    const finalPrice = parseFloat(item.product.price);
    const quantity = item.quantity;
    
    const itemSubtotal = originalPrice * quantity;
    const itemTotal = finalPrice * quantity;
    const itemDiscount = itemSubtotal - itemTotal;
    
    return {
      subtotal: acc.subtotal + itemSubtotal,
      discount: acc.discount + itemDiscount,
      total: acc.total + itemTotal
    };
  }, { subtotal: 0, discount: 0, total: 0 });
  
  const totalAmount = subtotal;
  const totalDiscount = discount;
  const netAmount = total;

  return (
    <div className="bg-white border border-green-200 rounded-lg p-2 mb-2 sticky top-16 z-30">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <span className="flex items-center text-base font-semibold text-gray-700">
          <ShoppingCart className="mr-1 text-green-600" size={18} />
          Cart Summary
        </span>
        <span className="bg-green-50 text-green-700 text-xs font-medium px-2 py-0.5 rounded">
          {totalQuantity}/{totalProducts}
        </span>
      </div>

      {/* Simple Summary Cards */}
      <div className="flex flex-row items-center justify-between text-xs text-gray-700 font-medium gap-2">
        <div>Qty/Products: <span className="font-bold text-gray-900">{totalQuantity}/{totalProducts}</span></div>
        <div>Total: <span className="font-bold text-blue-700">₹{totalAmount.toLocaleString()}</span></div>
        <div>Discount: <span className="font-bold text-purple-700">₹{totalDiscount.toLocaleString()}</span></div>
        <div>Net: <span className="font-bold text-purple-800">₹{netAmount.toLocaleString()}</span></div>
      </div>
    </div>
  );
} 