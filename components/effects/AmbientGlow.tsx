'use client'

import { motion } from 'framer-motion'

interface AmbientGlowProps {
  pulseSpeed?: number
  glowColor?: string
  intensity?: number
}

export default function AmbientGlow({
  pulseSpeed = 2,
  glowColor = '#FF3333',
  intensity = 0.2
}: AmbientGlowProps) {
  return (
    <motion.div
      className="absolute z-[8] pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        width: '400px',
        height: '400px',
        marginLeft: '-200px',
        marginTop: '-200px',
        borderRadius: '50%',
        willChange: 'transform, opacity',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [intensity, intensity + 0.1, intensity],
        scale: [1, 1.1, 1],
        boxShadow: [
          `0 0 60px 20px ${glowColor}${Math.floor(intensity * 255).toString(16).padStart(2, '0')}`,
          `0 0 80px 30px ${glowColor}${Math.floor((intensity + 0.1) * 255).toString(16).padStart(2, '0')}`,
          `0 0 60px 20px ${glowColor}${Math.floor(intensity * 255).toString(16).padStart(2, '0')}`
        ]
      }}
      transition={{
        opacity: { duration: pulseSpeed, repeat: Infinity, ease: 'easeInOut' },
        scale: { duration: pulseSpeed, repeat: Infinity, ease: 'easeInOut' },
        boxShadow: { duration: pulseSpeed, repeat: Infinity, ease: 'easeInOut' }
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle, ${glowColor}40 0%, ${glowColor}20 30%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />
    </motion.div>
  )
}
