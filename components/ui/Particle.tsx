'use client'

import { motion } from 'framer-motion'

interface ParticleProps {
  id: number
  x: number
  y: number
  color: string
  size: number
  life: number
  maxLife: number
  shape: 'circle' | 'star' | 'dot'
}

export default function Particle({ x, y, color, size, life, maxLife, shape }: ParticleProps) {
  const opacity = life / maxLife

  const renderShape = () => {
    switch (shape) {
      case 'star':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ opacity }}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )
      case 'dot':
        return (
          <div
            style={{
              width: size * 0.6,
              height: size * 0.6,
              backgroundColor: color,
              borderRadius: '50%',
              opacity,
            }}
          />
        )
      case 'circle':
      default:
        return (
          <div
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: '50%',
              opacity,
              boxShadow: `0 0 ${size * 2}px ${color}`,
            }}
          />
        )
    }
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        pointerEvents: 'none',
        zIndex: 100,
      }}
      transition={{ duration: 0.2 }}
    >
      {renderShape()}
    </motion.div>
  )
}
