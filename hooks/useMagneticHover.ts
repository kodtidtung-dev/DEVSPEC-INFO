import { useRef, useEffect, useState } from 'react'

interface MagneticConfig {
  strength?: number // 0-1, how much the element moves
  radius?: number // pixels, detection radius
}

export function useMagneticHover(config: MagneticConfig = {}) {
  const { strength = 0.3, radius = 100 } = config
  const ref = useRef<HTMLElement>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      if (distance < radius) {
        const factor = (1 - distance / radius) * strength
        setTransform({
          x: deltaX * factor,
          y: deltaY * factor,
        })
      } else {
        setTransform({ x: 0, y: 0 })
      }
    }

    const handleMouseLeave = () => {
      setTransform({ x: 0, y: 0 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength, radius])

  return { ref, transform }
}
