'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { TechStackProps } from './types';
import TechIcon from './TechIcon';
import { scrollRevealVariants } from './utils/animations';

export default function TechStack({ technologies, className = '' }: TechStackProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate technologies for seamless infinite loop
  const duplicatedTechs = [...technologies, ...technologies];

  // Calculate approximate width per item (adjust based on your TechIcon size)
  const itemWidth = 120; // Approximate width including gap
  const totalWidth = technologies.length * itemWidth;

  return (
    <div className={className}>
      <motion.div
        variants={scrollRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Technologies I Work With
          </h3>
          <p className="text-lg text-text-secondary">
            Tools and frameworks I use to build great software
          </p>
        </div>

        {/* Infinite Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <motion.div
            className="flex gap-6 py-8"
            animate={{
              x: isPaused ? undefined : [0, -totalWidth],
            }}
            transition={{
              x: {
                duration: 25,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop',
              },
            }}
            onHoverStart={() => setIsPaused(true)}
            onHoverEnd={() => setIsPaused(false)}
            style={{
              width: 'max-content',
            }}
          >
            {duplicatedTechs.map((tech, index) => (
              <div key={`${tech.id}-${index}`} className="flex-shrink-0">
                <TechIcon tech={tech} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hint Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-text-secondary/60">
            Hover to pause • Click for details
          </p>
        </div>
      </motion.div>
    </div>
  );
}
