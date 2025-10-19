'use client';

import { motion } from 'framer-motion';
import { Wallet, QrCode, CreditCard, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Enter Amount',
      description: 'Choose how much SOL you want to buy. Enter the INR amount you wish to spend.',
      icon: Wallet,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02',
      title: 'Get QR Code',
      description: 'Receive a unique UPI QR code instantly. Scan it with any UPI app on your phone.',
      icon: QrCode,
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '03',
      title: 'Pay via UPI',
      description: 'Complete the payment using your preferred UPI app. PhonePe, Google Pay, Paytm - any works!',
      icon: CreditCard,
      color: 'from-green-500 to-emerald-500'
    },
    {
      number: '04',
      title: 'Receive SOL',
      description: 'Get your Solana instantly in your wallet. Transaction completed in under 2 minutes!',
      icon: Rocket,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
  <section id="how-it-works" className="py-32 md:py-40 bg-gradient-to-b from-black via-purple-900/10 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold text-green-300 uppercase tracking-wide">🚀 How It Works</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
            <span className="gradient-text">4 Simple Steps</span><br />
            to Your Solana
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-light">
            From payment to SOL in your wallet — <span className="text-white font-semibold">under 2 minutes</span>
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-green-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 text-center p-5 md:p-6 rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border-2 border-white/20 group-hover:border-purple-500/50 transition-all duration-500 h-full">
                  {/* Big Number Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-green-500 flex items-center justify-center shadow-xl shadow-purple-500/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <span className="text-lg font-black text-white">{step.number}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mt-4 mb-4">
                    <div className={`mx-auto w-14 h-14 rounded-lg bg-gradient-to-br ${step.color} p-3 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                      <Icon className="w-full h-full text-white" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-black mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-green-300 transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Arrow (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-5 transform translate-x-1/2 -translate-y-1/2 z-20 items-center">
                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                    >
                      <div className="w-10 h-0.5 bg-gradient-to-r from-purple-500 to-green-500"></div>
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block relative group"
          >
            {/* Outer glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-purple-500 to-green-500 rounded-xl opacity-40 group-hover:opacity-70 blur-lg transition-all duration-500 animate-pulse"></div>
            
            <Link
              href="/app"
              className="relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#14F195] via-[#00D9A3] to-[#9945FF] text-black font-bold rounded-xl shadow-2xl shadow-green-500/50 group-hover:shadow-purple-500/60 transition-all duration-500 text-base md:text-lg overflow-hidden"
            >
              {/* Animated shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF] via-[#00D9A3] to-[#14F195] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <span className="relative z-10 flex items-center gap-3">
                {/* Rocket icon with animation */}
                <motion.svg 
                  className="w-6 h-6"
                  animate={{ 
                    y: [0, -4, 0],
                    rotate: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                </motion.svg>
                
                <span className="font-black tracking-wide">Start Your First Trade</span>
                
                {/* Animated arrow */}
                <motion.svg 
                  className="w-5 h-5"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth={3}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
              
              {/* Bottom shine effect */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <div className="h-32 md:h-48"></div>
    </section>
  );
}