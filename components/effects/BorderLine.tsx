'use client'

import { motion } from 'framer-motion'

interface BorderLineProps {
  position?: 'left' | 'right'
  height?: number
}

export default function BorderLine({ position = 'left', height = 100 }: BorderLineProps) {
  return (
    <motion.div
      className="absolute z-[7] pointer-events-none"
      style={{
        [position]: 0,
        top: 0,
        bottom: 0,
        width: '3px',
        height: `${height}%`,
        willChange: 'transform, opacity',
      }}
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{
        opacity: [0.4, 0.6, 0.4],
        scaleY: [1, 1.05, 1],
        boxShadow: [
          '0 0 10px rgba(255, 51, 51, 0.3)',
          '0 0 20px rgba(255, 51, 51, 0.5)',
          '0 0 10px rgba(255, 51, 51, 0.3)'
        ]
      }}
      transition={{
        opacity: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
        scaleY: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
        boxShadow: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
      }}
    >
      <div
        className="w-full h-full"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 51, 51, 0.4) 50%, transparent 100%)',
          boxShadow: '0 0 10px rgba(255, 51, 51, 0.3)',
        }}
      />
    </motion.div>
  )
}
