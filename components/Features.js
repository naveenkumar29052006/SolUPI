'use client';

import { motion } from 'framer-motion';

import { Zap, Lock, Globe, DollarSign, Smartphone, Shield, Sparkles } from 'lucide-react';
import React from 'react';


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
  <section id="features" className="py-20 md:py-28 relative overflow-hidden">
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
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" aria-hidden />
              Features
            </span>
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
              <InteractiveFeatureCard
                key={index}
                Icon={Icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
                variants={itemVariants}
              />
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

// Futuristic premium card with 3D tilt, cursor glow, animated ring, and sheen
function InteractiveFeatureCard({ Icon, title, description, color, variants }) {
  const cardRef = React.useRef(null);
  const [coords, setCoords] = React.useState({ xPct: 50, yPct: 50 });
  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 });

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPct = Math.max(0, Math.min(100, (y / rect.height) * 100));
    setCoords({ xPct, yPct });
    // map to -1..1
    const nx = x / rect.width - 0.5;
    const ny = y / rect.height - 0.5;
    // subtle tilt
    setTilt({ ry: nx * 10, rx: -ny * 10 });
  };
  const handleLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const spotlightStyle = {
    background: `radial-gradient(600px circle at ${coords.xPct}% ${coords.yPct}%, rgba(153, 69, 255, 0.15), rgba(20, 241, 149, 0.08) 40%, transparent 60%)`
  };

  return (
    <motion.div
      variants={variants}
      className="group relative will-change-transform"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: 1000 }}
    >
      {/* Outer ambient glow (very subtle, premium) */}
      <div className="absolute inset-0 rounded-3xl bg-white/[0.02] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Cursor-tracking gradient spotlight - absolute background layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={spotlightStyle}
      />

      {/* Card */}
      <motion.div
        ref={cardRef}
        className="relative p-5 md:p-6 rounded-3xl bg-white/[0.06] backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 h-full flex flex-col overflow-hidden"
        style={{ transformStyle: 'preserve-3d', rotateX: tilt.rx, rotateY: tilt.ry }}
      >

        {/* Subtle scanlines for texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700"
        >
          <div
            className="absolute -inset-1 feature-scan"
            style={{
              background: 'repeating-linear-gradient( -45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 7px)'
            }}
          />
        </div>

        {/* Sheen sweep */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
          <div className="absolute -inset-1 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000" style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)'
          }} />
        </div>

        <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
          {/* Icon with soft halo */}
          <div className="relative mb-4">
            <div className="absolute inset-0 blur-xl rounded-xl bg-white/5" />
            <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${color} p-2.5 flex items-center justify-center shadow-lg`}>
              <Icon className="w-full h-full text-white" strokeWidth={2.5} />
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2 text-white tracking-tight">
            {title}
          </h3>
          <p className="text-gray-300/90 leading-relaxed text-sm">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}