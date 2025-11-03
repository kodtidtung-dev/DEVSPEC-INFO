# คู่มือการพัฒนา
### Next.js + TypeScript + Tailwind + Framer Motion

---

## การตั้งค่าโปรเจค

### 1. สร้างโปรเจค Next.js

```bash
npx create-next-app@latest portfolio --typescript --tailwind --app --no-src-dir
cd portfolio
```

### 2. ติดตั้ง Dependencies

```bash
# Framer Motion สำหรับแอนิเมชัน
npm install framer-motion

# เครื่องมือเสริม
npm install clsx tailwind-merge

# จัดการฟอร์ม (สำหรับฟอร์มติดต่อ)
npm install react-hook-form zod @hookform/resolvers

# ไอคอน (ถ้าต้องการ)
npm install lucide-react

# Hook สำหรับ Intersection Observer
npm install react-intersection-observer
```

### 3. ตั้งค่า Tailwind

อัปเดต `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // เปิดใช้งานโหมดมืดแบบ class
  theme: {
    extend: {
      colors: {
        // โหมดสว่าง
        'apple-gray': '#F5F5F7',
        'apple-dark': '#1D1D1F',
        'apple-text-secondary': '#6E6E73',
        'apple-text-tertiary': '#86868B',

        // โหมดมืด
        'dark-bg': '#000000',
        'dark-secondary': '#1C1C1E',
        'dark-tertiary': '#2C2C2E',
        'dark-text-secondary': '#A1A1A6',

        // สีเน้น
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

## โครงสร้างโฟลเดอร์

```
portfolio/
├── app/
│   ├── layout.tsx           # Layout หลักพร้อม dark mode provider
│   ├── page.tsx             # หน้าหลัก (ทุกส่วน)
│   ├── globals.css          # สไตล์ส่วนกลาง
│   └── fonts/               # ฟอนต์ที่กำหนดเอง (ถ้ามี)
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
│   ├── utils.ts             # ฟังก์ชันเครื่องมือ
│   └── animations.ts        # Variants สำหรับ Framer Motion
├── public/
│   ├── images/
│   ├── projects/
│   └── resume.pdf
└── types/
    └── index.ts
```

---

## การพัฒนา Components หลัก

### 1. Root Layout พร้อม Dark Mode

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
  title: 'ชื่อคุณ | Frontend Developer',
  description: 'พอร์ตโฟลิโอของ Frontend Developer ที่เชี่ยวชาญ React, Next.js และเทคโนโลยีเว็บสมัยใหม่',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" suppressHydrationWarning>
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

### 3. ไลบรารี Variants สำหรับ Framer Motion

`lib/animations.ts`:

```typescript
import { Variants } from 'framer-motion'

// เส้นโค้งการเคลื่อนไหว
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

// Variants ทั่วไป
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

### 4. Component แสดงความคืบหน้าการเลื่อน

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

### 5. Component เมนู Navigation

`components/Navigation.tsx`:

```typescript
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DarkModeToggle from './DarkModeToggle'

const navItems = [
  { name: 'เกี่ยวกับ', href: '#about' },
  { name: 'ทักษะ', href: '#skills' },
  { name: 'โปรเจค', href: '#projects' },
  { name: 'ติดต่อ', href: '#contact' },
]

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)

      // อัปเดตส่วนที่ active ตามตำแหน่งการเลื่อน
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
                ชื่อคุณ
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

### 6. ส่วน Hero

`components/sections/Hero.tsx`:

```typescript
'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function Hero() {
  const nameText = "สวัสดี ผม[ชื่อคุณ]"

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-dark-bg">
      {/* แอนิเมชันพื้นหลังแบบ gradient */}
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
        {/* ชื่อพร้อมเอฟเฟค reveal แบบตัวอักษรทีละตัว */}
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
          สร้างประสบการณ์ที่สมบูรณ์แบบด้วยโค้ด
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
            ดูผลงาน ↓
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-4 border-2 border-accent-red dark:border-accent-red-dark text-accent-red dark:text-accent-red-dark rounded-full font-medium hover:bg-accent-red hover:text-white dark:hover:bg-accent-red-dark transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ติดต่อเรา
          </motion.a>
        </motion.div>

        {/* ตัวบอกให้เลื่อน */}
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

### 7. Component ปุ่มที่ใช้ซ้ำได้

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

### 8. ฟังก์ชันเครื่องมือ

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

### Hook useInViewAnimation

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

### Hook useMousePosition

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

## สไตล์ส่วนกลาง

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

  /* การเปลี่ยนสีที่นุ่มนวลสำหรับโหมดมืด */
  * {
    @apply transition-colors duration-300;
  }
}

@layer utilities {
  /* Scrollbar แบบกำหนดเอง */
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

  /* เอฟเฟคกระจก */
  .glass {
    @apply bg-white/70 dark:bg-dark-secondary/70 backdrop-blur-apple;
  }

  /* Gradient สำหรับข้อความ */
  .text-gradient {
    @apply bg-gradient-to-r from-accent-red to-accent-red-hover bg-clip-text text-transparent;
  }
}

/* รองรับโหมด reduced motion */
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

## เคล็ดลับการเพิ่มประสิทธิภาพ

### 1. การเพิ่มประสิทธิภาพรูปภาพ

```typescript
import Image from 'next/image'

<Image
  src="/projects/project1.jpg"
  alt="ชื่อโปรเจค"
  width={800}
  height={600}
  className="rounded-2xl"
  placeholder="blur"
  blurDataURL="data:image/..." // สร้างด้วย Sharp หรือ Plaiceholder
  loading="lazy"
/>
```

### 2. Code Splitting

```typescript
// โหลด components หนักๆ แบบ lazy
import dynamic from 'next/dynamic'

const Projects = dynamic(() => import('@/components/sections/Projects'), {
  loading: () => <div>กำลังโหลด...</div>,
  ssr: true,
})
```

### 3. ประสิทธิภาพของ Framer Motion

```typescript
// ใช้ layout animations สำหรับการเปลี่ยนแปลงที่นุ่มนวล
<motion.div layout layoutId="uniqueId">

// หลีกเลี่ยงการทำแอนิเมชัน properties ที่หนัก
// ดี: transform, opacity
// ไม่ดี: width, height, margin

// ใช้ will-change อย่างระมัดระวัง
<motion.div style={{ willChange: 'transform' }}>
```

---

## เช็คลิสต์ก่อน Deploy

### ก่อน Deploy:

- ✅ เพิ่มประสิทธิภาพรูปภาพ (รูปแบบ WebP, ขนาดที่เหมาะสม)
- ✅ เพิ่ม meta tags และภาพ OpenGraph
- ✅ ทดสอบบนเบราว์เซอร์หลายตัว
- ✅ ตรวจสอบการตอบสนองบนมือถือ
- ✅ ทดสอบโหมดมืดอย่างละเอียด
- ✅ ตรวจสอบการเข้าถึง (keyboard navigation, screen readers)
- ✅ ตรวจสอบว่าแอนิเมชันทั้งหมดเคารพ `prefers-reduced-motion`
- ✅ รัน Lighthouse audit (ตั้งเป้า 90+ ทุกเมตริก)
- ✅ เพิ่ม error boundaries ที่เหมาะสม
- ✅ ตั้งค่า analytics (ถ้าต้องการ)

### Deploy ไปยัง Vercel:

```bash
# เชื่อมต่อกับ GitHub และ push
git add .
git commit -m "Deploy พอร์ตโฟลิโอครั้งแรก"
git push

# หรือ deploy โดยตรง
npx vercel
```

---

## ขั้นตอนถัดไปหลังจากทำพื้นฐานเสร็จ

1. **เพิ่มบล็อก** (ถ้าต้องการ): ใช้ MDX สำหรับบทความ
2. **Analytics**: Vercel Analytics หรือ Plausible
3. **Backend ฟอร์มติดต่อ**: Resend, SendGrid หรือ Formspree
4. **รวม CMS**: Sanity หรือ ContentLayer สำหรับโปรเจค
5. **การทดสอบ**: Playwright สำหรับ E2E, Vitest สำหรับ unit tests
6. **SEO**: Next.js metadata API, sitemap, robots.txt
7. **Progressive Enhancement**: เพิ่ม service worker สำหรับรองรับ offline

---

คู่มือนี้มีทุกอย่างที่คุณต้องการในการสร้างพอร์ตโฟลิโอตั้งแต่เริ่มต้น เริ่มจากโครงสร้างพื้นฐาน (layout, dark mode, navigation) จากนั้นค่อยๆ เพิ่มแอนิเมชันและ micro-interactions

สิ่งสำคัญคือการพัฒนาทีละน้อย — ทำให้มันทำงานได้ก่อน ทำให้มันสวย แล้วจึงทำให้มันน่าประทับใจ
