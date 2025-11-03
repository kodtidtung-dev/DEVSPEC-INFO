/**
 * Data Schemas and TypeScript Type Definitions
 *
 * Purpose: Central type definitions for the portfolio application
 * Usage: Import from @/types throughout the application
 */

// ============================================================================
// PROJECT TYPES
// ============================================================================

export type ProjectImageType = 'screenshot' | 'mockup'

export interface ProjectImage {
  type: ProjectImageType
  url: string          // Relative path from /public
  alt: string          // Descriptive alt text for accessibility
  width: number        // Original width for Next.js Image
  height: number       // Original height for Next.js Image
  caption?: string     // Optional caption
}

export interface ProjectLink {
  demo?: string        // Live demo URL
  github?: string      // GitHub repository URL
  figma?: string       // Figma design file URL
  other?: Array<{      // Additional links
    label: string
    url: string
  }>
}

export interface Project {
  id: string                   // Unique identifier, kebab-case
  title: string                // Project title
  description: string          // Short description (1-2 sentences)
  longDescription: string      // Detailed description
  technologies: string[]       // Array of technology names/tags
  images: ProjectImage[]       // Screenshots and mockups
  links: ProjectLink           // External links
  featured: boolean            // Feature prominently
  order: number                // Display order (lower first)
  startDate?: string           // Start date (YYYY-MM)
  endDate?: string             // End date (YYYY-MM or "present")
  teamSize?: number            // Team size if collaborative
  role?: string                // Specific role in project
}

// ============================================================================
// SKILL TYPES
// ============================================================================

export type SkillProficiency = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export interface Skill {
  name: string                      // Technology/tool name
  proficiency?: SkillProficiency    // Proficiency level
  yearsOfExperience?: number        // Years of experience
  icon?: string                     // Icon name from Lucide React
}

export interface SkillCategory {
  id: string                // Unique identifier, kebab-case
  title: string             // Category display name
  description?: string      // Optional category description
  skills: Skill[]           // Skills in this category
  order: number             // Display order
}

// ============================================================================
// PROFILE TYPES
// ============================================================================

export type AvailabilityStatus =
  | 'available'
  | 'open-to-opportunities'
  | 'not-available'
  | 'custom'

export interface SocialLink {
  platform: string      // e.g., "GitHub", "LinkedIn", "Twitter"
  url: string          // Full URL to profile
  icon?: string        // Optional Lucide icon name
  username?: string    // Optional display username
}

export interface ProfileImage {
  url: string          // Profile photo path
  alt: string          // Alt text
  width: number        // Width for Next.js Image
  height: number       // Height for Next.js Image
}

export interface Profile {
  name: string                          // Full name
  title: string                         // Professional title
  tagline: string                       // Short value proposition
  bio: string                           // Biographical text (2-3 paragraphs)
  email: string                         // Contact email
  location?: string                     // City, Country or remote
  availability: AvailabilityStatus      // Current availability
  availabilityMessage?: string          // Custom message if status is 'custom'
  image: ProfileImage                   // Profile photo
  socialLinks: SocialLink[]             // Social media profiles
  resumeUrl?: string                    // Link to resume PDF
  yearsOfExperience?: number            // Total years of experience
  currentRole?: string                  // Current position/company
}

// ============================================================================
// CONTACT FORM TYPES
// ============================================================================

export interface ContactFormData {
  name: string          // Sender's name
  email: string         // Sender's email
  message: string       // Message content
  honeypot?: string     // Hidden field for spam detection (should be empty)
  timestamp?: number    // Submission timestamp (added server-side)
}

export interface ContactFormResponse {
  success: boolean      // Whether submission was successful
  message?: string      // Success/error message
  error?: string        // Error message if failed
  messageId?: string    // Email service message ID if successful
  errors?: Record<string, string[]>  // Field-specific validation errors
}

export interface RateLimitInfo {
  allowed: boolean      // Whether request is allowed
  remaining: number     // Remaining requests
  retryAfter?: number   // Seconds until retry allowed
}

// ============================================================================
// THEME TYPES
// ============================================================================

export type Theme = 'light' | 'dark' | 'system'

// ============================================================================
// ANIMATION TYPES
// ============================================================================

import type { Variants } from 'framer-motion'

export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export const staggerContainer: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4
    }
  }
}

export const slideInVariants: Variants = {
  hidden: {
    x: -20,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

export const scaleVariants: Variants = {
  hidden: {
    scale: 0.95,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4
    }
  }
}

// ============================================================================
// NAVIGATION TYPES
// ============================================================================

export interface NavItem {
  label: string         // Display label
  href: string          // Anchor link (e.g., "#about")
  icon?: string         // Optional icon name
}

export const navigationItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
]

// ============================================================================
// SEO TYPES
// ============================================================================

export interface SEOMetadata {
  title: string
  description: string
  canonical?: string
  openGraph?: {
    title: string
    description: string
    url: string
    siteName: string
    images: Array<{
      url: string
      width: number
      height: number
      alt?: string
    }>
    locale: string
    type: string
  }
  twitter?: {
    card: 'summary' | 'summary_large_image'
    title: string
    description: string
    images?: string[]
    creator?: string
  }
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

// Extract array element type
export type ArrayElement<T extends readonly unknown[]> = T extends readonly (infer U)[] ? U : never

// Make certain properties required
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// Make certain properties optional
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// Deep partial type
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// ============================================================================
// VALIDATION SCHEMAS (ZOD)
// ============================================================================

import { z } from 'zod'

export const projectImageSchema = z.object({
  type: z.enum(['screenshot', 'mockup']),
  url: z.string().min(1),
  alt: z.string().min(1),
  width: z.number().positive(),
  height: z.number().positive(),
  caption: z.string().optional()
})

export const projectLinkSchema = z.object({
  demo: z.string().url().optional(),
  github: z.string().url().optional(),
  figma: z.string().url().optional(),
  other: z.array(z.object({
    label: z.string(),
    url: z.string().url()
  })).optional()
})

export const projectSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(100),
  description: z.string().min(50).max(150),
  longDescription: z.string().min(1).max(1000),
  technologies: z.array(z.string()).min(1).max(10),
  images: z.array(projectImageSchema).min(1),
  links: projectLinkSchema,
  featured: z.boolean(),
  order: z.number().positive().int(),
  startDate: z.string().regex(/^\d{4}-\d{2}$/).optional(),
  endDate: z.string().regex(/^(\d{4}-\d{2}|present)$/).optional(),
  teamSize: z.number().positive().int().optional(),
  role: z.string().optional()
}).refine(
  (data) => data.links.demo || data.links.github,
  { message: "At least one of demo or github link must be provided" }
)

export const skillSchema = z.object({
  name: z.string().min(1).max(30),
  proficiency: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
  yearsOfExperience: z.number().positive().optional(),
  icon: z.string().optional()
})

export const skillCategorySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(50),
  description: z.string().optional(),
  skills: z.array(skillSchema).min(1),
  order: z.number().positive().int()
})

export const socialLinkSchema = z.object({
  platform: z.string(),
  url: z.string().url(),
  icon: z.string().optional(),
  username: z.string().optional()
})

export const profileSchema = z.object({
  name: z.string().min(1).max(100),
  title: z.string().min(1).max(100),
  tagline: z.string().min(50).max(200),
  bio: z.string().min(1).max(1000),
  email: z.string().email().max(255),
  location: z.string().optional(),
  availability: z.enum(['available', 'open-to-opportunities', 'not-available', 'custom']),
  availabilityMessage: z.string().optional(),
  image: z.object({
    url: z.string(),
    alt: z.string(),
    width: z.number().positive(),
    height: z.number().positive()
  }),
  socialLinks: z.array(socialLinkSchema).min(1),
  resumeUrl: z.string().url().optional(),
  yearsOfExperience: z.number().positive().optional(),
  currentRole: z.string().optional()
})

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .trim()
    .toLowerCase(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .trim(),
  honeypot: z.string()
    .max(0, 'Invalid submission')
    .default('')
})

// Infer types from Zod schemas
export type ContactFormInput = z.infer<typeof contactFormSchema>
export type ProjectInput = z.infer<typeof projectSchema>
export type SkillCategoryInput = z.infer<typeof skillCategorySchema>
export type ProfileInput = z.infer<typeof profileSchema>

// ============================================================================
// TYPE GUARDS
// ============================================================================

export function isProject(obj: unknown): obj is Project {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'description' in obj
  )
}

export function isSkillCategory(obj: unknown): obj is SkillCategory {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'skills' in obj
  )
}

export function isProfile(obj: unknown): obj is Profile {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'email' in obj &&
    'title' in obj
  )
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const SKILL_PROFICIENCY_LEVELS: Record<SkillProficiency, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert'
}

export const AVAILABILITY_STATUS_LABELS: Record<AvailabilityStatus, string> = {
  available: 'Available for work',
  'open-to-opportunities': 'Open to opportunities',
  'not-available': 'Not currently available',
  custom: 'Custom availability message'
}

export const MAX_FILE_SIZES = {
  image: 5 * 1024 * 1024,    // 5MB
  resume: 2 * 1024 * 1024     // 2MB
} as const

export const ANIMATION_DURATIONS = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const

// ============================================================================
// EXPORTS
// ============================================================================
// All types are already exported above, no need to re-export
