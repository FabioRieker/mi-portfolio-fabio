// --- CONFIGURACIÓN DE ANIMACIONES FLUIDAS ---
// Usamos resortes (springs) en lugar de duración fija para suavidad extrema (Apple-style)
export const smoothSpring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1
};

export const entranceVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: smoothSpring
  }
};
