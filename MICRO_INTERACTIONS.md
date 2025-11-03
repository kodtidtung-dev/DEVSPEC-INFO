# Micro-Interactions & Animation Patterns

## Philosophy
Playful but never distracting. Each interaction should feel like discovering a delightful Easter egg — subtle enough to feel natural, memorable enough to leave an impression.

---

## 1. Magnetic Cursor Effect

### Where: Project cards, primary buttons, social icons (desktop only)

### Behavior:
```javascript
// Pseudo-code concept
onMouseMove (within 100px radius) => {
  Calculate distance and angle from cursor to element center
  Apply translateX/Y toward cursor (20% of distance)
  Apply subtle rotate (max 5deg based on cursor position)
  Transition: spring physics (stiffness: 150, damping: 15)
}

onMouseLeave => {
  Reset to translateX(0) translateY(0) rotate(0)
  Transition: smooth 0.5s
}
```

### Visual Effect:
Elements feel "alive" and responsive, like they're drawn to your attention. Creates a 3D illusion.

### Implementation Tip:
```typescript
// Framer Motion hook
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 })

// Calculate magnetic pull
const distance = Math.sqrt(
  Math.pow(mousePosition.x - cardPosition.x, 2) +
  Math.pow(mousePosition.y - cardPosition.y, 2)
)

const magneticStrength = Math.max(0, (100 - distance) / 100)
```

---

## 2. Text Reveal Animations

### A. Character-by-Character Blur Reveal

**Where:** Hero headline

**Behavior:**
```
Each character starts:
  - opacity: 0
  - filter: blur(10px)
  - transform: translateY(20px)

Animates to:
  - opacity: 1
  - filter: blur(0px)
  - transform: translateY(0)

Stagger: 0.03s per character
Duration: 0.6s per character
Easing: [0.32, 0.72, 0, 1]
```

**Visual Effect:** Text "focuses" into view, like a camera lens adjusting

### B. Gradient Wipe Reveal

**Where:** Section titles on scroll

**Behavior:**
```
background: linear-gradient(to right, red 0%, text-color 50%, transparent 100%)
background-size: 200% 100%
background-position: -100% 0

Animate: background-position from -100% to 0%
Duration: 1s
```

**Visual Effect:** Red gradient "paints" the text into existence

### C. Word-by-Word Slide Up

**Where:** About section paragraphs

**Behavior:**
Split text into words, wrap each in span
```
Initial: opacity: 0, translateY(10px)
Animate: opacity: 1, translateY(0)
Stagger: 0.02s per word
```

---

## 3. Scroll-Linked Animations

### A. Parallax Layers

**Where:** Hero background shapes, section images

**Behavior:**
```javascript
// Slower movement than scroll speed
elementTransform = scrollY * 0.3 // 30% of scroll speed

// Different layers move at different speeds
layer1: scrollY * 0.2
layer2: scrollY * 0.4
layer3: scrollY * 0.6
```

**Visual Effect:** Depth and dimension, like looking through multiple glass layers

### B. Scale on Scroll

**Where:** Images in About and Projects sections

**Behavior:**
```javascript
// Start slightly zoomed in
initial: scale(1.1)

// Scale to normal as element enters viewport
animate: scale(1)

// Using scroll progress (0 to 1)
scale = 1.1 - (scrollProgress * 0.1)
```

### C. Horizontal Reveal

**Where:** Skill pills, project cards

**Behavior:**
```
Initial:
  - opacity: 0
  - translateX(-40px) // from left
  OR
  - translateX(40px) // from right (alternate)

Trigger: When element is 20% in viewport
Animate: opacity 1, translateX(0)
Stagger: 0.08s
```

---

## 4. Hover Effects Library

### A. Button Glow Pulse

**Where:** Primary CTA buttons

**Behavior:**
```css
box-shadow: 0 0 0 rgba(255, 59, 48, 0)

Hover animates to:
box-shadow: 0 0 20px rgba(255, 59, 48, 0.4)

Plus:
- scale(1.05)
- brightness(1.1)
- translateY(-2px)
```

### B. Underline Draw

**Where:** Text links, navigation items

**Behavior:**
```css
::after pseudo-element
width: 0% → 100%
height: 2px
background: red
transform-origin: left
transition: width 0.3s ease

On hover: width: 100%
```

### C. Image Reveal Spotlight

**Where:** Project card images

**Behavior:**
```css
Overlay gradient that follows cursor:
background: radial-gradient(
  circle 150px at [cursorX] [cursorY],
  rgba(255, 59, 48, 0.2) 0%,
  transparent 70%
)

Plus: Image grayscale(100%) → grayscale(0%)
```

### D. Card Tilt (3D Transform)

**Where:** Project cards

**Behavior:**
```javascript
onMouseMove => {
  rotateX = (mouseY - cardCenterY) / 20 // subtle tilt
  rotateY = (mouseX - cardCenterX) / 20

  transform: perspective(1000px)
             rotateX(rotateX)
             rotateY(rotateY)
             scale(1.02)
}

Also add inner shadow that shifts with tilt
```

---

## 5. Playful Easter Eggs

### A. Konami Code Surprise

**Trigger:** Up, Up, Down, Down, Left, Right, Left, Right, B, A

**Effect:**
- Screen briefly flashes red
- All text becomes Comic Sans for 3 seconds
- Confetti explosion
- Toast message: "You found the secret! 🎉"

### B. Click Name in Hero

**Trigger:** Click your name 5 times quickly

**Effect:**
- Name briefly jiggles with rotate(-5, 5, -5, 5, 0)
- Color shifts through rainbow gradient
- Small emoji (👋) appears and floats away

### C. Dark Mode Toggle with Flair

**Trigger:** Toggle dark mode

**Effect:**
- Moon/sun icon rotates 180deg
- Page briefly fills with color transition gradient (like curtain)
- Smooth color interpolation (0.5s) for all elements
- Optional: Brief star particles on dark mode activation

### D. Skill Pill Collection

**Trigger:** Click skill pills in Projects section

**Effect:**
- Pill does a happy bounce (scale 1.2 → 0.9 → 1)
- Small "+" appears and floats to a counter
- After clicking all skills: Achievement unlocked message

### E. Developer Console Message

**Trigger:** Open browser DevTools

**Effect:**
```javascript
console.log(`
  %c👋 Hey there, curious developer!
  %c
  Like what you see? Let's build something together.
  Email: your@email.com
`,
'color: #FF3B30; font-size: 16px; font-weight: bold;',
'color: #6E6E73; font-size: 14px;'
)

// ASCII art of your logo/name
```

---

## 6. Loading & State Transitions

### A. Page Load Sequence

**Behavior:**
```
1. Red line draws across top (0.4s)
2. Hero text reveals (0.8s)
3. Navigation fades in (0.3s, delay 0.6s)
4. Buttons appear (0.4s, delay 0.9s)
5. Background elements float in (1s, delay 0.5s)
```

### B. Form Submission States

**Idle → Loading → Success/Error**

```javascript
Idle: "Send Message"

Loading:
  - Text fades out
  - Spinner fades in with rotation
  - Button disabled, opacity 0.7

Success:
  - Green background fill (from center)
  - Checkmark icon scales in (from 0)
  - Text: "Message Sent! ✓"
  - After 2s: Reset to idle

Error:
  - Button shakes (translateX: -10, 10, -10, 10, 0)
  - Red border pulse
  - Error message slides down below
```

### C. Navigation Active Indicator

**Behavior:**
```css
Small red pill behind active nav item

Animates position with spring physics
layoutId="activeIndicator" // Framer Motion shared layout

Follows active section with smooth travel animation
Duration: 0.5s spring
```

---

## 7. Scroll-Triggered Micro-Animations

### A. Number Counter Animation

**Where:** Stats in About section (optional)

**Behavior:**
```javascript
// When element enters viewport
count from 0 to target number
duration: 2s
easing: ease-out

Example: "5+" years experience
Animates: 0 → 5 (counting up)
```

### B. Progress Ring

**Where:** Skill proficiency indicators (optional alternative)

**Behavior:**
```
SVG circle strokeDashoffset animation
Initial: Full circle (strokeDashoffset: circumference)
Animate: Reveal percentage (strokeDashoffset: remaining)

Trigger: When in viewport
Duration: 1.5s
Easing: ease-out
Color: Red stroke
```

### C. Stagger Fade Grid

**Where:** Skill pills, project cards

**Behavior:**
```javascript
Parent container triggers children
Each child: opacity 0 → 1, translateY 20 → 0

Stagger calculation:
delay = index * 0.08s // 80ms between each

Max stagger: 0.8s (even if 20+ items)
```

---

## 8. Cursor Enhancements (Desktop Only)

### A. Custom Cursor (Optional)

**Behavior:**
```
Replace default cursor with:
- Small dot (8px, red)
- Larger ring (32px, red outline, follows with lag)

On hover interactive elements:
- Dot scales to 12px
- Ring scales to 48px
- Ring color changes to fill

Smooth lag: 0.15s delay on ring position
```

### B. Cursor Trail (Very Subtle)

**Behavior:**
```
Leave faint red dots that fade out
Opacity: 0.1 → 0
Duration: 0.8s
Size: 4px
Only appears on fast movement (velocity > threshold)
```

---

## 9. Sound Effects (Optional, User-Controlled)

### Where: Add toggle in footer "Sound: ON/OFF"

**Subtle Sounds:**
- Navigation click: Soft "tick" (100ms)
- Button hover: Gentle "woosh" (80ms)
- Form submit: Success "ding" (200ms)
- Dark mode toggle: "Pop" sound (150ms)
- Skill pill click: "Bloop" (120ms)

**Volume:** Very low (10-20% max volume)

**Implementation:**
```javascript
// Web Audio API or Howler.js
const playSound = (soundName) => {
  if (soundEnabled) {
    const audio = new Audio(`/sounds/${soundName}.mp3`)
    audio.volume = 0.15
    audio.play()
  }
}
```

---

## 10. Accessibility & Performance

### Respect User Preferences

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Implementation:**
```javascript
const prefersReducedMotion = useReducedMotion() // Framer Motion hook

const variants = prefersReducedMotion
  ? { animate: { opacity: 1 } } // Simple fade only
  : {
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        // ... complex animations
      }
    }
```

### Performance Optimizations

1. **Use will-change sparingly:**
```css
.project-card:hover {
  will-change: transform;
}
```

2. **Transform & Opacity only** for smooth 60fps:
```javascript
// Good: GPU-accelerated
transform: translateX() scale() rotate()
opacity: 0 → 1

// Avoid: Layout triggers
width, height, margin, padding changes
```

3. **IntersectionObserver for scroll triggers:**
```javascript
// Only animate what's visible
const { ref, inView } = useInView({
  threshold: 0.2,
  triggerOnce: true // Don't re-trigger
})
```

4. **Debounce cursor effects:**
```javascript
// Don't calculate on every mousemove
const debouncedMouseMove = useMemo(
  () => debounce(handleMouseMove, 10),
  []
)
```

---

## Implementation Priority

### Phase 1 (Must Have):
1. Text reveal animations
2. Scroll-triggered fades
3. Button hover effects
4. Card lift on hover
5. Smooth page transitions

### Phase 2 (Should Have):
6. Magnetic cursor
7. Image spotlight effect
8. Parallax layers
9. Navigation active indicator
10. Dark mode transition

### Phase 3 (Nice to Have):
11. 3D card tilt
12. Custom cursor
13. Easter eggs
14. Sound effects
15. Advanced particle effects

---

## Animation Performance Checklist

- ✅ All animations use `transform` and `opacity`
- ✅ Heavy animations only on desktop (not mobile)
- ✅ IntersectionObserver used for scroll triggers
- ✅ `will-change` added only on hover/active states
- ✅ Animations disabled when `prefers-reduced-motion`
- ✅ No layout thrashing (read then write DOM pattern)
- ✅ Framer Motion layout animations used for shared elements
- ✅ Images optimized and lazy-loaded
- ✅ Fonts preloaded to prevent layout shift
- ✅ GPU-accelerated properties prioritized

---

These micro-interactions transform a clean portfolio into a **memorable experience**.

The key is restraint — each animation should feel intentional, not decorative. Like an Apple product, the magic is in how everything responds exactly how you expect, with just a touch of delight.
