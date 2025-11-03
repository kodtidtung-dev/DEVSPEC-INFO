/**
 * Contact Section Animations
 * Framer Motion variants for Contact components
 */

import { Variants } from 'framer-motion';

// Scroll reveal animation
export const scrollRevealVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Stagger container for form fields
export const staggerContainerVariants = (staggerDelay: number = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.2,
    },
  },
});

// Form field animation
export const formFieldVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1],
    },
  },
};

// Button hover animation
export const buttonHoverVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

// Social link hover animation
export const socialLinkVariants: Variants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.1,
    y: -4,
    transition: { duration: 0.3 },
  },
  tap: {
    scale: 0.9,
    transition: { duration: 0.1 },
  },
};

// Success/Error message animation
export const messageVariants: Variants = {
  initial: { opacity: 0, scale: 0.8, y: -20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: {
      duration: 0.3,
    },
  },
};

// Slide in from left
export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.32, 0.72, 0, 1],
    },
  },
};

// Slide in from right
export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.32, 0.72, 0, 1],
    },
  },
};
