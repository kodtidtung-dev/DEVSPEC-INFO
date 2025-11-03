'use client';

import { motion } from 'framer-motion';
import type { PhilosophyCardsProps } from './types';
import CoreCard from './CoreCard';
import { staggerContainerVariants } from './utils/animations';

export default function PhilosophyCards({ cards, className = '' }: PhilosophyCardsProps) {
  return (
    <div className={className}>
      <motion.div
        variants={staggerContainerVariants(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6"
      >
        {cards.map((card, index) => (
          <CoreCard
            key={card.id}
            card={card}
            delay={index * 0.1}
          />
        ))}
      </motion.div>
    </div>
  );
}
