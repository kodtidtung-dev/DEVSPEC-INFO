/**
 * Featured Project Card Component
 * Displays the prominently featured project with full details
 */

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import { FeaturedProjectCardProps } from './types';
import { cardVariants, featuredCardHoverVariants, buttonHoverVariants } from './utils/animations';

export function FeaturedProjectCard({ project, delay = 0, className = '' }: FeaturedProjectCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay }}
      className={className}
    >
      <motion.article
        variants={featuredCardHoverVariants}
        initial="initial"
        whileHover="hover"
        className="glass group relative h-full overflow-hidden rounded-2xl border border-white/10 p-8 shadow-lg transition-shadow hover:shadow-[0_0_30px_rgba(255,51,51,0.5)]"
      >
        {/* Project Image (Stock1.png) */}
        <div className="relative mb-6 aspect-4/3 overflow-hidden rounded-xl bg-linear-to-br from-accent-red/20 to-accent-red/5">
          <Image
            src="/Stock1.png"
            alt={`${project.title} image`}
            fill
            className="object-cover"
            priority={true}
          />
          {/* Featured badge */}
          <div className="absolute right-4 top-4 rounded-full bg-accent-red px-4 py-2 text-sm font-semibold text-white">
            Featured
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Title */}
          <h3 className="text-2xl font-bold text-text-primary md:text-3xl">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-base leading-relaxed text-text-secondary md:text-lg">
            {project.detailedDescription}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech.name}
                className="rounded-full border border-accent-red/20 bg-accent-red/10 px-3 py-1 text-sm font-medium text-text-primary"
              >
                {tech.name}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            {/* GitHub Button */}
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonHoverVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="btn-liquid inline-flex items-center gap-2 rounded-lg border border-accent-red bg-accent-red px-6 py-3 font-semibold text-white transition-all"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="h-5 w-5" />
              <span>View Code</span>
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
                className="inline-flex items-center gap-2 rounded-lg border border-accent-red bg-transparent px-6 py-3 font-semibold text-accent-red transition-all hover:bg-accent-red/10"
                aria-label={`View ${project.title} live demo`}
              >
                <ExternalLink className="h-5 w-5" />
                <span>Live Demo</span>
              </motion.a>
            )}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
