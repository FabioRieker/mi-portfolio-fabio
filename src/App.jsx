import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';

// Components
import CustomCursor from './components/CustomCursor';
import SpaceBackground from './components/SpaceBackground';
import Starfield from './components/Starfield';
import PlanetHorizon from './components/PlanetHorizon';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueProp from './components/ValueProp';
import TechStack from './components/TechStack';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import AIChatTerminal from './components/AIChatTerminal';

// Traducciones y App principal
const App = () => {
  const [lang, setLang] = useState('es');
  const translations = {
    es: {
      nav: { home: "Inicio", work: "Valores", experience: "Trayectoria", contact: "Contactar" },
      hero: {
        status: "Disponible para contratación",
        role: "Técnico SMR | Estudiante DAM",
        description: "Enfocado en el desarrollo de aplicaciones y la administración de sistemas Linux. Busco crear soluciones prácticas uniendo programación e infraestructura.",
        cta_primary: "Ver Trayectoria",
        cta_secondary: "Descargar CV"
      },
      value: {
        title: "Desarrollo & Sistemas",
        subtitle: "Aprendizaje continuo en desarrollo y sistemas",
        card1: { title: "Desarrollo Backend", content: "Desarrollo backend con Java y Spring Boot. Enfocado en escribir código limpio y aprender buenas prácticas de diseño." },
        card2: { title: "Sistemas Linux", content: "Gestión de servidores Linux y scripting en Bash. Interés en la automatización y el control del sistema." },
        card3: { title: "Infraestructura Cloud", content: "Experiencia básica desplegando servicios en AWS y uso de Docker para crear entornos de desarrollo consistentes." },
        card4: { title: "Seguridad & Redes", content: "Interés en la seguridad informática y configuración de redes. Aprendiendo a proteger sistemas y comunicaciones." }
      },
      tech: { title: "Arsenal Tecnológico" },
      experience: {
        title: "Trayectoria Profesional",
        job1: "Soporte técnico de nivel 1 y 2, gestión de incidencias, administración de usuarios y mantenimiento de equipos informáticos.",
        honor: "Mención Honorífica"
      },
      contact: {
        title: "¿Listo para colaborar?",
        subtitle: "Busco oportunidades para seguir aprendiendo y aportar mis conocimientos en desarrollo y sistemas."
      }
    },
    en: {
      nav: { home: "Home", work: "Values", experience: "Career", contact: "Contact" },
      hero: {
        status: "Available for hire",
        role: "SMR Technician | DAM Student",
        description: "Focused on application development and Linux system administration. Aiming to build practical solutions by combining coding and infrastructure.",
        cta_primary: "View Career",
        cta_secondary: "Download CV"
      },
      value: {
        title: "Development & Systems",
        subtitle: "Continuous learning in development and systems",
        card1: { title: "Backend Development", content: "Backend development with Java and Spring Boot. Focused on writing clean code and learning design best practices." },
        card2: { title: "Linux Systems", content: "Linux server management and Bash scripting. Interested in automation and system control." },
        card3: { title: "Cloud Infrastructure", content: "Basic experience deploying services on AWS and using Docker for consistent development environments." },
        card4: { title: "Security & Networks", content: "Interest in cybersecurity and network configuration. Learning to secure systems and communications." }
      },
      tech: { title: "Tech Arsenal" },
      experience: {
        title: "Professional Career",
        job1: "Level 1 and 2 technical support, incident management, user administration, and computer equipment maintenance.",
        honor: "Honorary Mention"
      },
      contact: {
        title: "Ready to collaborate?",
        subtitle: "Seeking opportunities to continue learning and contributing my skills in development and systems."
      }
    }
  };

  const t = translations[lang];

  useEffect(() => {
    // Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen text-white selection:bg-cyan-500/30">
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
      <AIChatTerminal t={t} />
    </div>
  );
};

export default App;