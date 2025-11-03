'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import * as React from 'react'

interface OrbitalBadge {
  icon: ReactNode
  label: string
  startAngle: number // Starting position in degrees (0-360)
}

interface OrbitalBadgesProps {
  isConverging: boolean
  isAnimating: boolean
  badges: OrbitalBadge[]
}

export default function OrbitalBadges({ isConverging, isAnimating, badges }: OrbitalBadgesProps) {
  // Responsive orbital radius
  const getRadius = () => {
    if (typeof window === 'undefined') return 250
    return window.innerWidth >= 1024 ? 250 : 150 // Smaller radius for mobile/tablet
  }

  const [radius, setRadius] = React.useState(getRadius())
  const duration = 35 // Duration for one complete orbit

  React.useEffect(() => {
    const handleResize = () => setRadius(getRadius())
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Generate orbital path coordinates (12 points for smooth circle)
  const generateOrbitPath = (startAngle: number) => {
    const points = 12
    const xPath: number[] = []
    const yPath: number[] = []

    for (let i = 0; i < points; i++) {
      const angle = ((startAngle + (i * 360) / points) * Math.PI) / 180
      xPath.push(Math.cos(angle) * radius)
      yPath.push(Math.sin(angle) * radius)
    }

    return { x: xPath, y: yPath }
  }

  return (
    <>
      {badges.map((badge, index) => {
        const path = generateOrbitPath(badge.startAngle)

        return (
          <motion.div
            key={index}
            animate={isConverging ? {
              x: 0,
              y: 0,
              rotate: 720,
              scale: 0,
              opacity: 0,
              zIndex: -10,
            } : isAnimating ? {
              x: path.x[0],
              y: path.y[0],
              rotate: 0,
              scale: 1,
              opacity: 1,
              zIndex: 10,
            } : {
              x: path.x,
              y: path.y,
              zIndex: 10,
            }}
            transition={isConverging ? {
              duration: 0.8,
              ease: [0.32, 0.72, 0, 1],
            } : isAnimating ? {
              type: 'spring',
              stiffness: 100,
              damping: 15,
              mass: 1,
            } : {
              duration: duration,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 glass px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium flex items-center gap-1.5 lg:gap-2"
            style={{
              // Subtle trail effect during movement
              filter: (isConverging || isAnimating) ? 'blur(0.5px)' : 'blur(0px)',
              boxShadow: (isConverging || isAnimating)
                ? '0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.2)'
                : 'none',
            }}
          >
            <span className="w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center shrink-0">
              {badge.icon}
            </span>
            <span className="hidden sm:inline">{badge.label}</span>
          </motion.div>
        )
      })}
    </>
  )
}
