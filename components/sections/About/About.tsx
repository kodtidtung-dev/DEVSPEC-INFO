'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { AboutSectionProps } from './types';
import ProfileSection from './ProfileSection';
import PhilosophyCards from './PhilosophyCards';
import TechStack from './TechStack';
import ValuesSection from './ValuesSection';

// Lazy load ParticleBurst for performance
const ParticleBurst = dynamic(() => import('@/components/ui/ParticleBurst'), {
  ssr: false,
  loading: () => null,
});

// Enhanced typing animation hook with delete/retype loop
function useTypingEffect(
  texts: string[],
  typeSpeed: number = 80,
  deleteSpeed: number = 50,
  pauseTime: number = 2000,
  startDelay: number = 500
) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing phase
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting phase
        if (displayedText.length > 0) {
          setDisplayedText(currentText.slice(0, displayedText.length - 1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTextIndex, texts, typeSpeed, deleteSpeed, pauseTime]);

  return { displayedText, isDeleting };
}

export default function About({
  profile,
  philosophyCards,
  techStack,
  values,
  className = '',
  showRing = true,
}: AboutSectionProps) {
  const codeTexts = [
    "const life = { build, learn, repeat }",
    "const life = { code, create, innovate }",
    "const life = { design, develop, deploy }",
  ];
  const { displayedText, isDeleting } = useTypingEffect(codeTexts, 80, 50, 2000);

  return (
    <section
      id="about"
      className={`relative min-h-screen py-20 bg-background flex items-center justify-center ${className}`}
    >
      {/* Particle Background - Subtle floating particles */}
      <ParticleBurst
        count={35}
        minOpacity={0.1}
        maxOpacity={0.25}
        minDuration={5}
        maxDuration={10}
      />

      {/* Animated gradient orbs */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-accent-red/10 rounded-full blur-3xl animate-float opacity-40" />
      <div
        className="absolute bottom-40 right-10 w-96 h-96 bg-accent-red/5 rounded-full blur-3xl animate-float opacity-30"
        style={{ animationDelay: '2s' }}
      />

      <div className="container mx-auto px-8 sm:px-10 md:px-12 lg:px-20 max-w-6xl relative z-10 w-full">
        <div>
          {/* Section Header */}
          <div className="text-center mt-16 md:mt-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4">
              Me Behind The Code
            </h2>
            <p className="text-lg text-text-secondary font-mono">
              {displayedText}
              <span className="inline-block w-0.5 h-5 ml-1 bg-accent-red animate-pulse" />
            </p>
          </div>

          {/* Profile Section */}
          <div className="mt-12 sm:mt-14 md:mt-16 lg:mt-20">
            <ProfileSection profile={profile} showRing={showRing} />
          </div>

          {/* Philosophy Cards */}
          <div className="mt-12 sm:mt-14 md:mt-16 lg:mt-20">
            <PhilosophyCards cards={philosophyCards} />
          </div>

          {/* Tech Stack */}
          <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-[100px]">
            <TechStack technologies={techStack} />
          </div>

          {/* Values Section */}
          <div className="mt-12 sm:mt-14 md:mt-16 lg:mt-20">
            <ValuesSection values={values} />
          </div>
        </div>
      </div>
    </section>
  );
}
