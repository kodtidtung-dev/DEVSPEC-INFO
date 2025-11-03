'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface BurstEffectProps {
  trigger: boolean;
  position?: { x: number; y: number }; // ตำแหน่งที่จะให้ระเบิด
  onComplete?: () => void;
}

// สีของแต่ละ tech badge (subtle colors)
const BADGE_COLORS = [
  '#61DAFB', // React - Cyan
  '#3178C6', // TypeScript - Blue
  '#000000', // Next.js - Black
  '#06B6D4', // Tailwind - Cyan
  '#F24E1E', // Framer - Orange/Red
  '#FF3E00', // Svelte - Red
  '#38BDF8', // Tech - Sky Blue
  '#10B981', // Node - Green
  '#F59E0B', // JavaScript - Amber
  '#8B5CF6', // Vite - Purple
  '#EC4899', // Design - Pink
];

export function BurstEffect({ trigger, position, onComplete }: BurstEffectProps) {
  const [showShockwave, setShowShockwave] = useState(false);
  const [burstPosition, setBurstPosition] = useState({ x: 0.5, y: 0.5 });
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!trigger) return;

    // ถ้ามีตำแหน่งที่ส่งมา ใช้ตำแหน่งนั้น ไม่งั้นใช้ตรงกลางหน้าจอ
    if (position) {
      setBurstPosition(position);
    }

    // เริ่มแสดง shockwave
    setShowShockwave(true);

    // ยิง particle explosion (subtle version)
    const fireParticles = () => {
      const duration = 2000;
      const animationEnd = Date.now() + duration;
      const origin = position || { x: 0.5, y: 0.5 };
      const defaults = {
        startVelocity: 20, // ลดความเร็วให้ subtle
        spread: 360,
        ticks: 100,
        zIndex: 0,
        particleCount: 3, // ยิงครั้งละน้อย
        scalar: 0.8, // ขนาดเล็กลง
        gravity: 0.8,
        drift: 0,
        shapes: ['circle', 'square'] as confetti.Shape[],
      };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      // ยิงหลายรอบเพื่อให้ดู smooth
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        // ยิง particle จากตำแหน่งที่กำหนด
        confetti({
          ...defaults,
          particleCount: 2,
          origin,
          colors: [BADGE_COLORS[Math.floor(Math.random() * BADGE_COLORS.length)]],
          startVelocity: randomInRange(15, 25),
        });
      }, 50); // ยิงทุก 50ms

      // Burst แรกที่เข้มข้นกว่า
      confetti({
        ...defaults,
        particleCount: 15,
        origin,
        colors: BADGE_COLORS,
        startVelocity: 25,
      });
    };

    // รอให้ badge มารวมกันก่อน (0.8s)
    const particleTimer = setTimeout(() => {
      fireParticles();
    }, 800);

    // ซ่อน shockwave หลัง animation จบ
    const shockwaveTimer = setTimeout(() => {
      setShowShockwave(false);
      onComplete?.();
    }, 2500);

    return () => {
      clearTimeout(particleTimer);
      clearTimeout(shockwaveTimer);
    };
  }, [trigger, position, onComplete]);

  // แปลงตำแหน่ง x, y (0-1) เป็น pixel position
  const getPixelPosition = () => {
    const x = burstPosition.x * window.innerWidth;
    const y = burstPosition.y * window.innerHeight;
    return { x, y };
  };

  // Responsive sizes
  const ring1Size = isMobile ? 120 : 200;
  const ring2Size = isMobile ? 90 : 150;
  const flashSize = isMobile ? 15 : 20;

  return (
    <AnimatePresence>
      {showShockwave && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Shockwave Ring 1 - ใหญ่กว่า */}
          <motion.div
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: isMobile ? 2.5 : 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute rounded-full border-2 border-white/30 dark:border-white/20"
            style={{
              width: `${ring1Size}px`,
              height: `${ring1Size}px`,
              left: `${burstPosition.x * 100}%`,
              top: `${burstPosition.y * 100}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 20px rgba(255,255,255,0.3)',
            }}
          />

          {/* Shockwave Ring 2 - เล็กกว่า ช้ากว่า */}
          <motion.div
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: isMobile ? 2 : 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
            className="absolute rounded-full border border-cyan-400/40 dark:border-cyan-300/30"
            style={{
              width: `${ring2Size}px`,
              height: `${ring2Size}px`,
              left: `${burstPosition.x * 100}%`,
              top: `${burstPosition.y * 100}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 15px rgba(6,182,212,0.4)',
            }}
          />

          {/* Center Flash - แสงวาบตรงกลาง */}
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute rounded-full bg-white dark:bg-cyan-400"
            style={{
              width: `${flashSize}px`,
              height: `${flashSize}px`,
              left: `${burstPosition.x * 100}%`,
              top: `${burstPosition.y * 100}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 ${isMobile ? 30 : 40}px ${isMobile ? 8 : 10}px rgba(255,255,255,0.6)`,
              filter: `blur(${isMobile ? 6 : 8}px)`,
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
