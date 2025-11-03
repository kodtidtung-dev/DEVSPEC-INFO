'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { ProfileSectionProps } from './types';
import { scrollRevealVariants, slideInLeftVariants, slideInRightVariants } from './utils/animations';
import ProfileRing from './ProfileRing';

export default function ProfileSection({ profile, showRing = true, className = '' }: ProfileSectionProps) {
  return (
    <div className={`grid lg:grid-cols-2 gap-12 sm:gap-14 md:gap-16 items-center ${className}`}>
      {/* Left: Profile Image with Ring Effect */}
      <motion.div
        variants={slideInLeftVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="relative w-full h-[380px] sm:h-[450px] md:h-[500px] lg:h-[600px]"
      >
        {/* Profile Ring Effect */}
        {showRing && <ProfileRing />}

        {/* Profile Image */}
        <div className="relative w-full h-full z-10">
          <Image
            src={profile.profileImage}
            alt={profile.profileImageAlt}
            fill
            className="object-contain object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </motion.div>

      {/* Right: Introduction Text */}
      <motion.div
        variants={slideInRightVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="space-y-6"
      >
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-accent-red font-semibold text-lg mb-2"
          >
            Hi, I'm
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-2"
          >
            {profile.name}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary"
          >
            {profile.title}
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-lg text-text-secondary leading-relaxed"
        >
          {profile.bio}
        </motion.p>
      </motion.div>
    </div>
  );
}
