'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Aarav K.',
    role: 'DeFi Builder',
    quote: 'Fastest INR→SOL on-ramp I\'ve used. The UPI flow is shockingly quick.',
  },
  {
    name: 'Neha S.',
    role: 'Trader',
    quote: 'Clean UX, fair pricing, and the SOL hits my wallet in under 2 minutes.',
  },
  {
    name: 'Rahul M.',
    role: 'Founder',
    quote: 'Perfect for topping up before a mint or on-chain payment. Reliable.',
  },
  {
    name: 'Ishita P.',
    role: 'Creator',
    quote: 'Love the premium feel. Feels trusted and fast — exactly what I needed.',
  },
];

function Avatar({ name }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-green-500 text-white font-bold flex items-center justify-center">
      {initials}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02] pointer-events-none" />

      <div className="container relative z-10">
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
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wide">What users say</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Loved by the community
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mt-3">Real stories from people topping up SOL with UPI every day.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="relative group p-6 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-xl overflow-hidden h-full"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-500/10 via-transparent to-green-500/10" />

              <div className="relative z-10 flex items-center gap-3 mb-4">
                <motion.div whileHover={{ rotate: -2, scale: 1.01 }} transition={{ type: 'spring', stiffness: 250, damping: 22 }}>
                  <Avatar name={t.name} />
                </motion.div>
                <div>
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
              </div>
              <p className="relative z-10 text-gray-200 leading-relaxed">
                “{t.quote}”
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="h-32 md:h-48"></div>
    </section>
  );
}
