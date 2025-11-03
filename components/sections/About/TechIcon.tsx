'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import type { TechIconProps } from './types';

// Lazy load BurstEffect
const BurstEffect = dynamic(() => import('@/components/ui/BurstEffect').then(mod => mod.BurstEffect), {
  ssr: false,
  loading: () => null,
});

export default function TechIcon({ tech, onClick, className = '' }: TechIconProps) {
  const [showBurst, setShowBurst] = useState(false);
  const [burstPosition, setBurstPosition] = useState({ x: 0, y: 0 });

  const handleClick = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setBurstPosition({ x, y });
    setShowBurst(true);

    // Reset burst after animation
    setTimeout(() => setShowBurst(false), 1000);

    // Call parent onClick if provided
    onClick?.(event);
  };

  return (
    <>
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className={`group relative flex flex-col items-center gap-2 p-3 rounded-xl glass hover:bg-accent-red/5 transition-all min-w-[100px] ${className}`}
      >
        {/* Logo Icon */}
        <div className="w-14 h-14 rounded-lg bg-accent-red/10 flex items-center justify-center group-hover:bg-accent-red/20 transition-colors">
          {tech.logoUrl || tech.logoSlug ? (
            <img
              src={tech.logoUrl || `https://cdn.simpleicons.org/${tech.logoSlug}`}
              alt={`${tech.name} logo`}
              className="w-7 h-7 brightness-0 invert opacity-70 group-hover:opacity-100 transition-all duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-7 h-7 rounded bg-accent-red/20" />
          )}
        </div>

        {/* Name */}
        <span className="text-xs font-medium text-text-primary group-hover:text-accent-red transition-colors whitespace-nowrap">
          {tech.name}
        </span>
      </motion.button>

      {/* Burst Effect */}
      {showBurst && (
        <BurstEffect
          trigger={showBurst}
          position={burstPosition}
          onComplete={() => setShowBurst(false)}
        />
      )}
    </>
  );
}
