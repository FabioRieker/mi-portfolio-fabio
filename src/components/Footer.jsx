import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

const Footer = ({ t }) => {
  return (
    <footer id="contact" className="py-20 border-t border-white/5 bg-[#020205] relative z-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">{t.contact.title}</h2>
        <p className="text-zinc-400 mb-10 max-w-md mx-auto">{t.contact.subtitle}</p>
        <div className="flex justify-center gap-6 mb-12">
          {/* Iconos de redes sociales */}
          <a href="mailto:fabiorieker@gmail.com" className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5 hover:border-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"><Mail size={24} /></a>
          <a href="https://linkedin.com/in/fabio-rieker/" target="_blank" className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5 hover:border-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,119,181,0.4)]"><Linkedin size={24} /></a>
          <a href="https://github.com/FabioRieker" target="_blank" className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5 hover:border-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"><Github size={24} /></a>
        </div>
        <p className="text-zinc-600 text-sm">&copy; 2025 Fabio Rieker. Madrid, España.</p>
      </div>
    </footer>
  );
};

export default Footer;
