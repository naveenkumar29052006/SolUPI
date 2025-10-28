'use client';

import { motion } from 'framer-motion';
import { Twitter, Send, MessageCircle, Github, Rocket, Heart } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:text-blue-400' },
    { icon: Send, label: 'Telegram', href: '#', color: 'hover:text-cyan-400' },
    { icon: MessageCircle, label: 'Discord', href: '#', color: 'hover:text-indigo-400' },
    { icon: Github, label: 'GitHub', href: '#', color: 'hover:text-gray-300' }
  ];

  return (
    <footer className="border-t border-gray-800/50 bg-gradient-to-t from-black via-gray-900/20 to-black py-12 md:py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 to-transparent pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand */}
          <motion.div 
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-2xl md:text-3xl font-black gradient-text mb-4">SolUPI</div>
            <p className="text-gray-300 mb-6 max-w-lg text-sm leading-relaxed font-light">
              The <span className="text-white font-semibold">fastest</span> and most <span className="text-white font-semibold">secure</span> way to buy Solana using UPI in India.
              <Rocket className="inline w-4 h-4 ml-1 align-[-2px] text-white/70" aria-hidden />
            </p>
            <div className="flex space-x-2.5">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative group w-9 h-9 rounded-lg bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border-2 border-white/20 flex items-center justify-center hover:border-purple-500/50 transition-all duration-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-green-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Icon className="relative w-4 h-4 text-purple-400 group-hover:text-purple-300" strokeWidth={2.5} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-black text-sm md:text-base mb-4 gradient-text">Quick Links</h3>
            <ul className="space-y-2">
              {['Features', 'How It Works', 'FAQ', 'Support'].map((item, index) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                >
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    className="group text-gray-300 hover:text-purple-300 transition-all duration-300 text-xs md:text-sm flex items-center gap-2"
                  >
                    <span className="inline-block w-0 h-0.5 bg-gradient-to-r from-purple-500 to-green-500 group-hover:w-4 transition-all duration-300"></span>
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-black text-sm md:text-base mb-4 gradient-text">Legal</h3>
            <ul className="space-y-2">
              {['Terms of Service', 'Privacy Policy', 'Compliance', 'Contact'].map((item, index) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                >
                  <a 
                    href="#" 
                    className="group text-gray-300 hover:text-purple-300 transition-all duration-300 text-xs md:text-sm flex items-center gap-2"
                  >
                    <span className="inline-block w-0 h-0.5 bg-gradient-to-r from-purple-500 to-green-500 group-hover:w-4 transition-all duration-300"></span>
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-6 border-t-2 border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-400 text-xs md:text-sm font-light">
              © 2025 <span className="gradient-text font-bold">SolUPI</span>. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs md:text-sm font-light flex items-center gap-2">
              Made with
              <motion.span 
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="inline-flex"
                aria-hidden
              >
                <Heart className="w-4 h-4 text-purple-300" />
              </motion.span>
              for the <span className="gradient-text font-bold">Solana community</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}