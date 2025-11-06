/**
 * Projects Section Component
 * Main section showcasing portfolio projects
 */

'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FeaturedProjectCard } from './FeaturedProjectCard';
import { ProjectFlipCard } from './ProjectFlipCard';
import { useTypingEffect } from './hooks/useTypingEffect';
import { getFeaturedProject, getRegularProjects } from './types';
import { scrollRevealVariants, staggerContainerVariants, buttonHoverVariants } from './utils/animations';
import { projects } from '@/app/content/projects';

// Lazy load ParticleBurst for performance
const ParticleBurst = dynamic(() => import('@/components/ui/ParticleBurst'), {
  ssr: false,
  loading: () => null,
});

export function Projects() {
  const { displayedText } = useTypingEffect(['const projects = [...featured];'], 80, 50, 2000);

  const featuredProject = getFeaturedProject(projects);
  const regularProjects = getRegularProjects(projects);

  return (
    <section
      id="projects"
      className="relative min-h-screen overflow-hidden bg-background py-20 md:py-32"
    >
      {/* Particle Background */}
      <div className="pointer-events-none absolute inset-0">
        <ParticleBurst
          count={35}
          minOpacity={0.1}
          maxOpacity={0.25}
          minDuration={5}
          maxDuration={10}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 animate-float rounded-full bg-accent-red/10 blur-3xl opacity-50" />
      <div
        className="pointer-events-none absolute bottom-20 right-0 h-96 w-96 animate-float rounded-full bg-accent-red/5 blur-3xl opacity-40"
        style={{ animationDelay: '2s' }}
      />

      {/* Content Container */}
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.header
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-text-primary md:text-5xl lg:text-6xl">
            Projects Showcase
          </h2>

          {/* Typing Animation */}
          <div className="font-mono text-sm text-text-secondary md:text-base">
            <span className="text-accent-red">{'> '}</span>
            <span>{displayedText}</span>
            <span className="animate-pulse">|</span>
          </div>
        </motion.header>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainerVariants(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-10 md:gap-8 lg:grid-cols-[60%_40%] pb-8 md:pb-0"
        >
          {/* Featured Project */}
          {featuredProject && (
            <div className="lg:row-span-2">
              <FeaturedProjectCard project={featuredProject} delay={0} />
            </div>
          )}

          {/* Flip Cards Container */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1">
            {regularProjects.map((project, index) => (
              <ProjectFlipCard
                key={project.id}
                project={project}
                delay={0.15 * (index + 1)}
              />
            ))}

          </div>
        </motion.div>

        {/* View All Projects CTA (full-width below grid) */}
        <div className="mt-12 md:mt-8 pt-8 border-t border-white/10 md:border-t-0 md:pt-0">
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="relative z-10"
          >
            <Link
              href="https://github.com/kodtidtung-dev?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition duration-300 hover:border-accent-red/40 hover:bg-white/10"
            >
              {/* decorative gradient glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" aria-hidden>
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-red/20"></div>
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent-red/10"></div>
              </div>

              <motion.div
                variants={buttonHoverVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="relative flex flex-col items-center p-6 md:p-8"
              >
                <div className="text-center">
                  <p className="text-xs md:text-sm uppercase tracking-wider text-text-secondary">Explore</p>
                  <h3 className="mt-1 text-xl md:text-2xl font-semibold text-text-primary">View all projects</h3>
                  <p className="mt-1 hidden text-sm text-text-secondary md:block">ดูงานทั้งหมดและโค้ดเพิ่มเติมบน GitHub</p>
                </div>
                <span className="mt-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-transparent text-text-primary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-accent-red/40 group-hover:bg-accent-red/10 group-hover:text-accent-red">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
