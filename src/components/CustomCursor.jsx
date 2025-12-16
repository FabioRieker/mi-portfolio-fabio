import React, { useState, useEffect, useRef } from 'react';

/**
 * COMPONENTE: CURSOR PERSONALIZADO (OPTIMIZADO)
 */
const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const dotPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      // Detección más agresiva de elementos interactivos
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.interactive'); // Clase auxiliar por si acaso
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
      // Movimiento del punto (Instantáneo para respuesta rápida)
      dotPosRef.current.x = mouseRef.current.x;
      dotPosRef.current.y = mouseRef.current.y;

      // Movimiento del anillo (Interpolación más suave "Lerp")
      // Ajustado el factor a 0.2 para mayor fluidez visual vs lag
      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.2;
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.2;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${dotPosRef.current.x}px, ${dotPosRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate(-50%, -50%)`;
      }

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
  }, [isVisible]);

  const ringClasses = `fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border mix-blend-difference flex items-center justify-center backdrop-blur-[1px] transition-[width,height,opacity] duration-300 ease-out will-change-transform ${
    isHovering ? "w-16 h-16 bg-cyan-400/10 border-cyan-400/50" : "w-8 h-8 bg-transparent border-cyan-400"
  } ${isVisible ? 'opacity-100' : 'opacity-0'}`;

  const dotClasses = `fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-cyan-400 mix-blend-difference transition-[width,height,opacity] duration-300 ease-out will-change-transform ${
    isHovering ? "w-0 h-0 opacity-0" : "w-2 h-2 opacity-100"
  } ${isVisible ? 'opacity-100' : 'opacity-0'}`;

  return (
    <div className="hidden md:block">
      <div ref={cursorDotRef} className={dotClasses} />
      <div ref={cursorRingRef} className={ringClasses}>
        <div className={`w-full h-full rounded-full border border-white/20 animate-ping absolute inset-0 ${isHovering ? 'opacity-30' : 'opacity-0'}`} />
      </div>
    </div>
  );
};

export default CustomCursor;
