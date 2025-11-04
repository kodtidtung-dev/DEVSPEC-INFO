/**
 * Contact Form Component (Redesigned)
 * Styled to match SpaceContactSection aesthetics with simple local state
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import type { ContactFormProps } from './types';
import { buttonHoverVariants, messageVariants, staggerContainerVariants, formFieldVariants } from './utils/animations';

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    // simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'name':
        if (value.trim() === '') return 'Name is required';
        if (value.trim().length < 5) return 'Name should be at least 5 characters';
        return '';
      case 'email':
        if (value.trim() === '') return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return '';
      case 'message':
        if (value.trim() === '') return 'Message is required';
        if (value.trim().length < 10) return 'Message should be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (field: 'name' | 'email' | 'message', value: string) => {
    setFormData((s) => ({ ...s, [field]: value }));
    // live-validate single field
    setFormErrors((errs) => ({ ...errs, [field]: validateField(field, value) }));
  };

  const validateAll = () => {
    const nameErr = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    const messageErr = validateField('message', formData.message);
    const errs = { name: nameErr, email: emailErr, message: messageErr };
    setFormErrors(errs);
    return !nameErr && !emailErr && !messageErr;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // validate before sending
    if (!validateAll()) return;

    setIsSubmitting(true);
    // demo submit only
    try {
      await new Promise((r) => setTimeout(r, 600));
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setFormErrors({});
      onSuccess?.();
      setTimeout(() => setIsSuccess(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Success Message */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            variants={messageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="glass mb-6 flex items-start gap-3 rounded-xl border border-accent-red/30 bg-accent-red/10 p-4"
          >
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent-red" />
            <div>
              <p className="font-semibold text-text-primary">Message sent successfully!</p>
              <p className="text-sm text-text-secondary">
                Thank you for reaching out. I'll get back to you soon.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form */}
      <form onSubmit={onSubmit} className="space-y-8">
        <motion.div
          variants={staggerContainerVariants(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6 md:space-y-7"
        >
          {/* Name Field */}
          <motion.div variants={formFieldVariants} className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-text-primary">
              Name <span className="text-accent-red">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="your name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              disabled={isSubmitting}
              aria-invalid={!!formErrors.name}
              className={`w-full h-12 px-4 bg-black/50 border rounded-xl focus:outline-none transition-all placeholder-text-secondary/70 hover:border-gray-700 disabled:opacity-50 ${formErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-300' : 'border-gray-800 focus:border-accent-red focus:ring-2 focus:ring-accent-red/30'}`}
            />
            {formErrors.name && (
              <p className="mt-1 text-xs text-red-400">{formErrors.name}</p>
            )}
          </motion.div>

          {/* Email Field */}
          <motion.div variants={formFieldVariants} className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-text-primary">
              Email <span className="text-accent-red">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled={isSubmitting}
              aria-invalid={!!formErrors.email}
              className={`w-full h-12 px-4 bg-black/50 border rounded-xl focus:outline-none transition-all placeholder-text-secondary/70 hover:border-gray-700 disabled:opacity-50 ${formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-300' : 'border-gray-800 focus:border-accent-red focus:ring-2 focus:ring-accent-red/30'}`}
            />
            {formErrors.email && (
              <p className="mt-1 text-xs text-red-400">{formErrors.email}</p>
            )}
          </motion.div>

          {/* Message Field */}
          <motion.div variants={formFieldVariants} className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-text-primary">
              Message <span className="text-accent-red">*</span>
            </label>
            <textarea
              id="message"
              rows={6}
              placeholder="Typing your message here..."
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              disabled={isSubmitting}
              aria-invalid={!!formErrors.message}
              className={`w-full min-h-[164px] px-4 py-3 bg-black/50 border rounded-xl focus:outline-none transition-all placeholder-text-secondary/70 resize-none hover:border-gray-700 disabled:opacity-50 ${formErrors.message ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-300' : 'border-gray-800 focus:border-accent-red focus:ring-2 focus:ring-accent-red/30'}`}
            />
            {formErrors.message && (
              <p className="mt-1 text-xs text-red-400">{formErrors.message}</p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={formFieldVariants}>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              variants={buttonHoverVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="w-full bg-linear-to-r from-accent-red to-[#ff4d4d] hover:from-[#ff4d4d] hover:to-[#ff6b6b] text-white font-semibold py-4 md:py-5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-accent-red/40 hover:shadow-accent-red/60"
              aria-label={isSubmitting ? 'Sending message...' : 'Send Message'}
            >
              <Send className={`h-5 w-5 transition-transform ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'}`} />
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </form>
    </div>
  );
}
