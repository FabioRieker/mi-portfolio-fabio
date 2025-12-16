import React from 'react';
import { motion } from 'framer-motion';
import { smoothSpring } from '../utils/animations';

const Timeline = ({ t }) => {
  return (
    <section id="experience" className="py-32 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={smoothSpring}
          className="text-3xl md:text-4xl font-bold text-white mb-16 text-center drop-shadow-md"
        >
          {t.experience.title}
        </motion.h2>
        
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smoothSpring, delay: 0.1 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active will-change-transform"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-purple-500/50 bg-[#020205] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:border-purple-500/30 transition-all hover:-translate-y-1">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-white text-lg">DAM (Desarrollo Apps)</h3>
                <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">2025 - Act.</span>
              </div>
              <p className="text-zinc-400 text-sm">Instituto Nebrija</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smoothSpring, delay: 0.2 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group will-change-transform"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-cyan-500/50 bg-[#020205] shadow-[0_0_15px_rgba(6,182,212,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
               <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:border-cyan-500/30 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-white text-lg">IT Helpdesk Support</h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">2025 - Present</span>
              </div>
              <p className="text-zinc-400 text-sm mb-3">Universidad Nebrija (Prácticas)</p>
              <p className="text-zinc-500 text-sm">{t.experience.job1}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...smoothSpring, delay: 0.3 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group will-change-transform"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700 bg-[#020205] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <div className="w-2 h-2 bg-zinc-500 rounded-full"></div>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:border-white/30 transition-all hover:-translate-y-1">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-white text-lg">SMR (Sistemas Micro.)</h3>
                <span className="text-xs font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded">2023 - 2025</span>
              </div>
              <p className="text-zinc-400 text-sm mb-2">IES Virgen de la Paloma</p>
              <span className="inline-block px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-500 text-xs border border-yellow-500/20">{t.experience.honor}</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Timeline;
