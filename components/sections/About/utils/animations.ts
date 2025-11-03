/**
 * Animation utilities for About section
 * Provides scroll reveal and stagger animation configurations
 */

import { Variants } from 'framer-motion';

/**
 * Scroll reveal animation - fade in and slide up
 */
export const scrollRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom easing
    },
  },
};

/**
 * Stagger children animation
 * @param staggerDelay - Delay between each child animation (default: 0.1s)
 */
export const staggerContainerVariants = (staggerDelay: number = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

/**
 * Card animation - scale and fade in
 */
export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Hover animation for interactive elements
 */
export const hoverScaleVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.95,
  },
};

/**
 * Slide in from left animation
 */
export const slideInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Slide in from right animation
 */
export const slideInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Get animation configuration based on user's motion preference
 * Respects prefers-reduced-motion setting
 */
export const getAnimationConfig = () => {
  if (typeof window === 'undefined') return { shouldAnimate: true };

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  return {
    shouldAnimate: !prefersReducedMotion,
    duration: prefersReducedMotion ? 0 : undefined,
  };
};

/**
 * Intersection Observer options for scroll reveal
 */
export const scrollObserverOptions = {
  threshold: 0.1,
  triggerOnce: true,
  rootMargin: '-50px',
};
