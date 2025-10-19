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
  <section id="features" className="py-20 md:py-28 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container relative">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wide">✨ Features</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
            Why Choose <span className="gradient-text">SolUPI</span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-light">
            Experience the most seamless way to buy Solana with <span className="text-white font-semibold">unmatched speed</span> and <span className="text-white font-semibold">security</span>
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
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
                className="group relative"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-green-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-5 md:p-6 rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 group-hover:border-purple-500/50 transition-all duration-500 h-full flex flex-col overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-lg"></div>
                  <div className="relative z-10">
                    {/* Icon */}
                    <div 
                      className={`w-11 h-11 rounded-lg bg-gradient-to-br ${feature.color} p-2.5 mb-4 flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    >
                      <Icon className="w-full h-full text-white" strokeWidth={2.5} />
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-green-300 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm group-hover:text-gray-200 transition-colors duration-300">
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