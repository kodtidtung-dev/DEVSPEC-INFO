'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import type { CoreCardProps } from './types';
import { cardVariants } from './utils/animations';

export default function CoreCard({ card, delay = 0, className = '' }: CoreCardProps) {
  // Dynamically get icon component from Lucide
  const IconComponent = (LucideIcons as any)[card.icon] || LucideIcons.Circle;

  // Use card color or fallback to accent-red
  const cardColor = card.color || '#FF3333';
  const rgbColor = hexToRgb(cardColor);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -8 }}
      className={`group relative p-5 sm:p-6 rounded-2xl glass cursor-pointer overflow-hidden ${className}`}
      style={{
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: `rgba(${rgbColor}, 0.1)`,
      }}
    >
      {/* Gradient border effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, rgba(${rgbColor}, 0.1), rgba(${rgbColor}, 0.05))`,
          backdropFilter: 'blur(8px)',
        }}
      />

      {/* Icon */}
      <div className="mb-4 relative z-10">
        <motion.div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, rgba(${rgbColor}, 0.15), rgba(${rgbColor}, 0.05))`,
          }}
          whileHover={{ rotate: 12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <IconComponent
              className="w-8 h-8 transition-all duration-300"
              style={{ color: cardColor }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Label (if provided) */}
      {card.label && (
        <h3
          className="text-sm font-semibold uppercase tracking-wider mb-2 transition-colors duration-300 relative z-10"
          style={{ color: cardColor }}
        >
          {card.label}
        </h3>
      )}

      {/* Title */}
      <h4
        className="text-xl font-bold text-text-primary mb-2 transition-colors duration-300 relative z-10"
        style={{
          color: 'inherit',
        }}
      >
        <span className="group-hover:opacity-0 transition-opacity duration-300">{card.title}</span>
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: cardColor }}
        >
          {card.title}
        </span>
      </h4>

      {/* Description */}
      <p className="text-text-secondary leading-relaxed relative z-10">
        {card.description}
      </p>

      {/* Enhanced hover glow effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(${rgbColor}, 0.08), transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />
    </motion.div>
  );
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `${r}, ${g}, ${b}`;
  }
  return '255, 51, 51'; // Fallback to red
}
