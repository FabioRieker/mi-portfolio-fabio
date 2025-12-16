import React from 'react';

/**
 * COMPONENTE: FONDO ESPACIAL
 */
const SpaceBackground = () => {
  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none bg-[#020205]">
      <style>{`
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(30px, -50px) scale(1.1); opacity: 0.5; }
          66% { transform: translate(-20px, 20px) scale(0.9); opacity: 0.3; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
        }
        .nebula-drift { animation: drift 20s ease-in-out infinite; }
        .nebula-drift-delayed { animation: drift 25s ease-in-out infinite reverse; }
      `}</style>
      {/* Removed will-change-transform to avoid potential rendering issues */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-purple-900/30 to-blue-900/10 blur-[100px] nebula-drift" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tl from-cyan-900/30 to-emerald-900/10 blur-[100px] nebula-drift-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-blue-950/5 blur-[120px] animate-pulse" style={{animationDuration: '8s'}} />
    </div>
  );
};

export default SpaceBackground;
