'use client';

import { useState, useMemo, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Banner from '@/components/Banner';
import AboutUs from '@/components/AboutUs';
import CartSummary from '@/components/CartSummary';
import ProductFilters from '@/components/ProductFilters';
import ProductCard from '@/components/ProductCard';
import OrderModal from '@/components/OrderModal';
import PaymentModal from '@/components/PaymentModal';
import Contact from '@/components/Contact';
import TrackOrder from '@/components/TrackOrder';
import Footer from '@/components/Footer';
import ProductsLoading from '@/components/ProductsLoading';
import ProductsError from '@/components/ProductsError';

import axios from 'axios';
import { CartItem, Product, CustomerDetails, Order, TimePeriod, ProductCategory } from '@/types';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);
  const [minOrderAmount, setMinOrderAmount] = useState<number>(2500); // Default fallback


  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [showPlaceOrderButton, setShowPlaceOrderButton] = useState(false);

  // Products are filtered server-side, so we return them as-is
  const filteredProducts = useMemo(() => {
    console.log('📋 Displaying products:', {
      totalProducts: products.length,
      selectedCategories,
      products: products.map(p => ({ id: p.id, name: p.name, category: p.category }))
    });
    
    return products;
  }, [products, selectedCategories]);

  // Add to cart
  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.product.id === item.product.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.product.id === item.product.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prev, item];
    });
  };

  // Update cart quantity
  const handleUpdateCartQuantity = (productId: number, quantity: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === productId);
      if (quantity === 0) {
        return prev.filter(item => item.product.id !== productId);
      }
      if (existingItem) {
        return prev.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        );
      } else {
        // Find the product details to add to cart
        const product = products.find(p => p.id === productId);
        if (product) {
          return [...prev, { product, quantity }];
        }
        return prev;
      }
    });
  };

  // Get cart quantity for a product
  const getCartQuantity = (productId: number) => {
    const cartItem = cartItems.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Handle category filter change
  const handleCategoryChange = (category: ProductCategory) => {
    setSelectedCategories(prev => {
      const newCategories = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category];
      
      // Reset for new filter - clear products
      setProducts([]);
      
      // Refetch products with new categories
      setTimeout(() => {
        fetchProducts(newCategories.length > 0 ? newCategories : undefined);
      }, 0);
      
      return newCategories;
    });
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategories([]);
    
    // Reset for no filter - clear products
    setProducts([]);
    
    // Refetch all products
    setTimeout(() => {
      fetchProducts();
    }, 0);
  };

  // Fetch products from API using axios
  const fetchProducts = async (categories?: ProductCategory[]) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Fetching all products from API...', { categories });
      
      // Build query parameters - load all products at once
      const params: any = {
        status: 'active',
        limit: 500000 // Load all products
      };
      
      // Add category filter if specified
      if (categories && categories.length > 0) {
        params.category = categories[0]; // Use first category for now
      }
      
      const response = await axios.get(`http://localhost:3000/api/public/products`, {
        params,
        timeout: 30000, // Increased timeout for large data
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const apiResponse = response.data;
      console.log('📦 API Response:', apiResponse);
      
      // Handle different response formats
      let products: Product[];
      if (apiResponse.success && apiResponse.data && apiResponse.data.items) {
        console.log('✅ Using wrapped response format');
        products = apiResponse.data.items;
      } else if (apiResponse.items) {
        console.log('✅ Using direct response format');
        products = apiResponse.items;
      } else {
        console.error('❌ Invalid API response structure:', apiResponse);
        throw new Error('Invalid API response structure');
      }

      console.log('📋 Processed data:', products);
      console.log('📋 Products count:', products.length);
      
      // Set all products at once
      setProducts(products);
    } catch (err) {
      console.error('❌ Error fetching products:', err);
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || err.message;
        setError(`Failed to fetch products: ${message}`);
      } else {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      }
    } finally {
      setLoading(false);
    }
  };

  // Refetch products
  const refetch = async () => {
    await fetchProducts(selectedCategories.length > 0 ? selectedCategories : undefined);
  };

  // Fetch minimum order value from API
  const fetchMinimumOrderValue = async () => {
    try {
      console.log('🔍 Fetching minimum order value from API...');
      
      const response = await axios.get(`http://localhost:3000/api/public/payment-details`, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const apiResponse = response.data;
      console.log('📦 Payment Details API Response:', apiResponse);
      
      if (apiResponse.success && apiResponse.data && apiResponse.data.minimumOrderValue) {
        const minValue = parseFloat(apiResponse.data.minimumOrderValue);
        if (!isNaN(minValue)) {
          setMinOrderAmount(minValue);
          console.log('✅ Minimum order value updated:', minValue);
        }
      }
    } catch (err) {
      console.error('❌ Error fetching minimum order value:', err);
      // Keep the default value of 2500 if API fails
    }
  };

  // Load products and minimum order value on component mount
  useEffect(() => {
    fetchProducts();
    fetchMinimumOrderValue();
  }, []);

  // Handle place order
  const handlePlaceOrder = () => {
    setIsOrderModalOpen(true);
  };

  // Handle order confirmation
  const handleConfirmOrder = (customerDetails: CustomerDetails, orderNumber?: string) => {
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

    const order: Order = {
      id: orderNumber || `ORD${Date.now()}`,
      items: cartItems,
      customer: customerDetails,
      total: subtotal,
      discount: discount,
      netAmount: total,
      orderDate: new Date(),
      status: 'pending',
    };
    setCurrentOrder(order);
    if (orderNumber) {
      setOrderNumber(orderNumber);
    }
    setIsOrderModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  // Close payment modal
  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setCurrentOrder(null);
    setOrderNumber('');
    setCartItems([]); // Clear cart after payment modal is closed
  };

  // Calculate cart totals consistently
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { subtotal: cartSubtotal, discount: cartDiscount, total: cartTotal } = cartItems.reduce((acc, item) => {
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
  
  const netAmount = cartTotal;
  const isBelowMinimum = netAmount > 0 && netAmount < minOrderAmount;

  // Scroll detection for showing place order button
  useEffect(() => {
    const handleScroll = () => {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        const rect = productsSection.getBoundingClientRect();
        const isInView = rect.top <= 100 && rect.bottom >= 100;
        setShowPlaceOrderButton(isInView && cartItems.length > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [cartItems.length]);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        <Banner />
        <AboutUs />
        
        {/* Products Section */}
        <section id="products" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="text-gradient">Products</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our wide range of premium fireworks and crackers for all your celebrations.
              </p>
            </div>

            {/* Cart Summary */}
            <CartSummary cartItems={cartItems} />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters */}
              <div className="lg:col-span-1">
                <ProductFilters
                  selectedCategories={selectedCategories}
                  onCategoryChange={handleCategoryChange}
                  onClearFilters={handleClearFilters}
                />
              </div>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                {loading ? (
                  <ProductsLoading />
                ) : error ? (
                  <ProductsError error={error} onRetry={refetch} />
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎆</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600">Try adjusting your filters to see more products.</p>
                  </div>
                ) : (
                  <>
                    {/* Products Count Info */}
                    {filteredProducts.length > 0 && (
                      <div className="text-sm text-gray-600 mb-4 text-center">
                        Showing {filteredProducts.length} products
                        {selectedCategories.length > 0 && (
                          <span className="ml-2 text-primary-600">
                            (filtered by: {selectedCategories.join(', ')})
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={handleAddToCart}
                          onUpdateCartQuantity={handleUpdateCartQuantity}
                          cartQuantity={getCartQuantity(product.id)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Track Order Section */}
        <TrackOrder />

        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Place Order Button */}
      {showPlaceOrderButton && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-gentle">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-sm">
            <div className="text-center">
              <button
                onClick={handlePlaceOrder}
                disabled={isBelowMinimum}
                className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  isBelowMinimum
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                🚀 Place Order
              </button>
              <div className="mt-2 text-xs text-gray-600">
                (Minimum Amount: ₹{minOrderAmount.toLocaleString()})
              </div>
              {isBelowMinimum && (
                <div className="mt-1 text-xs text-red-600 font-medium">
                  Add ₹{(minOrderAmount - netAmount).toLocaleString()} more
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cartItems={cartItems}
        onConfirmOrder={handleConfirmOrder}
      />

      {currentOrder && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={handleClosePaymentModal}
          order={currentOrder}
          orderNumber={orderNumber}
        />
      )}
    </div>
  );
} 