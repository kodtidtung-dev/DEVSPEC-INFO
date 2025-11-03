/**
 * Animation utilities for Projects section
 * Provides scroll reveal, flip, and stagger animation configurations
 */

import { Variants } from 'framer-motion';

/**
 * Scroll reveal animation - fade in and slide up
 * Matches About section pattern
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
 * Card animation - scale and fade in
 * Used for project cards on initial load
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
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Stagger children animation
 * @param staggerDelay - Delay between each child animation (default: 0.15s)
 */
export const staggerContainerVariants = (staggerDelay: number = 0.15): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

/**
 * Flip card front animation
 * Rotates from 0 to 90 degrees on exit
 */
export const flipFrontVariants: Variants = {
  initial: {
    rotateY: 0,
  },
  exit: {
    rotateY: 90,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
};

/**
 * Flip card back animation
 * Rotates from -90 to 0 degrees on enter
 */
export const flipBackVariants: Variants = {
  initial: {
    rotateY: -90,
  },
  animate: {
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
};

/**
 * Hover animation for featured project card
 * Scale and translate on hover
 */
export const featuredCardHoverVariants: Variants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Button hover animation
 * Scale up slightly on hover
 */
export const buttonHoverVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
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
