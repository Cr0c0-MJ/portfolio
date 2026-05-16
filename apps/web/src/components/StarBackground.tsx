'use client';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

const DARK_LINES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x1: `${(i * 7.3) % 100}%`,
  y1: `${(i * 13.7) % 100}%`,
  x2: `${(i * 17.1 + 30) % 100}%`,
  y2: `${(i * 11.3 + 20) % 100}%`,
}));

export function StarBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Network lines — dark mode only */}
      <svg className="absolute inset-0 w-full h-full opacity-0 dark:opacity-20">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        {DARK_LINES.map((l) => (
          <motion.line
            key={`line-${l.id}`}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: l.id * 0.1, repeat: Infinity, repeatType: 'reverse' }}
          />
        ))}
      </svg>

      {/* Dots — amber-400 in light, amber-200 in dark */}
      {particles.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-amber-300 dark:bg-amber-200"
          style={{ left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px` }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: star.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Glowing orbs — dark mode only */}
      <div className="hidden dark:block">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl"
          style={{ top: '20%', left: '10%' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
          style={{ bottom: '20%', right: '10%' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}
