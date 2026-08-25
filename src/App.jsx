import React, { useState, useEffect } from 'react';
import Terminal from './Terminal';
import { motion } from 'framer-motion';

const bootLines = [
  "BIOS Date 08/22/26 14:00:23 Ver 2.0.26",
  "CPU: Quantum Processing Unit @ 4.2GHz",
  "Memory Test: 65536K OK",
  "Initializing USB Controllers... Done.",
  "[ OK ] Started Docker Application Container Engine.",
  "Loading eBPF probes...",
  "Mounting Azure Key Vault secrets...",
  "Starting Kubernetes Kubelet...",
  "Establishing Zero-Trust Network...",
  "Welcome to VedantOS."
];

function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      setLines(prev => [...prev, bootLines[currentLine]]);
      currentLine++;
      if (currentLine >= bootLines.length) {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-black text-[#3fb950] font-mono p-4 text-sm md:text-base flex flex-col justify-end">
      <div className="space-y-1">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        {lines.length < bootLines.length && <div className="animate-pulse">_</div>}
      </div>
    </div>
  );
}

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isMatrix, setIsMatrix] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!isMatrix) return;
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array.from({length: columns}).fill(1);
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, [isMatrix]);

  if (isBooting) {
    return <BootSequence onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className={`relative min-h-screen bg-[#050505] text-green-400 font-mono overflow-hidden flex items-center justify-center p-4 ${isGlitching ? 'bg-red-900/20' : ''}`}>
      {/* Background Animated Grid */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#3fb950 1px, transparent 1px), linear-gradient(90deg, #3fb950 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {isMatrix && <canvas id="matrix-canvas" className="absolute inset-0 z-0 opacity-40"></canvas>}

      {/* Floating Glowing Orbs */}
      {!isMatrix && (
        <>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute top-1/4 left-1/4 w-96 h-96 ${isGlitching ? 'bg-red-500' : 'bg-green-500'} rounded-full mix-blend-screen filter blur-[128px] z-0`}
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${isGlitching ? 'bg-orange-600' : 'bg-blue-600'} rounded-full mix-blend-screen filter blur-[128px] z-0`}
          />
        </>
      )}

      {isGlitching && (
        <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center bg-red-900/40 backdrop-blur-sm">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0, 1, 0], scale: 1, x: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-6xl md:text-9xl font-black text-red-500 tracking-widest drop-shadow-[0_0_20px_#ef4444]"
          >
            UNAUTHORIZED
          </motion.h1>
        </div>
      )}

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <Terminal setMatrix={setIsMatrix} setGlitching={setIsGlitching} />
      </div>
    </div>
  );
}

export default App;
