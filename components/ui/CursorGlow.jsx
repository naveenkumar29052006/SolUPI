'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useSpring(0, { stiffness: 150, damping: 30, mass: 0.5 });
  const cursorY = useSpring(0, { stiffness: 150, damping: 30, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
      }}
    >
      <motion.div
        className="absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: cursorX,
          top: cursorY,
          background: 'radial-gradient(circle, rgba(153, 69, 255, 0.08) 0%, rgba(20, 241, 149, 0.05) 35%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      
      {/* Inner glow for more intensity at center */}
      <motion.div
        className="absolute w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: cursorX,
          top: cursorY,
          background: 'radial-gradient(circle, rgba(153, 69, 255, 0.12) 0%, rgba(20, 241, 149, 0.08) 50%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Tight core for cursor precision */}
      <motion.div
        className="absolute w-[150px] h-[150px] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: cursorX,
          top: cursorY,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, rgba(153, 69, 255, 0.1) 40%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
    </motion.div>
  );
}
