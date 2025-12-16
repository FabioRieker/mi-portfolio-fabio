import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Languages, X, Menu } from 'lucide-react';
import { smoothSpring } from '../utils/animations';

const Navbar = ({ lang, setLang, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={smoothSpring}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className={`relative backdrop-blur-xl bg-black/20 border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-lg shadow-cyan-500/5 transition-all duration-300 ${scrolled ? 'bg-black/80 border-white/10 shadow-purple-500/20' : ''}`}>
          <a href="#home" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 hover:brightness-125 transition-all">FR.</a>
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
            {[t.nav.home, t.nav.work, t.nav.experience].map((item, idx) => (
               <a key={idx} href={`#${Object.keys(t.nav)[idx]}`} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative group">{item}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="flex items-center gap-2 text-xs font-medium bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full text-zinc-300 transition-colors border border-white/5"><Languages size={14} />{lang.toUpperCase()}</button>
            <a href="#contact" className="text-xs font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-cyan-50 transition-all transform hover:scale-105">{t.nav.contact}</a>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl"
        >
          {[t.nav.home, t.nav.work, t.nav.experience].map((item, idx) => (
             <a key={idx} href={`#${Object.keys(t.nav)[idx]}`} onClick={() => setIsOpen(false)} className="text-lg font-medium text-zinc-300 hover:text-white">{item}</a>
          ))}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="flex items-center gap-2 text-sm font-medium bg-white/5 px-4 py-2 rounded-full text-zinc-300"><Languages size={16} />{lang.toUpperCase()}</button>
            <a href="#contact" onClick={() => setIsOpen(false)} className="text-sm font-semibold bg-white text-black px-6 py-2 rounded-full">{t.nav.contact}</a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
