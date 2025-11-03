'use client'

import { useState, useCallback, useRef } from 'react'
import confetti from 'canvas-confetti'

interface Particle {
  id: number
  x: number
  y: number
  velocity: { x: number; y: number }
  color: string
  size: number
  life: number
  shape: 'circle' | 'star' | 'dot'
}

interface UseParticlesOptions {
  count?: number
  colors?: string[]
  maxLife?: number
  spread?: number
  confettiOnClick?: boolean
}

export function useParticles(options: UseParticlesOptions = {}) {
  const {
    count = 15,
    colors = ['#FF3333', '#FF5555', '#FF8888', '#FFFFFF'],
    maxLife = 60,
    spread = 100,
    confettiOnClick = false,
  } = options

  const [particles, setParticles] = useState<Particle[]>([])
  const particleIdRef = useRef(0)
  const animationFrameRef = useRef<number | undefined>(undefined)

  const createParticle = useCallback(
    (centerX: number, centerY: number): Particle => {
      const angle = Math.random() * Math.PI * 2
      const velocity = 1 + Math.random() * 2
      const size = 2 + Math.random() * 4
      const shapes: Array<'circle' | 'star' | 'dot'> = ['circle', 'star', 'dot']

      return {
        id: particleIdRef.current++,
        x: centerX,
        y: centerY,
        velocity: {
          x: Math.cos(angle) * velocity,
          y: Math.sin(angle) * velocity - 2, // Bias upward
        },
        color: colors[Math.floor(Math.random() * colors.length)],
        size,
        life: maxLife,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      }
    },
    [colors, maxLife]
  )

  const spawnParticles = useCallback(
    (x: number, y: number, customCount?: number) => {
      const newParticles: Particle[] = []
      const particleCount = customCount || count

      for (let i = 0; i < particleCount; i++) {
        newParticles.push(createParticle(x, y))
      }

      setParticles((prev) => [...prev, ...newParticles])
    },
    [count, createParticle]
  )

  const updateParticles = useCallback(() => {
    setParticles((prev) => {
      const updated = prev
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.velocity.x,
          y: particle.y + particle.velocity.y,
          velocity: {
            x: particle.velocity.x * 0.98, // Air resistance
            y: particle.velocity.y + 0.1, // Gravity
          },
          life: particle.life - 1,
        }))
        .filter((particle) => particle.life > 0)

      if (updated.length > 0) {
        animationFrameRef.current = requestAnimationFrame(updateParticles)
      }

      return updated
    })
  }, [])

  const startAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    animationFrameRef.current = requestAnimationFrame(updateParticles)
  }, [updateParticles])

  const triggerConfetti = useCallback((event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x, y },
      colors: ['#FF3333', '#FF5555', '#FF8888', '#FFFFFF', '#FFB3B3'],
      ticks: 200,
      gravity: 1,
      scalar: 1.2,
      drift: 0,
      shapes: ['circle', 'square'],
      startVelocity: 30,
    })
  }, [])

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent) => {
      const rect = event.currentTarget.getBoundingClientRect()
      const x = rect.width / 2
      const y = rect.height / 2

      spawnParticles(x, y)
      startAnimation()
    },
    [spawnParticles, startAnimation]
  )

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (confettiOnClick) {
        triggerConfetti(event)
      }
    },
    [confettiOnClick, triggerConfetti]
  )

  return {
    particles,
    handleMouseEnter,
    handleClick,
    spawnParticles,
    triggerConfetti,
  }
}
