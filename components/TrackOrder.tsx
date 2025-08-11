'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Search, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface OrderDetails {
  orderNumber: string;
  orderDate: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  subtotal: string;
  discount: string;
  deliveryCharge: string;
  netTotal: string;
  deliveryDate?: string;
  notes?: string;
  customer: {
    name: string;
    mobile: string;
    email?: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: Array<{
    total: number;
    quantity: number;
    productId: number;
    unitPrice: string;
    productName: string;
  }>;
  lastUpdated: string;
}

interface MobileOrderDetails {
  customer: {
    name: string;
    mobile: string;
    email?: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  summary: {
    totalOrders: number;
    totalAmount: string;
    pendingOrders: number;
    completedOrders: number;
    otherOrders: number;
  };
  orders: Array<{
    orderNumber: string;
    orderDate: string;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    subtotal: string;
    discount: string;
    deliveryCharge: string;
    netTotal: string;
    deliveryDate?: string;
    notes?: string;
    customer: {
      name: string;
      mobile: string;
      email?: string;
      address: string;
      city: string;
      state: string;
      pincode: string;
    };
    items: Array<{
      total: number;
      quantity: number;
      productId: number;
      unitPrice: string;
      productName: string;
    }>;
    lastUpdated: string;
  }>;
}

export default function TrackOrder() {
  const [orderNo, setOrderNo] = useState('');
  const [mobile, setMobile] = useState('');
  const [trackingMethod, setTrackingMethod] = useState<'order' | 'mobile'>('order');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [mobileOrderDetails, setMobileOrderDetails] = useState<MobileOrderDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    if (!orderNo.trim() && !mobile.trim()) {
      setError('Please enter either Order Number or Mobile Number');
      return;
    }

    setLoading(true);
      setError('');
    setOrderDetails(null);
    setMobileOrderDetails(null);

    try {
      let response;
      
      if (trackingMethod === 'order' && orderNo.trim()) {
        // Track by order number
        response = await axios.get(`http://localhost:3000/api/public/orders/track/${orderNo.trim()}`);
        
        if (response.data.success) {
          setOrderDetails(response.data.data);
        } else {
          setError(response.data.message || 'Order not found. Please check your details.');
        }
      } else if (trackingMethod === 'mobile' && mobile.trim()) {
        // Track by mobile number
        response = await axios.get(`http://localhost:3000/api/public/orders/track/mobile/${mobile.trim()}`);
        
        if (response.data.success) {
          setMobileOrderDetails(response.data.data);
        } else {
          setError(response.data.message || 'No orders found for this mobile number.');
        }
      } else {
        setError('Please enter valid details for tracking');
        return;
      }
    } catch (error) {
      console.error('Error tracking order:', error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Failed to track order';
        setError(message);
    } else {
        setError('Failed to track order. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string | undefined | null) => {
    if (!status) return 'text-gray-600';
    
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'delivered':
        return 'text-green-600';
      case 'pending':
        return 'text-orange-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <section id="track-order" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Track Order</h2>
        
        {/* Tracking Method Selection */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setTrackingMethod('order')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                trackingMethod === 'order'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Track by Order Number
            </button>
            <button
              onClick={() => setTrackingMethod('mobile')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                trackingMethod === 'mobile'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Track by Mobile Number
            </button>
          </div>
        </div>

        {/* Tracking Form */}
        <div className="max-w-md mx-auto mb-6">
          {trackingMethod === 'order' ? (
            <div>
              <label className="block text-sm font-medium mb-2">Order Number*</label>
            <input
              type="text"
              value={orderNo}
              onChange={e => setOrderNo(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                placeholder="Enter your order number"
            />
          </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-2">Mobile Number*</label>
            <input
                type="tel"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                placeholder="Enter your mobile number"
            />
          </div>
          )}
          
          <div className="text-center mt-4">
          <button
            onClick={handleTrack}
              disabled={loading}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center justify-center mx-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Tracking...
                </>
              ) : (
                <>
                  <Search className="mr-2" size={18} />
            Track Order
                </>
              )}
          </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
              <AlertCircle className="text-red-500 mr-2" size={20} />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

                         {/* Order Details */}
                 {orderDetails && (
                   <div className="mt-8">
                     <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                       <div className="flex items-center justify-center">
                         <CheckCircle className="text-green-500 mr-2" size={20} />
                         <h3 className="text-xl font-semibold text-green-700">Order Found!</h3>
                       </div>
                     </div>
         
                     <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                       <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                         <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
                       </div>
                       
                       <div className="p-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {/* Order Information */}
                           <div>
                             <h4 className="font-semibold text-gray-900 mb-4">Order Information</h4>
                             <div className="space-y-3">
                               <div className="flex justify-between">
                                 <span className="text-gray-600">Order Number:</span>
                                 <span className="font-medium">{orderDetails.orderNumber}</span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-gray-600">Order Date:</span>
                                 <span className="font-medium">{formatDate(orderDetails.orderDate)}</span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-gray-600">Total Amount:</span>
                                 <span className="font-medium">₹{orderDetails.netTotal}</span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-gray-600">Order Status:</span>
                                 <span className={`font-medium ${getStatusColor(orderDetails.status)}`}>
                                   {orderDetails.status}
                                 </span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-gray-600">Payment Status:</span>
                                 <span className={`font-medium ${getStatusColor(orderDetails.paymentStatus)}`}>
                                   {orderDetails.paymentStatus}
                                 </span>
                               </div>
                               {orderDetails.deliveryDate && (
                                 <div className="flex justify-between">
                                   <span className="text-gray-600">Delivery Date:</span>
                                   <span className="font-medium">{formatDate(orderDetails.deliveryDate)}</span>
                                 </div>
                               )}
                             </div>
                           </div>
         
                           {/* Customer Information */}
                           <div>
                             <h4 className="font-semibold text-gray-900 mb-4">Customer Information</h4>
                             <div className="space-y-3">
                               <div className="flex justify-between">
                                 <span className="text-gray-600">Name:</span>
                                 <span className="font-medium">{orderDetails.customer.name}</span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-gray-600">Mobile:</span>
                                 <span className="font-medium">{orderDetails.customer.mobile}</span>
                               </div>
                               {orderDetails.customer.email && (
                                 <div className="flex justify-between">
                                   <span className="text-gray-600">Email:</span>
                                   <span className="font-medium">{orderDetails.customer.email}</span>
                                 </div>
                               )}
                               <div className="flex justify-between">
                                 <span className="text-gray-600">Address:</span>
                                 <span className="font-medium">{orderDetails.customer.address}</span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-gray-600">City:</span>
                                 <span className="font-medium">{orderDetails.customer.city}</span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-gray-600">State:</span>
                                 <span className="font-medium">{orderDetails.customer.state}</span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-gray-600">Pincode:</span>
                                 <span className="font-medium">{orderDetails.customer.pincode}</span>
                               </div>
                             </div>
                           </div>
                         </div>
         
                         {/* Items */}
                         {orderDetails.items && orderDetails.items.length > 0 && (
                           <div className="mt-6 pt-6 border-t border-gray-200">
                             <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
                             <div className="space-y-3">
                               {orderDetails.items.map((item, index) => (
                                 <div key={index} className="flex justify-between items-center">
                                   <div>
                                     <span className="font-medium text-gray-900">{item.productName}</span>
                                     <span className="text-sm text-gray-600 ml-2">x {item.quantity}</span>
                                   </div>
                                   <div className="text-right">
                                     <div className="font-medium">₹{item.total}</div>
                                     <div className="text-sm text-gray-600">₹{item.unitPrice} each</div>
                                   </div>
                                 </div>
                               ))}
                             </div>
                           </div>
                         )}

                         {/* Notes */}
                         {orderDetails.notes && (
                           <div className="mt-6 pt-6 border-t border-gray-200">
                             <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                             <p className="text-gray-600">{orderDetails.notes}</p>
                           </div>
                         )}

                         {/* Last Updated */}
                         <div className="mt-6 pt-6 border-t border-gray-200">
                           <div className="text-xs text-gray-500">
                             Last updated: {formatDate(orderDetails.lastUpdated)}
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 )}

                 {/* Mobile Order Details */}
                 {mobileOrderDetails && (
          <div className="mt-8">
                     <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                       <div className="flex items-center justify-center">
                         <CheckCircle className="text-green-500 mr-2" size={20} />
                         <h3 className="text-xl font-semibold text-green-700">Orders Found!</h3>
                       </div>
                     </div>

                     {/* Customer Summary */}
                     <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-6">
                       <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                         <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
                       </div>
                       
                       <div className="p-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                             <h4 className="font-semibold text-gray-900 mb-4">Customer Details</h4>
                             <div className="space-y-3">
                               <div className="flex justify-between">
                                 <span className="text-gray-600">Name:</span>
                                 <span className="font-medium">{mobileOrderDetails.customer.name}</span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-gray-600">Mobile:</span>
                                 <span className="font-medium">{mobileOrderDetails.customer.mobile}</span>
                               </div>
                               {mobileOrderDetails.customer.email && (
                                 <div className="flex justify-between">
                                   <span className="text-gray-600">Email:</span>
                                   <span className="font-medium">{mobileOrderDetails.customer.email}</span>
                                 </div>
                               )}
                               <div className="flex justify-between">
                                 <span className="text-gray-600">Address:</span>
                                 <span className="font-medium">{mobileOrderDetails.customer.address}</span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-gray-600">City:</span>
                                 <span className="font-medium">{mobileOrderDetails.customer.city}</span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-gray-600">State:</span>
                                 <span className="font-medium">{mobileOrderDetails.customer.state}</span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-gray-600">Pincode:</span>
                                 <span className="font-medium">{mobileOrderDetails.customer.pincode}</span>
                               </div>
                             </div>
                           </div>

                           <div>
                             <h4 className="font-semibold text-gray-900 mb-4">Order Summary</h4>
                             <div className="space-y-3">
                               <div className="flex justify-between">
                                 <span className="text-gray-600">Total Orders:</span>
                                 <span className="font-medium">{mobileOrderDetails.summary.totalOrders}</span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-gray-600">Total Amount:</span>
                                 <span className="font-medium">₹{mobileOrderDetails.summary.totalAmount}</span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-gray-600">Pending Orders:</span>
                                 <span className="font-medium text-orange-600">{mobileOrderDetails.summary.pendingOrders}</span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-gray-600">Completed Orders:</span>
                                 <span className="font-medium text-green-600">{mobileOrderDetails.summary.completedOrders}</span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-gray-600">Other Orders:</span>
                                 <span className="font-medium text-gray-600">{mobileOrderDetails.summary.otherOrders}</span>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Orders List */}
                     <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                       <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                         <h3 className="text-lg font-semibold text-gray-900">All Orders ({mobileOrderDetails.orders.length})</h3>
                       </div>
                       
                       <div className="divide-y divide-gray-200">
                         {mobileOrderDetails.orders.map((order, index) => (
                           <div key={index} className="p-6">
                             <div className="flex justify-between items-start mb-4">
                               <div>
                                 <h4 className="font-semibold text-gray-900">Order #{order.orderNumber}</h4>
                                 <p className="text-sm text-gray-600">{formatDate(order.orderDate)}</p>
                               </div>
                               <div className="text-right">
                                 <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                   {order.status}
                                 </div>
                                 <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ml-2 ${getStatusColor(order.paymentStatus)}`}>
                                   {order.paymentStatus}
                                 </div>
                               </div>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                               <div>
                                 <span className="text-sm text-gray-600">Subtotal:</span>
                                 <span className="block font-medium">₹{order.subtotal}</span>
                               </div>
                               <div>
                                 <span className="text-sm text-gray-600">Delivery Charge:</span>
                                 <span className="block font-medium">₹{order.deliveryCharge}</span>
                               </div>
                               <div>
                                 <span className="text-sm text-gray-600">Net Total:</span>
                                 <span className="block font-medium text-lg">₹{order.netTotal}</span>
                               </div>
                             </div>

                             {order.items && order.items.length > 0 && (
                               <div className="mb-4">
                                 <h5 className="font-medium text-gray-900 mb-2">Items:</h5>
                                 <div className="space-y-2">
                                   {order.items.map((item, itemIndex) => (
                                     <div key={itemIndex} className="flex justify-between text-sm">
                                       <span className="text-gray-600">
                                         {item.productName} x {item.quantity}
                                       </span>
                                       <span className="font-medium">₹{item.total}</span>
                                     </div>
                                   ))}
                                 </div>
                               </div>
                             )}

                             {order.notes && (
                               <div className="text-sm text-gray-600">
                                 <span className="font-medium">Notes:</span> {order.notes}
                               </div>
                             )}

                             <div className="text-xs text-gray-500 mt-3">
                               Last updated: {formatDate(order.lastUpdated)}
                             </div>
                           </div>
                         ))}
                       </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 