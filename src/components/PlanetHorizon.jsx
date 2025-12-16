import React from 'react';

const PlanetHorizon = () => {
  return (
    <>
      <style>{`
        @keyframes horizonPulse {
          0%, 100% { box-shadow: 0 -10px 60px rgba(0, 243, 255, 0.5), 0 -20px 100px rgba(0, 243, 255, 0.2), inset 0 50px 100px rgba(0,0,0,0.9); }
          50% { box-shadow: 0 -15px 80px rgba(189, 0, 255, 0.6), 0 -30px 120px rgba(189, 0, 255, 0.3), inset 0 30px 80px rgba(0,0,0,0.8); }
        }
        .planet-glow { animation: horizonPulse 6s ease-in-out infinite; }
      `}</style>
      <div className="fixed bottom-[-75vh] left-[-50%] w-[200%] h-[100vh] rounded-[50%] bg-[#000] -z-10 pointer-events-none planet-glow opacity-100" />
      <div className="fixed bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-cyan-500/10 via-purple-500/5 to-transparent -z-10 pointer-events-none" />
    </>
  );
};

export default PlanetHorizon;
