'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, CreditCard, QrCode, Phone, Copy, Printer } from 'lucide-react';
import { Order } from '@/types';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  orderNumber?: string;
}

export default function PaymentModal({ isOpen, onClose, order, orderNumber }: PaymentModalProps) {
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [paymentLoading, setPaymentLoading] = useState(true);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const bankDetails = {
    accountName: 'S.Dhamodhara kannan',
    accountNumber: '5685101002509',
    ifscCode: 'CNRB0005685',
    bankName: 'CNRB0005685',
    upiId: '', // No UPI provided
  };

  useEffect(() => {
    if (isOpen) {
      fetchPaymentDetails();
    }
  }, [isOpen]);

  const fetchPaymentDetails = async () => {
    try {
      setPaymentLoading(true);
      setPaymentError(null);
      const response = await axios.get('http://localhost:3000/api/public/payment-details');
      
      if (response.data.success) {
        setPaymentDetails(response.data.data);
      } else {
        setPaymentError('Failed to fetch payment details');
      }
    } catch (err) {
      console.error('Error fetching payment details:', err);
      if (axios.isAxiosError(err)) {
        setPaymentError(`Failed to fetch payment details: ${err.response?.data?.message || err.message}`);
      } else {
        setPaymentError('Failed to fetch payment details');
      }
    } finally {
      setPaymentLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  // Calculate order totals for print
  const calculateOrderTotals = () => {
    const totals = order.items.reduce((acc, item) => {
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
    }, {
      subtotal: 0,
      discount: 0,
      total: 0
    });
    
    return totals;
  };

  const handlePrintOrder = () => {
    const orderTotals = calculateOrderTotals();
    const printContent = `
      <html>
        <head>
          <title>Order Details - ${orderNumber || order.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 20px; }
            .section h3 { color: #333; border-bottom: 2px solid #333; padding-bottom: 5px; }
            .row { display: flex; justify-content: space-between; margin: 5px 0; }
            .label { font-weight: bold; }
            .value { }
            .total { font-size: 18px; font-weight: bold; color: #2563eb; }
            .instructions { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .contact { background: #dbeafe; padding: 15px; border-radius: 8px; }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>SIVAKASI KARGIL CRACKERS</h1>
            <h2>Order Details</h2>
          </div>
          
          <div class="section">
            <h3>Order Information</h3>
            <div class="row">
              <span class="label">Order Number:</span>
              <span class="value">${orderNumber || order.id}</span>
            </div>
            <div class="row">
              <span class="label">Order Date:</span>
              <span class="value">${new Date().toLocaleDateString()}</span>
            </div>
            <div class="row">
              <span class="label">Subtotal:</span>
              <span class="value">₹${orderTotals.subtotal.toFixed(2)}</span>
            </div>
            ${orderTotals.discount > 0 ? `
            <div class="row">
              <span class="label">Discount:</span>
              <span class="value">-₹${orderTotals.discount.toFixed(2)}</span>
            </div>
            ` : ''}
            <div class="row">
              <span class="label">Total:</span>
              <span class="value total">₹${orderTotals.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div class="section">
            <h3>Customer Details</h3>
            <div class="row">
              <span class="label">Name:</span>
              <span class="value">${order.customer.name}</span>
            </div>
            <div class="row">
              <span class="label">Mobile:</span>
              <span class="value">${order.customer.mobile}</span>
            </div>
            <div class="row">
              <span class="label">Address:</span>
              <span class="value">${order.customer.address1}${order.customer.address2 ? ', ' + order.customer.address2 : ''}</span>
            </div>
            <div class="row">
              <span class="label">City:</span>
              <span class="value">${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}</span>
            </div>
          </div>
          
          <div class="section">
            <h3>Order Items</h3>
            ${order.items.map(item => {
              const originalPrice = parseFloat(item.product.original_price);
              const finalPrice = parseFloat(item.product.price);
              const quantity = item.quantity;
              
              const itemSubtotal = originalPrice * quantity;
              const itemTotal = finalPrice * quantity;
              const itemDiscount = itemSubtotal - itemTotal;
              
              return `
                <div class="row">
                  <span class="label">${item.product.name}</span>
                  <span class="value">Qty: ${quantity} × ₹${finalPrice.toFixed(2)} = ₹${itemTotal.toFixed(2)}${itemDiscount > 0 ? ` (Saved: ₹${itemDiscount.toFixed(2)})` : ''}</span>
                </div>
              `;
            }).join('')}
          </div>
          
          <div class="section">
            <h3>Payment Details</h3>
            <div class="row">
              <span class="label">Account Name:</span>
              <span class="value">${paymentDetails?.accountHolderName || bankDetails.accountName}</span>
            </div>
            <div class="row">
              <span class="label">Account Number:</span>
              <span class="value">${paymentDetails?.accountNumber || bankDetails.accountNumber}</span>
            </div>
            <div class="row">
              <span class="label">IFSC Code:</span>
              <span class="value">${paymentDetails?.ifscCode || bankDetails.ifscCode}</span>
            </div>
            <div class="row">
              <span class="label">Bank Name:</span>
              <span class="value">${paymentDetails?.bankName || bankDetails.bankName}</span>
            </div>
            <div class="row">
              <span class="label">UPI ID:</span>
              <span class="value">${paymentDetails?.upiId || bankDetails.upiId}</span>
            </div>
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <AnimatePresence>
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
                <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Order Confirmation */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3" size={24} />
                  <div>
                    <h3 className="font-semibold text-green-800">Order Placed Successfully!</h3>
                    <p className="text-green-700 text-sm">Order Number: {orderNumber || order.id}</p>
                  </div>
                </div>
              </div>

              {/* Payment Amount */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Amount to Pay</h3>
                <div className="text-3xl font-bold text-primary-600">
                  ₹{calculateOrderTotals().total.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  (Total Amount)
                </div>
              </div>

              {/* Bank Transfer Details */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="mr-2" size={20} />
                  Bank Transfer Details
                </h3>
                {paymentLoading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                ) : paymentError ? (
                  <div className="text-red-600 text-sm mb-3">{paymentError}</div>
                ) : null}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Account Name:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">
                        {paymentDetails?.accountHolderName || bankDetails.accountName}
                      </span>
                      <button
                        onClick={() => copyToClipboard(paymentDetails?.accountHolderName || bankDetails.accountName)}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Account Number:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">
                        {paymentDetails?.accountNumber || bankDetails.accountNumber}
                      </span>
                      <button
                        onClick={() => copyToClipboard(paymentDetails?.accountNumber || bankDetails.accountNumber)}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">IFSC Code:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">
                        {paymentDetails?.ifscCode || bankDetails.ifscCode}
                      </span>
                      <button
                        onClick={() => copyToClipboard(paymentDetails?.ifscCode || bankDetails.ifscCode)}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Bank Name:</span>
                    <span className="font-medium">
                      {paymentDetails?.bankName || bankDetails.bankName}
                    </span>
                  </div>
                </div>
              </div>

              {/* UPI Payment */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <QrCode className="mr-2" size={20} />
                  UPI Payment
                </h3>
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-4 mb-4 inline-block flex flex-col items-center">
                    {paymentLoading ? (
                      <div className="h-32 w-32 bg-gray-200 rounded mb-2"></div>
                    ) : paymentDetails?.upiQrCode ? (
                      <img 
                        src={`http://localhost:3000${paymentDetails.upiQrCode}`}
                        alt="UPI QR Code" 
                        className="h-32 w-32 object-contain mb-2"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/qr/qr.png";
                        }}
                      />
                    ) : (
                      <img src="/qr/qr.png" alt="UPI QR Code" className="h-32 w-32 object-contain mb-2" />
                    )}
                    <div className="text-sm text-gray-600">Scan QR Code</div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      UPI ID: {paymentDetails?.upiId || bankDetails.upiId}
                    </p>
                    <button
                      onClick={() => copyToClipboard(paymentDetails?.upiId || bankDetails.upiId)}
                      className="text-primary-600 hover:text-primary-700 text-sm flex items-center justify-center mx-auto"
                    >
                      <Copy size={14} className="mr-1" />
                      Copy UPI ID
                    </button>
                  </div>
                </div>
              </div>

              {/* Important Instructions */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-yellow-800 mb-2">Important Instructions</h3>
                <div className="text-yellow-700 text-sm space-y-2">
                  <p>• After making the payment, take a screenshot of the payment confirmation</p>
                  <p>• Send the screenshot to our WhatsApp number: <strong>7395899600</strong></p>
                  <p>• Include your Order ID: <strong>{order.id}</strong> in the message</p>
                  <p>• We will confirm your order within 24 hours</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Need Help?</h3>
                <div className="text-blue-700 text-sm space-y-1">
                  <p className="flex items-center">
                    <Phone className="mr-2" size={16} />
                    WhatsApp: 7395899600
                  </p>
                  <p className="flex items-center">
                    <Phone className="mr-2" size={16} />
                    Phone: 9952240135
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <button
                  onClick={handlePrintOrder}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <Printer size={18} className="mr-2" />
                  Print Order
                </button>
                <button
                  onClick={onClose}
                  className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => { onClose(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
                >
                  Order More
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 