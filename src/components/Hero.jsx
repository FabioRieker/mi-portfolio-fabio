import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Download } from 'lucide-react';
import { smoothSpring, entranceVariant } from '../utils/animations';

const Hero = ({ t }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-visible">
      <div className="max-w-4xl mx-auto px-6 text-center z-10">
        
        <motion.div 
          variants={entranceVariant}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-medium mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default shadow-lg shadow-cyan-900/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          {t.hero.status}
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...smoothSpring, delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-6 drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]"
        >
          Fabio Rieker
          <span className="block text-2xl md:text-4xl mt-4 font-light text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-500">
            {t.hero.role}
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smoothSpring, delay: 0.4 }}
          className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-md"
        >
          {t.hero.description}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smoothSpring, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#experience" className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:scale-105 transition-all flex items-center justify-center gap-2">
            {t.hero.cta_primary} <ChevronRight size={18} />
          </a>
          <a href="/cv.pdf" target="_blank" className="w-full sm:w-auto px-8 py-3.5 bg-white/5 text-white border border-white/20 font-medium rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <Download size={18} /> {t.hero.cta_secondary}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
