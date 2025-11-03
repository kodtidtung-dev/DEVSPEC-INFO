# Implementation Guide
### Next.js + TypeScript + Tailwind + Framer Motion

---

## Project Setup

### 1. Initialize Next.js Project

```bash
npx create-next-app@latest portfolio --typescript --tailwind --app --no-src-dir
cd portfolio
```

### 2. Install Dependencies

```bash
# Framer Motion for animations
npm install framer-motion

# Additional utilities
npm install clsx tailwind-merge

# Form handling (for contact form)
npm install react-hook-form zod @hookform/resolvers

# Icons (optional)
npm install lucide-react

# Intersection Observer hook
npm install react-intersection-observer
```

### 3. Tailwind Configuration

Update `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light mode
        'apple-gray': '#F5F5F7',
        'apple-dark': '#1D1D1F',
        'apple-text-secondary': '#6E6E73',
        'apple-text-tertiary': '#86868B',

        // Dark mode
        'dark-bg': '#000000',
        'dark-secondary': '#1C1C1E',
        'dark-tertiary': '#2C2C2E',
        'dark-text-secondary': '#A1A1A6',

        // Accent
        'accent-red': {
          DEFAULT: '#FF3B30',
          hover: '#FF2D20',
          dark: '#FF453A',
          'dark-hover': '#FF5247',
        },
      },
      fontFamily: {
        apple: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'Segoe UI',
          'sans-serif',
        ],
        mono: ['SF Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'hero': ['96px', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        'section-title': ['56px', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],
        'subsection': ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-large': ['21px', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backdropBlur: {
        'apple': '20px',
      },
      animation: {
        'bounce-gentle': 'bounceGentle 2s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

## Folder Structure

```
portfolio/
├── app/
│   ├── layout.tsx           # Root layout with dark mode provider
│   ├── page.tsx             # Home page (all sections)
│   ├── globals.css          # Global styles
│   └── fonts/               # Custom fonts (if needed)
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Container.tsx
│   │   └── SectionTitle.tsx
│   ├── animations/
│   │   ├── TextReveal.tsx
│   │   ├── FadeIn.tsx
│   │   ├── MagneticCursor.tsx
│   │   └── ParallaxImage.tsx
│   ├── Navigation.tsx
│   ├── DarkModeToggle.tsx
│   └── ScrollProgress.tsx
├── hooks/
│   ├── useDarkMode.ts
│   ├── useScrollProgress.ts
│   ├── useMousePosition.ts
│   └── useInViewAnimation.ts
├── lib/
│   ├── utils.ts             # Utility functions
│   └── animations.ts        # Framer Motion variants
├── public/
│   ├── images/
│   ├── projects/
│   └── resume.pdf
└── types/
    └── index.ts
```

---

## Core Components Implementation

### 1. Root Layout with Dark Mode

`app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { DarkModeProvider } from '@/components/DarkModeProvider'
import Navigation from '@/components/Navigation'
import ScrollProgress from '@/components/ScrollProgress'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your Name | Frontend Developer',
  description: 'Portfolio of a frontend developer specializing in React, Next.js, and modern web technologies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <DarkModeProvider>
          <ScrollProgress />
          <Navigation />
          {children}
        </DarkModeProvider>
      </body>
    </html>
  )
}
```

### 2. Dark Mode Provider

`components/DarkModeProvider.tsx`:

```typescript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const DarkModeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>({
  theme: 'light',
  toggleTheme: () => {},
})

export const useDarkMode = () => useContext(DarkModeContext)

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'))
  }, [])

  useEffect(() => {
    if (mounted) {
      const root = document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(theme)
      localStorage.setItem('theme', theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  if (!mounted) return null

  return (
    <DarkModeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  )
}
```

### 3. Framer Motion Variants Library

`lib/animations.ts`:

```typescript
import { Variants } from 'framer-motion'

// Easing curves
export const easing = {
  smooth: [0.25, 0.1, 0.25, 1],
  entrance: [0.32, 0.72, 0, 1],
  exit: [0.4, 0, 1, 1],
}

export const spring = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 15,
}

// Common variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easing.entrance },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: easing.smooth },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easing.entrance },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easing.entrance },
  },
}
```

### 4. Scroll Progress Component

`components/ScrollProgress.tsx`:

```typescript
'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent-red dark:bg-accent-red-dark z-50 origin-left"
      style={{ scaleX }}
    />
  )
}
```

### 5. Navigation Component

`components/Navigation.tsx`:

```typescript
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DarkModeToggle from './DarkModeToggle'

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.slice(1))
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="fixed top-0 left-0 right-0 z-40 bg-white/70 dark:bg-dark-bg/70 backdrop-blur-apple border-b border-gray-200/50 dark:border-gray-800/50"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-16">
              <motion.div
                className="font-semibold text-apple-dark dark:text-white"
                whileHover={{ scale: 1.05 }}
              >
                Your Name
              </motion.div>

              <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="relative text-sm text-apple-text-secondary dark:text-dark-text-secondary hover:text-apple-dark dark:hover:text-white transition-colors"
                  >
                    {item.name}
                    {activeSection === item.href.slice(1) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent-red dark:bg-accent-red-dark"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
```

### 6. Hero Section

`components/sections/Hero.tsx`:

```typescript
'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function Hero() {
  const nameText = "Hi, I'm Your Name"

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-dark-bg">
      {/* Background gradient animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-red/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-red/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6"
      >
        {/* Name with character reveal */}
        <motion.h1
          className="text-5xl md:text-hero font-bold text-apple-dark dark:text-white mb-4"
          initial="hidden"
          animate="visible"
        >
          {nameText.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.6,
                delay: i * 0.03,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.h2
          variants={fadeInUp}
          className="text-4xl md:text-section-title font-bold text-accent-red dark:text-accent-red-dark mb-6"
        >
          Frontend Developer
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-body-large text-apple-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto mb-12"
        >
          Crafting pixel-perfect experiences with code
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#projects"
            className="px-8 py-4 bg-accent-red dark:bg-accent-red-dark text-white rounded-full font-medium hover:scale-105 hover:shadow-lg hover:shadow-accent-red/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See My Work ↓
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-4 border-2 border-accent-red dark:border-accent-red-dark text-accent-red dark:text-accent-red-dark rounded-full font-medium hover:bg-accent-red hover:text-white dark:hover:bg-accent-red-dark transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-apple-text-tertiary dark:text-dark-text-secondary">⌄</div>
        </motion.div>
      </motion.div>
    </section>
  )
}
```

### 7. Reusable Button Component

`components/ui/Button.tsx`:

```typescript
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'px-8 py-4 rounded-full font-medium transition-all'

  const variantStyles = {
    primary: 'bg-accent-red dark:bg-accent-red-dark text-white hover:shadow-lg hover:shadow-accent-red/30',
    secondary: 'border-2 border-accent-red dark:border-accent-red-dark text-accent-red dark:text-accent-red-dark hover:bg-accent-red hover:text-white dark:hover:bg-accent-red-dark',
    ghost: 'text-apple-dark dark:text-white hover:bg-apple-gray dark:hover:bg-dark-secondary',
  }

  return (
    <motion.button
      className={cn(baseStyles, variantStyles[variant], className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
```

### 8. Utility Functions

`lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
```

---

## Custom Hooks

### useInViewAnimation Hook

`hooks/useInViewAnimation.ts`:

```typescript
import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'
import { useEffect } from 'react'

export function useInViewAnimation(threshold = 0.2) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return { ref, controls }
}
```

### useMousePosition Hook

`hooks/useMousePosition.ts`:

```typescript
import { useState, useEffect } from 'react'

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return position
}
```

---

## Global Styles

`app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }

  html {
    @apply scroll-smooth;
  }

  body {
    @apply bg-white dark:bg-dark-bg text-apple-dark dark:text-white font-apple antialiased;
  }

  /* Smooth color transitions for dark mode */
  * {
    @apply transition-colors duration-300;
  }
}

@layer utilities {
  /* Custom scrollbar */
  .scrollbar-thin::-webkit-scrollbar {
    width: 8px;
  }

  .scrollbar-thin::-webkit-scrollbar-track {
    @apply bg-transparent;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb {
    @apply bg-apple-text-tertiary dark:bg-dark-text-secondary rounded-full;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    @apply bg-accent-red dark:bg-accent-red-dark;
  }

  /* Glass effect */
  .glass {
    @apply bg-white/70 dark:bg-dark-secondary/70 backdrop-blur-apple;
  }

  /* Text gradient */
  .text-gradient {
    @apply bg-gradient-to-r from-accent-red to-accent-red-hover bg-clip-text text-transparent;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance Optimization Tips

### 1. Image Optimization

```typescript
import Image from 'next/image'

<Image
  src="/projects/project1.jpg"
  alt="Project name"
  width={800}
  height={600}
  className="rounded-2xl"
  placeholder="blur"
  blurDataURL="data:image/..." // Generate with Sharp or Plaiceholder
  loading="lazy"
/>
```

### 2. Code Splitting

```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic'

const Projects = dynamic(() => import('@/components/sections/Projects'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
})
```

### 3. Framer Motion Performance

```typescript
// Use layout animations for smooth transitions
<motion.div layout layoutId="uniqueId">

// Avoid animating expensive properties
// Good: transform, opacity
// Bad: width, height, margin

// Use will-change sparingly
<motion.div style={{ willChange: 'transform' }}>
```

---

## Deployment Checklist

### Before Deploying:

- ✅ Optimize images (WebP format, proper sizing)
- ✅ Add meta tags and OpenGraph images
- ✅ Test on multiple browsers
- ✅ Verify mobile responsiveness
- ✅ Test dark mode thoroughly
- ✅ Check accessibility (keyboard navigation, screen readers)
- ✅ Verify all animations respect `prefers-reduced-motion`
- ✅ Run Lighthouse audit (aim for 90+ on all metrics)
- ✅ Add proper error boundaries
- ✅ Set up analytics (optional)

### Deploy to Vercel:

```bash
# Connect to GitHub and push
git add .
git commit -m "Initial portfolio deployment"
git push

# Or deploy directly
npx vercel
```

---

## Next Steps After Basic Implementation

1. **Add Blog** (optional): Using MDX for articles
2. **Analytics**: Vercel Analytics or Plausible
3. **Contact Form Backend**: Resend, SendGrid, or Formspree
4. **CMS Integration**: Sanity or ContentLayer for projects
5. **Testing**: Playwright for E2E, Vitest for unit tests
6. **SEO**: Next.js metadata API, sitemap, robots.txt
7. **Progressive Enhancement**: Add service worker for offline support

---

This implementation guide provides everything you need to build the portfolio from scratch. Start with the foundation (layout, dark mode, navigation) then layer in animations and micro-interactions progressively.

The key is to build incrementally — make it work, make it beautiful, then make it delightful.
