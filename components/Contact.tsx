'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, CreditCard, QrCode } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Contact() {
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [paymentLoading, setPaymentLoading] = useState(true);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  // Contact form states
  const [contactForm, setContactForm] = useState({
    name: '',
    mobile: '',
    message: '',
    email: '',
    subject: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchPaymentDetails();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const payload = {
        name: contactForm.name,
        mobile: contactForm.mobile,
        message: contactForm.message,
        preferredContact: 'email',
        ...(contactForm.email && { email: contactForm.email }),
        ...(contactForm.subject && { subject: contactForm.subject })
      };

      const response = await axios.post('http://localhost:3000/api/public/contact', payload);
      
      if (response.data.success) {
        setSubmitSuccess(true);
        setContactForm({
          name: '',
          mobile: '',
          message: '',
          email: '',
          subject: ''
        });
      } else {
        setSubmitError('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      if (axios.isAxiosError(error)) {
        setSubmitError(`Failed to send message: ${error.response?.data?.message || error.message}`);
      } else {
        setSubmitError('Failed to send message. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };
  const contactInfo = [
    {
      icon: Phone,
      title: 'WhatsApp',
      value: '7395899600',
      link: 'https://wa.me/917395899600',
    },
    {
      icon: Phone,
      title: 'Phone 1',
      value: '9952240135',
      link: 'tel:+919952240135',
    },
    {
      icon: Phone,
      title: 'Phone 2',
      value: '9943861641',
      link: 'tel:+919943861641',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'sivakasikargilcrackers@gmail.com',
      link: 'mailto:sivakasikargilcrackers@gmail.com',
    },
  ];

  const bankDetails = {
    accountName: 'S.Dhamodhara kannan',
    accountNumber: '5685101002509',
    ifscCode: 'CNRB0005685',
    bankName: 'CNRB0005685',
    upiId: '', // No UPI provided
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Contact <span className="text-gradient">Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us for any queries, orders, or support. We're here to help you 
            make your celebrations special with our premium fireworks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col h-full"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <info.icon className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{info.title}</h4>
                    <p className="text-gray-600">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Clock className="text-primary-600 mr-3" size={24} />
                <h4 className="font-semibold text-gray-900">Business Hours</h4>
              </div>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                <p>Sunday: 10:00 AM - 6:00 PM</p>
                <p className="text-sm text-gray-500 mt-2">
                  *Extended hours during festival seasons
                </p>
              </div>
            </div>

            {/* Visit Our Store Map Section - moved here for balance */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-8 flex-1 flex flex-col justify-between">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visit Our Store</h3>
              <p className="text-gray-600 mb-6">
                Experience our wide range of fireworks and crackers in person at our store.
              </p>
              
              {/* Company Address */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <MapPin className="mr-2 text-primary-600" size={20} />
                  Store Address
                </h4>
                <div className="text-gray-700 text-sm leading-relaxed">
                  <div className="font-medium text-gray-900">SIVAKASI KARGIL CRACKERS</div>
                  <div>S.NO.236/5, D.NO.3/266-3H</div>
                  <div>SIVAKASI TO SATTUR MAIN ROAD</div>
                  <div>CHINNAKAMANPATTI</div>
                </div>
              </div>
              
              <ul className="text-left text-gray-700 mb-6 list-disc list-inside space-y-1">
                <li>Wide variety of fireworks for all occasions</li>
                <li>Friendly and knowledgeable staff</li>
                <li>Safe and certified products</li>
                <li>Special festival offers and discounts</li>
              </ul>
              <div className="flex items-center justify-center mb-6">
                <iframe
                  src="https://www.google.com/maps?q=Sivakasi,+Tamil+Nadu,+India&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '12px', minWidth: '250px' }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sivakasi Location Map"
                ></iframe>
              </div>
              <div className="flex items-center justify-center text-gray-600">
                <MapPin className="mr-2" size={20} />
                <span>Sivakasi, Tamil Nadu, India</span>
              </div>
            </div>
          </motion.div>

          {/* Payment Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col h-full"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h3>
            
            {/* Bank Transfer Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <CreditCard className="text-primary-600 mr-3" size={24} />
                <h4 className="font-semibold text-gray-900">Bank Transfer</h4>
              </div>
              {paymentLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ) : paymentError ? (
                <div className="text-red-600 text-sm">{paymentError}</div>
              ) : paymentDetails ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Name:</span>
                    <span className="font-medium">{paymentDetails.accountHolderName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-medium">{paymentDetails.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IFSC Code:</span>
                    <span className="font-medium">{paymentDetails.ifscCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank Name:</span>
                    <span className="font-medium">{paymentDetails.bankName}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Name:</span>
                    <span className="font-medium">{bankDetails.accountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-medium">{bankDetails.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IFSC Code:</span>
                    <span className="font-medium">{bankDetails.ifscCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank Name:</span>
                    <span className="font-medium">{bankDetails.bankName}</span>
                  </div>
                </div>
              )}
            </div>

            {/* UPI Payment */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <QrCode className="text-primary-600 mr-3" size={24} />
                <h4 className="font-semibold text-gray-900">UPI Payment</h4>
              </div>
              {paymentLoading ? (
                <div className="text-center animate-pulse">
                  <div className="bg-gray-100 rounded-lg p-6 mb-4 flex flex-col items-center">
                    <div className="h-32 w-32 bg-gray-200 rounded"></div>
                    <div className="text-sm text-gray-600 mt-2">Loading QR Code...</div>
                  </div>
                </div>
              ) : paymentError ? (
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-6 mb-4 flex flex-col items-center">
                    <img src="/qr/qr.png" alt="UPI QR Code" className="h-32 w-32 object-contain mb-2" />
                    <div className="text-sm text-gray-600">Scan QR Code</div>
                  </div>
                  <p className="text-sm text-gray-600">UPI ID: {bankDetails.upiId}</p>
                </div>
              ) : paymentDetails ? (
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-6 mb-4 flex flex-col items-center">
                    {paymentDetails.upiQrCode ? (
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
                  <p className="text-sm text-gray-600">UPI ID: {paymentDetails.upiId || bankDetails.upiId}</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-6 mb-4 flex flex-col items-center">
                    <img src="/qr/qr.png" alt="UPI QR Code" className="h-32 w-32 object-contain mb-2" />
                    <div className="text-sm text-gray-600">Scan QR Code</div>
                  </div>
                  <p className="text-sm text-gray-600">UPI ID: {bankDetails.upiId}</p>
                </div>
              )}
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Important Notes</h4>
              <div className="text-yellow-700 text-sm space-y-2">
                <p>• Minimum order amount: ₹2,500 (Tamil Nadu) / ₹5,000 (Other states)</p>
                <p>• Free delivery on orders above ₹5,000</p>
                <p>• Payment confirmation required before delivery</p>
                <p>• All products are licensed and safe</p>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-8 flex-1 flex flex-col justify-between">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Send Us a Message</h3>
              
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-green-800 mb-2">Message Sent Successfully!</h4>
                  <p className="text-green-700 mb-4">Thank you for contacting us. We'll get back to you soon.</p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={contactForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200" 
                      placeholder="Your Name" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="tel" 
                      id="mobile" 
                      name="mobile" 
                      value={contactForm.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200" 
                      placeholder="Your Mobile Number" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={contactForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200" 
                      placeholder="you@example.com" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject (Optional)</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={contactForm.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200" 
                      placeholder="Subject of your message" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={4} 
                      value={contactForm.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200" 
                      placeholder="Type your message here..." 
                    />
                  </div>
                  
                  {submitError && (
                    <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">
                      {submitError}
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Map or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          {/* Map section moved to left column for better balance */}
        </motion.div>
      </div>
    </section>
  );
} 