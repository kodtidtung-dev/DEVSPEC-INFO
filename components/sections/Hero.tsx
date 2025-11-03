"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MessageCircle } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import OrbitalBadges from "./OrbitalBadges";
import SwipeButton from "@/components/ui/SwipeButton";

// Lazy load 3D components for better performance
const HeroBackground3D = dynamic(
  () => import("@/components/three/HeroBackground3D"),
  { ssr: false }
);
const ParticleBurst = dynamic(
  () => import("@/components/ui/ParticleBurst"),
  { ssr: false }
);
const BurstEffect = dynamic(
  () => import("@/components/ui/BurstEffect").then((mod) => ({ default: mod.BurstEffect })),
  { ssr: false }
);

const roles = [
  "Fullstack Developer",
  "UI/UX Design",
  "Business Analyst",
  "Freelancer",
];

// Tech badges data
const techBadges = [
  {
    label: "React",
    startAngle: 0,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#61DAFB">
        <circle cx="12" cy="12" r="2" />
        <ellipse
          cx="12"
          cy="12"
          rx="11"
          ry="4.2"
          fill="none"
          stroke="#61DAFB"
          strokeWidth="1"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="11"
          ry="4.2"
          fill="none"
          stroke="#61DAFB"
          strokeWidth="1"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="11"
          ry="4.2"
          fill="none"
          stroke="#61DAFB"
          strokeWidth="1"
          transform="rotate(120 12 12)"
        />
      </svg>
    ),
  },
  {
    label: "Next.js",
    startAngle: 30,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_408_139"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="180"
          height="180"
        >
          <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#mask0_408_139)">
          <circle
            cx="90"
            cy="90"
            r="90"
            className="fill-black dark:fill-white"
          />
          <path
            d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
            className="fill-white dark:fill-black"
          />
          <rect
            x="115"
            y="54"
            width="12"
            height="72"
            className="fill-white dark:fill-black"
          />
        </g>
      </svg>
    ),
  },
  {
    label: "TypeScript",
    startAngle: 60,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <rect width="24" height="24" rx="3" fill="#3178C6" />
        <path d="M11 7H9v3H8v2h1v3h2v-3h3v-2h-3V7z" fill="#FFF" opacity="0" />
        <text
          x="4"
          y="18"
          fill="#FFF"
          fontSize="14"
          fontWeight="600"
          fontFamily="sans-serif"
        >
          TS
        </text>
      </svg>
    ),
  },
  {
    label: "HTML5",
    startAngle: 90,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path
          fill="#E34F26"
          d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"
        />
      </svg>
    ),
  },
  {
    label: "CSS3",
    startAngle: 120,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path
          fill="#1572B6"
          d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"
        />
      </svg>
    ),
  },
  {
    label: "JavaScript",
    startAngle: 150,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <rect width="24" height="24" fill="#F7DF1E" />
        <path
          d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"
          fill="#000"
        />
      </svg>
    ),
  },
  {
    label: "Tailwind",
    startAngle: 180,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path
          fill="#06B6D4"
          d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
        />
      </svg>
    ),
  },
  {
    label: "Supabase",
    startAngle: 210,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path
          fill="#3ECF8E"
          d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66z"
        />
      </svg>
    ),
  },
  {
    label: "Node.js",
    startAngle: 240,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path
          fill="#339933"
          d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"
        />
      </svg>
    ),
  },
  {
    label: "Git",
    startAngle: 270,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path
          fill="#F05032"
          d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"
        />
      </svg>
    ),
  },
  {
    label: "Prisma",
    startAngle: 300,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path
          fill="#2D3748"
          d="M21.807 18.285L13.553.757a1.324 1.324 0 0 0-1.129-.757 1.31 1.31 0 0 0-1.206.889l-8.75 19.925a1.31 1.31 0 0 0 .133 1.352c.178.25.464.41.779.433l15.099 1.231a1.312 1.312 0 0 0 1.325-.772 1.31 1.31 0 0 0 .003-1.333zm-8.886 2.753l-9.905-.808L10.806 3.5l5.3 14.66-3.185 2.878z"
        />
        <path
          fill="#5A67D8"
          d="M21.807 18.285L13.553.757a1.324 1.324 0 0 0-1.129-.757 1.31 1.31 0 0 0-1.206.889l-8.75 19.925a1.31 1.31 0 0 0 .133 1.352c.178.25.464.41.779.433l15.099 1.231a1.312 1.312 0 0 0 1.325-.772 1.31 1.31 0 0 0 .003-1.333zm-8.886 2.753l-9.905-.808L10.806 3.5l5.3 14.66-3.185 2.878z"
        />
      </svg>
    ),
  },
  {
    label: "Vercel",
    startAngle: 330,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path className="fill-black dark:fill-white" d="M12 1L24 21H0L12 1z" />
      </svg>
    ),
  },
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [isConverging, setIsConverging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentBadges, setCurrentBadges] = useState(techBadges);
  const [triggerBurst, setTriggerBurst] = useState(false);
  const [burstPosition, setBurstPosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Update burst position based on screen size
  useEffect(() => {
    const updateBurstPosition = () => {
      const isLargeScreen = window.innerWidth >= 1024; // lg breakpoint
      if (isLargeScreen) {
        // จอใหญ่: อยู่ทางขวา (75% จากซ้าย)
        setBurstPosition({ x: 0.75, y: 0.5 });
      } else {
        // จอเล็ก: อยู่กลางหน้าจอ
        setBurstPosition({ x: 0.5, y: 0.5 });
      }
    };

    updateBurstPosition();
    window.addEventListener('resize', updateBurstPosition);
    return () => window.removeEventListener('resize', updateBurstPosition);
  }, []);

  // Shuffle badges using Fisher-Yates algorithm
  const shuffleBadges = (badges: typeof techBadges) => {
    const shuffled = [...badges];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap startAngle
      const tempAngle = shuffled[i].startAngle;
      shuffled[i].startAngle = shuffled[j].startAngle;
      shuffled[j].startAngle = tempAngle;
    }
    return shuffled;
  };

  const handleImageClick = () => {
    if (isAnimating) return; // Prevent multiple clicks during animation

    setIsAnimating(true);
    setIsConverging(true);
    setTriggerBurst(true);

    // Start exploding after converge completes + shuffle badges
    setTimeout(() => {
      setIsConverging(false);
      setCurrentBadges((prev) => shuffleBadges(prev));
    }, 1000);

    // Reset animation state after everything completes
    setTimeout(() => {
      setIsAnimating(false);
      setTriggerBurst(false);
    }, 2500);
  };

  // Split text animation
  const nameText = "PAKAPON";
  const nameLetters = nameText.split("");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      {/* 3D Background Layer */}
      <HeroBackground3D />

      {/* Particle Burst - Full Screen */}
      <div className="absolute inset-0 z-0">
        <ParticleBurst />
      </div>

      {/* Burst Effect - Particle Explosion & Shockwave */}
      <BurstEffect trigger={triggerBurst} position={burstPosition} />

      {/* Large DEVSPEC Logo Background - Vertical with Seamless Infinite Scroll */}
      <div className="absolute left-10 top-0 bottom-0 pointer-events-none select-none overflow-hidden h-screen flex items-center">
        <div className="relative h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: 1,
              y: "-50%"
            }}
            transition={{
              opacity: { duration: 1, delay: 0.5 },
              y: {
                duration: 100,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }
            }}
            className="flex flex-col"
          >
            {/* Repeat DEVSPEC multiple times for seamless loop */}
            {[...Array(20)].map((_, index) => (
              <div
                key={index}
                className="text-[6rem] lg:text-[8rem] xl:text-[10rem] font-black py-4"
                style={{
                  writingMode: 'vertical-rl',
                  letterSpacing: '-0.05em',
                  lineHeight: '0.8',
                  color: 'var(--text-primary)',
                  opacity: 'var(--bg-text-opacity)',
                  WebkitTextStroke: '2px var(--bg-text-stroke)',
                }}
              >
                DEVSPEC
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent-red/20 rounded-full blur-3xl animate-float opacity-50" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent-red/10 rounded-full blur-3xl animate-float opacity-30"
        style={{ animationDelay: "2s" }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)]">
          {/* Content - 60% */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            {/* Small greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block"
            >
              <span className="px-4 py-2 rounded-full glass text-sm font-medium text-accent-red">
                Welcome to DEVSPEC LET'S DEV
              </span>
            </motion.div>

            {/* Name with split text animation */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-text-secondary mb-2">Hi, I'm</span>
                <motion.span className="block whitespace-nowrap">
                  {nameLetters.map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        delay: 0.4 + index * 0.05,
                        duration: 0.6,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                      className="inline-block gradient-text"
                      style={{ transformOrigin: "center bottom" }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </motion.span>
              </h1>

              {/* Typewriter role */}
              <div className="h-16 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={currentRole}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl lg:text-4xl font-bold text-text-primary"
                  >
                    {roles[currentRole]}
                  </motion.h2>
                </AnimatePresence>
              </div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-lg text-text-secondary max-w-xl leading-relaxed mb-8"
            >
              Building fast, thoughtful, and visually clean web experiences.
              Specialized in React, Next.js, and modern frontend design.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* Desktop Buttons - Hidden on Mobile */}
              <div className="hidden sm:flex sm:flex-row gap-4 w-full">
                {/* Primary CTA Button */}
                <motion.a
                  href="#projects"
                  className="group relative inline-flex items-center justify-between pl-2 pr-6 py-2 bg-accent-red text-white rounded-full font-semibold text-base shadow-lg hover:shadow-xl hover:shadow-accent-red/40 transition-all overflow-hidden min-w-[200px]"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Icon Circle */}
                  <span className="flex items-center justify-center w-11 h-11 bg-white rounded-full shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-5 h-5 text-accent-red" />
                  </span>
                  {/* Text - Centered */}
                  <span className="flex-1 text-center tracking-wide uppercase text-sm">See My Work</span>

                  {/* Shine effect on hover */}
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                </motion.a>

                {/* Secondary CTA Button */}
                <motion.a
                  href="#contact"
                  className="group relative inline-flex items-center justify-between pl-2 pr-6 py-2 bg-transparent border-2 border-accent-red text-accent-red rounded-full font-semibold text-base hover:text-white transition-all overflow-hidden min-w-[200px]"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Icon Circle */}
                  <span className="flex items-center justify-center w-11 h-11 bg-white border-2 border-accent-red rounded-full shrink-0 group-hover:scale-110 group-hover:border-white transition-all duration-300">
                    <MessageCircle className="w-5 h-5 text-accent-red group-hover:text-white transition-colors duration-300" />
                  </span>
                  {/* Text - Centered */}
                  <span className="relative z-10 flex-1 text-center tracking-wide uppercase text-sm">Get In Touch</span>

                  {/* Background fill on hover */}
                  <span className="absolute inset-0 bg-accent-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-full" />
                </motion.a>
              </div>

              {/* Mobile Swipe Buttons - Visible on Mobile Only */}
              <div className="flex sm:hidden flex-col gap-4 w-full">
                <SwipeButton
                  onUnlock={() => {
                    const element = document.querySelector('#projects')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  icon={<Briefcase className="w-5 h-5" />}
                  text="See Work"
                  variant="primary"
                />
                <SwipeButton
                  onUnlock={() => {
                    const element = document.querySelector('#contact')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  icon={<MessageCircle className="w-5 h-5" />}
                  text="Contact"
                  variant="secondary"
                />
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="flex gap-8 pt-8"
            >
              {[
                { value: "Tech Stack", label: "React, Next.js, TypeScript,etc" },
                { value: "Focus", label: "Performance & User Experience" },
                { value: "Mindset", label: "Design meets Logic" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-2xl lg:text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-secondary mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image - 40% */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.32, 0.72, 0, 1] }}
            className="relative hidden lg:block"
          >
            {/* Profile Image (z-10) */}
            <motion.div
              className="relative w-full h-[calc(100vh-80px)] cursor-pointer z-10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              onClick={handleImageClick}
            >
              <Image
                src="/mecrossarm-nobg.png"
                alt="Profile"
                fill
                className="object-contain object-bottom relative z-10"
                priority
                sizes="(max-width: 768px) 0vw, (max-width: 1200px) 40vw, 600px"
              />
            </motion.div>

            {/* Floating tech badges - Orbital Motion (z-20) */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              <OrbitalBadges
                isConverging={isConverging}
                isAnimating={isAnimating}
                badges={currentBadges}
              />
            </div>
          </motion.div>

          {/* Badge showcase for mobile/tablet - Centered floating badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="relative lg:hidden w-full h-[400px] cursor-pointer"
            onClick={handleImageClick}
          >
            {/* Profile Image for mobile (z-10) */}
            <motion.div
              className="relative w-full h-full z-10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            >
              <Image
                src="/mecrossarm-nobg.png"
                alt="Profile"
                fill
                className="object-contain object-center"
                priority
                sizes="100vw"
              />
            </motion.div>

            {/* Floating tech badges - Orbital Motion - Smaller radius for mobile */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              <OrbitalBadges
                isConverging={isConverging}
                isAnimating={isAnimating}
                badges={currentBadges}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-text-secondary text-sm"
        >
          <span>Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-text-secondary flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-accent-red rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
