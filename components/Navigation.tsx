'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import Logo from './Logo';

interface NavigationProps {
  onWishlistClick?: () => void;
}

export default function Navigation({ onWishlistClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [priceListUrl, setPriceListUrl] = useState<string>('/price-list.pdf');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch payment details to get price list URL
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/public/payment-details');
        if (response.data.success && response.data.data?.priceListPdf) {
          setPriceListUrl(`http://localhost:3000${response.data.data.priceListPdf}`);
        }
      } catch (error) {
        console.error('Error fetching payment details:', error);
        // Keep the default URL if API fails
      }
    };

    fetchPaymentDetails();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'track-order', label: 'Track Order' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Notification Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-r from-yellow-400 to-red-400 text-white py-2 px-4 text-sm font-semibold flex items-center justify-center overflow-hidden">
        <div className="whitespace-nowrap animate-marquee-inner animate-marquee">
          🎉 Special Discount: Get up to 25% OFF on all products! | Free delivery above ₹5,000 | Order early for Diwali! 🎆
        </div>
      </div>
      
      <nav
        className={`fixed left-0 right-0 z-40 transition-all duration-300 top-8 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo 
                size="md" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-gray-900 hover:text-primary-600`}
                  >
                    {item.label}
                  </button>
                ))}
                <a
                  href={priceListUrl}
                  download
                  className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 text-white font-bold shadow-lg hover:scale-105 hover:from-yellow-500 hover:to-red-600 transition-all duration-200 border-2 border-yellow-300"
                  style={{ letterSpacing: '1px' }}
                >
                  Download Price List
                </a>
              </div>
            </div>

            {/* Right side - Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    isScrolled
                      ? 'text-gray-700 hover:text-primary-600'
                      : 'text-white hover:text-secondary-300'
                  }`}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={priceListUrl}
                download
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-yellow-400 to-red-500 text-white hover:from-yellow-500 hover:to-red-600 transition-all duration-200"
                style={{ letterSpacing: '1px' }}
              >
                Download Price List
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
} 