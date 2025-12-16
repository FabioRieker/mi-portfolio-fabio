import React from 'react';
import { motion } from 'framer-motion';
import { smoothSpring, entranceVariant } from '../utils/animations';

// 2. MODIFICAMOS LIQUIDCARD CON SPRING Y WILL-CHANGE
const LiquidCard = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={entranceVariant}
      transition={{ ...smoothSpring, delay: delay }}
      className={`
        relative overflow-hidden rounded-3xl
        bg-white/5 backdrop-blur-2xl backdrop-saturate-150
        border border-white/10
        shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
        transition-colors duration-500
        hover:bg-white/10 hover:border-white/20 hover:shadow-[0_15px_40px_0_rgba(0,243,255,0.15)]
        hover:-translate-y-2
        group
        will-change-transform
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default LiquidCard;
