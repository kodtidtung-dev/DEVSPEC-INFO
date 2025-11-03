'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

interface SwipeButtonProps {
  onUnlock: () => void
  icon: React.ReactNode
  text: string
  variant?: 'primary' | 'secondary'
}

export default function SwipeButton({ onUnlock, icon, text, variant = 'primary' }: SwipeButtonProps) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isDraggable, setIsDraggable] = useState(true)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  const SLIDER_SIZE = 48 // w-12 h-12
  const THRESHOLD = 0.7 // 70% swipe required to unlock

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxDrag = containerWidth - SLIDER_SIZE - 8 // 8px for padding

  // Transform values for animations
  const background = useTransform(x, [0, maxDrag], ['0%', '100%'])
  const opacity = useTransform(x, [0, maxDrag * 0.5, maxDrag], [1, 0.5, 0])
  const iconRotate = useTransform(x, [0, maxDrag], [0, 360])

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dragDistance = info.offset.x
    const dragThreshold = maxDrag * THRESHOLD

    if (dragDistance >= dragThreshold) {
      // Unlocked!
      setIsUnlocked(true)
      setIsDraggable(false)

      // Hold at full position
      await x.set(maxDrag)

      // Wait a moment to show "UNLOCKED" state
      setTimeout(() => {
        // Snap back to start
        x.set(0)

        // Navigate after snap back animation
        setTimeout(() => {
          onUnlock()
          // Reset state
          setIsUnlocked(false)
          setIsDraggable(true)
        }, 300)
      }, 400)
    } else {
      // Snap back with animation
      await x.set(0)
    }
  }

  const isPrimary = variant === 'primary'

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-14 rounded-full overflow-hidden ${
        isPrimary
          ? 'bg-accent-red/20 border-2 border-accent-red'
          : 'bg-white/10 border-2 border-white/30 backdrop-blur-sm'
      }`}
    >
      {/* Progress Background */}
      <motion.div
        className={`absolute inset-0 ${isPrimary ? 'bg-accent-red' : 'bg-white/20'}`}
        style={{
          scaleX: background,
          transformOrigin: 'left',
          opacity: isPrimary ? 0.3 : 0.5,
        }}
      />

      {/* Text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity }}
      >
        <span className={`text-sm font-bold tracking-wider uppercase ${
          isPrimary ? 'text-white' : 'text-white drop-shadow-lg'
        }`}>
          {isUnlocked ? 'UNLOCKED!' : `SWIPE TO ${text.toUpperCase()}`}
        </span>
      </motion.div>

      {/* Chevron hints */}
      <div className="absolute inset-0 flex items-center justify-end pr-4 pointer-events-none">
        <motion.div
          style={{ opacity }}
          className="flex gap-1"
        >
          <ChevronRight className="w-4 h-4 text-white/40" />
          <ChevronRight className="w-4 h-4 text-white/60" />
          <ChevronRight className="w-4 h-4 text-white/80" />
        </motion.div>
      </div>

      {/* Draggable Slider */}
      <motion.div
        drag={isDraggable ? "x" : false}
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0.1}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className={`absolute top-1 left-1 w-12 h-12 rounded-full shadow-lg flex items-center justify-center ${
          isPrimary ? 'bg-white' : 'bg-white'
        } ${isDraggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
        whileTap={isDraggable ? { scale: 1.1 } : {}}
        animate={isUnlocked ? { x: maxDrag } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div style={{ rotate: iconRotate }}>
          <div className={isPrimary ? 'text-accent-red' : 'text-accent-red'}>
            {icon}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
