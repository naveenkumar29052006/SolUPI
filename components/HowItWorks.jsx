'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { Wallet, QrCode, CreditCard, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start center', 'end start'] });
  const progressRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progress = useSpring(progressRaw, { stiffness: 140, damping: 24, mass: 0.4 });
  const progressScale = useMotionTemplate`${progress}`;
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
  <section ref={sectionRef} id="how-it-works" className="py-32 md:py-40 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent relative overflow-hidden">
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
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-300 uppercase tracking-wide">
              <Rocket className="w-3.5 h-3.5" aria-hidden />
              How It Works
            </span>
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
              <InteractiveStepCard key={index} index={index} step={step} Icon={Icon} />
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

// Premium interactive step card: tilt, cursor glow, sheen, animated icon
function InteractiveStepCard({ step, Icon, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [coords, setCoords] = useState({ xPct: 50, yPct: 50 });

  const handleMove = (e) => {
    const el = cardRef.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    const xPct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPct = Math.max(0, Math.min(100, (y / rect.height) * 100));
    setCoords({ xPct, yPct });
    const nx = x / rect.width - 0.5; const ny = y / rect.height - 0.5;
    setTilt({ ry: nx * 10, rx: -ny * 10 });
  };
  const handleLeave = () => setTilt({ rx: 0, ry: 0 });

  const glowStyle = {
    background: `radial-gradient(500px circle at ${coords.xPct}% ${coords.yPct}%, rgba(255,255,255,0.10), transparent 40%)`
  };

  return (
    <motion.div
      className="relative group z-30"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -8 }}
    >
      {/* Ambient hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-green-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative z-10 p-6 md:p-7 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 hover:border-white/25 transition-all duration-500 h-full min-h-[276px] overflow-hidden flex flex-col items-center pt-10"
        style={{ transformStyle: 'preserve-3d', rotateX: tilt.rx, rotateY: tilt.ry }}
      >
        {/* Cursor-follow glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={glowStyle} />

        {/* Sheen */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute -inset-1 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)' }} />
        </div>

        {/* Number badge removed per request */}

        {/* Icon */}
        <motion.div className="mt-2 mb-4 z-10" whileHover={{ rotate: [0, -6, 6, 0] }} transition={{ duration: 0.9 }}>
          <div className={`mx-auto w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} p-3 flex items-center justify-center shadow-lg`}>
            <Icon className="w-full h-full text-white" strokeWidth={2.5} />
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center text-center w-full">
          <h3 className="text-lg font-black mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-green-300 transition-all duration-300">
            {step.title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300 min-h-[72px]">
            {step.description}
          </p>
        </div>
      </motion.div>

      {/* Connector for large screens */}
      {index < 3 && (
        <div className="hidden lg:flex absolute top-1/2 -right-5 translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none items-center">
          <motion.div className="flex items-center" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}>
            <div className="w-10 h-0.5 bg-gradient-to-r from-purple-500 to-green-500 drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]"></div>
            <svg className="w-6 h-6 text-green-400 drop-shadow-[0_0_6px_rgba(74,222,128,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}