/**
 * Quick Connect Component
 * Social links, email, and availability status
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram, Twitter, Mail, Facebook, Check, Copy } from 'lucide-react';
import { contactContent } from '@/app/content/contact';
import type { QuickConnectProps } from './types';
import {
  formFieldVariants,
  staggerContainerVariants,
  socialLinkVariants,
} from './utils/animations';

const iconMap = {
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Mail,
};

export function QuickConnect({ className = '' }: QuickConnectProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactContent.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  const getAvailabilityColor = () => {
    switch (contactContent.availability.status) {
      case 'available':
        return 'bg-green-500';
      case 'busy':
        return 'bg-yellow-500';
      case 'unavailable':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      variants={staggerContainerVariants(0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`space-y-8 ${className}`}
    >
      {/* Email Section */}
      <motion.div variants={formFieldVariants} className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">Email</h3>
        <div className="glass relative overflow-hidden rounded-lg border border-white/10 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-red/10">
                <Mail className="h-5 w-5 text-accent-red" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-text-primary">
                  {contactContent.email}
                </p>
                <p className="text-xs text-text-secondary">Click to copy</p>
              </div>
            </div>
            <motion.button
              onClick={handleCopyEmail}
              variants={socialLinkVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-red/10 text-accent-red transition-colors hover:bg-accent-red hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-red/50"
              aria-label="Copy email address"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Copy className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Social Links Section */}
      <motion.div variants={formFieldVariants} className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">Connect</h3>
        <div className="grid gap-3">
          {contactContent.socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={socialLinkVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="glass group flex items-center gap-4 rounded-lg border border-white/10 p-4 transition-all hover:border-accent-red/30 hover:shadow-[0_0_20px_rgba(255,51,51,0.3)] focus:outline-none focus:ring-2 focus:ring-accent-red/50"
                aria-label={link.ariaLabel}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-red/10 transition-colors group-hover:bg-accent-red">
                  <Icon className="h-5 w-5 text-accent-red transition-colors group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{link.platform}</p>
                  <p className="text-xs text-text-secondary">@{link.platform.toLowerCase()}</p>
                </div>
                <svg
                  className="h-4 w-4 text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent-red"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.a>
            );
          })}
        </div>
      </motion.div>

      {/* Availability Status */}
      <motion.div variants={formFieldVariants} className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">Availability</h3>
        <div className="glass rounded-lg border border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full ${getAvailabilityColor()} opacity-75`}
              />
              <span
                className={`relative inline-flex h-3 w-3 rounded-full ${getAvailabilityColor()}`}
              />
            </div>
            <div>
              <p className="font-medium text-text-primary">
                {contactContent.availability.status === 'available'
                  ? 'Available'
                  : contactContent.availability.status === 'busy'
                    ? 'Busy'
                    : 'Unavailable'}
              </p>
              <p className="text-sm text-text-secondary">{contactContent.availability.message}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Response Time */}
      <motion.div variants={formFieldVariants} className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">Response Time</h3>
        <div className="glass rounded-lg border border-white/10 p-4">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 text-accent-red"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-sm text-text-secondary">
                I typically respond within <span className="font-semibold text-text-primary">24 hours</span> during
                weekdays.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
