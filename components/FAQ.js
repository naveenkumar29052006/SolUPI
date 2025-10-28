'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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

  <section id="faq" className="py-20 md:py-28 relative overflow-hidden">

      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02] pointer-events-none" />
      
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
            className="inline-block mb-5"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
              <span className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                FAQ
              </span>
            </div>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-light">
            Everything you need to know about buying Solana with UPI
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative"
            >
              <div className={`
                rounded-2xl border transition-all duration-300
                ${openIndex === index 
                  ? 'bg-white/[0.08] border-white/20 shadow-lg shadow-white/5' 
                  : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05] hover:border-white/15'
                }
              `}>
                <button
                  onClick={() => toggleFAQ(index)}
                  className="relative w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`
                    text-sm md:text-base font-semibold pr-4 transition-colors duration-300
                    ${openIndex === index ? 'text-white' : 'text-gray-300 group-hover:text-white'}
                  `}>
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className={`
                        w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                        ${openIndex === index 
                          ? 'bg-white/20' 
                          : 'bg-white/10 group-hover:bg-white/15'
                        }
                      `}
                    >
                      <ChevronDown className="w-4 h-4 text-white" strokeWidth={2} />
                    </motion.div>
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-gray-400 leading-relaxed text-sm md:text-base border-t border-white/10 pt-4 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div 
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-400 mb-5 text-base md:text-lg">
            Still have questions? <span className="text-white font-semibold">We're here to help</span>
          </p>
          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 text-sm md:text-base"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
      <div className="h-32 md:h-48"></div>
    </section>
  );
}