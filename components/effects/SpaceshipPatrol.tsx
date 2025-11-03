/**
 * Spaceship Patrol Component
 * Interactive spaceship that patrols across the screen
 */

'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { SpaceshipSVG } from '@/components/ui/SpaceshipSVG';
import {
  generateFigure8Path,
  generateRotationPath,
  getResponsivePadding,
  type PathPoint,
} from '@/components/utils/pathGenerator';

export default function SpaceshipPatrol() {
  // States
  const [isBoost, setIsBoost] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [pathPoints, setPathPoints] = useState<PathPoint[]>([]);
  const [rotations, setRotations] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [showMilestone, setShowMilestone] = useState(false);

  // Accessibility: Respect reduced motion preference
  const prefersReducedMotion = useReducedMotion();

  // Animation configuration
  const baseDuration = 25; // 25 seconds per loop
  const boostDuration = baseDuration / 2; // 2x speed during boost
  const currentDuration = isBoost ? boostDuration : baseDuration;

  // Generate responsive path on mount and resize
  useEffect(() => {
    setIsMounted(true);

    const updatePath = () => {
      if (typeof window === 'undefined') return;

      const padding = getResponsivePadding(window.innerWidth);
      const points = generateFigure8Path(window.innerWidth, window.innerHeight, padding);
      const rotationPath = generateRotationPath(points);

      setPathPoints(points);
      setRotations(rotationPath);
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, []);

  // Handle spaceship click
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      // Trigger boost
      setIsBoost(true);
      setClickCount((prev) => prev + 1);

      // Confetti burst at click position
      confetti({
        particleCount: 25,
        spread: 70,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: ['#FF3333', '#FF5555', '#FF8888', '#FFFFFF'],
        scalar: 0.8,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 25,
      });

      // Haptic feedback on mobile
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }

      // Show milestone every 10 clicks
      if ((clickCount + 1) % 10 === 0) {
        setShowMilestone(true);
        setTimeout(() => setShowMilestone(false), 3000);
      }

      // Reset boost after 2 seconds
      setTimeout(() => setIsBoost(false), 2000);
    },
    [clickCount]
  );

  // Handle keyboard interaction
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick(e as any);
      }
    },
    [handleClick]
  );

  // Don't render if user prefers reduced motion
  if (prefersReducedMotion || !isMounted || pathPoints.length === 0) {
    return null;
  }

  // Extract x, y coordinates for animation
  const xPath = pathPoints.map((p) => p.x);
  const yPath = pathPoints.map((p) => p.y);

  return (
    <>
      {/* Spaceship Container */}
      <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
        {/* Spaceship with animation */}
        <motion.div
          className="absolute pointer-events-auto cursor-pointer"
          style={{
            willChange: 'transform',
          }}
          animate={{
            x: xPath,
            y: yPath,
            rotate: rotations,
          }}
          transition={{
            duration: currentDuration,
            repeat: Infinity,
            ease: 'linear',
            times: pathPoints.map((_, i) => i / pathPoints.length),
          }}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          tabIndex={0}
          role="button"
          aria-label={`Interactive spaceship - ${clickCount} clicks. Press Enter or Space to boost.`}
        >
          {/* Spaceship SVG */}
          <div className="relative">
            <SpaceshipSVG className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14" isBoost={isBoost} />

            {/* Particle Trail Effect */}
            <AnimatePresence>
              {Array.from({ length: isBoost ? 5 : 3 }).map((_, i) => (
                <motion.div
                  key={`trail-${i}`}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: isBoost ? [0.8, 0] : [0.5, 0],
                    scale: isBoost ? [1, 3] : [1, 2],
                    y: [0, 20 + i * 10],
                  }}
                  transition={{
                    duration: isBoost ? 0.4 : 0.6,
                    repeat: Infinity,
                    delay: i * (isBoost ? 0.08 : 0.12),
                    ease: 'easeOut',
                  }}
                >
                  <div
                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, #FF5555, #FF3333)',
                      boxShadow: isBoost
                        ? '0 0 15px rgba(255, 51, 51, 0.8)'
                        : '0 0 10px rgba(255, 51, 51, 0.6)',
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Focus Indicator for Accessibility */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-accent-red opacity-0 pointer-events-none"
              animate={{
                opacity: 0,
                scale: [1, 1.3],
              }}
              whileFocus={{
                opacity: [0.5, 0],
                scale: [1, 1.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Click Counter Milestone */}
      <AnimatePresence>
        {showMilestone && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-24 right-6 sm:top-28 sm:right-10 z-50 pointer-events-none"
          >
            <div className="glass rounded-full border border-accent-red/30 bg-accent-red/10 px-5 py-2.5 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-2">
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  🚀
                </motion.span>
                <span className="text-sm font-bold text-accent-red sm:text-base">
                  {clickCount} Boosts!
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
