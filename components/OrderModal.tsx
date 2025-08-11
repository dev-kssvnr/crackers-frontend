'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, MapPin, Phone, Mail, CreditCard, Loader2, CheckCircle } from 'lucide-react';
import { CartItem, CustomerDetails, OrderItem } from '@/types';
import axios from 'axios';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onConfirmOrder: (customerDetails: CustomerDetails, orderNumber?: string) => void;
}

export default function OrderModal({ isOpen, onClose, cartItems, onConfirmOrder }: OrderModalProps) {
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    address1: '',
    address2: '',
    landmark: '',
    mobile: '',
    whatsapp: '',
    city: '',
    pincode: '',
    state: '',
    email: '', // new field
  });

  const [errors, setErrors] = useState<Partial<CustomerDetails>>({});
  
  // State and City API states
  const [states, setStates] = useState<Array<{ id: number; state: string; status: string }>>([]);
  const [cities, setCities] = useState<Array<{ id: number; city: string; state: string; delivery_charge: string; status: string }>>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [selectedState, setSelectedState] = useState<string>('');
  const [submittingOrder, setSubmittingOrder] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
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

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Load states from API
  const loadStates = async () => {
    try {
      setLoadingStates(true);
      const response = await axios.get('http://localhost:3000/api/public/states', {
        params: { status: 'active' }
      });
      if (response.data.success && response.data.data) {
        setStates(response.data.data);
      } else if (Array.isArray(response.data)) {
        setStates(response.data);
      }
    } catch (error) {
      console.error('Error loading states:', error);
    } finally {
      setLoadingStates(false);
    }
  };

  // Load cities based on selected state
  const loadCities = async (stateName: string) => {
    try {
      setLoadingCities(true);
      setCities([]); // Clear previous cities
      const response = await axios.get(`http://localhost:3000/api/public/cities`, {
        params: { 
          state: stateName,
          status: 'active'
        }
      });
      if (response.data.success && response.data.data) {
        setCities(response.data.data);
      } else if (Array.isArray(response.data)) {
        setCities(response.data);
      }
    } catch (error) {
      console.error('Error loading cities:', error);
    } finally {
      setLoadingCities(false);
    }
  };

  // Handle state selection
  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    setCustomerDetails(prev => ({ ...prev, state: stateName }));
    setCustomerDetails(prev => ({ ...prev, city: '' })); // Reset city when state changes
    
    if (stateName) {
      loadCities(stateName);
    } else {
      setCities([]);
    }
  };

  // Handle city selection
  const handleCityChange = (cityName: string) => {
    setCustomerDetails(prev => ({ ...prev, city: cityName }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerDetails> = {};

    if (!customerDetails.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!customerDetails.address1.trim()) {
      newErrors.address1 = 'Address is required';
    }
    if (!customerDetails.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(customerDetails.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    if (!customerDetails.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(customerDetails.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }
    if (!customerDetails.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!customerDetails.city.trim()) {
      newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmittingOrder(true);
      try {
        // Validate all cart items before processing
        console.log('🔍 Validating cart items:', cartItems.map(item => ({
          id: item.product.id,
          name: item.product.name,
          quantity: item.quantity
        })));
        
        // Calculate totals for each item consistently
        const items: OrderItem[] = cartItems.map(item => {
          // Debug product data
          console.log('🔍 Processing product:', {
            id: item.product.id,
            idType: typeof item.product.id,
            name: item.product.name,
            quantity: item.quantity
          });
          
          // Validate product ID
          if (!item.product.id || isNaN(item.product.id)) {
            console.error('❌ Invalid product ID:', item.product.id);
            throw new Error(`Invalid product ID: ${item.product.id}`);
          }
          
          const originalPrice = parseFloat(item.product.original_price);
          const finalPrice = parseFloat(item.product.price);
          const quantity = item.quantity;
          
          // Calculate discount amount (not percentage) if original price exists
          const discountAmount = (originalPrice && originalPrice > 0) ? 
            (originalPrice - finalPrice) : 0;
          
          // Calculate totals
          const total = finalPrice * quantity;
          
          // Log calculation for debugging
          console.log(`🧮 Item calculation for ${item.product.name}:`, {
            originalPrice,
            finalPrice,
            quantity,
            discountAmount,
            total
          });
          
          return {
            productId: item.product.id,
            productName: item.product.name,
            quantity: quantity,
            rate: finalPrice.toFixed(2),
            originalPrice: originalPrice.toFixed(2),
            discount: discountAmount.toFixed(2),
            total: total
          };
        });

        // Prepare order data
        const orderData: {
          customerName: string;
          customerMobile: string;
          customerAddress: string;
          customerLocation: string;
          customerState: string;
          customerCity: string;
          customerPincode: string;
          customerLandmark: string;
          customerWhatsapp: string;
          customerEmail?: string;
          items: OrderItem[];
          paymentMethod: string;
        } = {
          customerName: customerDetails.name,
          customerMobile: customerDetails.mobile,
          customerAddress: customerDetails.address1 + (customerDetails.address2 ? `, ${customerDetails.address2}` : ''),
          customerLocation: customerDetails.landmark || customerDetails.city,
          customerState: customerDetails.state,
          customerCity: customerDetails.city,
          customerPincode: customerDetails.pincode,
          customerLandmark: customerDetails.landmark || '',
          customerWhatsapp: customerDetails.whatsapp || '',
          items: items,
          paymentMethod: "cash"
        };

        // Add email only if provided
        if (customerDetails.email && customerDetails.email.trim() !== '') {
          orderData.customerEmail = customerDetails.email;
        }

        // Log the order data being sent
        console.log('📦 Creating order with data:', JSON.stringify(orderData, null, 2));
        console.log('🔍 Product IDs being sent:', items.map(item => ({ 
          productId: item.productId, 
          type: typeof item.productId,
          originalId: item.productId
        })));
        
        // Test payload structure
        console.log('🧪 Testing payload structure:', {
          customerName: typeof orderData.customerName,
          customerMobile: typeof orderData.customerMobile,
          items: orderData.items.map(item => ({
            productId: { value: item.productId, type: typeof item.productId },
            productName: { value: item.productName, type: typeof item.productName },
            quantity: { value: item.quantity, type: typeof item.quantity }
          }))
        });
        
        // Call create order API
        console.log('🌐 Making API call to:', 'http://localhost:3000/api/public/orders');
        const response = await axios.post('http://localhost:3000/api/public/orders', orderData, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000
        });
        
        if (response.data.success) {
          // Order created successfully
          console.log('✅ Order created successfully:', response.data);
          const orderData = response.data.data;
          onConfirmOrder(customerDetails, orderData.order_number);
        } else {
          // Handle API error
          console.error('❌ Failed to create order:', response.data.message);
          alert('Failed to create order. Please try again.');
        }
      } catch (error) {
        console.error('❌ Error creating order:', error);
        if (axios.isAxiosError(error)) {
          const errorData = error.response?.data;
          console.error('❌ API Error Details:', errorData);
          
          let message = 'Failed to create order';
          if (errorData?.error?.message) {
            message = errorData.error.message;
          } else if (errorData?.message) {
            message = errorData.message;
          } else if (error.message) {
            message = error.message;
          }
          
          alert(`Error: ${message}`);
        } else {
          alert('Failed to create order. Please try again.');
        }
      } finally {
        setSubmittingOrder(false);
      }
    }
  };

  // Load states when modal opens
  useEffect(() => {
    if (isOpen) {
      loadStates();
      // Reset form when modal opens
      setCustomerDetails({
        name: '',
        address1: '',
        address2: '',
        landmark: '',
        mobile: '',
        whatsapp: '',
        city: '',
        pincode: '',
        state: '',
        email: '',
      });
      setErrors({});
      setSelectedState('');
      setCities([]);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {/* Order Form Modal */}
      {isOpen && (
        <div className="modal-overlay">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="modal-content max-w-2xl"
          >
                         <div className="p-6">
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-2xl font-bold text-gray-900">Place Your Order</h2>
                 <button
                   onClick={onClose}
                   className="text-gray-400 hover:text-gray-600 transition-colors"
                 >
                   <X size={24} />
                 </button>
               </div>

               {/* Order Summary */}
                 <div className="bg-gray-50 rounded-lg p-4 mb-6">
                   <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                   <div className="space-y-2">
                     {cartItems.map((item, index) => (
                       <div key={index} className="flex justify-between text-sm">
                         <span className="text-gray-600">
                           {item.product.name} x {item.quantity}
                         </span>
                         <span className="font-medium">
                           ₹{(parseFloat(item.product.price) * item.quantity).toLocaleString()}
                         </span>
                       </div>
                     ))}
                     <div className="border-t pt-2 mt-2">
                       <div className="flex justify-between text-sm">
                         <span className="text-gray-600">Subtotal:</span>
                         <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
                       </div>
                       {totalDiscount > 0 && (
                         <div className="flex justify-between text-sm text-green-600">
                           <span>Discount:</span>
                           <span>-₹{totalDiscount.toFixed(2)}</span>
                         </div>
                       )}
                       <div className="flex justify-between font-semibold text-lg text-blue-600">
                         <span>Total:</span>
                         <span>₹{netAmount.toFixed(2)}</span>
                       </div>
                     </div>
                   </div>
                 </div>
               )}

                             {/* Customer Details Form */}
               <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        value={customerDetails.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`input-field pl-10 ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="tel"
                        value={customerDetails.mobile}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        className={`input-field pl-10 ${errors.mobile ? 'border-red-500' : ''}`}
                        placeholder="Enter mobile number"
                      />
                    </div>
                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="tel"
                        value={customerDetails.whatsapp}
                        onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                        className="input-field pl-10"
                        placeholder="Enter WhatsApp number (optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        value={customerDetails.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        className={`input-field pl-10 ${errors.pincode ? 'border-red-500' : ''}`}
                        placeholder="Enter pincode"
                      />
                    </div>
                    {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                  </div>
                </div>

                <div className="mb-4 relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={customerDetails.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="input-field pr-10"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={customerDetails.address1}
                      onChange={(e) => handleInputChange('address1', e.target.value)}
                      className={`input-field pl-10 ${errors.address1 ? 'border-red-500' : ''}`}
                      placeholder="Enter your address"
                    />
                  </div>
                  {errors.address1 && <p className="text-red-500 text-xs mt-1">{errors.address1}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={customerDetails.address2}
                    onChange={(e) => handleInputChange('address2', e.target.value)}
                    className="input-field"
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Landmark
                    </label>
                    <input
                      type="text"
                      value={customerDetails.landmark}
                      onChange={(e) => handleInputChange('landmark', e.target.value)}
                      className="input-field"
                      placeholder="Nearby landmark"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      {loadingStates ? (
                        <div className="input-field flex items-center justify-center">
                          <Loader2 className="animate-spin text-gray-400" size={16} />
                          <span className="ml-2 text-gray-500">Loading states...</span>
                        </div>
                      ) : (
                                                 <select
                           value={selectedState}
                           onChange={(e) => handleStateChange(e.target.value)}
                           className="input-field appearance-none"
                         >
                           <option value="">Select State</option>
                           {states.map((state) => (
                             <option key={state.id} value={state.state}>
                               {state.state}
                             </option>
                           ))}
                         </select>
                      )}
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      {loadingCities ? (
                        <div className="input-field flex items-center justify-center">
                          <Loader2 className="animate-spin text-gray-400" size={16} />
                          <span className="ml-2 text-gray-500">Loading cities...</span>
                        </div>
                      ) : (
                                                 <select
                           value={customerDetails.city}
                           onChange={(e) => handleCityChange(e.target.value)}
                           className="input-field appearance-none"
                           disabled={!selectedState}
                         >
                           <option value="">{selectedState ? 'Select City' : 'Select State First'}</option>
                           {cities.map((city) => (
                             <option key={city.id} value={city.city}>
                               {city.city}
                             </option>
                           ))}
                         </select>
                      )}
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                                     <button
                     type="submit"
                     disabled={submittingOrder}
                     className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {submittingOrder ? (
                       <>
                         <Loader2 className="animate-spin" size={18} />
                         <span>Creating Order...</span>
                       </>
                     ) : (
                       <>
                         <CreditCard size={18} />
                         <span>Confirm Order</span>
                       </>
                     )}
                   </button>
                                 </div>
               </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 