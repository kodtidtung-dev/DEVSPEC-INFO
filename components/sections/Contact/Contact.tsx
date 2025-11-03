/**
 * Contact Section Component
 * Main section with contact form and quick connect links
 */

'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ContactForm } from './ContactForm';
import { QuickConnect } from './QuickConnect';
import { contactContent } from '@/app/content/contact';
import { scrollRevealVariants, slideInLeftVariants, slideInRightVariants } from './utils/animations';

// Lazy load ParticleBurst for performance
const ParticleBurst = dynamic(() => import('@/components/ui/ParticleBurst'), {
  ssr: false,
  loading: () => null,
});

// Custom typing effect hook (reuse from About/Projects)
function useTypingEffect(
  texts: string[],
  typeSpeed: number = 80,
  deleteSpeed: number = 50,
  pauseTime: number = 2000
) {
  const [displayedText, setDisplayedText] = React.useState('');
  const [textIndex, setTextIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentText = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    } else {
      const speed = isDeleting ? deleteSpeed : typeSpeed;
      timeout = setTimeout(() => {
        setDisplayedText(
          isDeleting
            ? currentText.substring(0, displayedText.length - 1)
            : currentText.substring(0, displayedText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, textIndex, texts, typeSpeed, deleteSpeed, pauseTime]);

  return { displayedText };
}

// Import React for hooks
import * as React from 'react';

export function Contact() {
  const { displayedText } = useTypingEffect(contactContent.typingTexts, 80, 50, 2000);

  return (
    <section
      id="contact"
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
      <div className="pointer-events-none absolute left-0 top-40 h-72 w-72 animate-float rounded-full bg-accent-red/10 blur-3xl opacity-50" />
      <div
        className="pointer-events-none absolute bottom-40 right-0 h-96 w-96 animate-float rounded-full bg-accent-red/5 blur-3xl opacity-40"
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
            {contactContent.heading}
          </h2>
          <p className="mb-6 text-lg text-text-secondary md:text-xl">
            {contactContent.subheading}
          </p>

          {/* Typing Animation */}
          <div className="font-mono text-sm text-text-secondary md:text-base">
            <span className="text-accent-red">{'> '}</span>
            <span>{displayedText}</span>
            <span className="animate-pulse">|</span>
          </div>
        </motion.header>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px] xl:gap-12">
          {/* Contact Form (Left) */}
          <motion.div
            variants={slideInLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="glass overflow-hidden rounded-2xl border border-white/10 p-6 shadow-lg md:p-8"
          >
            <div className="mb-6">
              <h3 className="mb-2 text-2xl font-bold text-text-primary">Send a Message</h3>
              <p className="text-text-secondary">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </div>
            <ContactForm />
          </motion.div>

          {/* Quick Connect (Right) */}
          <motion.div
            variants={slideInRightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="glass overflow-hidden rounded-2xl border border-white/10 p-6 shadow-lg md:p-8"
          >
            <div className="mb-6">
              <h3 className="mb-2 text-2xl font-bold text-text-primary">Quick Connect</h3>
              <p className="text-text-secondary">
                Prefer a direct approach? Reach out through these channels.
              </p>
            </div>
            <QuickConnect />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
