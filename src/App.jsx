import React, { useState, useEffect, useRef } from 'react';
// Importamos todas las librerías necesarias
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import { 
  Terminal, Server, Code2, Cpu, Globe, ShieldCheck, Mail, Linkedin, Github, 
  ChevronRight, Download, Menu, X, Languages, Bot, Send, Minimize2, Sparkles, Cloud, Database
} from 'lucide-react';

// --- FÍSICA ANTIGRAVEDAD (CONFIGURACIÓN) ---

// 1. Levitación suave (Flotar en el espacio)
const floatVariant = {
  initial: { y: 0 },
  animate: { 
    y: [-10, 10, -10],
    transition: { 
      duration: 6, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }
  }
};

// 2. Entrada suave con rebote
const smoothSpring = { type: "spring", stiffness: 100, damping: 20, mass: 1 };

const textContainerVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
};

const letterVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } }
};

const entranceVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { ...smoothSpring, duration: 0.8 } }
};

// --- COMPONENTES VISUALES ---

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 origin-left z-[100]" style={{ scaleX }} />;
};

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const dotPosRef = useRef({ x: 0, y: 0 });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };
    const onMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.tagName === 'A' || target.tagName === 'BUTTON' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('a') || target.closest('button') || target.closest('.interactive');
      setIsHovering(isInteractive);
    };
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    let animationFrameId;
    const animate = () => {
      dotPosRef.current.x = mouseRef.current.x;
      dotPosRef.current.y = mouseRef.current.y;
      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.15;
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.15;

      if (cursorDotRef.current) cursorDotRef.current.style.transform = `translate3d(${dotPosRef.current.x}px, ${dotPosRef.current.y}px, 0) translate(-50%, -50%)`;
      if (cursorRingRef.current) cursorRingRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate(-50%, -50%)`;
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={cursorDotRef} className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-cyan-400 mix-blend-difference transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} w-2 h-2`} />
      <div ref={cursorRingRef} className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border mix-blend-difference flex items-center justify-center backdrop-blur-[1px] transition-all duration-300 ease-out will-change-transform ${isHovering ? "w-16 h-16 bg-cyan-400/10 border-cyan-400/50" : "w-8 h-8 bg-transparent border-cyan-400"} ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
    </>
  );
};

const SpaceBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 3000], [0, 400]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -300]);

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none bg-[#020205]">
      <motion.div style={{ y: y1 }} className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-purple-900/20 to-blue-900/10 blur-[120px] will-change-transform" />
      <motion.div style={{ y: y2 }} className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tl from-cyan-900/20 to-emerald-900/10 blur-[120px] will-change-transform" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-blue-950/5 blur-[120px] animate-pulse" />
    </div>
  );
};

const Starfield = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX - width / 2,
        y: e.clientY - height / 2
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Estrellas estáticas (fondo) con profundidad (depth)
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random(),
      speed: Math.random() * 0.005 + 0.002, 
      direction: Math.random() > 0.5 ? 1 : -1,
      depth: Math.random() * 0.5 + 0.1 // Profundidad AUMENTADA para más efecto 3D
    }));

    // Clase para estrellas fugaces
    class ShootingStar {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height * 0.5; 
        this.length = Math.random() * 80 + 10;
        this.speed = Math.random() * 10 + 6;
        this.vx = this.speed;
        this.vy = this.speed * 0.1; 
        this.opacity = 0;
        this.fadeIn = true;
        this.active = true;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.fadeIn) {
          this.opacity += 0.1;
          if (this.opacity >= 1) this.fadeIn = false;
        } else {
          this.opacity -= 0.02;
        }

        if (this.opacity <= 0 || this.x > width + 100) {
          this.active = false;
        }
      }
      draw() {
        if (!this.active) return;
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length, this.y - this.length * 0.1);
        ctx.stroke();
      }
    }

    let shootingStars = [];
    let animationFrameId;

    const animate = () => {
      ctx.fillStyle = "#020205";
      ctx.fillRect(0, 0, width, height);

      // Calcular offset suave (Lerp)
      // AUMENTADO el factor de -0.1 a -0.25 para mayor movimiento
      const targetX = mouseRef.current.x * -0.25;
      const targetY = mouseRef.current.y * -0.25;
      
      offsetRef.current.x += (targetX - offsetRef.current.x) * 0.05;
      offsetRef.current.y += (targetY - offsetRef.current.y) * 0.05;

      // Dibujar estrellas de fondo
      stars.forEach(star => {
        star.opacity += star.speed * star.direction;
        if (star.opacity > 1 || star.opacity < 0.2) star.direction *= -1;
        
        // Aplicar parallax basado en profundidad
        const moveX = offsetRef.current.x * star.depth;
        const moveY = offsetRef.current.y * star.depth;

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.opacity)})`;
        ctx.beginPath();
        ctx.arc(star.x + moveX, star.y + moveY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Gestionar estrellas fugaces
      if (Math.random() < 0.005) { 
        shootingStars.push(new ShootingStar());
      }

      shootingStars.forEach((star, index) => {
        star.update();
        star.draw();
        if (!star.active) shootingStars.splice(index, 1);
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none" />;
};

const PlanetHorizon = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]); 
  return (
    <>
      <style>{`@keyframes horizonPulse { 0%, 100% { box-shadow: 0 -10px 60px rgba(0, 243, 255, 0.3), 0 -20px 100px rgba(0, 243, 255, 0.1), inset 0 50px 100px rgba(0,0,0,0.9); } 50% { box-shadow: 0 -15px 80px rgba(189, 0, 255, 0.4), 0 -30px 120px rgba(189, 0, 255, 0.2), inset 0 30px 80px rgba(0,0,0,0.8); } } .planet-glow { animation: horizonPulse 8s ease-in-out infinite; }`}</style>
      <motion.div style={{ y }} className="fixed bottom-[-80vh] left-[-50%] w-[200%] h-[100vh] rounded-[50%] bg-[#000] -z-10 pointer-events-none planet-glow opacity-100 will-change-transform" />
      <div className="fixed bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-cyan-500/10 via-purple-500/5 to-transparent -z-10 pointer-events-none" />
    </>
  );
};

const TypingEffect = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) { setDisplayedText((prev) => prev + text.charAt(index)); index++; } 
      else { clearInterval(timer); }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return <span>{displayedText}</span>;
};

// 2. MODIFICAMOS LIQUIDCARD PARA USAR TILT 3D
const LiquidCard = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={entranceVariant}
      transition={{ delay: delay }}
      className={`relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_15px_40px_0_rgba(0,243,255,0.15)] group h-full ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

// --- TERMINAL CHAT ---

const AIChatTerminal = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Hola! Soy la IA de Fabio. Pregúntame sobre sus skills (Java, Linux, AWS), experiencia o estudios.' }]);
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
      
      if (!apiKey) {
        // Si falla por falta de clave, simulamos un pequeño delay para que no sea instantáneo el error
        await new Promise(r => setTimeout(r, 500));
        throw new Error("Falta VITE_GEMINI_API_KEY en .env");
      }

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
  - Lenguajes: Java (Nivel Académico/Iniciación), Python (Básico), SQL.
  - Herramientas: Docker (Nociones muy básicas), Git/Github, VS Code, Packet Tracer, Oracle Virtualbox.
  - Sistemas: Windows, Linux (Bash scripting), AWS (Cloud Foundations).
- **Idiomas:** Castellano (Nativo), Inglés (B2), Alemán (Nivel auditivo B2).
- **Soft Skills:** Trabajo en equipo, adaptabilidad, resolución de problemas, comunicación eficaz.
- **Voluntariado:** Programa "Alumnos Ayudantes TIC" (Ayuntamiento Pozuelo) - Formación en uso responsable de TIC y ciberacoso.

**IMPORTANTE - Contexto Real (Junior):**
Fabio acaba de empezar a programar prácticamente. Es un perfil JUNIOR.
- **Java:** Sabe la teoría y ejercicios de clase, pero no es experto.
- **Docker:** Apenas lo ha tocado, sabe qué es pero no tiene experiencia real.
- **Punto Fuerte:** Su base de SISTEMAS (SMR). Entiende cómo funcionan las máquinas y redes por debajo, lo que le ayuda a aprender programación mejor.
- **Venta:** Véndelo como alguien con mucho potencial, que aprende rápido y tiene una base técnica sólida, aunque en código esté empezando.

**Reglas de Estilo:**
1. **TERCERA PERSONA:** Habla SIEMPRE de Fabio en tercera persona ("Fabio", "Él", "Su"). NUNCA digas "Yo soy Fabio" o "Tengo experiencia". Tú eres el asistente.
2. **CERO MARKDOWN:** No uses negritas (**), ni listas con guiones (-), ni cursivas. Escribe en texto plano.
3. **Concisión:** Máximo 1 o 2 frases.
4. **Tono:** Humilde, honesto pero motivado. "Fabio aún está aprendiendo X, pero tiene buena base en Y".
`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: `System: ${systemContext}\nUser: ${input}` }] }] })
      });

      if (!response.ok) throw new Error(`Error API: ${response.status}`);

      const data = await response.json();
      const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No pude procesar la respuesta.";

      setMessages(prev => [...prev, { role: 'ai', text: aiResponseText }]);
    } catch (error) {
      console.error("Error AI:", error);
      const errorMsg = error.message.includes("API Key") 
        ? "⚠️ Error: Falta configurar la API Key. Revisa el archivo .env." 
        : "Error de conexión con la IA. Inténtalo más tarde.";
      setMessages(prev => [...prev, { role: 'ai', text: errorMsg }]);
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

      <AnimatePresence>
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
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask me something..." className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-500/50" />
              <button onClick={handleSend} disabled={isLoading} className="bg-cyan-500/20 text-cyan-400 p-2 rounded-lg"><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- ESTRUCTURA PRINCIPAL ---

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
          <a href="#home" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 hover:brightness-125 transition-all cursor-pointer">FR.</a>
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {[t.nav.home, t.nav.work, t.nav.experience].map((item, idx) => (
               <a key={idx} href={`#${Object.keys(t.nav)[idx]}`} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative group interactive">
                 {item}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full box-shadow-[0_0_10px_cyan]"></span>
               </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="flex items-center gap-2 text-xs font-medium bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full text-zinc-300 transition-colors border border-white/5 interactive"><Languages size={14} />{lang.toUpperCase()}</button>
            <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="text-xs font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-cyan-50 transition-all interactive">{t.nav.contact}</motion.a>
          </div>
          <button className="md:hidden text-white interactive" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </div>
      <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="absolute top-24 left-4 right-4 bg-black/90 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl md:hidden z-50">
          {[t.nav.home, t.nav.work, t.nav.experience].map((item, idx) => (
            <a key={idx} href={`#${Object.keys(t.nav)[idx]}`} onClick={() => setIsOpen(false)} className="text-lg font-medium text-zinc-300 hover:text-white interactive">{item}</a>
          ))}
          <div className="h-px bg-white/10 my-2"></div>
          <button onClick={() => { setLang(lang === 'es' ? 'en' : 'es'); setIsOpen(false); }} className="flex items-center gap-2 text-zinc-400 interactive"><Languages size={18} /> Cambiar Idioma</button>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = ({ t }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-visible">
      <div className="max-w-4xl mx-auto px-6 text-center z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-medium mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default shadow-lg shadow-cyan-900/20">
          <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span></span>
          {t.hero.status}
        </motion.div>
        <motion.h1 variants={textContainerVariant} initial="hidden" animate="visible" className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-6 drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]">
          {Array.from("Fabio Rieker").map((letter, i) => (<motion.span key={i} variants={letterVariant} className="inline-block">{letter === " " ? "\u00A0" : letter}</motion.span>))}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...smoothSpring, delay: 1.2 }} className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-md">{t.hero.description}</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...smoothSpring, delay: 1.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a href="/cv.pdf" target="_blank" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto px-8 py-3.5 bg-white/5 text-white border border-white/20 font-medium rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2 interactive"><Download size={18} /> {t.hero.cta_secondary}</motion.a>
        </motion.div>
      </div>
    </section>
  );
};

const ValueProp = ({ t }) => {
  return (
    <section id="work" className="py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={smoothSpring} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">Desarrollo & Sistemas</h2>
          <p className="text-zinc-400 text-lg">Aprendizaje continuo en desarrollo y sistemas</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Desarrollo Backend */}
          <LiquidCard className="md:col-span-2 p-8 md:p-10" delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all">
                <Cpu size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">Desarrollo Backend</h3>
            </div>
            <p className="text-zinc-300 mb-8 leading-relaxed text-lg relative z-10">
              Desarrollo backend con Java y Spring Boot. Enfocado en escribir código limpio y aprender buenas prácticas de diseño.
            </p>
            <div className="inline-flex items-center gap-3 text-sm font-mono text-cyan-400 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-cyan-500/20 shadow-inner">
              <span className="text-green-400">➜</span>
              <span className="text-cyan-400">fabio@linux:~$</span>
              <span className="text-white"><TypingEffect text="./init_dev_env.sh" /></span>
            </div>
          </LiquidCard>

          {/* Card 2: Sistemas Linux */}
          <LiquidCard className="p-8 md:p-10" delay={0.2}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                <Terminal size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">Sistemas Linux</h3>
            </div>
            <p className="text-zinc-300 leading-relaxed text-lg">
              Gestión de servidores Linux y scripting en Bash. Interés en la automatización y el control del sistema.
            </p>
          </LiquidCard>

          {/* Card 3: Infraestructura Cloud */}
          <LiquidCard className="p-8 md:p-10" delay={0.3}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                <Globe size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">Infraestructura Cloud</h3>
            </div>
            <p className="text-zinc-300 leading-relaxed text-lg">
              Experiencia básica desplegando servicios en AWS y uso de Docker para crear entornos de desarrollo consistentes.
            </p>
          </LiquidCard>

          {/* Card 4: Seguridad & Redes */}
          <LiquidCard className="md:col-span-2 p-8 md:p-10 bg-gradient-to-br from-white/5 to-white/[0.02]" delay={0.4}>
             <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-pink-500/10 rounded-xl text-pink-400 border border-pink-500/20">
                      <ShieldCheck size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Seguridad & Redes</h3>
                  </div>
                  <p className="text-zinc-300 mb-6 text-lg">
                    Interés en la seguridad informática y configuración de redes. Aprendiendo a proteger sistemas y comunicaciones.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["AWS Cloud", "Cybersecurity", "Linux SMR"].map(tag => (
                    <span key={tag} className="text-sm bg-white/5 border border-white/20 rounded-full px-4 py-1.5 text-zinc-300 cursor-default hover:bg-white/10 transition-colors interactive">{tag}</span>
                  ))}
                </div>
             </div>
          </LiquidCard>
        </div>
      </div>
    </section>
  );
};

// 3. APLICAMOS TILT TAMBIÉN AL STACK DE TECNOLOGÍA
const TechStack = ({ t }) => (
  <section className="py-20 px-6 max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-16">{t.tech.title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[{ name: "Java", icon: <Code2 /> }, { name: "Spring Boot", icon: <Server /> }, { name: "Linux", icon: <Terminal /> }, { name: "AWS", icon: <Cloud /> }, { name: "SQL", icon: <Database /> }, { name: "Git", icon: <Github /> }, { name: "React", icon: <Globe /> }, { name: "Security", icon: <ShieldCheck /> }].map((tech, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
          <div className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all cursor-default h-full">
            <div className="text-cyan-400 mb-3">{tech.icon}</div>
            <span className="font-medium text-zinc-300">{tech.name}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const Timeline = ({ t }) => {
  return (
    <section id="experience" className="py-32 px-6 max-w-4xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={smoothSpring} className="text-3xl md:text-4xl font-bold text-white mb-16 text-center drop-shadow-md">{t.experience.title}</motion.h2>
      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ ...smoothSpring, delay: 0.1 }} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active will-change-transform">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-cyan-500/50 bg-[#020205] shadow-[0_0_15px_rgba(6,182,212,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"><div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse"></div></div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:border-cyan-500/30 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center mb-2"><h3 className="font-bold text-white text-lg">IT Helpdesk Support</h3><span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">2025 - Present</span></div>
            <p className="text-zinc-400 text-sm mb-3">Universidad Nebrija (Prácticas)</p><p className="text-zinc-500 text-sm">{t.experience.job1}</p>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ ...smoothSpring, delay: 0.2 }} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group will-change-transform">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-purple-500/50 bg-[#020205] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_0_15px_rgba(168,85,247,0.3)]"><div className="w-2 h-2 bg-purple-500 rounded-full"></div></div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:border-purple-500/30 transition-all hover:-translate-y-1"><div className="flex justify-between items-center mb-2"><h3 className="font-bold text-white text-lg">DAM (Desarrollo Apps)</h3><span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">2025 - Act.</span></div><p className="text-zinc-400 text-sm">Instituto Nebrija</p></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ ...smoothSpring, delay: 0.3 }} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group will-change-transform">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700 bg-[#020205] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"><div className="w-2 h-2 bg-zinc-500 rounded-full"></div></div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:border-white/30 transition-all hover:-translate-y-1"><div className="flex justify-between items-center mb-2"><h3 className="font-bold text-white text-lg">SMR (Sistemas Micro.)</h3><span className="text-xs font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded">2023 - 2025</span></div><p className="text-zinc-400 text-sm mb-2">IES Virgen de la Paloma</p><span className="inline-block px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-500 text-xs border border-yellow-500/20">{t.experience.honor}</span></div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ t }) => {
  return (
    <footer id="contact" className="py-20 border-t border-white/5 bg-[#020205] relative z-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">{t.contact.title}</h2>
        <p className="text-zinc-400 mb-10 max-w-md mx-auto">{t.contact.subtitle}</p>
        <div className="flex justify-center gap-6 mb-12">
          <a href="mailto:fabiorieker@gmail.com" className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5 hover:border-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] interactive"><Mail size={24} /></a>
          <a href="https://linkedin.com/in/fabio-rieker/" target="_blank" className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5 hover:border-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,119,181,0.4)] interactive"><Linkedin size={24} /></a>
          <a href="https://github.com/FabioRieker" target="_blank" className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5 hover:border-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] interactive"><Github size={24} /></a>
        </div>
        <p className="text-zinc-600 text-sm">&copy; 2025 Fabio Rieker. Madrid, España.</p>
      </div>
    </footer>
  );
};

const App = () => {
  const [lang, setLang] = useState('es');
  const translations = {
    es: {
      nav: { home: "Inicio", work: "Valores", experience: "Trayectoria", contact: "Contactar" },
      hero: {
        status: "Disponible para contratación",
        role: "Técnico SMR | Estudiante DAM",
        description: "\"No soy solo código. Vengo del mundo de los sistemas (SMR), Linux y las redes. Ahora sumo la programación para convertirme en un perfil híbrido capaz de entender toda la infraestructura detrás del software.\"",
        cta_primary: "¿Qué aporto?",
        cta_secondary: "Descargar CV"
      },
      value: {
        title: "¿Qué aporto a tu empresa?",
        subtitle: "Un enfoque técnico integral: Desde el hardware hasta el código.",
        card1: {
          title: "Sistemas + Desarrollo",
          content: "La mayoría de programadores no saben qué pasa cuando su código sale de 'localhost'. Gracias a mi base SMR, domino Linux y Redes. Escribo software sabiendo dónde y cómo se va a ejecutar."
        },
        card2: {
          title: "Curva de Aprendizaje",
          content: "Ya salté del Hardware al Software con éxito. Mi mentalidad es de resolución técnica constante. Si no sé la respuesta, sé exactamente cómo buscarla en la documentación."
        },
        card3: {
          title: "Soft Skills & Actitud",
          content: "Experiencia real en Helpdesk y atención al cliente. Sé traducir problemas técnicos a lenguaje de usuario y trabajar en equipo sin fricción."
        },
        card4: {
          title: "Formación Continua",
          content: "Desde AWS Cloud Foundations hasta Ciberseguridad. Mi formación no se detiene en el aula."
        }
      },
      tech: { title: "Stack Tecnológico" },
      experience: {
        title: "Formación y Experiencia",
        job1: "Soporte técnico a usuarios finales, diagnóstico de incidencias en sistemas operativos y gestión de tickets.",
        honor: "Matrícula de Honor"
      },
      contact: {
        title: "¿Hablamos?",
        subtitle: "Busco oportunidades donde pueda aplicar mi perfil híbrido. Si buscas un junior con base técnica sólida, escríbeme."
      }
    },
    en: {
      nav: { home: "Home", work: "Values", experience: "Experience", contact: "Contact" },
      hero: {
        status: "Open to Work",
        role: "IT Technician | DAM Student",
        description: "\"I'm not just code. I come from the world of systems (IT), Linux, and networks. Now I add programming to become a hybrid profile capable of understanding the entire infrastructure behind the software.\"",
        cta_primary: "What do I bring?",
        cta_secondary: "Download CV"
      },
      value: {
        title: "What do I bring?",
        subtitle: "A comprehensive technical approach: From hardware to code.",
        card1: {
          title: "Systems + Development",
          content: "Most programmers don't know what happens when their code leaves 'localhost'. Thanks to my IT background, I master Linux and Networks. I write software knowing where and how it will run."
        },
        card2: {
          title: "Learning Curve",
          content: "I successfully jumped from Hardware to Software. My mindset is constant technical resolution. If I don't know the answer, I know exactly how to find it."
        },
        card3: {
          title: "Soft Skills & Attitude",
          content: "Real experience in Helpdesk and customer service. I know how to translate technical problems into user language and work in a team without friction."
        },
        card4: {
          title: "Continuous Learning",
          content: "From AWS Cloud Foundations to Cybersecurity. My education doesn't stop in the classroom."
        }
      },
      tech: { title: "Tech Arsenal" },
      experience: {
        title: "Education & Experience",
        job1: "End-user technical support, OS troubleshooting, and ticket management.",
        honor: "With Honors"
      },
      contact: {
        title: "Let's talk",
        subtitle: "I'm looking for opportunities where I can apply my hybrid profile. If you're looking for a junior with a solid technical base, get in touch."
      }
    }
  };
  const t = translations[lang];

  return (
    <div className="text-white min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden relative cursor-none">
      <ScrollProgress />
      <CustomCursor />
      <SpaceBackground />
      <Starfield />
      <PlanetHorizon />
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <ValueProp t={t} />
        <TechStack t={t} />
        <Timeline t={t} />
      </main>
      <Footer t={t} />
      <AIChatTerminal t={t} />a
    </div>
  );
};

export default App;