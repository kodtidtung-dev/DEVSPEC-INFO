# Implementation Plan: Modern Frontend Developer Portfolio

**Branch**: `001-modern-portfolio` | **Date**: 2025-10-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-modern-portfolio/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

A modern, performant web portfolio website for a frontend developer, optimized for job applications. The portfolio showcases projects with screenshots and mockups, provides detailed information about skills and experience, includes a contact form with email service integration, and features a polished dark theme with smooth animations. The site prioritizes accessibility (WCAG 2.1 AA), performance (Lighthouse 90+), and SEO while maintaining a professional aesthetic with light/dark mode support that respects system preferences.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 14 (App Router)
**Primary Dependencies**:
- Next.js 14 (App Router, TypeScript, Image Optimization)
- Tailwind CSS (utility-first styling, custom theme)
- Framer Motion (animations, transitions, scroll effects)
- next-themes (theme management with system detection)
- React Hook Form (form validation and handling)
- Email service SDK (Resend or SendGrid for contact form)
- Lucide React (icon library)

**Storage**:
- Client-side: localStorage (theme preference persistence)
- Content: Static JSON/TypeScript data files for projects, skills, and profile information
- Images: Optimized images stored in /public directory with Next.js Image component

**Testing**:
- Unit/Component: Jest + React Testing Library
- E2E: Playwright
- Accessibility: axe-core + Lighthouse CI
- Performance: Lighthouse CI in CI/CD pipeline

**Target Platform**: Web (responsive, mobile-first), deployed on Vercel
**Project Type**: Web application (frontend-only with serverless API routes)
**Performance Goals**:
- Lighthouse score 90+ (mobile and desktop)
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Cumulative Layout Shift < 0.1
- 60fps animations

**Constraints**:
- Page load within 3 seconds on 10 Mbps connection
- Core Web Vitals passing scores
- WCAG 2.1 Level AA compliance
- < 0.6s animation duration (perceived responsiveness)
- Support latest 2 versions of major browsers

**Scale/Scope**:
- Single-page application with smooth scroll navigation
- 4 main sections (Hero, About, Projects, Contact)
- 3-8 portfolio projects initially
- Lightweight bundle size target: < 200KB initial JS bundle
- Static generation with ISR for optimal performance

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASS - No constitution file configured yet. This is a new project without existing architectural constraints.

**Notes**:
- Since no constitution.md exists with actual principles, proceeding with modern Next.js best practices
- Portfolio is a frontend-only application, no backend services or complex architecture needed
- Will follow Next.js 14 App Router conventions and React best practices

## Project Structure

### Documentation (this feature)

```text
specs/001-modern-portfolio/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   ├── api-routes.md    # API route definitions for contact form
│   └── data-schemas.ts  # TypeScript interfaces for data structures
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Web application structure (Next.js 14 App Router)
src/
├── app/
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Homepage with all sections
│   ├── globals.css          # Global styles + Tailwind imports
│   ├── api/
│   │   └── contact/
│   │       └── route.ts     # Contact form API route
│   └── fonts/               # Font optimization
├── components/
│   ├── Navigation.tsx       # Fixed nav with progress bar
│   ├── Hero.tsx             # Hero section with animated intro
│   ├── About.tsx            # About section with bio and skills
│   ├── Projects.tsx         # Projects showcase
│   ├── Contact.tsx          # Contact form and info
│   ├── ThemeToggle.tsx      # Theme switcher component
│   └── ui/                  # Shared UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
├── hooks/
│   ├── useMousePosition.ts  # Mouse tracking for parallax
│   ├── useScrollProgress.ts # Scroll progress tracking
│   ├── useIntersectionObserver.ts # Lazy animations
│   └── useMediaQuery.ts     # Responsive utilities
├── lib/
│   ├── utils.ts             # Utility functions
│   ├── animations.ts        # Framer Motion variants
│   ├── email.ts             # Email service integration
│   └── constants.ts         # Constants and config
├── data/
│   ├── projects.ts          # Project data
│   ├── skills.ts            # Skills data
│   └── profile.ts           # Personal information
└── types/
    └── index.ts             # TypeScript type definitions

public/
├── images/
│   ├── projects/            # Project screenshots and mockups
│   └── profile/             # Profile photo
└── fonts/                   # Custom fonts if needed

tests/
├── e2e/
│   ├── navigation.spec.ts
│   ├── contact-form.spec.ts
│   └── accessibility.spec.ts
└── components/
    ├── Navigation.test.tsx
    ├── Contact.test.tsx
    └── ThemeToggle.test.tsx

Root files:
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── .env.local.example       # Environment variables template
└── playwright.config.ts     # E2E test configuration
```

**Structure Decision**: Selected web application structure using Next.js 14 App Router conventions. This is a frontend-focused portfolio with serverless API routes for the contact form. The structure follows Next.js best practices with:
- App Router for improved performance and developer experience
- Component-based architecture for reusability
- Custom hooks for shared logic
- Separation of data, types, and business logic
- Co-located tests for maintainability

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

N/A - No constitution violations. This is a straightforward Next.js application following framework conventions and modern React patterns.
