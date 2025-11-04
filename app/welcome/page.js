'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CheckCircle, Sparkles, ArrowRight, Home } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function WelcomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // Redirect to home if not authenticated
          router.push('/');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/');
      }
    };

    checkAuth();
  }, [router]);

  const goHome = () => {
    router.push('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(20, 241, 149, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeOut',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Success icon */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <div className="relative">
              <CheckCircle className="w-24 h-24 text-green-400" />
              <motion.div
                className="absolute inset-0 w-24 h-24 border-4 border-green-400/30 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Welcome message */}
          <motion.h1
            className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-green-400 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Welcome to SolUPI!
          </motion.h1>

          {/* Personal greeting */}
          <motion.p
            className="text-xl md:text-2xl text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Hey <span className="text-green-400 font-semibold">{user.name}</span>! 👋
          </motion.p>

          <motion.p
            className="text-lg text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            Your account has been successfully verified and you're now part of the SolUPI community.
          </motion.p>

          {/* Under construction section */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-yellow-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Work in Progress</h2>
              <Sparkles className="w-8 h-8 text-yellow-400 ml-3" />
            </div>
            
            <p className="text-gray-300 text-lg mb-6">
              We're building something amazing for you! Our trading platform is under active development.
            </p>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <div className="text-purple-400 font-semibold mb-2"> Fast Trading</div>
                <div className="text-gray-400">Instant Solana purchases with UPI</div>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="text-green-400 font-semibold mb-2"> Secure Wallet</div>
                <div className="text-gray-400">Your crypto, your keys</div>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="text-blue-400 font-semibold mb-2">Live Rates</div>
                <div className="text-gray-400">Real-time market data</div>
              </div>
            </div>
          </motion.div>

          {/* Progress indicator */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <div className="text-sm text-gray-400 mb-2">Development Progress</div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-purple-600 to-green-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ delay: 1.5, duration: 2, ease: 'easeOut' }}
              />
            </div>
            <div className="text-sm text-gray-400 mt-2">75% Complete</div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            onClick={goHome}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-green-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:from-purple-700 hover:to-green-600 hover:shadow-lg hover:shadow-purple-500/25"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Footer note */}
          <motion.p
            className="text-sm text-gray-500 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            We'll notify you as soon as trading goes live! 🚀
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}