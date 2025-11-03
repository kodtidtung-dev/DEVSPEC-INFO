'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Trail {
  id: number
  x: number
  y: number
}

export default function CursorLightTrail() {
  const [trails, setTrails] = useState<Trail[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let trailId = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.querySelector('.cursor-trail-container')?.getBoundingClientRect()
      if (!rect) return

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setMousePosition({ x, y })

      // Add new trail
      const newTrail: Trail = {
        id: trailId++,
        x,
        y,
      }

      setTrails((prev) => [...prev, newTrail])

      // Remove trail after animation completes
      setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== newTrail.id))
      }, 1000)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="cursor-trail-container absolute inset-0 z-[5] pointer-events-none overflow-hidden">
      {/* Cursor Glow */}
      {mousePosition.x > 0 && mousePosition.y > 0 && (
        <motion.div
          className="absolute w-32 h-32 rounded-full pointer-events-none"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(255, 51, 51, 0.3) 0%, rgba(255, 51, 51, 0.1) 40%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Trail Particles */}
      <AnimatePresence>
        {trails.map((trail) => (
          <motion.div
            key={trail.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: trail.x,
              top: trail.y,
              background: '#FF3333',
              boxShadow: '0 0 10px rgba(255, 51, 51, 0.8)',
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
