'use client';

import { motion } from 'framer-motion';
import { Zap, Lock, Globe, DollarSign, Smartphone, Shield } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Blazing Fast',
      description: 'Complete your SOL purchase in under 2 minutes. Our optimized UPI integration ensures instant confirmations.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Your transactions are protected with bank-grade security. No unnecessary data collection or sharing.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Decentralized',
      description: 'Built on Solana blockchain. Your crypto, your keys, your control. No intermediaries.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: DollarSign,
      title: 'Best Rates',
      description: 'Competitive exchange rates with transparent pricing. No hidden fees, just fair trading.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Smartphone,
      title: 'UPI Native',
      description: 'Pay with any UPI app - PhonePe, Google Pay, Paytm, or directly from your bank app.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Fraud Protection',
      description: 'Advanced fraud detection system keeps your funds safe. Multiple layers of security verification.',
      color: 'from-red-500 to-pink-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
  <section id="features" className="py-32 md:py-40 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container relative">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20 md:mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Why Choose <span className="gradient-text">SolUPI</span>?
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Experience the most seamless way to buy Solana in India
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 xl:gap-20 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="group relative"
              >
                <div className="p-10 rounded-3xl bg-gradient-to-br from-purple-900/10 to-transparent border border-purple-500/20 hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 h-full relative overflow-hidden flex flex-col">
                  {/* Hover gradient overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-900/0 to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                  />
                  
                  <div className="relative z-10">
                    {/* Icon with gradient background */}
                    <motion.div 
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-8 group-hover:scale-105 transition-transform duration-500`}
                      whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      <Icon className="w-full h-full text-white" strokeWidth={2} />
                    </motion.div>

                    <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white group-hover:text-purple-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Indicators */}
        {/* No CTA button in Features section, skipping. */}
      </div>
      <div className="h-32 md:h-48"></div>
    </section>
  );
}