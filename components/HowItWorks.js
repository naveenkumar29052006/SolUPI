'use client';

import { motion } from 'framer-motion';
import { Wallet, QrCode, CreditCard, Rocket } from 'lucide-react';

export default function HowItWorks() {
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
  <section id="how-it-works" className="py-32 md:py-40 bg-gradient-to-b from-black via-purple-900/10 to-black relative overflow-hidden">
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
          className="text-center mb-20 md:mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            How <span className="gradient-text">SolUPI</span> Works
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Get your Solana in 4 simple steps. No complicated process, just pure simplicity.
          </p>
        </motion.div>

        {/* Steps */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20 lg:gap-y-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <motion.div 
                    className="hidden lg:block absolute top-20 left-1/2 w-full h-1 z-0"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                  >
                    <div className="h-full bg-gradient-to-r from-purple-500/40 via-green-500/40 to-purple-500/40 relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  </motion.div>
                )}

                <motion.div 
                  className="relative z-10 text-center p-8 rounded-3xl bg-gradient-to-br from-purple-900/10 to-transparent border border-purple-500/20 hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 h-full"
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Number Badge */}
                  <motion.div 
                    className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-green-500 text-white font-bold text-3xl mb-8 shadow-lg shadow-purple-500/50 relative overflow-hidden"
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="relative z-10">{step.number}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>

                  {/* Icon */}
                  <motion.div 
                    className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${step.color} p-4 mb-8 group-hover:scale-105 transition-transform duration-500`}
                    whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="w-full h-full text-white" strokeWidth={2} />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white group-hover:text-purple-300 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-base sm:text-lg group-hover:text-gray-300 transition-colors duration-300">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-40"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button 
            className="px-14 py-6 md:px-20 md:py-8 bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black font-bold rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 text-2xl sm:text-3xl relative overflow-hidden group border-2 border-[#14F195]/40"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Start Your First Trade →</span>
            <motion.div
              className="absolute inset-0 bg-white/20 pointer-events-none rounded-3xl"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>
      </div>
      <div className="h-32 md:h-48"></div>
    </section>
  );
}