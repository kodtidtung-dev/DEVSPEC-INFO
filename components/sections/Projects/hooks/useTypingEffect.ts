/**
 * Typing Effect Hook
 * Creates a typing and deleting animation effect for text
 *
 * @param texts - Array of strings to cycle through
 * @param typeSpeed - Speed of typing in milliseconds (default: 80ms)
 * @param deleteSpeed - Speed of deleting in milliseconds (default: 50ms)
 * @param pauseTime - Pause duration after typing completes (default: 2000ms)
 */

import { useState, useEffect } from 'react';

interface UseTypingEffectReturn {
  displayedText: string;
  isDeleting: boolean;
}

export function useTypingEffect(
  texts: string[],
  typeSpeed: number = 80,
  deleteSpeed: number = 50,
  pauseTime: number = 2000
): UseTypingEffectReturn {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[textIndex];

    // Pause after completing typing
    if (!isDeleting && displayedText === currentText && !isPaused) {
      setIsPaused(true);
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimeout);
    }

    // Don't update while paused
    if (isPaused) return;

    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          // Deleting characters
          setDisplayedText(currentText.substring(0, displayedText.length - 1));

          // Move to next text when deletion is complete
          if (displayedText.length === 1) {
            setIsDeleting(false);
            setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }
        } else {
          // Typing characters
          setDisplayedText(currentText.substring(0, displayedText.length + 1));
        }
      },
      isDeleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, isPaused, textIndex, texts, typeSpeed, deleteSpeed, pauseTime]);

  return {
    displayedText,
    isDeleting,
  };
}
