'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is SolUPI?',
      answer: 'SolUPI is a platform that enables Indian users to buy Solana (SOL) cryptocurrency instantly using UPI payments. It\'s fast, secure, and designed specifically for the Indian market.'
    },
    {
      question: 'How long does a transaction take?',
      answer: 'Most transactions are completed within 2 minutes. Once you make the UPI payment, our system verifies it instantly and sends SOL to your wallet right away.'
    },
    {
      question: 'Do I need KYC to use SolUPI?',
      answer: 'For small transactions (up to ₹10,000), no KYC is required. For higher limits, you can complete a simple verification process. Your privacy is our priority.'
    },
    {
      question: 'Which UPI apps are supported?',
      answer: 'All UPI apps are supported! PhonePe, Google Pay, Paytm, BHIM, and any bank UPI app works perfectly with SolUPI.'
    },
    {
      question: 'What are the transaction limits?',
      answer: 'Without KYC: ₹1,000 - ₹10,000 per transaction. With KYC: Up to ₹1,00,000 per transaction. Daily limits apply based on your verification level.'
    },
    {
      question: 'Is SolUPI safe and secure?',
      answer: 'Absolutely! We use bank-grade encryption, secure Solana blockchain technology, and multiple layers of fraud protection. Your funds and data are always protected.'
    },
    {
      question: 'What are the fees?',
      answer: 'We charge a transparent 2% service fee on each transaction. No hidden charges, no surprises. You see exactly what you pay and what you get.'
    },
    {
      question: 'Can I sell SOL back to INR?',
      answer: 'Yes! SolUPI supports both buying and selling SOL. The process is just as simple and fast in both directions.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
  <section id="faq" className="py-32 md:py-40 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />
      
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
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Everything you need to know about buying Solana with UPI
          </p>
        </motion.div>

        {/* FAQ List */}
  <div className="max-w-5xl mx-auto space-y-12">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-3xl bg-gradient-to-br from-purple-900/10 to-transparent border border-purple-500/20 hover:border-purple-500/60 overflow-hidden transition-all duration-300 group"
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="w-full px-10 py-8 flex items-center justify-between text-left focus:outline-none hover:bg-purple-900/10 transition-colors duration-300"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xl sm:text-2xl font-semibold text-white pr-8 leading-relaxed group-hover:text-purple-300 transition-colors">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus className="w-8 h-8 text-purple-400" strokeWidth={2.5} />
                  ) : (
                    <Plus className="w-8 h-8 text-purple-400" strokeWidth={2.5} />
                  )}
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-10 pb-8 text-gray-400 leading-relaxed text-lg sm:text-xl">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div 
          className="mt-40 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 mb-10 text-xl sm:text-2xl">Still have questions?</p>
          <motion.button 
            className="px-14 py-6 md:px-20 md:py-8 bg-white/10 backdrop-blur-sm border-2 border-purple-500 text-white font-semibold rounded-3xl shadow-lg hover:bg-white/20 hover:border-purple-500 transition-all duration-300 text-2xl sm:text-3xl"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Support →
          </motion.button>
        </motion.div>
      </div>
      <div className="h-32 md:h-48"></div>
    </section>
  );
}