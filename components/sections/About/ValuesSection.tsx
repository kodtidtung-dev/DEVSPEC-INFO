'use client';

import { motion } from 'framer-motion';
import type { ValuesSectionProps } from './types';
import ValueCard from './ValueCard';
import { staggerContainerVariants, scrollRevealVariants } from './utils/animations';

export default function ValuesSection({ values, className = '' }: ValuesSectionProps) {
  return (
    <motion.div
      variants={scrollRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Core Values That Drive My Work
        </h3>
        <p className="text-lg text-text-secondary">
          Principles I believe in and practice every day
        </p>
      </div>

      <motion.div
        variants={staggerContainerVariants(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6"
      >
        {values.map((value, index) => (
          <ValueCard
            key={value.id}
            value={value}
            delay={index * 0.1}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
