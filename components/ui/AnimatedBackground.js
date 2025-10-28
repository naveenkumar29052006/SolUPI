'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  // Reduced particles from 40 to 15 for better performance
  const particles = [
    { left: 10, top: 20 }, { left: 40, top: 10 }, { left: 70, top: 30 },
    { left: 85, top: 70 }, { left: 30, top: 50 }, { left: 65, top: 85 },
    { left: 90, top: 25 }, { left: 20, top: 65 }, { left: 60, top: 75 },
    { left: 5, top: 90 }, { left: 45, top: 5 }, { left: 95, top: 50 },
    { left: 15, top: 35 }, { left: 75, top: 55 }, { left: 50, top: 15 }
  ];

  const delays = [0, 0.5, 1, 0.3, 0.8, 1.2, 0.2, 0.7, 0.6, 1.1, 0.4, 0.9, 1.3, 0.1, 1.6];
  const durations = [3, 3.5, 3.2, 2.8, 3.4, 3.1, 2.9, 3.3, 3.6, 2.7, 3.8, 2.5, 3.0, 3.7, 2.6];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background - optimized */}
      <motion.div
        className="absolute -inset-[100%] opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.25) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(34, 211, 238, 0.25) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.25) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.25) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* Optimized floating particle stars */}
      {particles.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full will-change-transform"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
          }}
          animate={{
            y: [0, -150],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: durations[i],
            repeat: Infinity,
            delay: delays[i],
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
