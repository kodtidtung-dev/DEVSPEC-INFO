'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useMagneticHover } from '@/hooks/useMagneticHover'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true)
  const [isCompact, setIsCompact] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const scrollProgress = useScrollProgress()

  const logoMagnetic = useMagneticHover({ strength: 0.3, radius: 80 })
  const themeMagnetic = useMagneticHover({ strength: 0.2, radius: 60 })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // At top of page
      if (currentScrollY < 50) {
        setIsVisible(true)
        setIsCompact(false)
      }
      // Scrolling up - show compact navbar
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
        setIsCompact(true)
      }
      // Scrolling down - hide navbar
      else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false)
        setIsCompact(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  if (!mounted) return null

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-linear-to-r from-accent-red via-accent-hover to-accent-red z-100 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: '-100%' }}
        animate={{ y: isVisible ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed top-0 left-0 right-0 z-60"
      >
        <motion.div
          animate={{
            paddingTop: isCompact && !isHovered ? '12px' : '24px',
            paddingBottom: isCompact && !isHovered ? '12px' : '24px',
            backgroundColor: isCompact && !isHovered ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0)',
            backdropFilter: isCompact && !isHovered ? 'blur(8px)' : 'blur(0px)'
          }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="w-full"
        >
        <div className="container-custom">
          <div className="flex items-center justify-end md:justify-center lg:justify-between gap-4 w-full">
            {/* Left: Logo - Hidden on mobile and tablet */}
            <motion.a
              ref={logoMagnetic.ref as any}
              href="#home"
              className="hidden lg:block shrink-0 magnetic"
              style={{
                transform: `translate(${logoMagnetic.transform.x}px, ${logoMagnetic.transform.y}px)`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#home')
              }}
            >
              {/* 3D Cube Container */}
              <div
                className="relative w-[180px] lg:w-[220px] h-32 lg:h-40"
                style={{ perspective: '1200px' }}
              >
                <motion.div
                  className="relative w-full h-full"
                  style={{
                    transformStyle: 'preserve-3d',
                    willChange: 'transform'
                  }}
                  initial={{ rotateX: 0, rotateY: 0 }}
                  whileHover={{
                    rotateX: -35,
                    rotateY: 45
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  {/* Front Face - DEVSPEC Logo */}
                  <div
                    className="absolute w-full h-full flex items-center justify-center"
                    style={{
                      transform: 'translateZ(40px)',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={theme === 'dark' ? '/devspec-w.png' : '/devspec-b.png'}
                        alt="devspec logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  {/* Back Face - DEVSPEC Logo (Flipped) */}
                  <div
                    className="absolute w-full h-full flex items-center justify-center"
                    style={{
                      transform: 'translateZ(-40px) rotateY(180deg)',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="relative w-full h-full opacity-30">
                      <Image
                        src={theme === 'dark' ? '/devspec-w.png' : '/devspec-b.png'}
                        alt="devspec logo back"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Top Face - "LET'S DEV" with Glass Effect */}
                  <div
                    className="absolute w-full h-20 flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10"
                    style={{
                      transform: 'rotateX(90deg) translateZ(40px)',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <span className="text-white text-sm font-bold tracking-wider">LET'S DEV</span>
                  </div>

                  {/* Bottom Face - Pattern with Glass Effect */}
                  <div
                    className="absolute w-full h-20 flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10"
                    style={{
                      transform: 'rotateX(-90deg) translateZ(40px)',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="w-full h-full opacity-20 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-size-[10px_10px]" />
                  </div>

                  {/* Left Face - "LET'S DEV" Text with Glass Effect */}
                  <div
                    className="absolute w-20 h-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center"
                    style={{
                      transform: 'rotateY(-90deg) translateZ(110px)',
                      backfaceVisibility: 'hidden',
                      writingMode: 'vertical-rl',
                      left: 0
                    }}
                  >
                    <span className="text-white text-base font-bold tracking-wider">
                      LET'S DEV
                    </span>
                  </div>

                  {/* Right Face - "LET'S DEV" Text with Glass Effect */}
                  <div
                    className="absolute w-20 h-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center"
                    style={{
                      transform: 'rotateY(90deg) translateZ(110px)',
                      backfaceVisibility: 'hidden',
                      writingMode: 'vertical-rl',
                      right: 0
                    }}
                  >
                    <span className="text-white text-base font-bold tracking-wider">
                      LET'S DEV
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.a>

            {/* Menu Items - Center */}
            <div className="hidden md:flex items-center justify-center gap-4 lg:gap-8 lg:flex-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="relative text-text-secondary hover:text-text-primary transition-colors group whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-red group-hover:w-full transition-all duration-300"
                    whileHover={{ width: '100%' }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Theme Toggle - Right */}
            <motion.button
              ref={themeMagnetic.ref as any}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hidden md:block shrink-0 p-2 rounded-lg glass magnetic hover:red-glow transition-all"
              style={{
                transform: `translate(${themeMagnetic.transform.x}px, ${themeMagnetic.transform.y}px)`,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-5 h-5 text-accent-red" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-5 h-5 text-accent-red" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button - Positioned on the right */}
            <motion.button
              className="md:hidden p-3 rounded-lg glass"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-6 h-6 text-accent-red" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="w-6 h-6 text-accent-red" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-surface glass z-50 md:hidden"
            >
              <div className="flex flex-col h-full p-8 pt-16">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="relative w-50 h-90"
                  >
                    <Image
                      src={theme === 'dark' ? '/devspec-w.png' : '/devspec-b.png'}
                      alt="devspec logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </div>

                {/* Menu Items */}
                <nav className="flex flex-col gap-8 flex-1 justify-start items-center pt-4">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="text-3xl font-bold text-text-secondary hover:text-accent-red transition-colors text-center"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(item.href)
                      }}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>

                {/* Divider */}
                <div className="h-px bg-linear-to-r from-transparent via-text-secondary/30 to-transparent my-6" />

                {/* Theme Toggle */}
                <motion.button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center justify-center gap-3 p-4 rounded-xl glass hover:red-glow transition-all"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {theme === 'dark' ? (
                    <>
                      <Moon className="w-5 h-5 text-accent-red" />
                      <span className="text-base font-medium">Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-5 h-5 text-accent-red" />
                      <span className="text-base font-medium">Light Mode</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
