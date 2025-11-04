'use client';

import { motion } from 'framer-motion';

const rows = [
  { feature: 'Time to receive SOL', solupi: '~2 minutes', cex: '10–60 minutes', p2p: '15–90 minutes' },
  { feature: 'Pricing transparency', solupi: 'Transparent, no hidden fees', cex: 'Often hidden spreads', p2p: 'Negotiated; variable' },
  { feature: 'KYC needed (small amounts)', solupi: 'No', cex: 'Yes', p2p: 'Depends' },
  { feature: 'Risk of counterparty', solupi: 'Low', cex: 'Exchange risk', p2p: 'High (scams/frozen funds)' },
  { feature: 'Ideal for', solupi: 'Fast top-ups and everyday use', cex: 'Large volume trading', p2p: 'Edge cases' },
];

export default function Comparison() {
  return (
    <section id="comparison" className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-transparent to-transparent pointer-events-none" />

      <div className="container relative z-10">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold text-green-300 uppercase tracking-wide">Why solupi</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            How we compare
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mt-3">A quick view of SolUPI vs centralised exchanges and P2P.</p>
        </motion.div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
          <div className="grid grid-cols-4 text-sm md:text-base">
            <div className="px-4 py-3 font-semibold text-gray-300">Feature</div>
            <div className="px-4 py-3 font-black gradient-text">SolUPI</div>
            <div className="px-4 py-3 font-semibold text-gray-300">Exchanges</div>
            <div className="px-4 py-3 font-semibold text-gray-300">P2P</div>
          </div>
          <div className="divide-y divide-white/10">
            {rows.map((r, i) => (
              <motion.div
                key={r.feature}
                className="group grid grid-cols-4 transition-colors hover:bg-white/[0.03]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="px-4 py-3 text-gray-300">{r.feature}</div>
                <div className="px-4 py-3 font-semibold text-white">
                  <span className="inline-flex items-center gap-2 px-2 py-1 transition-transform group-hover:scale-[1.01]">
                    {r.solupi}
                  </span>
                </div>
                <div className="px-4 py-3 text-gray-300">{r.cex}</div>
                <div className="px-4 py-3 text-gray-300">{r.p2p}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-32 md:h-48"></div>
    </section>
  );
}
