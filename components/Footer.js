'use client';

import { motion } from 'framer-motion';
import { Twitter, Send, MessageCircle, Github } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:text-blue-400' },
    { icon: Send, label: 'Telegram', href: '#', color: 'hover:text-cyan-400' },
    { icon: MessageCircle, label: 'Discord', href: '#', color: 'hover:text-indigo-400' },
    { icon: Github, label: 'GitHub', href: '#', color: 'hover:text-gray-300' }
  ];

  return (
    <footer className="border-t border-gray-800/50 bg-gradient-to-t from-black via-gray-900/20 to-black py-24 relative overflow-hidden mt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 to-transparent pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <motion.div 
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-5xl md:text-6xl font-bold gradient-text mb-8">SolUPI</div>
            <p className="text-gray-400 mb-12 max-w-lg text-xl leading-relaxed">
              The fastest and most secure way to buy Solana using UPI in India. 
              Built for the Web3 generation with cutting-edge technology.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-900/30 to-green-900/30 border border-purple-500/50 flex items-center justify-center hover:border-purple-500/80 hover:bg-purple-900/40 transition-all duration-300 group ${social.color}`}
                    aria-label={social.label}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Icon className="w-7 h-7 text-purple-400 group-hover:text-current transition-colors duration-300" strokeWidth={2} />
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
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-bold text-2xl mb-10">Quick Links</h3>
            <ul className="space-y-5">
              {['Features', 'How It Works', 'FAQ', 'Support'].map((item, index) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-400 hover:text-purple-300 transition-colors duration-300 text-xl block"
                  >
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
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-white font-bold text-2xl mb-10">Legal</h3>
            <ul className="space-y-5">
              {['Terms of Service', 'Privacy Policy', 'Compliance', 'Contact'].map((item, index) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-purple-300 transition-colors duration-300 text-xl block"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-12 border-t border-gray-800/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-lg">
              © 2025 SolUPI. All rights reserved.
            </p>
            <motion.p 
              className="text-gray-500 text-lg flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Made with <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-purple-500"
              >💜</motion.span> for the Solana community
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}