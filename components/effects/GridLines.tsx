'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface GridLinesProps {
  gridSize?: number
  opacity?: number
}

export default function GridLines({ gridSize = 50, opacity = 0.06 }: GridLinesProps) {
  const gridPattern = useMemo(() => {
    const lines = []
    const count = 20 // จำนวนเส้น

    // Vertical lines
    for (let i = 0; i <= count; i++) {
      lines.push(
        <line
          key={`v-${i}`}
          x1={`${(i / count) * 100}%`}
          y1="0%"
          x2={`${(i / count) * 100}%`}
          y2="100%"
          stroke="currentColor"
          strokeWidth="1"
          opacity={opacity}
        />
      )
    }

    // Horizontal lines
    for (let i = 0; i <= count; i++) {
      lines.push(
        <line
          key={`h-${i}`}
          x1="0%"
          y1={`${(i / count) * 100}%`}
          x2="100%"
          y2={`${(i / count) * 100}%`}
          stroke="currentColor"
          strokeWidth="1"
          opacity={opacity}
        />
      )
    }

    return lines
  }, [gridSize, opacity])

  return (
    <motion.div
      className="absolute inset-0 z-[5] pointer-events-none text-white"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        y: [0, -15, 0],
        x: [0, 5, 0]
      }}
      transition={{
        opacity: { duration: 1 },
        y: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
        x: { duration: 25, repeat: Infinity, ease: 'easeInOut' }
      }}
      style={{
        willChange: 'transform',
      }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {gridPattern}
      </svg>
    </motion.div>
  )
}
