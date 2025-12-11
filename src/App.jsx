import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Server, 
  Code2, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Mail, 
  Linkedin, 
  Github, 
  ChevronRight, 
  Download, 
  Menu, 
  X,
  Languages
} from 'lucide-react';

/**
 * COMPONENTE: FONDO ESPACIAL (NEBULOSAS VIVAS)
 * Fondo base con animaciones de color (Nebulosas) que se mueven suavemente.
 */
const SpaceBackground = () => {
  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none bg-[#020205]">
      {/* Estilos para la animación de deriva de las nebulosas */}
      <style>{`
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(30px, -50px) scale(1.1); opacity: 0.5; }
          66% { transform: translate(-20px, 20px) scale(0.9); opacity: 0.3; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
        }
        .nebula-drift { animation: drift 15s ease-in-out infinite; }
        .nebula-drift-delayed { animation: drift 20s ease-in-out infinite reverse; }
      `}</style>

      {/* Nebulosa Superior Izquierda (Púrpura/Azul) */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-purple-900/30 to-blue-900/10 blur-[100px] nebula-drift" />
      
      {/* Nebulosa Inferior Derecha (Cyan/Verde) */}
      <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tl from-cyan-900/30 to-emerald-900/10 blur-[100px] nebula-drift-delayed" />
      
      {/* Centro Brillante sutil para dar profundidad */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-blue-950/5 blur-[120px] animate-pulse" style={{animationDuration: '8s'}} />
    </div>
  );
};

/**
 * COMPONENTE: STARFIELD BACKGROUND CON PARALLAX 3D
 * Capa de estrellas interactiva que reacciona al movimiento del ratón.
 */
const Starfield = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];
    let shootingStars = [];
    let animationFrameId;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const count = Math.floor((width * height) / 5000); // Densidad de estrellas
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 2 + 0.5, // Profundidad Z para parallax
          size: Math.random() * 2 + 0.5,
          opacity: Math.random(),
          baseOpacity: Math.random() * 0.4 + 0.4, // Brillo base más alto para visibilidad
          twinkleSpeed: Math.random() * 0.02 + 0.005
        });
      }
    };

    class ShootingStar {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height * 0.5;
        this.length = Math.random() * 100 + 50;
        this.speed = Math.random() * 15 + 10;
        this.vx = this.speed;
        this.vy = Math.random() * 2 - 1;
        this.opacity = 1;
        this.active = true;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= 0.015;
        if (this.x > width + 200 || this.y > height + 200 || this.opacity <= 0) this.active = false;
      }
      draw() {
        if (!this.active) return;
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x - this.length, this.y - (this.vy * (this.length/this.vx)));
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length, this.y - (this.vy * (this.length/this.vx)));
        ctx.stroke();
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      
      // Movimiento Parallax
      const moveX = (mouseRef.current.x - cx) * 0.05;
      const moveY = (mouseRef.current.y - cy) * 0.05;

      stars.forEach(star => {
        // Parpadeo
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < star.baseOpacity) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }
        
        ctx.globalAlpha = Math.max(0, Math.min(1, star.opacity));
        ctx.fillStyle = 'white';
        
        // Aplicar Parallax
        let dx = star.x - moveX * star.z;
        let dy = star.y - moveY * star.z;
        
        // Wrap around (bucle infinito)
        const drawX = (dx % width + width) % width;
        const drawY = (dy % height + height) % height;
        
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow en estrellas grandes
        if (star.size > 1.5) {
            ctx.shadowBlur = 4;
            ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
            ctx.fill();
            ctx.shadowBlur = 0;
        }
      });

      // Generar estrellas fugaces aleatoriamente
      if (Math.random() < 0.02) shootingStars.push(new ShootingStar());
      
      shootingStars.forEach((star, index) => {
        star.update();
        star.draw();
        if (!star.active) shootingStars.splice(index, 1);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none bg-transparent" />
  );
};

/**
 * COMPONENTE: PLANET HORIZON
 * Efecto de horizonte brillante en la parte inferior.
 */
const PlanetHorizon = () => {
  return (
    <>
      <style>{`
        @keyframes horizonPulse {
          0%, 100% { 
            box-shadow: 0 -10px 60px rgba(0, 243, 255, 0.5), 0 -20px 100px rgba(0, 243, 255, 0.2), inset 0 50px 100px rgba(0,0,0,0.9);
          }
          50% { 
            box-shadow: 0 -15px 80px rgba(189, 0, 255, 0.6), 0 -30px 120px rgba(189, 0, 255, 0.3), inset 0 30px 80px rgba(0,0,0,0.8);
          }
        }
        .planet-glow { animation: horizonPulse 6s ease-in-out infinite; }
      `}</style>
      <div className="fixed bottom-[-75vh] left-[-50%] w-[200%] h-[100vh] rounded-[50%] bg-[#000] -z-10 pointer-events-none planet-glow opacity-100" />
      <div className="fixed bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-cyan-500/10 via-purple-500/5 to-transparent -z-10 pointer-events-none" />
    </>
  );
};

/**
 * COMPONENTE: LIQUID CRYSTAL CARD
 * Tarjeta con efecto glassmorphism y bordes brillantes.
 */
const LiquidCard = ({ children, className = "" }) => {
  return (
    <div className={`
      relative overflow-hidden rounded-3xl
      bg-white/5 backdrop-blur-2xl backdrop-saturate-150
      border border-white/10
      shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
      transition-all duration-500
      hover:bg-white/10 hover:border-white/20 hover:shadow-[0_15px_40px_0_rgba(0,243,255,0.15)]
      hover:-translate-y-2
      group
      ${className}
    `}>
      {/* Brillo interior en hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      {/* Borde superior brillante */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/**
 * COMPONENTE: NAVBAR
 */
const Navbar = ({ lang, setLang, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.work, href: "#work" },
    { name: t.nav.experience, href: "#experience" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`
          backdrop-blur-xl bg-black/20 border border-white/10 rounded-full px-6 py-3 
          flex items-center justify-between shadow-lg shadow-cyan-500/5
          transition-all duration-300
          ${scrolled ? 'bg-black/80 border-white/10 shadow-purple-500/20' : ''}
        `}>
          
          <a href="#home" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 hover:brightness-125 transition-all">
            FR.
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full box-shadow-[0_0_10px_cyan]"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="flex items-center gap-2 text-xs font-medium bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full text-zinc-300 transition-colors border border-white/5"
            >
              <Languages size={14} />
              {lang.toUpperCase()}
            </button>
            <a 
              href="#contact"
              className="text-xs font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-cyan-50 hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all duration-300 transform hover:scale-105"
            >
              {t.nav.contact}
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-24 left-4 right-4 bg-black/90 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl md:hidden z-50 animate-fade-in-up">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-zinc-300 hover:text-white"
            >
              {link.name}
            </a>
          ))}
          <div className="h-px bg-white/10 my-2"></div>
          <button 
            onClick={() => { setLang(lang === 'es' ? 'en' : 'es'); setIsOpen(false); }}
            className="flex items-center gap-2 text-zinc-400"
          >
            <Languages size={18} /> Cambiar Idioma
          </button>
        </div>
      )}
    </nav>
  );
};

/**
 * COMPONENTE: HERO
 */
const Hero = ({ t }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-visible">
      <div className="max-w-4xl mx-auto px-6 text-center z-10">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-medium mb-8 backdrop-blur-md animate-fade-in-up hover:bg-white/10 transition-colors cursor-default shadow-lg shadow-cyan-900/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          {t.hero.status}
        </div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-6 animate-fade-in-up delay-100 drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]">
          Fabio Rieker
          <span className="block text-2xl md:text-4xl mt-4 font-light text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-500">
            {t.hero.role}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200 drop-shadow-md">
          {t.hero.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <a href="#work" className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all flex items-center justify-center gap-2">
            {t.hero.cta_primary} <ChevronRight size={18} />
          </a>
          <a href="/cv.pdf" target="_blank" className="w-full sm:w-auto px-8 py-3.5 bg-white/5 text-white border border-white/20 font-medium rounded-full hover:bg-white/10 hover:border-white/40 backdrop-blur-md transition-all flex items-center justify-center gap-2 group hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
            {t.hero.cta_secondary}
          </a>
        </div>
      </div>
    </section>
  );
};

/**
 * COMPONENTE: VALUE PROP
 */
const ValueProp = ({ t }) => {
  return (
    <section id="work" className="py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{t.value.title}</h2>
          <p className="text-zinc-400 text-lg">{t.value.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LiquidCard className="md:col-span-2 p-8 md:p-10">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
              <Server size={180} />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all">
                <Cpu size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">{t.value.card1.title}</h3>
            </div>
            <p className="text-zinc-300 mb-8 leading-relaxed text-lg relative z-10">
              {t.value.card1.content}
            </p>
            <div className="inline-flex items-center gap-3 text-sm font-mono text-cyan-400 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-cyan-500/20 shadow-inner group-hover:border-cyan-500/50 transition-colors">
              <Terminal size={14} />
              <span>fabio@linux:~$</span> 
              <span className="text-white typing-effect">./init_dev_env.sh</span>
            </div>
          </LiquidCard>

          <LiquidCard className="p-8 md:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all">
                <Code2 size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">{t.value.card2.title}</h3>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              {t.value.card2.content}
            </p>
          </LiquidCard>

           <LiquidCard className="p-8 md:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all">
                <Globe size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">{t.value.card3.title}</h3>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              {t.value.card3.content}
            </p>
          </LiquidCard>

          <LiquidCard className="md:col-span-2 p-8 md:p-10 bg-gradient-to-br from-white/5 to-white/[0.02]">
             <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">{t.value.card4.title}</h3>
                  <p className="text-zinc-300 mb-6">
                    {t.value.card4.content}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="text-sm bg-white/5 border border-white/20 rounded-full px-4 py-1.5 text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-default">AWS Cloud</span>
                    <span className="text-sm bg-white/5 border border-white/20 rounded-full px-4 py-1.5 text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-default">Cybersecurity</span>
                    <span className="text-sm bg-white/5 border border-white/20 rounded-full px-4 py-1.5 text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-default">Linux SMR</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform">
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

/**
 * COMPONENTE: TIMELINE
 */
const Timeline = ({ t }) => {
  return (
    <section id="experience" className="py-32 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center drop-shadow-md">{t.experience.title}</h2>
        
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-cyan-500/50 bg-[#020205] shadow-[0_0_15px_rgba(6,182,212,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
               <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:border-cyan-500/30 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-white text-lg">IT Helpdesk Support</h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">2025 - Present</span>
              </div>
              <p className="text-zinc-400 text-sm mb-3">Universidad Nebrija (Prácticas)</p>
              <p className="text-zinc-500 text-sm">
                {t.experience.job1}
              </p>
            </div>
          </div>

          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-purple-500/50 bg-[#020205] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:border-purple-500/30 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-white text-lg">DAM (Desarrollo Apps)</h3>
                <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">2025 - Act.</span>
              </div>
              <p className="text-zinc-400 text-sm">Instituto Nebrija</p>
            </div>
          </div>

          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700 bg-[#020205] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <div className="w-2 h-2 bg-zinc-500 rounded-full"></div>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:border-white/30 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-white text-lg">SMR (Sistemas Micro.)</h3>
                <span className="text-xs font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded">2023 - 2025</span>
              </div>
              <p className="text-zinc-400 text-sm mb-2">IES Virgen de la Paloma</p>
              <span className="inline-block px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-500 text-xs border border-yellow-500/20">
                {t.experience.honor}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/**
 * COMPONENTE: FOOTER
 */
const Footer = ({ t }) => {
  return (
    <footer id="contact" className="py-20 border-t border-white/5 bg-[#020205] relative z-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">{t.contact.title}</h2>
        <p className="text-zinc-400 mb-10 max-w-md mx-auto">{t.contact.subtitle}</p>
        
        <div className="flex justify-center gap-6 mb-12">
          <a href="mailto:fabiorieker@gmail.com" className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5 hover:border-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            <Mail size={24} />
          </a>
          <a href="https://linkedin.com/in/fabio-rieker/" target="_blank" className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5 hover:border-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,119,181,0.4)]">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/FabioRieker" target="_blank" className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5 hover:border-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            <Github size={24} />
          </a>
        </div>

        <p className="text-zinc-600 text-sm">
          &copy; 2025 Fabio Rieker. Madrid, España.
        </p>
      </div>
    </footer>
  );
};

/**
 * APLICACIÓN PRINCIPAL
 */
const App = () => {
  const [lang, setLang] = useState('es');

  // Traducciones
  const translations = {
    es: {
      nav: { home: "Inicio", about: "Sobre mí", work: "Valores", experience: "Trayectoria", contact: "Contactar" },
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
      nav: { home: "Home", about: "About", work: "Values", experience: "Timeline", contact: "Contact" },
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
    <div className="text-white min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden relative">
      <SpaceBackground />
      <Starfield />
      <PlanetHorizon />
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <ValueProp t={t} />
        <Timeline t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
};

export default App;
