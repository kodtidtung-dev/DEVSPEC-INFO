# Data Model

**Feature**: Modern Frontend Developer Portfolio
**Date**: 2025-10-30
**Purpose**: Define data structures, types, and relationships for the portfolio application

## Overview

This portfolio application uses static, type-safe data structures stored in TypeScript files. No database is required as content is bundled at build time and deployed statically.

## Core Entities

### 1. Project

Represents a portfolio project showcasing the developer's work.

**TypeScript Definition**:
```typescript
export interface ProjectImage {
  type: 'screenshot' | 'mockup'
  url: string // Relative path from /public, e.g., "/images/projects/project-1.png"
  alt: string // Descriptive alt text for accessibility
  width: number // Original width for Next.js Image
  height: number // Original height for Next.js Image
  caption?: string // Optional caption for the image
}

export interface ProjectLink {
  demo?: string // Live demo URL
  github?: string // GitHub repository URL
  figma?: string // Figma design file URL
  other?: { label: string; url: string }[] // Additional links
}

export interface Project {
  id: string // Unique identifier, kebab-case
  title: string // Project title
  description: string // Short description (1-2 sentences, ~100 chars)
  longDescription: string // Detailed description with features, challenges, outcomes
  technologies: string[] // Array of technology names/tags
  images: ProjectImage[] // Array of screenshots and mockups
  links: ProjectLink // External links to demo, code, designs
  featured: boolean // Whether to feature prominently
  order: number // Display order (lower numbers first)
  startDate?: string // Optional start date (YYYY-MM format)
  endDate?: string // Optional end date (YYYY-MM format or "present")
  teamSize?: number // Optional team size if collaborative
  role?: string // Your specific role in the project
}
```

**Validation Rules**:
- `id`: Must be unique, lowercase, kebab-case
- `title`: Required, max 100 characters
- `description`: Required, 50-150 characters for consistent card layout
- `longDescription`: Required, max 1000 characters
- `technologies`: Minimum 1 technology, max 10
- `images`: Minimum 1 image required
- `order`: Positive integer, unique across projects
- At least one of `demo` or `github` should be present

**Example**:
```typescript
{
  id: "ecommerce-dashboard",
  title: "E-Commerce Admin Dashboard",
  description: "Modern admin dashboard with real-time analytics and inventory management",
  longDescription: "Built a comprehensive admin dashboard for an e-commerce platform handling 10k+ daily users. Features include real-time sales analytics, inventory management, order processing, and customer insights. Implemented complex data visualizations using Chart.js and optimized performance with React Query for efficient data fetching.",
  technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React Query", "Chart.js", "PostgreSQL"],
  images: [
    {
      type: "screenshot",
      url: "/images/projects/ecommerce-dash-1.png",
      alt: "Dashboard showing sales analytics and revenue charts",
      width: 1920,
      height: 1080
    },
    {
      type: "screenshot",
      url: "/images/projects/ecommerce-dash-2.png",
      alt: "Inventory management interface with product list",
      width: 1920,
      height: 1080
    },
    {
      type: "mockup",
      url: "/images/projects/ecommerce-dash-mockup.png",
      alt: "Initial design mockup of the dashboard",
      width: 1600,
      height: 1200
    }
  ],
  links: {
    demo: "https://demo.example.com",
    github: "https://github.com/username/project",
    figma: "https://figma.com/file/xxx"
  },
  featured: true,
  order: 1,
  startDate: "2024-01",
  endDate: "2024-06",
  teamSize: 3,
  role: "Lead Frontend Developer"
}
```

### 2. SkillCategory

Represents a grouping of related technical skills.

**TypeScript Definition**:
```typescript
export interface Skill {
  name: string // Technology/tool name
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert' // Optional proficiency level
  yearsOfExperience?: number // Optional years of experience
  icon?: string // Optional icon name from Lucide React
}

export interface SkillCategory {
  id: string // Unique identifier, kebab-case
  title: string // Category display name
  description?: string // Optional category description
  skills: Skill[] // Array of skills in this category
  order: number // Display order
}
```

**Validation Rules**:
- `id`: Unique, lowercase, kebab-case
- `title`: Required, max 50 characters
- `skills`: Minimum 1 skill per category
- `name`: Required for each skill, max 30 characters
- `order`: Positive integer, unique across categories

**Example**:
```typescript
{
  id: "frontend-frameworks",
  title: "Frontend Frameworks",
  description: "Modern JavaScript frameworks and libraries",
  skills: [
    {
      name: "React",
      proficiency: "expert",
      yearsOfExperience: 5,
      icon: "react"
    },
    {
      name: "Next.js",
      proficiency: "expert",
      yearsOfExperience: 3
    },
    {
      name: "Vue.js",
      proficiency: "intermediate",
      yearsOfExperience: 2
    }
  ],
  order: 1
}
```

### 3. Profile

Represents the developer's personal and professional information.

**TypeScript Definition**:
```typescript
export interface SocialLink {
  platform: string // e.g., "GitHub", "LinkedIn", "Twitter"
  url: string // Full URL to profile
  icon?: string // Optional Lucide icon name
  username?: string // Optional display username
}

export interface Profile {
  name: string // Full name
  title: string // Professional title
  tagline: string // Short value proposition
  bio: string // Longer biographical text (2-3 paragraphs)
  email: string // Contact email
  location?: string // City, Country or remote
  availability: 'available' | 'open-to-opportunities' | 'not-available' | 'custom'
  availabilityMessage?: string // Custom availability message if status is 'custom'
  image: {
    url: string // Profile photo path
    alt: string // Alt text
    width: number
    height: number
  }
  socialLinks: SocialLink[] // Array of social profiles
  resumeUrl?: string // Optional link to resume PDF
  yearsOfExperience?: number // Total years of experience
  currentRole?: string // Current position/company if employed
}
```

**Validation Rules**:
- `name`: Required, max 100 characters
- `title`: Required, max 100 characters
- `tagline`: Required, 50-200 characters
- `bio`: Required, max 1000 characters
- `email`: Required, valid email format
- `availability`: Required, one of the defined values
- `socialLinks`: At least 1 social link recommended

**Example**:
```typescript
{
  name: "John Doe",
  title: "Frontend Developer",
  tagline: "Building accessible, performant web applications with modern technologies",
  bio: "Frontend developer with 5+ years of experience building scalable web applications. Specialized in React, Next.js, and TypeScript with a focus on performance optimization and accessibility.\n\nPreviously worked at TechCorp building enterprise SaaS products, and contributed to open-source projects including React Query and Tailwind CSS.\n\nPassionate about creating delightful user experiences and writing clean, maintainable code.",
  email: "john@example.com",
  location: "San Francisco, CA",
  availability: "open-to-opportunities",
  image: {
    url: "/images/profile/john-doe.jpg",
    alt: "Portrait of John Doe",
    width: 800,
    height: 800
  },
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/johndoe",
      icon: "github",
      username: "johndoe"
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/johndoe",
      icon: "linkedin",
      username: "johndoe"
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/johndoe",
      icon: "twitter",
      username: "@johndoe"
    }
  ],
  resumeUrl: "/files/john-doe-resume.pdf",
  yearsOfExperience: 5,
  currentRole: "Senior Frontend Developer at TechCorp"
}
```

### 4. ContactMessage

Represents a message submitted through the contact form. This is a runtime/API entity, not stored in static data files.

**TypeScript Definition**:
```typescript
export interface ContactFormData {
  name: string // Sender's name
  email: string // Sender's email
  message: string // Message content
  honeypot?: string // Hidden field for spam detection (should be empty)
  timestamp?: number // Submission timestamp (added server-side)
}

export interface ContactFormResponse {
  success: boolean // Whether submission was successful
  error?: string // Error message if failed
  messageId?: string // Email service message ID if successful
}
```

**Validation Rules** (server-side):
- `name`: Required, min 2 characters, max 100 characters
- `email`: Required, valid email format, max 255 characters
- `message`: Required, min 10 characters, max 5000 characters
- `honeypot`: Must be empty (spam check)
- Rate limit: Max 3 submissions per IP per hour

**Example Request**:
```typescript
{
  name: "Jane Smith",
  email: "jane@example.com",
  message: "Hi, I'm interested in discussing a frontend developer position at my company. Would you be available for a call next week?"
}
```

**Example Response**:
```typescript
{
  success: true,
  messageId: "msg_abc123xyz"
}
```

### 5. ThemePreference

Represents theme settings stored in localStorage. Not a TypeScript type but a data structure.

**LocalStorage Structure**:
```typescript
export type Theme = 'light' | 'dark' | 'system'

// Stored as: localStorage.getItem('portfolio-theme')
// Value: 'light' | 'dark' | 'system'
```

**Behavior**:
- On first visit: Check system preference (`prefers-color-scheme`)
- User can override via theme toggle
- Preference persists in localStorage with key `portfolio-theme`
- Falls back to `system` if localStorage unavailable

## Data File Structure

All static data lives in `src/data/` directory:

```
src/data/
├── projects.ts         # Array of Project objects
├── skills.ts           # Array of SkillCategory objects
└── profile.ts          # Single Profile object
```

**Example: src/data/projects.ts**
```typescript
import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Project One",
    // ... rest of project data
  },
  {
    id: "project-2",
    title: "Project Two",
    // ... rest of project data
  }
]

// Helper function to get featured projects
export const getFeaturedProjects = (): Project[] => {
  return projects
    .filter(p => p.featured)
    .sort((a, b) => a.order - b.order)
}

// Helper function to get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(p => p.id === id)
}
```

## Type Exports

All types should be exported from a central types file:

**src/types/index.ts**:
```typescript
// Project types
export type { Project, ProjectImage, ProjectLink } from './project'

// Skill types
export type { Skill, SkillCategory } from './skills'

// Profile types
export type { Profile, SocialLink } from './profile'

// Contact types
export type { ContactFormData, ContactFormResponse } from './contact'

// Theme types
export type { Theme } from './theme'
```

## Data Validation

While TypeScript provides compile-time type safety, runtime validation is recommended for:
1. API route inputs (contact form)
2. Environment variables
3. External data sources (if any)

**Recommended Validation Library**: Zod

**Example Contact Form Validation**:
```typescript
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').max(255),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  honeypot: z.string().max(0, 'Invalid submission') // Must be empty
})

export type ContactFormInput = z.infer<typeof contactFormSchema>
```

## State Management

**No global state management library needed.** Use React's built-in capabilities:

1. **Theme State**: Managed by next-themes
2. **Form State**: Managed by React Hook Form
3. **Animation State**: Managed by Framer Motion
4. **Scroll State**: Custom hooks with useState
5. **Static Data**: Imported directly from data files

**Custom Hooks for Shared State**:
```typescript
// src/hooks/useScrollProgress.ts
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / scrollHeight) * 100
      setProgress(scrolled)
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return progress
}
```

## Data Update Process

To update portfolio content:

1. Edit data files in `src/data/`
2. Ensure changes follow TypeScript types
3. Optimize new images if added
4. Rebuild and redeploy

No runtime data fetching or CMS integration is required for this portfolio.

## Summary

All data entities are well-defined with TypeScript types, validation rules, and examples. The data model supports:
- Static generation for optimal performance
- Type safety throughout the application
- Clear separation of concerns
- Easy content updates through code
- No database dependencies
