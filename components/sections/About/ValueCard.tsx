'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ValueCardProps } from './types';
import { cardVariants } from './utils/animations';

// Micro animation variants for each value
const getMicroAnimation = (valueId: string) => {
  switch (valueId) {
    case 'clean-code':
      // Sparkle effect - subtle pulse every 6-8s
      return {
        scale: [1, 1.15, 1],
        filter: [
          'drop-shadow(0 0 0px rgba(255, 255, 255, 0))',
          'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))',
          'drop-shadow(0 0 0px rgba(255, 255, 255, 0))',
        ],
      };
    case 'user-first':
      // Target pulses gently toward center (zoom in/out)
      return {
        scale: [1, 1.08, 1],
        rotate: [0, -2, 2, 0],
      };
    case 'continuous-learning':
      // Stack layers move up/down gently
      return {
        y: [0, -3, 0, 3, 0],
      };
    case 'performance':
      // Lightning flash glow
      return {
        filter: [
          'drop-shadow(0 0 0px rgba(255, 215, 0, 0))',
          'drop-shadow(0 0 12px rgba(255, 215, 0, 0.8))',
          'drop-shadow(0 0 0px rgba(255, 215, 0, 0))',
        ],
      };
    default:
      return {};
  }
};

const getTransitionConfig = (valueId: string) => {
  switch (valueId) {
    case 'clean-code':
      return {
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 5, // 6-8s total cycle
        ease: 'easeInOut' as const,
      };
    case 'user-first':
      return {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      };
    case 'continuous-learning':
      return {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      };
    case 'performance':
      return {
        duration: 0.2,
        repeat: Infinity,
        repeatDelay: 3,
        ease: 'easeInOut' as const,
      };
    default:
      return {};
  }
};

export default function ValueCard({ value, delay = 0, className = '' }: ValueCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const microAnimation = getMicroAnimation(value.id);
  const transitionConfig = getTransitionConfig(value.id);

  // Special hover animation for user-first (target moves to center)
  const getHoverAnimation = () => {
    if (value.id === 'user-first') {
      return { scale: 1.1, x: [0, -2, 2, -2, 0], y: [0, -2, 2, -2, 0] };
    }
    return { scale: 1.05 };
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay }}
      className={`relative h-auto min-h-[220px] sm:min-h-[240px] md:h-64 ${className}`}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <AnimatePresence mode="wait">
        {!isFlipped ? (
          // Front side
          <motion.div
            key="front"
            initial={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 p-5 sm:p-6 rounded-2xl glass cursor-pointer flex flex-col items-center justify-center text-center"
          >
            {/* Emoji with micro animation */}
            <motion.div
              className="text-5xl sm:text-6xl mb-4"
              animate={microAnimation}
              transition={transitionConfig}
              whileHover={getHoverAnimation()}
            >
              {value.emoji}
            </motion.div>

            {/* Title */}
            <h4 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
              {value.title}
            </h4>

            {/* Description */}
            <p className="text-text-secondary font-medium">
              {value.description}
            </p>

            {/* Hover hint */}
            <p className="text-xs text-text-secondary/60 mt-4">
              Hover or tap for details
            </p>
          </motion.div>
        ) : (
          // Back side with details
          <motion.div
            key="back"
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 p-6 rounded-2xl glass bg-accent-red/10 cursor-pointer flex flex-col justify-center"
          >
            {/* Small emoji */}
            <div className="text-3xl mb-3">{value.emoji}</div>

            {/* Title */}
            <h4 className="text-xl font-bold text-accent-red mb-3">
              {value.title}
            </h4>

            {/* Details */}
            <p className="text-text-primary leading-relaxed">
              {value.details || value.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
