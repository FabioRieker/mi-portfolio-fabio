import React from 'react';
import { motion } from 'framer-motion';
import { Server, Cpu, Terminal, Code2, Globe, ShieldCheck } from 'lucide-react';
import { smoothSpring } from '../utils/animations';
import LiquidCard from './LiquidCard';

const ValueProp = ({ t }) => {
  return (
    <section id="work" className="py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={smoothSpring}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{t.value.title}</h2>
          <p className="text-zinc-400 text-lg">{t.value.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjetas animadas con escalonado (stagger) manual vía delay */}
          <LiquidCard className="md:col-span-2 p-8 md:p-10" delay={0.1}>
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
              <Server size={180} />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all">
                <Cpu size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">{t.value.card1.title}</h3>
            </div>
            <p className="text-zinc-300 mb-8 leading-relaxed text-lg relative z-10">{t.value.card1.content}</p>
            <div className="inline-flex items-center gap-3 text-sm font-mono text-cyan-400 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-cyan-500/20 shadow-inner">
              <Terminal size={14} /><span>fabio@linux:~$</span><span className="text-white">./init_dev_env.sh</span>
            </div>
          </LiquidCard>

          <LiquidCard className="p-8 md:p-10" delay={0.2}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20"><Code2 size={28} /></div>
              <h3 className="text-2xl font-bold text-white">{t.value.card2.title}</h3>
            </div>
            <p className="text-zinc-300 leading-relaxed">{t.value.card2.content}</p>
          </LiquidCard>

           <LiquidCard className="p-8 md:p-10" delay={0.3}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20"><Globe size={28} /></div>
              <h3 className="text-2xl font-bold text-white">{t.value.card3.title}</h3>
            </div>
            <p className="text-zinc-300 leading-relaxed">{t.value.card3.content}</p>
          </LiquidCard>

          <LiquidCard className="md:col-span-2 p-8 md:p-10 bg-gradient-to-br from-white/5 to-white/[0.02]" delay={0.4}>
             <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">{t.value.card4.title}</h3>
                  <p className="text-zinc-300 mb-6">{t.value.card4.content}</p>
                  <div className="flex flex-wrap gap-3">
                    {["AWS Cloud", "Cybersecurity", "Linux SMR"].map(tag => (
                      <span key={tag} className="text-sm bg-white/5 border border-white/20 rounded-full px-4 py-1.5 text-zinc-300 cursor-default">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                     <ShieldCheck className="text-white drop-shadow-md" size={40} />
                  </div>
                </div>
             </div>
          </LiquidCard>
        </div>
      </div>
    </section>
  );
};

export default ValueProp;
