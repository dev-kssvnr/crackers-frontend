import React from 'react';
import { Facebook, Youtube, Instagram, Award, Users, Truck, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gradient mb-4">
              SIVAKASI KARGIL CRACKERS
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner for premium fireworks and crackers. We bring joy and excitement 
              to every celebration with our wide range of high-quality products.
            </p>
            

            
            {/* Company Highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center text-gray-300">
                <Award className="w-5 h-5 mr-3 text-yellow-400" />
                <div>
                  <div className="font-semibold text-yellow-400">25+ Years</div>
                  <div className="text-xs">Experience</div>
                </div>
              </div>
              <div className="flex items-center text-gray-300">
                <Users className="w-5 h-5 mr-3 text-yellow-400" />
                <div>
                  <div className="font-semibold text-yellow-400">10,000+</div>
                  <div className="text-xs">Happy Customers</div>
                </div>
              </div>
              <div className="flex items-center text-gray-300">
                <Truck className="w-5 h-5 mr-3 text-yellow-400" />
                <div>
                  <div className="font-semibold text-yellow-400">Free Delivery</div>
                  <div className="text-xs">Above ₹5,000</div>
                </div>
              </div>
              <div className="flex items-center text-gray-300">
                <Shield className="w-5 h-5 mr-3 text-yellow-400" />
                <div>
                  <div className="font-semibold text-yellow-400">100% Safe</div>
                  <div className="text-xs">Certified Products</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#track-order" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Follow Us</h4>
            <p className="text-gray-300 mb-4">
              Stay connected with us on social media for the latest updates and offers!
            </p>
            
            <div className="flex space-x-4">
              {/* Facebook */}
              <a
                href="https://facebook.com/SIVAKASIKARGILCRACKERS"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@SIVAKASIKARGILCRACKERS"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="w-5 h-5" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/SIVAKASIKARGILCRACKERS"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* Business Hours */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-yellow-400 mb-2">Business Hours</h5>
              <div className="text-xs text-gray-300 space-y-1">
                <div>Monday - Saturday: 9:00 AM - 8:00 PM</div>
                <div>Sunday: 10:00 AM - 6:00 PM</div>
              </div>
            </div>
          </div>
        </div>



        {/* Terms and Conditions */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Terms and Conditions</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Terms List */}
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-yellow-400 font-semibold mr-3">1.</span>
                  <span className="text-gray-300 text-sm">
                    Goods could be booked to your nearest Transport Hub on "TO PAY" basis.
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 font-semibold mr-3">2.</span>
                  <span className="text-gray-300 text-sm">
                    Prices are subject to change depends on market condition without any intimation.
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 font-semibold mr-3">3.</span>
                  <span className="text-gray-300 text-sm">
                    GST additional
                  </span>
                </div>
              </div>

              {/* Legal Notice */}
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700">
                <h5 className="text-yellow-400 font-semibold mb-3 text-sm">Important Legal Notice</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  As per the 2018 Supreme Court order, online sales of firecrackers are not allowed. 
                  Please add your desired products to the cart and submit your enquiry. We will confirm 
                  your order via WhatsApp or phone within 24 hours. We follow all legal compliances, 
                  and deliveries are made through registered transport providers. Enjoy a safe and legal 
                  Diwali with us!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 SIVAKASI KARGIL CRACKERS. All rights reserved.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Safety Guidelines
              </a>
            </div>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="mt-6 p-4 bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded-lg">
          <div className="flex items-center">
            <div className="text-yellow-400 mr-3">⚠️</div>
            <div className="text-sm text-yellow-200">
              <strong>Safety First:</strong> Always follow safety guidelines when using fireworks. 
              Keep a safe distance and have water nearby. Use only in designated areas.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 