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
      nav: { home: "Inicio", about: "Sobre mí", work: "Valores", experience: "Trayectoria", contact: "Contactar" },
      hero: {
        status: "Disponible para contratación",
        role: "Técnico SMR | Estudiante DAM",
        description: "Especializado en el desarrollo de software robusto y la administración de sistemas Linux. Construyo soluciones escalables donde el código eficiente se encuentra con una infraestructura sólida.",
        cta_primary: "Ver Proyectos",
        cta_secondary: "Descargar CV"
      },
      value: {
        title: "Desarrollo & Sistemas",
        subtitle: "Un enfoque híbrido para problemas complejos",
        card1: { title: "Desarrollo Backend", content: "Arquitectura de software sólida con Java y Spring Boot. Código limpio, patrones de diseño y APIs RESTful optimizadas." },
        card2: { title: "Sistemas Linux", content: "Administración avanzada de servidores, scripting en Bash y automatización de tareas. Control total sobre el entorno de ejecución." },
        card3: { title: "Infraestructura Cloud", content: "Despliegue y gestión de servicios en AWS. Contenedorización con Docker para entornos consistentes y escalables." },
        card4: { title: "Seguridad & Redes", content: "Implementación de buenas prácticas de seguridad desde el diseño. Configuración de redes seguras y monitoreo de sistemas." }
      },
      tech: { title: "Arsenal Tecnológico" },
      experience: {
        title: "Trayectoria Profesional",
        job1: "Soporte técnico de nivel 1 y 2, gestión de incidencias, administración de usuarios y mantenimiento de equipos informáticos.",
        honor: "Mención Honorífica"
      },
      contact: {
        title: "¿Listo para colaborar?",
        subtitle: "Busco oportunidades donde pueda aplicar mi visión integral de desarrollo y sistemas para crear valor real."
      }
    },
    en: {
      nav: { home: "Home", about: "About", work: "Values", experience: "Career", contact: "Contact" },
      hero: {
        status: "Available for hire",
        role: "SMR Technician | DAM Student",
        description: "Specialized in robust software development and Linux system administration. Building scalable solutions where efficient code meets solid infrastructure.",
        cta_primary: "View Projects",
        cta_secondary: "Download CV"
      },
      value: {
        title: "Development & Systems",
        subtitle: "A hybrid approach to complex problems",
        card1: { title: "Backend Development", content: "Solid software architecture with Java and Spring Boot. Clean code, design patterns, and optimized RESTful APIs." },
        card2: { title: "Linux Systems", content: "Advanced server administration, Bash scripting, and task automation. Full control over the execution environment." },
        card3: { title: "Cloud Infrastructure", content: "Deployment and management of services on AWS. Containerization with Docker for consistent and scalable environments." },
        card4: { title: "Security & Networks", content: "Implementation of security best practices by design. Secure network configuration and system monitoring." }
      },
      tech: { title: "Tech Arsenal" },
      experience: {
        title: "Professional Career",
        job1: "Level 1 and 2 technical support, incident management, user administration, and computer equipment maintenance.",
        honor: "Honorary Mention"
      },
      contact: {
        title: "Ready to collaborate?",
        subtitle: "Seeking opportunities where I can apply my comprehensive vision of development and systems to create real value."
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