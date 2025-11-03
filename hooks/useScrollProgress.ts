import { useState, useEffect } from 'react'

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      const totalScrollableDistance = documentHeight - windowHeight
      const progress = (scrollTop / totalScrollableDistance) * 100

      setScrollProgress(Math.min(progress, 100))
    }

    handleScroll() // Initial calculation
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollProgress
}
