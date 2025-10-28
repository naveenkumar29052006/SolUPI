'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: 'blur(10px)',
          }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -inset-[100%] opacity-30"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(34, 211, 238, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Main loader content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Animated logo/icon */}
            <div className="relative">
              {/* Outer rotating ring */}
              <motion.div
                className="absolute inset-0 -m-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <svg className="w-32 h-32" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    strokeDasharray="10 5"
                    opacity="0.6"
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9945FF" />
                      <stop offset="50%" stopColor="#14F195" />
                      <stop offset="100%" stopColor="#00D9A3" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Inner counter-rotating ring */}
              <motion.div
                className="absolute inset-0 -m-6"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <svg className="w-28 h-28" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient2)"
                    strokeWidth="1.5"
                    strokeDasharray="15 10"
                    opacity="0.4"
                  />
                  <defs>
                    <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#14F195" />
                      <stop offset="100%" stopColor="#9945FF" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Center pulsing glow */}
              <motion.div
                className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-cyan-400 to-green-400 shadow-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    '0 0 20px rgba(147, 51, 234, 0.5)',
                    '0 0 40px rgba(20, 241, 149, 0.8)',
                    '0 0 20px rgba(147, 51, 234, 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* SOL symbol or logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-2xl font-black text-white"
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    S
                  </motion.span>
                </div>
              </motion.div>
            </div>

            {/* Brand name with letter animation */}
            <motion.div
              className="flex items-center gap-1 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {['S', 'o', 'l', 'U', 'P', 'I'].map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-4xl font-black bg-gradient-to-r from-purple-400 via-cyan-300 to-green-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-green-400 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              className="text-sm text-gray-400 font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Loading your crypto gateway...
            </motion.p>
          </div>

          {/* Particle effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => {
              // Use consistent positions based on index to avoid hydration mismatch
              const positions = [
                { left: 10, top: 20 }, { left: 25, top: 40 }, { left: 40, top: 10 }, 
                { left: 55, top: 60 }, { left: 70, top: 30 }, { left: 85, top: 70 },
                { left: 15, top: 80 }, { left: 30, top: 50 }, { left: 50, top: 15 },
                { left: 65, top: 85 }, { left: 80, top: 45 }, { left: 90, top: 25 },
                { left: 20, top: 65 }, { left: 35, top: 35 }, { left: 60, top: 75 },
                { left: 75, top: 55 }, { left: 5, top: 90 }, { left: 45, top: 5 },
                { left: 95, top: 50 }, { left: 12, top: 12 }
              ];
              const pos = positions[i];
              const delays = [0, 0.5, 1, 1.5, 0.3, 0.8, 1.2, 0.2, 0.7, 1.4, 0.6, 1.1, 0.4, 0.9, 1.3, 0.1, 1.6, 0.5, 1.0, 0.8];
              const durations = [2, 2.5, 3, 3.5, 2.2, 2.8, 3.2, 2.4, 2.6, 3.4, 2.3, 2.7, 3.1, 2.9, 3.3, 2.1, 3.6, 2.5, 2.8, 3.0];
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                  }}
                  animate={{
                    y: [0, -100, -200],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: durations[i],
                    repeat: Infinity,
                    delay: delays[i],
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
