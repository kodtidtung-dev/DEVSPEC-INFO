/**
 * Spaceship SVG Component
 * Custom spaceship design with red accent theme
 */

'use client';

import { motion } from 'framer-motion';

interface SpaceshipSVGProps {
  className?: string;
  isBoost?: boolean;
}

export function SpaceshipSVG({ className = '', isBoost = false }: SpaceshipSVGProps) {
  return (
    <svg
      viewBox="0 0 60 70"
      className={className}
      style={{
        filter: isBoost
          ? 'drop-shadow(0 0 25px rgba(255, 51, 51, 0.9)) drop-shadow(0 0 40px rgba(255, 51, 51, 0.6))'
          : 'drop-shadow(0 0 10px rgba(255, 51, 51, 0.5)) drop-shadow(0 0 20px rgba(255, 85, 85, 0.3))',
        transition: 'filter 0.3s ease',
      }}
    >
      {/* Gradient Definitions */}
      <defs>
        {/* Body Gradient - White with subtle shading */}
        <linearGradient id="shuttleBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F8F8F8" />
          <stop offset="100%" stopColor="#E8E8E8" />
        </linearGradient>

        {/* Cockpit Gradient - Cyan/Blue glass */}
        <radialGradient id="cockpitGlass" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#AAEEFF" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#66CCFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3399DD" stopOpacity="0.85" />
        </radialGradient>

        {/* Red Stripe Gradient */}
        <linearGradient id="redStripe" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF4444" />
          <stop offset="100%" stopColor="#CC0000" />
        </linearGradient>

        {/* Thruster Flame - Red to Pink */}
        <radialGradient id="flameGradient" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#FFDDDD" />
          <stop offset="30%" stopColor="#FF6666" />
          <stop offset="70%" stopColor="#FF3366" />
          <stop offset="100%" stopColor="#DD0033" />
        </radialGradient>

        {/* Wing Shadow */}
        <linearGradient id="wingShadow" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#CCCCCC" />
        </linearGradient>
      </defs>

      {/* Main Wings (Behind body) */}
      {/* Left Wing */}
      <path
        d="M30 20 L10 45 L15 42 L30 35 Z"
        fill="url(#wingShadow)"
        stroke="#999999"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Wing Accent - Left */}
      <path d="M30 22 L15 42 L20 40 L30 33 Z" fill="rgba(255, 255, 255, 0.3)" stroke="none" />
      <line x1="30" y1="25" x2="18" y2="42" stroke="#CCCCCC" strokeWidth="0.8" opacity="0.6" />

      {/* Right Wing */}
      <path
        d="M30 20 L50 45 L45 42 L30 35 Z"
        fill="url(#wingShadow)"
        stroke="#999999"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Wing Accent - Right */}
      <path d="M30 22 L45 42 L40 40 L30 33 Z" fill="rgba(255, 255, 255, 0.3)" stroke="none" />
      <line x1="30" y1="25" x2="42" y2="42" stroke="#CCCCCC" strokeWidth="0.8" opacity="0.6" />

      {/* Main Body - Space Shuttle Shape */}
      <path
        d="M30 5 L40 45 L30 43 L20 45 Z"
        fill="url(#shuttleBody)"
        stroke="#DDDDDD"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Body Highlight (3D effect) */}
      <path d="M30 5 L38 45 L30 43 Z" fill="rgba(255, 255, 255, 0.25)" stroke="none" />

      {/* Body Shadow (3D effect) */}
      <path d="M30 5 L22 45 L30 43 Z" fill="rgba(0, 0, 0, 0.06)" stroke="none" />

      {/* Center Red Stripe */}
      <path
        d="M30 15 L32 44 L30 43.5 L28 44 Z"
        fill="url(#redStripe)"
        stroke="none"
      />

      {/* Cockpit Window - Top */}
      <ellipse
        cx="30"
        cy="12"
        rx="5"
        ry="7"
        fill="url(#cockpitGlass)"
        stroke="#5599CC"
        strokeWidth="1"
      />

      {/* Cockpit Highlight (Glass reflection) */}
      <ellipse cx="28" cy="10" rx="2.5" ry="3.5" fill="rgba(255, 255, 255, 0.6)" />
      <ellipse cx="28.5" cy="9" rx="1.2" ry="1.8" fill="rgba(255, 255, 255, 0.9)" />

      {/* Body Panel Lines */}
      <line x1="26" y1="25" x2="34" y2="25" stroke="rgba(0, 0, 0, 0.1)" strokeWidth="0.8" />
      <line x1="25" y1="32" x2="35" y2="32" stroke="rgba(0, 0, 0, 0.1)" strokeWidth="0.8" />

      {/* Thruster Housing */}
      <rect
        x="22"
        y="44"
        width="16"
        height="5"
        rx="1"
        fill="#DDDDDD"
        stroke="#999999"
        strokeWidth="1"
      />

      {/* Thruster Nozzle */}
      <ellipse cx="30" cy="47" rx="6" ry="2" fill="#666666" stroke="#444444" strokeWidth="0.8" />

      {/* Main Thruster Flame */}
      <motion.ellipse
        cx="30"
        cy={isBoost ? "54" : "52"}
        rx={isBoost ? "10" : "8"}
        ry={isBoost ? "12" : "9"}
        fill="url(#flameGradient)"
        opacity={isBoost ? 0.95 : 0.85}
        animate={{
          scaleY: isBoost ? [1, 1.5, 1] : [1, 1.3, 1],
          opacity: isBoost ? [0.95, 0.85, 0.95] : [0.85, 0.7, 0.85],
        }}
        transition={{
          duration: isBoost ? 0.2 : 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Inner Flame Core - Bright Center */}
      <motion.ellipse
        cx="30"
        cy={isBoost ? "53" : "51"}
        rx={isBoost ? "7" : "5"}
        ry={isBoost ? "9" : "7"}
        fill="#FFAAAA"
        opacity={isBoost ? 0.9 : 0.8}
        animate={{
          scaleY: isBoost ? [1, 1.4, 1] : [1, 1.2, 1],
          opacity: isBoost ? [0.9, 1, 0.9] : [0.8, 0.9, 0.8],
        }}
        transition={{
          duration: isBoost ? 0.15 : 0.3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Side Flames - Left */}
      <motion.ellipse
        cx="24"
        cy={isBoost ? "53" : "52"}
        rx={isBoost ? "4" : "3"}
        ry={isBoost ? "6" : "4.5"}
        fill="#FF5577"
        opacity={isBoost ? 0.8 : 0.7}
        animate={{
          scaleY: isBoost ? [1, 1.3, 1] : [1, 1.2, 1],
          opacity: isBoost ? [0.8, 0.6, 0.8] : [0.7, 0.5, 0.7],
        }}
        transition={{
          duration: isBoost ? 0.25 : 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.05,
        }}
      />

      {/* Side Flames - Right */}
      <motion.ellipse
        cx="36"
        cy={isBoost ? "53" : "52"}
        rx={isBoost ? "4" : "3"}
        ry={isBoost ? "6" : "4.5"}
        fill="#FF5577"
        opacity={isBoost ? 0.8 : 0.7}
        animate={{
          scaleY: isBoost ? [1, 1.3, 1] : [1, 1.2, 1],
          opacity: isBoost ? [0.8, 0.6, 0.8] : [0.7, 0.5, 0.7],
        }}
        transition={{
          duration: isBoost ? 0.25 : 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.1,
        }}
      />

      {/* Boost Wave Effects */}
      {isBoost && (
        <>
          {/* Outer Wave - Pink */}
          <motion.ellipse
            cx="30"
            cy="58"
            rx="14"
            ry="16"
            fill="#FF6699"
            opacity="0.5"
            animate={{
              scaleY: [1, 2.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />

          {/* Middle Wave - Light Pink */}
          <motion.ellipse
            cx="30"
            cy="57"
            rx="12"
            ry="14"
            fill="#FFAACC"
            opacity="0.6"
            animate={{
              scaleY: [1, 2, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 0.1,
            }}
          />

          {/* Inner Wave - Bright */}
          <motion.ellipse
            cx="30"
            cy="56"
            rx="10"
            ry="12"
            fill="#FFDDEE"
            opacity="0.7"
            animate={{
              scaleY: [1, 1.8, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 0.15,
            }}
          />
        </>
      )}

      {/* Wing Tips Details */}
      <circle cx="12" cy="44" r="1.5" fill="#FF3333" opacity="0.7" />
      <circle cx="48" cy="44" r="1.5" fill="#00FF00" opacity="0.7" />

      {/* Navigation Lights */}
      <motion.circle
        cx="12"
        cy="44"
        r="1.5"
        fill="#FF3333"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      <motion.circle
        cx="48"
        cy="44"
        r="1.5"
        fill="#00FF00"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
      />
    </svg>
  );
}
