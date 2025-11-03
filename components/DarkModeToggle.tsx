'use client'

import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useDarkMode } from './DarkModeProvider'

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useDarkMode()

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle dark mode"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 180 : 0,
          scale: theme === 'dark' ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun className="w-5 h-5 text-gray-700" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : -180,
          scale: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon className="w-5 h-5 text-gray-200" />
      </motion.div>
    </motion.button>
  )
}
