'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IndianRupee, Users, Zap } from 'lucide-react';
import { useRef, useState } from 'react';

// Premium stat card component with advanced animations
function PremiumStatCard({ stat, index }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ xPct: 50, yPct: 50 });

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPct = Math.max(0, Math.min(100, (y / rect.height) * 100));
    setCoords({ xPct, yPct });
  };

  const glowStyle = {
    background: `radial-gradient(400px circle at ${coords.xPct}% ${coords.yPct}%, rgba(255,255,255,0.1), transparent 50%)`
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseMove={handleMove}
      className="group relative text-center p-6 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl overflow-hidden cursor-pointer will-change-transform"
      style={{ perspective: 1000 }}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-white/20 via-purple-500/30 to-green-500/20 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[2px] rounded-2xl bg-black/80 backdrop-blur-xl"></div>
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-green-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Cursor-follow spotlight */}
      <div 
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={glowStyle}
      />

      {/* Sheen effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute -inset-1 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-out" style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)'
        }} />
      </div>

      {/* Floating animation */}
      <motion.div
        className="relative z-10"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 5 + index * 0.3,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: [0.4, 0.0, 0.6, 1]
        }}
      >
        {/* Icon */}
        <div className="flex items-center justify-center mb-3">
          <stat.Icon className="w-6 h-6 text-white/90" strokeWidth={2} />
        </div>

        {/* Value with gradient */}
        <motion.div 
          className="text-3xl md:text-4xl font-black mb-1 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          {stat.value}
        </motion.div>

        {/* Label */}
        <div className="text-xs md:text-sm text-gray-300 font-medium group-hover:text-white transition-colors duration-300">
          {stat.label}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
  <section id="home" className=" flex items-center justify-center overflow-hidden ">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent pointer-events-none">
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
      <div className="container relative z-10 px-4 mx-auto">
        <motion.div 
          className="flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div 
            className="group inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-green-500/10 border border-purple-500/30 backdrop-blur-md relative z-10 hover:border-purple-400/50 transition-all duration-300 shadow-lg shadow-purple-500/5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-purple-300 via-purple-200 to-green-300 bg-clip-text text-transparent">
              Powered by Solana & UPI
            </span>
          </motion.div>
    

          {/* Main Heading */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block mb-1">Buy</span>
            <span className="gradient-text block mb-1">Solana</span>
            <span className="block">with <span className="gradient-text">UPI</span></span>
          </motion.h1>

          {/* Subheading */}
          <motion.div 
            className="space-y-3 w-full max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
              Convert <span className="text-white font-semibold">INR to SOL</span> in minutes.<br />
              Bank-grade security. Transparent pricing.
            </p>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs md:text-sm text-green-300 font-medium">
                No KYC required for small amounts
              </span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Link 
                href="/demo/3d-button" 
                className="relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-green-500 text-white font-bold text-base rounded-xl overflow-hidden shadow-2xl shadow-purple-500/50 group-hover:shadow-purple-500/80 transition-all duration-500"
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-green-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                
                {/* Glow pulse effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-green-500 rounded-xl opacity-30 group-hover:opacity-60 blur-lg transition-opacity duration-500 animate-pulse"></div>
                
                <span className="relative flex items-center gap-2 z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Start Your First Trade
                  <motion.svg 
                    className="w-5 h-5"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a 
                href="#how-it-works" 
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-bold text-base rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <span>Learn More</span>
                <motion.span
                  className="text-sm"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ↓
                </motion.span>
              </a>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 md:pt-16 w-full max-w-4xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { value: '₹10L+', label: 'Daily Volume', Icon: IndianRupee, gradient: 'from-purple-500 to-pink-500' },
              { value: '5000+', label: 'Happy Users', Icon: Users, gradient: 'from-blue-500 to-cyan-500' },
              { value: '<2min', label: 'Avg Transaction', Icon: Zap, gradient: 'from-green-500 to-emerald-500' }
            ].map((stat, index) => (
              <PremiumStatCard key={index} stat={stat} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="h-32 md:h-48"></div>
    </section>
  );
}