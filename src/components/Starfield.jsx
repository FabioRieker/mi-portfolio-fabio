import React, { useEffect, useRef } from 'react';

/**
 * COMPONENTE: STARFIELD
 */
const Starfield = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true }); // Changed to alpha: true for transparency
    let width, height;
    let stars = [];
    let shootingStars = [];
    let animationFrameId;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const count = Math.min(Math.floor((width * height) / 6000), 200); // Límite de estrellas para FPS
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 2 + 0.5,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random(),
          baseOpacity: Math.random() * 0.4 + 0.4,
          twinkleSpeed: Math.random() * 0.01 + 0.002
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
        this.speed = Math.random() * 10 + 5; // Velocidad ligeramente reducida para suavidad
        this.vx = this.speed;
        this.vy = Math.random() * 2 - 1;
        this.opacity = 1;
        this.active = true;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= 0.02;
        if (this.x > width + 200 || this.y > height + 200 || this.opacity <= 0) this.active = false;
      }
      draw() {
        if (!this.active) return;
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x - this.length, this.y - (this.vy * (this.length/this.vx)));
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length, this.y - (this.vy * (this.length/this.vx)));
        ctx.stroke();
      }
    }

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height); // Clear transparent
      
      // Removed black fillRect to allow SpaceBackground to show through

      const cx = width / 2;
      const cy = height / 2;
      const moveX = (mouseRef.current.x - cx) * 0.02; // Parallax reducido para menos jitter
      const moveY = (mouseRef.current.y - cy) * 0.02;

      stars.forEach(star => {
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < star.baseOpacity) star.twinkleSpeed = -star.twinkleSpeed;
        
        // Optimización: Dibujar solo si es visible
        if (star.opacity <= 0) return;

        let dx = star.x - moveX * star.z;
        let dy = star.y - moveY * star.z;
        
        // Wrap simple
        const drawX = ((dx % width) + width) % width;
        const drawY = ((dy % height) + height) % height;
        
        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow (Solo para estrellas grandes para ahorrar recursos)
        if (star.size > 1.8) {
            ctx.shadowBlur = 4;
            ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
            ctx.fill();
            ctx.shadowBlur = 0;
        }
      });
      ctx.globalAlpha = 1; // Reset alpha

      if (Math.random() < 0.015) shootingStars.push(new ShootingStar());
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

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none mix-blend-screen" />;
};

export default Starfield;
