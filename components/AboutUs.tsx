'use client';

import { motion } from 'framer-motion';
import { Award, Users, Truck, Shield } from 'lucide-react';

export default function AboutUs() {
  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We source only the finest quality fireworks and crackers from trusted manufacturers.',
    },
    {
      icon: Users,
      title: 'Customer Satisfaction',
      description: 'Serving thousands of happy customers across South India since 1995.',
    },
    {
      icon: Truck,
      title: 'Safe Delivery',
      description: 'Secure and timely delivery to your doorstep with proper safety measures.',
    },
    {
      icon: Shield,
      title: 'Licensed & Safe',
      description: 'All products are licensed and meet safety standards for your peace of mind.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-gradient">SIVAKASI KARGIL CRACKERS</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a trusted name in the fireworks industry, providing premium quality crackers 
            and fireworks for all your celebrations since 1995.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Your Trusted Partner for Celebrations
            </h3>
            <div className="space-y-4 text-gray-600">
              <p>
                SIVAKASI KARGIL CRACKERS has been lighting up celebrations across South India for over 
                25 years. We understand that every celebration is special, and that's why we offer 
                the finest quality fireworks and crackers.
              </p>
              <p>
                Our commitment to quality, safety, and customer satisfaction has made us the 
                preferred choice for families, event organizers, and businesses looking for 
                premium fireworks.
              </p>
              <p>
                We maintain strict quality control standards and work only with licensed 
                manufacturers to ensure the safety and satisfaction of our customers.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">25+</div>
                  <div className="text-sm opacity-90">Years of Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">10K+</div>
                  <div className="text-sm opacity-90">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-sm opacity-90">Product Varieties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-sm opacity-90">Quality Assured</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 