/**
 * Project Flip Card Component
 * Interactive card that flips to reveal project details
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { ProjectFlipCardProps } from './types';
import { cardVariants, flipFrontVariants, flipBackVariants, buttonHoverVariants } from './utils/animations';

export function ProjectFlipCard({ project, delay = 0, className = '' }: ProjectFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for touch interactions
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    } else if (e.key === 'Escape' && isFlipped) {
      setIsFlipped(false);
    }
  };

  // Handle hover (desktop only)
  const handleHoverStart = () => {
    if (!isMobile) {
      setIsFlipped(true);
    }
  };

  const handleHoverEnd = () => {
    if (!isMobile) {
      setIsFlipped(false);
    }
  };

  // Handle click (mobile and desktop)
  const handleClick = () => {
    if (isMobile) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay }}
      className={className}
    >
      <div
        className="group relative h-[380px] md:h-[450px] cursor-pointer"
        style={{ perspective: '1000px' }}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`${project.title} - Click to flip card`}
      >
        <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
          <AnimatePresence mode="wait">
            {!isFlipped ? (
              // FRONT SIDE
              <motion.div
                key="front"
                variants={flipFrontVariants}
                initial="initial"
                exit="exit"
                className="glass absolute inset-0 overflow-hidden rounded-2xl border border-white/10 p-6 shadow-lg"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Image Placeholder */}
                <div className="relative mb-4 aspect-4/3 overflow-hidden rounded-xl bg-linear-to-br from-accent-red/15 to-accent-red/8">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="select-none text-[100px] font-bold leading-none text-text-secondary/20 sm:text-[120px]">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mb-2 text-xl font-bold text-text-primary">
                  {project.title}
                </h3>

                {/* Brief Description */}
                <p className="text-sm leading-relaxed text-text-secondary">
                  {project.description}
                </p>

                {/* Flip Hint */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="text-xs text-text-secondary/70">
                    {isMobile ? 'Tap' : 'Hover'} to see more
                  </span>
                </div>
              </motion.div>
            ) : (
              // BACK SIDE
              <motion.div
                key="back"
                variants={flipBackVariants}
                initial="initial"
                animate="animate"
                className="glass absolute inset-0 overflow-y-auto rounded-2xl border border-white/10 p-6 shadow-lg"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-text-primary">
                  {project.title}
                </h3>

                {/* Detailed Description */}
                <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                  {project.detailedDescription}
                </p>

                {/* Technology Badges */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      className="rounded-full border border-accent-red/20 bg-accent-red/10 px-2.5 py-1 text-xs font-medium text-text-primary"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {/* GitHub Button */}
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={buttonHoverVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="inline-flex items-center gap-2 rounded-lg border border-accent-red bg-accent-red px-4 py-2 text-sm font-semibold text-white transition-all"
                    aria-label={`View ${project.title} on GitHub`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </motion.a>

                  {/* Live Demo Button (if available) */}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={buttonHoverVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      className="inline-flex items-center gap-2 rounded-lg border border-accent-red bg-transparent px-4 py-2 text-sm font-semibold text-accent-red transition-all hover:bg-accent-red/10"
                      aria-label={`View ${project.title} live demo`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                </div>

                {/* Flip Back Hint */}
                <div className="mt-4 text-center">
                  <span className="text-xs text-text-secondary/70">
                    {isMobile ? 'Tap' : 'Hover away'} to flip back
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
