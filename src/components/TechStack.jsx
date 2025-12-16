import React from 'react';
import { motion } from 'framer-motion';

/**
 * COMPONENTE: TECH STACK (Nube de habilidades interactiva)
 */
const TechStack = ({ t }) => {
  const skills = [
    { name: "Java", category: "Backend", level: 90, color: "text-red-500" },
    { name: "Linux", category: "Systems", level: 85, color: "text-yellow-500" },
    { name: "React", category: "Frontend", level: 80, color: "text-cyan-400" },
    { name: "AWS", category: "Cloud", level: 60, color: "text-orange-500" },
    { name: "Docker", category: "DevOps", level: 65, color: "text-blue-500" },
    { name: "Git", category: "Tools", level: 85, color: "text-red-400" },
    { name: "Bash", category: "Scripting", level: 75, color: "text-green-500" },
    { name: "SQL", category: "Database", level: 70, color: "text-blue-300" },
  ];

  return (
    <section className="py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
        >
          {t.tech.title}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center"
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl`} />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className={`text-4xl font-bold mb-2 ${skill.color} drop-shadow-lg`}>
                  {skill.name}
                </div>
                <div className="text-sm text-zinc-400 uppercase tracking-wider">{skill.category}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
