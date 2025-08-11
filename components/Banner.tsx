'use client';

import { motion } from 'framer-motion';
import { Sparkles, Star, Zap } from 'lucide-react';
import SkyShotAnimation from './SkyShotAnimation';
import FloatingLanterns from './FloatingLanterns';

export default function Banner() {
  // Generate random horizontal positions for skyshots
  const skyshotConfigs = Array.from({ length: 7 }).map((_, i) => ({
    left: `${10 + Math.random() * 80}%`,
    delay: Math.random() * 2 + i * 0.7,
  }));

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Floating Lanterns */}
      <FloatingLanterns count={7} />

      {/* SkyShot Animation - Multiple, Randomized Skyshots */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {skyshotConfigs.map((cfg, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: cfg.left,
              width: '0',
              height: '100%',
              top: 0,
              zIndex: 1,
              opacity: 0.7,
              pointerEvents: 'none',
            }}
          >
            <SkyShotAnimation height="100vh" count={1} className="" />
          </div>
        ))}
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white opacity-20"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Sparkles size={20 + Math.random() * 10} />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2">
              <Star className="text-secondary-400" size={20} />
              <span className="text-sm font-medium">Premium Quality Since 1995</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Light Up Your</span>
            <span className="block text-secondary-400">Celebrations</span>
          </h1>

          <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
            Premium fireworks and crackers for all occasions. Best prices, wide selection, 
            and safe delivery across South India.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const productsSection = document.getElementById('products');
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2 shadow-glow"
            >
              <Zap size={24} />
              <span>View Products</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white bg-opacity-20 backdrop-blur-sm text-white text-lg px-8 py-4 rounded-lg border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-200"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="text-secondary-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-200">Best quality fireworks and crackers</p>
          </div>

          <div className="text-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Star className="text-secondary-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
            <p className="text-gray-200">Hundreds of products to choose from</p>
          </div>

          <div className="text-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Zap className="text-secondary-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Safe Delivery</h3>
            <p className="text-gray-200">Secure and timely delivery</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white border-opacity-30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white bg-opacity-50 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
} 