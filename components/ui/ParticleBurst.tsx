'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
  shape: 'circle' | 'square'
}

interface ParticleBurstProps {
  count?: number
  minSize?: number
  maxSize?: number
  minOpacity?: number
  maxOpacity?: number
  minDuration?: number
  maxDuration?: number
  minY?: number
  maxY?: number
  minX?: number
  maxX?: number
}

export default function ParticleBurst({
  count = 80,
  minSize = 4,
  maxSize = 8,
  minOpacity = 0.15,
  maxOpacity = 0.4,
  minDuration = 3,
  maxDuration = 8,
  minY = -20,
  maxY = 0,
  minX = -10,
  maxX = 10,
}: ParticleBurstProps = {}) {
  // Generate random particles
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // 0-100% position
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
      duration: Math.random() * (maxDuration - minDuration) + minDuration,
      delay: Math.random() * 3, // 0-3 seconds delay
      shape: Math.random() > 0.5 ? 'circle' : 'square',
    }))
  }, [count, minSize, maxSize, minOpacity, maxOpacity, minDuration, maxDuration])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={particle.shape === 'circle' ? 'rounded-full' : 'rounded-sm'}
          animate={{
            y: [0, minY, 0],
            x: [minX, maxX, minX],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: 'var(--particle-color)',
            opacity: particle.opacity,
            willChange: 'transform',
            zIndex: 5,
          }}
        />
      ))}
    </div>
  )
}
