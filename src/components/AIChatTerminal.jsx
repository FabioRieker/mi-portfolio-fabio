import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Bot, Minimize2, Send } from 'lucide-react';
import { smoothSpring } from '../utils/animations';

/**
 * COMPONENTE: UI COMPONENTS (Chat, Navbar, etc.)
 */

const AIChatTerminal = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'init_sequence_complete... Hola! Soy la IA de Fabio. Pregúntame sobre sus skills (Java, Linux, AWS), experiencia o estudios.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; 
      const systemContext = `
Eres el asistente del portafolio de Fabio Rieker.

**Tu Objetivo:**
Responder dudas sobre Fabio basándote EXCLUSIVAMENTE en su CV. Sé breve (1-2 frases) y natural.

**Datos del CV:**
- **Perfil:** Técnico en Sistemas (SMR) y estudiante de Desarrollo Multiplataforma (DAM).
- **Formación:**
  - DAM: Instituto Nebrija (2025-act).
  - SMR: IES Virgen de la Paloma (2023-2025) - Matrícula de Honor.
- **Experiencia:**
  - Técnico Help Desk en Universidad Nebrija (Contrato prácticas): Soporte técnico, gestión de tickets, resolución de incidencias.
- **Habilidades Técnicas:**
  - Lenguajes: Java (Fuerte), Python, SQL.
  - Herramientas: Docker, Git/Github, VS Code, Packet Tracer, Oracle Virtualbox.
  - Sistemas: Windows, Linux (Bash scripting), AWS (Cloud Foundations).
- **Idiomas:** Castellano (Nativo), Inglés (B2), Alemán (Nivel auditivo B2).
- **Soft Skills:** Trabajo en equipo, adaptabilidad, resolución de problemas, comunicación eficaz.
- **Voluntariado:** Programa "Alumnos Ayudantes TIC" (Ayuntamiento Pozuelo) - Formación en uso responsable de TIC y ciberacoso.

**Reglas:**
1. Si te preguntan algo que no está aquí, di que no tienes esa info pero que Fabio aprende rápido.
2. No inventes nada.
3. Sé directo y amable.
`;
      
      let aiResponseText;
      if (!apiKey) {
         await new Promise(r => setTimeout(r, 1000));
         aiResponseText = "Modo Demo: Configura VITE_GEMINI_API_KEY para respuestas reales.";
      } else {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: `System Context: ${systemContext}\n\nUser Question: ${input}` }] }] })
        });
        const data = await response.json();
        console.log("Gemini API Response:", data); // Debug log
        if (data.error) {
            console.error("Gemini API Error:", data.error);
            aiResponseText = `Error (${data.error.code || '?'}) : ${data.error.message || "Unknown API error"}`;
        } else {
            aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No response content.";
        }
      }
      setMessages(prev => [...prev, { role: 'ai', text: aiResponseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Error de conexión." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={smoothSpring}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-lg border transition-colors duration-300 group
          ${isOpen ? 'bg-red-500/20 border-red-500 text-red-400 rotate-90' : 'bg-cyan-500/20 border-cyan-500 text-cyan-400 hover:shadow-[0_0_30px_cyan]'}
        `}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} className="animate-pulse" />}
      </motion.button>

      {/* Usamos AnimatePresence para animar la salida */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={smoothSpring}
          className="fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-[400px] h-[500px] bg-[#0a0a0f]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden will-change-transform"
        >
          <div className="bg-white/5 p-3 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm">
              <Bot size={16} /><span>fabio_ai_assistant.exe</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white"><Minimize2 size={16}/></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-sm custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl ${msg.role === 'user' ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-500/30' : 'bg-zinc-800/50 text-zinc-300 border border-white/5'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-emerald-500 animate-pulse">AI is typing...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask me something..." className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-base md:text-sm focus:outline-none focus:border-cyan-500/50" />
            <button onClick={handleSend} disabled={isLoading} className="bg-cyan-500/20 text-cyan-400 p-2 rounded-lg"><Send size={18} /></button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AIChatTerminal;
