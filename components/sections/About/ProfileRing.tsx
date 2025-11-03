'use client';

import { motion } from 'framer-motion';

export default function ProfileRing() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center">
      {/* Orbital Ring 1 - Outer */}
      <motion.div
        className="absolute w-[120%] h-[120%] border-2 border-accent-red/30 rounded-full"
        style={{
          transform: 'rotateX(75deg) rotateZ(0deg)',
        }}
        animate={{
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Orbital Ring 2 - Middle */}
      <motion.div
        className="absolute w-[100%] h-[100%] border-2 border-accent-red/40 rounded-full"
        style={{
          transform: 'rotateX(75deg) rotateZ(120deg)',
        }}
        animate={{
          rotateZ: [120, 480],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Orbital Ring 3 - Inner */}
      <motion.div
        className="absolute w-[80%] h-[80%] border-2 border-accent-red/50 rounded-full"
        style={{
          transform: 'rotateX(75deg) rotateZ(240deg)',
        }}
        animate={{
          rotateZ: [240, 600],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Center glow effect */}
      <div className="absolute w-32 h-32 bg-accent-red/10 rounded-full blur-xl" />
    </div>
  );
}
