'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-32 md:py-40">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      </div>

      {/* Glowing Orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 text-center py-32 md:py-40">
        <motion.div 
          className="space-y-20 md:space-y-32 lg:space-y-36"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-gradient-to-r from-purple-900/30 to-green-900/30 border border-purple-500/50 backdrop-blur-sm hover:border-purple-500/80 transition-all cursor-pointer relative z-10 mb-12 md:mb-16"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
           
            <span className="text-base font-medium text-purple-300">🚀 Powered by Solana & UPI</span>
      
          </motion.div>
    

          {/* Main Heading */}
          <motion.h1 
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-10 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Buy <span className="gradient-text">Solana</span> with <span className="gradient-text">UPI</span>
            <br className="hidden sm:block" />
            Instantly, Securely, Reliably
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <br />
            Convert INR to SOL in minutes using any UPI app. Bank-grade security, transparent pricing, and privacy by default.
            
            
            <span className="text-purple-300 text-base sm:text-lg md:text-xl mt-2 inline-block">No KYC required for small amounts.</span>
            <br />
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 pt-8 mt-2 md:mt-4 mb-16 md:mb-24 w-full relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }} className="relative overflow-hidden group rounded-3xl">
              <Link 
                href="/app"
                className="block w-full sm:w-auto px-12 py-5 md:px-16 md:py-7 bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black font-bold rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 text-xl sm:text-2xl border-2 border-[#14F195]/40"
              >
                <span className="relative z-10">Open App →</span>
              </Link>
              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#14F195]/20 to-[#9945FF]/20 rounded-3xl"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }} className="rounded-3xl">
              <Link 
                href="#features"
                className="block w-full sm:w-auto px-12 py-5 md:px-16 md:py-7 bg-white/10 backdrop-blur-sm border-2 border-gray-700 text-white font-semibold rounded-3xl shadow-lg hover:bg-white/20 hover:border-purple-500 transition-all duration-300 text-xl sm:text-2xl"
              >
                Learn More
              </Link>
            </motion.div>
            
            
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 pt-24 md:pt-36 max-w-6xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { value: '₹10L+', label: 'Daily Volume' },
              { value: '5000+', label: 'Happy Users' },
              { value: '<2min', label: 'Avg Transaction' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-10 md:p-14 rounded-3xl bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 group cursor-pointer"
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="text-5xl md:text-6xl font-bold gradient-text mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-400 text-xl md:text-2xl group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-3 bg-purple-500 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
      <div className="h-32 md:h-48"></div>
    </section>
  );
}